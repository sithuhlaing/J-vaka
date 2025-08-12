import React from 'react';
import { Calendar, Users, FileText, Clock, Video, Phone, CheckCircle, AlertCircle } from 'lucide-react';

const OHProfessionalDashboard = () => {
    const todayAppointments = [
        {
            id: 1,
            patient: "John Smith",
            time: "10:30 AM - 11:00 AM",
            reason: "Annual Health Check",
            status: "ready",
            type: "in-person",
            mrn: "MRN123456",
            employeeId: "EMP001"
        },
        {
            id: 2,
            patient: "Emily Davis",
            time: "11:30 AM - 12:00 PM",
            reason: "Follow-up Consultation",
            status: "scheduled",
            type: "video",
            mrn: "MRN789012",
            employeeId: "EMP002"
        },
        {
            id: 3,
            patient: "Michael Brown",
            time: "2:00 PM - 2:30 PM",
            reason: "Occupational Assessment",
            status: "scheduled",
            type: "in-person",
            mrn: "MRN345678",
            employeeId: "EMP003"
        }
    ];

    const recentActivity = [
        {
            id: 1,
            action: "Health assessment completed",
            patient: "John Smith",
            time: "2 hours ago"
        },
        {
            id: 2,
            action: "Report generated",
            patient: "Monthly summary",
            time: "4 hours ago"
        },
        {
            id: 3,
            action: "New patient registered",
            patient: "Emma Wilson",
            time: "Yesterday"
        }
    ];

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'ready':
                return <CheckCircle className="h-4 w-4 text-green-600" />;
            case 'scheduled':
                return <Clock className="h-4 w-4 text-blue-600" />;
            default:
                return <AlertCircle className="h-4 w-4 text-yellow-600" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'ready':
                return 'border-l-green-600';
            case 'scheduled':
                return 'border-l-blue-600';
            default:
                return 'border-l-yellow-600';
        }
    };

    return (
        <div className="p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-blue-600 font-semibold text-sm">Today's Schedule</h3>
                        <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mb-1">8 Appointments</p>
                    <p className="text-gray-600 text-sm mb-3">Next: 10:30 AM - John Smith</p>
                    <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">
                        View Full Schedule
                    </button>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-green-600 font-semibold text-sm">Active Patients</h3>
                        <Users className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mb-1">156</p>
                    <p className="text-gray-600 text-sm mb-3">3 requiring follow-up</p>
                    <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">
                        Patient List
                    </button>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-red-600 font-semibold text-sm">Pending Tasks</h3>
                        <FileText className="h-5 w-5 text-red-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mb-1">5</p>
                    <p className="text-gray-600 text-sm mb-3">2 reports to complete</p>
                    <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">
                        View Tasks
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Today's Appointments */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Today's Appointments</h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {todayAppointments.map(appointment => (
                                <div key={appointment.id} className={`p-4 bg-gray-50 rounded-lg border-l-4 ${getStatusColor(appointment.status)}`}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-2">
                                                {getStatusIcon(appointment.status)}
                                                <h4 className="font-semibold text-gray-900">
                                                    {appointment.patient} - {appointment.reason}
                                                </h4>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-1">
                                                {appointment.time} | {appointment.type === 'video' ? 'Video Call' : 'In-Person'}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {appointment.mrn} | {appointment.employeeId}
                                            </p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button className="px-3 py-1 bg-gray-500 text-white rounded text-xs hover:bg-gray-600 transition-colors">
                                                View Profile
                                            </button>
                                            {appointment.status === 'ready' && (
                                                <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors">
                                                    {appointment.type === 'video' ? (
                                                        <>
                                                            <Video className="inline h-3 w-3 mr-1" />
                                                            Join Video
                                                        </>
                                                    ) : (
                                                        'Start'
                                                    )}
                                                </button>
                                            )}
                                            {appointment.status === 'scheduled' && (
                                                <button className="px-3 py-1 bg-gray-500 text-white rounded text-xs hover:bg-gray-600 transition-colors">
                                                    Prepare
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                    {/* Quick Actions */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                        </div>
                        <div className="p-6 space-y-3">
                            <button className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                                <Users className="h-4 w-4" />
                                <span>View All Patients</span>
                            </button>
                            <button className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                                <FileText className="h-4 w-4" />
                                <span>Generate Report</span>
                            </button>
                            <button className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                                <FileText className="h-4 w-4" />
                                <span>Create Template</span>
                            </button>
                            <button className="w-full py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2">
                                <Calendar className="h-4 w-4" />
                                <span>Settings</span>
                            </button>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4 text-sm">
                                {recentActivity.map(activity => (
                                    <div key={activity.id} className="border-b border-gray-100 pb-3">
                                        <p className="font-semibold text-gray-900">{activity.action}</p>
                                        <p className="text-gray-600 mt-1">{activity.patient}</p>
                                        <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
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

export default OHProfessionalDashboard;