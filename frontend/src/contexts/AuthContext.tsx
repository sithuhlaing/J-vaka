import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'employee' | 'oh_professional' | 'manager';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    department?: string;
    employeeId?: string;
    specialty?: string;
    team?: string;
    avatar?: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string, role: UserRole) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const login = async (email: string, password: string, role: UserRole): Promise<void> => {
        setIsLoading(true);
        
        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Mock user data based on role
            let userData: User;
            
            switch (role) {
                case 'employee':
                    userData = {
                        id: 'emp001',
                        name: 'John Smith',
                        email: email,
                        role: 'employee',
                        department: 'Engineering',
                        employeeId: 'EMP001'
                    };
                    break;
                case 'oh_professional':
                    userData = {
                        id: 'oh001',
                        name: 'Dr. Sarah Johnson',
                        email: email,
                        role: 'oh_professional',
                        specialty: 'Occupational Health Physician',
                        department: 'Occupational Health'
                    };
                    break;
                case 'manager':
                    userData = {
                        id: 'mgr001',
                        name: 'Rebecca Martinez',
                        email: email,
                        role: 'manager',
                        department: 'Engineering',
                        team: 'Team of 24'
                    };
                    break;
            }
            
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    // Check for existing session on mount
    React.useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Failed to parse stored user:', error);
                localStorage.removeItem('user');
            }
        }
    }, []);

    const value: AuthContextType = {
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};