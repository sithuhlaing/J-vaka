package com.example.auth.service;

import com.example.auth.dto.request.SendMessageRequest;
import com.example.auth.model.Conversation;
import com.example.auth.model.Message;
import com.example.auth.model.MessageRead;
import com.example.auth.model.User;
import com.example.auth.repository.ConversationParticipantRepository;
import com.example.auth.repository.ConversationRepository;
import com.example.auth.repository.MessageReadRepository;
import com.example.auth.repository.MessageRepository;
import lombok.AllArgsConstructor;
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
    private final MessageReadRepository messageReadRepository;
    private final ConversationParticipantRepository conversationParticipantRepository;
    private final NotificationService notificationService;

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

        // Notify other participants
        conversationParticipantRepository.findByConversation(conversation).forEach(participant -> {
            if (!participant.getUser().getUserId().equals(sender.getUserId())) {
                String title = "New Message from " + sender.getFirstName();
                String body = "You have a new message in your conversation.";
                notificationService.createNotification(participant.getUser(), title, body, com.example.auth.model.NotificationType.MESSAGE_ALERT);
            }
        });

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

    @Transactional
    public void deleteMessage(UUID messageId, User user) {
        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new RuntimeException("Message not found"));

        if (!message.getSender().getUserId().equals(user.getUserId())) {
            throw new SecurityException("User not authorized to delete this message");
        }

        message.setIsDeleted(true);
        messageRepository.save(message);
    }

    @Transactional
    public void markMessageAsRead(UUID messageId, User user) {
        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new RuntimeException("Message not found"));

        // Check if user is a participant in the conversation
        conversationParticipantRepository.findByConversationAndUser(message.getConversation(), user)
                .orElseThrow(() -> new SecurityException("User is not a participant in this conversation."));

        // Check if the message has already been read by this user
        if (!messageReadRepository.existsByMessageAndUser(message, user)) {
            MessageRead readReceipt = new MessageRead(message, user);
            messageReadRepository.save(readReceipt);
        }
    }

    private void validateMessageContent(String content) {
        if (content == null || content.isBlank()) {
            throw new IllegalArgumentException("Message content cannot be empty.");
        }
        if (content.length() > 4096) {
            throw new IllegalArgumentException("Message content exceeds maximum length of 4096 characters.");
        }
    }

    public long getUnreadMessageCount(UUID conversationId, User user) {
        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new RuntimeException("Conversation not found"));

        // Check if user is a participant
        conversationParticipantRepository.findByConversationAndUser(conversation, user)
                .orElseThrow(() -> new SecurityException("User is not a participant in this conversation."));

        return messageRepository.countUnreadMessagesForUser(conversation, user);
    }
}
