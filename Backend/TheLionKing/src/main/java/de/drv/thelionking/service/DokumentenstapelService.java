package de.drv.thelionking.service;

import de.drv.thelionking.data.entities.dokumentenstapel.DokumentenstapelEntity;
import org.springframework.stereotype.Service;

import java.util.List;

public interface DokumentenstapelService {

    public List<DokumentenstapelEntity> findAll();
}
