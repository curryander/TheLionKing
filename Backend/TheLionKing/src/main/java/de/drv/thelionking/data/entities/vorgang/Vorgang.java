package de.drv.thelionking.data.entities.vorgang;

import de.drv.thelionking.data.entities.dokumentenstapel.DokumentenstapelEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import de.drv.thelionking.data.entities.versicherter.Versicherter;

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
    @JoinColumn(name = "vsnr", referencedColumnName = "vsnr", nullable = false)
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
    List<DokumentenstapelEntity> dokumentenstapelEntity = new ArrayList<>();

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
        DokumentenstapelEntity stapel = new DokumentenstapelEntity();
        stapel.setVorgang(this);
        stapel.setStapelName("stapel-1");
        stapel.setStatus("UPLOADED");
        stapel.setUploadPdf(multiPageDocument);
        this.dokumentenstapelEntity.add(stapel);
    }

    public Vorgang() {}

    public DokumentenstapelEntity getOrCreatePrimaryStapel() {
        if (dokumentenstapelEntity == null) {
            dokumentenstapelEntity = new ArrayList<>();
        }
        if (dokumentenstapelEntity.isEmpty()) {
            DokumentenstapelEntity stapel = new DokumentenstapelEntity();
            stapel.setVorgang(this);
            stapel.setStapelName("stapel-1");
            stapel.setStatus("UPLOADED");
            dokumentenstapelEntity.add(stapel);
            return stapel;
        }
        return dokumentenstapelEntity.get(0);
    }

    public byte[] getMultiPageDocument() {
        DokumentenstapelEntity stapel = getOrCreatePrimaryStapel();
        return stapel.getUploadPdf();
    }

    public void setMultiPageDocument(byte[] data) {
        DokumentenstapelEntity stapel = getOrCreatePrimaryStapel();
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

