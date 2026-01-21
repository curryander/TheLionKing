package de.drv.thelionking.data.document;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Map;
import java.util.UUID;
import de.drv.thelionking.data.jpa.MapToJsonConverter;
import de.drv.thelionking.data.vorgang.Vorgang;

@Entity
public class Document {

    @Id
    @Getter
    @GeneratedValue(strategy= GenerationType.AUTO)
    UUID id;

    @Getter
    @Column(unique = false)
    @Lob
    byte[] document;

    // Fields aligned with OpenAPI SubDocument schema
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
    @Getter
    @Setter
    @Lob
    @Convert(converter = MapToJsonConverter.class)
    Map<String, Object> additionalFields;

    // Link to parent Vorgang (one Vorgang -> many Documents)
    @Getter
    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vorgang_id", referencedColumnName = "id", nullable = true)
    Vorgang vorgang;

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
}
