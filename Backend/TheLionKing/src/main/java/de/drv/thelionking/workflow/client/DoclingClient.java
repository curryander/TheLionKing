package de.drv.thelionking.workflow.client;

import java.nio.file.Path;

public interface DoclingClient {
    DoclingResult extract(Path pdfPagePath);
}
