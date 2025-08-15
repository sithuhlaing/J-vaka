package com.example.auth.service;

import com.example.auth.model.Appointment;
import com.example.auth.model.Notification;
import com.example.auth.model.NotificationStatus;
import com.example.auth.model.User;
import com.example.auth.model.NotificationType;
import com.example.auth.repository.NotificationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class NotificationService {

    private static final Logger logger = LoggerFactory.getLogger(NotificationService.class);

    @Autowired
    private NotificationRepository notificationRepository;

    @Transactional
    public void scheduleAppointmentReminders(Appointment appointment) {
        // Schedule a reminder 24 hours before the appointment
        Notification reminder = new Notification();
        reminder.setUser(appointment.getEmployee().getUser());
        reminder.setNotificationType(NotificationType.APPOINTMENT_REMINDER);
        reminder.setTitle("Upcoming Appointment Reminder");
        reminder.setMessage("You have an appointment tomorrow with " + appointment.getOhProfessional().getUser().getFirstName() + " " + appointment.getOhProfessional().getUser().getLastName());
        reminder.setScheduledFor(appointment.getScheduledDate().minusDays(1));
        reminder.setStatus(NotificationStatus.PENDING);

        notificationRepository.save(reminder);

        logger.info("Scheduled a 24-hour reminder for appointment ID: {}", appointment.getAppointmentId());
    }

    @Transactional
    public void createNotification(User user, String title, String message, NotificationType type) {
        Notification notification = new Notification();
        notification.setUser(user);
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setNotificationType(type);
        notification.setStatus(NotificationStatus.PENDING);
        notificationRepository.save(notification);
        logger.info("Created {} notification for user {}: {}", type, user.getUserId(), title);
    }
}
