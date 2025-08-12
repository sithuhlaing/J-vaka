package com.example.auth.service;

import com.example.auth.dto.*;
import com.example.auth.exception.DuplicateEmployeeNumberException;
import com.example.auth.exception.EmployeeNotFoundException;
import com.example.auth.exception.InvalidContactInformationException;
import com.example.auth.model.*;
import com.example.auth.repository.AuditLogRepository;
import com.example.auth.repository.EmployeeRepository;
import com.example.auth.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.UUID;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@Transactional
public class EmployeeProfileServiceImpl implements EmployeeProfileService {

    private static final Logger logger = LoggerFactory.getLogger(EmployeeProfileServiceImpl.class);

    // Phone number pattern (flexible for international formats)
    private static final Pattern PHONE_PATTERN = Pattern.compile(
        "^[+]?[0-9\\s\\-\\(\\)]{7,15}$"
    );

    // Email pattern
    private static final Pattern EMAIL_PATTERN = Pattern.compile(
        "^[A-Za-z0-9+_.-]+@([A-Za-z0-9.-]+\\.[A-Za-z]{2,})$"
    );

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public EmployeeProfileResponse createEmployeeProfile(CreateEmployeeProfileRequest userData, UUID createdBy) {
        logger.info("Creating employee profile for user: {}", userData.getUsername());

        // Validate employee number uniqueness
        if (!validateEmployeeNumber(userData.getEmployeeNumber())) {
            throw new DuplicateEmployeeNumberException(userData.getEmployeeNumber());
        }

        // Validate contact information
        if (!validateContactInformation(userData.getPhoneNumber(), userData.getEmail())) {
            throw new InvalidContactInformationException("Invalid contact information provided");
        }

        // Check if username or email already exists
        if (userRepository.existsByUsername(userData.getUsername())) {
            throw new RuntimeException("Username already exists: " + userData.getUsername());
        }

        if (userRepository.existsByEmail(userData.getEmail())) {
            throw new RuntimeException("Email already exists: " + userData.getEmail());
        }

        // Create User entity
        User user = new User(
            userData.getEmail(),
            userData.getUsername(),
            passwordEncoder.encode(userData.getPassword()),
            userData.getFirstName(),
            userData.getLastName(),
            userData.getUserType()
        );

        user = userRepository.save(user);

        // Create Employee entity
        Employee employee = new Employee(user, userData.getEmployeeNumber());
        employee.setTitle(userData.getTitle());
        employee.setDateOfBirth(userData.getDateOfBirth());
        employee.setGender(userData.getGender());
        employee.setPhoneNumber(userData.getPhoneNumber());
        employee.setAddress(userData.getAddress());
        employee.setPostcode(userData.getPostcode());
        employee.setEmergencyContactName(userData.getEmergencyContactName());
        employee.setEmergencyContactPhone(userData.getEmergencyContactPhone());
        employee.setDepartment(userData.getDepartment());
        employee.setJobTitle(userData.getJobTitle());
        employee.setStartDate(userData.getStartDate() != null ? userData.getStartDate() : LocalDate.now());
        employee.setEmploymentStatus(EmploymentStatus.ACTIVE);

        employee = employeeRepository.save(employee);

        // Create audit log
        createAuditLog(createdBy, "Employee", employee.getEmployeeId(), AuditAction.CREATE);

        logger.info("Successfully created employee profile with ID: {}", employee.getEmployeeId());

        return mapToEmployeeProfileResponse(employee);
    }

    @Override
    public EmployeeProfileResponse updatePersonalInformation(UUID employeeId, UpdatePersonalInformationRequest profileData) {
        logger.info("Updating personal information for employee: {}", employeeId);

        Employee employee = employeeRepository.findById(employeeId)
            .orElseThrow(() -> new EmployeeNotFoundException(employeeId));

        User user = employee.getUser();

        // Validate contact information if provided
        if (!validateContactInformation(profileData.getPhoneNumber(), profileData.getEmail())) {
            throw new InvalidContactInformationException("Invalid contact information provided");
        }

        // Update User fields
        if (profileData.getFirstName() != null) {
            user.setFirstName(profileData.getFirstName());
        }
        if (profileData.getLastName() != null) {
            user.setLastName(profileData.getLastName());
        }
        if (profileData.getEmail() != null && !profileData.getEmail().equals(user.getEmail())) {
            if (userRepository.existsByEmail(profileData.getEmail())) {
                throw new RuntimeException("Email already exists: " + profileData.getEmail());
            }
            user.setEmail(profileData.getEmail());
        }

        // Update Employee fields
        if (profileData.getTitle() != null) {
            employee.setTitle(profileData.getTitle());
        }
        if (profileData.getDateOfBirth() != null) {
            employee.setDateOfBirth(profileData.getDateOfBirth());
        }
        if (profileData.getGender() != null) {
            employee.setGender(profileData.getGender());
        }
        if (profileData.getPhoneNumber() != null) {
            employee.setPhoneNumber(profileData.getPhoneNumber());
        }
        if (profileData.getAddress() != null) {
            employee.setAddress(profileData.getAddress());
        }
        if (profileData.getPostcode() != null) {
            employee.setPostcode(profileData.getPostcode());
        }
        if (profileData.getEmergencyContactName() != null) {
            employee.setEmergencyContactName(profileData.getEmergencyContactName());
        }
        if (profileData.getEmergencyContactPhone() != null) {
            employee.setEmergencyContactPhone(profileData.getEmergencyContactPhone());
        }

        userRepository.save(user);
        employee = employeeRepository.save(employee);

        // Create audit log
        createAuditLog(user.getUserId(), "Employee", employee.getEmployeeId(), AuditAction.UPDATE);

        logger.info("Successfully updated personal information for employee: {}", employeeId);

        return mapToEmployeeProfileResponse(employee);
    }

    @Override
    public boolean validateEmployeeNumber(String employeeNumber) {
        if (employeeNumber == null || employeeNumber.trim().isEmpty()) {
            return false;
        }

        // Check if employee number already exists
        return !employeeRepository.existsByEmployeeNumber(employeeNumber.trim());
    }

    @Override
    public EmployeeProfileResponse manageEmploymentStatus(UUID employeeId, ManageEmploymentStatusRequest statusRequest) {
        logger.info("Managing employment status for employee: {} to status: {}", employeeId, statusRequest.getStatus());

        Employee employee = employeeRepository.findById(employeeId)
            .orElseThrow(() -> new EmployeeNotFoundException(employeeId));

        EmploymentStatus oldStatus = employee.getEmploymentStatus();
        employee.setEmploymentStatus(statusRequest.getStatus());

        // If terminating, also set user status to inactive
        if (statusRequest.getStatus() == EmploymentStatus.TERMINATED) {
            employee.getUser().setStatus(UserStatus.INACTIVE);
            userRepository.save(employee.getUser());
        } else if (statusRequest.getStatus() == EmploymentStatus.ACTIVE) {
            employee.getUser().setStatus(UserStatus.ACTIVE);
            userRepository.save(employee.getUser());
        }

        employee = employeeRepository.save(employee);

        // Create audit log with reason
        AuditLog auditLog = new AuditLog(
            employee.getUser(),
            "EmployeeService",
            "Employee",
            employee.getEmployeeId(),
            AuditAction.UPDATE,
            null // IP address would be set by controller
        );
        
        // Store old and new values
        auditLog.setOldValues(java.util.Map.of("employmentStatus", oldStatus.toString()));
        auditLog.setNewValues(java.util.Map.of(
            "employmentStatus", statusRequest.getStatus().toString(),
            "reason", statusRequest.getReason() != null ? statusRequest.getReason() : ""
        ));
        
        auditLogRepository.save(auditLog);

        logger.info("Successfully updated employment status for employee: {} from {} to {}", 
                   employeeId, oldStatus, statusRequest.getStatus());

        return mapToEmployeeProfileResponse(employee);
    }

    @Override
    public int calculateServiceYears(LocalDate startDate) {
        if (startDate == null) {
            return 0;
        }

        return Period.between(startDate, LocalDate.now()).getYears();
    }

    @Override
    public boolean validateContactInformation(String phoneNumber, String email) {
        // Validate phone number if provided
        if (phoneNumber != null && !phoneNumber.trim().isEmpty()) {
            if (!PHONE_PATTERN.matcher(phoneNumber.trim()).matches()) {
                return false;
            }
        }

        // Validate email if provided
        if (email != null && !email.trim().isEmpty()) {
            if (!EMAIL_PATTERN.matcher(email.trim()).matches()) {
                return false;
            }
        }

        return true;
    }

    @Override
    @Transactional(readOnly = true)
    public EmployeeProfileResponse getEmployeeProfile(UUID employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
            .orElseThrow(() -> new EmployeeNotFoundException(employeeId));

        return mapToEmployeeProfileResponse(employee);
    }

    @Override
    @Transactional(readOnly = true)
    public EmployeeProfileResponse getEmployeeProfileByNumber(String employeeNumber) {
        Employee employee = employeeRepository.findByEmployeeNumber(employeeNumber)
            .orElseThrow(() -> new EmployeeNotFoundException(employeeNumber));

        return mapToEmployeeProfileResponse(employee);
    }

    @Override
    @Transactional(readOnly = true)
    public List<EmployeeProfileResponse> getEmployeesByStatus(EmploymentStatus status) {
        return employeeRepository.findByEmploymentStatus(status)
            .stream()
            .map(this::mapToEmployeeProfileResponse)
            .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<EmployeeProfileResponse> searchEmployees(String searchTerm) {
        return employeeRepository.searchEmployees(searchTerm)
            .stream()
            .map(this::mapToEmployeeProfileResponse)
            .collect(Collectors.toList());
    }

    /**
     * Maps Employee entity to EmployeeProfileResponse DTO
     */
    private EmployeeProfileResponse mapToEmployeeProfileResponse(Employee employee) {
        EmployeeProfileResponse response = new EmployeeProfileResponse();
        
        // User fields
        User user = employee.getUser();
        response.setUserId(user.getUserId());
        response.setUsername(user.getUsername());
        response.setEmail(user.getEmail());
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setUserType(user.getUserType());
        response.setUserStatus(user.getStatus());

        // Employee fields
        response.setEmployeeId(employee.getEmployeeId());
        response.setEmployeeNumber(employee.getEmployeeNumber());
        response.setTitle(employee.getTitle());
        response.setDateOfBirth(employee.getDateOfBirth());
        response.setGender(employee.getGender());
        response.setPhoneNumber(employee.getPhoneNumber());
        response.setAddress(employee.getAddress());
        response.setPostcode(employee.getPostcode());
        response.setEmergencyContactName(employee.getEmergencyContactName());
        response.setEmergencyContactPhone(employee.getEmergencyContactPhone());
        response.setDepartment(employee.getDepartment());
        response.setJobTitle(employee.getJobTitle());
        response.setStartDate(employee.getStartDate());
        response.setEmploymentStatus(employee.getEmploymentStatus());
        response.setCreatedAt(employee.getCreatedAt());
        response.setUpdatedAt(employee.getUpdatedAt());

        // Calculate service years
        response.setServiceYears(calculateServiceYears(employee.getStartDate()));

        return response;
    }

    /**
     * Creates an audit log entry
     */
    private void createAuditLog(UUID userId, String entityType, UUID entityId, AuditAction action) {
        User user = userRepository.findById(userId).orElse(null);
        AuditLog auditLog = new AuditLog(
            user,
            "EmployeeService",
            entityType,
            entityId,
            action,
            null // IP address would be set by controller
        );
        auditLogRepository.save(auditLog);
    }
}