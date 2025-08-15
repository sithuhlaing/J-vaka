import React from "react";
import {
  Home,
  FileText,
  Calendar,
  MessageCircle,
  Video,
  LogOut,
} from "lucide-react";

interface Breadcrumb {
  label: string;
  onClick: () => void;
}

interface MainLayoutProps {
  currentView: "dashboard" | "appointments" | "documents" | "messages" | "video-call" | "settings";
  breadcrumbs: Breadcrumb[];
  onNavigate: (view: "dashboard" | "appointments" | "documents" | "messages" | "video-call" | "settings") => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export function MainLayout({ currentView, breadcrumbs, onNavigate, onLogout, children }: MainLayoutProps) {
  return (
    <div className="nhsuk-template">
      {/* Header */}
      <header className="nhsuk-header" role="banner">
        <div className="nhsuk-width-container nhsuk-header__container">
          <div className="nhsuk-header__logo">
            <span className="nhsuk-header__service-name">
              Occupational Health Portal
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
                <span style={{ color: 'white', fontWeight: '600', fontSize: '1.125rem' }}>JS</span>
              </div>
              <div>
                <h3 style={{ color: 'white', fontWeight: '600', margin: '0' }}>John Smith</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.875rem', margin: '0' }}>Employee ID: EMP001</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: 'auto' }}>
              <button className="nhsuk-button nhsuk-button--reverse nhsuk-button--small">
                Messages (3)
              </button>
              <button className="nhsuk-button nhsuk-button--reverse nhsuk-button--small">
                Notifications
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
                onClick={() => onNavigate("documents")}
                className={`nhsuk-header__navigation-link ${
                  currentView === "documents" ? "nhsuk-header__navigation-link--active" : ""
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
                <span>Documents</span>
              </button>
            </li>
            
            <li className="nhsuk-header__navigation-item">
              <button
                onClick={() => onNavigate("messages")}
                className={`nhsuk-header__navigation-link ${
                  currentView === "messages" ? "nhsuk-header__navigation-link--active" : ""
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
                <MessageCircle style={{ height: '1rem', width: '1rem' }} />
                <span>Messages</span>
              </button>
            </li>
            
            <li className="nhsuk-header__navigation-item">
              <button
                onClick={() => onNavigate("video-call")}
                className={`nhsuk-header__navigation-link ${
                  currentView === "video-call" ? "nhsuk-header__navigation-link--active" : ""
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
                <Video style={{ height: '1rem', width: '1rem' }} />
                <span>Video Call</span>
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