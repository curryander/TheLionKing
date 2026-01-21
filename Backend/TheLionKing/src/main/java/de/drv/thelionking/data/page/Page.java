package de.drv.thelionking.data.page;

import de.drv.thelionking.data.vorgang.Vorgang;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "page")
public class Page {
    @Id
    @Getter
    @GeneratedValue(strategy = GenerationType.AUTO)
    UUID id;

    @Getter
    @Setter
    @Column(nullable = false)
    int pageIndex;

    @Getter
    @Column
    @Lob
    byte[] pdf;

    @Getter
    @Setter
    @Column
    @Lob
    String doclingJson;

    @Getter
    @Setter
    @Column
    @Lob
    String doclingMarkdown;

    @Getter
    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vorgang_id", referencedColumnName = "id")
    Vorgang vorgang;

    @Getter
    @Setter
    @Column(nullable = false)
    boolean usable = true;

    public Page() {}

    public Page(int pageIndex, byte[] pdf, Vorgang vorgang) {
        this.pageIndex = pageIndex;
        this.pdf = pdf;
        this.vorgang = vorgang;
        this.usable = true;
    }
}
