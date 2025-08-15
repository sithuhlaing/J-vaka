# OH eHR Complete Implementation Specifications

## 1. Interaction Specifications

### User Interaction Patterns
```json
{
  "interaction_patterns": {
    "authentication": {
      "login_flow": {
        "email_input": {
          "events": ["onBlur", "onChange"],
          "validation": "real_time",
          "feedback": "inline_error",
          "accessibility": {
            "aria_describedby": "email-error",
            "role": "textbox",
            "autocomplete": "email"
          }
        },
        "role_selection": {
          "events": ["onChange"],
          "behavior": "update_redirect_route",
          "validation": "required",
          "accessibility": {
            "aria_label": "Select your role",
            "role": "combobox"
          }
        },
        "submit_button": {
          "events": ["onClick"],
          "loading_state": true,
          "disabled_during_submission": true,
          "keyboard": ["Enter"],
          "accessibility": {
            "aria_label": "Sign in to OH eHR system"
          }
        }
      }
    },
    "navigation": {
      "main_navigation": {
        "desktop": {
          "type": "sidebar",
          "position": "left",
          "width": "240px",
          "collapsible": true,
          "active_state": "highlight_current_page",
          "keyboard_navigation": {
            "tab": "focus_next_item",
            "enter": "activate_link",
            "space": "activate_link"
          }
        },
        "mobile": {
          "type": "bottom_tabs",
          "height": "64px",
          "icons_only": true,
          "badge_position": "top_right",
          "swipe_gestures": false
        },
        "interactions": {
          "hover": "show_tooltip",
          "focus": "outline_indicator",
          "active": "background_highlight"
        }
      },
      "breadcrumbs": {
        "separator": ">",
        "max_items": 4,
        "truncation": "middle",
        "click_behavior": "navigate_to_level",
        "accessibility": {
          "aria_label": "Breadcrumb navigation",
          "role": "navigation"
        }
      }
    },
    "forms": {
      "appointment_booking": {
        "wizard_navigation": {
          "step_indicator": {
            "type": "progress_bar",
            "show_step_numbers": true,
            "click_behavior": "navigate_to_completed_step"
          },
          "next_button": {
            "validation": "validate_current_step",
            "disabled_states": "incomplete_required_fields",
            "loading_state": "processing"
          },
          "back_button": {
            "behavior": "preserve_data",
            "confirmation": false
          }
        },
        "calendar_selection": {
          "type": "date_picker",
          "disabled_dates": "unavailable_days",
          "keyboard_navigation": {
            "arrow_keys": "navigate_dates",
            "enter": "select_date",
            "escape": "close_calendar"
          },
          "accessibility": {
            "role": "grid",
            "aria_label": "Choose appointment date"
          }
        },
        "time_slot_selection": {
          "type": "button_grid",
          "columns": { "mobile": 2, "desktop": 4 },
          "disabled_state": "unavailable_times",
          "selection": "single_select",
          "visual_feedback": "immediate_highlight"
        }
      },
      "document_upload": {
        "drag_drop": {
          "zone": "entire_modal",
          "visual_feedback": "border_highlight",
          "file_validation": "immediate",
          "error_handling": "inline_message"
        },
        "file_browser": {
          "multiple": false,
          "accept": ".pdf,.jpg,.jpeg,.png,.doc,.docx",
          "max_size": "50MB",
          "progress_indicator": "percentage_bar"
        },
        "preview": {
          "image_files": "thumbnail_preview",
          "pdf_files": "first_page_preview",
          "document_files": "file_icon_preview"
        }
      },
      "validation": {
        "timing": "on_blur_and_submit",
        "display": "inline_with_icon",
        "error_summary": "top_of_form",
        "focus_management": "first_error_field",
        "accessibility": {
          "announce_errors": true,
          "error_descriptions": "aria_describedby"
        }
      }
    },
    "data_tables": {
      "patient_records": {
        "sorting": {
          "click_header": "toggle_sort_direction",
          "visual_indicator": "arrow_icon",
          "keyboard": "enter_space",
          "multi_column": false
        },
        "filtering": {
          "search_input": {
            "debounce": "300ms",
            "clear_button": true,
            "keyboard_shortcuts": ["ctrl+f"]
          },
          "filter_dropdowns": {
            "multi_select": true,
            "clear_option": "All",
            "apply_button": false
          }
        },
        "pagination": {
          "type": "numbered_with_prev_next",
          "page_sizes": [10, 20, 50],
          "show_total_count": true,
          "keyboard_navigation": true
        },
        "row_interactions": {
          "hover": "highlight_row",
          "click": "select_row",
          "double_click": "open_detail_view",
          "keyboard": {
            "arrow_up_down": "navigate_rows",
            "enter": "open_detail",
            "space": "select_row"
          }
        }
      }
    },
    "video_calling": {
      "controls": {
        "microphone_toggle": {
          "visual_states": ["muted", "unmuted"],
          "keyboard_shortcut": "ctrl+m",
          "confirmation": "mute_action_only"
        },
        "camera_toggle": {
          "visual_states": ["camera_off", "camera_on"],
          "keyboard_shortcut": "ctrl+shift+v",
          "preview": "before_enabling"
        },
        "screen_share": {
          "browser_permission": "request_on_click",
          "stop_sharing": "floating_control",
          "keyboard_shortcut": "ctrl+shift+s"
        },
        "end_call": {
          "confirmation_dialog": true,
          "keyboard_shortcut": "ctrl+shift+h",
          "style": "danger_button"
        }
      },
      "chat_panel": {
        "toggle": "slide_animation",
        "message_input": {
          "auto_resize": true,
          "max_height": "100px",
          "send_on_enter": true,
          "shift_enter": "new_line"
        },
        "file_sharing": {
          "drag_drop": true,
          "max_size": "10MB",
          "preview": "inline"
        }
      }
    },
    "messaging": {
      "conversation_list": {
        "search": {
          "placeholder": "Search conversations...",
          "debounce": "300ms",
          "highlight_matches": true
        },
        "unread_indicators": {
          "badge": "count_based",
          "bold_text": "unread_messages",
          "blue_dot": "new_conversation"
        },
        "selection": {
          "click": "open_conversation",
          "keyboard": "enter_key",
          "active_state": "background_highlight"
        }
      },
      "message_interface": {
        "message_grouping": "same_sender_within_5min",
        "timestamp_display": "on_hover_or_tap",
        "message_status": ["sent", "delivered", "read"],
        "typing_indicator": "animated_dots",
        "scroll_behavior": "auto_scroll_to_new",
        "keyboard_shortcuts": {
          "ctrl+enter": "send_message",
          "escape": "close_chat"
        }
      }
    },
    "notifications": {
      "toast_notifications": {
        "position": "top_right",
        "duration": "5_seconds",
        "dismissible": true,
        "stack_limit": 3,
        "types": {
          "success": { "icon": "check", "color": "green" },
          "error": { "icon": "alert", "color": "red" },
          "warning": { "icon": "warning", "color": "amber" },
          "info": { "icon": "info", "color": "blue" }
        },
        "accessibility": {
          "role": "alert",
          "announce": true,
          "focus_management": false
        }
      },
      "notification_center": {
        "modal_behavior": "overlay",
        "max_height": "80vh",
        "auto_refresh": "30_seconds",
        "mark_as_read": "on_view",
        "infinite_scroll": true
      }
    },
    "accessibility": {
      "keyboard_navigation": {
        "tab_order": "logical_flow",
        "skip_links": ["main_content", "navigation"],
        "focus_traps": ["modals", "dropdowns"],
        "escape_key": "close_overlays"
      },
      "screen_reader": {
        "announcements": "page_changes",
        "live_regions": ["notifications", "form_errors"],
        "descriptive_links": "avoid_click_here",
        "button_labels": "action_specific"
      },
      "motor_impairments": {
        "click_target_size": "44px_minimum",
        "hover_delays": "500ms_minimum",
        "double_click_prevention": true
      }
    }
  }
}
```

## 2. Mock Data Structure

### Complete Data Schema
```json
{
  "mock_data_structure": {
    "users": {
      "schema": {
        "id": "string (uuid)",
        "email": "string (email)",
        "role": "enum[employee, oh_professional, manager, admin]",
        "first_name": "string",
        "last_name": "string",
        "employee_number": "string",
        "department": "string",
        "phone": "string",
        "avatar": "string (url)",
        "created_at": "datetime",
        "last_login": "datetime",
        "preferences": "object",
        "two_factor_enabled": "boolean"
      },
      "sample_data": [
        {
          "id": "usr_001",
          "email": "john.doe@nhs.uk",
          "role": "employee",
          "first_name": "John",
          "last_name": "Doe",
          "employee_number": "NHS001234",
          "department": "Emergency Medicine",
          "phone": "+44 7700 900123",
          "avatar": "https://ui-avatars.com/api/?name=John+Doe&background=005eb8&color=fff",
          "created_at": "2023-01-15T09:00:00Z",
          "last_login": "2024-12-10T14:30:00Z",
          "preferences": {
            "email_notifications": true,
            "sms_notifications": false,
            "reminder_preference": "24_hours"
          },
          "two_factor_enabled": false
        },
        {
          "id": "usr_002",
          "email": "dr.smith@nhs.uk",
          "role": "oh_professional",
          "first_name": "Sarah",
          "last_name": "Smith",
          "employee_number": "NHS005678",
          "department": "Occupational Health",
          "phone": "+44 7700 900456",
          "avatar": "https://ui-avatars.com/api/?name=Sarah+Smith&background=00703c&color=fff",
          "created_at": "2022-03-10T08:00:00Z",
          "last_login": "2024-12-10T16:45:00Z",
          "preferences": {
            "email_notifications": true,
            "sms_notifications": true,
            "reminder_preference": "12_hours"
          },
          "two_factor_enabled": true
        }
      ]
    },
    "health_records": {
      "schema": {
        "id": "string (uuid)",
        "employee_id": "string (foreign_key)",
        "health_status": "enum[healthy, needs_attention, high_risk, overdue]",
        "last_checkup_date": "date",
        "next_checkup_due": "date",
        "fitness_for_work": "enum[fit, fit_with_restrictions, temporarily_unfit, permanently_unfit]",
        "medical_conditions": "array[object]",
        "vaccinations": "array[object]",
        "risk_assessments": "array[object]",
        "created_at": "datetime",
        "updated_at": "datetime"
      },
      "sample_data": [
        {
          "id": "hr_001",
          "employee_id": "usr_001",
          "health_status": "healthy",
          "last_checkup_date": "2024-09-15",
          "next_checkup_due": "2025-03-15",
          "fitness_for_work": "fit",
          "medical_conditions": [
            {
              "condition": "Mild Hypertension",
              "severity": "low",
              "managed": true,
              "medication": "Lisinopril 10mg daily"
            }
          ],
          "vaccinations": [
            {
              "vaccine": "COVID-19",
              "date": "2024-10-01",
              "batch_number": "CV2024001",
              "next_due": "2025-10-01"
            },
            {
              "vaccine": "Influenza",
              "date": "2024-09-15",
              "batch_number": "FLU2024002",
              "next_due": "2025-09-15"
            }
          ],
          "risk_assessments": [
            {
              "type": "Manual Handling",
              "date": "2024-06-10",
              "risk_level": "low",
              "next_review": "2025-06-10"
            }
          ],
          "created_at": "2023-01-15T09:00:00Z",
          "updated_at": "2024-09-15T11:30:00Z"
        }
      ]
    },
    "appointments": {
      "schema": {
        "id": "string (uuid)",
        "employee_id": "string (foreign_key)",
        "professional_id": "string (foreign_key)",
        "type": "enum[health_check, consultation, follow_up, emergency, pre_employment, return_to_work]",
        "mode": "enum[in_person, video, phone]",
        "date": "date",
        "time": "time",
        "duration": "integer (minutes)",
        "status": "enum[scheduled, in_progress, completed, cancelled, no_show]",
        "reason": "string",
        "location": "string",
        "notes": "string",
        "attachments": "array[string]",
        "reminders_sent": "array[object]",
        "created_at": "datetime",
        "updated_at": "datetime"
      },
      "sample_data": [
        {
          "id": "apt_001",
          "employee_id": "usr_001",
          "professional_id": "usr_002",
          "type": "health_check",
          "mode": "in_person",
          "date": "2024-12-15",
          "time": "10:00",
          "duration": 30,
          "status": "scheduled",
          "reason": "Annual health check-up",
          "location": "Occupational Health Center, Room 204",
          "notes": "",
          "attachments": [],
          "reminders_sent": [
            {
              "type": "email",
              "sent_at": "2024-12-14T10:00:00Z",
              "status": "delivered"
            }
          ],
          "created_at": "2024-12-01T09:15:00Z",
          "updated_at": "2024-12-01T09:15:00Z"
        },
        {
          "id": "apt_002",
          "employee_id": "usr_001",
          "professional_id": "usr_002",
          "type": "consultation",
          "mode": "video",
          "date": "2024-12-12",
          "time": "14:30",
          "duration": 20,
          "status": "completed",
          "reason": "Follow-up on hypertension management",
          "location": "Video Call",
          "notes": "Blood pressure readings stable. Continue current medication.",
          "attachments": ["doc_001"],
          "reminders_sent": [
            {
              "type": "email",
              "sent_at": "2024-12-11T14:30:00Z",
              "status": "delivered"
            },
            {
              "type": "sms",
              "sent_at": "2024-12-12T13:30:00Z",
              "status": "delivered"
            }
          ],
          "created_at": "2024-11-28T16:20:00Z",
          "updated_at": "2024-12-12T15:00:00Z"
        }
      ]
    },
    "documents": {
      "schema": {
        "id": "string (uuid)",
        "name": "string",
        "type": "enum[health_certificate, test_result, medical_report, form, vaccination_record, assessment_report]",
        "description": "string",
        "file_url": "string",
        "file_type": "string",
        "file_size": "integer (bytes)",
        "uploaded_by": "string (user_id)",
        "employee_id": "string (foreign_key)",
        "appointment_id": "string (foreign_key, nullable)",
        "tags": "array[string]",
        "is_confidential": "boolean",
        "retention_date": "date",
        "created_at": "datetime",
        "updated_at": "datetime"
      },
      "sample_data": [
        {
          "id": "doc_001",
          "name": "Blood Pressure Monitoring Results",
          "type": "test_result",
          "description": "Weekly blood pressure readings for November 2024",
          "file_url": "/documents/doc_001.pdf",
          "file_type": "application/pdf",
          "file_size": 245760,
          "uploaded_by": "usr_001",
          "employee_id": "usr_001",
          "appointment_id": "apt_002",
          "tags": ["hypertension", "monitoring", "2024"],
          "is_confidential": true,
          "retention_date": "2031-12-12",
          "created_at": "2024-12-01T10:30:00Z",
          "updated_at": "2024-12-01T10:30:00Z"
        }
      ]
    },
    "messages": {
      "schema": {
        "id": "string (uuid)",
        "conversation_id": "string (uuid)",
        "sender_id": "string (foreign_key)",
        "recipient_id": "string (foreign_key)",
        "content": "string",
        "message_type": "enum[text, file, system]",
        "attachments": "array[object]",
        "read_at": "datetime (nullable)",
        "created_at": "datetime"
      },
      "conversations": {
        "schema": {
          "id": "string (uuid)",
          "participants": "array[string]",
          "last_message": "string",
          "last_message_at": "datetime",
          "unread_count": "integer",
          "created_at": "datetime"
        }
      },
      "sample_data": {
        "conversations": [
          {
            "id": "conv_001",
            "participants": ["usr_001", "usr_002"],
            "last_message": "Thank you for the follow-up appointment",
            "last_message_at": "2024-12-12T15:05:00Z",
            "unread_count": 0,
            "created_at": "2024-11-28T16:25:00Z"
          }
        ],
        "messages": [
          {
            "id": "msg_001",
            "conversation_id": "conv_001",
            "sender_id": "usr_002",
            "recipient_id": "usr_001",
            "content": "Hello John, I've reviewed your blood pressure readings and they look much better. Keep up the good work with your medication!",
            "message_type": "text",
            "attachments": [],
            "read_at": "2024-12-12T15:02:00Z",
            "created_at": "2024-12-12T15:00:00Z"
          },
          {
            "id": "msg_002",
            "conversation_id": "conv_001",
            "sender_id": "usr_001",
            "recipient_id": "usr_002",
            "content": "Thank you for the follow-up appointment",
            "message_type": "text",
            "attachments": [],
            "read_at": "2024-12-12T15:06:00Z",
            "created_at": "2024-12-12T15:05:00Z"
          }
        ]
      }
    },
    "notifications": {
      "schema": {
        "id": "string (uuid)",
        "user_id": "string (foreign_key)",
        "type": "enum[appointment_reminder, message_received, document_uploaded, system_alert, health_status_change]",
        "title": "string",
        "message": "string",
        "data": "object (contextual_data)",
        "read_at": "datetime (nullable)",
        "action_url": "string (nullable)",
        "priority": "enum[low, normal, high, urgent]",
        "created_at": "datetime"
      },
      "sample_data": [
        {
          "id": "not_001",
          "user_id": "usr_001",
          "type": "appointment_reminder",
          "title": "Appointment Reminder",
          "message": "You have an appointment with Dr. Smith tomorrow at 10:00 AM",
          "data": {
            "appointment_id": "apt_001",
            "professional_name": "Dr. Sarah Smith",
            "time": "10:00",
            "date": "2024-12-15"
          },
          "read_at": null,
          "action_url": "/employee/appointments/apt_001",
          "priority": "normal",
          "created_at": "2024-12-14T10:00:00Z"
        },
        {
          "id": "not_002",
          "user_id": "usr_001",
          "type": "message_received",
          "title": "New Message",
          "message": "Dr. Smith sent you a message",
          "data": {
            "conversation_id": "conv_001",
            "sender_name": "Dr. Sarah Smith"
          },
          "read_at": "2024-12-12T15:03:00Z",
          "action_url": "/employee/messages/conv_001",
          "priority": "normal",
          "created_at": "2024-12-12T15:00:00Z"
        }
      ]
    },
    "assessments": {
      "schema": {
        "id": "string (uuid)",
        "employee_id": "string (foreign_key)",
        "professional_id": "string (foreign_key)",
        "type": "enum[pre_employment, periodic_review, fitness_for_work, return_to_work, risk_assessment]",
        "status": "enum[draft, in_progress, completed, approved, rejected]",
        "form_data": "object",
        "recommendations": "string",
        "restrictions": "array[object]",
        "next_review_date": "date",
        "created_at": "datetime",
        "updated_at": "datetime",
        "completed_at": "datetime (nullable)"
      },
      "sample_data": [
        {
          "id": "ass_001",
          "employee_id": "usr_001",
          "professional_id": "usr_002",
          "type": "periodic_review",
          "status": "completed",
          "form_data": {
            "physical_health": {
              "blood_pressure": "125/82",
              "heart_rate": "72",
              "bmi": "24.5",
              "vision_test": "passed",
              "hearing_test": "passed"
            },
            "mental_health": {
              "stress_level": "low",
              "sleep_quality": "good",
              "work_life_balance": "satisfactory"
            },
            "workplace_factors": {
              "workstation_ergonomics": "good",
              "safety_compliance": "excellent",
              "training_up_to_date": true
            }
          },
          "recommendations": "Continue current health management plan. Maintain regular exercise routine.",
          "restrictions": [],
          "next_review_date": "2025-06-15",
          "created_at": "2024-09-15T10:00:00Z",
          "updated_at": "2024-09-15T11:30:00Z",
          "completed_at": "2024-09-15T11:30:00Z"
        }
      ]
    },
    "team_metrics": {
      "schema": {
        "department": "string",
        "total_employees": "integer",
        "health_score": "float (0-100)",
        "compliance_rate": "float (0-100)",
        "overdue_assessments": "integer",
        "health_distribution": "object",
        "recent_trends": "object",
        "last_updated": "datetime"
      },
      "sample_data": [
        {
          "department": "Emergency Medicine",
          "total_employees": 45,
          "health_score": 87.5,
          "compliance_rate": 92.3,
          "overdue_assessments": 3,
          "health_distribution": {
            "healthy": 38,
            "needs_attention": 5,
            "high_risk": 2
          },
          "recent_trends": {
            "health_score_change": 2.1,
            "compliance_trend": "improving",
            "vaccination_rate": 96.7
          },
          "last_updated": "2024-12-10T08:00:00Z"
        }
      ]
    }
  }
}
```

## 3. State Management Structure

### React State Architecture
```json
{
  "state_management": {
    "global_state": {
      "auth": {
        "user": "object | null",
        "isAuthenticated": "boolean",
        "token": "string | null",
        "refreshToken": "string | null",
        "role": "string | null",
        "permissions": "array[string]",
        "loading": "boolean",
        "error": "string | null"
      },
      "ui": {
        "sidebarCollapsed": "boolean",
        "currentTheme": "enum[light, dark, high_contrast]",
        "notifications": "array[object]",
        "loading": "boolean",
        "toasts": "array[object]",
        "modal": {
          "isOpen": "boolean",
          "type": "string | null",
          "data": "object | null"
        }
      },
      "cache": {
        "appointments": "object",
        "documents": "object",
        "conversations": "object",
        "userProfiles": "object",
        "lastFetch": "object"
      }
    },
    "component_state": {
      "forms": {
        "appointment_booking": {
          "currentStep": "integer",
          "formData": {
            "type": "string | null",
            "date": "string | null",
            "time": "string | null",
            "mode": "string | null",
            "reason": "string",
            "preferences": "object"
          },
          "validation": {
            "errors": "object",
            "touched": "object",
            "isValid": "boolean"
          },
          "availableSlots": "array[object]",
          "loading": "boolean"
        },
        "document_upload": {
          "files": "array[File]",
          "uploadProgress": "number",
          "metadata": {
            "name": "string",
            "type": "string",
            "description": "string"
          },
          "validation": {
            "errors": "array[string]",
            "isValid": "boolean"
          },
          "uploading": "boolean"
        },
        "user_profile": {
          "formData": "object",
          "originalData": "object",
          "hasChanges": "boolean",
          "saving": "boolean",
          "validation": {
            "errors": "object",
            "isValid": "boolean"
          }
        }
      },
      "data_tables": {
        "patient_records": {
          "data": "array[object]",
          "filteredData": "array[object]",
          "currentPage": "integer",
          "pageSize": "integer",
          "totalCount": "integer",
          "sortBy": "string | null",
          "sortDirection": "enum[asc, desc]",
          "filters": {
            "search": "string",
            "department": "string",
            "healthStatus": "string",
            "lastVisit": "string"
          },
          "loading": "boolean",
          "selectedRows": "array[string]"
        },
        "appointments": {
          "data": "array[object]",
          "viewMode": "enum[list, calendar]",
          "dateRange": {
            "start": "string",
            "end": "string"
          },
          "filters": {
            "status": "string",
            "type": "string",
            "professional": "string"
          },
          "loading": "boolean"
        }
      },
      "messaging": {
        "conversations": "array[object]",
        "activeConversation": "string | null",
        "messages": "array[object]",
        "newMessage": "string",
        "attachments": "array[File]",
        "typing": "boolean",
        "onlineUsers": "array[string]",
        "loading": "boolean"
      },
      "video_call": {
        "sessionId": "string | null",
        "localStream": "MediaStream | null",
        "remoteStream": "MediaStream | null",
        "isConnected": "boolean",
        "isMuted": "boolean",
        "isVideoEnabled": "boolean",
        "isScreenSharing": "boolean",
        "chatOpen": "boolean",
        "participants": "array[object]",
        "connectionStatus": "enum[connecting, connected, disconnected, error]"
      },
      "dashboard": {
        "employee": {
          "healthStatus": "object",
          "upcomingAppointments": "array[object]",
          "recentActivity": "array[object]",
          "unreadMessages": "integer",
          "loading": "boolean",
          "lastRefresh": "datetime"
        },
        "oh_professional": {
          "todaysSchedule": "array[object]",
          "patientOverview": "object",
          "pendingTasks": "array[object]",
          "metrics": "object",
          "loading": "boolean"
        },
        "manager": {
          "teamMetrics": "object",
          "healthDistribution": "object",
          "complianceTrends": "array[object]",
          "teamAlerts": "array[object]",
          "departmentBreakdown": "array[object]",
          "dateRange": "object",
          "loading": "boolean"
        }
      }
    },
    "hooks": {
      "useAuth": {
        "description": "Authentication state and methods",
        "returns": {
          "user": "object | null",
          "isAuthenticated": "boolean",
          "login": "function",
          "logout": "function",
          "refreshToken": "function",
          "loading": "boolean"
        }
      },
      "useApi": {
        "description": "API calls with caching and error handling",
        "parameters": {
          "endpoint": "string",
          "options": "object"
        },
        "returns": {
          "data": "any",
          "loading": "boolean",
          "error": "string | null",
          "refetch": "function"
        }
      },
      "useForm": {
        "description": "Form state management with validation",
        "parameters": {
          "initialValues": "object",
          "validationSchema": "object"
        },
        "returns": {
          "values": "object",
          "errors": "object",
          "touched": "object",
          "isValid": "boolean",
          "handleChange": "function",
          "handleBlur": "function",
          "handleSubmit": "function",
          "reset": "function"
        }
      },
      "useNotifications": {
        "description": "Notification management",
        "returns": {
          "notifications": "array[object]",
          "unreadCount": "integer",
          "addNotification": "function",
          "markAsRead": "function",
          "clearAll": "function"
        }
      },
      "useWebSocket": {
        "description": "Real-time communication",
        "parameters": {
          "url": "string",
          "options": "object"
        },
        "returns": {
          "isConnected": "boolean",
          "send": "function",
          "lastMessage": "object | null"
        }
      }
    },
    "context_providers": {
      "AuthProvider": {
        "purpose": "Authentication state and user session",
        "state": "auth global state",
        "actions": ["login", "logout", "refreshToken", "updateProfile"]
      },
      "UIProvider": {
        "purpose": "UI state and theme management",
        "state": "ui global state",
        "actions": ["toggleSidebar", "setTheme", "showModal", "hideModal", "addToast"]
      },
      "CacheProvider": {
        "purpose": "Data caching and synchronization",
        "state": "cache global state",
        "actions": ["setCache", "getCache", "invalidateCache", "clearCache"]
      }
    }
  }
}
```

## 4. AI Instruction Template

### Complete AI Prompt Structure
```json
{
  "ai_instruction_template": {
    "system_prompt": {
      "role": "You are an expert React developer specializing in NHS healthcare applications",
      "context": "Create a comprehensive OH eHR (Occupational Health Electronic Health Records) system",
      "constraints": [
        "Use ONLY React functional components with hooks",
        "Follow NHS UK Design System guidelines strictly",
        "Implement atomic design pattern (atoms → molecules → organisms → templates → pages)",
        "Ensure WCAG 2.1 AA accessibility compliance",
        "Use TypeScript for type safety",
        "Create responsive design (mobile-first approach)",
        "Use mock data only - no backend integration",
        "Implement proper error boundaries and loading states",
        "Follow NHS color palette and typography standards"
      ]
    },
    "technical_requirements": {
      "framework": "React 18+ with TypeScript",
      "styling": "NHS UK Frontend + Tailwind CSS utilities",
      "state_management": "React Context + useReducer for complex state",
      "routing": "React Router v6 with role-based access",
      "forms": "React Hook Form with Zod validation",
      "icons": "Lucide React (NHS-approved icons)",
      "date_handling": "date-fns library",
      "charts": "Recharts for dashboard metrics",
      "notifications": "React Hot Toast",
      "accessibility": "react-aria for complex components"
    },
    "design_system_requirements": {
      "colors": {
        "primary": "#005eb8 (NHS Blue)",
        "secondary": "#00703c (NHS Green)",
        "success": "#00703c",
        "warning": "#fa9200",
        "error": "#d5281b",
        "neutral": "#425563"
      },
      "typography": {
        "font_family": "Frutiger, Arial, sans-serif",
        "font_weights": [400, 600, 700],
        "line_heights": [1.4, 1.5, 1.6]
      },
      "spacing": "8px base unit system",
      "breakpoints": {
        "mobile": "320px-768px",
        "tablet": "769px-1024px",
        "desktop": "1025px+"
      },
      "components": "Use NHS UK Frontend component specifications"
    },
    "atomic_design_structure": {
      "atoms": [
        "Button (primary, secondary, danger variants)",
        "Input (text, email, password, tel, date)",
        "Label with proper association",
        "Icon (Lucide React with NHS styling)",
        "Badge (status, count, category)",
        "Avatar (user photos with fallbacks)",
        "Spinner (loading indicators)",
        "Checkbox and Radio inputs",
        "Select dropdown",
        "TextArea"
      ],
      "molecules": [
        "FormField (Input + Label + Error)",
        "SearchBar (Input + Button + Icon)",
        "NotificationItem (Icon + Text + Actions)",
        "AppointmentCard (Date + Time + Actions)",
        "UserCard (Avatar + Name + Status)",
        "FileUpload (Drag/Drop + Progress)",
        "DatePicker (Calendar + Input)",
        "Pagination (Numbers + Navigation)"
      ],
      "organisms": [
        "Header (Logo + Navigation + User Menu)",
        "Sidebar (Navigation + User Info)",
        "AppointmentWizard (Multi-step form)",
        "DataTable (Headers + Rows + Pagination + Filters)",
        "MessageThread (Messages + Input)",
        "VideoCallInterface (Video + Controls + Chat)",
        "DocumentLibrary (Upload + Grid + Actions)",
        "DashboardMetrics (Cards + Charts)"
      ],
      "templates": [
        "AuthLayout (Centered form layout)",
        "MainLayout (Header + Sidebar + Content)",
        "ModalLayout (Overlay + Content + Actions)",
        "FullscreenLayout (Video calls)"
      ],
      "pages": [
        "LoginPage",
        "EmployeeDashboard",
        "AppointmentBooking",
        "DocumentManager",
        "MessagingCenter",
        "VideoCall",
        "OHProfessionalDashboard",
        "PatientRecords",
        "AssessmentCenter",
        "ManagerDashboard",
        "UserProfile"
      ]
    },
    "accessibility_requirements": {
      "keyboard_navigation": "Full keyboard accessibility with logical tab order",
      "screen_readers": "Proper ARIA labels, roles, and live regions",
      "color_contrast": "Minimum 4.5:1 for normal text, 3:1 for large text",
      "focus_management": "Visible focus indicators and focus trapping in modals",
      "motion_sensitivity": "Respect prefers-reduced-motion",
      "error_handling": "Clear error messages and validation feedback",
      "semantic_html": "Use proper HTML5 semantic elements"
    },
    "specific_features": {
      "role_based_access": {
        "employee": "Dashboard, appointments, documents, messages, video calls",
        "oh_professional": "All employee features + patient records, assessments, professional tools",
        "manager": "Team overview, compliance metrics, reporting",
        "admin": "System management, user administration"
      },
      "core_workflows": [
        "Employee appointment booking (4-step wizard)",
        "Document upload and management",
        "Video consultation interface",
        "Real-time messaging system",
        "OH professional patient management",
        "Manager team health dashboard"
      ],
      "data_visualization": [
        "Health status distribution (pie chart)",
        "Compliance trends (line chart)",
        "Department metrics (bar chart)",
        "Appointment calendar view"
      ],
      "real_time_features": [
        "Message notifications",
        "Appointment reminders",
        "Video call functionality",
        "Live typing indicators",
        "Online status indicators"
      ]
    },
    "implementation_instructions": {
      "start_with": "Create the complete atomic design component library first",
      "then_build": "Implement authentication and routing structure",
      "next_create": "Build each role's dashboard and core features",
      "finally_add": "Integrate all workflows and polish interactions",
      "testing_approach": "Include proper error boundaries and loading states throughout",
      "mock_data": "Use the provided mock data structure for all API calls",
      "responsive_design": "Implement mobile-first responsive design with proper breakpoints"
    },
    "deliverable_format": {
      "single_artifact": "Complete React application in one artifact",
      "working_prototype": "Fully functional with all interactions working",
      "proper_routing": "Multiple pages with navigation",
      "mock_authentication": "Role-based access with mock login",
      "complete_styling": "NHS Design System implementation",
      "accessibility_compliant": "WCAG 2.1 AA standards met"
    },
    "example_prompt": {
      "instruction": "Create a complete OH eHR system using React and TypeScript that follows NHS UK Design System. Implement atomic design patterns starting with atoms (Button, Input, Icon) and building up to complete pages (LoginPage, EmployeeDashboard, etc.). Include role-based authentication for employee, oh_professional, manager, and admin roles. Use the provided mock data structure for all data. Ensure WCAG 2.1 AA accessibility compliance and responsive design. Implement the complete appointment booking workflow, document management, messaging system, and video calling interface. Use NHS color palette (#005eb8 primary, #00703c secondary) and Frutiger typography. Include proper error handling, loading states, and form validation throughout.",
      "specific_requirements": [
        "Start with atomic design component library",
        "Implement 4-step appointment booking wizard",
        "Create responsive data tables for patient records",
        "Build real-time messaging interface",
        "Include video call functionality with controls",
        "Dashboard with charts for manager role",
        "Document upload with drag-and-drop",
        "Mobile-first responsive design",
        "Proper keyboard navigation",
        "Role-based route protection"
      ]
    }
  }
}
```

## 5. Implementation Checklist

### Development Phases
```markdown
### Phase 1: Foundation (Atoms & Molecules)
- [ ] Create NHS-styled Button component with variants
- [ ] Build Input components with validation states
- [ ] Implement Icon system using Lucide React
- [ ] Design Badge, Avatar, and Spinner components
- [ ] Create FormField molecule with error handling
- [ ] Build SearchBar and NotificationItem molecules
- [ ] Implement DatePicker and FileUpload molecules

### Phase 2: Complex Components (Organisms)
- [ ] Build Header with navigation and user menu
- [ ] Create responsive Sidebar component
- [ ] Implement DataTable with sorting/filtering
- [ ] Build AppointmentWizard multi-step form
- [ ] Create MessageThread interface
- [ ] Implement VideoCallInterface
- [ ] Build DashboardMetrics with charts

### Phase 3: Layout Templates
- [ ] Create AuthLayout for login/register
- [ ] Build MainLayout with header/sidebar
- [ ] Implement ModalLayout for overlays
- [ ] Create FullscreenLayout for video calls

### Phase 4: Pages & Routing
- [ ] Implement authentication with role routing
- [ ] Build Employee dashboard and workflows
- [ ] Create OH Professional interfaces
- [ ] Implement Manager reporting dashboard
- [ ] Build shared components (Profile, Notifications)

### Phase 5: Integration & Polish
- [ ] Integrate all workflows end-to-end
- [ ] Add proper error boundaries
- [ ] Implement loading states throughout
- [ ] Test accessibility compliance
- [ ] Optimize responsive design
- [ ] Add proper form validation
- [ ] Test all user interactions
```

This comprehensive specification provides everything needed to create the complete OH eHR system. The AI instruction template is specifically designed to generate a fully functional React application that meets NHS standards and includes all the complex workflows defined in your original specification.