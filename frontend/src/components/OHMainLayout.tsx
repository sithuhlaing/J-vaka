import React from "react";
import {
  Home,
  Users,
  Calendar,
  FileText,
  BarChart3,
  Settings,
  Bell,
  LogOut,
} from "lucide-react";

interface Breadcrumb {
  label: string;
  onClick: () => void;
}

interface OHMainLayoutProps {
  currentView: "dashboard" | "patients" | "assessment" | "schedule" | "reports" | "settings";
  breadcrumbs: Breadcrumb[];
  onNavigate: (view: "dashboard" | "patients" | "assessment" | "schedule" | "reports" | "settings") => void;
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left side - Logo and User Info */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-lg">👨‍⚕️</span>
              </div>
              <div>
                <h3 className="font-semibold text-white">{user.name}</h3>
                <p className="text-blue-100 text-sm">{user.specialty || user.role}</p>
              </div>
            </div>

            {/* Right side - Navigation Actions */}
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-white bg-opacity-20 rounded text-white hover:bg-opacity-30 transition-colors">
                Calendar
              </button>
              <button className="px-4 py-2 bg-white bg-opacity-20 rounded text-white hover:bg-opacity-30 transition-colors">
                Patients (24)
              </button>
              <button className="px-4 py-2 bg-white bg-opacity-20 rounded text-white hover:bg-opacity-30 transition-colors">
                Messages (7)
              </button>
              <button 
                onClick={onLogout}
                className="px-4 py-2 bg-white bg-opacity-20 rounded text-white hover:bg-opacity-30 transition-colors flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sub Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="px-6">
          <div className="flex items-center space-x-1">
            <button
              onClick={() => onNavigate("dashboard")}
              className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
                currentView === "dashboard"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </button>
            
            <button
              onClick={() => onNavigate("patients")}
              className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
                currentView === "patients"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Employee Records</span>
            </button>
            
            <button
              onClick={() => onNavigate("assessment")}
              className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
                currentView === "assessment"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>Assessment</span>
            </button>
            
            <button
              onClick={() => onNavigate("schedule")}
              className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
                currentView === "schedule"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              <Calendar className="h-4 w-4" />
              <span>Schedule</span>
            </button>
            
            <button
              onClick={() => onNavigate("reports")}
              className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
                currentView === "reports"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              <span>Reports</span>
            </button>
            
            <button
              onClick={() => onNavigate("settings")}
              className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
                currentView === "settings"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}