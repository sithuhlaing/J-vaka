package com.example.auth.controller;

import com.example.auth.dto.request.UploadDocumentRequest;
import com.example.auth.dto.response.DocumentResponse;
import com.example.auth.model.Document;
import com.example.auth.model.User;
import com.example.auth.repository.UserRepository;
import com.example.auth.service.DocumentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin(origins = "*", maxAge = 3600)
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<DocumentResponse> uploadDocument(@Valid @RequestBody UploadDocumentRequest request, Authentication authentication) {
        User currentUser = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Document document = documentService.uploadDocument(request, currentUser);
        return ResponseEntity.ok(toResponse(document));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DocumentResponse> getDocument(@PathVariable UUID id) {
        Document document = documentService.getDocument(id);
        return ResponseEntity.ok(toResponse(document));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<DocumentResponse>> getUserDocuments(@PathVariable UUID userId) {
        List<Document> documents = documentService.listUserDocuments(userId);
        List<DocumentResponse> response = documents.stream().map(this::toResponse).collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDocument(@PathVariable UUID id) {
        documentService.deleteDocument(id);
        return ResponseEntity.ok().build();
    }

    private DocumentResponse toResponse(Document doc) {
        return new DocumentResponse(
            doc.getDocumentId(),
            doc.getDocumentName(),
            doc.getDocumentType().name(),
            doc.getFileSize(),
            doc.getUploadedAt(),
            doc.getUploadedBy().getUserId()
        );
    }
}
