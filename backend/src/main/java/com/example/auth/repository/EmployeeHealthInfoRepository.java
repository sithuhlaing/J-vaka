package com.example.auth.repository;

import com.example.auth.model.Employee;
import com.example.auth.model.EmployeeHealthInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface EmployeeHealthInfoRepository extends JpaRepository<EmployeeHealthInfo, UUID> {
    Optional<EmployeeHealthInfo> findByEmployee(Employee employee);
    Optional<EmployeeHealthInfo> findByNhsNumber(String nhsNumber);
    
    Boolean existsByEmployee(Employee employee);
    Boolean existsByNhsNumber(String nhsNumber);
}