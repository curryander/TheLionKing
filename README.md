# TheLionKing

TheLionKing is a Spring Boot prototype for processing German administrative PDF document bundles. It accepts a PDF upload, creates a workflow case (`Vorgang`), splits the document into pages, extracts page content with Azure Document Intelligence, Docling, or a local stub, and exposes status and result endpoints for a frontend.

The active application lives in `Backend/TheLionKing`. The repository also includes sample documents, generated extraction artifacts, an ER diagram, and an older standalone frontend demo.

## What It Does

- Creates a `Vorgang` for an insured person identified by `vsnr`.
- Stores an uploaded PDF as a `Dokumentenstapel`.
- Splits the PDF into single-page PDFs with PDFBox.
- Extracts markdown/text and provider JSON per page.
- Persists page status, extraction output, errors, and aggregate JSON.
- Exposes workflow status, stack data, page PDFs, and extraction results through an OpenAPI-defined REST API.

Step 1, PDF split and page extraction, is implemented. Step 2, document grouping and LLM-based analysis, is currently an extension point.

## Repository Layout

```text
.
+-- Backend/TheLionKing       # Active Java 21 Spring Boot backend
+-- Frontend-Backup           # Older standalone HTML/JS demo
+-- agents                    # Project summary and agent-facing notes
+-- assets                    # Sample PDFs, Docling outputs, ER diagram, design system package
`-- resources                 # Older guidance, notebook, temporary resources
```

## Tech Stack

- Java 21
- Spring Boot 3.5
- Spring Web MVC
- Spring Data JPA / Hibernate
- PostgreSQL
- H2 for tests
- Maven Wrapper
- OpenAPI Generator
- Apache PDFBox
- Azure Document Intelligence or Docling Serve for extraction

## Backend Workflow

1. A client uploads a PDF to `POST /vorgaenge` with a `vsnr`.
2. The backend creates or reuses a `Versicherter`, creates a `Vorgang`, and stores the PDF as a `Dokumentenstapel`.
3. If processing is enabled, Step 1 starts asynchronously after the database transaction commits.
4. Step 1 splits the PDF into pages and writes page PDFs to local storage.
5. Each page is sent to the configured extraction provider.
6. Results are stored as `SeitenExtrakt` records and exposed through the API.

## Prerequisites

- JDK 21
- Docker Desktop or another Docker runtime, for PostgreSQL and optional Docling
- PowerShell on Windows, or a shell capable of running the Maven wrapper

## Quick Start

Start local infrastructure:

```powershell
cd Backend\TheLionKing
docker compose up -d
```

Run the backend with the stub extraction provider:

```powershell
$env:SPRING_DATASOURCE_URL="jdbc:postgresql://localhost:5432/postgres"
$env:SPRING_DATASOURCE_USERNAME="postgres"
$env:SPRING_DATASOURCE_PASSWORD="changemeinprod!"
$env:EXTRACTION_CLIENT="stub"
.\mvnw.cmd spring-boot:run
```

Using `EXTRACTION_CLIENT=stub` is the easiest local path because it does not require Azure credentials or Docling OCR setup.

## Extraction Providers

Set the provider with `EXTRACTION_CLIENT`.

| Value | Provider | Notes |
| --- | --- | --- |
| `azure` | Azure Document Intelligence | Default. Requires `AZURE_DOCUMENT_INTELLIGENCE_API_KEY` and usually endpoint/model configuration. |
| `docling` | Docling Serve REST API | Uses the Docling container on `http://localhost:5001` by default. |
| `stub` | Local fake extractor | Useful for development and smoke testing. |

For Azure:

```powershell
$env:EXTRACTION_CLIENT="azure"
$env:AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT="https://your-resource.cognitiveservices.azure.com/"
$env:AZURE_DOCUMENT_INTELLIGENCE_API_KEY="..."
```

For Docling:

```powershell
$env:EXTRACTION_CLIENT="docling"
$env:DOCLING_BASE_URL="http://localhost:5001"
```

## Useful Commands

Run from `Backend/TheLionKing`:

```powershell
.\mvnw.cmd -q -DskipTests compile
.\mvnw.cmd test
.\mvnw.cmd spring-boot:run
docker compose up -d
docker compose down
```

The OpenAPI contract is here:

```text
Backend/TheLionKing/src/main/resources/OpenAPI.yaml
```

Generated OpenAPI sources are created under `target/generated-sources/openapi` during Maven builds. Do not edit generated files directly.

## API Examples

Create a workflow and start processing:

```powershell
curl.exe -X POST "http://localhost:8080/vorgaenge?startProcessing=true" `
  -F "vsnr=1234567890" `
  -F "stapelName=Teststapel" `
  -F "file=@C:\path\to\document.pdf;type=application/pdf"
```

Check workflow status:

```powershell
curl.exe "http://localhost:8080/vorgaenge/{vorgangId}"
```

Fetch complete results for a workflow:

```powershell
curl.exe "http://localhost:8080/vorgaenge/{vorgangId}/results"
```

Fetch one page PDF:

```powershell
curl.exe "http://localhost:8080/pages/{pageId}/pdf" --output page.pdf
```

Fetch one page extraction:

```powershell
curl.exe "http://localhost:8080/pages/{pageId}/extract"
```

## Configuration

Main configuration file:

```text
Backend/TheLionKing/src/main/resources/application.properties
```

Important environment variables:

| Variable | Purpose |
| --- | --- |
| `SPRING_DATASOURCE_URL` | PostgreSQL JDBC URL |
| `SPRING_DATASOURCE_USERNAME` | Database username |
| `SPRING_DATASOURCE_PASSWORD` | Database password |
| `EXTRACTION_CLIENT` | `azure`, `docling`, or `stub` |
| `DOCLING_BASE_URL` | Docling Serve base URL |
| `AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT` | Azure Document Intelligence endpoint |
| `AZURE_DOCUMENT_INTELLIGENCE_API_KEY` | Azure Document Intelligence API key |
| `AZURE_DOCUMENT_INTELLIGENCE_MODEL_ID` | Azure model ID, defaults to `prebuilt-layout` |
| `OPENAI_API_KEY` | Reserved for future LLM analysis work |

Uploaded and split PDFs are written below:

```text
Backend/TheLionKing/storage
```

unless `app.storage.root` is changed.

## Data Model

Core persisted concepts:

- `Versicherter`: insured person, keyed by `vsnr`.
- `Vorgang`: workflow case and top-level processing status.
- `Dokumentenstapel`: uploaded PDF bundle for a workflow.
- `Seite`: one split PDF page.
- `SeitenExtrakt`: extracted markdown and provider JSON for one page.
- `Document`: planned/partial entity for later grouped documents and extracted application fields.

See `assets/ER-Diagramm.mmd` for the broader target model.

## Frontend Notes

`Frontend-Backup/index.html` is an older standalone demo. It targets preview/result endpoints such as `/v1/start-preview` and `/v1/result/{id}`, which are not the current backend API. Treat it as a prototype reference, not the active frontend.

Current CORS configuration allows:

- `http://localhost:4200`
- `http://127.0.0.1:4200`
- `https://www.drv-tlk.de`

## Project State

Implemented:

- PDF upload workflow
- asynchronous Step 1 processing
- PDF splitting
- provider-based page extraction
- persistence for workflow, stacks, pages, and extracts
- status and result endpoints

In progress or future work:

- Step 2 document grouping
- LLM-based field extraction and aggregation
- richer frontend integration
- broader automated test coverage

More implementation detail is available in `agents/project-summary.md`.
