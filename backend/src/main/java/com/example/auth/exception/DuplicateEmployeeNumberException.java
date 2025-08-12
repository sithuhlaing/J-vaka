package com.example.auth.exception;

public class DuplicateEmployeeNumberException extends RuntimeException {
    public DuplicateEmployeeNumberException(String employeeNumber) {
        super("Employee number already exists: " + employeeNumber);
    }
}