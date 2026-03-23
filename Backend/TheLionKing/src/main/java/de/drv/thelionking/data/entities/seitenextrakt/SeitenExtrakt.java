package de.drv.thelionking.data.entities.seitenextrakt;

import de.drv.thelionking.data.entities.page.PageEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "seiten_extrakt")
public class SeitenExtrakt {

    @Id
    @Getter
    @GeneratedValue(strategy = GenerationType.AUTO)
    UUID id;

    @Getter
    @Setter
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seite_id", nullable = false, unique = true)
    PageEntity seite;

    @Getter
    @Setter
    @Lob
    @Column
    String markdown;

    @Getter
    @Setter
    @Lob
    @Column(name = "docling_json")
    String doclingJson;

    @Getter
    @Setter
    @Column
    String ocrEngine;

    @Getter
    @Setter
    @Column
    Instant extractedAt;
}

