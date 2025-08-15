package com.example.auth.controller;

import com.example.auth.model.Employee;
import com.example.auth.model.OHProfessional;
import com.example.auth.model.User;
import com.example.auth.repository.EmployeeRepository;
import com.example.auth.repository.OHProfessionalRepository;
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

import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class AppointmentControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private OHProfessionalRepository ohProfessionalRepository;

    private User employeeUser;
    private Employee testEmployee;
    private User professionalUser;
    private OHProfessional testProfessional;


    @BeforeEach
    public void setup() {
        // Create users needed for tests
        employeeUser = new User("employee-test@example.com", "employee-test", "password", "Employee", "Test", com.example.auth.model.UserType.EMPLOYEE);
        userRepository.save(employeeUser);

        testEmployee = new Employee();
        testEmployee.setUser(employeeUser);
        testEmployee.setEmployeeNumber("EMP-001");
        employeeRepository.save(testEmployee);

        professionalUser = new User("prof-test@example.com", "prof-test", "password", "Professional", "Test", com.example.auth.model.UserType.OH_PROFESSIONAL);
        userRepository.save(professionalUser);

        testProfessional = new OHProfessional();
        testProfessional.setUser(professionalUser);
        testProfessional.setSpecialization("General Practice");
        ohProfessionalRepository.save(testProfessional);
    }

    @Test
    @WithMockUser("employee-test")
    public void whenGetSlots_thenReturnsSlots() throws Exception {
        mockMvc.perform(get("/api/appointments/slots")
                .param("date", LocalDate.now().plusDays(1).toString()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    @WithMockUser("employee-test")
    public void whenBookAppointment_thenReturnsCreated() throws Exception {
        LocalDateTime scheduledTime = LocalDateTime.now().plusDays(5).withNano(0); // Remove nanos for clean ISO string
        String bookAppointmentRequestJson = String.format("""
            {
                "employeeId": "%s",
                "professionalId": "%s",
                "appointmentType": "CONSULTATION",
                "appointmentMode": "VIRTUAL",
                "scheduledDateTime": "%s",
                "reason": "Test consultation"
            }
            """, testEmployee.getEmployeeId(), testProfessional.getProfessionalId(), scheduledTime.toString());

        mockMvc.perform(post("/api/appointments")
                .contentType(MediaType.APPLICATION_JSON)
                .content(bookAppointmentRequestJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.appointmentId").exists());
    }
}
