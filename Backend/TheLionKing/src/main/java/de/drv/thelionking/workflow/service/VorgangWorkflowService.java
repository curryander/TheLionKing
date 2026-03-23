package de.drv.thelionking.workflow.service;

import de.drv.thelionking.data.entities.dokumentenstapel.DokumentenstapelEntity;
import de.drv.thelionking.data.entities.dokumentenstapel.DokumentenstapelEntityRepository;
import de.drv.thelionking.data.entities.page.PageEntity;
import de.drv.thelionking.data.entities.page.PageRepository;
import de.drv.thelionking.data.entities.versicherter.Versicherter;
import de.drv.thelionking.data.entities.versicherter.VersicherterRepository;
import de.drv.thelionking.data.entities.vorgang.Vorgang;
import de.drv.thelionking.data.entities.vorgang.VorgangRepository;
import de.drv.thelionking.workflow.dto.CreateVorgangResult;
import de.drv.thelionking.workflow.dto.StapelProgressDto;
import de.drv.thelionking.workflow.dto.VorgangStatusResponse;
import de.drv.thelionking.workflow.model.DokumentenstapelStatus;
import de.drv.thelionking.workflow.model.SeiteStatus;
import de.drv.thelionking.workflow.model.VorgangStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class VorgangWorkflowService {
    private static final Logger log = LoggerFactory.getLogger(VorgangWorkflowService.class);

    private final VorgangRepository vorgangRepository;
    private final VersicherterRepository versicherterRepository;
    private final DokumentenstapelEntityRepository dokumentenstapelEntityRepository;
    private final PageRepository pageRepository;
    private final StorageService storageService;
    private final Step1ProcessingService step1ProcessingService;

    public VorgangWorkflowService(
            VorgangRepository vorgangRepository,
            VersicherterRepository versicherterRepository,
            DokumentenstapelEntityRepository dokumentenstapelEntityRepository,
            PageRepository pageRepository,
            StorageService storageService,
            Step1ProcessingService step1ProcessingService) {
        this.vorgangRepository = vorgangRepository;
        this.versicherterRepository = versicherterRepository;
        this.dokumentenstapelEntityRepository = dokumentenstapelEntityRepository;
        this.pageRepository = pageRepository;
        this.storageService = storageService;
        this.step1ProcessingService = step1ProcessingService;
    }

    @Transactional
    public CreateVorgangResult createVorgangWithUpload(
            MultipartFile pdf,
            String stapelName,
            String vsnr,
            boolean startProcessing) {
        if (pdf == null || pdf.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "file is required");
        }
        if (vsnr == null || vsnr.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "vsnr is required");
        }
        validatePdfUpload(pdf);

        byte[] bytes;
        try {
            bytes = pdf.getBytes();
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cannot read uploaded file");
        }

        Vorgang vorgang = new Vorgang();
        vorgang.setStatus(startProcessing ? VorgangStatus.PROCESSING_STEP1.name() : VorgangStatus.NEW.name());
        vorgang.setProgress(0);
        Versicherter versicherter = getOrCreateVersicherter(vsnr.trim());
        vorgang.setVersicherter(versicherter);
        vorgang = vorgangRepository.save(vorgang);
        log.info("Vorgang persisted with Versicherter: vorgangId={}, versicherterId={}, vsnr={}",
                vorgang.getId(), versicherter.getId(), versicherter.getVsnr());

        DokumentenstapelEntity stapel = new DokumentenstapelEntity();
        stapel.setVorgang(vorgang);
        stapel.setStapelName((stapelName == null || stapelName.isBlank()) ? "Dokumentenstapel" : stapelName);
        stapel.setStatus(DokumentenstapelStatus.UPLOADED.name());
        stapel.setOriginalFilename(pdf.getOriginalFilename());
        stapel.setUploadFilename(pdf.getOriginalFilename());
        stapel.setUploadPdf(bytes);
        stapel = dokumentenstapelEntityRepository.save(stapel);
        log.info("Dokumentenstapel persisted: stapelId={}, vorgangId={}, originalFilename={}, bytes={}",
                stapel.getId(), vorgang.getId(), stapel.getOriginalFilename(), bytes.length);

        try {
            String storageRef = storageService.saveOriginalPdf(vorgang.getId(), stapel.getId(), bytes).toString();
            stapel.setPdfStorageRef(storageRef);
            stapel = dokumentenstapelEntityRepository.save(stapel);
            log.info("Dokumentenstapel storage reference persisted: stapelId={}, pdfStorageRef={}",
                    stapel.getId(), stapel.getPdfStorageRef());
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Could not persist uploaded PDF");
        }

        if (startProcessing) {
            scheduleStep1AfterCommit(stapel.getId());
        }

        return new CreateVorgangResult(vorgang.getId(), stapel.getId());
    }

    private Versicherter getOrCreateVersicherter(String vsnr) {
        return versicherterRepository.findFirstByVsnr(vsnr)
                .orElseGet(() -> {
                    Versicherter versicherter = new Versicherter();
                    versicherter.setVsnr(vsnr);
                    Versicherter saved = versicherterRepository.save(versicherter);
                    log.info("Versicherter persisted: versicherterId={}, vsnr={}",
                            saved.getId(), saved.getVsnr());
                    return saved;
                });
    }

    private void validatePdfUpload(MultipartFile pdf) {
        String contentType = pdf.getContentType();
        if (contentType != null && !contentType.isBlank() && !"application/pdf".equalsIgnoreCase(contentType)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "file must be a PDF (content-type application/pdf)");
        }

        byte[] header = new byte[4];
        try {
            var in = pdf.getInputStream();
            int read = in.read(header);
            in.close();
            if (read < 4
                    || header[0] != '%'
                    || header[1] != 'P'
                    || header[2] != 'D'
                    || header[3] != 'F') {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "invalid PDF file (missing %PDF header)");
            }
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cannot read uploaded file");
        }
    }

    @Transactional(readOnly = true)
    public VorgangStatusResponse getVorgangStatus(UUID vorgangId) {
        Vorgang vorgang = vorgangRepository.findById(vorgangId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vorgang not found"));

        List<DokumentenstapelEntity> stapelList = new ArrayList<>(vorgang.getDokumentenstapelEntity());

        long totalAll = 0;
        long doneAll = 0;
        long failedAll = 0;
        List<StapelProgressDto> stapelDtos = new ArrayList<>();

        for (DokumentenstapelEntity stapel : stapelList) {
            long total = pageRepository.countByDokumentenstapelEntity_Id(stapel.getId());
            long done = pageRepository.countByDokumentenstapelEntity_IdAndStatus(stapel.getId(), SeiteStatus.EXTRACT_DONE.name());
            long failed = pageRepository.countByDokumentenstapelEntity_IdAndStatus(stapel.getId(), SeiteStatus.FAILED.name());

            StapelProgressDto dto = new StapelProgressDto();
            dto.setStapelId(stapel.getId());
            dto.setStatus(stapel.getStatus());
            dto.setPagesTotal(total);
            dto.setPagesDone(done);
            dto.setPagesFailed(failed);
            stapelDtos.add(dto);

            totalAll += total;
            doneAll += done;
            failedAll += failed;
        }

        VorgangStatusResponse response = new VorgangStatusResponse();
        response.setVorgangId(vorgang.getId());
        response.setStatus(vorgang.getStatus());
        response.setPagesTotal(totalAll);
        response.setPagesDone(doneAll);
        response.setPagesFailed(failedAll);
        response.setStapel(stapelDtos);
        return response;
    }

    @Transactional
    public void triggerStep1(UUID stapelId) {
        DokumentenstapelEntity stapel = dokumentenstapelEntityRepository.findById(stapelId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Dokumentenstapel not found"));

        String status = stapel.getStatus();
        boolean allowed = DokumentenstapelStatus.UPLOADED.name().equals(status)
                || DokumentenstapelStatus.PARTIAL_FAILED.name().equals(status)
                || DokumentenstapelStatus.FAILED.name().equals(status);

        if (!allowed) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Dokumentenstapel status does not allow step1 trigger");
        }

        scheduleStep1AfterCommit(stapelId);
    }

    @Transactional(readOnly = true)
    public List<PageEntity> getPages(UUID stapelId) {
        if (!dokumentenstapelEntityRepository.existsById(stapelId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Dokumentenstapel not found");
        }
        return pageRepository.findAllByDokumentenstapelEntity_IdOrderByPageNoAsc(stapelId);
    }

    private void scheduleStep1AfterCommit(UUID stapelId) {
        if (TransactionSynchronizationManager.isActualTransactionActive()) {
            TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
                @Override
                public void afterCommit() {
                    step1ProcessingService.processStep1Async(stapelId);
                }
            });
            return;
        }
        step1ProcessingService.processStep1Async(stapelId);
    }
}
