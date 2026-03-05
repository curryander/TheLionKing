package de.drv.thelionking.workflow.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.drv.thelionking.data.page.Page;
import de.drv.thelionking.data.page.PageRepository;
import de.drv.thelionking.data.seitenextrakt.SeitenExtrakt;
import de.drv.thelionking.data.seitenextrakt.SeitenExtraktRepository;
import de.drv.thelionking.workflow.dto.CreateVorgangResponse;
import de.drv.thelionking.workflow.dto.PageExtractResponse;
import de.drv.thelionking.workflow.dto.PageInfoDto;
import de.drv.thelionking.workflow.dto.VorgangStatusResponse;
import de.drv.thelionking.workflow.service.VorgangWorkflowService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
public class WorkflowController {
    private final VorgangWorkflowService vorgangWorkflowService;
    private final PageRepository pageRepository;
    private final SeitenExtraktRepository seitenExtraktRepository;
    private final ObjectMapper objectMapper;

    public WorkflowController(
            VorgangWorkflowService vorgangWorkflowService,
            PageRepository pageRepository,
            SeitenExtraktRepository seitenExtraktRepository,
            ObjectMapper objectMapper) {
        this.vorgangWorkflowService = vorgangWorkflowService;
        this.pageRepository = pageRepository;
        this.seitenExtraktRepository = seitenExtraktRepository;
        this.objectMapper = objectMapper;
    }

    @PostMapping(value = "/vorgaenge", consumes = "multipart/form-data")
    public ResponseEntity<CreateVorgangResponse> createVorgang(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "stapelName", required = false) String stapelName,
            @RequestParam(value = "startProcessing", defaultValue = "true") boolean startProcessing) {

        var result = vorgangWorkflowService.createVorgangWithUpload(file, stapelName, startProcessing);
        CreateVorgangResponse response = new CreateVorgangResponse();
        response.setVorgangId(result.getVorgangId());
        response.setStapelId(result.getStapelId());

        if (startProcessing) {
            response.setProcessingStatus("RUNNING");
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
        }
        response.setStatus("UPLOADED");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/vorgaenge/{vorgangId}")
    public ResponseEntity<VorgangStatusResponse> getVorgang(@PathVariable UUID vorgangId) {
        return ResponseEntity.ok(vorgangWorkflowService.getVorgangStatus(vorgangId));
    }

    @GetMapping("/dokumentenstapel/{stapelId}/pages")
    public ResponseEntity<List<PageInfoDto>> getPages(@PathVariable UUID stapelId) {
        List<Page> pages = vorgangWorkflowService.getPages(stapelId);
        List<PageInfoDto> out = new ArrayList<>();
        for (Page page : pages) {
            PageInfoDto dto = new PageInfoDto();
            dto.setPageId(page.getId());
            dto.setPageNo(page.getPageNo());
            dto.setStatus(page.getStatus());
            dto.setErrorMessage(page.getErrorMessage());
            out.add(dto);
        }
        return ResponseEntity.ok(out);
    }

    @GetMapping("/pages/{pageId}/extract")
    public ResponseEntity<PageExtractResponse> getPageExtract(@PathVariable UUID pageId) {
        Page page = pageRepository.findById(pageId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Page not found"));
        SeitenExtrakt extrakt = seitenExtraktRepository.findBySeite_Id(page.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Extract not found"));

        PageExtractResponse response = new PageExtractResponse();
        response.setPageId(pageId);
        response.setMarkdown(extrakt.getMarkdown());
        response.setDoclingJson(parseJson(extrakt.getDoclingJson()));
        return ResponseEntity.ok(response);
    }

    @PostMapping("/dokumentenstapel/{stapelId}/split-and-extract")
    public ResponseEntity<Void> triggerStep1(@PathVariable UUID stapelId) {
        vorgangWorkflowService.triggerStep1(stapelId);
        return ResponseEntity.accepted().build();
    }

    private JsonNode parseJson(String raw) {
        if (raw == null || raw.isBlank()) {
            return objectMapper.nullNode();
        }
        try {
            return objectMapper.readTree(raw);
        } catch (Exception e) {
            return objectMapper.getNodeFactory().textNode(raw);
        }
    }
}
