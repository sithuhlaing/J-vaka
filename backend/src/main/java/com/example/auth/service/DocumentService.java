package com.example.auth.service;

import com.example.auth.dto.request.UploadDocumentRequest;
import com.example.auth.model.Document;
import com.example.auth.model.DocumentType;
import com.example.auth.model.Employee;
import com.example.auth.model.User;
import com.example.auth.repository.DocumentRepository;
import com.example.auth.repository.EmployeeRepository;
import com.example.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class DocumentService {

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public Document uploadDocument(UploadDocumentRequest request, User uploadedByUser) {
        Employee employee = employeeRepository.findById(request.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        Document document = new Document();
        document.setDocumentName(request.getDocumentName());
        document.setDocumentType(DocumentType.valueOf(request.getDocumentType().toUpperCase()));
        document.setFileSize(request.getFileSize());
        document.setEmployee(employee);
        document.setUploadedBy(uploadedByUser);
        // In a real app, you'd handle file storage and set file path, hash, etc.
        document.setFilePath("/uploads/placeholder.pdf");

        return documentRepository.save(document);
    }

    public Document getDocument(UUID documentId) {
        return documentRepository.findById(documentId)
                .orElseThrow(() -> new RuntimeException("Document not found"));
    }

    public List<Document> listUserDocuments(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Employee employee = employeeRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        return documentRepository.findByEmployee(employee);
    }

    public void deleteDocument(UUID documentId) {
        documentRepository.deleteById(documentId);
    }
}
