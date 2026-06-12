package de.drv.thelionking.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.drv.thelionking.api.AnalysisApi;
import de.drv.thelionking.data.entities.dokumentenstapel.DokumentenstapelEntity;
import de.drv.thelionking.data.mapper.Mapper;
import de.drv.thelionking.model.Dokumentenstapel;
import de.drv.thelionking.service.DokumentenstapelService;
import org.openapitools.jackson.nullable.JsonNullable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.NativeWebRequest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import static org.springframework.http.HttpStatus.CONFLICT;
import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.ResponseEntity.ok;

@RestController
public class AnalysisController implements AnalysisApi {

    private final DokumentenstapelService dokumentenstapelService;
    private final Mapper<DokumentenstapelEntity, Dokumentenstapel> dokumentenstapelEntityMapper;

    public AnalysisController(DokumentenstapelService dokumentenstapelService, Mapper<DokumentenstapelEntity, Dokumentenstapel> dokumentenstapelEntityMapper){
        this.dokumentenstapelService = dokumentenstapelService;
        this.dokumentenstapelEntityMapper = dokumentenstapelEntityMapper;
    }

    @Override
    public Optional<NativeWebRequest> getRequest() {
        return AnalysisApi.super.getRequest();
    }

    @Override
    public ResponseEntity<Dokumentenstapel> triggerLlmAnalysis(UUID stapelId) {
        DokumentenstapelEntity stapel = dokumentenstapelService.findOneDokumentenstapel(stapelId)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Dokumentenstapel not found"));

        if (stapel.getCompleteJsonExtract().isBlank()) {
            throw new ResponseStatusException(CONFLICT, "JSON extract is not available for this Dokumentenstapel");
        }

        return ResponseEntity.ok(dokumentenstapelEntityMapper.mapTo(stapel));
    }

}
