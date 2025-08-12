import React from 'react';
import PatientHeader from '../components/PatientHeader';

const LabsView = () => {
    const labs = [
        { date: '10/26/2023', name: 'Lipid Panel', status: 'Pending', isAbnormal: false },
        { date: '10/26/2023', name: 'Complete Blood Count (CBC)', status: 'Pending', isAbnormal: false },
        { date: '08/15/2023', name: 'Hemoglobin A1c', status: 'Final', isAbnormal: true, result: '7.2%' },
        { date: '08/15/2023', name: 'Comprehensive Metabolic Panel', status: 'Final', isAbnormal: false, result: 'View' }
    ];
    
    return (
        <div>
            <PatientHeader />
            <div className="p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Lab Results</h2>
                <div className="bg-white rounded-xl shadow-lg">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b-2 border-slate-200">
                            <tr>
                                <th className="p-4 font-semibold">Date</th>
                                <th className="p-4 font-semibold">Test Name</th>
                                <th className="p-4 font-semibold">Status</th>
                                <th className="p-4 font-semibold">Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            {labs.map(lab => (
                                <tr key={lab.date + lab.name} className="border-b border-slate-200 hover:bg-slate-50">
                                    <td className="p-4">{lab.date}</td>
                                    <td className="p-4 font-medium text-slate-800">{lab.name}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${lab.status === 'Final' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {lab.status}
                                        </span>
                                    </td>
                                    <td className={`p-4 font-medium ${lab.isAbnormal ? 'text-red-600' : ''}`}>
                                        {lab.isAbnormal && <i className="fas fa-exclamation-triangle mr-2"></i>}
                                        {lab.result || 'N/A'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LabsView;