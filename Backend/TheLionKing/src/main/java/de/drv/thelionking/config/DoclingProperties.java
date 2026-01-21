package de.drv.thelionking.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.bind.Name;

import java.nio.file.Path;

@Setter
@Getter
@ConfigurationProperties(prefix = "docling")
public class DoclingProperties {
    private String baseUrl;         // e.g. https://docling....
    private String convertFilePath; // e.g. /v1/convert/file
    private String apiKey;          // X-Api-Key header
    @Name("python")
    private Path localPath;
    @Name("input")
    private Path inputPath;
    @Name("output")
    private Path outputPath;

    public String getBaseUrl() { return baseUrl; }
    public void setBaseUrl(String baseUrl) { this.baseUrl = baseUrl; }
    public String getConvertFilePath() { return convertFilePath; }
    public void setConvertFilePath(String convertFilePath) { this.convertFilePath = convertFilePath; }
    public String getApiKey() { return apiKey; }
    public void setApiKey(String apiKey) { this.apiKey = apiKey; }
    public Path getLocalPath() { return localPath; }
    public void setLocalPath(Path localPath) { this.localPath = localPath; }
    public Path getInputPath() { return inputPath; }
    public void setInputPath(Path inputPath) { this.inputPath = inputPath; }
    public Path getOutputPath() { return outputPath; }
    public void setOutputPath(Path outputPath) { this.outputPath = outputPath; }
}
