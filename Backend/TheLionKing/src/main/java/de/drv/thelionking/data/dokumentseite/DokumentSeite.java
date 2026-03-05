package de.drv.thelionking.data.dokumentseite;

import de.drv.thelionking.data.document.Document;
import de.drv.thelionking.data.page.Page;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Entity
@Table(name = "dokument_seite")
public class DokumentSeite {

    @EmbeddedId
    @Getter
    @Setter
    DokumentSeiteId id;

    @Getter
    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("dokumentId")
    @JoinColumn(name = "dokument_id", nullable = false)
    Document dokument;

    @Getter
    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("seiteId")
    @JoinColumn(name = "seite_id", nullable = false)
    Page seite;

    @Getter
    @Setter
    @Column
    Integer position;

    @Getter
    @Setter
    @Column
    String assignedBy;

    @Getter
    @Setter
    @Column
    Double confidence;

    @Getter
    @Setter
    @Column
    Instant assignedAt;
}
