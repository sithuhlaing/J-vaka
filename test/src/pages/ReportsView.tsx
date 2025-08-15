import React, { useState } from 'react';

const ReportsView = () => {
    const allReports = [
        { category: 'Clinical', title: 'Patient Demographics', description: 'Lists all patients with contact and insurance info.', icon: 'fas fa-users' },
        { category: 'Clinical', title: 'Medication History', description: 'Review active and inactive medications for a patient.', icon: 'fas fa-pills' },
        { category: 'Administrative', title: 'Appointment No-Shows', description: 'Track patients who missed their scheduled appointments.', icon: 'fas fa-calendar-times' },
        { category: 'Billing', title: 'Daily Revenue Summary', description: 'A summary of charges and payments for the selected day.', icon: 'fas fa-dollar-sign' },
        { category: 'Clinical', title: 'Chronic Condition Registry', description: 'Find all patients with a specific diagnosis (e.g., Diabetes).', icon: 'fas fa-disease' },
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const [openCategory, setOpenCategory] = useState<string | null>('Clinical');

    const filteredReports = allReports.filter(report =>
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const categories = Array.from(new Set(allReports.map(r => r.category)));

    const ReportCard = ({ report }: { report: any }) => (
        <div className="bg-gray-50 border rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center">
                <i className={`${report.icon} text-xl text-blue-500 mr-4`}></i>
                <div>
                    <p className="font-semibold text-gray-800">{report.title}</p>
                    <p className="text-sm text-gray-500">{report.description}</p>
                </div>
            </div>
            <button 
                onClick={() => alert(`Running report: ${report.title}`)} 
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-300"
            >
                Run Report
            </button>
        </div>
    );

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Reports Dashboard</h1>

            <div className="mb-6 relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <i className="fas fa-search text-gray-400"></i>
                </span>
                <input
                    type="text"
                    placeholder="Search for a report..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="space-y-6">
                {categories.map(category => (
                    <div key={category} className="bg-white rounded-lg shadow-lg">
                        <button 
                            onClick={() => setOpenCategory(openCategory === category ? null : category)} 
                            className="w-full text-left p-4 font-bold text-xl flex justify-between items-center"
                        >
                            {category} Reports
                            <i className={`fas fa-chevron-down transition-transform ${openCategory === category ? 'rotate-180' : ''}`}></i>
                        </button>
                        {openCategory === category && (
                            <div className="p-4 space-y-4">
                                {filteredReports.filter(r => r.category === category).map(report => 
                                    <ReportCard key={report.title} report={report} />
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReportsView;