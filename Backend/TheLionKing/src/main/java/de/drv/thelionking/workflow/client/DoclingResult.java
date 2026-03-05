package de.drv.thelionking.workflow.client;

import com.fasterxml.jackson.databind.JsonNode;

public class DoclingResult {
    private final String markdown;
    private final JsonNode doclingJson;

    public DoclingResult(String markdown, JsonNode doclingJson) {
        this.markdown = markdown;
        this.doclingJson = doclingJson;
    }

    public String getMarkdown() {
        return markdown;
    }

    public JsonNode getDoclingJson() {
        return doclingJson;
    }
}
