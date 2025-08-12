package com.example.auth.repository;

import com.example.auth.model.Conversation;
import com.example.auth.model.ConversationType;
import com.example.auth.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, UUID> {
    List<Conversation> findByCreatedBy(User createdBy);
    List<Conversation> findByConversationType(ConversationType conversationType);
    
    @Query("SELECT c FROM Conversation c WHERE c.createdAt BETWEEN :startDate AND :endDate")
    List<Conversation> findByCreatedAtBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("SELECT c FROM Conversation c JOIN ConversationParticipant cp ON c.conversationId = cp.conversation.conversationId " +
           "WHERE cp.user = :user AND cp.isActive = true")
    List<Conversation> findActiveConversationsByUser(User user);
    
    @Query("SELECT c FROM Conversation c WHERE LOWER(c.conversationName) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Conversation> searchByConversationName(String searchTerm);
    
    @Query("SELECT c FROM Conversation c JOIN ConversationParticipant cp ON c.conversationId = cp.conversation.conversationId " +
           "WHERE cp.user = :user AND cp.isActive = true ORDER BY c.updatedAt DESC")
    List<Conversation> findRecentConversationsByUser(User user);
}