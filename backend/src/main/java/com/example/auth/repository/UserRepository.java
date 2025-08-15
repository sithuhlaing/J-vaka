package com.example.auth.repository;

import com.example.auth.model.User;
import com.example.auth.model.UserStatus;
import com.example.auth.model.UserType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    Optional<User> findByPasswordResetToken(String token);
    Optional<User> findByUserId(UUID userId);
    
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
    
    List<User> findByUserType(UserType userType);
    List<User> findByStatus(UserStatus status);
    List<User> findByUserTypeAndStatus(UserType userType, UserStatus status);
}