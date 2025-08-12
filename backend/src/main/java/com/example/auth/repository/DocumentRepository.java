package com.example.auth.repository;

import com.example.auth.model.AccessLevel;
import com.example.auth.model.Document;
import com.example.auth.model.DocumentType;
import com.example.auth.model.Employee;
import com.example.auth.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface DocumentRepository extends JpaRepository<Document, UUID> {
    List<Document> findByEmployee(Employee employee);
    List<Document> findByUploadedBy(User uploadedBy);
    List<Document> findByDocumentType(DocumentType documentType);
    List<Document> findByAccessLevel(AccessLevel accessLevel);
    
    List<Document> findByEmployeeAndDocumentType(Employee employee, DocumentType documentType);
    List<Document> findByEmployeeAndAccessLevel(Employee employee, AccessLevel accessLevel);
    
    Optional<Document> findByFileHash(String fileHash);
    Optional<Document> findByFilePath(String filePath);
    
    @Query("SELECT d FROM Document d WHERE d.employee = :employee AND d.accessLevel IN ('SHARED', 'PUBLIC')")
    List<Document> findAccessibleDocumentsByEmployee(Employee employee);
    
    @Query("SELECT d FROM Document d WHERE d.accessLevel = 'PUBLIC'")
    List<Document> findPublicDocuments();
    
    @Query("SELECT d FROM Document d WHERE d.uploadedAt BETWEEN :startDate AND :endDate")
    List<Document> findByUploadedAtBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("SELECT d FROM Document d WHERE d.employee = :employee AND d.uploadedAt BETWEEN :startDate AND :endDate")
    List<Document> findByEmployeeAndUploadedAtBetween(Employee employee, LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("SELECT d FROM Document d WHERE LOWER(d.documentName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(d.fileName) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Document> searchDocuments(String searchTerm);
}