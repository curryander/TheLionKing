package de.drv.thelionking.data.vorgang;

import de.drv.thelionking.data.dokumentenstapel.Dokumentenstapel;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
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
