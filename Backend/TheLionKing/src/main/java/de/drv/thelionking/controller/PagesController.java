package de.drv.thelionking.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.drv.thelionking.api.PagesApi;
import de.drv.thelionking.data.entities.page.PageEntity;
import de.drv.thelionking.data.entities.page.PageRepository;
import de.drv.thelionking.data.entities.seitenextrakt.SeitenExtrakt;
import de.drv.thelionking.data.entities.seitenextrakt.SeitenExtraktRepository;
import de.drv.thelionking.model.PageExtractResponse;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.InvalidPathException;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
public class PagesController implements PagesApi {
    private final PageRepository pageRepository;
    private final SeitenExtraktRepository seitenExtraktRepository;
    private final ObjectMapper objectMapper;

    public PagesController(
            PageRepository pageRepository,
            SeitenExtraktRepository seitenExtraktRepository,
            ObjectMapper objectMapper) {
        this.pageRepository = pageRepository;
        this.seitenExtraktRepository = seitenExtraktRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public Optional<NativeWebRequest> getRequest() {
        return PagesApi.super.getRequest();
    }

    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<PageExtractResponse> getPageExtract(UUID pageId) {
        PageEntity pageEntity = pageRepository.findById(pageId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Page not found"));
        SeitenExtrakt extrakt = seitenExtraktRepository.findBySeite_Id(pageEntity.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Extract not found"));

        PageExtractResponse response = new PageExtractResponse();
        response.setPageId(pageId);
        response.setText(pageEntity.getExtractedText() == null ? "" : pageEntity.getExtractedText());
        response.setMarkdown(extrakt.getMarkdown());
        response.setDoclingJson(parseDoclingJson(extrakt.getDoclingJson()));
        return ResponseEntity.ok(response);
    }

    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<Resource> getPagePdf(UUID pageId) {
        PageEntity pageEntity = pageRepository.findById(pageId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Page not found"));

        byte[] pdfBytes = loadPagePdfBytes(pageEntity);
        if (pdfBytes == null || pdfBytes.length == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Page PDF not found");
        }

        ByteArrayResource resource = new ByteArrayResource(pdfBytes);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentLength(pdfBytes.length);
        headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"page-" + pageEntity.getPageNo() + ".pdf\"");
        return new ResponseEntity<>(resource, headers, HttpStatus.OK);
    }

    private byte[] loadPagePdfBytes(PageEntity pageEntity) {
        String pagePath = pageEntity.getPdfPagePath();
        if (pagePath != null && !pagePath.isBlank()) {
            try {
                Path path = Path.of(pagePath);
                if (Files.exists(path)) {
                    return Files.readAllBytes(path);
                }
            } catch (InvalidPathException | IOException ignored) {
                // Fall back to the DB field if the file path is unusable.
            }
        }
        return pageEntity.getPdf();
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
