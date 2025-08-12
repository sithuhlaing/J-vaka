import React from 'react';
import { Calendar, FileText, Video, MessageCircle, User, Shield } from 'lucide-react';

const EmployeeDashboard = () => {
    return (
        <div className="p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 border-l-4 border-l-green-500">
                    <h3 className="text-green-600 font-semibold text-sm mb-2">Health Status</h3>
                    <p className="text-2xl font-bold text-green-600 mb-1">✓ Up to Date</p>
                    <p className="text-gray-600 text-sm">Last checkup: 15 days ago</p>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 border-l-4 border-l-orange-500">
                    <h3 className="text-orange-600 font-semibold text-sm mb-2">Next Appointment</h3>
                    <p className="text-xl font-semibold text-gray-900 mb-1">March 15, 2024</p>
                    <p className="text-gray-600 text-sm">Annual Health Review</p>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 border-l-4 border-l-red-500">
                    <h3 className="text-red-600 font-semibold text-sm mb-2">Action Required</h3>
                    <p className="text-2xl font-bold text-red-600 mb-1">1</p>
                    <p className="text-gray-600 text-sm">Update emergency contact</p>
                </div>
                
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
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <button className="flex flex-col items-center p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                <Calendar className="h-6 w-6 mb-2" />
                                <span className="text-sm font-medium">Book Appointment</span>
                            </button>
                            <button className="flex flex-col items-center p-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                                <FileText className="h-6 w-6 mb-2" />
                                <span className="text-sm font-medium">View Documents</span>
                            </button>
                            <button className="flex flex-col items-center p-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                                <Video className="h-6 w-6 mb-2" />
                                <span className="text-sm font-medium">Video Call</span>
                            </button>
                            <button className="flex flex-col items-center p-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                                <MessageCircle className="h-6 w-6 mb-2" />
                                <span className="text-sm font-medium">Send Message</span>
                            </button>
                            <button className="flex flex-col items-center p-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                                <User className="h-6 w-6 mb-2" />
                                <span className="text-sm font-medium">Update Profile</span>
                            </button>
                            <button className="flex flex-col items-center p-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                                <Shield className="h-6 w-6 mb-2" />
                                <span className="text-sm font-medium">Privacy Settings</span>
                            </button>
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
                            <div className="border-b border-gray-100 pb-4">
                                <p className="font-semibold text-gray-900">Health Check Completed</p>
                                <p className="text-sm text-gray-600 mt-1">Feb 28, 2024</p>
                            </div>
                            <div className="border-b border-gray-100 pb-4">
                                <p className="font-semibold text-gray-900">New Document Added</p>
                                <p className="text-sm text-gray-600 mt-1">Feb 25, 2024</p>
                            </div>
                            <div className="border-b border-gray-100 pb-4">
                                <p className="font-semibold text-gray-900">Message from Dr. Johnson</p>
                                <p className="text-sm text-gray-600 mt-1">Feb 22, 2024</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;