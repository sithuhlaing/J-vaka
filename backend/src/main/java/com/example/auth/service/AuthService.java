package com.example.auth.service;

import com.example.auth.dto.LoginRequest;
import com.example.auth.dto.response.JwtResponse;
import com.example.auth.dto.response.TokenRefreshResponse;
import com.example.auth.model.User;
import com.example.auth.model.UserSession;
import com.example.auth.repository.UserRepository;
import com.example.auth.repository.UserSessionRepository;
import com.example.auth.security.UserPrincipal;
import com.example.auth.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserSessionService userSessionService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserSessionRepository userSessionRepository;

    @Value("${app.jwtExpirationMs:86400000}")
    private int jwtExpirationMs;

    @Value("${app.refreshTokenExpirationMs:604800000}")
    private int refreshTokenExpirationMs;


    public JwtResponse authenticateUser(LoginRequest loginRequest, String ipAddress, String userAgent) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        User user = userRepository.findByUsername(userPrincipal.getUsername())
                .orElseThrow(() -> new RuntimeException("Error: User not found."));

        String refreshToken = generateRefreshToken(user);

        LocalDateTime jwtExpiry = LocalDateTime.now().plusNanos((long)jwtExpirationMs * 1_000_000);

        userSessionService.createSession(user, jwt, refreshToken, jwtExpiry, ipAddress, userAgent);

        return new JwtResponse(jwt,
                               refreshToken,
                               userPrincipal.getUserId(),
                               userPrincipal.getUsername(),
                               userPrincipal.getEmail(),
                               userPrincipal.getFirstName(),
                               userPrincipal.getLastName(),
                               userPrincipal.getAuthorities().stream()
                                   .map(item -> item.getAuthority())
                                   .collect(Collectors.toList()));
    }

    private String generateRefreshToken(User user) {
        // In a real application, this would be a more robust, cryptographically secure random string
        return UUID.randomUUID().toString();
    }

    public Optional<TokenRefreshResponse> refreshToken(String requestRefreshToken) {
        return userSessionService.findByRefreshToken(requestRefreshToken)
            .map(userSessionService::verifyExpiration)
            .map(userSession -> {
                // Invalidate the old session by deleting it
                userSessionRepository.delete(userSession);

                // Create a new token and a new refresh token
                User user = userSession.getUser();
                String newJwt = jwtUtils.generateTokenFromUsername(user.getUsername());
                String newRefreshToken = generateRefreshToken(user);

                // Create a new session with the new refresh token
                LocalDateTime newRefreshTokenExpiry = LocalDateTime.now().plusNanos((long)refreshTokenExpirationMs * 1_000_000);
                userSessionService.createSession(user, newJwt, newRefreshToken, newRefreshTokenExpiry, userSession.getIpAddress(), userSession.getUserAgent());

                return new TokenRefreshResponse(newJwt, newRefreshToken);
            });
    }

    public void logout(String jwt) {
        userSessionService.invalidateSessionByJwt(jwt);
    }
}
