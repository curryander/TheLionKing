package de.drv.thelionking.service;

import de.drv.thelionking.data.document.Document;
import de.drv.thelionking.data.document.DocumentRepository;
import de.drv.thelionking.data.vorgang.Vorgang;
import de.drv.thelionking.data.vorgang.VorgangRepository;
import de.drv.thelionking.data.page.Page;
import de.drv.thelionking.data.page.PageRepository;
import de.drv.thelionking.model.SubDocument;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import de.drv.thelionking.config.DoclingProperties;

import java.io.IOException;
import java.time.LocalDate;
import java.util.*;

@Service
@lombok.extern.slf4j.Slf4j
public class ProcessingService {
    private final PdfService pdfService;
    private final DoclingRunnerService doclingRunner;
    private final DoclingProperties props;
    private final LlmService llmService;
    private final VorgangRepository vorgangRepository;
    private final PageRepository pageRepository;
    private final DocumentRepository documentRepository;

    public ProcessingService(PdfService pdfService,
                             DoclingRunnerService doclingRunner,
                             LlmService llmService,
                             DoclingProperties props,
                             VorgangRepository vorgangRepository,
                             PageRepository pageRepository,
                             DocumentRepository documentRepository) {
        this.pdfService = pdfService;
        this.doclingRunner = doclingRunner;
        this.props = props;
        this.llmService = llmService;
        this.vorgangRepository = vorgangRepository;
        this.pageRepository = pageRepository;
        this.documentRepository = documentRepository;
    }

    @Transactional
    public Vorgang process(Vorgang vorgang) throws IOException {
        try {
            log.info("Process start for Vorgang {}", vorgang.getId());
            List<byte[]> pageBytes = pdfService.splitToPages(vorgang.getMultiPageDocument());
            int total = pageBytes.size();
            int done = 0;
            log.info("Split original PDF into {} pages", total);

            // Persist Page entries and perform OCR
            List<Page> pages = new ArrayList<>();
            int idx = 0;
            for (byte[] pb : pageBytes) {
                Page p = new Page(idx++, pb, vorgang);
                p = pageRepository.save(p);
                pages.add(p);
                log.info("Persisted Page index={} id={}", p.getPageIndex(), p.getId());
            }

            for (Page p : pages) {
                log.info("Docling OCR for Page index={} id={} started", p.getPageIndex(), p.getId());
                var docling = doclingRunner.convertToJson(props.getLocalPath(), props.getInputPath(), props.getOutputPath());
//                p.setDoclingJson(docling.getJson());
//                p.setDoclingMarkdown(docling.getMarkdown());
//                boolean usable;
//                String md = p.getDoclingMarkdown();
//                if (md == null || md.trim().isEmpty()) {
//                    usable = false;
//                } else {
//                    usable = llmService.isPageUsable(md);
//                }
//                p.setUsable(usable);
//                pageRepository.save(p);
//                log.info("Docling OCR done for Page index={} mdChars={} usable={}", p.getPageIndex(),
//                        docling.getMarkdown() != null ? docling.getMarkdown().length() : 0,
//                        usable);
                log.info("Docling abgeschlossen. Outputpath: " + docling.toString());
                done++;
                // Up to 60% during OCR
                vorgang.setProgress(Math.min(60, (int) Math.round(60.0 * done / total)));
                vorgangRepository.save(vorgang);
                log.info("Progress after OCR page {}: {}%", p.getPageIndex(), vorgang.getProgress());
            }

            // Group pages into documents
            List<Page> usablePages = new ArrayList<>();
            for (Page p : pages) if (p.isUsable()) usablePages.add(p);
            log.info("Usable pages: {}/{}", usablePages.size(), pages.size());
            List<List<Integer>> groups = llmService.groupPages(usablePages);
            log.info("Grouping result: {} groups -> {}", groups.size(), groups);
            // Create Documents for each group and extract properties
            List<SubDocument> subDocs = new ArrayList<>();
            int groupNo = 0;
            for (List<Integer> group : groups) {
                // Sanitize group indices against usablePages size
                List<Integer> validIdx = new ArrayList<>();
                for (Integer gi : group) {
                    if (gi == null) continue;
                    int i = gi.intValue();
                    if (i >= 0 && i < usablePages.size() && !validIdx.contains(i)) {
                        validIdx.add(i);
                    } else {
                        log.warn("Dropping invalid page index {} (usable size {}) from group {}", gi, usablePages.size(), group);
                    }
                }
                if (validIdx.isEmpty()) {
                    log.warn("Skipping empty group after sanitization: {}", group);
                    continue;
                }
                List<byte[]> toMerge = new ArrayList<>();
                List<String> doclingMarkdowns = new ArrayList<>();
                for (Integer i : validIdx) {
                    Page p = usablePages.get(i);
                    toMerge.add(p.getPdf());
                    doclingMarkdowns.add(p.getDoclingMarkdown());
                }
                log.info("Merging group #{} with pages {}", groupNo + 1, group);
                byte[] merged = pdfService.mergePages(toMerge);
                log.info("Merged PDF size for group #{}: {} bytes", groupNo + 1, merged != null ? merged.length : 0);
                Document entity = new Document(merged);
                entity.setVorgang(vorgang);

                var fields = llmService.extractDocumentPropertiesMerged(doclingMarkdowns);
                log.info("Extraction fields for group #{}: {}", groupNo + 1, fields);
                // Apply fields to Document; null if not present
                if (fields != null) {
                    Object cat = fields.get("category");
                    if (cat instanceof String s) {
                        try { entity.setCategory(Document.Category.valueOf(s)); } catch (Exception ignored) {}
                    }
                    entity.setFirstName(asString(fields.get("firstName")));
                    entity.setSurname(asString(fields.get("surname")));
                    entity.setVsnr(asString(fields.get("vsnr")));
                    entity.setBirthDate(parseDate(asString(fields.get("birthDate"))));
                    entity.setSummary(cleanSummary(asString(fields.get("summary"))));
                    if (entity.getSummary() == null) {
                        // Fallback: brief excerpt from merged markdown
                        String combined = String.join("\n\n", doclingMarkdowns);
                        if (combined != null) {
                            String trimmed = combined.replaceAll("\s+", " ").trim();
                            if (!trimmed.isEmpty()) {
                                entity.setSummary(cleanSummary(trimmed.length() > 240 ? trimmed.substring(0, 240) + "..." : trimmed));
                            }
                        }
                    }
                    Object add = fields.get("additionalFields");
                    if (add instanceof Map<?,?> m) {
                        Map<String,Object> mm = new HashMap<>();
                        for (var e : m.entrySet()) if (e.getKey()!=null) mm.put(String.valueOf(e.getKey()), e.getValue());
                        entity.setAdditionalFields(mm);
                    }
                }
                entity = documentRepository.save(entity);
                log.info("Saved Document id={} for group #{}", entity.getId(), groupNo + 1);
                // Up to 90% after grouping/extraction progresses
                int current = vorgang.getProgress();
                vorgang.setProgress(Math.max(current, 60 + (int) Math.round(30.0 * (++groupNo) / Math.max(1, groups.size()))));
                vorgangRepository.save(vorgang);
                log.info("Progress after group #{}: {}%", groupNo, vorgang.getProgress());

                // Also build SubDocument list for final aggregation
                SubDocument sd = new SubDocument();
                sd.setDocumentData(merged);
                if (entity.getCategory()!=null) sd.setCategory(SubDocument.CategoryEnum.valueOf(entity.getCategory().name()));
                sd.setFirstName(entity.getFirstName());
                sd.setSurname(entity.getSurname());
                sd.setVsnr(entity.getVsnr());
                sd.setBirthDate(entity.getBirthDate());
                sd.setSummary(entity.getSummary());
                sd.setAdditionalFields(entity.getAdditionalFields());
                subDocs.add(sd);
            }

            log.info("Starting aggregation across {} documents", subDocs.size());
            var aggregated = llmService.aggregateVorgangFields(subDocs);
        if (aggregated != null) {
            log.info("Aggregation result: {}", aggregated);
            Object fn = aggregated.get("firstName"); if (fn instanceof String s) vorgang.setFirstName(s);
            Object sn = aggregated.get("surname"); if (sn instanceof String s) vorgang.setSurname(s);
            Object vs = aggregated.get("vsnr"); if (vs instanceof String s) vorgang.setVsnr(s);
            Object bd = aggregated.get("birthDate"); if (bd instanceof String s) {
                try { vorgang.setBirthDate(LocalDate.parse(s)); } catch (Exception ignored) {}
            }
            Object sum = aggregated.get("summary"); if (sum instanceof String s) vorgang.setSummary(s);
        }
            vorgang.setProgress(100);
            log.info("Process finished for Vorgang {} with progress {}%", vorgang.getId(), vorgang.getProgress());
            return vorgangRepository.save(vorgang);
        } catch (Exception e) {
            log.error("Processing failed for Vorgang {}", vorgang.getId(), e);
            vorgang.setErrorCode("SERVER_ERROR");
            vorgang.setErrorMessage(e.getMessage());
            vorgang.setProgress(100);
            return vorgangRepository.save(vorgang);
        }
    }

    @org.springframework.scheduling.annotation.Async
    public void processAsync(UUID vorgangId) {
        vorgangRepository.findById(vorgangId).ifPresent(v -> {
            try {
                process(v);
            } catch (IOException e) {
                log.error("Async processing failed for Vorgang {}", v.getId(), e);
                v.setErrorCode("SERVER_ERROR");
                v.setErrorMessage(e.getMessage());
                v.setProgress(100);
                vorgangRepository.save(v);
            }
        });
    }

    private String asString(Object o) { return o == null ? null : String.valueOf(o); }
    private LocalDate parseDate(String s) { try { return s==null? null: LocalDate.parse(s);} catch(Exception e){return null;} }
    private String cleanSummary(String summary) {
        if (summary == null) return null;
        String s = summary.replace('\r', ' ').replace('\n', ' ').replaceAll("\\s+", " ").trim();
        if (s.isEmpty()) return s;
        s = s.replaceAll("[-_]{3,}", " ");
        String lower = s.toLowerCase(Locale.ROOT);
        String[] noise = {"vorerkrankung", "behandel", "arzt", "krankenhaus", "rehabilitation"};
        int noiseCount = 0;
        for (String n : noise) if (lower.contains(n)) noiseCount++;
        if (noiseCount >= 2 && !lower.matches(".*[0-9].*")) {
            s = s.replaceAll("(?i)\\bvorerkrank\\p{L}*\\b", "");
            s = s.replaceAll("(?i)\\bbehandel\\p{L}*\\b", "");
            s = s.replaceAll("(?i)\\barzt\\p{L}*\\b", "");
            s = s.replaceAll("(?i)\\bkrankenhaus\\p{L}*\\b", "");
            s = s.replaceAll("(?i)\\brehabilitation\\p{L}*\\b", "");
            s = s.replaceAll("\\s+", " ").trim();
        }
        s = s.replaceAll("\\b(\\p{L}{3,})\\b(\\s+\\1\\b)+", "$1");
        if (s.length() > 400) s = s.substring(0, 400) + "...";
        return s;
    }
}

