package de.drv.thelionking.service.dto;

public class LlmResponse {
    private String content; // model should return the JSON payload in this field

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
}

