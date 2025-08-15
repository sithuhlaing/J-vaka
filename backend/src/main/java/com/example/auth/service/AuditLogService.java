package com.example.auth.service;

import com.example.auth.model.AuditAction;
import com.example.auth.model.AuditLog;
import com.example.auth.model.User;
import com.example.auth.repository.AuditLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.UUID;

@Service
public class AuditLogService {

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Transactional
    public void logSecurityEvent(User user, AuditAction action, String ipAddress, Map<String, Object> metadata) {
        AuditLog auditLog = new AuditLog();
        if (user != null) {
            auditLog.setUser(user);
        }
        auditLog.setAction(action);
        auditLog.setIpAddress(ipAddress);
        auditLog.setNewValues(metadata);

        // In a real application, you might set other fields like serviceName, entityId, etc.

        auditLogRepository.save(auditLog);
    }

    @Transactional
    public void logEvent(AuditAction action, Map<String, Object> metadata) {
        logSecurityEvent(null, action, null, metadata);
    }
}
