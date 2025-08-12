package com.example.auth.repository;

import com.example.auth.model.Conversation;
import com.example.auth.model.ConversationParticipant;
import com.example.auth.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ConversationParticipantRepository extends JpaRepository<ConversationParticipant, UUID> {
    List<ConversationParticipant> findByConversation(Conversation conversation);
    List<ConversationParticipant> findByUser(User user);
    
    Optional<ConversationParticipant> findByConversationAndUser(Conversation conversation, User user);
    
    List<ConversationParticipant> findByConversationAndIsActive(Conversation conversation, Boolean isActive);
    List<ConversationParticipant> findByUserAndIsActive(User user, Boolean isActive);
    
    @Query("SELECT cp FROM ConversationParticipant cp WHERE cp.conversation = :conversation AND cp.isActive = true")
    List<ConversationParticipant> findActiveParticipantsByConversation(Conversation conversation);
    
    @Query("SELECT COUNT(cp) FROM ConversationParticipant cp WHERE cp.conversation = :conversation AND cp.isActive = true")
    Long countActiveParticipantsByConversation(Conversation conversation);
    
    @Query("SELECT cp FROM ConversationParticipant cp WHERE cp.user = :user AND cp.isActive = true")
    List<ConversationParticipant> findActiveParticipantsByUser(User user);
}