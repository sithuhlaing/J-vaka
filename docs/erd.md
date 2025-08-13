erDiagram
    %% ======================================
    %% AUTH SERVICE - User Management & Security
    %% ======================================
    
    USERS {
        uuid user_id PK
        string email UK
        string username UK
        string password_hash
        string first_name
        string last_name
        enum user_type "employee,oh_professional,manager,admin"
        enum status "active,inactive"
        timestamp created_at
        timestamp updated_at
        timestamp last_login
    }

    USER_SESSIONS {
        uuid session_id PK
        uuid user_id FK
        string jwt_token
        string refresh_token
        timestamp expires_at
        string ip_address
        string user_agent
        timestamp created_at
    }

    %% ======================================
    %% EMPLOYEE SERVICE - Core Employee Data
    %% ======================================
    
    EMPLOYEES {
        uuid employee_id PK
        uuid user_id FK
        string employee_number UK
        string title
        date date_of_birth
        enum gender "male,female,other,prefer_not_to_say"
        string phone_number
        text address
        string postcode
        string emergency_contact_name
        string emergency_contact_phone
        string department
        string job_title
        date start_date
        enum employment_status "active,inactive,terminated"
        timestamp created_at
        timestamp updated_at
    }

    EMPLOYEE_HEALTH_INFO {
        uuid health_info_id PK
        uuid employee_id FK
        string nhs_number
        string gp_name
        string gp_address
        enum blood_group "A+,A-,B+,B-,AB+,AB-,O+,O-,unknown"
        json allergies
        json medications
        json medical_conditions
        text health_notes
        timestamp created_at
        timestamp updated_at
    }

    %% ======================================
    %% APPOINTMENT SERVICE - Scheduling & Professionals
    %% ======================================
    
    OH_PROFESSIONALS {
        uuid professional_id PK
        uuid user_id FK
        string registration_number
        string specialization
        json working_hours
        boolean is_available
        timestamp created_at
        timestamp updated_at
    }

    APPOINTMENTS {
        uuid appointment_id PK
        uuid employee_id FK
        uuid professional_id FK
        enum appointment_type "consultation,health_check,follow_up,emergency"
        enum appointment_mode "in_person,virtual,phone"
        datetime scheduled_date
        int duration_minutes
        enum status "scheduled,confirmed,in_progress,completed,cancelled,no_show"
        string location
        text reason
        text notes
        timestamp created_at
        timestamp updated_at
    }

    %% ======================================
    %% DOCUMENT SERVICE - File Management
    %% ======================================
    
    DOCUMENTS {
        uuid document_id PK
        uuid employee_id FK
        string document_name
        enum document_type "health_certificate,medical_report,form,image,other"
        string file_path
        string file_name
        string mime_type
        bigint file_size
        string file_hash
        enum access_level "private,shared,public"
        uuid uploaded_by FK
        timestamp uploaded_at
        timestamp updated_at
    }

    %% ======================================
    %% TELEMEDICINE SERVICE - Video Sessions
    %% ======================================
    
    VIDEO_SESSIONS {
        uuid session_id PK
        uuid appointment_id FK
        string meeting_room_id
        string session_url
        datetime started_at
        datetime ended_at
        enum status "waiting,active,ended,failed"
        json session_config
        timestamp created_at
    }

    SESSION_PARTICIPANTS {
        uuid participant_id PK
        uuid session_id FK
        uuid user_id FK
        datetime joined_at
        datetime left_at
        enum role "host,participant"
        json connection_info
    }

    %% ======================================
    %% MESSAGING SERVICE - Communications
    %% ======================================
    
    CONVERSATIONS {
        uuid conversation_id PK
        string conversation_name
        enum conversation_type "direct,group"
        uuid created_by FK
        timestamp created_at
        timestamp updated_at
    }

    CONVERSATION_PARTICIPANTS {
        uuid participant_id PK
        uuid conversation_id FK
        uuid user_id FK
        datetime joined_at
        boolean is_active
    }

    MESSAGES {
        uuid message_id PK
        uuid conversation_id FK
        uuid sender_id FK
        text message_content
        enum message_type "text,file,image"
        json attachments
        boolean is_deleted
        timestamp sent_at
    }

    MESSAGE_READS {
        uuid read_id PK
        uuid message_id FK
        uuid user_id FK
        timestamp read_at
    }

    %% ======================================
    %% NOTIFICATION SERVICE - Alerts & Reminders
    %% ======================================
    
    NOTIFICATIONS {
        uuid notification_id PK
        uuid user_id FK
        enum notification_type "appointment_reminder,message_alert,system_notification"
        string title
        text message
        enum delivery_method "email,sms,push,in_app"
        enum status "pending,sent,delivered,read,failed"
        datetime scheduled_for
        datetime sent_at
        datetime read_at
        timestamp created_at
    }

    %% ======================================
    %% SHARED/AUDIT - Cross-cutting Concerns
    %% ======================================
    
    AUDIT_LOGS {
        uuid audit_id PK
        uuid user_id FK
        string service_name
        string entity_type
        uuid entity_id
        enum action "create,read,update,delete,login,logout"
        json old_values
        json new_values
        string ip_address
        timestamp created_at
    }

    %% ======================================
    %% RELATIONSHIPS - MVP Focused
    %% ======================================
    
    %% Auth Service Relationships
    USERS ||--o{ USER_SESSIONS : "has"
    USERS ||--o{ EMPLOYEES : "is"
    USERS ||--o{ OH_PROFESSIONALS : "is"
    
    %% Employee Service Relationships
    EMPLOYEES ||--|| EMPLOYEE_HEALTH_INFO : "has"
    
    %% Appointment Service Relationships
    EMPLOYEES ||--o{ APPOINTMENTS : "books"
    OH_PROFESSIONALS ||--o{ APPOINTMENTS : "conducts"
    
    %% Document Service Relationships
    EMPLOYEES ||--o{ DOCUMENTS : "owns"
    USERS ||--o{ DOCUMENTS : "uploads"
    
    %% Telemedicine Service Relationships
    APPOINTMENTS ||--o| VIDEO_SESSIONS : "may_have"
    VIDEO_SESSIONS ||--o{ SESSION_PARTICIPANTS : "has"
    USERS ||--o{ SESSION_PARTICIPANTS : "participates"
    
    %% Messaging Service Relationships
    USERS ||--o{ CONVERSATIONS : "creates"
    CONVERSATIONS ||--o{ CONVERSATION_PARTICIPANTS : "has"
    CONVERSATIONS ||--o{ MESSAGES : "contains"
    USERS ||--o{ CONVERSATION_PARTICIPANTS : "participates"
    USERS ||--o{ MESSAGES : "sends"
    MESSAGES ||--o{ MESSAGE_READS : "read_by"
    
    %% Notification Service Relationships
    USERS ||--o{ NOTIFICATIONS : "receives"
    
    %% Audit Relationships
    USERS ||--o{ AUDIT_LOGS : "generates"

---

%% MVP Service Boundaries Visualization
graph TB
    subgraph "AUTH SERVICE"
        A1[USERS]
        A2[USER_SESSIONS]
    end
    
    subgraph "EMPLOYEE SERVICE"
        E1[EMPLOYEES]
        E2[EMPLOYEE_HEALTH_INFO]
    end
    
    subgraph "APPOINTMENT SERVICE"
        AP1[OH_PROFESSIONALS]
        AP2[APPOINTMENTS]
    end
    
    subgraph "DOCUMENT SERVICE"
        D1[DOCUMENTS]
    end
    
    subgraph "TELEMEDICINE SERVICE"
        T1[VIDEO_SESSIONS]
        T2[SESSION_PARTICIPANTS]
    end
    
    subgraph "MESSAGING SERVICE"
        M1[CONVERSATIONS]
        M2[CONVERSATION_PARTICIPANTS]
        M3[MESSAGES]
        M4[MESSAGE_READS]
    end
    
    subgraph "NOTIFICATION SERVICE"
        N1[NOTIFICATIONS]
    end
    
    subgraph "SHARED/AUDIT"
        AU1[AUDIT_LOGS]
    end

    %% Service Dependencies (Minimal for MVP)
    A1 -.-> E1
    A1 -.-> AP1
    E1 -.-> AP2
    AP2 -.-> T1
    A1 -.-> M1
    A1 -.-> N1

---

%% MVP Implementation Phases
graph LR
    subgraph "Phase 1: Core Foundation"
        P1A[Auth Service]
        P1B[Employee Service]
        P1C[Basic Appointments]
    end
    
    subgraph "Phase 2: Communication"
        P2A[Document Service]
        P2B[Messaging Service]
        P2C[Notifications]
    end
    
    subgraph "Phase 3: Advanced Features"
        P3A[Telemedicine Service]
        P3B[Video Integration]
    end
    
    subgraph "Future Extensions"
        F1[Reporting Service]
        F2[Workplace Safety]
        F3[Compliance Module]
        F4[Advanced Analytics]
    end
    
    P1A --> P1B
    P1B --> P1C
    P1C --> P2A
    P2A --> P2B
    P2B --> P2C
    P2C --> P3A
    P3A --> P3B
    P3B --> F1
    F1 --> F2
    F2 --> F3
    F3 --> F4