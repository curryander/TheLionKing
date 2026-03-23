package de.drv.thelionking.data.entities.versicherter;

import de.drv.thelionking.data.entities.vorgang.Vorgang;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "versicherter")
public class Versicherter {

    @Id
    @Getter
    @GeneratedValue(strategy = GenerationType.AUTO)
    UUID id;

    @Getter
    @Setter
    @Column
    String vorname;

    @Getter
    @Setter
    @Column
    String nachname;

    @Getter
    @Setter
    @Column(nullable = false, unique = true)
    String vsnr;

    @Getter
    @Setter
    @Column
    LocalDate geburtsdatum;

    @Getter
    @Setter
    @Column(nullable = false, updatable = false)
    Instant createdAt;

    @Getter
    @OneToMany(mappedBy = "versicherter", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Vorgang> vorgaenge = new ArrayList<>();

    @PrePersist
    void onCreate() {
        if (createdAt == null) {
            createdAt = Instant.now();
        }
    }
}

