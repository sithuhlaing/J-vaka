import React from 'react';
import { TrendingUp, Users, AlertTriangle, BarChart3, Calendar, Settings } from 'lucide-react';
import { AppScreen } from '../contexts/NavigationContext';

interface ManagerDashboardProps {
    onNavigate: (screen: AppScreen, data?: any) => void;
}

const ManagerDashboard: React.FC<ManagerDashboardProps> = ({ onNavigate }) => {
    const teamAlerts = [
        {
            id: 1,
            type: "overdue",
            title: "Overdue Health Assessment",
            employee: "Mike Johnson",
            details: "Due 5 days ago",
            priority: "warning"
        },
        {
            id: 2,
            type: "return-to-work",
            title: "Return to Work Assessment Required",
            employee: "Sarah Wilson",
            details: "Back from sick leave",
            priority: "urgent"
        }
    ];

    const teamActivity = [
        {
            id: 1,
            action: "Health assessment completed",
            employee: "John Smith",
            time: "2 hours ago"
        },
        {
            id: 2,
            action: "Document uploaded",
            employee: "Emily Davis",
            time: "4 hours ago"
        },
        {
            id: 3,
            action: "Appointment scheduled",
            employee: "Mike Johnson",
            time: "Yesterday"
        }
    ];

    const complianceData = [
        { category: "Annual Health Checks", completed: 22, total: 24, color: "text-green-600" },
        { category: "Risk Assessments", completed: 24, total: 24, color: "text-green-600" },
        { category: "Training Completed", completed: 20, total: 24, color: "text-orange-600" },
        { category: "Document Updates", completed: 23, total: 24, color: "text-green-600" }
    ];

    return (
        <div className="p-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 border-l-4 border-l-green-500">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-green-600 font-semibold text-sm">Team Health Score</h3>
                        <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-3xl font-bold text-green-600 mb-1">87%</p>
                    <p className="text-gray-600 text-sm">↑ 5% from last month</p>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 border-l-4 border-l-blue-500">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-blue-600 font-semibold text-sm">Compliance Rate</h3>
                        <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="text-3xl font-bold text-blue-600 mb-1">92%</p>
                    <p className="text-gray-600 text-sm">22/24 up to date</p>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 border-l-4 border-l-orange-500">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-orange-600 font-semibold text-sm">Health Absences</h3>
                        <Calendar className="h-5 w-5 text-orange-600" />
                    </div>
                    <p className="text-3xl font-bold text-orange-600 mb-1">3</p>
                    <p className="text-gray-600 text-sm">This month</p>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 border-l-4 border-l-red-500">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-red-600 font-semibold text-sm">Action Required</h3>
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <p className="text-3xl font-bold text-red-600 mb-1">2</p>
                    <p className="text-gray-600 text-sm">Overdue assessments</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Team Health Overview */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Team Health Overview</h3>
                    </div>
                    <div className="p-6">
                        {/* Health Trends Chart Placeholder */}
                        <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center mb-6">
                            <div className="text-center text-gray-500">
                                <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                                <p>Team Health Trends Chart</p>
                                <small>Shows health metrics over time for the team</small>
                            </div>
                        </div>
                        
                        {/* Recent Alerts */}
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Alerts</h4>
                        <div className="space-y-3">
                            {teamAlerts.map(alert => (
                                <div key={alert.id} className={`p-4 rounded-lg border ${
                                    alert.priority === 'urgent' 
                                        ? 'bg-red-50 border-red-200' 
                                        : 'bg-yellow-50 border-yellow-200'
                                }`}>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className={`font-semibold ${
                                                alert.priority === 'urgent' ? 'text-red-800' : 'text-yellow-800'
                                            }`}>
                                                {alert.priority === 'urgent' ? '🚨' : '⚠️'} {alert.title}
                                            </h4>
                                            <p className={`text-sm mt-1 ${
                                                alert.priority === 'urgent' ? 'text-red-700' : 'text-yellow-700'
                                            }`}>
                                                {alert.employee} - {alert.details}
                                            </p>
                                        </div>
                                        <button className="px-4 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors">
                                            {alert.type === 'return-to-work' ? 'Schedule' : 'Review'}
                                        </button>
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
                                <BarChart3 className="h-4 w-4" />
                                <span>Generate Team Report</span>
                            </button>
                            <button className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                                <Users className="h-4 w-4" />
                                <span>View All Team Members</span>
                            </button>
                            <button className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                                <Calendar className="h-4 w-4" />
                                <span>Schedule Team Assessment</span>
                            </button>
                            <button className="w-full py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2">
                                <Settings className="h-4 w-4" />
                                <span>Settings</span>
                            </button>
                        </div>
                    </div>

                    {/* Compliance Summary */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Compliance Summary</h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {complianceData.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100">
                                        <span className="text-sm text-gray-700">{item.category}</span>
                                        <span className={`font-bold text-sm ${item.color}`}>
                                            {item.completed}/{item.total}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Team Activity */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Team Activity</h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-3 text-sm">
                                {teamActivity.map(activity => (
                                    <div key={activity.id} className="border-b border-gray-100 pb-3">
                                        <p className="font-semibold text-gray-900">{activity.action}</p>
                                        <p className="text-gray-600 mt-1">{activity.employee}</p>
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

export default ManagerDashboard;