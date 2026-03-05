package de.drv.thelionking.workflow.client;

import com.fasterxml.jackson.databind.JsonNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

import java.nio.file.Path;

@Component
@ConditionalOnProperty(name = "extraction.client", havingValue = "docling")
public class RestExtractionClient implements ExtractionClient {
    private static final Logger log = LoggerFactory.getLogger(RestExtractionClient.class);

    private final RestTemplate restTemplate;
    private final String baseUrl;
    private final String convertFilePath;
    private final String apiKey;
    private final boolean doOcr;
    private final boolean forceOcr;
    private final String ocrEngine;
    private final String ocrLang;
    private final String pdfBackend;
    private final boolean doTableStructure;

    public RestExtractionClient(
            @Value("${docling.base-url:http://localhost:5001}") String baseUrl,
            @Value("${docling.convert-file-path:/v1/convert/file}") String convertFilePath,
            @Value("${docling.api-key:}") String apiKey,
            @Value("${docling.do-ocr:true}") boolean doOcr,
            @Value("${docling.force-ocr:true}") boolean forceOcr,
            @Value("${docling.ocr-engine:easyocr}") String ocrEngine,
            @Value("${docling.ocr-lang:de,en}") String ocrLang,
            @Value("${docling.pdf-backend:docling_parse}") String pdfBackend,
            @Value("${docling.do-table-structure:true}") boolean doTableStructure) {
        this.restTemplate = new RestTemplate();
        this.baseUrl = baseUrl;
        this.convertFilePath = convertFilePath;
        this.apiKey = apiKey;
        this.doOcr = doOcr;
        this.forceOcr = forceOcr;
        this.ocrEngine = ocrEngine;
        this.ocrLang = ocrLang;
        this.pdfBackend = pdfBackend;
        this.doTableStructure = doTableStructure;
    }

    @Override
    public ExtractionResult extract(Path pdfPagePath) {
        String url = resolveUrl();

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("files", new FileSystemResource(pdfPagePath.toFile()));
        body.add("to_formats", "md");
        body.add("to_formats", "json");
        body.add("to_formats", "text");
        body.add("do_ocr", String.valueOf(doOcr));
        body.add("force_ocr", String.valueOf(forceOcr));
        body.add("do_table_structure", String.valueOf(doTableStructure));
        body.add("include_images", "false");
        if (ocrEngine != null && !ocrEngine.isBlank()) {
            body.add("ocr_engine", ocrEngine);
        }
        if (pdfBackend != null && !pdfBackend.isBlank()) {
            body.add("pdf_backend", pdfBackend);
        }
        if (ocrLang != null && !ocrLang.isBlank()) {
            for (String lang : ocrLang.split(",")) {
                String trimmed = lang.trim();
                if (!trimmed.isEmpty()) {
                    body.add("ocr_lang", trimmed);
                }
            }
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        headers.setAccept(java.util.List.of(MediaType.APPLICATION_JSON));
        if (apiKey != null && !apiKey.isBlank()) {
            headers.setBearerAuth(apiKey);
        }

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<JsonNode> responseEntity = restTemplate.postForEntity(url, requestEntity, JsonNode.class);
            JsonNode response = responseEntity.getBody();
            if (response == null) {
                throw new IllegalStateException("Docling returned empty response body");
            }
            return new ExtractionResult(extractMarkdown(response), response);
        } catch (HttpStatusCodeException ex) {
            String detail = ex.getResponseBodyAsString();
            log.error("Docling HTTP error for {}: status={}, body={}", pdfPagePath, ex.getStatusCode(), detail);
            throw new IllegalStateException("Docling HTTP " + ex.getStatusCode() + ": " + detail, ex);
        } catch (Exception ex) {
            log.error("Docling request failed for {}: {}", pdfPagePath, ex.getMessage(), ex);
            throw new IllegalStateException("Docling request failed: " + ex.getMessage(), ex);
        }
    }

    private String resolveUrl() {
        String base = baseUrl.endsWith("/") ? baseUrl.substring(0, baseUrl.length() - 1) : baseUrl;
        String path = convertFilePath.startsWith("/") ? convertFilePath : "/" + convertFilePath;
        return base + path;
    }

    private String extractMarkdown(JsonNode response) {
        JsonNode textContent = findByPath(response, "document.text_content");
        if (textContent != null && textContent.isTextual() && !textContent.asText().isBlank()) {
            return textContent.asText();
        }

        JsonNode mdContent = findByPath(response, "document.md_content");
        if (mdContent != null && mdContent.isTextual() && !mdContent.asText().isBlank()) {
            String cleaned = removeImageOnlyMarkdown(mdContent.asText()).trim();
            if (!cleaned.isBlank()) {
                return cleaned;
            }
        }

        String[] candidates = {
                "markdown",
                "md",
                "text",
                "content",
                "result.markdown",
                "document.markdown",
                "document.md_content"
        };
        for (String candidate : candidates) {
            JsonNode node = findByPath(response, candidate);
            if (node != null && node.isTextual() && !node.asText().isBlank()) {
                String cleaned = removeImageOnlyMarkdown(node.asText()).trim();
                if (!cleaned.isBlank()) {
                    return cleaned;
                }
            }
        }
        return "";
    }

    private String removeImageOnlyMarkdown(String value) {
        String noDataUriImages = value.replaceAll("!\\[[^\\]]*\\]\\(data:image[^\\)]*\\)", "");
        String noImageLines = noDataUriImages.replaceAll("(?m)^\\s*!\\[[^\\]]*\\]\\([^\\)]*\\)\\s*$", "");
        return noImageLines;
    }

    private JsonNode findByPath(JsonNode root, String path) {
        String[] parts = path.split("\\.");
        JsonNode current = root;
        for (String part : parts) {
            if (current == null) {
                return null;
            }
            current = current.get(part);
        }
        return current;
    }
}

