package de.drv.thelionking.workflow.dto;

import com.fasterxml.jackson.databind.JsonNode;

import java.util.UUID;

public class PageExtractResponse {
    private UUID pageId;
    private String markdown;
    private JsonNode doclingJson;

    public UUID getPageId() {
        return pageId;
    }

    public void setPageId(UUID pageId) {
        this.pageId = pageId;
    }

    public String getMarkdown() {
        return markdown;
    }

    public void setMarkdown(String markdown) {
        this.markdown = markdown;
    }

    public JsonNode getDoclingJson() {
        return doclingJson;
    }

    public void setDoclingJson(JsonNode doclingJson) {
        this.doclingJson = doclingJson;
    }
}

