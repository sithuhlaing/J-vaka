package com.example.auth.repository;

import com.example.auth.model.User;
import com.example.auth.model.UserSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserSessionRepository extends JpaRepository<UserSession, UUID> {
    Optional<UserSession> findByJwtToken(String jwtToken);
    Optional<UserSession> findByRefreshToken(String refreshToken);

    void deleteByJwtToken(String jwtToken);
    
    List<UserSession> findByUser(User user);
    List<UserSession> findByUserOrderByCreatedAtDesc(User user);
    
    @Query("SELECT s FROM UserSession s WHERE s.expiresAt < :now")
    List<UserSession> findExpiredSessions(LocalDateTime now);
    
    @Modifying
    @Query("DELETE FROM UserSession s WHERE s.expiresAt < :now")
    void deleteExpiredSessions(LocalDateTime now);
    
    @Modifying
    @Query("DELETE FROM UserSession s WHERE s.user = :user")
    void deleteByUser(User user);
}