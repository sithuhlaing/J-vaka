import React from 'react';

const DashboardView = ({ onBeginEncounter }) => {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Clinician Dashboard</h1>
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3 lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Today's Schedule</h2>
                    <div className="p-4 border rounded-lg flex justify-between items-center">
                        <div>
                            <p className="font-bold">9:00 AM</p>
                            <p className="font-semibold text-blue-600">Sarah Jones</p>
                            <p className="text-sm text-gray-500">Annual Physical</p>
                        </div>
                        <button 
                            onClick={() => onBeginEncounter('Sarah Jones')} 
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                            Begin Encounter
                        </button>
                    </div>
                </div>
                <div className="col-span-3 lg:col-span-1 bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Priority Inbox</h2>
                    <p>No urgent messages.</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardView;