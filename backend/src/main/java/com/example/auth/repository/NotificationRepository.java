package com.example.auth.repository;

import com.example.auth.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, UUID> {
    List<Notification> findByUser(User user);
    List<Notification> findByNotificationType(NotificationType notificationType);
    List<Notification> findByStatus(NotificationStatus status);
    List<Notification> findByDeliveryMethod(DeliveryMethod deliveryMethod);
    
    List<Notification> findByUserAndStatus(User user, NotificationStatus status);
    List<Notification> findByUserAndNotificationType(User user, NotificationType notificationType);
    
    @Query("SELECT n FROM Notification n WHERE n.user = :user AND n.readAt IS NULL ORDER BY n.createdAt DESC")
    List<Notification> findUnreadNotificationsByUser(User user);
    
    @Query("SELECT n FROM Notification n WHERE n.status = 'PENDING' AND n.scheduledFor <= :now")
    List<Notification> findPendingNotificationsDueForSending(LocalDateTime now);
    
    @Query("SELECT n FROM Notification n WHERE n.createdAt BETWEEN :startDate AND :endDate")
    List<Notification> findByCreatedAtBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("SELECT n FROM Notification n WHERE n.user = :user AND n.createdAt >= :since ORDER BY n.createdAt DESC")
    List<Notification> findRecentNotificationsByUser(User user, LocalDateTime since);
    
    @Query("SELECT COUNT(n) FROM Notification n WHERE n.user = :user AND n.readAt IS NULL")
    Long countUnreadNotificationsByUser(User user);
    
    @Query("SELECT n FROM Notification n WHERE n.status = 'FAILED' AND n.createdAt >= :since")
    List<Notification> findFailedNotificationsSince(LocalDateTime since);
}