package de.drv.thelionking.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.drv.thelionking.data.page.Page;
import de.drv.thelionking.data.vorgang.Vorgang;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class ResultJsonExportService {

    private static final DateTimeFormatter FILE_TS_FORMAT = DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss_SSS");
    private final ObjectMapper objectMapper;

    public ResultJsonExportService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public void exportDoclingPreview(Vorgang vorgang, List<Page> pages) {
        if (vorgang == null || vorgang.getId() == null || pages == null || vorgang.getProgress() < 60) {
            return;
        }
        try {
            Map<String, Object> resp = new LinkedHashMap<>();
            resp.put("id", vorgang.getId().toString());
            resp.put("progress", vorgang.getProgress());
            resp.put("readyForLlm", true);

            List<Map<String, Object>> previewPages = new ArrayList<>();
            for (Page p : pages) {
                Map<String, Object> entry = new LinkedHashMap<>();
                entry.put("pageIndex", p.getPageIndex());
                entry.put("usable", p.isUsable());
                entry.put("markdown", p.getDoclingMarkdown());
                entry.put("json", p.getDoclingJson());
                previewPages.add(entry);
            }
            resp.put("pages", previewPages);

            Path tempDir = resolveAssetsTempDir();
            Files.createDirectories(tempDir);

            String ts = LocalDateTime.now().format(FILE_TS_FORMAT);
            String fileName = "docling_preview_" + ts + "_" + vorgang.getId() + ".json";
            Path outFile = tempDir.resolve(fileName);

            String json = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(resp);
            Files.writeString(outFile, json, StandardCharsets.UTF_8);
            log.info("Saved docling preview JSON for {} to {}", vorgang.getId(), outFile);
        } catch (Exception e) {
            log.warn("Could not persist docling preview JSON for {}: {}", vorgang.getId(), e.getMessage());
        }
    }

    public void exportDoclingDocumentResult(Vorgang vorgang, List<Page> pages) {
        if (vorgang == null || vorgang.getId() == null || pages == null || vorgang.getProgress() < 60) {
            return;
        }
        try {
            Map<String, Object> resp = new LinkedHashMap<>();
            resp.put("id", vorgang.getId().toString());
            resp.put("progress", vorgang.getProgress());

            List<Map<String, Object>> documents = new ArrayList<>();
            for (Page p : pages) {
                Map<String, Object> entry = new LinkedHashMap<>();
                entry.put("pageIndex", p.getPageIndex());
                entry.put("usable", p.isUsable());
                entry.put("document", safeJsonNode(p.getDoclingJson()));
                documents.add(entry);
            }
            resp.put("documents", documents);

            Path tempDir = resolveAssetsTempDir();
            Files.createDirectories(tempDir);

            String ts = LocalDateTime.now().format(FILE_TS_FORMAT);
            String fileName = "docling_document_result_" + ts + "_" + vorgang.getId() + ".json";
            Path outFile = tempDir.resolve(fileName);

            String json = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(resp);
            Files.writeString(outFile, json, StandardCharsets.UTF_8);
            log.info("Saved docling document result for {} to {}", vorgang.getId(), outFile);
        } catch (Exception e) {
            log.warn("Could not persist docling document result for {}: {}", vorgang.getId(), e.getMessage());
        }
    }

    private Object safeJsonNode(String json) {
        if (json == null || json.isBlank()) return null;
        try {
            return objectMapper.readTree(json);
        } catch (Exception e) {
            return json;
        }
    }

    private Path resolveAssetsTempDir() {
        Path current = Path.of("").toAbsolutePath().normalize();
        while (current != null) {
            Path assets = current.resolve("assets");
            if (Files.exists(assets)) {
                return assets.resolve("temp");
            }
            current = current.getParent();
        }
        return Path.of("assets", "temp").toAbsolutePath().normalize();
    }
}
