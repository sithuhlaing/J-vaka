package com.example.auth.service;

import com.example.auth.dto.request.SendMessageRequest;
import com.example.auth.model.Conversation;
import com.example.auth.model.Message;
import com.example.auth.model.User;
import com.example.auth.repository.ConversationRepository;
import com.example.auth.repository.MessageRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class MessagingService {

    private final MessageRepository messageRepository;
    private final ConversationRepository conversationRepository;
    private final EncryptionService encryptionService;

    @Transactional
    public Message sendMessage(SendMessageRequest request, User sender) {
        validateMessageContent(request.getContent());
        Conversation conversation = conversationRepository.findById(request.getConversationId())
                .orElseThrow(() -> new RuntimeException("Conversation not found"));

        Message message = new Message();
        message.setConversation(conversation);
        message.setSender(sender);
        try {
            message.setMessageContent(encryptionService.encrypt(request.getContent()));
        } catch (Exception e) {
            throw new RuntimeException("Failed to encrypt message", e);
        }

        Message savedMessage = messageRepository.save(message);
        // Return the message with decrypted content
        savedMessage.setMessageContent(request.getContent());
        return savedMessage;
    }

    public List<Message> getMessagesForConversation(UUID conversationId) {
        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new RuntimeException("Conversation not found"));
        List<Message> messages = messageRepository.findActiveMessagesByConversationOrderBySentAt(conversation);
        messages.forEach(message -> {
            try {
                message.setMessageContent(encryptionService.decrypt(message.getMessageContent()));
            } catch (Exception e) {
                message.setMessageContent("[Message is corrupted or unreadable]");
            }
        });
        return messages;
    }

    @Transactional
    public Message editMessage(UUID messageId, String newContent, User editor) {
        validateMessageContent(newContent);
        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new RuntimeException("Message not found"));

        if (!message.getSender().getUserId().equals(editor.getUserId())) {
            throw new SecurityException("User not authorized to edit this message");
        }

        try {
            message.setMessageContent(encryptionService.encrypt(newContent));
        } catch (Exception e) {
            throw new RuntimeException("Failed to encrypt message", e);
        }
        message.setIsEdited(true);
        Message savedMessage = messageRepository.save(message);
        // Return the message with decrypted content
        savedMessage.setMessageContent(newContent);
        return savedMessage;
    }

    private void validateMessageContent(String content) {
        if (content == null || content.isBlank()) {
            throw new IllegalArgumentException("Message content cannot be empty.");
        }
        if (content.length() > 4096) {
            throw new IllegalArgumentException("Message content exceeds maximum length of 4096 characters.");
        }
    }

    @Transactional
    public void deleteMessage(UUID messageId, User user) {
        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new RuntimeException("Message not found"));

        // Basic authorization: only the sender can delete their message
        if (!message.getSender().getUserId().equals(user.getUserId())) {
            throw new SecurityException("User not authorized to delete this message");
        }

        message.setIsDeleted(true);
        messageRepository.save(message);
    }
}
