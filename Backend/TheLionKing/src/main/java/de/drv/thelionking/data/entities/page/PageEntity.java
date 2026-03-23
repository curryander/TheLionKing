package de.drv.thelionking.data.entities.page;

import de.drv.thelionking.data.entities.dokumentenstapel.DokumentenstapelEntity;
import de.drv.thelionking.data.entities.seitenextrakt.SeitenExtrakt;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "seite")
public class PageEntity {
    @Id
    @Getter
    @GeneratedValue(strategy = GenerationType.AUTO)
    UUID id;

    @Getter
    @Setter
    @Column(nullable = false)
    int pageNo;

    @Getter
    @Column
    @Lob
    byte[] pdf;

    @Getter
    @Setter
    @Column
    String pdfPagePath;

    @Getter
    @Setter
    @Column
    String sha256;

    @Getter
    @Setter
    @Column
    String status;

    @Getter
    @Setter
    @Column(length = 2048)
    String errorMessage;

    @Getter
    @Setter
    @Lob
    @Column(name = "extracted_text")
    String extractedText;

    @Getter
    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dokumentenstapel_id", referencedColumnName = "id", nullable = false)
    DokumentenstapelEntity dokumentenstapelEntity;

    @Getter
    @Setter
    @OneToOne(mappedBy = "seite", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    SeitenExtrakt seitenExtrakt;

    @Getter
    @Setter
    @Column(nullable = false, updatable = false)
    Instant createdAt;

    @Getter
    @Setter
    @Column(nullable = false)
    boolean usable = true;

    public PageEntity() {}

    public PageEntity(int pageNo, byte[] pdf, DokumentenstapelEntity dokumentenstapelEntity) {
        this.pageNo = pageNo;
        this.pdf = pdf;
        this.dokumentenstapelEntity = dokumentenstapelEntity;
        this.usable = true;
        this.status = "CREATED";
    }

    public int getPageIndex() {
        return pageNo;
    }

    public void setPageIndex(int pageIndex) {
        this.pageNo = pageIndex;
    }

    public String getDoclingJson() {
        return seitenExtrakt != null ? seitenExtrakt.getDoclingJson() : null;
    }

    public void setDoclingJson(String doclingJson) {
        ensureExtrakt().setDoclingJson(doclingJson);
    }

    public String getDoclingMarkdown() {
        return seitenExtrakt != null ? seitenExtrakt.getMarkdown() : null;
    }

    public void setDoclingMarkdown(String doclingMarkdown) {
        ensureExtrakt().setMarkdown(doclingMarkdown);
    }

    private SeitenExtrakt ensureExtrakt() {
        if (seitenExtrakt == null) {
            SeitenExtrakt extrakt = new SeitenExtrakt();
            extrakt.setSeite(this);
            this.seitenExtrakt = extrakt;
        }
        return seitenExtrakt;
    }

    @PrePersist
    void onCreate() {
        if (createdAt == null) {
            createdAt = Instant.now();
        }
    }
}

