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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left side - Logo and User Info */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-lg">OH</span>
              </div>
              <div>
                <h3 className="font-semibold text-white">John Smith</h3>
                <p className="text-blue-100 text-sm">Employee ID: EMP001</p>
              </div>
            </div>

            {/* Right side - Navigation Actions */}
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-white bg-opacity-20 rounded text-white hover:bg-opacity-30 transition-colors">
                Messages (3)
              </button>
              <button className="px-4 py-2 bg-white bg-opacity-20 rounded text-white hover:bg-opacity-30 transition-colors">
                Notifications
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
              onClick={() => onNavigate("appointments")}
              className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
                currentView === "appointments"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              <Calendar className="h-4 w-4" />
              <span>Appointments</span>
            </button>
            
            <button
              onClick={() => onNavigate("documents")}
              className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
                currentView === "documents"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>Documents</span>
            </button>
            
            <button
              onClick={() => onNavigate("messages")}
              className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
                currentView === "messages"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              <MessageCircle className="h-4 w-4" />
              <span>Messages</span>
            </button>
            
            <button
              onClick={() => onNavigate("video-call")}
              className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
                currentView === "video-call"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              <Video className="h-4 w-4" />
              <span>Video Call</span>
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