package de.drv.thelionking.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.databind.SerializationFeature;
import de.drv.thelionking.config.LlmProperties;
import de.drv.thelionking.config.PromptProperties;
import de.drv.thelionking.model.SubDocument;
import de.drv.thelionking.data.page.Page;
import de.drv.thelionking.service.dto.LlmRequest;
import de.drv.thelionking.service.dto.LlmResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.time.LocalDate;
import java.util.*;

@Service
@Slf4j
public class LlmService {
    private final RestTemplate restTemplate;
    private final LlmProperties props;
    private final ObjectMapper mapper = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
            .disable(SerializationFeature.FAIL_ON_EMPTY_BEANS);
    private final PromptProperties prompts;

    public LlmService(RestTemplate restTemplate, LlmProperties props, PromptProperties prompts) {
        this.restTemplate = restTemplate;
        this.props = props;
        this.prompts = prompts;
    }

    public SubDocument extractSubDocument(String doclingJson) {
        List<String> strategies = new ArrayList<>();
        if (prompts.getDocumentExtractionPrimary() != null) strategies.add(prompts.getDocumentExtractionPrimary());
        if (prompts.getDocumentExtractionSecondary() != null) strategies.add(prompts.getDocumentExtractionSecondary());
        if (prompts.getDocumentExtractionTertiary() != null) strategies.add(prompts.getDocumentExtractionTertiary());
        SubDocument merged = new SubDocument();

        for (String strategy : strategies) {
            Map<String, Object> payload = callLlm(strategy, doclingJson);
            applyToSubDocument(merged, payload);
        }
        return merged;
    }

    public List<List<Integer>> groupPages(List<Page> pages) {
        // Build context with page indices and their Docling JSON
        ArrayList<Map<String, Object>> ctx = new ArrayList<>();
        int pos = 0;
        for (Page p : pages) {
            Map<String, Object> entry = new HashMap<>();
            entry.put("index", pos++); // index relative to provided list
            // Prefer markdown for grouping context
            entry.put("markdown", p.getDoclingMarkdown());
            ctx.add(entry);
        }
        String context;
        try { context = mapper.writeValueAsString(ctx); } catch (Exception e) { context = "[]"; }
        String prompt = defaultIfBlank(prompts.getPageGrouping(), defaultGroupingPrompt());
        Map<String, Object> payload;
        try {
            payload = callLlm(prompt, context);
        } catch (Exception ex) {
            log.warn("Page grouping via LLM failed, using fallback groups. reason={}", ex.toString());
            payload = new HashMap<>();
        }
        List<List<Integer>> groups = new ArrayList<>();
        if (payload != null) {
            Object gs = payload.get("groups");
            if (gs instanceof List<?> outer) {
                for (Object inner : outer) {
                    if (inner instanceof List<?> innerList) {
                        List<Integer> ints = new ArrayList<>();
                        for (Object o : innerList) {
                            try { ints.add(Integer.parseInt(String.valueOf(o))); } catch (Exception ignored) {}
                        }
                        if (!ints.isEmpty()) groups.add(ints);
                    }
                }
            }
        }
        if (groups.isEmpty()) {
            for (int i = 0; i < pages.size(); i++) groups.add(java.util.List.of(i));
        }
        return groups;
    }

    public boolean isPageUsable(String markdown) {
        String prompt = prompts.getPageUsability();
        if (prompt == null || prompt.isBlank()) {
            prompt = "You are an expert at judging whether a page contains meaningful content. Output only JSON {\"use\":true|false}.";
        }
        String context;
        try { context = mapper.writeValueAsString(markdown == null ? "" : markdown); } catch (Exception e) { context = markdown == null ? "" : markdown; }
        Map<String, Object> result;
        try {
            result = callLlm(prompt, context);
        } catch (Exception ex) {
            log.warn("Page usability via LLM failed, defaulting to usable=true. reason={}", ex.toString());
            return true;
        }
        Object use = result.get("use");
        if (use instanceof Boolean b) return b;
        if (use instanceof String s) return Boolean.parseBoolean(s);
        return false;
    }

    public Map<String, Object> extractDocumentProperties(List<String> markdownPages) {
        // Join multiple pages' markdown into a JSON array of strings as context
        String context;
        try { context = mapper.writeValueAsString(markdownPages); } catch (Exception e) { context = "[]"; }
        String prompt = defaultExtractionPrompt();
        String override = prompts.getDocumentExtractionPrimary();
        if (override != null && !override.isBlank()) prompt = override;
        Map<String, Object> res;
        try {
            res = callLlm(prompt, context);
        } catch (Exception ex) {
            res = new HashMap<>();
        }
        Map<String, Object> norm = normalizeExtraction(res);
        if (norm == null || norm.isEmpty()) norm = defaultExtractionObject();
        return norm;
    }

    public Map<String, Object> extractDocumentPropertiesMerged(List<String> markdownPages) {
        String context;
        try { context = mapper.writeValueAsString(markdownPages); } catch (Exception e) { context = "[]"; }

        List<String> promptsList = new ArrayList<>();
        if (prompts.getDocumentExtractionPrimary() != null && !prompts.getDocumentExtractionPrimary().isBlank())
            promptsList.add(prompts.getDocumentExtractionPrimary());
        if (prompts.getDocumentExtractionSecondary() != null && !prompts.getDocumentExtractionSecondary().isBlank())
            promptsList.add(prompts.getDocumentExtractionSecondary());
        if (prompts.getDocumentExtractionTertiary() != null && !prompts.getDocumentExtractionTertiary().isBlank())
            promptsList.add(prompts.getDocumentExtractionTertiary());
        if (promptsList.isEmpty()) promptsList.add(defaultExtractionPrompt());

        Map<String, Object> merged = new HashMap<>();
        for (String p : promptsList) {
            Map<String, Object> res;
            try {
                res = callLlm(p, context);
            } catch (Exception ex) {
                res = new HashMap<>();
            }
            res = normalizeExtraction(res);
            if (res == null) continue;
            // First non-null wins
            for (String k : List.of("category","firstName","surname","vsnr","birthDate","summary","additionalFields")) {
                if (!merged.containsKey(k) || merged.get(k) == null) {
                    Object v = res.get(k);
                    if (v != null) merged.put(k, v);
                }
            }
        }
        if (merged.isEmpty()) merged = defaultExtractionObject();
        return merged;
    }

    private JsonNode safeJsonNode(String json) {
        if (json == null || json.isBlank()) return mapper.getNodeFactory().nullNode();
        try { return mapper.readTree(json); } catch (Exception e) { return mapper.getNodeFactory().textNode(json); }
    }

    public Map<String, Object> aggregateVorgangFields(List<SubDocument> subDocs) {
        String prompt = buildAggregationPrompt();
        // Build minimal metadata context to avoid token explosion
        List<Map<String, Object>> lightweight = new ArrayList<>();
        for (SubDocument sd : subDocs) {
            Map<String, Object> m = new HashMap<>();
            m.put("category", sd.getCategory() != null ? sd.getCategory().getValue() : null);
            m.put("firstName", sd.getFirstName());
            m.put("surname", sd.getSurname());
            m.put("vsnr", sd.getVsnr());
            m.put("birthDate", sd.getBirthDate());
            m.put("summary", sd.getSummary());
            m.put("additionalFields", sd.getAdditionalFields());
            lightweight.add(m);
        }
        String context;
        try {
            context = mapper.writeValueAsString(lightweight);
        } catch (Exception e) {
            log.error("Failed to build aggregation context", e);
            throw new IllegalStateException("Failed to build aggregation context", e);
        }
        return callLlmAggregate(prompt, context);
    }

    private Map<String, Object> callLlm(String prompt, String context) {
        String content = callOpenAiChat(prompt, context);
        if (content == null || content.isBlank()) {
            return new HashMap<>();
        }
        try {
            return mapper.readValue(content, new TypeReference<Map<String, Object>>() {});
        } catch (Exception e) {
            try {
                JsonNode node = mapper.readTree(content);
                if (node.isObject()) {
                    return mapper.convertValue(node, new TypeReference<Map<String, Object>>() {});
                }
            } catch (Exception ignored) {}
            // Fallback sanitize to JSON object (strip fences / trim to braces)
            String sanitized = sanitizeToJsonObject(content);
            if (sanitized != null) {
                try {
                    return mapper.readValue(sanitized, new TypeReference<Map<String, Object>>() {});
                } catch (Exception ignored) {}
            }
            log.error("Failed to parse LLM JSON response");
            String promptPreview = prompt != null && prompt.length() > 500 ? prompt.substring(0,500) + "..." : String.valueOf(prompt);
            String contextPreview = context != null && context.length() > 500 ? context.substring(0,500) + "..." : String.valueOf(context);
            String contentPreview = content != null && content.length() > 500 ? content.substring(0,500) + "..." : content;
            log.info("LLM prompt (preview): {}", promptPreview);
            log.info("LLM context (preview): {}", contextPreview);
            log.info("LLM content (preview): {}", contentPreview);
            // already logged content preview above
            throw new IllegalStateException("Failed to parse LLM JSON response");
        }
    }

    private String callOpenAiChat(String prompt, String context) {
        String base = props.getBaseUrl();
        String apiKey = props.getApiKey();
        if (base == null || base.isBlank()) {
            throw new IllegalStateException("spring.ai.openai.base-url not configured");
        }
        if (apiKey == null || apiKey.isBlank()) {
            throw new IllegalStateException("spring.ai.openai.api-key not configured");
        }
        URI uri = URI.create(join(base, base.endsWith("/v1") ? "/chat/completions" : "/v1/chat/completions"));

        Map<String, Object> body = new HashMap<>();
        body.put("model", props.resolveModel());
        List<Map<String, Object>> messages = new ArrayList<>();
        Map<String, Object> systemMsg = new HashMap<>();
        systemMsg.put("role", "system");
        systemMsg.put("content", "You are a strict JSON API. Return valid JSON only.");
        messages.add(systemMsg);
        String userContent = prompt + "\n\nContext:\n" + (context == null ? "" : context);
        Map<String, Object> userMsg = new HashMap<>();
        userMsg.put("role", "user");
        userMsg.put("content", userContent);
        messages.add(userMsg);
        body.put("messages", messages);
        body.put("max_tokens", 512);
        body.put("temperature", 0);
        Map<String, Object> responseFormat = new HashMap<>();
        responseFormat.put("type", "json_object");
        body.put("response_format", responseFormat);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.setBearerAuth(apiKey);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
        try {
            ResponseEntity<String> resp = restTemplate.exchange(uri, HttpMethod.POST, entity, String.class);
            if (!resp.getStatusCode().is2xxSuccessful() || resp.getBody() == null) {
                log.warn("OpenAI chat returned non-2xx: status={}, body preview={}", resp.getStatusCode(),
                        resp.getBody() != null && resp.getBody().length() > 400 ? resp.getBody().substring(0,400)+"..." : resp.getBody());
                return null;
            }
            return extractGeneratedTextChat(resp.getBody());
        } catch (org.springframework.web.client.RestClientResponseException e) {
            log.warn("OpenAI chat HTTP error: status={}, body preview={}", e.getRawStatusCode(),
                    e.getResponseBodyAsString() != null && e.getResponseBodyAsString().length() > 400 ? e.getResponseBodyAsString().substring(0,400)+"..." : e.getResponseBodyAsString());
            return null;
        }
    }
    private Map<String, Object> callLlmAggregate(String prompt, String context) {
        return callLlm(prompt, context);
    }

    private String extractGeneratedTextChat(String responseBody) {
        try {
            JsonNode root = mapper.readTree(responseBody);
            JsonNode choices = root.path("choices");
            if (choices.isArray() && choices.size() > 0) {
                JsonNode message = choices.get(0).path("message");
                JsonNode content = message.path("content");
                if (content.isTextual()) return content.asText();
            }
        } catch (Exception e) {
            log.warn("Failed to parse OpenAI chat response", e);
        }
        return null;
    }

    private String sanitizeToJsonObject(String text) {
        if (text == null) return null;
        String t = text.trim();
        // Remove code fences like ```json ... ```
        if (t.startsWith("```")) {
            int firstNl = t.indexOf('\n');
            int lastFence = t.lastIndexOf("```\n");
            if (lastFence < 0) lastFence = t.lastIndexOf("```");
            if (firstNl > 0 && lastFence > firstNl) {
                t = t.substring(firstNl + 1, lastFence).trim();
            }
        }
        int start = t.indexOf('{');
        int end = t.lastIndexOf('}');
        if (start >= 0 && end > start) {
            String candidate = t.substring(start, end + 1);
            long opens = candidate.chars().filter(c -> c == '{').count();
            long closes = candidate.chars().filter(c -> c == '}').count();
            if (opens == closes) return candidate;
        }
        return null;
    }

    private Map<String, Object> defaultExtractionObject() {
        Map<String, Object> m = new HashMap<>();
        m.put("category", null);
        m.put("firstName", null);
        m.put("surname", null);
        m.put("vsnr", null);
        m.put("birthDate", null);
        m.put("summary", null);
        m.put("additionalFields", new HashMap<String, Object>());
        return m;
    }

    private Map<String, Object> normalizeExtraction(Map<String, Object> in) {
        if (in == null) return defaultExtractionObject();
        Map<String, Object> out = defaultExtractionObject();
        // direct mappings
        Object category = in.getOrDefault("category", in.get("Category"));
        if (category instanceof String s) out.put("category", normalizeCategory(s));
        Object first = in.getOrDefault("firstName", in.getOrDefault("first_name", in.get("vorname")));
        if (first instanceof String) out.put("firstName", first);
        Object sur = in.getOrDefault("surname", in.getOrDefault("last_name", in.get("nachname")));
        if (sur instanceof String) out.put("surname", sur);
        Object vsnr = in.getOrDefault("vsnr", in.getOrDefault("insurance_number", in.get("versicherung")));
        if (vsnr instanceof String) out.put("vsnr", vsnr);
        Object dob = in.getOrDefault("birthDate", in.getOrDefault("date_of_birth", in.get("geburtsdatum")));
        if (dob instanceof String) out.put("birthDate", dob);
        Object summary = in.getOrDefault("summary", in.get("zusammenfassung"));
        if (summary instanceof String) out.put("summary", summary);
        // additional fields: merge provided additionalFields if object, then collect rest
        Map<String, Object> add = new HashMap<>();
        Object addObj = in.get("additionalFields");
        if (addObj instanceof Map<?,?> amap) {
            for (Map.Entry<?,?> e : amap.entrySet()) {
                if (e.getKey() != null) add.put(String.valueOf(e.getKey()), e.getValue());
            }
        }
        for (Map.Entry<String, Object> e : in.entrySet()) {
            String k = e.getKey();
            if (k == null) continue;
            if (k.equals("category") || k.equals("Category") || k.equals("firstName") || k.equals("first_name") || k.equals("vorname")
                || k.equals("surname") || k.equals("last_name") || k.equals("nachname") || k.equals("vsnr") || k.equals("insurance_number") || k.equals("versicherung")
                || k.equals("birthDate") || k.equals("date_of_birth") || k.equals("geburtsdatum") || k.equals("summary") || k.equals("zusammenfassung")) {
                continue;
            }
            add.put(k, e.getValue());
        }
        out.put("additionalFields", add);
        return out;
    }

    private String normalizeCategory(String s) {
        if (s == null) return null;
        String t = s.trim().toUpperCase(java.util.Locale.ROOT);
        // Remove common separators
        t = t.replace('-', ' ').replace('_', ' ').replaceAll("\\s+", " ").trim();
        // Map known labels to canonical
        switch (t) {
            case "AUSWEIS": return "AUSWEIS";
            case "GEBURTSURKUNDE": return "GEBURTSURKUNDE";
            case "STERBEURKUNDE": return "STERBEURKUNDE";
            case "ZEUGNIS": return "ZEUGNIS";
            case "STEUERBESCHEID": return "STEUERBESCHEID";
            case "KRANKENKASSENBESCHEINIGUNG": return "KRANKENKASSENBESCHEINIGUNG";
            case "SONSTIGE": return "SONSTIGE";
            default:
                // Backward compatibility
                if (t.contains("ANTRAG") || t.contains("BESCHEID") || t.contains("ARZT")) {
                    return "SONSTIGE";
                }
                return t; // leave as-is; downstream may handle or map to SONSTIGE
        }
    }

    private void applyToSubDocument(SubDocument target, Map<String, Object> payload) {
        if (payload == null) return;
        if (target.getCategory() == null) {
            Object c = payload.get("category");
            if (c instanceof String s) {
                try { target.setCategory(SubDocument.CategoryEnum.fromValue(s)); } catch (Exception ignored) {}
            }
        }
        if (target.getFirstName() == null) {
            Object v = payload.get("firstName");
            if (v instanceof String) target.setFirstName((String) v);
        }
        if (target.getSurname() == null) {
            Object v = payload.get("surname");
            if (v instanceof String) target.setSurname((String) v);
        }
        if (target.getVsnr() == null) {
            Object v = payload.get("vsnr");
            if (v instanceof String) target.setVsnr((String) v);
        }
        if (target.getBirthDate() == null) {
            Object v = payload.get("birthDate");
            if (v instanceof String s) {
                try { target.setBirthDate(LocalDate.parse(s)); } catch (Exception ignored) {}
            }
        }
        if (target.getSummary() == null) {
            Object v = payload.get("summary");
            if (v instanceof String) target.setSummary((String) v);
        }
        Object add = payload.get("additionalFields");
        if (add instanceof Map<?,?> m) {
            Map<String, Object> current = target.getAdditionalFields();
            if (current == null) current = new HashMap<>();
            for (Map.Entry<?,?> e : m.entrySet()) {
                Object key = e.getKey();
                if (key != null) current.put(String.valueOf(key), e.getValue());
            }
            target.setAdditionalFields(current);
        }
    }

    private String buildAggregationPrompt() { return defaultIfBlank(prompts.getApplicationAggregation(), defaultAggregationPrompt()); }

    private String join(String base, String path) {
        if (base.endsWith("/") && path.startsWith("/")) return base + path.substring(1);
        if (!base.endsWith("/") && !path.startsWith("/")) return base + "/" + path;
        return base + path;
    }

    // Defaults in case prompts are not provided
    private String defaultExtractionPrompt() {
        return "You are an information extraction service. Given the Docling JSON of one document (possibly multiple pages), return ONLY a JSON object with keys: category(one of ANTRAG,BESCHIED,ARZTDOKUMENT,SONSTIGE), firstName, surname, vsnr, birthDate(YYYY-MM-DD), summary, additionalFields(object). If not found use null.";
    }

    private String defaultAggregationPrompt() {
        return "Given a JSON array of SubDocument objects (fields category, firstName, surname, vsnr, birthDate, summary, additionalFields), infer the most likely overall fields for the entire Antrag. Return ONLY JSON with keys: firstName, surname, vsnr, birthDate(YYYY-MM-DD), summary. Use null when unknown.";
    }

    private String defaultGroupingPrompt() {
        return "Given a list of pages with their Docling JSON, group pages belonging to the same logical document. Return ONLY JSON of the form {\"groups\":[[pageIndex...], ...]} using 0-based indices.";
    }

    private String defaultIfBlank(String val, String def) { return (val == null || val.isBlank()) ? def : val; }
}
