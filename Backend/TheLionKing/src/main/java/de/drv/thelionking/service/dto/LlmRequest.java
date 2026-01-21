package de.drv.thelionking.service.dto;

public class LlmRequest {
    private String prompt;
    private String context;

    public LlmRequest() {}
    public LlmRequest(String prompt, String context) {
        this.prompt = prompt;
        this.context = context;
    }

    public String getPrompt() { return prompt; }
    public void setPrompt(String prompt) { this.prompt = prompt; }

    public String getContext() { return context; }
    public void setContext(String context) { this.context = context; }
}

