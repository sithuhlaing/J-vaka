package com.example.auth.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "data_access_log")
@Data
@NoArgsConstructor
public class DataAccessLog {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "log_id")
    private UUID logId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "accessor_id", nullable = false)
    private User accessor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @Column(name = "data_type", nullable = false)
    private String dataType;

    @Column(name = "access_timestamp", nullable = false)
    private LocalDateTime accessTimestamp;

    public DataAccessLog(User accessor, Employee employee, String dataType) {
        this.accessor = accessor;
        this.employee = employee;
        this.dataType = dataType;
        this.accessTimestamp = LocalDateTime.now();
    }
}