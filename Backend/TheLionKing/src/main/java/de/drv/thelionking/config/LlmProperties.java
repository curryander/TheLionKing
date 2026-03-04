package de.drv.thelionking.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Setter
@Getter
@ConfigurationProperties(prefix = "spring.ai.openai")
public class LlmProperties {
    private String baseUrl = "https://api.openai.com";
    private String apiKey;
    private Chat chat = new Chat();

    public String resolveModel() {
        if (chat == null || chat.getOptions() == null) return "gpt-4o-mini";
        String model = chat.getOptions().getModel();
        return (model == null || model.isBlank()) ? "gpt-4o-mini" : model;
    }

    @Setter
    @Getter
    public static class Chat {
        private Options options = new Options();
    }

    @Setter
    @Getter
    public static class Options {
        private String model = "gpt-4o-mini";
    }
}
