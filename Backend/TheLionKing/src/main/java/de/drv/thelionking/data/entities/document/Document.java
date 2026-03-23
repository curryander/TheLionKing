package de.drv.thelionking.data.entities.document;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Map;
import java.util.UUID;
import de.drv.thelionking.data.jpa.MapToJsonConverter;
import de.drv.thelionking.data.entities.dokumentenstapel.DokumentenstapelEntity;

@Entity
@Table(name = "dokument")
public class Document {

    @Id
    @Getter
    @GeneratedValue(strategy= GenerationType.AUTO)
    UUID id;

    @Getter
    @Setter
    @Column(unique = false)
    @Lob
    byte[] document;

    @Getter
    @Setter
    @Column
    Integer documentNo;

    @Getter
    @Setter
    @Column
    String dokumentTyp;

    @Getter
    @Setter
    @Column
    Double confidence;

    @Getter
    @Setter
    @Column(updatable = false)
    Instant createdAt;

    @Getter
    @Setter
    @Enumerated(EnumType.STRING)
    @Column(nullable = true)
    Category category;

    @Getter
    @Setter
    @Column(nullable = true)
    String firstName;

    @Getter
    @Setter
    @Column(nullable = true)
    String surname;

    @Getter
    @Setter
    @Column(nullable = true)
    String vsnr;

    @Getter
    @Setter
    @Column(nullable = true)
    LocalDate birthDate;

    @Getter
    @Setter
    @Column(nullable = true)
    String summary;

    // additionalFields persisted as JSON via AttributeConverter
    @Lob
    @Column(name = "erkannte_entitaeten")
    @Convert(converter = MapToJsonConverter.class)
    Map<String, Object> erkannteEntitaeten;

    // Link to parent Dokumentenstapel (one Dokumentenstapel -> many Documents)
    @Getter
    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dokumentenstapel_id", referencedColumnName = "id", nullable = false)
    DokumentenstapelEntity dokumentenstapelEntity;

    public enum Category {
        AUSWEIS,
        GEBURTSURKUNDE,
        STERBEURKUNDE,
        ZEUGNIS,
        STEUERBESCHEID,
        KRANKENKASSENBESCHEINIGUNG,
        SONSTIGE
    }

    public Document(byte[] document) {
        this.document = document;
    }

    public Document() {}

    @PrePersist
    void onCreate() {
        if (createdAt == null) {
            createdAt = Instant.now();
        }
    }

    public Map<String, Object> getErkannteEntitaeten() {
        return erkannteEntitaeten;
    }

    public void setErkannteEntitaeten(Map<String, Object> erkannteEntitaeten) {
        this.erkannteEntitaeten = erkannteEntitaeten;
    }

    // Backward-compatible aliases used by API/OpenAPI mapping
    public Map<String, Object> getAdditionalFields() {
        return erkannteEntitaeten;
    }

    public void setAdditionalFields(Map<String, Object> additionalFields) {
        this.erkannteEntitaeten = additionalFields;
    }
}

