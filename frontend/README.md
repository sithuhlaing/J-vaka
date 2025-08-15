# OH eHR Frontend - NHS Occupational Health System

## Overview
Modern Next.js 15 implementation of an NHS Occupational Health Electronic Health Records system, following NHS UK Design System guidelines and atomic design patterns.

## 🚀 Quick Start

### Option 1: Automated Startup (Recommended)
```bash
./start.sh
```

### Option 2: Manual Setup
```bash
# Install dependencies
npm install --legacy-peer-deps

# Build and start production server
npm run serve

# Or start development server
npm run dev
```

## 🔐 Login Credentials

| Role | Email | Password | Access Level |
|------|-------|----------|--------------|
| Employee | `test@nhs.uk` | `password123` | Dashboard, Appointments, Documents, Messages |
| OH Professional | `dr.smith@nhs.uk` | `password123` | All Employee features + Patient Records, Assessments |
| Manager | `manager.jones@nhs.uk` | `password123` | **Team Management, Reports, Documents, Messages** |
| Admin | `admin.wilson@nhs.uk` | `password123` | **User Management, System Messages, Settings** |

## 📁 Project Structure

```
frontend/
├── app/                          # Next.js App Router pages
│   ├── employee/                 # Employee role pages
│   ├── oh/                       # OH Professional pages
│   ├── manager/                  # Manager role pages
│   ├── admin/                    # Admin role pages
│   └── login/                    # Authentication
├── components/                   # Atomic Design Components
│   ├── atoms/                    # Basic UI elements
│   ├── molecules/                # Combined atoms
│   ├── organisms/                # Complex components
│   ├── layout/                   # Layout templates
│   └── ui/                       # shadcn/ui components
├── lib/                          # Utilities and state
│   ├── mock-data.ts             # NHS-compliant mock data
│   ├── auth-context.tsx         # Authentication context
│   └── state/                   # Zustand stores
└── styles/                       # Global styles and NHS theme
```

## 🎨 Design System Compliance

### NHS UK Design System Implementation
- **Colors**: Primary NHS Blue (#005eb8), Secondary NHS Green (#00703c)
- **Typography**: Frutiger font family with proper scaling
- **Spacing**: 8px base unit system
- **Components**: NHS UK Frontend component specifications
- **Accessibility**: WCAG 2.1 AA compliant

### Atomic Design Architecture
- **Atoms**: Button, Input, Icon, Badge, Avatar
- **Molecules**: FormField, SearchBar, AppointmentCard
- **Organisms**: Header, Sidebar, AppointmentWizard, DataTable
- **Templates**: MainLayout, AuthLayout, ModalLayout

## ✨ Key Features Implemented

### Core Workflows
- ✅ **4-Step Appointment Booking Wizard** (per instructions.md)
- ✅ **Role-based Authentication & Navigation**
- ✅ **Responsive NHS-compliant UI**
- ✅ **Document Management Interface**
- ✅ **Video Call Integration**
- ✅ **Real-time Messaging System**
- ✅ **Dashboard Metrics & Charts**

### Technical Features
- ✅ **Next.js 15 with App Router**
- ✅ **TypeScript for type safety**
- ✅ **Zustand state management**
- ✅ **shadcn/ui component library**
- ✅ **Tailwind CSS with NHS theme**
- ✅ **Mobile-first responsive design**
- ✅ **Proper error boundaries**
- ✅ **Loading states throughout**

## 🏥 Role-Specific Features

### Employee Portal
- Personal health dashboard
- **4-step appointment booking wizard**
- Document upload/management
- Secure messaging with OH professionals
- Video consultation interface

### OH Professional Portal
- Patient record management
- **4-step appointment scheduling system**
- Health assessment tools
- Professional analytics dashboard
- Document management with approval workflow
- Secure messaging system

### Manager Portal ✅ **Now Complete**
- **Team Appointments**: Monitor department appointments with analytics
- **Document Management**: Review and approve team documents
- **Team Messages**: Broadcast communications to department staff
- **Reports & Analytics**: Comprehensive health and compliance reporting
- Department health score tracking
- Staff compliance monitoring

### Admin Portal ✅ **Now Complete**
- **User Management**: Create, edit, and manage all system users
- **System Messages**: Send system-wide communications and alerts
- **System Settings**: Configure security, notifications, and data retention
- Global system configuration
- Audit logs and security settings

## 🔧 Development Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint
npm run serve           # Build and serve (convenience)
npm run clean           # Clean build artifacts

# Maintenance
./start.sh              # Automated startup script
```

## 📊 Compliance with Instructions.md

### Completed Requirements ✅
- [x] **Atomic Design Pattern**: Full component hierarchy implemented
- [x] **NHS UK Design System**: Colors, typography, spacing compliant
- [x] **4-Step Appointment Wizard**: Complete wizard workflow
- [x] **Role-based Access Control**: All 4 roles implemented
- [x] **Mock Data Structure**: Aligned with specifications
- [x] **Responsive Design**: Mobile-first approach
- [x] **Accessibility**: WCAG 2.1 AA compliance
- [x] **TypeScript**: Full type safety
- [x] **Error Handling**: Proper boundaries and states

### Architecture Adaptations
- **Framework**: Upgraded from React Router to Next.js App Router for better performance
- **State Management**: Hybrid Zustand + Context approach for optimal developer experience
- **Styling**: Enhanced NHS CSS implementation with Tailwind CSS utilities

## 🌐 Browser Support
- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+

## 🔒 Security Features
- Role-based route protection
- Secure session management
- Input validation and sanitization
- CSRF protection ready
- NHS data protection compliance

## 📱 Mobile Support
- Touch-friendly interactions
- Responsive breakpoints
- Mobile navigation patterns
- Progressive Web App ready

## 🚨 Error Handling
- React error boundaries
- Graceful degradation
- User-friendly error messages
- Comprehensive loading states

---

**Built with ❤️ for NHS Occupational Health**

*This system follows NHS UK Design System guidelines and implements the complete specification from docs/instructions.md*