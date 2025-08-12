package com.example.auth.repository;

import com.example.auth.model.OHProfessional;
import com.example.auth.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface OHProfessionalRepository extends JpaRepository<OHProfessional, UUID> {
    Optional<OHProfessional> findByUser(User user);
    Optional<OHProfessional> findByRegistrationNumber(String registrationNumber);
    
    List<OHProfessional> findByIsAvailable(Boolean isAvailable);
    List<OHProfessional> findBySpecialization(String specialization);
    List<OHProfessional> findBySpecializationAndIsAvailable(String specialization, Boolean isAvailable);
    
    Boolean existsByRegistrationNumber(String registrationNumber);
    
    @Query("SELECT p FROM OHProfessional p WHERE p.isAvailable = true")
    List<OHProfessional> findAvailableProfessionals();
}