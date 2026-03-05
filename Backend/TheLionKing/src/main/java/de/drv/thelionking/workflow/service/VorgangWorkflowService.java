package de.drv.thelionking.workflow.service;

import de.drv.thelionking.data.dokumentenstapel.Dokumentenstapel;
import de.drv.thelionking.data.dokumentenstapel.DokumentenstapelRepository;
import de.drv.thelionking.data.page.Page;
import de.drv.thelionking.data.page.PageRepository;
import de.drv.thelionking.data.vorgang.Vorgang;
import de.drv.thelionking.data.vorgang.VorgangRepository;
import de.drv.thelionking.workflow.dto.CreateVorgangResult;
import de.drv.thelionking.workflow.dto.StapelProgressDto;
import de.drv.thelionking.workflow.dto.VorgangStatusResponse;
import de.drv.thelionking.workflow.model.DokumentenstapelStatus;
import de.drv.thelionking.workflow.model.SeiteStatus;
import de.drv.thelionking.workflow.model.VorgangStatus;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class VorgangWorkflowService {
    private final VorgangRepository vorgangRepository;
    private final DokumentenstapelRepository dokumentenstapelRepository;
    private final PageRepository pageRepository;
    private final StorageService storageService;
    private final Step1ProcessingService step1ProcessingService;

    public VorgangWorkflowService(
            VorgangRepository vorgangRepository,
            DokumentenstapelRepository dokumentenstapelRepository,
            PageRepository pageRepository,
            StorageService storageService,
            Step1ProcessingService step1ProcessingService) {
        this.vorgangRepository = vorgangRepository;
        this.dokumentenstapelRepository = dokumentenstapelRepository;
        this.pageRepository = pageRepository;
        this.storageService = storageService;
        this.step1ProcessingService = step1ProcessingService;
    }

    @Transactional
    public CreateVorgangResult createVorgangWithUpload(MultipartFile pdf, String stapelName, boolean startProcessing) {
        if (pdf == null || pdf.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "file is required");
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
        vorgang = vorgangRepository.save(vorgang);

        Dokumentenstapel stapel = new Dokumentenstapel();
        stapel.setVorgang(vorgang);
        stapel.setStapelName((stapelName == null || stapelName.isBlank()) ? "Dokumentenstapel" : stapelName);
        stapel.setStatus(DokumentenstapelStatus.UPLOADED.name());
        stapel.setOriginalFilename(pdf.getOriginalFilename());
        stapel.setUploadFilename(pdf.getOriginalFilename());
        stapel.setUploadPdf(bytes);
        stapel = dokumentenstapelRepository.save(stapel);

        try {
            String storageRef = storageService.saveOriginalPdf(stapel.getId(), bytes).toString();
            stapel.setPdfStorageRef(storageRef);
            stapel = dokumentenstapelRepository.save(stapel);
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Could not persist uploaded PDF");
        }

        if (startProcessing) {
            step1ProcessingService.processStep1(stapel.getId());
        }

        return new CreateVorgangResult(vorgang.getId(), stapel.getId());
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

        List<Dokumentenstapel> stapelList = new ArrayList<>(vorgang.getDokumentenstapel());

        long totalAll = 0;
        long doneAll = 0;
        long failedAll = 0;
        List<StapelProgressDto> stapelDtos = new ArrayList<>();

        for (Dokumentenstapel stapel : stapelList) {
            long total = pageRepository.countByDokumentenstapel_Id(stapel.getId());
            long done = pageRepository.countByDokumentenstapel_IdAndStatus(stapel.getId(), SeiteStatus.EXTRACT_DONE.name());
            long failed = pageRepository.countByDokumentenstapel_IdAndStatus(stapel.getId(), SeiteStatus.FAILED.name());

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
        Dokumentenstapel stapel = dokumentenstapelRepository.findById(stapelId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Dokumentenstapel not found"));

        String status = stapel.getStatus();
        boolean allowed = DokumentenstapelStatus.UPLOADED.name().equals(status)
                || DokumentenstapelStatus.PARTIAL_FAILED.name().equals(status)
                || DokumentenstapelStatus.FAILED.name().equals(status);

        if (!allowed) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Dokumentenstapel status does not allow step1 trigger");
        }

        step1ProcessingService.processStep1(stapelId);
    }

    @Transactional(readOnly = true)
    public List<Page> getPages(UUID stapelId) {
        if (!dokumentenstapelRepository.existsById(stapelId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Dokumentenstapel not found");
        }
        return pageRepository.findAllByDokumentenstapel_IdOrderByPageNoAsc(stapelId);
    }
}
