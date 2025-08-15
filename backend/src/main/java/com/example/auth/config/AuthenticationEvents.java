package com.example.auth.config;

import com.example.auth.model.AuditAction;
import com.example.auth.model.User;
import com.example.auth.repository.UserRepository;
import com.example.auth.service.AuditLogService;
import com.example.auth.service.SuspiciousLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.security.authentication.event.AbstractAuthenticationFailureEvent;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class AuthenticationEvents {

    @Autowired
    private AuditLogService auditLogService;

    @Autowired
    private SuspiciousLoginService suspiciousLoginService;

    @Autowired
    private UserRepository userRepository;

    @EventListener
    public void onSuccess(AuthenticationSuccessEvent success) {
        Object principal = success.getAuthentication().getPrincipal();
        WebAuthenticationDetails details = (WebAuthenticationDetails) success.getAuthentication().getDetails();
        String ipAddress = details.getRemoteAddress();

        if (principal instanceof UserDetails) {
            String username = ((UserDetails) principal).getUsername();
            User user = userRepository.findByUsername(username).orElse(null);

            auditLogService.logSecurityEvent(user, AuditAction.LOGIN_SUCCESS, ipAddress,
                Map.of("principal", username));

            suspiciousLoginService.detectSuspiciousLogin(user, ipAddress, null); // User-agent not easily available here
        }
    }

    @EventListener
    public void onFailure(AbstractAuthenticationFailureEvent failure) {
        String username = (String) failure.getAuthentication().getPrincipal();
        auditLogService.logEvent(AuditAction.LOGIN_FAILURE,
            Map.of("principal", username, "exception", failure.getException().getMessage()));
    }
}
