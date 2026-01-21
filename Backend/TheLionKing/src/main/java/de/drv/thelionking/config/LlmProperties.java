package de.drv.thelionking.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Setter
@Getter
@ConfigurationProperties(prefix = "llm")
public class LlmProperties {
    private String baseUrl;            // e.g. https://llm.example.com
    private String extractPath;        // kept for custom gateways (unused for Watsonx direct)
    private String aggregatePath;      // kept for custom gateways (unused for Watsonx direct)
    private String apiKey;             // Watsonx API key

    // Watsonx-specific
    private String versionDate;        // e.g. 2025-09-19
    private String projectId;          // Watsonx project id
    private String modelId;            // e.g. meta-llama/llama-3-2-90b-vision-instruct
    private String iamTokenUrl = "https://iam.cloud.ibm.com/identity/token";

    public String getVersionDate() { return versionDate; }
    public void setVersionDate(String versionDate) { this.versionDate = versionDate; }
    public String getProjectId() { return projectId; }
    public void setProjectId(String projectId) { this.projectId = projectId; }
    public String getModelId() { return modelId; }
    public void setModelId(String modelId) { this.modelId = modelId; }
    public String getIamTokenUrl() { return iamTokenUrl; }
    public void setIamTokenUrl(String iamTokenUrl) { this.iamTokenUrl = iamTokenUrl; }
}
