import React from 'react';
import PatientHeader from '../components/PatientHeader';
import InfoCard from '../components/InfoCard';

const MedicationsView = () => {
    const activeMeds = [
        { name: 'Lisinopril 10mg Tablet', sig: '1 tablet by mouth daily', refills: 3, lastFill: '09/15/2023' },
        { name: 'Metformin 500mg Tablet', sig: '1 tablet by mouth twice daily', refills: 2, lastFill: '09/15/2023' },
    ];
    
    return (
        <div>
            <PatientHeader />
            <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-slate-800">Medication Management</h2>
                    <button className="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700">
                        <i className="fas fa-plus mr-2"></i>Add New Prescription
                    </button>
                </div>
                <div className="space-y-8">
                    <InfoCard title="Active Medications">
                        <div className="space-y-4">
                            {activeMeds.map(med => (
                                <div key={med.name} className="p-3 bg-slate-50 rounded-lg flex justify-between items-center">
                                    <div>
                                        <p className="font-bold">{med.name}</p>
                                        <p className="text-slate-600">{med.sig}</p>
                                        <p className="text-xs text-slate-500">
                                            Refills: {med.refills} | Last Filled: {med.lastFill}
                                        </p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200">
                                            Refill
                                        </button>
                                        <button className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200">
                                            Discontinue
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </InfoCard>
                    <InfoCard title="Past Medications">
                        <p className="text-slate-500">No past medications on record.</p>
                    </InfoCard>
                </div>
            </div>
        </div>
    );
};

export default MedicationsView;