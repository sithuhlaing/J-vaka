package com.example.auth.repository;

import com.example.auth.model.Message;
import com.example.auth.model.MessageRead;
import com.example.auth.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface MessageReadRepository extends JpaRepository<MessageRead, UUID> {
    List<MessageRead> findByMessage(Message message);
    List<MessageRead> findByUser(User user);
    
    Optional<MessageRead> findByMessageAndUser(Message message, User user);
    
    @Query("SELECT mr FROM MessageRead mr WHERE mr.readAt BETWEEN :startDate AND :endDate")
    List<MessageRead> findByReadAtBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("SELECT COUNT(mr) FROM MessageRead mr WHERE mr.message = :message")
    Long countReadsByMessage(Message message);
    
    @Query("SELECT mr FROM MessageRead mr WHERE mr.user = :user AND mr.readAt >= :since")
    List<MessageRead> findRecentReadsByUser(User user, LocalDateTime since);
    
    Boolean existsByMessageAndUser(Message message, User user);
}