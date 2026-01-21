package de.drv.thelionking.service.dto;

public class DoclingResult {
    private String json;      // Docling JSON content
    private String markdown;  // Docling Markdown content

    public DoclingResult() {}
    public DoclingResult(String json, String markdown) {
        this.json = json;
        this.markdown = markdown;
    }

    public String getJson() { return json; }
    public void setJson(String json) { this.json = json; }
    public String getMarkdown() { return markdown; }
    public void setMarkdown(String markdown) { this.markdown = markdown; }
}

