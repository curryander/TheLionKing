package de.drv.thelionking.data.mapper.impl;

import de.drv.thelionking.data.entities.page.PageEntity;
import de.drv.thelionking.data.mapper.Mapper;
import de.drv.thelionking.model.Page;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class PagesMapperImpl implements Mapper<PageEntity, Page> {

    private final ModelMapper modelMapper;

    public PagesMapperImpl(ModelMapper modelMapper){
        this.modelMapper = modelMapper;
    }

    @Override
    public Page mapTo(PageEntity pageEntity) {
        return modelMapper.map(pageEntity, Page.class);
    }

    @Override
    public PageEntity mapFrom(Page page) {
        return modelMapper.map(page, PageEntity.class);
    }
}
