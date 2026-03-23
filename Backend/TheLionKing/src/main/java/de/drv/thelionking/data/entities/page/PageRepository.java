package de.drv.thelionking.data.entities.page;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PageRepository extends CrudRepository<PageEntity, UUID> {
    List<PageEntity> findAllByDokumentenstapelEntity_Vorgang_IdOrderByPageNoAsc(UUID vorgangId);
    List<PageEntity> findAllByDokumentenstapelEntity_IdOrderByPageNoAsc(UUID stapelId);
    long countByDokumentenstapelEntity_Id(UUID stapelId);
    long countByDokumentenstapelEntity_IdAndStatus(UUID stapelId, String status);
}
