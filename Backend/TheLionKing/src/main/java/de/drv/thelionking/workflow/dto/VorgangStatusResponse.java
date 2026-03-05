package de.drv.thelionking.workflow.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class VorgangStatusResponse {
    private UUID vorgangId;
    private String status;
    private long pagesTotal;
    private long pagesDone;
    private long pagesFailed;
    private List<StapelProgressDto> stapel = new ArrayList<>();

    public UUID getVorgangId() {
        return vorgangId;
    }

    public void setVorgangId(UUID vorgangId) {
        this.vorgangId = vorgangId;
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

    public List<StapelProgressDto> getStapel() {
        return stapel;
    }

    public void setStapel(List<StapelProgressDto> stapel) {
        this.stapel = stapel;
    }
}
