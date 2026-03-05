package de.drv.thelionking.workflow.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class StorageService {
    private final Path storageRoot;

    public StorageService(@Value("${app.storage.root:./storage}") String storageRoot) {
        this.storageRoot = Paths.get(storageRoot).toAbsolutePath().normalize();
    }

    public Path saveOriginalPdf(UUID stapelId, byte[] pdfBytes) throws IOException {
        Path dir = storageRoot.resolve(stapelId.toString());
        Files.createDirectories(dir);
        Path file = dir.resolve("original.pdf");
        Files.write(file, pdfBytes);
        return file;
    }

    public Path savePagePdf(UUID stapelId, int pageNo, byte[] content) throws IOException {
        Path dir = storageRoot.resolve(stapelId.toString());
        Files.createDirectories(dir);
        Path file = dir.resolve("page-" + pageNo + ".pdf");
        Files.write(file, content);
        return file;
    }
}

