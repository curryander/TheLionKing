package de.drv.thelionking.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.nio.file.*;
import java.util.*;
import java.io.*;

@Service
@Slf4j
public class DoclingRunnerService {

    public Path convertToJson(Path venvPython, Path inputFile, Path outputDir)
            throws IOException, InterruptedException {

        if (venvPython == null || !Files.exists(venvPython)) {
            throw new RuntimeException("Python interpreter not found: " + venvPython);
        }

        Files.createDirectories(outputDir);

        Path doclingExe = venvPython.getParent().resolve("docling.exe");
        List<String> cmd = buildCommand(doclingExe, venvPython, inputFile, outputDir, true);
        CommandResult result = run(cmd);
        if (result.code != 0 && result.output.contains("input file convert does not exist")) {
            List<String> fallbackCmd = buildCommand(doclingExe, venvPython, inputFile, outputDir, false);
            result = run(fallbackCmd);
        }
        if (result.code != 0) {
            StringBuilder msg = new StringBuilder()
                    .append("Docling failed (").append(result.code).append("):\n").append(result.output);
            if (!Files.exists(doclingExe)) {
                msg.append("\nMissing CLI entrypoint: ").append(doclingExe);
            }
            if (result.output.contains("No module named") || result.output.contains("cannot be directly executed")) {
                msg.append("\nDocling module/CLI not available in this venv. ")
                   .append("Install it (e.g. `pip install docling`) or ensure the CLI is present.");
            }
            throw new RuntimeException(msg.toString());
        }

        // Docling typically writes a JSON file into outputDir. Use newest *.json.
        try (var stream = Files.list(outputDir)) {
            return stream
                    .filter(f -> f.getFileName().toString().toLowerCase().endsWith(".json"))
                    .max(Comparator.comparingLong(f -> f.toFile().lastModified()))
                    .orElseThrow(() -> new RuntimeException("No JSON output found in " + outputDir));
        }
    }

    private List<String> buildCommand(Path doclingExe, Path venvPython, Path inputFile, Path outputDir, boolean useConvert) {
        if (Files.exists(doclingExe)) {
            return useConvert
                    ? List.of(doclingExe.toString(), "convert", inputFile.toString(), "--to", "json", "--output", outputDir.toString())
                    : List.of(doclingExe.toString(), inputFile.toString(), "--to", "json", "--output", outputDir.toString());
        }
        // Fallback to module invocation if the CLI entrypoint is missing.
        return useConvert
                ? List.of(venvPython.toString(), "-m", "docling.cli", "convert", inputFile.toString(), "--to", "json", "--output", outputDir.toString())
                : List.of(venvPython.toString(), "-m", "docling.cli", inputFile.toString(), "--to", "json", "--output", outputDir.toString());
    }

    private CommandResult run(List<String> cmd) throws IOException, InterruptedException {
        log.info("Docling command: {}", String.join(" ", cmd));
        ProcessBuilder pb = new ProcessBuilder(cmd);
        pb.redirectErrorStream(true);

        Process p = pb.start();
        String output;
        try (BufferedReader br = new BufferedReader(new InputStreamReader(p.getInputStream()))) {
            output = br.lines().reduce("", (a, b) -> a + b + System.lineSeparator());
        }
        int code = p.waitFor();
        return new CommandResult(code, output);
    }

    private record CommandResult(int code, String output) {}
}
