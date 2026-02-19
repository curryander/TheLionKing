package de.drv.thelionking.service;

import de.drv.thelionking.config.DoclingProperties;
import lombok.extern.slf4j.Slf4j;
import de.drv.thelionking.service.dto.DoclingResult;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientResponseException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.net.URI;

@Service
@Slf4j
public class DoclingService {
    private final RestTemplate restTemplate;
    private final DoclingProperties props;

    public DoclingService(RestTemplate restTemplate, DoclingProperties props) {
        this.restTemplate = restTemplate;
        this.props = props;
    }

    public DoclingResult extractDocling(byte[] pdfPageBytes) {
        String base = props.getBaseUrl();
        if (base == null || base.isBlank()) {
            throw new IllegalStateException("docling.base-url not configured");
        }
        String path = defaultPath(props.getConvertFilePath());
        URI uri = URI.create(join(base, path));
        log.info("Docling request -> POST {}", uri);

        // multipart/form-data with 'files' and to_formats=json
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        String apiKey = props.getApiKey();
        if (apiKey != null && !apiKey.isBlank()) {
            headers.set("X-Api-Key", apiKey);
        }

        ByteArrayResource fileRes = new ByteArrayResource(pdfPageBytes) {
            @Override
            public String getFilename() { return "page.pdf"; }
        };
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("files", fileRes);
        body.add("from_formats", "pdf");
        body.add("to_formats", "json");
        body.add("to_formats", "md");

        HttpEntity<MultiValueMap<String, Object>> entity = new HttpEntity<>(body, headers);
        ResponseEntity<String> resp = null;
        RuntimeException lastError = null;
        for (int attempt = 1; attempt <= 3; attempt++) {
            try {
                resp = restTemplate.postForEntity(uri, entity, String.class);
                break;
            } catch (RestClientResponseException e) {
                String responseBody = e.getResponseBodyAsString();
                String preview = responseBody != null && responseBody.length() > 1000 ? responseBody.substring(0,1000) + "..." : responseBody;
                log.error("Docling call failed: attempt={}, status={}, url={}, body~preview={}", attempt, e.getRawStatusCode(), uri, preview);
                lastError = new IllegalStateException("Docling convert failed: " + e.getRawStatusCode(), e);
            } catch (ResourceAccessException e) {
                log.warn("Docling call network error: attempt={}, url={}, msg={}", attempt, uri, e.getMessage());
                lastError = new IllegalStateException("Docling network failure", e);
            }
            if (attempt < 3) {
                try {
                    Thread.sleep(500L * attempt);
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                    throw new IllegalStateException("Docling retry interrupted", ie);
                }
            }
        }
        if (resp == null) {
            throw lastError != null ? lastError : new IllegalStateException("Docling convert failed");
        }
        if (!resp.getStatusCode().is2xxSuccessful()) {
            String responseBody = resp.getBody();
            String preview = responseBody != null && responseBody.length() > 1000 ? responseBody.substring(0,1000) + "..." : responseBody;
            log.error("Docling call non-success: status={}, url={}, body~preview={}", resp.getStatusCode(), uri, preview);
            throw new IllegalStateException("Docling convert failed: " + resp.getStatusCode());
        }
        // Try to return document.json_content and document.md_content
        try {
            com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
            com.fasterxml.jackson.databind.JsonNode root = mapper.readTree(resp.getBody());
            com.fasterxml.jackson.databind.JsonNode docNode = root.path("document");
            com.fasterxml.jackson.databind.JsonNode jsonContent = docNode.path("json_content");
            com.fasterxml.jackson.databind.JsonNode mdContent = docNode.path("md_content");
            String jsonStr = (!jsonContent.isMissingNode() && !jsonContent.isNull()) ? mapper.writeValueAsString(jsonContent) : null;
            String mdStr = (!mdContent.isMissingNode() && !mdContent.isNull()) ? mdContent.asText() : null;
            // Remove embedded base64 images from markdown for downstream LLM processing
            mdStr = stripBase64Images(mdStr);
            return new DoclingResult(jsonStr, mdStr);
        } catch (Exception ex) {
            log.warn("Docling response did not contain document.json_content, returning raw body. ex={}", ex.toString());
        }
        return new DoclingResult(resp.getBody(), null);
    }

    private String stripBase64Images(String markdown) {
        if (markdown == null || markdown.isBlank()) return markdown;
        String withoutMdImages = markdown.replaceAll("!\\[[^\\]]*]\\(data:image/[a-zA-Z0-9.+-]+;base64,[^)]+\\)", "");
        String withoutImgDouble = withoutMdImages.replaceAll("<img[^>]+src\\s*=\\s*\"data:image/[a-zA-Z0-9.+-]+;base64,[^\"]+\"[^>]*>", "");
        String withoutImgSingle = withoutImgDouble.replaceAll("<img[^>]+src\\s*=\\s*'data:image/[a-zA-Z0-9.+-]+;base64,[^']+'[^>]*>", "");
        return withoutImgSingle;
    }

    private String join(String base, String path) {
        if (base.endsWith("/") && path.startsWith("/")) return base + path.substring(1);
        if (!base.endsWith("/") && !path.startsWith("/")) return base + "/" + path;
        return base + path;
    }

    private String defaultPath(String p) { return (p == null || p.isBlank()) ? "/" : p; }
}
