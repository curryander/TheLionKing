package de.drv.thelionking.data.vorgang;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface VorgangRepository extends CrudRepository<Vorgang, UUID> {

}
