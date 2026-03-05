package de.drv.thelionking.workflow.dto;

import java.util.UUID;

public class StapelProgressDto {
    private UUID stapelId;
    private String status;
    private long pagesTotal;
    private long pagesDone;
    private long pagesFailed;

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

    public long getPagesTotal() {
        return pagesTotal;
    }

    public void setPagesTotal(long pagesTotal) {
        this.pagesTotal = pagesTotal;
    }

    public long getPagesDone() {
        return pagesDone;
    }

    public void setPagesDone(long pagesDone) {
        this.pagesDone = pagesDone;
    }

    public long getPagesFailed() {
        return pagesFailed;
    }

    public void setPagesFailed(long pagesFailed) {
        this.pagesFailed = pagesFailed;
    }
}

