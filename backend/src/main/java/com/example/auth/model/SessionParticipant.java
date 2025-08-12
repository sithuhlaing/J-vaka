package com.example.auth.model;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@Entity
@Table(name = "session_participants")
public class SessionParticipant {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "participant_id")
    private UUID participantId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id", nullable = false)
    private VideoSession videoSession;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "joined_at")
    private LocalDateTime joinedAt;

    @Column(name = "left_at")
    private LocalDateTime leftAt;

    @Enumerated(EnumType.STRING)
    private ParticipantRole role = ParticipantRole.PARTICIPANT;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "connection_info")
    private Map<String, Object> connectionInfo;

    public SessionParticipant() {
    }

    public SessionParticipant(VideoSession videoSession, User user, ParticipantRole role) {
        this.videoSession = videoSession;
        this.user = user;
        this.role = role;
    }

    // Getters and Setters
    public UUID getParticipantId() {
        return participantId;
    }

    public void setParticipantId(UUID participantId) {
        this.participantId = participantId;
    }

    public VideoSession getVideoSession() {
        return videoSession;
    }

    public void setVideoSession(VideoSession videoSession) {
        this.videoSession = videoSession;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDateTime getJoinedAt() {
        return joinedAt;
    }

    public void setJoinedAt(LocalDateTime joinedAt) {
        this.joinedAt = joinedAt;
    }

    public LocalDateTime getLeftAt() {
        return leftAt;
    }

    public void setLeftAt(LocalDateTime leftAt) {
        this.leftAt = leftAt;
    }

    public ParticipantRole getRole() {
        return role;
    }

    public void setRole(ParticipantRole role) {
        this.role = role;
    }

    public Map<String, Object> getConnectionInfo() {
        return connectionInfo;
    }

    public void setConnectionInfo(Map<String, Object> connectionInfo) {
        this.connectionInfo = connectionInfo;
    }
}