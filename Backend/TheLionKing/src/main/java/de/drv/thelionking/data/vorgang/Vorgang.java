package de.drv.thelionking.data.vorgang;

import de.drv.thelionking.data.dokumentenstapel.Dokumentenstapel;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import de.drv.thelionking.data.document.Document;
import de.drv.thelionking.model.SubDocument;
import de.drv.thelionking.model.ResultResponse;
import de.drv.thelionking.data.versicherter.Versicherter;

@Entity
@Table(name = "vorgang")
public class Vorgang {

    @Id
    @Getter
    @GeneratedValue(strategy= GenerationType.AUTO)
    UUID id;

    @Getter
    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "versicherter_id")
    Versicherter versicherter;

    @Getter
    @Setter
    @Column
    String vorgangsnummer;

    @Getter
    @Setter
    @Column
    String status;

    @Getter
    @Setter
    @Column(updatable = false)
    Instant createdAt;

    @Getter
    @Setter
    @Column
    Instant updatedAt;

    @Getter
    @Setter
    @Column(unique = false)
    int progress;

    // Relationship: one Vorgang has many Dokumentenstapel
    @Getter
    @OneToMany(mappedBy = "vorgang", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Dokumentenstapel> dokumentenstapel = new ArrayList<>();

    @Getter
    @Setter
    @Column(nullable = true)
    String summary;

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
        this.status = "UPLOADED";
        Dokumentenstapel stapel = new Dokumentenstapel();
        stapel.setVorgang(this);
        stapel.setStapelName("stapel-1");
        stapel.setStatus("UPLOADED");
        stapel.setUploadPdf(multiPageDocument);
        this.dokumentenstapel.add(stapel);
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
        rr.setFirstName(this.versicherter != null ? this.versicherter.getVorname() : null);
        rr.setSurname(this.versicherter != null ? this.versicherter.getNachname() : null);
        rr.setSummary(this.summary);
        rr.setVsnr(this.versicherter != null ? this.versicherter.getVsnr() : null);
        rr.setBirthDate(this.versicherter != null ? this.versicherter.getGeburtsdatum() : null);

        List<SubDocument> subDocs = new ArrayList<>();
        if (this.dokumentenstapel != null) {
            for (Dokumentenstapel stapel : this.dokumentenstapel) {
                if (stapel.getDocuments() == null) continue;
                for (Document d : stapel.getDocuments()) {
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
        }
        rr.setDocuments(subDocs);
        return rr;
    }

    public Dokumentenstapel getOrCreatePrimaryStapel() {
        if (dokumentenstapel == null) {
            dokumentenstapel = new ArrayList<>();
        }
        if (dokumentenstapel.isEmpty()) {
            Dokumentenstapel stapel = new Dokumentenstapel();
            stapel.setVorgang(this);
            stapel.setStapelName("stapel-1");
            stapel.setStatus("UPLOADED");
            dokumentenstapel.add(stapel);
            return stapel;
        }
        return dokumentenstapel.get(0);
    }

    public Versicherter getOrCreateVersicherter() {
        if (versicherter == null) {
            versicherter = new Versicherter();
            versicherter.getVorgaenge().add(this);
        }
        return versicherter;
    }

    public byte[] getMultiPageDocument() {
        Dokumentenstapel stapel = getOrCreatePrimaryStapel();
        return stapel.getUploadPdf();
    }

    public void setMultiPageDocument(byte[] data) {
        Dokumentenstapel stapel = getOrCreatePrimaryStapel();
        stapel.setUploadPdf(data);
    }

    @PrePersist
    void onCreate() {
        Instant now = Instant.now();
        if (createdAt == null) {
            createdAt = now;
        }
        if (updatedAt == null) {
            updatedAt = now;
        }
    }

    @PreUpdate
    void onUpdate() {
        updatedAt = Instant.now();
    }
}
