package com.example.auth.exception;

import java.util.UUID;

public class EmployeeNotFoundException extends RuntimeException {
    public EmployeeNotFoundException(UUID employeeId) {
        super("Employee not found with ID: " + employeeId);
    }

    public EmployeeNotFoundException(String employeeNumber) {
        super("Employee not found with employee number: " + employeeNumber);
    }
}