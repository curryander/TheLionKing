package de.drv.thelionking.workflow.dto;

import java.util.UUID;

public class CreateVorgangResponse {
    private UUID vorgangId;
    private UUID stapelId;
    private String status;
    private String processingStatus;

    public UUID getVorgangId() {
        return vorgangId;
    }

    public void setVorgangId(UUID vorgangId) {
        this.vorgangId = vorgangId;
    }

    public UUID getStapelId() {
        return stapelId;
    }

    public void setStapelId(UUID stapelId) {
        this.stapelId = stapelId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getProcessingStatus() {
        return processingStatus;
    }

    public void setProcessingStatus(String processingStatus) {
        this.processingStatus = processingStatus;
    }
}
