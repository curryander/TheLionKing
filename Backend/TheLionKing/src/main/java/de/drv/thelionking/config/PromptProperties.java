package de.drv.thelionking.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Setter
@Getter
@ConfigurationProperties(prefix = "prompts")
public class PromptProperties {
    // Grouping pages belonging to one document
    private String pageGrouping;
    // Page usability (discard empty/non-sense pages)
    private String pageUsability;
    // Document-level extraction prompts (primary/secondary/tertiary variants)
    private String documentExtractionPrimary;
    private String documentExtractionSecondary;
    private String documentExtractionTertiary;
    // Aggregation across all documents
    private String applicationAggregation;
}
