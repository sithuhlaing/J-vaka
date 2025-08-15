package com.example.auth.controller;

import com.example.auth.service.EmployeeProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/compliance")
public class ComplianceController {

    @Autowired
    private EmployeeProfileService employeeProfileService;

    @PostMapping("/anonymize/{employeeId}")
    public ResponseEntity<Void> anonymizeEmployeeData(@PathVariable UUID employeeId) {
        employeeProfileService.anonymizeEmployeeData(employeeId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/export/{employeeId}")
    public ResponseEntity<String> exportEmployeeData(@PathVariable UUID employeeId) {
        String employeeData = employeeProfileService.exportEmployeeData(employeeId);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setContentDispositionFormData("attachment", "employee_data_" + employeeId + ".json");
        return new ResponseEntity<>(employeeData, headers, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{employeeId}")
    public ResponseEntity<Void> deleteEmployeeData(@PathVariable UUID employeeId) {
        employeeProfileService.deleteEmployeeData(employeeId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/consent/{employeeId}")
    public ResponseEntity<Boolean> validateConsentForHealthData(@PathVariable UUID employeeId) {
        boolean hasConsent = employeeProfileService.validateConsentForHealthData(employeeId);
        return ResponseEntity.ok(hasConsent);
    }

    @PostMapping("/audit-access")
    public ResponseEntity<Void> auditHealthDataAccess(@RequestParam UUID accessorId, @RequestParam UUID employeeId) {
        employeeProfileService.auditHealthDataAccess(accessorId, employeeId);
        return ResponseEntity.ok().build();
    }
}