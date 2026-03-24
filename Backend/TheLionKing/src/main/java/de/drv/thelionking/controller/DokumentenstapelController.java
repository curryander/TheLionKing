package de.drv.thelionking.controller;

import de.drv.thelionking.api.DokumentenstapelApi;
import de.drv.thelionking.data.entities.dokumentenstapel.DokumentenstapelEntity;
import de.drv.thelionking.data.entities.page.PageEntity;
import de.drv.thelionking.data.mapper.Mapper;
import de.drv.thelionking.model.Dokumentenstapel;
import de.drv.thelionking.model.DokumentenstapelNoContent;
import de.drv.thelionking.model.PageNoContent;
import de.drv.thelionking.service.DokumentenstapelService;
import de.drv.thelionking.workflow.service.VorgangWorkflowService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.NativeWebRequest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
public class DokumentenstapelController implements DokumentenstapelApi {

    private final DokumentenstapelService dokumentenstapelService;
    private final Mapper<DokumentenstapelEntity, Dokumentenstapel> dokumentenstapelMapper;
    private final Mapper<DokumentenstapelEntity, DokumentenstapelNoContent> dokumentenstapelNoContentMapper;
    private final Mapper<PageEntity, PageNoContent> pagesMapper;
    private final VorgangWorkflowService vorgangWorkflowService;


    public DokumentenstapelController(
            DokumentenstapelService dokumentenstapelService,
            Mapper<DokumentenstapelEntity, Dokumentenstapel> dokumentenstapelMapper,
            Mapper<DokumentenstapelEntity, DokumentenstapelNoContent> dokumentenstapelNoContentMapper,
            Mapper<PageEntity, PageNoContent> pagesMapper,
            VorgangWorkflowService vorgangWorkflowService) {
        this.dokumentenstapelService = dokumentenstapelService;
        this.dokumentenstapelMapper = dokumentenstapelMapper;
        this.dokumentenstapelNoContentMapper = dokumentenstapelNoContentMapper;
        this.pagesMapper = pagesMapper;
        this.vorgangWorkflowService = vorgangWorkflowService;
    }



    @Override
    public ResponseEntity<List<DokumentenstapelNoContent>> getDokumentenstapel() {
        List<DokumentenstapelEntity> dokumentenstapelEntityList = dokumentenstapelService.findAll();
        List<DokumentenstapelNoContent> dokumentenstapelList = new ArrayList<>();

        for (DokumentenstapelEntity entity : dokumentenstapelEntityList) {
            DokumentenstapelNoContent dokumentenstapelNoContent = dokumentenstapelNoContentMapper.mapTo(entity);
            dokumentenstapelList.add(dokumentenstapelNoContent);
        }
        return ResponseEntity.ok(dokumentenstapelList);
    }

    @Override
    public Optional<NativeWebRequest> getRequest() {
        return DokumentenstapelApi.super.getRequest();
    }

    @Override
    public ResponseEntity<List<PageNoContent>> getDokumentenstapelPages(UUID stapelId) {
        List<PageEntity> pageEntities = vorgangWorkflowService.getPages(stapelId);
        List<PageNoContent> pages = new ArrayList<>();
        for (PageEntity pageEntity : pageEntities) {
            PageNoContent page = pagesMapper.mapTo(pageEntity);
            pages.add(page);
        }
        return ResponseEntity.ok(pages);
    }

    @Override
    public ResponseEntity<Dokumentenstapel> getDokumentenstapelUpload(UUID stapelId) {
        Optional<DokumentenstapelEntity> foundDokumentenstapelEntity = dokumentenstapelService.findOneDokumentenstapel(stapelId);
        return foundDokumentenstapelEntity.map(dokumentenstapelEntity -> {
            Dokumentenstapel dokumentenstapel = dokumentenstapelMapper.mapTo(dokumentenstapelEntity);
            return new ResponseEntity<>(dokumentenstapel, HttpStatus.OK);
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @Override
    public ResponseEntity<Void> triggerDokumentenstapelStep1(UUID stapelId) {
        vorgangWorkflowService.triggerStep1(stapelId);
        return ResponseEntity.accepted().build();
    }
}
