package de.drv.thelionking.workflow.client;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

import java.nio.file.Path;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
@ConditionalOnProperty(name = "extraction.client", havingValue = "stub")
public class StubExtractionClient implements ExtractionClient {
    private static final Pattern PAGE_PATTERN = Pattern.compile("page-(\\d+)\\.pdf$");
    private final ObjectMapper objectMapper;

    public StubExtractionClient(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public ExtractionResult extract(Path pdfPagePath) {
        int pageNo = parsePageNo(pdfPagePath);
        String markdown = "## Extract for page " + pageNo + "\nStubbed extraction content.";
        ObjectNode json = objectMapper.createObjectNode();
        json.put("page", pageNo);
        json.put("source", "stub");
        json.put("pdfPagePath", pdfPagePath.toString());
        return new ExtractionResult(markdown, json);
    }

    private int parsePageNo(Path pdfPagePath) {
        String value = pdfPagePath.getFileName().toString();
        Matcher matcher = PAGE_PATTERN.matcher(value);
        if (matcher.find()) {
            return Integer.parseInt(matcher.group(1));
        }
        return 0;
    }
}

