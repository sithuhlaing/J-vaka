package com.example.auth.dto.request;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.UUID;

public class BookAppointmentRequest {

    @NotNull
    private UUID employeeId;

    @NotNull
    private UUID professionalId;

    @NotBlank
    private String appointmentType;

    @NotBlank
    private String appointmentMode;

    @NotNull
    @Future
    private LocalDateTime scheduledDateTime;

    @NotBlank
    private String reason;

    // Getters and Setters
    public UUID getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(UUID employeeId) {
        this.employeeId = employeeId;
    }

    public UUID getProfessionalId() {
        return professionalId;
    }

    public void setProfessionalId(UUID professionalId) {
        this.professionalId = professionalId;
    }

    public String getAppointmentType() {
        return appointmentType;
    }

    public void setAppointmentType(String appointmentType) {
        this.appointmentType = appointmentType;
    }

    public String getAppointmentMode() {
        return appointmentMode;
    }

    public void setAppointmentMode(String appointmentMode) {
        this.appointmentMode = appointmentMode;
    }

    public LocalDateTime getScheduledDateTime() {
        return scheduledDateTime;
    }

    public void setScheduledDateTime(LocalDateTime scheduledDateTime) {
        this.scheduledDateTime = scheduledDateTime;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
