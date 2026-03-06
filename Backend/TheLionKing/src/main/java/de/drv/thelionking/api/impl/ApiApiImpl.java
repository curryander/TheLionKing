package de.drv.thelionking.api.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.drv.thelionking.data.dokumentenstapel.Dokumentenstapel;
import de.drv.thelionking.data.dokumentenstapel.DokumentenstapelRepository;
import de.drv.thelionking.api.ApiApi;
import de.drv.thelionking.data.page.Page;
import de.drv.thelionking.data.page.PageRepository;
import de.drv.thelionking.data.seitenextrakt.SeitenExtrakt;
import de.drv.thelionking.data.seitenextrakt.SeitenExtraktRepository;
import de.drv.thelionking.data.vorgang.VorgangRepository;
import de.drv.thelionking.model.CreateVorgangResponse;
import de.drv.thelionking.model.PageExtractResponse;
import de.drv.thelionking.model.PageInfo;
import de.drv.thelionking.model.StapelProgress;
import de.drv.thelionking.model.VorgangPageResult;
import de.drv.thelionking.model.VorgangResultsResponse;
import de.drv.thelionking.model.VorgangStapelResult;
import de.drv.thelionking.model.VorgangWorkflowStatusResponse;
import de.drv.thelionking.workflow.dto.StapelProgressDto;
import de.drv.thelionking.workflow.service.VorgangWorkflowService;
import org.openapitools.jackson.nullable.JsonNullable;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.InvalidPathException;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
public class ApiApiImpl implements ApiApi {
    private final VorgangWorkflowService vorgangWorkflowService;
    private final VorgangRepository vorgangRepository;
    private final DokumentenstapelRepository dokumentenstapelRepository;
    private final PageRepository pageRepository;
    private final SeitenExtraktRepository seitenExtraktRepository;
    private final ObjectMapper objectMapper;

    public ApiApiImpl(
            VorgangWorkflowService vorgangWorkflowService,
            VorgangRepository vorgangRepository,
            DokumentenstapelRepository dokumentenstapelRepository,
            PageRepository pageRepository,
            SeitenExtraktRepository seitenExtraktRepository,
            ObjectMapper objectMapper) {
        this.vorgangWorkflowService = vorgangWorkflowService;
        this.vorgangRepository = vorgangRepository;
        this.dokumentenstapelRepository = dokumentenstapelRepository;
        this.pageRepository = pageRepository;
        this.seitenExtraktRepository = seitenExtraktRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public ResponseEntity<CreateVorgangResponse> createVorgangWithUpload(
            MultipartFile file,
            String vsnr,
            Boolean startProcessing,
            String stapelName) {
        boolean start = startProcessing == null || startProcessing;
        var result = vorgangWorkflowService.createVorgangWithUpload(file, stapelName, vsnr, start);

        CreateVorgangResponse response = new CreateVorgangResponse();
        response.setVorgangId(result.getVorgangId());
        response.setStapelId(result.getStapelId());
        if (start) {
            response.setProcessingStatus(JsonNullable.of("RUNNING"));
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
        }
        response.setStatus(JsonNullable.of("UPLOADED"));
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @Override
    public ResponseEntity<VorgangWorkflowStatusResponse> getVorgangWorkflowStatus(UUID vorgangId) {
        var data = vorgangWorkflowService.getVorgangStatus(vorgangId);
        VorgangWorkflowStatusResponse response = new VorgangWorkflowStatusResponse();
        response.setVorgangId(data.getVorgangId());
        response.setStatus(data.getStatus());
        response.setPagesTotal(data.getPagesTotal());
        response.setPagesDone(data.getPagesDone());
        response.setPagesFailed(data.getPagesFailed());

        List<StapelProgress> stapel = new ArrayList<>();
        for (StapelProgressDto dto : data.getStapel()) {
            StapelProgress sp = new StapelProgress();
            sp.setStapelId(dto.getStapelId());
            sp.setStatus(dto.getStatus());
            sp.setPagesTotal(dto.getPagesTotal());
            sp.setPagesDone(dto.getPagesDone());
            sp.setPagesFailed(dto.getPagesFailed());
            stapel.add(sp);
        }
        response.setStapel(stapel);
        return ResponseEntity.ok(response);
    }

    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<VorgangResultsResponse> getVorgangResults(UUID vorgangId) {
        var vorgang = vorgangRepository.findById(vorgangId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vorgang not found"));

        List<Dokumentenstapel> stapelList = dokumentenstapelRepository.findAllByVorgang_IdOrderByCreatedAtAsc(vorgangId);
        List<VorgangStapelResult> stapelResults = new ArrayList<>();

        for (Dokumentenstapel stapel : stapelList) {
            List<Page> pages = pageRepository.findAllByDokumentenstapel_IdOrderByPageNoAsc(stapel.getId());
            List<SeitenExtrakt> extrakte = seitenExtraktRepository
                    .findAllBySeite_Dokumentenstapel_IdOrderBySeite_PageNoAsc(stapel.getId());
            Map<UUID, SeitenExtrakt> extraktByPageId = new HashMap<>();
            for (SeitenExtrakt extrakt : extrakte) {
                if (extrakt.getSeite() != null && extrakt.getSeite().getId() != null) {
                    extraktByPageId.put(extrakt.getSeite().getId(), extrakt);
                }
            }

            List<VorgangPageResult> pageResults = new ArrayList<>();
            for (Page page : pages) {
                SeitenExtrakt extrakt = extraktByPageId.get(page.getId());

                VorgangPageResult pageResult = new VorgangPageResult();
                pageResult.setPageId(page.getId());
                pageResult.setPdfUrl(buildPagePdfUrl(page.getId()));
                pageResult.setPageNo(page.getPageNo());
                pageResult.setStatus(page.getStatus() == null ? "" : page.getStatus());
                if (page.getErrorMessage() != null) {
                    pageResult.setErrorMessage(JsonNullable.of(page.getErrorMessage()));
                }
                pageResult.setText(page.getExtractedText() == null ? "" : page.getExtractedText());
                pageResult.setMarkdown(extrakt == null || extrakt.getMarkdown() == null ? "" : extrakt.getMarkdown());
                pageResult.setDoclingJson(parseDoclingJson(extrakt == null ? null : extrakt.getDoclingJson()));
                pageResults.add(pageResult);
            }

            VorgangStapelResult stapelResult = new VorgangStapelResult();
            stapelResult.setStapelId(stapel.getId());
            stapelResult.setStapelName(stapel.getStapelName() == null ? "" : stapel.getStapelName());
            stapelResult.setStatus(stapel.getStatus() == null ? "" : stapel.getStatus());
            stapelResult.setPages(pageResults);
            stapelResults.add(stapelResult);
        }

        VorgangResultsResponse response = new VorgangResultsResponse();
        response.setVorgangId(vorgang.getId());
        response.setStatus(vorgang.getStatus() == null ? "" : vorgang.getStatus());
        response.setStapel(stapelResults);
        return ResponseEntity.ok(response);
    }

    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<List<PageInfo>> getDokumentenstapelPages(UUID stapelId) {
        List<Page> pages = vorgangWorkflowService.getPages(stapelId);
        List<PageInfo> out = new ArrayList<>();
        for (Page page : pages) {
            PageInfo info = new PageInfo();
            info.setPageId(page.getId());
            info.setPdfUrl(buildPagePdfUrl(page.getId()));
            info.setPageNo(page.getPageNo());
            info.setStatus(page.getStatus());
            if (page.getErrorMessage() != null) {
                info.setErrorMessage(JsonNullable.of(page.getErrorMessage()));
            }
            out.add(info);
        }
        return ResponseEntity.ok(out);
    }

    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<PageExtractResponse> getPageExtract(UUID pageId) {
        Page page = pageRepository.findById(pageId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Page not found"));
        SeitenExtrakt extrakt = seitenExtraktRepository.findBySeite_Id(page.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Extract not found"));

        PageExtractResponse response = new PageExtractResponse();
        response.setPageId(pageId);
        response.setText(page.getExtractedText() == null ? "" : page.getExtractedText());
        response.setMarkdown(extrakt.getMarkdown());
        response.setDoclingJson(parseDoclingJson(extrakt.getDoclingJson()));
        return ResponseEntity.ok(response);
    }

    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<Resource> getPagePdf(UUID pageId) {
        Page page = pageRepository.findById(pageId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Page not found"));

        byte[] pdfBytes = loadPagePdfBytes(page);
        if (pdfBytes == null || pdfBytes.length == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Page PDF not found");
        }

        ByteArrayResource resource = new ByteArrayResource(pdfBytes);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentLength(pdfBytes.length);
        headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"page-" + page.getPageNo() + ".pdf\"");
        return new ResponseEntity<>(resource, headers, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Void> triggerDokumentenstapelStep1(UUID stapelId) {
        vorgangWorkflowService.triggerStep1(stapelId);
        return ResponseEntity.accepted().build();
    }

    private byte[] loadPagePdfBytes(Page page) {
        String pagePath = page.getPdfPagePath();
        if (pagePath != null && !pagePath.isBlank()) {
            try {
                Path path = Path.of(pagePath);
                if (Files.exists(path)) {
                    return Files.readAllBytes(path);
                }
            } catch (InvalidPathException | IOException ignored) {
                // fall back to DB content
            }
        }
        return page.getPdf();
    }

    private String buildPagePdfUrl(UUID pageId) {
        return "/api/v1/pages/" + pageId + "/pdf";
    }

    private Map<String, Object> parseDoclingJson(String raw) {
        if (raw == null || raw.isBlank()) {
            return new HashMap<>();
        }
        try {
            var node = objectMapper.readTree(raw);
            if (node.isObject()) {
                return objectMapper.convertValue(node, Map.class);
            }
            Map<String, Object> wrapped = new HashMap<>();
            wrapped.put("value", node);
            return wrapped;
        } catch (Exception e) {
            Map<String, Object> wrapped = new HashMap<>();
            wrapped.put("raw", raw);
            return wrapped;
        }
    }
}

