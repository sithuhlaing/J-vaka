package com.example.auth.controller;

import com.example.auth.model.Conversation;
import com.example.auth.model.User;
import com.example.auth.repository.ConversationRepository;
import com.example.auth.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class MessagingControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ConversationRepository conversationRepository;

    private User user1;
    private User user2;
    private Conversation conversation;

    @BeforeEach
    public void setup() {
        user1 = new User("msg-user1@example.com", "msg-user1", "password", "Msg1", "User", com.example.auth.model.UserType.EMPLOYEE);
        user2 = new User("msg-user2@example.com", "msg-user2", "password", "Msg2", "User", com.example.auth.model.UserType.OH_PROFESSIONAL);
        userRepository.save(user1);
        userRepository.save(user2);

        conversation = new Conversation();
        conversation.setCreatedBy(user1);
        conversationRepository.save(conversation);
    }

    @Test
    @WithMockUser("msg-user1")
    public void whenSendMessage_thenReturnsOk() throws Exception {
        String messageRequestJson = String.format("""
            {
                "conversationId": "%s",
                "content": "Hello, world!"
            }
            """, conversation.getConversationId());

        mockMvc.perform(post("/api/messaging")
                .contentType(MediaType.APPLICATION_JSON)
                .content(messageRequestJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.messageId").exists())
                .andExpect(jsonPath("$.messageContent").value("Hello, world!"));
    }

    @Test
    @WithMockUser("msg-user1")
    public void whenGetMessages_thenReturnsMessages() throws Exception {
        mockMvc.perform(get("/api/messaging/conversation/" + conversation.getConversationId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }
}
