package com.example.auth;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.redirectedUrlPattern;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
public class OAuth2AuthorizationServerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @WithMockUser("user")
    public void whenAuthorizationCodeGrantFlow_thenTokenIsIssued() throws Exception {
        // Step 1: Request Authorization Code
        MvcResult result = mockMvc.perform(get("/oauth2/authorize")
                .param("response_type", "code")
                .param("client_id", "client")
                .param("scope", "openid")
                .param("redirect_uri", "http://127.0.0.1:8080/authorized")
                .param("state", "state"))
                .andExpect(status().isFound())
                .andExpect(redirectedUrlPattern("http://127.0.0.1:8080/authorized?code=*&state=state"))
                .andReturn();

        String redirectedUrl = result.getResponse().getRedirectedUrl();
        String authorizationCode = redirectedUrl.substring(redirectedUrl.indexOf("code=") + 5, redirectedUrl.indexOf("&state"));

        // Step 2: Exchange Authorization Code for Access Token
        mockMvc.perform(post("/oauth2/token")
                .param("grant_type", "authorization_code")
                .param("code", authorizationCode)
                .param("redirect_uri", "http://127.0.0.1:8080/authorized")
                .header("Authorization", "Basic " + java.util.Base64.getEncoder().encodeToString("client:secret".getBytes())))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.access_token").exists())
                .andExpect(jsonPath("$.refresh_token").exists())
                .andExpect(jsonPath("$.scope").value("openid"))
                .andExpect(jsonPath("$.token_type").value("Bearer"));
    }
}
