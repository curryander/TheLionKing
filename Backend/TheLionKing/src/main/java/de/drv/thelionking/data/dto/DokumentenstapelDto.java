package de.drv.thelionking.data.dto;

import de.drv.thelionking.data.entities.document.Document;
import de.drv.thelionking.data.entities.page.PageEntity;
import de.drv.thelionking.data.entities.vorgang.Vorgang;
import lombok.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class DokumentenstapelDto {

    UUID id;

    Vorgang vorgang;

    String stapelName;

    String uploadFilename;

    String originalFilename;

    String pdfStorageRef;

    Integer seitenAnzahl;

    String status;

    Instant createdAt;

    byte[] uploadPdf;

    List<PageEntity> pageEntities = new ArrayList<>();

    List<Document> documents = new ArrayList<>();
}
