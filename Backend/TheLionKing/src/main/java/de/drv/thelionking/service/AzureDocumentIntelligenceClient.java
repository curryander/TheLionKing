package de.drv.thelionking.service;

import com.fasterxml.jackson.databind.JsonNode;
import de.drv.thelionking.config.AzureDocumentIntelligenceProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Component
public class AzureDocumentIntelligenceClient {
    private static final Logger log = LoggerFactory.getLogger(AzureDocumentIntelligenceClient.class);

    private final AzureDocumentIntelligenceProperties properties;
    private final RestTemplate restTemplate;

    public AzureDocumentIntelligenceClient(AzureDocumentIntelligenceProperties properties) {
        this.properties = properties;
        this.restTemplate = new RestTemplate();
    }

    public String startAnalyze(String modelId, byte[] documentBytes, String contentType) {
        HttpHeaders headers = createHeaders();
        headers.setContentType(MediaType.parseMediaType(contentType == null || contentType.isBlank()
                ? MediaType.APPLICATION_PDF_VALUE
                : contentType));
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));

        String url = baseEndpoint()
                + "/documentintelligence/documentModels/" + modelId
                + ":analyze?api-version=" + properties.getApiVersion();
        log.info("Azure analyze request: modelId={}, endpoint={}", modelId, url);

        HttpEntity<byte[]> request = new HttpEntity<>(documentBytes, headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, request, String.class);

        String operationLocation = response.getHeaders().getFirst("Operation-Location");
        if (operationLocation == null || operationLocation.isBlank()) {
            throw new IllegalStateException("Azure Document Intelligence did not return Operation-Location header");
        }
        log.info("Azure analyze accepted: operationLocation={}", operationLocation);
        return operationLocation;
    }

    public JsonNode getAnalyzeResult(String operationLocation) {
        HttpHeaders headers = createHeaders();
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));

        HttpEntity<Void> request = new HttpEntity<>(headers);
        ResponseEntity<JsonNode> response = restTemplate.exchange(operationLocation, HttpMethod.GET, request, JsonNode.class);
        return response.getBody();
    }

    private HttpHeaders createHeaders() {
        HttpHeaders headers = new HttpHeaders();
        String apiKey = properties.getApiKey();
        if (apiKey == null || apiKey.isBlank()) {
            throw new IllegalStateException("azure.document-intelligence.api-key is not configured");
        }
        headers.set("Ocp-Apim-Subscription-Key", apiKey);
        return headers;
    }

    private String baseEndpoint() {
        String endpoint = properties.getEndpoint();
        if (endpoint == null || endpoint.isBlank()) {
            throw new IllegalStateException("azure.document-intelligence.endpoint is not configured");
        }
        return endpoint.endsWith("/") ? endpoint.substring(0, endpoint.length() - 1) : endpoint;
    }
}

