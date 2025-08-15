package com.example.auth.controller;

import com.example.auth.dto.request.SendMessageRequest;
import com.example.auth.model.Message;
import com.example.auth.model.User;
import com.example.auth.repository.UserRepository;
import com.example.auth.service.MessagingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/messaging")
@CrossOrigin(origins = "*", maxAge = 3600)
public class MessagingController {

    @Autowired
    private MessagingService messagingService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<Message> sendMessage(@Valid @RequestBody SendMessageRequest request, Authentication authentication) {
        User currentUser = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Message message = messagingService.sendMessage(request, currentUser);
        return ResponseEntity.ok(message);
    }

    @GetMapping("/conversation/{conversationId}")
    public ResponseEntity<List<Message>> getMessages(@PathVariable UUID conversationId) {
        List<Message> messages = messagingService.getMessagesForConversation(conversationId);
        return ResponseEntity.ok(messages);
    }
}
