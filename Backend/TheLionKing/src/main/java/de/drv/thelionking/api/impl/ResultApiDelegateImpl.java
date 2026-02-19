package de.drv.thelionking.api.impl;

import de.drv.thelionking.api.ResultApiDelegate;
import de.drv.thelionking.data.vorgang.Vorgang;
import de.drv.thelionking.data.vorgang.VorgangRepository;
import de.drv.thelionking.model.ResultResponse;
import de.drv.thelionking.model.ProcessProgress;
import de.drv.thelionking.model.ApiError;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
public class ResultApiDelegateImpl implements ResultApiDelegate {

    VorgangRepository vorgangRepository;

    @Autowired
    public ResultApiDelegateImpl(final VorgangRepository vorgangRepository) {
        this.vorgangRepository = vorgangRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<ResultResponse> getResult(String id) {
        log.info("GET /result/{}", id);
        if (id == null || id.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        ResultResponse resp = new ResultResponse();
        UUID uuid = UUID.fromString(id);
        Optional<Vorgang> vorgang = this.vorgangRepository.findById(uuid);
        if(vorgang.isEmpty()) {
            log.info("Vorgang {} not found", id);
            ApiError err = new ApiError();
            err.setCode(ApiError.CodeEnum.NOT_FOUND);
            err.setMessage("Vorgang not found");
            ResponseEntity raw = ResponseEntity.status(HttpStatus.NOT_FOUND).body(err);
            return (ResponseEntity<ResultResponse>) raw;
        }

        if(vorgang.get().getErrorCode() != null){
            ApiError err = new ApiError();
            boolean server = vorgang.get().getErrorCode().startsWith("SERVER_");
            // keep enum compatible until models are regenerated, HTTP status conveys server error
            err.setCode(ApiError.CodeEnum.BAD_REQUEST);
            err.setMessage(vorgang.get().getErrorMessage() != null ? vorgang.get().getErrorMessage() : vorgang.get().getErrorCode());
            ResponseEntity raw = ResponseEntity.status(server? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.BAD_REQUEST).body(err);
            return (ResponseEntity<ResultResponse>) raw;
        }

        if(vorgang.get().getProgress() < 100){
            log.info("Vorgang {} in progress: {}%", id, vorgang.get().getProgress());
            ProcessProgress pp = new ProcessProgress();
            pp.setProgress(vorgang.get().getProgress());
            ResponseEntity raw = ResponseEntity.status(HttpStatus.ACCEPTED)
                    .header("Retry-After","3")
                    .body(pp);
            return (ResponseEntity<ResultResponse>) raw;
        }

        resp = vorgang.get().toResultResponse();
        return ResponseEntity.ok(resp);

    }
}
