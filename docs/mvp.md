Core MVP Features
1. Clinical Data Model Engine
Priority: CRITICAL
- Basic archetype/template system (simplified version)
- JSON-based clinical data models instead of ADL initially
- Runtime model validation
- Version control for data models
2. REST API Foundation
Priority: CRITICAL
- Patient/EHR management endpoints
- Clinical data CRUD operations
- Basic query interface
- Standard HTTP methods with JSON payloads
3. Data Storage Layer
Priority: CRITICAL
- Document-oriented database (MongoDB/PostgreSQL with JSONB)
- Patient-centric data organization
- Basic versioning of clinical records
- ACID transaction support
4. Authentication & Authorization
Priority: HIGH
- JWT-based authentication
- Role-based access control (Admin, Clinician, Read-only)
- Basic audit logging

```mermaid
graph TB
    subgraph "Frontend Layer (Future)"
        A[Web Dashboard]
        B[Mobile App]
        C[Third-party Apps]
    end
    
    subgraph "API Gateway Layer"
        D[REST API Gateway]
        E[Authentication Service]
        F[Rate Limiting]
    end
    
    subgraph "Core Services (MVP)"
        G[Patient/EHR Service]
        H[Clinical Data Service]
        I[Template Management Service]
        J[Query Service]
    end
    
    subgraph "Data Layer"
        K[(Primary Database)]
        L[Template Repository]
        M[Audit Log Store]
    end
    
    subgraph "MVP Core Features"
        N[Data Model Validation]
        O[Version Control]
        P[JSON Schema Engine]
        Q[Basic Search]
    end
    
    A --> D
    B --> D
    C --> D
    
    D --> E
    D --> F
    D --> G
    D --> H
    D --> I
    D --> J
    
    G --> K
    H --> K
    I --> L
    J --> K
    
    H --> N
    H --> O
    I --> P
    J --> Q
    
    N --> M
    O --> M
    
    classDef frontend fill:#e3f2fd
    classDef gateway fill:#f1f8e9
    classDef services fill:#fff3e0
    classDef data fill:#fce4ec
    classDef features fill:#e8f5e8
    
    class A,B,C frontend
    class D,E,F gateway
    class G,H,I,J services
    class K,L,M data
    class N,O,P,Q features
```

