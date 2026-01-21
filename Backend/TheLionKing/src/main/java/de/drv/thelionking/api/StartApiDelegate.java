package de.drv.thelionking.api;

import de.drv.thelionking.model.StartResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.context.request.NativeWebRequest;

import java.util.Optional;

/**
 * Application-owned Start API delegate. This file intentionally shadows the
 * generated version and provides a stable method signature used by StartApi.
 */
public interface StartApiDelegate {

    default Optional<NativeWebRequest> getRequest() {
        return Optional.empty();
    }

    /**
     * Handle POST /start with a PDF resource body.
     */
    default ResponseEntity<StartResponse> startProcess(org.springframework.core.io.Resource body) {
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);
    }
}

