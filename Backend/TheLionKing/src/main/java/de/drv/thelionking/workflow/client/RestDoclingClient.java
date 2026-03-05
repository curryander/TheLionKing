package de.drv.thelionking.workflow.client;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;

import java.nio.file.Path;

@Component
@ConditionalOnProperty(name = "docling.client", havingValue = "rest", matchIfMissing = true)
public class RestDoclingClient implements DoclingClient {

    private final RestClient restClient;
    private final String convertFilePath;
    private final String apiKey;

    public RestDoclingClient(
            RestClient.Builder restClientBuilder,
            @Value("${docling.base-url:http://localhost:5001}") String baseUrl,
            @Value("${docling.convert-file-path:/v1/convert/file}") String convertFilePath,
            @Value("${docling.api-key:}") String apiKey) {
        this.restClient = restClientBuilder.baseUrl(baseUrl).build();
        this.convertFilePath = convertFilePath;
        this.apiKey = apiKey;
    }

    @Override
    public DoclingResult extract(Path pdfPagePath) {
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", new FileSystemResource(pdfPagePath.toFile()));

        try {
            JsonNode response = restClient.post()
                    .uri(convertFilePath)
                    .contentType(MediaType.MULTIPART_FORM_DATA)
                    .accept(MediaType.APPLICATION_JSON)
                    .headers(this::applyAuthHeader)
                    .body(body)
                    .retrieve()
                    .body(JsonNode.class);

            if (response == null) {
                throw new IllegalStateException("Docling returned empty response body");
            }
            return new DoclingResult(extractMarkdown(response), response);
        } catch (RestClientResponseException ex) {
            String detail = ex.getResponseBodyAsString();
            throw new IllegalStateException("Docling HTTP " + ex.getStatusCode() + ": " + detail, ex);
        } catch (Exception ex) {
            throw new IllegalStateException("Docling request failed: " + ex.getMessage(), ex);
        }
    }

    private void applyAuthHeader(HttpHeaders headers) {
        if (apiKey != null && !apiKey.isBlank()) {
            headers.setBearerAuth(apiKey);
        }
    }

    private String extractMarkdown(JsonNode response) {
        String[] candidates = {"markdown", "md", "text", "content", "result.markdown", "document.markdown"};
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
