package com.example.auth.repository;

import com.example.auth.model.ParticipantRole;
import com.example.auth.model.SessionParticipant;
import com.example.auth.model.User;
import com.example.auth.model.VideoSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SessionParticipantRepository extends JpaRepository<SessionParticipant, UUID> {
    List<SessionParticipant> findByVideoSession(VideoSession videoSession);
    List<SessionParticipant> findByUser(User user);
    List<SessionParticipant> findByRole(ParticipantRole role);
    
    Optional<SessionParticipant> findByVideoSessionAndUser(VideoSession videoSession, User user);
    List<SessionParticipant> findByVideoSessionAndRole(VideoSession videoSession, ParticipantRole role);
    
    @Query("SELECT sp FROM SessionParticipant sp WHERE sp.videoSession = :session AND sp.leftAt IS NULL")
    List<SessionParticipant> findActiveParticipantsBySession(VideoSession session);
    
    @Query("SELECT sp FROM SessionParticipant sp WHERE sp.user = :user AND sp.leftAt IS NULL")
    List<SessionParticipant> findActiveParticipantsByUser(User user);
    
    @Query("SELECT sp FROM SessionParticipant sp WHERE sp.joinedAt BETWEEN :startDate AND :endDate")
    List<SessionParticipant> findByJoinedAtBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("SELECT COUNT(sp) FROM SessionParticipant sp WHERE sp.videoSession = :session AND sp.leftAt IS NULL")
    Long countActiveParticipantsBySession(VideoSession session);
}