import React from "react";
import {
  Home,
  Users,
  Calendar,
  FileText,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

interface Breadcrumb {
  label: string;
  onClick: () => void;
}

interface OHMainLayoutProps {
  currentView: "dashboard" | "patients" | "assessment" | "appointments" | "reports" | "settings";
  breadcrumbs: Breadcrumb[];
  onNavigate: (view: "dashboard" | "patients" | "assessment" | "appointments" | "reports" | "settings") => void;
  onLogout: () => void;
  user: {
    name: string;
    role: string;
    specialty?: string;
  };
  children: React.ReactNode;
}

export function OHMainLayout({ currentView, breadcrumbs, onNavigate, onLogout, user, children }: OHMainLayoutProps) {
  return (
    <div className="nhsuk-template">
      {/* Header */}
      <header className="nhsuk-header" role="banner">
        <div className="nhsuk-width-container nhsuk-header__container">
          <div className="nhsuk-header__logo">
            <span className="nhsuk-header__service-name">
              OH Professional Portal
            </span>
          </div>
          
          <div className="nhsuk-header__content" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ 
                width: '2.5rem', 
                height: '2.5rem', 
                backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <span style={{ color: 'white', fontWeight: '600', fontSize: '1.125rem' }}>👨‍⚕️</span>
              </div>
              <div>
                <h3 style={{ color: 'white', fontWeight: '600', margin: '0' }}>{user.name}</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.875rem', margin: '0' }}>{user.specialty || user.role}</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: 'auto' }}>
              <button className="nhsuk-button nhsuk-button--reverse nhsuk-button--small">
                Patients (24)
              </button>
              <button className="nhsuk-button nhsuk-button--reverse nhsuk-button--small">
                Messages (7)
              </button>
              <button 
                onClick={onLogout}
                className="nhsuk-button nhsuk-button--reverse nhsuk-button--small"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <LogOut style={{ height: '1rem', width: '1rem' }} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sub Navigation */}
      <nav className="nhsuk-header__navigation" role="navigation" aria-label="Primary navigation">
        <div className="nhsuk-width-container">
          <ul className="nhsuk-header__navigation-list">
            <li className="nhsuk-header__navigation-item">
              <button
                onClick={() => onNavigate("dashboard")}
                className={`nhsuk-header__navigation-link ${
                  currentView === "dashboard" ? "nhsuk-header__navigation-link--active" : ""
                }`}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  width: '100%'
                }}
              >
                <Home style={{ height: '1rem', width: '1rem' }} />
                <span>Dashboard</span>
              </button>
            </li>
            
            <li className="nhsuk-header__navigation-item">
              <button
                onClick={() => onNavigate("patients")}
                className={`nhsuk-header__navigation-link ${
                  currentView === "patients" ? "nhsuk-header__navigation-link--active" : ""
                }`}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  width: '100%'
                }}
              >
                <Users style={{ height: '1rem', width: '1rem' }} />
                <span>Employee Records</span>
              </button>
            </li>
            
            <li className="nhsuk-header__navigation-item">
              <button
                onClick={() => onNavigate("assessment")}
                className={`nhsuk-header__navigation-link ${
                  currentView === "assessment" ? "nhsuk-header__navigation-link--active" : ""
                }`}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  width: '100%'
                }}
              >
                <FileText style={{ height: '1rem', width: '1rem' }} />
                <span>Assessment</span>
              </button>
            </li>
            
            <li className="nhsuk-header__navigation-item">
              <button
                onClick={() => onNavigate("appointments")}
                className={`nhsuk-header__navigation-link ${
                  currentView === "appointments" ? "nhsuk-header__navigation-link--active" : ""
                }`}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  width: '100%'
                }}
              >
                <Calendar style={{ height: '1rem', width: '1rem' }} />
                <span>Appointments</span>
              </button>
            </li>
            
            <li className="nhsuk-header__navigation-item">
              <button
                onClick={() => onNavigate("reports")}
                className={`nhsuk-header__navigation-link ${
                  currentView === "reports" ? "nhsuk-header__navigation-link--active" : ""
                }`}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  width: '100%'
                }}
              >
                <BarChart3 style={{ height: '1rem', width: '1rem' }} />
                <span>Reports</span>
              </button>
            </li>
            
            <li className="nhsuk-header__navigation-item">
              <button
                onClick={() => onNavigate("settings")}
                className={`nhsuk-header__navigation-link ${
                  currentView === "settings" ? "nhsuk-header__navigation-link--active" : ""
                }`}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  width: '100%'
                }}
              >
                <Settings style={{ height: '1rem', width: '1rem' }} />
                <span>Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <div className="nhsuk-width-container">
        <main className="nhsuk-main-wrapper" id="maincontent" role="main">
          <div className="w-full min-h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}