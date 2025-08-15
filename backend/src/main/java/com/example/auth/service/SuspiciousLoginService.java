package com.example.auth.service;

import com.example.auth.model.AuditAction;
import com.example.auth.model.User;
import com.example.auth.model.UserSession;
import com.example.auth.repository.UserSessionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SuspiciousLoginService {

    private static final Logger logger = LoggerFactory.getLogger(SuspiciousLoginService.class);

    @Autowired
    private UserSessionRepository userSessionRepository;

    @Autowired
    private AuditLogService auditLogService;

    public void detectSuspiciousLogin(User user, String ipAddress, String userAgent) {
        if (user == null) {
            return;
        }

        List<UserSession> recentSessions = userSessionRepository.findByUserOrderByCreatedAtDesc(user);

        if (recentSessions.isEmpty()) {
            // First login, not suspicious
            return;
        }

        boolean ipIsNew = recentSessions.stream().noneMatch(session -> ipAddress.equals(session.getIpAddress()));
        boolean userAgentIsNew = recentSessions.stream().noneMatch(session -> userAgent.equals(session.getUserAgent()));

        if (ipIsNew) {
            String message = String.format("Suspicious login detected for user %s from new IP address %s", user.getUsername(), ipAddress);
            logger.warn(message);
            auditLogService.logSecurityEvent(user, AuditAction.SUSPICIOUS_LOGIN_IP, ipAddress, java.util.Map.of("message", message));
        }

        if (userAgentIsNew) {
            String message = String.format("Suspicious login detected for user %s with new User-Agent %s", user.getUsername(), userAgent);
            logger.warn(message);
            auditLogService.logSecurityEvent(user, AuditAction.SUSPICIOUS_LOGIN_USER_AGENT, ipAddress, java.util.Map.of("message", message, "userAgent", userAgent));
        }
    }
}
