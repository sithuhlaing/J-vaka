import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NavigationProvider, useNavigation, AppScreen } from './contexts/NavigationContext';
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
import AppointmentsPage from './pages/AppointmentsPage';

// Employee Screen Router Component
const EmployeeScreenRouter = () => {
    const { navigationState, navigateTo, navigateToWithHistory } = useNavigation();

    const renderEmployeeScreen = () => {
        switch (navigationState.currentScreen) {
            case 'dashboard':
            case 'health_status':
            case 'upcoming_appointments':
            case 'quick_actions':
            case 'recent_activity':
                return <EmployeeDashboard onNavigate={navigateToWithHistory} />;

            case 'book_appointment':
            case 'appointment_type':
            case 'appointment_datetime':
            case 'appointment_mode':
            case 'appointment_confirmation':
                return <BookAppointment onNavigate={navigateToWithHistory} />;

            case 'documents':
            case 'document_categories':
            case 'document_grid':
            case 'document_upload':
                return <DocumentsView onNavigate={navigateToWithHistory} />;

            case 'messages':
            case 'conversation_list':
            case 'chat_interface':
                return <ChatInterface onNavigate={navigateToWithHistory} />;

            case 'video_call':
                return <VideoCall onNavigate={navigateToWithHistory} />;

            case 'profile_settings':
                return <div className="p-6"><h1>Profile Settings - Not implemented yet</h1></div>;

            default:
                return <EmployeeDashboard onNavigate={navigateToWithHistory} />;
        }
    };

    const getBreadcrumbs = () => {
        const breadcrumbs = [{ label: "Dashboard", onClick: () => navigateTo("dashboard") }];
        
        switch (navigationState.currentScreen) {
            case 'book_appointment':
            case 'appointment_type':
            case 'appointment_datetime':
            case 'appointment_mode':
            case 'appointment_confirmation':
                breadcrumbs.push({ label: "Book Appointment", onClick: () => {} });
                break;
            case 'documents':
            case 'document_categories':
            case 'document_grid':
            case 'document_upload':
                breadcrumbs.push({ label: "My Documents", onClick: () => {} });
                break;
            case 'messages':
            case 'conversation_list':
            case 'chat_interface':
                breadcrumbs.push({ label: "Messages", onClick: () => {} });
                break;
            case 'video_call':
                breadcrumbs.push({ label: "Video Call", onClick: () => {} });
                break;
            case 'profile_settings':
                breadcrumbs.push({ label: "Profile Settings", onClick: () => {} });
                break;
        }
        
        return breadcrumbs;
    };

    return (
        <MainLayout 
            currentView={navigationState.currentScreen as any}
            breadcrumbs={getBreadcrumbs()}
            onNavigate={(view: string) => navigateTo(view as AppScreen)}
            onLogout={() => navigateTo('logout_confirmation')}
        >
            {renderEmployeeScreen()}
        </MainLayout>
    );
};

// OH Professional Screen Router Component
const OHProfessionalScreenRouter = () => {
    const { navigationState, navigateTo, navigateToWithHistory } = useNavigation();
    const { user } = useAuth();

    const renderOHScreen = () => {
        switch (navigationState.currentScreen) {
            case 'dashboard':
            case 'todays_schedule':
            case 'patient_overview':
            case 'pending_tasks':
                return <OHProfessionalDashboard onNavigate={navigateToWithHistory} />;

            case 'patient_records':
            case 'patient_search':
            case 'patient_detail':
                return <EmployeeHealthRecords onNavigate={navigateToWithHistory} />;

            case 'assessments':
            case 'assessment_types':
            case 'assessment_form':
                return <OccupationalAssessment onNavigate={navigateToWithHistory} />;

            case 'appointments':
            case 'appointment_calendar':
            case 'consultation':
                return <AppointmentsPage onNavigate={navigateToWithHistory} />;

            case 'video_call':
                return <VideoCall onNavigate={navigateToWithHistory} />;

            case 'documents':
                return <DocumentsView onNavigate={navigateToWithHistory} />;

            case 'reports':
                return <div className="p-6"><h1>Reports - Not implemented yet</h1></div>;

            default:
                return <OHProfessionalDashboard onNavigate={navigateToWithHistory} />;
        }
    };

    const getBreadcrumbs = () => {
        const breadcrumbs = [{ label: "Dashboard", onClick: () => navigateTo("dashboard") }];
        
        switch (navigationState.currentScreen) {
            case 'patient_records':
            case 'patient_search':
            case 'patient_detail':
                breadcrumbs.push({ label: "Employee Health Records", onClick: () => {} });
                break;
            case 'assessments':
            case 'assessment_types':
            case 'assessment_form':
                breadcrumbs.push({ label: "Health Assessment", onClick: () => {} });
                break;
            case 'appointments':
            case 'appointment_calendar':
            case 'consultation':
                breadcrumbs.push({ label: "Appointments", onClick: () => {} });
                break;
            case 'reports':
                breadcrumbs.push({ label: "Reports", onClick: () => {} });
                break;
        }
        
        return breadcrumbs;
    };

    return (
        <OHMainLayout 
            currentView={navigationState.currentScreen as any}
            breadcrumbs={getBreadcrumbs()}
            onNavigate={(view: string) => navigateTo(view as AppScreen)}
            onLogout={() => navigateTo('logout_confirmation')}
            user={user!}
        >
            {renderOHScreen()}
        </OHMainLayout>
    );
};

// Manager Screen Router Component
const ManagerScreenRouter = () => {
    const { navigationState, navigateToWithHistory } = useNavigation();
    const { user, logout } = useAuth();

    const renderManagerScreen = () => {
        switch (navigationState.currentScreen) {
            case 'dashboard':
            case 'key_metrics':
            case 'health_distribution':
            case 'compliance_trends':
            case 'team_alerts':
            case 'department_breakdown':
            case 'alert_detail':
            case 'employee_detail':
            case 'generate_reports':
                return <ManagerDashboard onNavigate={navigateToWithHistory} />;

            default:
                return <ManagerDashboard onNavigate={navigateToWithHistory} />;
        }
    };

    return (
        <div className="nhsuk-template">
            {/* Manager Header */}
            <header className="nhsuk-header" role="banner">
                <div className="nhsuk-width-container nhsuk-header__container">
                    <div className="nhsuk-header__logo">
                        <span className="nhsuk-header__service-name">
                            Manager Portal
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
                                <span style={{ color: 'white', fontWeight: '600', fontSize: '1.125rem' }}>M</span>
                            </div>
                            <div>
                                <h3 style={{ color: 'white', fontWeight: '600', margin: '0' }}>{user?.name}</h3>
                                <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.875rem', margin: '0' }}>Manager - {user?.department}</p>
                            </div>
                        </div>

                        <button 
                            onClick={logout}
                            className="nhsuk-button nhsuk-button--reverse nhsuk-button--small"
                            style={{ marginLeft: 'auto' }}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>
            
            <div className="nhsuk-width-container">
                <main className="nhsuk-main-wrapper" id="maincontent" role="main">
                    <div className="w-full min-h-full">
                        {renderManagerScreen()}
                    </div>
                </main>
            </div>
        </div>
    );
};

// Main App Content Component
const AppContent = () => {
    const { user, isAuthenticated, login } = useAuth();

    if (!isAuthenticated || !user) {
        return <LoginScreen onLogin={login} />;
    }

    // Determine initial screen based on user role
    const getInitialScreen = (): AppScreen => {
        switch (user.role) {
            case 'employee': return 'dashboard';
            case 'oh_professional': return 'dashboard';
            case 'manager': return 'dashboard';
            default: return 'dashboard';
        }
    };

    return (
        <NavigationProvider initialScreen={getInitialScreen()}>
            {user.role === 'employee' && <EmployeeScreenRouter />}
            {user.role === 'oh_professional' && <OHProfessionalScreenRouter />}
            {user.role === 'manager' && <ManagerScreenRouter />}
        </NavigationProvider>
    );
};

// Root App Component
const App = () => {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
};

export default App;