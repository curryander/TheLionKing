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
@ConditionalOnProperty(name = "docling.client", havingValue = "rest", matchIfMissing = true)
public class RestDoclingClient implements DoclingClient {
    private static final Logger log = LoggerFactory.getLogger(RestDoclingClient.class);

    private final RestTemplate restTemplate;
    private final String baseUrl;
    private final String convertFilePath;
    private final String apiKey;

    public RestDoclingClient(
            @Value("${docling.base-url:http://localhost:5001}") String baseUrl,
            @Value("${docling.convert-file-path:/v1/convert/file}") String convertFilePath,
            @Value("${docling.api-key:}") String apiKey) {
        this.restTemplate = new RestTemplate();
        this.baseUrl = baseUrl;
        this.convertFilePath = convertFilePath;
        this.apiKey = apiKey;
    }

    @Override
    public DoclingResult extract(Path pdfPagePath) {
        String url = resolveUrl();

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("files", new FileSystemResource(pdfPagePath.toFile()));
        body.add("to_formats", "md");
        body.add("to_formats", "json");

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
            return new DoclingResult(extractMarkdown(response), response);
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
        String[] candidates = {
                "markdown",
                "md",
                "text",
                "content",
                "result.markdown",
                "document.markdown",
                "document.md_content",
                "document.text_content"
        };
        for (String candidate : candidates) {
            JsonNode node = findByPath(response, candidate);
            if (node != null && node.isTextual() && !node.asText().isBlank()) {
                return node.asText();
            }
        }
        return "";
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
