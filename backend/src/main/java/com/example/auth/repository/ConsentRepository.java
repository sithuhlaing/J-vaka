package com.example.auth.repository;

import com.example.auth.model.Consent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ConsentRepository extends JpaRepository<Consent, UUID> {

    @Query("SELECT c FROM Consent c WHERE c.employee.employeeId = :employeeId ORDER BY c.consentDate DESC")
    Optional<Consent> findLatestConsentByEmployeeId(UUID employeeId);
}