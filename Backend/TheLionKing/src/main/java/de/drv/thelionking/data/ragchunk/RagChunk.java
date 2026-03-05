package de.drv.thelionking.data.ragchunk;

import de.drv.thelionking.data.document.Document;
import de.drv.thelionking.data.jpa.MapToJsonConverter;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;

@Entity
@Table(name = "rag_chunk")
public class RagChunk {

    @Id
    @Getter
    @GeneratedValue(strategy = GenerationType.AUTO)
    UUID id;

    @Getter
    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dokument_id", nullable = false)
    Document dokument;

    @Getter
    @Setter
    @Column(nullable = false)
    int chunkNo;

    @Getter
    @Setter
    @Lob
    @Column
    String text;

    @Getter
    @Setter
    @Lob
    @Convert(converter = MapToJsonConverter.class)
    Map<String, Object> metadata;

    @Getter
    @Setter
    @Column(nullable = false, updatable = false)
    Instant createdAt;

    @PrePersist
    void onCreate() {
        if (createdAt == null) {
            createdAt = Instant.now();
        }
    }
}
