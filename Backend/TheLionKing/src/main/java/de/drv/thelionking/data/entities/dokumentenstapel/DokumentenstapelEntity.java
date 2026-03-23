package de.drv.thelionking.data.entities.dokumentenstapel;

import de.drv.thelionking.data.entities.document.Document;
import de.drv.thelionking.data.entities.page.PageEntity;
import de.drv.thelionking.data.entities.vorgang.Vorgang;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "dokumentenstapel")
public class DokumentenstapelEntity {

    @Id
    @Getter
    @GeneratedValue(strategy = GenerationType.AUTO)
    UUID id;

    @Getter
    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vorgang_id", nullable = false)
    Vorgang vorgang;

    @Getter
    @Setter
    @Column
    String stapelName;

    @Getter
    @Setter
    @Column
    String uploadFilename;

    @Getter
    @Setter
    @Column
    String originalFilename;

    @Getter
    @Setter
    @Column
    String pdfStorageRef;

    @Getter
    @Setter
    @Column
    Integer seitenAnzahl;

    @Getter
    @Setter
    @Column
    String status;

    @Getter
    @Setter
    @Column(nullable = false, updatable = false)
    Instant createdAt;

    @Getter
    @Setter
    @Lob
    @Column(name = "upload_pdf")
    byte[] uploadPdf;

    @Getter
    @OneToMany(mappedBy = "dokumentenstapelEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    List<PageEntity> pageEntities = new ArrayList<>();

    @Getter
    @OneToMany(mappedBy = "dokumentenstapelEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Document> documents = new ArrayList<>();

    public DokumentenstapelEntity() {
    }

    @PrePersist
    void onCreate() {
        if (createdAt == null) {
            createdAt = Instant.now();
        }
    }
}

