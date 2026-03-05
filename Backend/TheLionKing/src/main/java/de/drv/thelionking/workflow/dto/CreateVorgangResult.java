package de.drv.thelionking.workflow.dto;

import java.util.UUID;

public class CreateVorgangResult {
    private final UUID vorgangId;
    private final UUID stapelId;

    public CreateVorgangResult(UUID vorgangId, UUID stapelId) {
        this.vorgangId = vorgangId;
        this.stapelId = stapelId;
    }

    public UUID getVorgangId() {
        return vorgangId;
    }

    public UUID getStapelId() {
        return stapelId;
    }
}
