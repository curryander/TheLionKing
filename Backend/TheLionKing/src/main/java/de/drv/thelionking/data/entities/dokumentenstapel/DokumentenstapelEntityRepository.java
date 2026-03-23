package de.drv.thelionking.data.entities.dokumentenstapel;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface DokumentenstapelEntityRepository extends CrudRepository<DokumentenstapelEntity, UUID> {
    Optional<DokumentenstapelEntity> findFirstByVorgang_IdOrderByCreatedAtAsc(UUID vorgangId);
    List<DokumentenstapelEntity> findAllByVorgang_IdOrderByCreatedAtAsc(UUID vorgangId);
}

