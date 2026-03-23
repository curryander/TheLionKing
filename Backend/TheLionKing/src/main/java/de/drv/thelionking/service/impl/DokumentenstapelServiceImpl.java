package de.drv.thelionking.service.impl;

import de.drv.thelionking.data.entities.dokumentenstapel.DokumentenstapelEntity;
import de.drv.thelionking.data.entities.dokumentenstapel.DokumentenstapelEntityRepository;
import de.drv.thelionking.service.DokumentenstapelService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class DokumentenstapelServiceImpl implements DokumentenstapelService {

    private final DokumentenstapelEntityRepository dokumentenstapelEntityRepository;

    public DokumentenstapelServiceImpl(DokumentenstapelEntityRepository dokumentenstapelEntityRepository){
        this.dokumentenstapelEntityRepository = dokumentenstapelEntityRepository;
    }

    public List<DokumentenstapelEntity> findAll(){
        return StreamSupport.stream(dokumentenstapelEntityRepository
                        .findAll()
                        .spliterator(),false)
                .collect(Collectors.toList());
    }
}
