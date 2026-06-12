package de.drv.thelionking.workflow.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;


@Service
public class Step2ProcessingService {

    private static final Logger log = LoggerFactory.getLogger(Step2ProcessingService.class);

    @Async
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void processStep2Async(String jsonExtract) {
        processStep2(jsonExtract);
    }

    private void processStep2(String jsonExtract){
        log.info("The content of the JsonExtract looks like this: {}", jsonExtract);
    }
}
