package com.example.auth.controller;

import com.example.auth.model.Employee;
import com.example.auth.model.User;
import com.example.auth.repository.EmployeeRepository;
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

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class DocumentControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    private User testUser;
    private Employee testEmployee;

    @BeforeEach
    public void setup() {
        testUser = new User("doc-user@example.com", "doc-user", "password", "Doc", "User", com.example.auth.model.UserType.EMPLOYEE);
        userRepository.save(testUser);

        testEmployee = new Employee();
        testEmployee.setUser(testUser);
        testEmployee.setEmployeeNumber("DOC-001");
        employeeRepository.save(testEmployee);
    }

    @Test
    @WithMockUser("doc-user")
    public void whenUploadDocument_thenReturnsOk() throws Exception {
        String uploadRequestJson = String.format("""
            {
                "documentName": "Test Document",
                "documentType": "OTHER",
                "fileSize": 12345,
                "employeeId": "%s"
            }
            """, testEmployee.getEmployeeId());

        mockMvc.perform(post("/api/documents")
                .contentType(MediaType.APPLICATION_JSON)
                .content(uploadRequestJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.documentId").exists())
                .andExpect(jsonPath("$.documentName").value("Test Document"));
    }
}
