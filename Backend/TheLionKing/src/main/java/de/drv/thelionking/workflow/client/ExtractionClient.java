package de.drv.thelionking.workflow.client;

import java.nio.file.Path;

public interface ExtractionClient {
    ExtractionResult extract(Path pdfPagePath);
}

