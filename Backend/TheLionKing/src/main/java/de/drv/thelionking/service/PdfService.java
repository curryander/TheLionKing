package de.drv.thelionking.service;

import org.apache.pdfbox.io.MemoryUsageSetting;
import org.apache.pdfbox.multipdf.PDFMergerUtility;
import org.apache.pdfbox.multipdf.Splitter;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class PdfService {
    public List<byte[]> splitToPages(byte[] pdfBytes) throws IOException {
        try (PDDocument document = PDDocument.load(new ByteArrayInputStream(pdfBytes))) {
            Splitter splitter = new Splitter();
            List<PDDocument> pages = splitter.split(document);
            List<byte[]> result = new ArrayList<>(pages.size());
            for (PDDocument pageDoc : pages) {
                try (pageDoc) {
                    ByteArrayOutputStream baos = new ByteArrayOutputStream();
                    pageDoc.save(baos);
                    result.add(baos.toByteArray());
                }
            }
            return result;
        }
    }

    public byte[] mergePages(List<byte[]> pages) throws IOException {
        if (pages == null || pages.isEmpty()) {
            return new byte[0];
        }
        PDFMergerUtility merger = new PDFMergerUtility();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        merger.setDestinationStream(baos);
        List<ByteArrayInputStream> inputs = new ArrayList<>();
        try {
            for (byte[] p : pages) {
                ByteArrayInputStream in = new ByteArrayInputStream(p);
                inputs.add(in);
            }
            merger.addSources(new ArrayList<>(inputs));
            merger.mergeDocuments(MemoryUsageSetting.setupMainMemoryOnly());
            return baos.toByteArray();
        } finally {
            for (ByteArrayInputStream in : inputs) {
                try { in.close(); } catch (IOException ignored) {}
            }
        }
    }
}
