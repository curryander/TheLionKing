package de.drv.thelionking.data.dokumentenstapel;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface DokumentenstapelRepository extends CrudRepository<Dokumentenstapel, UUID> {
    Optional<Dokumentenstapel> findFirstByVorgang_IdOrderByCreatedAtAsc(UUID vorgangId);
}

