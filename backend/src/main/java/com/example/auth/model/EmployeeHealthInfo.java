package com.example.auth.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@Entity
@Table(name = "employee_health_info")
public class EmployeeHealthInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "health_info_id")
    private UUID healthInfoId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @Size(max = 20)
    @Column(name = "nhs_number")
    private String nhsNumber;

    @Size(max = 100)
    @Column(name = "gp_name")
    private String gpName;

    @Column(name = "gp_address", columnDefinition = "TEXT")
    private String gpAddress;

    @Enumerated(EnumType.STRING)
    @Column(name = "blood_group")
    private BloodGroup bloodGroup;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "allergies")
    private Map<String, Object> allergies;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "medications")
    private Map<String, Object> medications;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "medical_conditions")
    private Map<String, Object> medicalConditions;

    @Column(name = "health_notes", columnDefinition = "TEXT")
    private String healthNotes;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public EmployeeHealthInfo() {
    }

    public EmployeeHealthInfo(Employee employee) {
        this.employee = employee;
    }

    // Getters and Setters
    public UUID getHealthInfoId() {
        return healthInfoId;
    }

    public void setHealthInfoId(UUID healthInfoId) {
        this.healthInfoId = healthInfoId;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public String getNhsNumber() {
        return nhsNumber;
    }

    public void setNhsNumber(String nhsNumber) {
        this.nhsNumber = nhsNumber;
    }

    public String getGpName() {
        return gpName;
    }

    public void setGpName(String gpName) {
        this.gpName = gpName;
    }

    public String getGpAddress() {
        return gpAddress;
    }

    public void setGpAddress(String gpAddress) {
        this.gpAddress = gpAddress;
    }

    public BloodGroup getBloodGroup() {
        return bloodGroup;
    }

    public void setBloodGroup(BloodGroup bloodGroup) {
        this.bloodGroup = bloodGroup;
    }

    public Map<String, Object> getAllergies() {
        return allergies;
    }

    public void setAllergies(Map<String, Object> allergies) {
        this.allergies = allergies;
    }

    public Map<String, Object> getMedications() {
        return medications;
    }

    public void setMedications(Map<String, Object> medications) {
        this.medications = medications;
    }

    public Map<String, Object> getMedicalConditions() {
        return medicalConditions;
    }

    public void setMedicalConditions(Map<String, Object> medicalConditions) {
        this.medicalConditions = medicalConditions;
    }

    public String getHealthNotes() {
        return healthNotes;
    }

    public void setHealthNotes(String healthNotes) {
        this.healthNotes = healthNotes;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}