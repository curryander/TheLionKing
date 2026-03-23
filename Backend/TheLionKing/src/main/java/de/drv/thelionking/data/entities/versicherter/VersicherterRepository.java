package de.drv.thelionking.data.entities.versicherter;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface VersicherterRepository extends CrudRepository<Versicherter, UUID> {
    Optional<Versicherter> findFirstByVsnr(String vsnr);
}

