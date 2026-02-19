package de.drv.thelionking.api.impl;

import de.drv.thelionking.data.page.Page;
import de.drv.thelionking.data.page.PageRepository;
import de.drv.thelionking.data.vorgang.Vorgang;
import de.drv.thelionking.data.vorgang.VorgangRepository;
import de.drv.thelionking.service.ProcessingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/v1")
public class PreviewController {
    private final VorgangRepository vorgangRepository;
    private final PageRepository pageRepository;
    private final ProcessingService processingService;

    public PreviewController(VorgangRepository vorgangRepository,
                             PageRepository pageRepository,
                             ProcessingService processingService) {
        this.vorgangRepository = vorgangRepository;
        this.pageRepository = pageRepository;
        this.processingService = processingService;
    }

    @PostMapping(value = "/start-preview", consumes = MediaType.APPLICATION_PDF_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> startPreview(@RequestBody byte[] body) {
        if (body == null || body.length == 0) {
            return ResponseEntity.badRequest().body(Map.of("error", "Missing PDF body"));
        }
        Vorgang vorgang = new Vorgang(body);
        vorgang = vorgangRepository.save(vorgang);
        processingService.processDoclingOnlyAsync(vorgang.getId());
        return ResponseEntity.accepted().body(Map.of("id", vorgang.getId().toString()));
    }

    @GetMapping(value = "/preview/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @Transactional(readOnly = true)
    public ResponseEntity<Map<String, Object>> getPreview(@PathVariable String id) {
        final UUID uuid;
        try {
            uuid = UUID.fromString(id);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid id"));
        }
        Optional<Vorgang> vorgangOpt = vorgangRepository.findById(uuid);
        if (vorgangOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Vorgang not found"));
        }
        Vorgang vorgang = vorgangOpt.get();
        if (vorgang.getErrorCode() != null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", vorgang.getErrorMessage() != null ? vorgang.getErrorMessage() : vorgang.getErrorCode()));
        }
        if (vorgang.getProgress() < 60) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(Map.of("progress", vorgang.getProgress()));
        }

        List<Page> pages = pageRepository.findAllByVorgang_IdOrderByPageIndexAsc(uuid);
        List<Map<String, Object>> previewPages = new ArrayList<>();
        for (Page p : pages) {
            Map<String, Object> entry = new HashMap<>();
            entry.put("pageIndex", p.getPageIndex());
            entry.put("usable", p.isUsable());
            entry.put("markdown", p.getDoclingMarkdown());
            entry.put("json", p.getDoclingJson());
            previewPages.add(entry);
        }

        Map<String, Object> out = new HashMap<>();
        out.put("id", id);
        out.put("progress", vorgang.getProgress());
        out.put("readyForLlm", true);
        out.put("pages", previewPages);
        return ResponseEntity.ok(out);
    }

    @PostMapping(value = "/continue/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> continueWithLlm(@PathVariable String id) {
        final UUID uuid;
        try {
            uuid = UUID.fromString(id);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid id"));
        }
        Optional<Vorgang> vorgangOpt = vorgangRepository.findById(uuid);
        if (vorgangOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Vorgang not found"));
        }
        Vorgang vorgang = vorgangOpt.get();
        if (vorgang.getErrorCode() != null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", vorgang.getErrorMessage() != null ? vorgang.getErrorMessage() : vorgang.getErrorCode()));
        }
        if (vorgang.getProgress() < 60) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "Docling preview not finished yet", "progress", vorgang.getProgress()));
        }
        if (vorgang.getProgress() >= 100) {
            return ResponseEntity.ok(Map.of("id", id, "message", "Processing already completed"));
        }
        if (vorgang.getProgress() > 60) {
            return ResponseEntity.accepted().body(Map.of("id", id, "message", "LLM processing already running"));
        }
        vorgang.setProgress(61);
        vorgangRepository.save(vorgang);
        processingService.continueWithLlmAsync(uuid);
        return ResponseEntity.accepted().body(Map.of("id", id, "message", "LLM processing started"));
    }
}
