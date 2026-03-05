package de.drv.thelionking.data.dokumentseite;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Embeddable
@Getter
@Setter
public class DokumentSeiteId implements Serializable {
    @Column(name = "dokument_id")
    private UUID dokumentId;

    @Column(name = "seite_id")
    private UUID seiteId;

    public DokumentSeiteId() {
    }

    public DokumentSeiteId(UUID dokumentId, UUID seiteId) {
        this.dokumentId = dokumentId;
        this.seiteId = seiteId;
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof DokumentSeiteId that)) return false;
        return Objects.equals(dokumentId, that.dokumentId) && Objects.equals(seiteId, that.seiteId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(dokumentId, seiteId);
    }
}
