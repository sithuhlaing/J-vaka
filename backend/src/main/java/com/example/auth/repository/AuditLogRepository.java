package com.example.auth.repository;

import com.example.auth.model.AuditAction;
import com.example.auth.model.AuditLog;
import com.example.auth.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface AuditLogRepository extends JpaRepository<AuditLog, UUID> {
    List<AuditLog> findByUser(User user);
    List<AuditLog> findByAction(AuditAction action);
    List<AuditLog> findByServiceName(String serviceName);
    List<AuditLog> findByEntityType(String entityType);
    List<AuditLog> findByEntityId(UUID entityId);
    
    List<AuditLog> findByUserAndAction(User user, AuditAction action);
    List<AuditLog> findByEntityTypeAndEntityId(String entityType, UUID entityId);
    
    @Query("SELECT al FROM AuditLog al WHERE al.createdAt BETWEEN :startDate AND :endDate")
    List<AuditLog> findByCreatedAtBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("SELECT al FROM AuditLog al WHERE al.user = :user AND al.createdAt BETWEEN :startDate AND :endDate")
    List<AuditLog> findByUserAndCreatedAtBetween(User user, LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("SELECT al FROM AuditLog al WHERE al.action = :action AND al.createdAt BETWEEN :startDate AND :endDate")
    List<AuditLog> findByActionAndCreatedAtBetween(AuditAction action, LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("SELECT al FROM AuditLog al WHERE al.entityType = :entityType AND al.entityId = :entityId ORDER BY al.createdAt DESC")
    List<AuditLog> findEntityHistoryOrderByCreatedAtDesc(String entityType, UUID entityId);
    
    @Query("SELECT al FROM AuditLog al WHERE al.user = :user ORDER BY al.createdAt DESC")
    List<AuditLog> findByUserOrderByCreatedAtDesc(User user);
    
    @Query("SELECT al FROM AuditLog al WHERE al.ipAddress = :ipAddress AND al.createdAt >= :since")
    List<AuditLog> findByIpAddressAndCreatedAtAfter(String ipAddress, LocalDateTime since);
    
    @Query("SELECT COUNT(al) FROM AuditLog al WHERE al.user = :user AND al.action = 'LOGIN' AND al.createdAt >= :since")
    Long countUserLoginsSince(User user, LocalDateTime since);
}