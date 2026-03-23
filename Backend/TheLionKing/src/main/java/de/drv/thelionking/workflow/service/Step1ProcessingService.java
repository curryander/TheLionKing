package de.drv.thelionking.workflow.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.drv.thelionking.data.entities.dokumentenstapel.DokumentenstapelEntity;
import de.drv.thelionking.data.entities.dokumentenstapel.DokumentenstapelEntityRepository;
import de.drv.thelionking.data.entities.page.PageEntity;
import de.drv.thelionking.data.entities.page.PageRepository;
import de.drv.thelionking.data.entities.seitenextrakt.SeitenExtrakt;
import de.drv.thelionking.data.entities.seitenextrakt.SeitenExtraktRepository;
import de.drv.thelionking.data.entities.vorgang.Vorgang;
import de.drv.thelionking.data.entities.vorgang.VorgangRepository;
import de.drv.thelionking.service.PdfService;
import de.drv.thelionking.workflow.client.ExtractionClient;
import de.drv.thelionking.workflow.client.ExtractionResult;
import de.drv.thelionking.workflow.model.DokumentenstapelStatus;
import de.drv.thelionking.workflow.model.SeiteStatus;
import de.drv.thelionking.workflow.model.VorgangStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.nio.file.Path;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class Step1ProcessingService {
    private static final Logger log = LoggerFactory.getLogger(Step1ProcessingService.class);

    private final DokumentenstapelEntityRepository dokumentenstapelEntityRepository;
    private final PageRepository pageRepository;
    private final SeitenExtraktRepository seitenExtraktRepository;
    private final VorgangRepository vorgangRepository;
    private final StorageService storageService;
    private final PdfService pdfService;
    private final ExtractionClient extractionClient;
    private final ObjectMapper objectMapper;

    public Step1ProcessingService(
            DokumentenstapelEntityRepository dokumentenstapelEntityRepository,
            PageRepository pageRepository,
            SeitenExtraktRepository seitenExtraktRepository,
            VorgangRepository vorgangRepository,
            StorageService storageService,
            PdfService pdfService,
            ExtractionClient extractionClient,
            ObjectMapper objectMapper) {
        this.dokumentenstapelEntityRepository = dokumentenstapelEntityRepository;
        this.pageRepository = pageRepository;
        this.seitenExtraktRepository = seitenExtraktRepository;
        this.vorgangRepository = vorgangRepository;
        this.storageService = storageService;
        this.pdfService = pdfService;
        this.extractionClient = extractionClient;
        this.objectMapper = objectMapper;
        log.info("Extraction provider active: {}", extractionClient.getClass().getSimpleName());
    }

    @Async
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void processStep1Async(UUID stapelId) {
        processStep1(stapelId);
    }

    void processStep1(UUID stapelId) {
        DokumentenstapelEntity stapel = dokumentenstapelEntityRepository.findById(stapelId).orElse(null);
        if (stapel == null) {
            return;
        }

        String currentStatus = stapel.getStatus();
        boolean allowed = DokumentenstapelStatus.UPLOADED.name().equals(currentStatus)
                || DokumentenstapelStatus.PARTIAL_FAILED.name().equals(currentStatus)
                || DokumentenstapelStatus.FAILED.name().equals(currentStatus);
        if (!allowed) {
            return;
        }

        Vorgang vorgang = stapel.getVorgang();
        vorgang.setStatus(VorgangStatus.PROCESSING_STEP1.name());
        vorgangRepository.save(vorgang);

        try {
            stapel.setStatus(DokumentenstapelStatus.SPLITTING.name());
            dokumentenstapelEntityRepository.save(stapel);

            List<PageEntity> pageEntities = createPagesBySplit(stapel);

            stapel.setSeitenAnzahl(pageEntities.size());
            stapel.setStatus(DokumentenstapelStatus.SPLIT_DONE.name());
            dokumentenstapelEntityRepository.save(stapel);

            stapel.setStatus(DokumentenstapelStatus.EXTRACTING.name());
            dokumentenstapelEntityRepository.save(stapel);

            int failed = 0;
            for (PageEntity pageEntity : pageEntities) {
                try {
                    Path pagePath = Path.of(pageEntity.getPdfPagePath());
                    log.info("Starting extraction: stapelId={}, pageId={}, pageNo={}, provider={}",
                            stapel.getId(), pageEntity.getId(), pageEntity.getPageNo(), extractionClient.getClass().getSimpleName());
                    ExtractionResult result = extractionClient.extract(pagePath);
                    String doclingJson = objectMapper.writeValueAsString(result.getDoclingJson());

                    SeitenExtrakt extrakt = seitenExtraktRepository.findBySeite_Id(pageEntity.getId()).orElseGet(SeitenExtrakt::new);
                    extrakt.setSeite(pageEntity);
                    extrakt.setMarkdown(result.getMarkdown());
                    extrakt.setDoclingJson(doclingJson);
                    extrakt.setExtractedAt(Instant.now());
                    seitenExtraktRepository.save(extrakt);

                    pageEntity.setExtractedText(result.getMarkdown());
                    pageEntity.setStatus(SeiteStatus.EXTRACT_DONE.name());
                    pageEntity.setErrorMessage(null);
                    log.info("Extraction succeeded: stapelId={}, pageId={}, pageNo={}",
                            stapel.getId(), pageEntity.getId(), pageEntity.getPageNo());
                } catch (Exception ex) {
                    failed++;
                    pageEntity.setExtractedText(null);
                    pageEntity.setStatus(SeiteStatus.FAILED.name());
                    pageEntity.setErrorMessage(ex.getMessage());
                    log.error("Extraction failed: stapelId={}, pageId={}, pageNo={}, error={}",
                            stapel.getId(), pageEntity.getId(), pageEntity.getPageNo(), ex.getMessage(), ex);
                }
                pageRepository.save(pageEntity);
            }

            if (failed == 0) {
                stapel.setStatus(DokumentenstapelStatus.EXTRACT_DONE.name());
                vorgang.setStatus(VorgangStatus.STEP1_DONE.name());
            } else {
                stapel.setStatus(DokumentenstapelStatus.PARTIAL_FAILED.name());
                vorgang.setStatus(VorgangStatus.FAILED.name());
            }
            dokumentenstapelEntityRepository.save(stapel);
            vorgangRepository.save(vorgang);
        } catch (Exception ex) {
            stapel.setStatus(DokumentenstapelStatus.FAILED.name());
            dokumentenstapelEntityRepository.save(stapel);
            vorgang.setStatus(VorgangStatus.FAILED.name());
            vorgangRepository.save(vorgang);
        }
    }

    private List<PageEntity> createPagesBySplit(DokumentenstapelEntity stapel) throws IOException {
        List<PageEntity> existing = pageRepository.findAllByDokumentenstapelEntity_IdOrderByPageNoAsc(stapel.getId());
        if (!existing.isEmpty()) {
            log.info("Pages already present for stapelId={}, count={}", stapel.getId(), existing.size());
            return existing;
        }

        List<PageEntity> pageEntities = new ArrayList<>();
        byte[] original = stapel.getUploadPdf() != null ? stapel.getUploadPdf() : new byte[0];
        List<byte[]> splitPages = pdfService.splitToPages(original);
        log.info("PDF split completed: stapelId={}, pageCount={}", stapel.getId(), splitPages.size());
        for (int i = 1; i <= splitPages.size(); i++) {
            byte[] pageBytes = splitPages.get(i - 1);
            Path pagePath = storageService.savePagePdf(stapel.getVorgang().getId(), stapel.getId(), i, pageBytes);
            PageEntity pageEntity = new PageEntity(i, pageBytes, stapel);
            pageEntity.setPdfPagePath(pagePath.toString());
            pageEntity.setStatus(SeiteStatus.CREATED.name());
            pageEntity.setErrorMessage(null);
            pageEntity = pageRepository.save(pageEntity);
            log.info("Page persisted: stapelId={}, pageId={}, pageNo={}, bytes={}, pdfPagePath={}",
                    stapel.getId(), pageEntity.getId(), pageEntity.getPageNo(), pageBytes.length, pageEntity.getPdfPagePath());
            pageEntities.add(pageEntity);
        }
        return pageEntities;
    }
}
