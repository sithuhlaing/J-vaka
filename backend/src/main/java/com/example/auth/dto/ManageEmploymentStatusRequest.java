package com.example.auth.dto;

import com.example.auth.model.EmploymentStatus;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ManageEmploymentStatusRequest {
    @NotNull
    private EmploymentStatus status;

    @Size(max = 500)
    private String reason;

    public ManageEmploymentStatusRequest() {
    }

    public ManageEmploymentStatusRequest(EmploymentStatus status, String reason) {
        this.status = status;
        this.reason = reason;
    }

    public EmploymentStatus getStatus() {
        return status;
    }

    public void setStatus(EmploymentStatus status) {
        this.status = status;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}