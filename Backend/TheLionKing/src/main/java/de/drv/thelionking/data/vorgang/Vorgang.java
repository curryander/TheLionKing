package de.drv.thelionking.data.vorgang;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import de.drv.thelionking.data.document.Document;
import de.drv.thelionking.model.ResultResponse;
import de.drv.thelionking.model.SubDocument;

@Entity
public class Vorgang {

    @Id
    @Getter
    @GeneratedValue(strategy= GenerationType.AUTO)
    UUID id;

    @Getter
    @Setter
    @Column(unique = false)
    int progress;

    @Getter
    @Column(unique = false)
    @Lob
    byte[] multiPageDocument;

    // Relationship: one Vorgang has many Documents
    @Getter
    @OneToMany(mappedBy = "vorgang", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Document> documents = new ArrayList<>();

    // Aggregated fields from OpenAPI ResultResponse
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
    String summary;

    @Getter
    @Setter
    @Column(nullable = true)
    String vsnr;

    @Getter
    @Setter
    @Column(nullable = true)
    LocalDate birthDate;

    // Error state reporting
    @Getter
    @Setter
    @Column(nullable = true)
    String errorCode;

    @Getter
    @Setter
    @Column(nullable = true, length = 2048)
    String errorMessage;

    public Vorgang(byte[] multiPageDocument) {
        this.progress = 0;
        this.multiPageDocument = multiPageDocument;
    }

    public Vorgang() {}

    /**
     * Convert this Vorgang to a ResultResponse when processing completed.
     * Throws IllegalStateException if progress is not 100.
     */
    public ResultResponse toResultResponse() {
        if (this.progress < 100) {
            throw new IllegalStateException("Vorgang not completed (progress=" + this.progress + ")");
        }

        ResultResponse rr = new ResultResponse();
        rr.setId(this.id != null ? this.id.toString() : null);
        rr.setFirstName(this.firstName);
        rr.setSurname(this.surname);
        rr.setSummary(this.summary);
        rr.setVsnr(this.vsnr);
        rr.setBirthDate(this.birthDate);

        List<SubDocument> subDocs = new ArrayList<>();
        if (this.documents != null) {
            for (Document d : this.documents) {
                SubDocument sd = new SubDocument();
                sd.setDocumentData(d.getDocument());
                if (d.getCategory() != null) {
                    sd.setCategory(SubDocument.CategoryEnum.valueOf(d.getCategory().name()));
                }
                sd.setFirstName(d.getFirstName());
                sd.setSurname(d.getSurname());
                sd.setVsnr(d.getVsnr());
                sd.setBirthDate(d.getBirthDate());
                sd.setSummary(d.getSummary());
                sd.setAdditionalFields(d.getAdditionalFields());
                subDocs.add(sd);
            }
        }
        rr.setDocuments(subDocs);
        return rr;
    }
}
