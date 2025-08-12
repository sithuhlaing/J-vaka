import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { MainLayout } from './components/MainLayout';
import { OHMainLayout } from './components/OHMainLayout';
import EmployeeDashboard from './pages/EmployeeDashboard';
import BookAppointment from './pages/BookAppointment';
import DocumentsView from './pages/DocumentsView';
import ChatInterface from './pages/ChatInterface';
import VideoCall from './pages/VideoCall';
import OHProfessionalDashboard from './pages/OHProfessionalDashboard';
import EmployeeHealthRecords from './pages/EmployeeHealthRecords';
import OccupationalAssessment from './pages/OccupationalAssessment';
import ManagerDashboard from './pages/ManagerDashboard';
import LoginScreen from './pages/LoginScreen';

const AppContent = () => {
    const { user, isAuthenticated, login, logout } = useAuth();
    const [employeeView, setEmployeeView] = useState<"dashboard" | "appointments" | "documents" | "messages" | "video-call" | "settings">("dashboard");
    const [ohView, setOHView] = useState<"dashboard" | "patients" | "assessment" | "schedule" | "reports" | "settings">("dashboard");

    if (!isAuthenticated || !user) {
        return <LoginScreen onLogin={login} />;
    }

    // Employee Views
    if (user.role === 'employee') {
        const navigateTo = (view: "dashboard" | "appointments" | "documents" | "messages" | "video-call" | "settings") => {
            setEmployeeView(view);
        };

        const getBreadcrumbs = () => {
            const breadcrumbs = [{ label: "Dashboard", onClick: () => navigateTo("dashboard") }];
            
            if (employeeView === "appointments") {
                breadcrumbs.push({ label: "Book Appointment", onClick: () => {} });
            }
            
            if (employeeView === "documents") {
                breadcrumbs.push({ label: "My Documents", onClick: () => {} });
            }
            
            if (employeeView === "messages") {
                breadcrumbs.push({ label: "Messages", onClick: () => {} });
            }
            
            if (employeeView === "video-call") {
                breadcrumbs.push({ label: "Video Call", onClick: () => {} });
            }
            
            return breadcrumbs;
        };

        let content;
        if (employeeView === 'dashboard') {
            content = <EmployeeDashboard />;
        } else if (employeeView === 'appointments') {
            content = <BookAppointment />;
        } else if (employeeView === 'documents') {
            content = <DocumentsView />;
        } else if (employeeView === 'messages') {
            content = <ChatInterface />;
        } else if (employeeView === 'video-call') {
            content = <VideoCall />;
        } else {
            content = <div className="p-6"><h1 className="text-2xl">{employeeView} - Screen not built yet.</h1></div>;
        }

        return (
            <MainLayout 
                currentView={employeeView}
                breadcrumbs={getBreadcrumbs()}
                onNavigate={navigateTo}
                onLogout={logout}
            >
                {content}
            </MainLayout>
        );
    }

    // OH Professional Views
    if (user.role === 'oh-professional') {
        const navigateTo = (view: "dashboard" | "patients" | "assessment" | "schedule" | "reports" | "settings") => {
            setOHView(view);
        };

        const getBreadcrumbs = () => {
            const breadcrumbs = [{ label: "Dashboard", onClick: () => navigateTo("dashboard") }];
            
            if (ohView === "patients") {
                breadcrumbs.push({ label: "Employee Health Records", onClick: () => {} });
            }
            
            if (ohView === "assessment") {
                breadcrumbs.push({ label: "Health Assessment", onClick: () => {} });
            }
            
            if (ohView === "schedule") {
                breadcrumbs.push({ label: "Schedule", onClick: () => {} });
            }
            
            if (ohView === "reports") {
                breadcrumbs.push({ label: "Reports", onClick: () => {} });
            }
            
            return breadcrumbs;
        };

        let content;
        if (ohView === 'dashboard') {
            content = <OHProfessionalDashboard />;
        } else if (ohView === 'patients') {
            content = <EmployeeHealthRecords />;
        } else if (ohView === 'assessment') {
            content = <OccupationalAssessment />;
        } else {
            content = <div className="p-6"><h1 className="text-2xl">{ohView} - Screen not built yet.</h1></div>;
        }

        return (
            <OHMainLayout 
                currentView={ohView}
                breadcrumbs={getBreadcrumbs()}
                onNavigate={navigateTo}
                onLogout={logout}
                user={user}
            >
                {content}
            </OHMainLayout>
        );
    }

    // Manager Views
    if (user.role === 'manager') {
        let content = <ManagerDashboard />;

        return (
            <div className="min-h-screen bg-gray-50">
                {/* Manager Header */}
                <header className="bg-blue-600 text-white sticky top-0 z-50">
                    <div className="px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                    <span className="text-white font-semibold text-lg">OH</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">{user.name}</h3>
                                    <p className="text-blue-100 text-sm">Manager - {user.department}</p>
                                </div>
                            </div>
                            <button 
                                onClick={logout}
                                className="px-4 py-2 bg-white bg-opacity-20 rounded text-white hover:bg-opacity-30 transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </header>
                <main className="flex-1">
                    {content}
                </main>
            </div>
        );
    }

    return null;
};

const App = () => {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
};

export default App;