package com.example.auth.service;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import com.example.auth.dto.request.BookAppointmentRequest;
import com.example.auth.model.Appointment;
import com.example.auth.model.AppointmentMode;
import com.example.auth.model.AppointmentStatus;
import com.example.auth.model.AppointmentType;
import com.example.auth.model.Employee;
import com.example.auth.model.OHProfessional;
import com.example.auth.model.User;
import com.example.auth.repository.AppointmentRepository;
import com.example.auth.repository.EmployeeRepository;
import com.example.auth.repository.OHProfessionalRepository;
import com.example.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private OHProfessionalRepository ohProfessionalRepository;

    @Autowired
    private NotificationService notificationService;

    public List<String> getAvailableSlots(LocalDate date) {
        // In a real application, this would check calendars of OH professionals.
        // For now, we return a mock list of time slots.
        return Stream.of(
            "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
            "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
        ).collect(Collectors.toList());
    }

    @Transactional
    public Appointment bookAppointment(BookAppointmentRequest request) {
        Employee employee = employeeRepository.findById(request.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Employee profile not found"));

        OHProfessional professional = ohProfessionalRepository.findById(request.getProfessionalId())
                .orElseThrow(() -> new RuntimeException("OH Professional profile not found"));

        Appointment appointment = new Appointment();
        appointment.setEmployee(employee);
        appointment.setOhProfessional(professional);
        appointment.setAppointmentType(AppointmentType.valueOf(request.getAppointmentType().toUpperCase()));
        appointment.setAppointmentMode(AppointmentMode.valueOf(request.getAppointmentMode().toUpperCase()));
        appointment.setScheduledDate(request.getScheduledDateTime());
        appointment.setReason(request.getReason());
        appointment.setStatus(AppointmentStatus.SCHEDULED);

        Appointment savedAppointment = appointmentRepository.save(appointment);

        notificationService.scheduleAppointmentReminders(savedAppointment);

        return savedAppointment;
    }
}
