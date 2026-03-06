package de.drv.thelionking.data.seitenextrakt;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SeitenExtraktRepository extends CrudRepository<SeitenExtrakt, UUID> {
    Optional<SeitenExtrakt> findBySeite_Id(UUID seiteId);
    List<SeitenExtrakt> findAllBySeite_Dokumentenstapel_IdOrderBySeite_PageNoAsc(UUID stapelId);
}

