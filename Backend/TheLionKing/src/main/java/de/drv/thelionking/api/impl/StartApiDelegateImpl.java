package de.drv.thelionking.api.impl;

import de.drv.thelionking.api.*;
import de.drv.thelionking.data.vorgang.Vorgang;
import de.drv.thelionking.data.vorgang.VorgangRepository;
import de.drv.thelionking.model.*;
import de.drv.thelionking.service.ProcessingService;
import org.apache.commons.io.FileUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.NativeWebRequest;

import java.io.File;
import java.io.IOException;
import java.util.Optional;

@Service
@Slf4j
public class StartApiDelegateImpl implements StartApiDelegate {


    VorgangRepository vorgangRepository;
    ProcessingService processingService;

    @Autowired
    public StartApiDelegateImpl(final VorgangRepository vorgangRepository,
                                final ProcessingService processingService) {
        this.vorgangRepository = vorgangRepository;
        this.processingService = processingService;
    }

    @Override
    public Optional<NativeWebRequest> getRequest() {
        return StartApiDelegate.super.getRequest();
    }

    @Override
    public ResponseEntity<StartResponse> startProcess(Resource body) {
        log.info("Start /start called: body present={} ", body != null);
        if (body == null) {
            de.drv.thelionking.model.ApiError err = new de.drv.thelionking.model.ApiError();
            err.setCode(de.drv.thelionking.model.ApiError.CodeEnum.BAD_REQUEST);
            err.setMessage("Missing PDF body");
            ResponseEntity raw = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
            return (ResponseEntity<StartResponse>) raw;
        }
        StartResponse resp = new StartResponse();
        byte[] inputFile = null;
        try {
            inputFile = body.getContentAsByteArray();
        } catch (IOException e) {
            log.warn("Failed reading input PDF: {}", e.getMessage());
            de.drv.thelionking.model.ApiError err = new de.drv.thelionking.model.ApiError();
            err.setCode(de.drv.thelionking.model.ApiError.CodeEnum.BAD_REQUEST);
            err.setMessage("Invalid PDF content");
            ResponseEntity raw = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
            return (ResponseEntity<StartResponse>) raw;
        }
        Vorgang vorgang = new Vorgang(inputFile);
        vorgang = vorgangRepository.save(vorgang);
        resp.setId(vorgang.getId());
        log.info("Started processing Vorgang {}", vorgang.getId());
        // fire and forget async processing
        processingService.processAsync(vorgang.getId());
        log.info("Uploaded file size: {}", FileUtils.byteCountToDisplaySize(inputFile.length));
        return ResponseEntity.accepted().body(resp);
    }

}
