package com.example.auth.controller;

import com.example.auth.dto.LoginRequest;
import com.example.auth.dto.MessageResponse;
import com.example.auth.dto.SignupRequest;
import com.example.auth.dto.request.TokenRefreshRequest;
import com.example.auth.dto.response.JwtResponse;
import com.example.auth.model.User;
import com.example.auth.model.UserType;
import com.example.auth.repository.UserRepository;
import com.example.auth.service.AuthService;
import com.example.auth.validator.PasswordPolicyValidator;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private PasswordPolicyValidator passwordPolicyValidator;

    @PostMapping("/signin")
    public ResponseEntity<JwtResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, HttpServletRequest request) {
        String ipAddress = request.getRemoteAddr();
        String userAgent = request.getHeader("User-Agent");
        JwtResponse jwtResponse = authService.authenticateUser(loginRequest, ipAddress, userAgent);
        return ResponseEntity.ok(jwtResponse);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Determine user type from request
        UserType userType = UserType.EMPLOYEE; // Default
        if (signUpRequest.getUserType() != null) {
            try {
                userType = UserType.valueOf(signUpRequest.getUserType().toUpperCase());
            } catch (IllegalArgumentException e) {
                userType = UserType.EMPLOYEE;
            }
        }

        User user = new User(
                signUpRequest.getEmail(),
                signUpRequest.getUsername(),
                encoder.encode(signUpRequest.getPassword()),
                signUpRequest.getFirstName(),
                signUpRequest.getLastName(),
                userType
        );
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @PostMapping("/refreshtoken")
    public ResponseEntity<?> refreshToken(@Valid @RequestBody TokenRefreshRequest request) {
        return authService.refreshToken(request.getRefreshToken())
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().body(new MessageResponse("Error: Refresh token is not valid!")));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String jwt = authHeader.substring(7);
            authService.logout(jwt);
            return ResponseEntity.ok(new MessageResponse("Logout successful!"));
        }
        return ResponseEntity.badRequest().body(new MessageResponse("Error: Missing or invalid Authorization header."));
    }
}