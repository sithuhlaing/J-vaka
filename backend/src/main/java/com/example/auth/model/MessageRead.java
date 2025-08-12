package com.example.auth.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "message_reads")
public class MessageRead {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "read_id")
    private UUID readId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "message_id", nullable = false)
    private Message message;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "read_at")
    private LocalDateTime readAt;

    public MessageRead() {
        this.readAt = LocalDateTime.now();
    }

    public MessageRead(Message message, User user) {
        this.message = message;
        this.user = user;
        this.readAt = LocalDateTime.now();
    }

    // Getters and Setters
    public UUID getReadId() {
        return readId;
    }

    public void setReadId(UUID readId) {
        this.readId = readId;
    }

    public Message getMessage() {
        return message;
    }

    public void setMessage(Message message) {
        this.message = message;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDateTime getReadAt() {
        return readAt;
    }

    public void setReadAt(LocalDateTime readAt) {
        this.readAt = readAt;
    }
}