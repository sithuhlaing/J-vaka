package com.example.auth.repository;

import com.example.auth.model.DataAccessLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface DataAccessLogRepository extends JpaRepository<DataAccessLog, UUID> {
}