import React, { useState } from 'react';
import PatientHeader from '../components/PatientHeader';

const EncounterNoteView = () => {
    const [activeTab, setActiveTab] = useState('S');
    
    return (
        <div>
            <PatientHeader />
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Encounter Note - Oct 26, 2023</h2>
                <div className="bg-white rounded-lg shadow-lg">
                    <div className="flex border-b">
                        {['S', 'O', 'A', 'P'].map(tab => (
                            <button 
                                key={tab} 
                                onClick={() => setActiveTab(tab)} 
                                className={`py-3 px-6 font-semibold ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className="p-6">
                        {activeTab === 'S' && (
                            <div>
                                <h3 className="font-bold mb-2">Subjective</h3>
                                <textarea 
                                    className="w-full h-32 p-2 border rounded" 
                                    placeholder="Enter chief complaint and history..."
                                ></textarea>
                            </div>
                        )}
                        {activeTab === 'O' && (
                            <div>
                                <h3 className="font-bold mb-2">Objective</h3>
                                <p>Vitals and Physical Exam sections would go here.</p>
                            </div>
                        )}
                        {activeTab === 'A' && (
                            <div>
                                <h3 className="font-bold mb-2">Assessment</h3>
                                <p>Diagnosis codes would be selected here.</p>
                            </div>
                        )}
                        {activeTab === 'P' && (
                            <div>
                                <h3 className="font-bold mb-2">Plan</h3>
                                <div className="flex space-x-4">
                                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                                        <i className="fas fa-pills mr-2"></i>Order Prescription
                                    </button>
                                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                                        <i className="fas fa-vial mr-2"></i>Order Labs
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="p-4 bg-gray-50 border-t flex justify-end">
                        <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700">
                            Sign & Close Encounter
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EncounterNoteView;