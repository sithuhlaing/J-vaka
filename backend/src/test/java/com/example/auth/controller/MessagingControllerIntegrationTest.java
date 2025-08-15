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

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
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

    @Test
    @WithMockUser("msg-user1")
    public void whenEditMessage_thenReturnsUpdatedMessage() throws Exception {
        // First, send a message
        com.example.auth.dto.request.SendMessageRequest sendRequest = new com.example.auth.dto.request.SendMessageRequest();
        sendRequest.setConversationId(conversation.getConversationId());
        sendRequest.setContent("Original message");

        String response = mockMvc.perform(post("/api/messaging")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(sendRequest)))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        com.example.auth.model.Message sentMessage = objectMapper.readValue(response, com.example.auth.model.Message.class);

        // Now, edit the message
        com.example.auth.dto.request.EditMessageRequest editRequest = new com.example.auth.dto.request.EditMessageRequest();
        editRequest.setContent("Edited message");

        mockMvc.perform(put("/api/messaging/" + sentMessage.getMessageId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(editRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.messageContent").value("Edited message"))
                .andExpect(jsonPath("$.isEdited").value(true));
    }

    @Test
    @WithMockUser("msg-user1")
    public void whenDeleteMessage_thenReturnsNoContent() throws Exception {
        // First, send a message
        com.example.auth.dto.request.SendMessageRequest sendRequest = new com.example.auth.dto.request.SendMessageRequest();
        sendRequest.setConversationId(conversation.getConversationId());
        sendRequest.setContent("Message to be deleted");

        String response = mockMvc.perform(post("/api/messaging")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(sendRequest)))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        com.example.auth.model.Message sentMessage = objectMapper.readValue(response, com.example.auth.model.Message.class);

        // Now, delete the message
        mockMvc.perform(delete("/api/messaging/" + sentMessage.getMessageId()))
                .andExpect(status().isNoContent());

        // Verify the message is not returned in the conversation
        mockMvc.perform(get("/api/messaging/conversation/" + conversation.getConversationId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[?(@.messageId == '%s')]", sentMessage.getMessageId()).doesNotExist());
    }
}
