package com.example.auth.dto.response;

import java.time.LocalDateTime;
import java.util.UUID;

public class DocumentResponse {
    private UUID documentId;
    private String documentName;
    private String documentType;
    private long fileSize;
    private LocalDateTime uploadedAt;
    private UUID uploadedBy;

    public DocumentResponse(UUID documentId, String documentName, String documentType, long fileSize, LocalDateTime uploadedAt, UUID uploadedBy) {
        this.documentId = documentId;
        this.documentName = documentName;
        this.documentType = documentType;
        this.fileSize = fileSize;
        this.uploadedAt = uploadedAt;
        this.uploadedBy = uploadedBy;
    }

    // Getters and Setters
    public UUID getDocumentId() { return documentId; }
    public void setDocumentId(UUID documentId) { this.documentId = documentId; }
    public String getDocumentName() { return documentName; }
    public void setDocumentName(String documentName) { this.documentName = documentName; }
    public String getDocumentType() { return documentType; }
    public void setDocumentType(String documentType) { this.documentType = documentType; }
    public long getFileSize() { return fileSize; }
    public void setFileSize(long fileSize) { this.fileSize = fileSize; }
    public LocalDateTime getUploadedAt() { return uploadedAt; }
    public void setUploadedAt(LocalDateTime uploadedAt) { this.uploadedAt = uploadedAt; }
    public UUID getUploadedBy() { return uploadedBy; }
    public void setUploadedBy(UUID uploadedBy) { this.uploadedBy = uploadedBy; }
}
