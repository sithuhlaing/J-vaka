import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define all possible screen states based on the flow
export type EmployeeScreen = 
    | 'dashboard'
    | 'health_status'
    | 'upcoming_appointments'
    | 'quick_actions'
    | 'recent_activity'
    | 'book_appointment'
    | 'appointment_type'
    | 'appointment_datetime'
    | 'appointment_mode'
    | 'appointment_confirmation'
    | 'documents'
    | 'document_categories'
    | 'document_grid'
    | 'document_upload'
    | 'messages'
    | 'conversation_list'
    | 'chat_interface'
    | 'video_call'
    | 'profile_settings';

export type OHProfessionalScreen = 
    | 'dashboard'
    | 'todays_schedule'
    | 'patient_overview'
    | 'pending_tasks'
    | 'patient_records'
    | 'patient_search'
    | 'patient_detail'
    | 'assessments'
    | 'assessment_types'
    | 'assessment_form'
    | 'appointments'
    | 'appointment_calendar'
    | 'consultation'
    | 'documents'
    | 'reports';

export type ManagerScreen = 
    | 'dashboard'
    | 'key_metrics'
    | 'health_distribution'
    | 'compliance_trends'
    | 'team_alerts'
    | 'department_breakdown'
    | 'alert_detail'
    | 'employee_detail'
    | 'generate_reports';

export type SharedScreen = 
    | 'profile_settings'
    | 'notifications_center'
    | 'help_support'
    | 'logout_confirmation';

export type AppScreen = EmployeeScreen | OHProfessionalScreen | ManagerScreen | SharedScreen;

export interface NavigationState {
    currentScreen: AppScreen;
    previousScreen?: AppScreen;
    screenHistory: AppScreen[];
    screenData?: any; // For passing data between screens
}

interface NavigationContextType {
    navigationState: NavigationState;
    navigateTo: (screen: AppScreen, data?: any) => void;
    navigateBack: () => void;
    navigateToWithHistory: (screen: AppScreen, data?: any) => void;
    clearHistory: () => void;
    canGoBack: boolean;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = () => {
    const context = useContext(NavigationContext);
    if (context === undefined) {
        throw new Error('useNavigation must be used within a NavigationProvider');
    }
    return context;
};

interface NavigationProviderProps {
    children: ReactNode;
    initialScreen: AppScreen;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ 
    children, 
    initialScreen 
}) => {
    const [navigationState, setNavigationState] = useState<NavigationState>({
        currentScreen: initialScreen,
        screenHistory: [initialScreen],
        screenData: undefined
    });

    const navigateTo = (screen: AppScreen, data?: any) => {
        setNavigationState(prev => ({
            currentScreen: screen,
            previousScreen: prev.currentScreen,
            screenHistory: [screen], // Replace history for direct navigation
            screenData: data
        }));
    };

    const navigateToWithHistory = (screen: AppScreen, data?: any) => {
        setNavigationState(prev => ({
            currentScreen: screen,
            previousScreen: prev.currentScreen,
            screenHistory: [...prev.screenHistory, screen],
            screenData: data
        }));
    };

    const navigateBack = () => {
        setNavigationState(prev => {
            const newHistory = [...prev.screenHistory];
            newHistory.pop(); // Remove current screen
            const previousScreen = newHistory[newHistory.length - 1] || prev.screenHistory[0];
            
            return {
                currentScreen: previousScreen,
                previousScreen: prev.currentScreen,
                screenHistory: newHistory.length > 0 ? newHistory : [previousScreen],
                screenData: undefined
            };
        });
    };

    const clearHistory = () => {
        setNavigationState(prev => ({
            currentScreen: prev.currentScreen,
            previousScreen: undefined,
            screenHistory: [prev.currentScreen],
            screenData: undefined
        }));
    };

    const canGoBack = navigationState.screenHistory.length > 1;

    const value: NavigationContextType = {
        navigationState,
        navigateTo,
        navigateBack,
        navigateToWithHistory,
        clearHistory,
        canGoBack
    };

    return (
        <NavigationContext.Provider value={value}>
            {children}
        </NavigationContext.Provider>
    );
};