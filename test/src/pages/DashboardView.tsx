import React from 'react';

interface DashboardViewProps {
    onBeginEncounter: () => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ onBeginEncounter }) => {
    const appointments = [
        { time: '9:00 AM', patient: 'Sarah Johnson', reason: 'Annual Physical', status: 'waiting' },
        { time: '9:30 AM', patient: 'Michael Chen', reason: 'Follow-up Diabetes', status: 'ready' },
        { time: '10:00 AM', patient: 'Emma Williams', reason: 'Telehealth Consultation', status: 'in-room' },
        { time: '10:30 AM', patient: 'Robert Davis', reason: 'Chest Pain Evaluation', status: 'waiting' }
    ];

    const inboxItems = [
        { type: 'Critical Lab Result', patient: 'John Smith', detail: 'Troponin Elevated', time: '2 min ago', priority: 'high' },
        { type: 'Medication Refill', patient: 'Maria Garcia', detail: 'Metformin', time: '15 min ago', priority: 'normal' },
        { type: 'Staff Message', patient: '', detail: 'Room 3 ready for next patient', time: '1 hour ago', priority: 'normal' }
    ];

    const atRiskPatients = [
        { patient: 'David Thompson', issue: 'Overdue HbA1c (90 days)' },
        { patient: 'Lisa Anderson', issue: 'Multiple ER visits (3 this month)' }
    ];

    const recentActivity = [
        { patient: 'Jennifer Lee', action: 'Viewed chart 10 min ago' },
        { patient: 'Mark Wilson', action: 'Signed note 1 hour ago' }
    ];

    const getStatusIndicator = (status: string) => {
        const colors: { [key: string]: string } = {
            waiting: 'bg-yellow-400',
            ready: 'bg-green-400',
            'in-room': 'bg-red-400'
        };
        return `w-3 h-3 rounded-full ${colors[status] || 'bg-gray-400'}`;
    };

    return (
        <div className="p-6">
            <div className="grid grid-cols-3 gap-6 mb-6">
                {/* Today's Appointments */}
                <div className="col-span-2 bg-white rounded-lg shadow-lg">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-slate-800 flex items-center">
                            <i className="fas fa-calendar-alt mr-2"></i>
                            Today's Appointments (12)
                        </h2>
                    </div>
                    <div className="p-6 space-y-4">
                        {appointments.map((appt, index) => (
                            <div key={index} className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                                <div className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-medium mr-4 min-w-[70px] text-center">
                                    {appt.time}
                                </div>
                                <div className="flex-1">
                                    <div className="font-semibold text-slate-800">{appt.patient}</div>
                                    <div className="text-sm text-gray-600">{appt.reason}</div>
                                </div>
                                <div className={getStatusIndicator(appt.status)}></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Priority Inbox */}
                <div className="bg-white rounded-lg shadow-lg">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-slate-800 flex items-center">
                            <i className="fas fa-inbox mr-2"></i>
                            Priority Inbox (8)
                        </h2>
                    </div>
                    <div className="p-6 space-y-3">
                        {inboxItems.map((item, index) => (
                            <div key={index} className={`p-3 rounded-lg border-l-4 ${item.priority === 'high' ? 'border-red-500 bg-red-50' : 'border-blue-500 bg-blue-50'}`}>
                                <div className="font-semibold text-sm">{item.type}</div>
                                <div className="text-sm text-gray-600">
                                    {item.patient && `${item.patient} - `}{item.detail}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">{item.time}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                {/* At-Risk Patients */}
                <div className="bg-white rounded-lg shadow-lg">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-slate-800 flex items-center">
                            <i className="fas fa-exclamation-triangle mr-2 text-yellow-500"></i>
                            At-Risk Patients
                        </h2>
                    </div>
                    <div className="p-6 space-y-3">
                        {atRiskPatients.map((patient, index) => (
                            <div key={index} className="p-3 border border-gray-100 rounded-lg">
                                <div className="font-semibold text-slate-800">{patient.patient}</div>
                                <div className="text-sm text-gray-600">{patient.issue}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow-lg">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-slate-800 flex items-center">
                            <i className="fas fa-clock mr-2"></i>
                            Recent Activity
                        </h2>
                    </div>
                    <div className="p-6 space-y-3">
                        {recentActivity.map((activity, index) => (
                            <div key={index} className="p-3 border border-gray-100 rounded-lg">
                                <div className="font-semibold text-slate-800">{activity.patient}</div>
                                <div className="text-sm text-gray-600">{activity.action}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardView;