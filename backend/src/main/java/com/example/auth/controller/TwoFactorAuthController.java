package com.example.auth.controller;

import com.example.auth.dto.MessageResponse;
import com.example.auth.model.User;
import com.example.auth.repository.UserRepository;
import com.example.auth.service.TwoFactorAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/2fa")
@CrossOrigin(origins = "*", maxAge = 3600)
public class TwoFactorAuthController {

    @Autowired
    private TwoFactorAuthService twoFactorAuthService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/setup")
    public ResponseEntity<?> setup2FA(Authentication authentication) {
        User user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String secret = twoFactorAuthService.generateNewSecret();
        user.setTwoFactorSecret(secret);
        userRepository.save(user);

        String qrCodeUrl = twoFactorAuthService.getQRCodeUrl(secret, user.getEmail(), "MyApp");

        return ResponseEntity.ok(Map.of("secret", secret, "qrCodeUrl", qrCodeUrl));
    }

    @PostMapping("/enable")
    public ResponseEntity<?> enable2FA(Authentication authentication, @RequestBody Map<String, String> body) {
        User user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String code = body.get("code");
        if (code == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Code is required."));
        }

        if (twoFactorAuthService.validateCode(user.getTwoFactorSecret(), code)) {
            user.setTwoFactorEnabled(true);
            userRepository.save(user);
            return ResponseEntity.ok(new MessageResponse("2FA enabled successfully."));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Invalid 2FA code."));
        }
    }
}
