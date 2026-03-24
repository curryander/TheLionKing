package de.drv.thelionking.data.mapper.impl;

import de.drv.thelionking.data.entities.page.PageEntity;
import de.drv.thelionking.data.mapper.Mapper;
import de.drv.thelionking.model.PageNoContent;
import org.modelmapper.ModelMapper;
import org.modelmapper.spi.DestinationSetter;
import org.springframework.stereotype.Component;

@Component
public class PageNoContentMapperImpl implements Mapper<PageEntity, PageNoContent> {

    private final ModelMapper modelMapper;

    public PageNoContentMapperImpl(ModelMapper modelMapper){
        this.modelMapper = modelMapper;
    }

    @Override
    public PageNoContent mapTo(PageEntity pageEntity) {
        return modelMapper.map(pageEntity, PageNoContent.class);
    }

    @Override
    public PageEntity mapFrom(PageNoContent page) {
        return modelMapper.map(page, PageEntity.class);
    }
}
