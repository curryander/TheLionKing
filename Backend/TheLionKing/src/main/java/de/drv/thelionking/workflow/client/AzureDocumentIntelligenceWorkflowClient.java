package de.drv.thelionking.workflow.client;

import com.fasterxml.jackson.databind.JsonNode;
import de.drv.thelionking.service.AzureDocumentIntelligenceClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

import java.nio.file.Files;
import java.nio.file.Path;

@Component
@ConditionalOnProperty(name = "extraction.client", havingValue = "azure", matchIfMissing = true)
public class AzureDocumentIntelligenceWorkflowClient implements ExtractionClient {
    private static final Logger log = LoggerFactory.getLogger(AzureDocumentIntelligenceWorkflowClient.class);

    private final AzureDocumentIntelligenceClient azureClient;
    private final String modelId;
    private final long pollIntervalMs;
    private final long timeoutMs;

    public AzureDocumentIntelligenceWorkflowClient(
            AzureDocumentIntelligenceClient azureClient,
            @Value("${azure.document-intelligence.model-id:prebuilt-layout}") String modelId,
            @Value("${azure.document-intelligence.poll-interval-ms:1000}") long pollIntervalMs,
            @Value("${azure.document-intelligence.timeout-ms:120000}") long timeoutMs) {
        this.azureClient = azureClient;
        this.modelId = modelId;
        this.pollIntervalMs = pollIntervalMs;
        this.timeoutMs = timeoutMs;
    }

    @Override
    public ExtractionResult extract(Path pdfPagePath) {
        try {
            log.info("Azure extraction start: file={}, modelId={}", pdfPagePath, modelId);
            byte[] bytes = Files.readAllBytes(pdfPagePath);
            String operationLocation = azureClient.startAnalyze(modelId, bytes, "application/pdf");

            long start = System.currentTimeMillis();
            while (true) {
                JsonNode result = azureClient.getAnalyzeResult(operationLocation);
                String status = result.path("status").asText("");
                log.info("Azure extraction poll: file={}, status={}", pdfPagePath, status);
                if ("succeeded".equalsIgnoreCase(status)) {
                    JsonNode contentNode = result.path("analyzeResult").path("content");
                    String markdown = contentNode.isTextual() ? contentNode.asText("") : "";
                    log.info("Azure extraction succeeded: file={}, textLength={}", pdfPagePath, markdown.length());
                    return new ExtractionResult(markdown, result);
                }
                if ("failed".equalsIgnoreCase(status)) {
                    throw new IllegalStateException("Azure Document Intelligence analyze failed: " + result);
                }

                if (System.currentTimeMillis() - start > timeoutMs) {
                    throw new IllegalStateException("Azure Document Intelligence analyze timed out");
                }
                Thread.sleep(pollIntervalMs);
            }
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Azure Document Intelligence polling interrupted", ex);
        } catch (Exception ex) {
            throw new IllegalStateException("Azure Document Intelligence request failed: " + ex.getMessage(), ex);
        }
    }
}

