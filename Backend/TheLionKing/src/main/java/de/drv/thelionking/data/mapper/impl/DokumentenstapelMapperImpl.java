package de.drv.thelionking.data.mapper.impl;

import de.drv.thelionking.data.entities.dokumentenstapel.DokumentenstapelEntity;
import de.drv.thelionking.data.mapper.Mapper;
import de.drv.thelionking.model.Dokumentenstapel;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class DokumentenstapelMapperImpl implements Mapper<DokumentenstapelEntity, Dokumentenstapel> {

    private final ModelMapper modelMapper;

    public DokumentenstapelMapperImpl(ModelMapper modelMapper){
        this.modelMapper = modelMapper;
    }

    @Override
    public Dokumentenstapel mapTo(DokumentenstapelEntity dokumentenstapelEntity) {
        return modelMapper.map(dokumentenstapelEntity, Dokumentenstapel.class);
    }

    @Override
    public DokumentenstapelEntity mapFrom(Dokumentenstapel dokumentenstapel) {
        return modelMapper.map(dokumentenstapel, DokumentenstapelEntity.class);
    }

}
