package com.example.auth.model;

public enum AuditAction {
    CREATE,
    READ,
    UPDATE,
    DELETE,
    LOGIN,
    LOGOUT,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    TOKEN_REFRESH,
    SUSPICIOUS_LOGIN_IP,
    SUSPICIOUS_LOGIN_USER_AGENT
}