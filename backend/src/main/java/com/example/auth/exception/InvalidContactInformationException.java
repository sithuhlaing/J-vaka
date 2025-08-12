package com.example.auth.exception;

public class InvalidContactInformationException extends RuntimeException {
    public InvalidContactInformationException(String message) {
        super(message);
    }

    public static InvalidContactInformationException invalidPhoneNumber(String phoneNumber) {
        return new InvalidContactInformationException("Invalid phone number format: " + phoneNumber);
    }

    public static InvalidContactInformationException invalidEmail(String email) {
        return new InvalidContactInformationException("Invalid email format: " + email);
    }
}