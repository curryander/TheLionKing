package de.drv.thelionking.data.page;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PageRepository extends CrudRepository<Page, UUID> {
    List<Page> findAllByVorgang_IdOrderByPageIndexAsc(UUID vorgangId);
}

