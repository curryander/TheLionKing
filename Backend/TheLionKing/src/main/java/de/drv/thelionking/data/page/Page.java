package de.drv.thelionking.data.page;

import de.drv.thelionking.data.dokumentenstapel.Dokumentenstapel;
import de.drv.thelionking.data.seitenextrakt.SeitenExtrakt;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "seite")
public class Page {
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
    Dokumentenstapel dokumentenstapel;

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

    public Page() {}

    public Page(int pageNo, byte[] pdf, Dokumentenstapel dokumentenstapel) {
        this.pageNo = pageNo;
        this.pdf = pdf;
        this.dokumentenstapel = dokumentenstapel;
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

