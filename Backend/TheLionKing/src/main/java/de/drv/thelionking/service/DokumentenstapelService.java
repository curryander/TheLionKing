package de.drv.thelionking.service;

import de.drv.thelionking.data.entities.dokumentenstapel.DokumentenstapelEntity;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface DokumentenstapelService {

    public List<DokumentenstapelEntity> findAll();

    public Optional<DokumentenstapelEntity> findOneDokumentenstapel(UUID stapelId);
}
