package com.example.auth.controller;

import com.example.auth.dto.MessageResponse;
import com.example.auth.dto.request.ForgotPasswordRequest;
import com.example.auth.dto.request.ResetPasswordRequest;
import com.example.auth.service.PasswordResetService;
import com.example.auth.validator.PasswordPolicyValidator;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/password")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PasswordResetController {

    @Autowired
    private PasswordResetService passwordResetService;

    @Autowired
    private PasswordPolicyValidator passwordPolicyValidator;

    @PostMapping("/forgot")
    public ResponseEntity<?> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        try {
            String token = passwordResetService.generateResetToken(request.getEmail());
            // In a real application, we would email the token to the user.
            // For this example, we return it in the response for testing purposes.
            return ResponseEntity.ok(new MessageResponse("Password reset token generated successfully. Check your email. Token: " + token));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

    @PostMapping("/reset")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        if (!passwordPolicyValidator.validate(request.getNewPassword())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Password does not meet policy requirements. " + passwordPolicyValidator.getPolicyDescription()));
        }

        try {
            passwordResetService.resetPassword(request.getToken(), request.getNewPassword());
            return ResponseEntity.ok(new MessageResponse("Password has been reset successfully."));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }
}
