package de.drv.thelionking.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.drv.thelionking.api.VorgaengeApi;
import de.drv.thelionking.data.entities.dokumentenstapel.DokumentenstapelEntity;
import de.drv.thelionking.data.entities.dokumentenstapel.DokumentenstapelEntityRepository;
import de.drv.thelionking.data.entities.page.PageEntity;
import de.drv.thelionking.data.entities.page.PageRepository;
import de.drv.thelionking.data.entities.seitenextrakt.SeitenExtrakt;
import de.drv.thelionking.data.entities.seitenextrakt.SeitenExtraktRepository;
import de.drv.thelionking.data.entities.vorgang.Vorgang;
import de.drv.thelionking.data.entities.vorgang.VorgangRepository;
import de.drv.thelionking.model.CreateVorgangResponse;
import de.drv.thelionking.model.StapelProgress;
import de.drv.thelionking.model.VorgangPageResult;
import de.drv.thelionking.model.VorgangResultsResponse;
import de.drv.thelionking.model.VorgangStapelResult;
import de.drv.thelionking.model.VorgangWorkflowStatusResponse;
import de.drv.thelionking.workflow.dto.StapelProgressDto;
import de.drv.thelionking.workflow.service.VorgangWorkflowService;
import org.openapitools.jackson.nullable.JsonNullable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
public class VorgaengeController implements VorgaengeApi {
    private final VorgangWorkflowService vorgangWorkflowService;
    private final VorgangRepository vorgangRepository;
    private final DokumentenstapelEntityRepository dokumentenstapelEntityRepository;
    private final PageRepository pageRepository;
    private final SeitenExtraktRepository seitenExtraktRepository;
    private final ObjectMapper objectMapper;

    public VorgaengeController(
            VorgangWorkflowService vorgangWorkflowService,
            VorgangRepository vorgangRepository,
            DokumentenstapelEntityRepository dokumentenstapelEntityRepository,
            PageRepository pageRepository,
            SeitenExtraktRepository seitenExtraktRepository,
            ObjectMapper objectMapper) {
        this.vorgangWorkflowService = vorgangWorkflowService;
        this.vorgangRepository = vorgangRepository;
        this.dokumentenstapelEntityRepository = dokumentenstapelEntityRepository;
        this.pageRepository = pageRepository;
        this.seitenExtraktRepository = seitenExtraktRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public Optional<NativeWebRequest> getRequest() {
        return VorgaengeApi.super.getRequest();
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
        vorgangRepository.findById(vorgangId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vorgang not found"));

        var data = vorgangWorkflowService.getVorgangStatus(vorgangId);
        VorgangWorkflowStatusResponse response = new VorgangWorkflowStatusResponse();
        response.setVorgangId(data.getVorgangId());
        response.setStatus(data.getStatus());
        response.setPagesTotal(data.getPagesTotal());
        response.setPagesDone(data.getPagesDone());
        response.setPagesFailed(data.getPagesFailed());

        List<StapelProgress> stapel = new ArrayList<>();
        for (StapelProgressDto dto : data.getStapel()) {
            StapelProgress progress = new StapelProgress();
            progress.setStapelId(dto.getStapelId());
            progress.setStatus(dto.getStatus());
            progress.setPagesTotal(dto.getPagesTotal());
            progress.setPagesDone(dto.getPagesDone());
            progress.setPagesFailed(dto.getPagesFailed());
            stapel.add(progress);
        }
        response.setStapel(stapel);
        return ResponseEntity.ok(response);
    }

    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<VorgangResultsResponse> getVorgangResults(UUID vorgangId) {
        Vorgang vorgang = vorgangRepository.findById(vorgangId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vorgang not found"));

        List<DokumentenstapelEntity> stapelList = dokumentenstapelEntityRepository.findAllByVorgang_IdOrderByCreatedAtAsc(vorgangId);
        List<VorgangStapelResult> stapelResults = new ArrayList<>();

        for (DokumentenstapelEntity stapel : stapelList) {
            List<PageEntity> pageEntities = pageRepository.findAllByDokumentenstapelEntity_IdOrderByPageNoAsc(stapel.getId());
            List<SeitenExtrakt> extrakte = seitenExtraktRepository
                    .findAllBySeite_DokumentenstapelEntity_IdOrderBySeite_PageNoAsc(stapel.getId());
            Map<UUID, Map<String, Object>> completeExtractByPageId = parseCompleteJsonExtractByPageId(stapel.getCompleteJsonExtract());
            Map<UUID, SeitenExtrakt> extraktByPageId = new HashMap<>();
            for (SeitenExtrakt extrakt : extrakte) {
                if (extrakt.getSeite() != null && extrakt.getSeite().getId() != null) {
                    extraktByPageId.put(extrakt.getSeite().getId(), extrakt);
                }
            }

            List<VorgangPageResult> pageResults = new ArrayList<>();
            for (PageEntity pageEntity : pageEntities) {
                SeitenExtrakt extrakt = extraktByPageId.get(pageEntity.getId());

                VorgangPageResult pageResult = new VorgangPageResult();
                pageResult.setPageId(pageEntity.getId());
                pageResult.setPdfUrl(buildPagePdfUrl(pageEntity.getId()));
                pageResult.setPageNo(pageEntity.getPageNo());
                pageResult.setStatus(pageEntity.getStatus() == null ? "" : pageEntity.getStatus());
                String errorMessage = pageEntity.getErrorMessage();
                if (errorMessage == null || errorMessage.isBlank()) {
                    errorMessage = extractErrorMessage(completeExtractByPageId.get(pageEntity.getId()));
                }
                if (errorMessage != null) {
                    pageResult.setErrorMessage(JsonNullable.of(errorMessage));
                }
                pageResult.setText(pageEntity.getExtractedText() == null ? "" : pageEntity.getExtractedText());
                pageResult.setMarkdown(extrakt == null || extrakt.getMarkdown() == null ? "" : extrakt.getMarkdown());
                Map<String, Object> doclingJson = parseDoclingJson(extrakt == null ? null : extrakt.getDoclingJson());
                if (doclingJson.isEmpty()) {
                    Map<String, Object> completeExtract = extractDoclingJson(completeExtractByPageId.get(pageEntity.getId()));
                    if (!completeExtract.isEmpty()) {
                        doclingJson = completeExtract;
                    }
                }
                pageResult.setDoclingJson(doclingJson);
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

    private String buildPagePdfUrl(UUID pageId) {
        return "/pages/" + pageId + "/pdf";
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

    private Map<UUID, Map<String, Object>> parseCompleteJsonExtractByPageId(String raw) {
        Map<UUID, Map<String, Object>> result = new HashMap<>();
        if (raw == null || raw.isBlank()) {
            return result;
        }
        try {
            JsonNode root = objectMapper.readTree(raw);
            if (!root.isArray()) {
                return result;
            }
            for (JsonNode pageNode : root) {
                JsonNode pageIdNode = pageNode.get("pageId");
                if (pageIdNode == null || pageIdNode.isNull() || pageIdNode.asText().isBlank()) {
                    continue;
                }
                UUID pageId = UUID.fromString(pageIdNode.asText());
                result.put(pageId, objectMapper.convertValue(pageNode, Map.class));
            }
            return result;
        } catch (Exception e) {
            return new HashMap<>();
        }
    }

    private Map<String, Object> extractDoclingJson(Map<String, Object> completeExtractPage) {
        if (completeExtractPage == null) {
            return new HashMap<>();
        }
        Object doclingJson = completeExtractPage.get("doclingJson");
        if (doclingJson instanceof Map<?, ?> mapValue) {
            Map<String, Object> result = new HashMap<>();
            for (Map.Entry<?, ?> entry : mapValue.entrySet()) {
                if (entry.getKey() instanceof String key) {
                    result.put(key, entry.getValue());
                }
            }
            return result;
        }
        return new HashMap<>();
    }

    private String extractErrorMessage(Map<String, Object> completeExtractPage) {
        if (completeExtractPage == null) {
            return null;
        }
        Object errorMessage = completeExtractPage.get("errorMessage");
        if (errorMessage instanceof String message && !message.isBlank()) {
            return message;
        }
        return null;
    }
}
