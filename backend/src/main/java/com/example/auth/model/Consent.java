package com.example.auth.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "consent")
@Data
@NoArgsConstructor
public class Consent {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "consent_id")
    private UUID consentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @Column(name = "consent_type", nullable = false)
    private String consentType;

    @Column(name = "is_granted", nullable = false)
    private boolean isGranted;

    @Column(name = "consent_date", nullable = false)
    private LocalDateTime consentDate;

    @Column(name = "expires_at")
    private LocalDateTime expiresAt;

    public Consent(Employee employee, String consentType, boolean isGranted) {
        this.employee = employee;
        this.consentType = consentType;
        this.isGranted = isGranted;
        this.consentDate = LocalDateTime.now();
    }
}