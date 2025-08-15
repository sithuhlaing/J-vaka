// Mock data structure based on NHS OH eHR specifications
// Aligned with docs/instructions.md complete data schema
export interface User {
  id: string
  email: string
  role: "employee" | "oh_professional" | "manager" | "admin"
  firstName: string
  lastName: string
  employeeNumber: string
  department: string
  phoneNumber: string
  avatar: string
  createdAt: string
  lastLogin: string
  preferences: {
    emailNotifications: boolean
    smsNotifications: boolean
    reminderPreference: string
  }
  twoFactorEnabled: boolean
}

export interface HealthRecord {
  id: string
  employeeId: string
  healthStatus: "healthy" | "needs_attention" | "high_risk" | "overdue"
  lastCheckupDate: string
  nextCheckupDue: string
  fitnessForWork: "fit" | "fit_with_restrictions" | "temporarily_unfit" | "permanently_unfit"
  medicalConditions: Array<{
    condition: string
    severity: string
    managed: boolean
    medication?: string
  }>
  vaccinations: Array<{
    vaccine: string
    date: string
    batchNumber: string
    nextDue: string
  }>
}

export interface Appointment {
  id: string
  employeeId: string
  professionalId: string
  appointmentType: "health_check" | "consultation" | "follow_up" | "emergency" | "pre_employment" | "return_to_work"
  appointmentMode: "in_person" | "virtual" | "phone"
  scheduledDate: string
  durationMinutes: number
  status: "scheduled" | "confirmed" | "in_progress" | "completed" | "cancelled" | "no_show"
  reason: string
  location: string
  notes: string
  professionalName?: string
}

export interface Notification {
  id: string
  userId: string
  type: "appointment_reminder" | "message_received" | "document_uploaded" | "system_alert" | "health_status_change"
  title: string
  message: string
  readAt: string | null
  createdAt: string
}

// Mock data
export const mockUsers: User[] = [
  {
    id: "usr_001",
    email: "employee@example.com",
    role: "employee",
    firstName: "John",
    lastName: "Doe",
    employeeNumber: "EMP001",
    department: "Emergency Medicine",
    phoneNumber: "+44 7700 900123",
    avatar: "https://ui-avatars.com/api/?name=John+Doe&background=005eb8&color=fff",
    createdAt: "2023-01-15T09:00:00Z",
    lastLogin: "2024-12-10T14:30:00Z",
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      reminderPreference: "24_hours",
    },
    twoFactorEnabled: false,
  },
  {
    id: "usr_002",
    email: "oh@example.com",
    role: "oh_professional",
    firstName: "Sarah",
    lastName: "Smith",
    employeeNumber: "OH001",
    department: "Occupational Health",
    phoneNumber: "+44 7700 900456",
    avatar: "https://ui-avatars.com/api/?name=Sarah+Smith&background=00703c&color=fff",
    createdAt: "2022-03-10T08:00:00Z",
    lastLogin: "2024-12-10T16:45:00Z",
    preferences: {
      emailNotifications: true,
      smsNotifications: true,
      reminderPreference: "12_hours",
    },
    twoFactorEnabled: true,
  },
  {
    id: "usr_003",
    email: "manager@example.com",
    role: "manager",
    firstName: "Michael",
    lastName: "Jones",
    employeeNumber: "MGR001",
    department: "Operations Management",
    phoneNumber: "+44 7700 900789",
    avatar: "https://ui-avatars.com/api/?name=Michael+Jones&background=330072&color=fff",
    createdAt: "2021-06-20T09:00:00Z",
    lastLogin: "2024-12-10T13:15:00Z",
    preferences: {
      emailNotifications: true,
      smsNotifications: true,
      reminderPreference: "6_hours",
    },
    twoFactorEnabled: true,
  },
  {
    id: "usr_004",
    email: "admin@example.com",
    role: "admin",
    firstName: "Emma",
    lastName: "Wilson",
    employeeNumber: "ADM001",
    department: "IT Administration",
    phoneNumber: "+44 7700 900321",
    avatar: "https://ui-avatars.com/api/?name=Emma+Wilson&background=d5281b&color=fff",
    createdAt: "2020-11-05T08:30:00Z",
    lastLogin: "2024-12-10T17:00:00Z",
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      reminderPreference: "2_hours",
    },
    twoFactorEnabled: true,
  },
]

export const mockHealthRecords: HealthRecord[] = [
  {
    id: "hr_001",
    employeeId: "usr_001",
    healthStatus: "healthy",
    lastCheckupDate: "2024-09-15",
    nextCheckupDue: "2025-03-15",
    fitnessForWork: "fit",
    medicalConditions: [
      {
        condition: "Mild Hypertension",
        severity: "low",
        managed: true,
        medication: "Lisinopril 10mg daily",
      },
    ],
    vaccinations: [
      {
        vaccine: "COVID-19",
        date: "2024-10-01",
        batchNumber: "CV2024001",
        nextDue: "2025-10-01",
      },
      {
        vaccine: "Influenza",
        date: "2024-09-15",
        batchNumber: "FLU2024002",
        nextDue: "2025-09-15",
      },
    ],
  },
]

export const mockAppointments: Appointment[] = [
  {
    id: "apt_001",
    employeeId: "usr_001",
    professionalId: "usr_002",
    appointmentType: "health_check",
    appointmentMode: "in_person",
    scheduledDate: "2024-12-15T10:00:00Z",
    durationMinutes: 30,
    status: "scheduled",
    reason: "Annual health check-up",
    location: "Occupational Health Center, Room 204",
    notes: "",
    professionalName: "Dr. Sarah Smith",
  },
  {
    id: "apt_002",
    employeeId: "usr_001",
    professionalId: "usr_002",
    appointmentType: "consultation",
    appointmentMode: "virtual",
    scheduledDate: "2024-12-12T14:30:00Z",
    durationMinutes: 20,
    status: "completed",
    reason: "Follow-up on hypertension management",
    location: "Video Call",
    notes: "Blood pressure readings stable. Continue current medication.",
    professionalName: "Dr. Sarah Smith",
  },
  {
    id: "apt_003",
    employeeId: "usr_001",
    professionalId: "usr_002",
    appointmentType: "consultation",
    appointmentMode: "virtual",
    scheduledDate: new Date(Date.now() + 30 * 60000).toISOString(), // 30 minutes from now
    durationMinutes: 30,
    status: "confirmed",
    reason: "Mental health check-in",
    location: "Video Call",
    notes: "",
    professionalName: "Dr. Sarah Smith",
  },
  {
    id: "apt_004",
    employeeId: "usr_003",
    professionalId: "usr_002",
    appointmentType: "follow_up",
    appointmentMode: "virtual",
    scheduledDate: new Date(Date.now() + 60 * 60000).toISOString(), // 1 hour from now
    durationMinutes: 20,
    status: "confirmed",
    reason: "Post-injury assessment",
    location: "Video Call",
    notes: "",
    professionalName: "Dr. Sarah Smith",
  },
]

export const mockNotifications: Notification[] = [
  {
    id: "not_001",
    userId: "usr_001",
    type: "appointment_reminder",
    title: "Appointment Reminder",
    message: "You have an appointment tomorrow at 10:00 AM with Dr. Sarah Smith",
    readAt: null,
    createdAt: "2024-12-14T10:00:00Z",
  },
  {
    id: "not_002",
    userId: "usr_001",
    type: "health_status_change",
    title: "Health Status Updated",
    message: "Your health status has been updated following your recent consultation",
    readAt: "2024-12-12T15:30:00Z",
    createdAt: "2024-12-12T15:00:00Z",
  },
]
