package de.drv.thelionking.workflow.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.drv.thelionking.data.dokumentenstapel.Dokumentenstapel;
import de.drv.thelionking.data.dokumentenstapel.DokumentenstapelRepository;
import de.drv.thelionking.data.page.Page;
import de.drv.thelionking.data.page.PageRepository;
import de.drv.thelionking.data.seitenextrakt.SeitenExtrakt;
import de.drv.thelionking.data.seitenextrakt.SeitenExtraktRepository;
import de.drv.thelionking.data.vorgang.Vorgang;
import de.drv.thelionking.data.vorgang.VorgangRepository;
import de.drv.thelionking.service.PdfService;
import de.drv.thelionking.workflow.client.DoclingClient;
import de.drv.thelionking.workflow.client.DoclingResult;
import de.drv.thelionking.workflow.model.DokumentenstapelStatus;
import de.drv.thelionking.workflow.model.SeiteStatus;
import de.drv.thelionking.workflow.model.VorgangStatus;
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
    private final DokumentenstapelRepository dokumentenstapelRepository;
    private final PageRepository pageRepository;
    private final SeitenExtraktRepository seitenExtraktRepository;
    private final VorgangRepository vorgangRepository;
    private final StorageService storageService;
    private final PdfService pdfService;
    private final DoclingClient doclingClient;
    private final ObjectMapper objectMapper;

    public Step1ProcessingService(
            DokumentenstapelRepository dokumentenstapelRepository,
            PageRepository pageRepository,
            SeitenExtraktRepository seitenExtraktRepository,
            VorgangRepository vorgangRepository,
            StorageService storageService,
            PdfService pdfService,
            DoclingClient doclingClient,
            ObjectMapper objectMapper) {
        this.dokumentenstapelRepository = dokumentenstapelRepository;
        this.pageRepository = pageRepository;
        this.seitenExtraktRepository = seitenExtraktRepository;
        this.vorgangRepository = vorgangRepository;
        this.storageService = storageService;
        this.pdfService = pdfService;
        this.doclingClient = doclingClient;
        this.objectMapper = objectMapper;
    }

    @Async
    public void processStep1Async(UUID stapelId) {
        processStep1(stapelId);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void processStep1(UUID stapelId) {
        Dokumentenstapel stapel = dokumentenstapelRepository.findById(stapelId).orElse(null);
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
            dokumentenstapelRepository.save(stapel);

            List<Page> pages = createPagesBySplit(stapel);

            stapel.setSeitenAnzahl(pages.size());
            stapel.setStatus(DokumentenstapelStatus.SPLIT_DONE.name());
            dokumentenstapelRepository.save(stapel);

            stapel.setStatus(DokumentenstapelStatus.EXTRACTING.name());
            dokumentenstapelRepository.save(stapel);

            int failed = 0;
            for (Page page : pages) {
                try {
                    Path pagePath = Path.of(page.getPdfPagePath());
                    DoclingResult result = doclingClient.extract(pagePath);

                    SeitenExtrakt extrakt = seitenExtraktRepository.findBySeite_Id(page.getId()).orElseGet(SeitenExtrakt::new);
                    extrakt.setSeite(page);
                    extrakt.setMarkdown(result.getMarkdown());
                    extrakt.setDoclingJson(objectMapper.writeValueAsString(result.getDoclingJson()));
                    extrakt.setExtractedAt(Instant.now());
                    seitenExtraktRepository.save(extrakt);

                    page.setStatus(SeiteStatus.EXTRACT_DONE.name());
                    page.setErrorMessage(null);
                } catch (Exception ex) {
                    failed++;
                    page.setStatus(SeiteStatus.FAILED.name());
                    page.setErrorMessage(ex.getMessage());
                }
                pageRepository.save(page);
            }

            if (failed == 0) {
                stapel.setStatus(DokumentenstapelStatus.EXTRACT_DONE.name());
                vorgang.setStatus(VorgangStatus.STEP1_DONE.name());
            } else {
                stapel.setStatus(DokumentenstapelStatus.PARTIAL_FAILED.name());
                vorgang.setStatus(VorgangStatus.FAILED.name());
            }
            dokumentenstapelRepository.save(stapel);
            vorgangRepository.save(vorgang);
        } catch (Exception ex) {
            stapel.setStatus(DokumentenstapelStatus.FAILED.name());
            dokumentenstapelRepository.save(stapel);
            vorgang.setStatus(VorgangStatus.FAILED.name());
            vorgangRepository.save(vorgang);
        }
    }

    private List<Page> createPagesBySplit(Dokumentenstapel stapel) throws IOException {
        List<Page> existing = pageRepository.findAllByDokumentenstapel_IdOrderByPageNoAsc(stapel.getId());
        if (!existing.isEmpty()) {
            return existing;
        }

        List<Page> pages = new ArrayList<>();
        byte[] original = stapel.getUploadPdf() != null ? stapel.getUploadPdf() : new byte[0];
        List<byte[]> splitPages = pdfService.splitToPages(original);
        for (int i = 1; i <= splitPages.size(); i++) {
            byte[] pageBytes = splitPages.get(i - 1);
            Path pagePath = storageService.savePagePdf(stapel.getId(), i, pageBytes);
            Page page = new Page(i, pageBytes, stapel);
            page.setPdfPagePath(pagePath.toString());
            page.setStatus(SeiteStatus.CREATED.name());
            page.setErrorMessage(null);
            page = pageRepository.save(page);
            pages.add(page);
        }
        return pages;
    }
}
