package com.example.auth.controller;

import com.example.auth.dto.SignupRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional // Rollback transactions after each test
public class AuthControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void whenPostSignup_thenUserIsRegistered() throws Exception {
        SignupRequest signupRequest = new SignupRequest();
        signupRequest.setUsername("testuser");
        signupRequest.setEmail("testuser@example.com");
        signupRequest.setPassword("Password123!");
        signupRequest.setFirstName("Test");
        signupRequest.setLastName("User");
        signupRequest.setUserType("EMPLOYEE");

        mockMvc.perform(post("/api/auth/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(signupRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("User registered successfully!"));
    }

    @Test
    public void givenUserExists_whenPostSignin_thenReturnsJwt() throws Exception {
        // First, sign up a user
        SignupRequest signupRequest = new SignupRequest();
        signupRequest.setUsername("testuser-signin");
        signupRequest.setEmail("testuser-signin@example.com");
        signupRequest.setPassword("Password123!");
        signupRequest.setFirstName("Test");
        signupRequest.setLastName("Signin");
        mockMvc.perform(post("/api/auth/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(signupRequest)));

        // Then, attempt to sign in
        String loginRequestJson = "{\"username\":\"testuser-signin\",\"password\":\"Password123!\"}";

        mockMvc.perform(post("/api/auth/signin")
                .contentType(MediaType.APPLICATION_JSON)
                .content(loginRequestJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken").exists())
                .andExpect(jsonPath("$.refreshToken").exists());
    }

    @Test
    public void givenValidRefreshToken_whenPostRefreshToken_thenReturnsNewJwt() throws Exception {
        // Sign up and sign in to get a refresh token
        SignupRequest signupRequest = new SignupRequest();
        signupRequest.setUsername("testuser-refresh");
        signupRequest.setEmail("testuser-refresh@example.com");
        signupRequest.setPassword("Password123!");
        signupRequest.setFirstName("Test");
        signupRequest.setLastName("Refresh");
        mockMvc.perform(post("/api/auth/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(signupRequest)));

        String loginRequestJson = "{\"username\":\"testuser-refresh\",\"password\":\"Password123!\"}";
        String responseString = mockMvc.perform(post("/api/auth/signin")
                .contentType(MediaType.APPLICATION_JSON)
                .content(loginRequestJson))
                .andReturn().getResponse().getContentAsString();

        String refreshToken = objectMapper.readTree(responseString).get("refreshToken").asText();
        String tokenRefreshRequestJson = "{\"refreshToken\":\"" + refreshToken + "\"}";

        // Use the refresh token to get a new access token
        mockMvc.perform(post("/api/auth/refreshtoken")
                .contentType(MediaType.APPLICATION_JSON)
                .content(tokenRefreshRequestJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken").exists())
                .andExpect(jsonPath("$.refreshToken").exists());
    }

    @Test
    public void givenLoggedInUser_whenPostLogout_thenSessionIsInvalidated() throws Exception {
        // Sign up and sign in to get a JWT
        SignupRequest signupRequest = new SignupRequest();
        signupRequest.setUsername("testuser-logout");
        signupRequest.setEmail("testuser-logout@example.com");
        signupRequest.setPassword("Password123!");
        signupRequest.setFirstName("Test");
        signupRequest.setLastName("Logout");
        mockMvc.perform(post("/api/auth/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(signupRequest)));

        String loginRequestJson = "{\"username\":\"testuser-logout\",\"password\":\"Password123!\"}";
        String responseString = mockMvc.perform(post("/api/auth/signin")
                .contentType(MediaType.APPLICATION_JSON)
                .content(loginRequestJson))
                .andReturn().getResponse().getContentAsString();

        String jwt = objectMapper.readTree(responseString).get("accessToken").asText();

        // Perform logout
        mockMvc.perform(post("/api/auth/logout")
                .header("Authorization", "Bearer " + jwt))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Logout successful!"));
    }
}
