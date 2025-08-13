import React, { useState, useEffect } from 'react';
import { Calendar, FileText, Video, MessageCircle, User, Shield, Bell } from 'lucide-react';
import { AppScreen } from '../contexts/NavigationContext';

interface HealthStatus {
    status: 'up_to_date' | 'needs_attention' | 'overdue';
    text: string;
    lastCheckup: string;
    color: 'green' | 'orange' | 'red';
}

interface Appointment {
    id: string;
    date: string;
    time: string;
    type: string;
    mode: 'in_person' | 'video' | 'phone';
}

interface Activity {
    id: string;
    description: string;
    timestamp: string;
    icon: string;
}

interface EmployeeDashboardProps {
    onNavigate: (screen: AppScreen, data?: any) => void;
}

const EmployeeDashboard: React.FC<EmployeeDashboardProps> = ({ onNavigate }) => {
    const [healthStatus] = useState<HealthStatus>({
        status: 'up_to_date',
        text: '✓ Up to Date',
        lastCheckup: '15 days ago',
        color: 'green'
    });

    const [upcomingAppointment] = useState<Appointment>({
        id: '1',
        date: 'March 15, 2024',
        time: '10:30 AM',
        type: 'Annual Health Review',
        mode: 'in_person'
    });

    const [recentActivity] = useState<Activity[]>([
        {
            id: '1',
            description: 'Health Check Completed',
            timestamp: 'Feb 28, 2024',
            icon: '✅'
        },
        {
            id: '2',
            description: 'New Document Added',
            timestamp: 'Feb 25, 2024',
            icon: '📄'
        },
        {
            id: '3',
            description: 'Message from Dr. Johnson',
            timestamp: 'Feb 22, 2024',
            icon: '💬'
        }
    ]);

    const [unreadCount] = useState(3);
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const today = new Date().toLocaleDateString('en-GB', { 
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        setCurrentDate(today);
    }, []);

    const quickActions = [
        { 
            label: 'Book Appointment', 
            icon: Calendar, 
            action: () => onNavigate('book_appointment'),
            color: 'bg-blue-600 hover:bg-blue-700'
        },
        { 
            label: 'Documents', 
            icon: FileText, 
            action: () => onNavigate('documents'),
            color: 'bg-gray-600 hover:bg-gray-700'
        },
        { 
            label: 'Video Call', 
            icon: Video, 
            action: () => onNavigate('video_call'),
            color: 'bg-gray-600 hover:bg-gray-700'
        },
        { 
            label: 'Messages', 
            icon: MessageCircle, 
            action: () => onNavigate('messages'),
            color: 'bg-gray-600 hover:bg-gray-700',
            badge: unreadCount > 0 ? unreadCount : undefined
        },
        { 
            label: 'Profile', 
            icon: User, 
            action: () => onNavigate('profile_settings'),
            color: 'bg-gray-500 hover:bg-gray-600'
        },
        { 
            label: 'Privacy', 
            icon: Shield, 
            action: () => onNavigate('profile_settings'),
            color: 'bg-gray-500 hover:bg-gray-600'
        }
    ];

    return (
        <div className="responsive-container min-h-full">
            <div className="p-6">
                {/* Header Component */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Welcome, John
                        </h2>
                        <p className="text-gray-600 text-sm mt-1">
                            {currentDate}
                        </p>
                    </div>
                    <div className="relative">
                        <button 
                            className="p-2 text-gray-600 hover:text-gray-900 relative"
                            onClick={() => onNavigate('notifications_center')}
                        >
                            <Bell className="h-6 w-6" />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {unreadCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Health Status Card */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 border-l-4 border-l-green-500">
                        <div className="flex items-center mb-4">
                            <div className={`w-4 h-4 rounded-full bg-${healthStatus.color}-500 mr-3`}></div>
                            <h3 className="text-green-600 font-semibold text-sm">Health Status</h3>
                        </div>
                        <p className="text-2xl font-bold text-green-600 mb-1">{healthStatus.text}</p>
                        <p className="text-gray-600 text-sm">Last checkup: {healthStatus.lastCheckup}</p>
                    </div>
                    
                    {/* Next Appointment Card */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 border-l-4 border-l-orange-500">
                        <h3 className="text-orange-600 font-semibold text-sm mb-2">Next Appointment</h3>
                        <p className="text-xl font-semibold text-gray-900 mb-1">{upcomingAppointment.date}</p>
                        <p className="text-gray-600 text-sm">{upcomingAppointment.type}</p>
                        <div className="mt-3">
                            <button className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                                {upcomingAppointment.time}
                            </button>
                        </div>
                    </div>
                    
                    {/* Action Required Card */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 border-l-4 border-l-red-500">
                        <h3 className="text-red-600 font-semibold text-sm mb-2">Action Required</h3>
                        <p className="text-2xl font-bold text-red-600 mb-1">1</p>
                        <p className="text-gray-600 text-sm">Update emergency contact</p>
                    </div>
                    
                    {/* Documents Card */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 border-l-4 border-l-purple-500">
                        <h3 className="text-purple-600 font-semibold text-sm mb-2">Documents</h3>
                        <p className="text-2xl font-bold text-gray-900 mb-1">12</p>
                        <p className="text-gray-600 text-sm">Health certificates & reports</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Quick Actions */}
                    <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                        </div>
                        <div className="p-6">
                            <div className="button-flex-wrap">
                                {quickActions.map((action, index) => (
                                    <button 
                                        key={index}
                                        onClick={action.action}
                                        className={`flex flex-col items-center justify-center p-4 ${action.color} text-white rounded-lg transition-colors relative`}
                                    >
                                        <action.icon className="h-6 w-6 mb-2 flex-shrink-0" />
                                        <span className="text-sm font-medium text-center leading-tight">
                                            {action.label}
                                        </span>
                                        {action.badge && (
                                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                                {action.badge}
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {recentActivity.map((activity) => (
                                    <div key={activity.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                                        <div className="flex items-start space-x-3">
                                            <span className="text-lg">{activity.icon}</span>
                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-900 text-sm">
                                                    {activity.description}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {activity.timestamp}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;