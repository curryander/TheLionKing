package de.drv.thelionking.api;

import de.drv.thelionking.model.ResultResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.context.request.NativeWebRequest;

import java.util.Optional;

/**
 * Application-owned Result API delegate. Shadows the generated file to
 * provide a stable contract for controllers and implementations.
 */
public interface ResultApiDelegate {

    default Optional<NativeWebRequest> getRequest() {
        return Optional.empty();
    }

    /**
     * Handle GET /result/{id}.
     */
    default ResponseEntity<ResultResponse> getResult(String id) {
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);
    }
}

