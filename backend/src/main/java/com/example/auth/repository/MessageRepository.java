package com.example.auth.repository;

import com.example.auth.model.Conversation;
import com.example.auth.model.Message;
import com.example.auth.model.MessageType;
import com.example.auth.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface MessageRepository extends JpaRepository<Message, UUID> {
    List<Message> findByConversation(Conversation conversation);
    List<Message> findBySender(User sender);
    List<Message> findByMessageType(MessageType messageType);
    
    List<Message> findByConversationAndIsDeleted(Conversation conversation, Boolean isDeleted);
    
    @Query("SELECT m FROM Message m WHERE m.conversation = :conversation AND m.isDeleted = false ORDER BY m.sentAt ASC")
    List<Message> findActiveMessagesByConversationOrderBySentAt(Conversation conversation);
    
    @Query("SELECT m FROM Message m WHERE m.conversation = :conversation AND m.isDeleted = false ORDER BY m.sentAt DESC")
    List<Message> findRecentMessagesByConversation(Conversation conversation);
    
    @Query("SELECT m FROM Message m WHERE m.sentAt BETWEEN :startDate AND :endDate")
    List<Message> findBySentAtBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("SELECT m FROM Message m WHERE m.conversation = :conversation AND m.sentAt BETWEEN :startDate AND :endDate AND m.isDeleted = false")
    List<Message> findByConversationAndSentAtBetween(Conversation conversation, LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("SELECT m FROM Message m WHERE LOWER(m.messageContent) LIKE LOWER(CONCAT('%', :searchTerm, '%')) AND m.isDeleted = false")
    List<Message> searchMessages(String searchTerm);
    
    @Query("SELECT m FROM Message m WHERE m.conversation = :conversation AND " +
           "LOWER(m.messageContent) LIKE LOWER(CONCAT('%', :searchTerm, '%')) AND m.isDeleted = false")
    List<Message> searchMessagesInConversation(Conversation conversation, String searchTerm);
    
    @Query("SELECT COUNT(m) FROM Message m WHERE m.conversation = :conversation AND m.isDeleted = false")
    Long countActiveMessagesByConversation(Conversation conversation);

    @Query("SELECT COUNT(m) FROM Message m WHERE m.conversation = :conversation AND m.sender <> :user AND m.isDeleted = false AND NOT EXISTS (SELECT 1 FROM MessageRead mr WHERE mr.message = m AND mr.user = :user)")
    Long countUnreadMessagesForUser(@org.springframework.data.repository.query.Param("conversation") Conversation conversation, @org.springframework.data.repository.query.Param("user") User user);
}