package com.example.auth.repository;

import com.example.auth.model.Appointment;
import com.example.auth.model.AppointmentStatus;
import com.example.auth.model.AppointmentType;
import com.example.auth.model.Employee;
import com.example.auth.model.OHProfessional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, UUID> {
    List<Appointment> findByEmployee(Employee employee);
    List<Appointment> findByOhProfessional(OHProfessional ohProfessional);
    List<Appointment> findByStatus(AppointmentStatus status);
    List<Appointment> findByAppointmentType(AppointmentType appointmentType);
    
    List<Appointment> findByEmployeeAndStatus(Employee employee, AppointmentStatus status);
    List<Appointment> findByOhProfessionalAndStatus(OHProfessional ohProfessional, AppointmentStatus status);
    
    @Query("SELECT a FROM Appointment a WHERE a.scheduledDate BETWEEN :startDate AND :endDate")
    List<Appointment> findByScheduledDateBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("SELECT a FROM Appointment a WHERE a.employee = :employee AND a.scheduledDate BETWEEN :startDate AND :endDate")
    List<Appointment> findByEmployeeAndScheduledDateBetween(Employee employee, LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("SELECT a FROM Appointment a WHERE a.ohProfessional = :professional AND a.scheduledDate BETWEEN :startDate AND :endDate")
    List<Appointment> findByOhProfessionalAndScheduledDateBetween(OHProfessional professional, LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("SELECT a FROM Appointment a WHERE a.scheduledDate < :now AND a.status IN ('SCHEDULED', 'CONFIRMED')")
    List<Appointment> findOverdueAppointments(LocalDateTime now);
}