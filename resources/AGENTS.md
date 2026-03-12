# Repository Guidelines

## Project Structure & Module Organization
- Root module: `TheLionKing/` (Maven + Spring Boot 3).
- Source code: `TheLionKing/src/main/java/` (`de.drv.thelionking.*`, custom impl in `impl/`).
- Tests: `TheLionKing/src/test/java/` (e.g., `*Tests.java`).
- Resources: `TheLionKing/src/main/resources/` and `src/test/resources/`.
- OpenAPI generation (do not edit generated sources): `TheLionKing/target/generated-sources/`.

## Build, Test, and Development Commands
From `TheLionKing/`:
- Unix: `mvn spring-boot:run`  | Windows: `mvn spring-boot:run` - Run app locally.
- Unix: `mvn clean package`   | Windows: `mvn clean package` - Build WAR and run tests.
- Unix: `mvn test`            | Windows: `mvn test` - Run tests.
- Generate OpenAPI stubs (when `OpenAPI/OpenAPI.yaml` changes):
  - Unix: `mvn org.openapitools:openapi-generator-maven-plugin:generate`
  - Windows: `mvn org.openapitools:openapi-generator-maven-plugin:generate`

## Coding Style & Naming Conventions
- Language: Java (target `java.version` in POM). Use 4-space indentation.
- Packages: `de.drv.thelionking...`; classes `PascalCase`; methods/fields `camelCase`.
- Spring Boot conventions: constructor injection preferred; keep controllers thin, services cohesive.
- Lombok is enabled; use annotations consistently. Avoid committing generated code.

## Testing Guidelines
- Framework: JUnit 5 via `spring-boot-starter-test`.
- Naming: `SomethingTests.java` in `src/test/java` mirrors package of code under test.
- Scope: prefer focused unit tests; use `@SpringBootTest` only when integration is required.
- Run locally with `mvn test`; add tests for new logic and bug fixes.

## Commit & Pull Request Guidelines
- Commits: short imperative subject, optional body. Example: `feat(api): add result endpoint`.
- Include scope when helpful (e.g., `impl`, `api`, `config`). Reference issues like `#123`.
- PRs: clear description, rationale, and testing notes; link issues; include screenshots for API docs/UI if applicable.
- Keep PRs small and focused. Ensure build and tests pass.

## Security & Configuration Tips
- Configuration: `application.properties` in `src/main/resources`. Do not commit secrets.
- Prefer env variables (e.g., `SPRING_PROFILES_ACTIVE`) for local overrides.
- H2 is included for dev/testing; use proper profiles for external DBs.

## Agent-Specific Instructions
- Do not modify generated OpenAPI sources; implement behavior in `impl/` and application classes.
- If updating endpoints, regenerate stubs and keep custom code separate from generated packages.


