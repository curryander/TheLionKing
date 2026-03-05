package de.drv.thelionking.data.page;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PageRepository extends CrudRepository<Page, UUID> {
    List<Page> findAllByDokumentenstapel_Vorgang_IdOrderByPageNoAsc(UUID vorgangId);
    List<Page> findAllByDokumentenstapel_IdOrderByPageNoAsc(UUID stapelId);
    long countByDokumentenstapel_Id(UUID stapelId);
    long countByDokumentenstapel_IdAndStatus(UUID stapelId, String status);
}

