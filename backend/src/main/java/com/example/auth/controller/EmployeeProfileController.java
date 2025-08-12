package com.example.auth.controller;

import com.example.auth.dto.*;
import com.example.auth.model.EmploymentStatus;
import com.example.auth.security.UserPrincipal;
import com.example.auth.service.EmployeeProfileService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/employee-profiles")
@CrossOrigin(origins = "*", maxAge = 3600)
public class EmployeeProfileController {

    private static final Logger logger = LoggerFactory.getLogger(EmployeeProfileController.class);

    @Autowired
    private EmployeeProfileService employeeProfileService;

    /**
     * Create a new employee profile
     */
    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    public ResponseEntity<?> createEmployeeProfile(
            @Valid @RequestBody CreateEmployeeProfileRequest request,
            Authentication authentication,
            HttpServletRequest httpRequest) {
        
        try {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            EmployeeProfileResponse response = employeeProfileService.createEmployeeProfile(
                request, userPrincipal.getUserId());
            
            logger.info("Employee profile created successfully for: {} by user: {}", 
                       response.getEmployeeNumber(), userPrincipal.getUsername());
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
            
        } catch (Exception e) {
            logger.error("Error creating employee profile: {}", e.getMessage());
            return ResponseEntity.badRequest()
                .body(new MessageResponse("Error creating employee profile: " + e.getMessage()));
        }
    }

    /**
     * Update personal information for an employee
     */
    @PutMapping("/{employeeId}/personal-information")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER') or @employeeProfileController.isOwnProfile(#employeeId, authentication)")
    public ResponseEntity<?> updatePersonalInformation(
            @PathVariable UUID employeeId,
            @Valid @RequestBody UpdatePersonalInformationRequest request,
            Authentication authentication) {
        
        try {
            EmployeeProfileResponse response = employeeProfileService.updatePersonalInformation(employeeId, request);
            
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            logger.info("Personal information updated for employee: {} by user: {}", 
                       employeeId, userPrincipal.getUsername());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            logger.error("Error updating personal information for employee {}: {}", employeeId, e.getMessage());
            return ResponseEntity.badRequest()
                .body(new MessageResponse("Error updating personal information: " + e.getMessage()));
        }
    }

    /**
     * Validate employee number uniqueness
     */
    @GetMapping("/validate-employee-number")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    public ResponseEntity<?> validateEmployeeNumber(@RequestParam String employeeNumber) {
        try {
            boolean isValid = employeeProfileService.validateEmployeeNumber(employeeNumber);
            return ResponseEntity.ok(Map.of(
                "employeeNumber", employeeNumber,
                "isValid", isValid,
                "isUnique", isValid
            ));
        } catch (Exception e) {
            logger.error("Error validating employee number {}: {}", employeeNumber, e.getMessage());
            return ResponseEntity.badRequest()
                .body(new MessageResponse("Error validating employee number: " + e.getMessage()));
        }
    }

    /**
     * Manage employment status
     */
    @PutMapping("/{employeeId}/employment-status")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    public ResponseEntity<?> manageEmploymentStatus(
            @PathVariable UUID employeeId,
            @Valid @RequestBody ManageEmploymentStatusRequest request,
            Authentication authentication) {
        
        try {
            EmployeeProfileResponse response = employeeProfileService.manageEmploymentStatus(employeeId, request);
            
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            logger.info("Employment status updated for employee: {} to {} by user: {}", 
                       employeeId, request.getStatus(), userPrincipal.getUsername());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            logger.error("Error updating employment status for employee {}: {}", employeeId, e.getMessage());
            return ResponseEntity.badRequest()
                .body(new MessageResponse("Error updating employment status: " + e.getMessage()));
        }
    }

    /**
     * Calculate service years from start date
     */
    @GET("/service-years")
    public ResponseEntity<?> calculateServiceYears(@RequestParam LocalDate startDate) {
        try {
            int serviceYears = employeeProfileService.calculateServiceYears(startDate);
            return ResponseEntity.ok(Map.of(
                "startDate", startDate,
                "serviceYears", serviceYears
            ));
        } catch (Exception e) {
            logger.error("Error calculating service years for start date {}: {}", startDate, e.getMessage());
            return ResponseEntity.badRequest()
                .body(new MessageResponse("Error calculating service years: " + e.getMessage()));
        }
    }

    /**
     * Validate contact information
     */
    @POST("/validate-contact")
    public ResponseEntity<?> validateContactInformation(@RequestBody Map<String, String> contactInfo) {
        try {
            String phoneNumber = contactInfo.get("phoneNumber");
            String email = contactInfo.get("email");
            
            boolean isValid = employeeProfileService.validateContactInformation(phoneNumber, email);
            
            return ResponseEntity.ok(Map.of(
                "phoneNumber", phoneNumber != null ? phoneNumber : "",
                "email", email != null ? email : "",
                "isValid", isValid
            ));
        } catch (Exception e) {
            logger.error("Error validating contact information: {}", e.getMessage());
            return ResponseEntity.badRequest()
                .body(new MessageResponse("Error validating contact information: " + e.getMessage()));
        }
    }

    /**
     * Get employee profile by ID
     */
    @GetMapping("/{employeeId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER') or hasRole('OH_PROFESSIONAL') or @employeeProfileController.isOwnProfile(#employeeId, authentication)")
    public ResponseEntity<?> getEmployeeProfile(@PathVariable UUID employeeId) {
        try {
            EmployeeProfileResponse response = employeeProfileService.getEmployeeProfile(employeeId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error retrieving employee profile {}: {}", employeeId, e.getMessage());
            return ResponseEntity.badRequest()
                .body(new MessageResponse("Error retrieving employee profile: " + e.getMessage()));
        }
    }

    /**
     * Get employee profile by employee number
     */
    @GetMapping("/by-number/{employeeNumber}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER') or hasRole('OH_PROFESSIONAL')")
    public ResponseEntity<?> getEmployeeProfileByNumber(@PathVariable String employeeNumber) {
        try {
            EmployeeProfileResponse response = employeeProfileService.getEmployeeProfileByNumber(employeeNumber);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error retrieving employee profile by number {}: {}", employeeNumber, e.getMessage());
            return ResponseEntity.badRequest()
                .body(new MessageResponse("Error retrieving employee profile: " + e.getMessage()));
        }
    }

    /**
     * Get employees by employment status
     */
    @GetMapping("/by-status/{status}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    public ResponseEntity<?> getEmployeesByStatus(@PathVariable EmploymentStatus status) {
        try {
            List<EmployeeProfileResponse> responses = employeeProfileService.getEmployeesByStatus(status);
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            logger.error("Error retrieving employees by status {}: {}", status, e.getMessage());
            return ResponseEntity.badRequest()
                .body(new MessageResponse("Error retrieving employees: " + e.getMessage()));
        }
    }

    /**
     * Search employees
     */
    @GetMapping("/search")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER') or hasRole('OH_PROFESSIONAL')")
    public ResponseEntity<?> searchEmployees(@RequestParam String searchTerm) {
        try {
            List<EmployeeProfileResponse> responses = employeeProfileService.searchEmployees(searchTerm);
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            logger.error("Error searching employees with term {}: {}", searchTerm, e.getMessage());
            return ResponseEntity.badRequest()
                .body(new MessageResponse("Error searching employees: " + e.getMessage()));
        }
    }

    /**
     * Get current user's employee profile
     */
    @GetMapping("/my-profile")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<?> getMyProfile(Authentication authentication) {
        try {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            // This would require a method to find employee by user ID
            // For now, returning a message that this needs to be implemented
            return ResponseEntity.ok(new MessageResponse("Feature to be implemented: Get employee by user ID"));
        } catch (Exception e) {
            logger.error("Error retrieving current user's profile: {}", e.getMessage());
            return ResponseEntity.badRequest()
                .body(new MessageResponse("Error retrieving profile: " + e.getMessage()));
        }
    }

    /**
     * Helper method to check if the authenticated user is accessing their own profile
     */
    public boolean isOwnProfile(UUID employeeId, Authentication authentication) {
        try {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            EmployeeProfileResponse profile = employeeProfileService.getEmployeeProfile(employeeId);
            return profile.getUserId().equals(userPrincipal.getUserId());
        } catch (Exception e) {
            logger.error("Error checking profile ownership: {}", e.getMessage());
            return false;
        }
    }
}