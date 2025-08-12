package com.example.auth.service;

import com.example.auth.dto.CreateEmployeeProfileRequest;
import com.example.auth.dto.EmployeeProfileResponse;
import com.example.auth.dto.ManageEmploymentStatusRequest;
import com.example.auth.dto.UpdatePersonalInformationRequest;
import com.example.auth.model.EmploymentStatus;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

/**
 * Service interface for Employee Profile Management operations
 */
public interface EmployeeProfileService {
    
    /**
     * Creates a new employee profile
     * @param userData The employee profile data
     * @param createdBy The UUID of the user creating the profile
     * @return The created employee profile
     */
    EmployeeProfileResponse createEmployeeProfile(CreateEmployeeProfileRequest userData, UUID createdBy);
    
    /**
     * Updates personal information for an employee
     * @param employeeId The employee ID
     * @param profileData The updated profile data
     * @return The updated employee profile
     */
    EmployeeProfileResponse updatePersonalInformation(UUID employeeId, UpdatePersonalInformationRequest profileData);
    
    /**
     * Validates if an employee number is unique and valid
     * @param employeeNumber The employee number to validate
     * @return true if valid and unique, false otherwise
     */
    boolean validateEmployeeNumber(String employeeNumber);
    
    /**
     * Manages employment status of an employee
     * @param employeeId The employee ID
     * @param statusRequest The status change request with reason
     * @return The updated employee profile
     */
    EmployeeProfileResponse manageEmploymentStatus(UUID employeeId, ManageEmploymentStatusRequest statusRequest);
    
    /**
     * Calculates service years from start date to current date
     * @param startDate The employment start date
     * @return Number of service years
     */
    int calculateServiceYears(LocalDate startDate);
    
    /**
     * Validates contact information (phone and email)
     * @param phoneNumber The phone number to validate (can be null)
     * @param email The email to validate (can be null)
     * @return true if all provided contact info is valid
     */
    boolean validateContactInformation(String phoneNumber, String email);
    
    /**
     * Retrieves employee profile by ID
     * @param employeeId The employee ID
     * @return The employee profile
     */
    EmployeeProfileResponse getEmployeeProfile(UUID employeeId);
    
    /**
     * Retrieves employee profile by employee number
     * @param employeeNumber The employee number
     * @return The employee profile
     */
    EmployeeProfileResponse getEmployeeProfileByNumber(String employeeNumber);
    
    /**
     * Retrieves all employees with specific status
     * @param status The employment status to filter by
     * @return List of employee profiles
     */
    List<EmployeeProfileResponse> getEmployeesByStatus(EmploymentStatus status);
    
    /**
     * Searches employees by various criteria
     * @param searchTerm The search term
     * @return List of matching employee profiles
     */
    List<EmployeeProfileResponse> searchEmployees(String searchTerm);
}