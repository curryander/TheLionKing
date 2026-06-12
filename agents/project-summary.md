# TheLionKing Project Summary

## Repository Overview

TheLionKing is a document-processing prototype for German administrative PDF bundles. The active application is a Java 21 Spring Boot backend in `Backend/TheLionKing`. Around it, the repository also contains sample and generated assets under `assets`, an older standalone HTML demo under `Frontend-Backup`, and repository notes/resources under `resources`.

The implemented backend workflow accepts a PDF plus `vsnr`, creates a `Vorgang` and `Dokumentenstapel`, stores the original file, splits the PDF into single-page PDFs, sends each page to an extraction provider, stores page markdown/JSON, and exposes status and result endpoints for a frontend.

## Top-Level Layout

- `Backend/TheLionKing`: active Maven/Spring Boot application.
- `agents`: root-level agent documentation; this file is the project summary.
- `assets`: sample PDFs, generated Docling outputs, markdown/html exports, ER diagram, and a packaged DRV design system artifact.
- `Frontend-Backup`: standalone HTML/JavaScript demo UI for a preview/result flow.
- `resources`: older agent guidelines, a notebook, and temporary OpenAPI/resource files.

## Active Backend

The backend is API-first. `Backend/TheLionKing/src/main/resources/OpenAPI.yaml` defines the REST contract, and the Maven OpenAPI generator creates interfaces/models under `de.drv.thelionking.api` and `de.drv.thelionking.model` during build. Handwritten controllers implement those generated interfaces.

Main technologies:

- Java 21
- Spring Boot 3.5.6
- Spring Web MVC
- Spring Data JPA / Hibernate
- PostgreSQL at runtime
- H2 for tests
- Maven wrapper (`mvnw`, `mvnw.cmd`)
- OpenAPI Generator Maven plugin
- PDFBox for PDF splitting/merging
- ModelMapper plus custom mapper implementations
- Conditional extraction clients for Azure Document Intelligence, Docling, or a stub provider

## Backend Runtime Flow

1. `POST /vorgaenge` receives a multipart PDF, `vsnr`, optional `stapelName`, and optional `startProcessing`.
2. `VorgangWorkflowService` validates the upload as a PDF, creates or reuses a `Versicherter`, creates a `Vorgang`, creates a `Dokumentenstapel`, saves the original PDF in the database and filesystem storage, and optionally schedules Step 1 after transaction commit.
3. `Step1ProcessingService` runs asynchronously, sets workflow status, splits the PDF with `PdfService`, persists one `PageEntity` per page, and writes page PDFs under `app.storage.root`.
4. For each page, the active `ExtractionClient` extracts markdown and provider JSON.
5. Extraction results are stored in `SeitenExtrakt`, mirrored into `PageEntity.extractedText`, and aggregated into `DokumentenstapelEntity.completeJsonExtract`.
6. Status/result endpoints expose `Vorgang` progress, stack progress, page metadata, page PDFs, markdown, and provider JSON.
7. `Step2ProcessingService` currently only logs the JSON extract. Treat Step 2 and the LLM/document aggregation path as unfinished extension points.

## REST Surface

Important endpoints from `OpenAPI.yaml`:

- `POST /vorgaenge`: create a `Vorgang` and upload one PDF stack; returns `201` if processing is not started and `202` if Step 1 starts.
- `GET /vorgaenge/{vorgangId}`: workflow status and aggregate page counts.
- `GET /vorgaenge/{vorgangId}/results`: stack/page results suitable for frontend display.
- `GET /dokumentenstapel`: list document stacks without binary content.
- `GET /dokumentenstapel/{stapelId}/pages`: list pages for a stack.
- `GET /dokumentenstapel/{stapelId}/upload`: fetch stack details including mapped upload content.
- `POST /dokumentenstapel/{stapelId}/split-and-extract`: manually trigger Step 1 when status allows it.
- `GET /pages/{pageId}/extract`: return page text, markdown, and parsed provider JSON.
- `GET /pages/{pageId}/pdf`: return the single-page PDF.
- `GET /analysis/dokumentenstapel/{stapelId}`: currently returns the mapped stack if `completeJsonExtract` exists.

## Important Java Packages

- `de.drv.thelionking.controller`: REST controllers implementing generated OpenAPI interfaces.
- `de.drv.thelionking.workflow.service`: upload workflow, status calculation, storage, async Step 1, placeholder Step 2.
- `de.drv.thelionking.workflow.client`: extraction abstraction plus Azure, Docling REST, and stub implementations.
- `de.drv.thelionking.service`: PDF utilities and document stack service logic.
- `de.drv.thelionking.data.entities`: JPA entities and repositories.
- `de.drv.thelionking.data.mapper`: custom mapper interface and mapper implementations for API models.
- `de.drv.thelionking.config`: CORS, mapper config, Azure properties, logging filter, and database health support.

## Data Model

Implemented entities:

- `Versicherter`: insured person keyed by unique `vsnr`, with optional name and birth date fields.
- `Vorgang`: workflow case linked to a `Versicherter`; tracks status, progress, timestamps, summary, and errors.
- `DokumentenstapelEntity`: uploaded document bundle linked to a `Vorgang`; stores upload metadata, original PDF bytes, filesystem storage ref, page count, status, and complete JSON extract.
- `PageEntity`: one split page PDF linked to a stack; stores page number, PDF bytes/path, status, error, extracted text, and usability flag.
- `SeitenExtrakt`: one-to-one extraction record for a page with markdown, provider JSON, OCR engine, and extraction timestamp.
- `Document`: intended later-stage merged document entity with category, extracted person/application fields, summary, additional JSON fields, and PDF bytes.

Status enums:

- `VorgangStatus`: `NEW`, `PROCESSING_STEP1`, `STEP1_DONE`, `FAILED`
- `DokumentenstapelStatus`: `UPLOADED`, `SPLITTING`, `SPLIT_DONE`, `EXTRACTING`, `EXTRACT_DONE`, `FAILED`, `PARTIAL_FAILED`
- `SeiteStatus`: `CREATED`, `EXTRACT_DONE`, `FAILED`

`assets/ER-Diagramm.mmd` describes a broader target model with document-page joins and RAG chunks. Some of that diagram is aspirational and not fully implemented in code.

## Extraction Providers

The active provider is selected with `extraction.client=${EXTRACTION_CLIENT:azure}`.

- `azure`: default. `AzureDocumentIntelligenceWorkflowClient` uses `AzureDocumentIntelligenceClient` to call Azure Document Intelligence, poll the operation result, and use `analyzeResult.content` as markdown/text.
- `docling`: `RestExtractionClient` posts page PDFs to Docling Serve at `/v1/convert/file`, requests markdown/json/text output, and strips image-only markdown.
- `stub`: `StubExtractionClient` returns deterministic fake markdown/JSON for local testing without an external extraction service.

## Configuration

Runtime configuration is in `Backend/TheLionKing/src/main/resources/application.properties`.

Key settings:

- `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD`
- `app.storage.root=./storage`
- multipart upload limits set to `50MB`
- `EXTRACTION_CLIENT` provider selection
- `docling.*` settings for Docling Serve
- `azure.document-intelligence.*` settings for Azure endpoint, API key, API version, model ID, polling, and timeout
- `spring.ai.openai.*` and `prompts.*` settings reserved for later LLM grouping/extraction/aggregation work

Do not commit real secrets. The checked-in Azure endpoint is a default URL; the API key is expected from environment variables.

## Local Infrastructure

`Backend/TheLionKing/docker-compose.yml` starts:

- PostgreSQL on host port `5432`
- Docling Serve CPU on host port `5001`

`Backend/TheLionKing/docker-compose.docling.yml` starts only Docling Serve. The backend `Dockerfile` expects a built JAR in `target/*.jar` and runs it on Amazon Corretto 21 Alpine.

## Frontend Backup

`Frontend-Backup/index.html` is a standalone HTML/JavaScript demo. It uploads a PDF, polls preview/result endpoints, renders markdown previews, shows recognized PDFs, and downloads cleaned JSON.

Important caveat: this demo targets endpoints such as `/v1/start-preview`, `/v1/preview/{id}`, `/v1/continue/{id}`, and `/v1/result/{id}`. Those endpoints are not the same as the current Spring OpenAPI workflow endpoints, so treat the file as a backup/prototype rather than a current frontend.

## Assets And Resources

`assets` contains:

- input/sample PDFs and hackathon source documents
- temporary Docling preview/result JSON
- generated markdown and HTML exports
- a Mermaid ER diagram
- a packaged DRV design system library under `assets/designsystem/package`

`resources` contains older repository guidance (`AGENTS.md`), a notebook (`9PunktePlan.ipynb`), and temporary OpenAPI JSON. The older `resources/AGENTS.md` still describes a root Maven module named `TheLionKing`, but the actual active Maven project is currently nested at `Backend/TheLionKing`.

## Common Commands

Run backend commands from `Backend/TheLionKing`:

```powershell
.\mvnw.cmd -q -DskipTests compile
.\mvnw.cmd test
.\mvnw.cmd spring-boot:run
docker compose up -d
```

From the repository root, use:

```powershell
rg --files
```

to inspect the real tree. Do not rely on `Backend/TheLionKing/projektstruktur.txt` being current.

## Tests

The test tree currently contains a minimal Spring Boot context test and `src/test/resources/application.properties`. There is not much targeted test coverage for the workflow, extraction clients, controllers, or mapping behavior. Changes to upload validation, status transitions, result mapping, or provider JSON parsing should add focused tests.

## Notes For Future Agents

- Inspect `git status --short` before editing. The tree may include user work or generated artifacts.
- Prefer editing `OpenAPI.yaml` and handwritten controllers/services; do not edit generated OpenAPI sources under `target/generated-sources`.
- Preserve German domain vocabulary: `Vorgang`, `Versicherter`, `Dokumentenstapel`, `Seite`, `SeitenExtrakt`.
- Step 1 is the implemented workflow. Step 2, OpenAI analysis, document grouping, and aggregation prompts are present but incomplete.
- `Document` exists as a persistence/model concept, but the current Step 1 result endpoints are page-oriented.
- `PageEntity.usable` and prompt settings hint at future page filtering, but the current Step 1 extraction flow does not actively classify page usability.
- `Frontend-Backup` is not wired to the current backend API contract.
