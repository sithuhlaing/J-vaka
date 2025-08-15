package com.example.auth.service;

import com.example.auth.model.User;
import com.example.auth.model.UserSession;
import com.example.auth.repository.UserSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserSessionService {

    @Autowired
    private UserSessionRepository userSessionRepository;

    @Transactional
    public UserSession createSession(User user, String jwtToken, String refreshToken, LocalDateTime expiresAt, String ipAddress, String userAgent) {
        UserSession session = new UserSession(user, jwtToken, refreshToken, expiresAt, ipAddress, userAgent);
        return userSessionRepository.save(session);
    }

    public Optional<UserSession> findByRefreshToken(String token) {
        return userSessionRepository.findByRefreshToken(token);
    }

    @Transactional
    public UserSession verifyExpiration(UserSession session) {
        if (session.getExpiresAt().isBefore(LocalDateTime.now())) {
            userSessionRepository.delete(session);
            throw new RuntimeException("Refresh token was expired. Please make a new signin request");
        }
        return session;
    }

    public void invalidateSession(UUID sessionId) {
        userSessionRepository.deleteById(sessionId);
    }

    @Transactional
    public void invalidateSessionByJwt(String jwtToken) {
        userSessionRepository.deleteByJwtToken(jwtToken);
    }

    public void invalidateUserSessions(UUID userId) {
        // This is a placeholder for a more efficient bulk delete/update
        userSessionRepository.findAll().forEach(session -> {
            if (session.getUser().getUserId().equals(userId)) {
                userSessionRepository.delete(session);
            }
        });
    }
}
