package com.example.auth.service;

import com.example.auth.dto.request.SendMessageRequest;
import com.example.auth.model.Conversation;
import com.example.auth.model.Message;
import com.example.auth.model.User;
import com.example.auth.repository.ConversationRepository;
import com.example.auth.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class MessagingService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private ConversationRepository conversationRepository;

    @Transactional
    public Message sendMessage(SendMessageRequest request, User sender) {
        Conversation conversation = conversationRepository.findById(request.getConversationId())
                .orElseThrow(() -> new RuntimeException("Conversation not found"));

        // In a real app, you'd check if the sender is a participant in the conversation

        Message message = new Message();
        message.setConversation(conversation);
        message.setSender(sender);
        message.setMessageContent(request.getContent());

        return messageRepository.save(message);
    }

    public List<Message> getMessagesForConversation(UUID conversationId) {
        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new RuntimeException("Conversation not found"));
        return messageRepository.findActiveMessagesByConversationOrderBySentAt(conversation);
    }
}
