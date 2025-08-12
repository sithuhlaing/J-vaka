package com.example.auth.repository;

import com.example.auth.model.Appointment;
import com.example.auth.model.SessionStatus;
import com.example.auth.model.VideoSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface VideoSessionRepository extends JpaRepository<VideoSession, UUID> {
    Optional<VideoSession> findByAppointment(Appointment appointment);
    Optional<VideoSession> findByMeetingRoomId(String meetingRoomId);
    
    List<VideoSession> findByStatus(SessionStatus status);
    
    @Query("SELECT vs FROM VideoSession vs WHERE vs.status = 'ACTIVE'")
    List<VideoSession> findActiveSessions();
    
    @Query("SELECT vs FROM VideoSession vs WHERE vs.status = 'WAITING' AND vs.createdAt < :cutoffTime")
    List<VideoSession> findStaleWaitingSessions(LocalDateTime cutoffTime);
    
    @Query("SELECT vs FROM VideoSession vs WHERE vs.startedAt BETWEEN :startDate AND :endDate")
    List<VideoSession> findByStartedAtBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("SELECT vs FROM VideoSession vs WHERE vs.endedAt IS NULL AND vs.status = 'ACTIVE'")
    List<VideoSession> findActiveSessionsWithoutEndTime();
}