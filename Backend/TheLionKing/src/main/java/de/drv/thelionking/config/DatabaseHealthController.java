package de.drv.thelionking.config;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.SQLException;
import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;
import javax.sql.DataSource;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/internal/health")
public class DatabaseHealthController {

    private final ObjectProvider<DataSource> dataSourceProvider;

    public DatabaseHealthController(ObjectProvider<DataSource> dataSourceProvider) {
        this.dataSourceProvider = dataSourceProvider;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", Instant.now().toString());

        DataSource dataSource = dataSourceProvider.getIfAvailable();
        if (dataSource == null) {
            body.put("status", "DOWN");
            body.put("database", "unconfigured");
            body.put("message", "No DataSource bean available.");
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(body);
        }

        try (Connection connection = dataSource.getConnection()) {
            DatabaseMetaData metaData = connection.getMetaData();
            body.put("status", "UP");
            body.put("database", "reachable");
            body.put("product", metaData.getDatabaseProductName());
            body.put("url", metaData.getURL());
            return ResponseEntity.ok(body);
        } catch (SQLException ex) {
            body.put("status", "DOWN");
            body.put("database", "unreachable");
            body.put("message", ex.getMessage());
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(body);
        }
    }
}
