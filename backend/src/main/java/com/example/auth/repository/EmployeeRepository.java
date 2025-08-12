package com.example.auth.repository;

import com.example.auth.model.Employee;
import com.example.auth.model.EmploymentStatus;
import com.example.auth.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, UUID> {
    Optional<Employee> findByEmployeeNumber(String employeeNumber);
    Optional<Employee> findByUser(User user);
    
    List<Employee> findByEmploymentStatus(EmploymentStatus employmentStatus);
    List<Employee> findByDepartment(String department);
    List<Employee> findByJobTitle(String jobTitle);
    
    Boolean existsByEmployeeNumber(String employeeNumber);
    
    @Query("SELECT e FROM Employee e WHERE e.department = :department AND e.employmentStatus = :status")
    List<Employee> findByDepartmentAndStatus(String department, EmploymentStatus status);
    
    @Query("SELECT e FROM Employee e WHERE LOWER(e.user.firstName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(e.user.lastName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(e.employeeNumber) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Employee> searchEmployees(String searchTerm);
}