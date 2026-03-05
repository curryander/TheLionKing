package de.drv.thelionking.api.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.drv.thelionking.api.ApiApi;
import de.drv.thelionking.data.page.Page;
import de.drv.thelionking.data.page.PageRepository;
import de.drv.thelionking.data.seitenextrakt.SeitenExtrakt;
import de.drv.thelionking.data.seitenextrakt.SeitenExtraktRepository;
import de.drv.thelionking.model.CreateVorgangResponse;
import de.drv.thelionking.model.PageExtractResponse;
import de.drv.thelionking.model.PageInfo;
import de.drv.thelionking.model.StapelProgress;
import de.drv.thelionking.model.VorgangWorkflowStatusResponse;
import de.drv.thelionking.workflow.dto.StapelProgressDto;
import de.drv.thelionking.workflow.service.VorgangWorkflowService;
import org.openapitools.jackson.nullable.JsonNullable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
public class ApiApiImpl implements ApiApi {
    private final VorgangWorkflowService vorgangWorkflowService;
    private final PageRepository pageRepository;
    private final SeitenExtraktRepository seitenExtraktRepository;
    private final ObjectMapper objectMapper;

    public ApiApiImpl(
            VorgangWorkflowService vorgangWorkflowService,
            PageRepository pageRepository,
            SeitenExtraktRepository seitenExtraktRepository,
            ObjectMapper objectMapper) {
        this.vorgangWorkflowService = vorgangWorkflowService;
        this.pageRepository = pageRepository;
        this.seitenExtraktRepository = seitenExtraktRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public ResponseEntity<CreateVorgangResponse> createVorgangWithUpload(
            MultipartFile file,
            Boolean startProcessing,
            String stapelName) {
        boolean start = startProcessing == null || startProcessing;
        var result = vorgangWorkflowService.createVorgangWithUpload(file, stapelName, start);

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
    public ResponseEntity<List<PageInfo>> getDokumentenstapelPages(UUID stapelId) {
        List<Page> pages = vorgangWorkflowService.getPages(stapelId);
        List<PageInfo> out = new ArrayList<>();
        for (Page page : pages) {
            PageInfo info = new PageInfo();
            info.setPageId(page.getId());
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
    public ResponseEntity<PageExtractResponse> getPageExtract(UUID pageId) {
        Page page = pageRepository.findById(pageId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Page not found"));
        SeitenExtrakt extrakt = seitenExtraktRepository.findBySeite_Id(page.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Extract not found"));

        PageExtractResponse response = new PageExtractResponse();
        response.setPageId(pageId);
        response.setMarkdown(extrakt.getMarkdown());
        response.setDoclingJson(parseDoclingJson(extrakt.getDoclingJson()));
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<Void> triggerDokumentenstapelStep1(UUID stapelId) {
        vorgangWorkflowService.triggerStep1(stapelId);
        return ResponseEntity.accepted().build();
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
