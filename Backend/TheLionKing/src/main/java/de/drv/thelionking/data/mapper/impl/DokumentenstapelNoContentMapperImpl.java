package de.drv.thelionking.data.mapper.impl;

import de.drv.thelionking.data.entities.dokumentenstapel.DokumentenstapelEntity;
import de.drv.thelionking.data.mapper.Mapper;
import de.drv.thelionking.model.DokumentenstapelNoContent;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class DokumentenstapelNoContentMapperImpl implements Mapper<DokumentenstapelEntity, DokumentenstapelNoContent> {

    private final ModelMapper modelMapper;

    public DokumentenstapelNoContentMapperImpl(ModelMapper modelMapper){
        this.modelMapper = modelMapper;
    }

    @Override
    public DokumentenstapelNoContent mapTo(DokumentenstapelEntity dokumentenstapelEntity) {
        return modelMapper.map(dokumentenstapelEntity, DokumentenstapelNoContent.class);
    }

    @Override
    public DokumentenstapelEntity mapFrom(DokumentenstapelNoContent dokumentenstapel) {
        return modelMapper.map(dokumentenstapel, DokumentenstapelEntity.class);
    }

}
