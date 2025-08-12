import React, { useState } from 'react';
import PatientHeader from '../components/PatientHeader';

const EncounterNoteView = () => {
    const [activeTab, setActiveTab] = useState('S');
    
    const tabs = [
        { id: 'S', name: 'S - Subjective' },
        { id: 'O', name: 'O - Objective' },
        { id: 'A', name: 'A - Assessment' },
        { id: 'P', name: 'P - Plan' }
    ];
    
    return (
        <div>
            <PatientHeader encounterType="Annual Physical" />
            
            <div className="p-6">
                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-6">
                    {tabs.map(tab => (
                        <button 
                            key={tab.id} 
                            onClick={() => setActiveTab(tab.id)} 
                            className={`py-3 px-6 font-semibold border-b-2 transition-colors ${
                                activeTab === tab.id 
                                    ? 'text-blue-600 border-blue-600' 
                                    : 'text-gray-500 border-transparent hover:text-gray-700'
                            }`}
                        >
                            {tab.name}
                        </button>
                    ))}
                </div>
                
                {/* Tab Content */}
                {activeTab === 'S' && (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800 mb-3">Chief Complaint</h3>
                            <textarea 
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                rows={3}
                                placeholder="Enter chief complaint..."
                                defaultValue='"Here for annual physical. No specific concerns today."'
                            />
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800 mb-3">History of Present Illness</h3>
                            <textarea 
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                rows={4}
                                placeholder="Enter HPI details..."
                                defaultValue="Patient reports feeling well overall. Continues on current medications for hypertension and diabetes. Denies chest pain, shortness of breath, or palpitations. Blood sugars have been well-controlled at home."
                            />
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800 mb-3">Review of Systems</h3>
                            <div className="grid grid-cols-3 gap-4">
                                {['Constitutional', 'Cardiovascular', 'Respiratory', 'GI', 'GU', 'Musculoskeletal', 'Neurological', 'Psychiatric', 'Endocrine'].map(system => (
                                    <label key={system} className="flex items-center space-x-2">
                                        <input 
                                            type="checkbox" 
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            defaultChecked={system === 'Cardiovascular'}
                                        />
                                        <span className="text-sm text-gray-700">{system}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        
                        <div className="flex space-x-3 pt-4">
                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                                📝 Templates
                            </button>
                            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                                🎤 Voice Input
                            </button>
                            <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                                📋 Smart Phrases
                            </button>
                        </div>
                    </div>
                )}
                
                {activeTab === 'O' && (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800 mb-3">Vital Signs</h3>
                            <div className="grid grid-cols-4 gap-4">
                                <input type="text" placeholder="BP" className="p-2 border rounded" />
                                <input type="text" placeholder="HR" className="p-2 border rounded" />
                                <input type="text" placeholder="Temp" className="p-2 border rounded" />
                                <input type="text" placeholder="O2 Sat" className="p-2 border rounded" />
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800 mb-3">Physical Examination</h3>
                            <textarea 
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                rows={6}
                                placeholder="Document physical examination findings..."
                            />
                        </div>
                    </div>
                )}
                
                {activeTab === 'A' && (
                    <div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-3">Assessment & Diagnosis</h3>
                        <textarea 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            rows={6}
                            placeholder="Enter assessment and diagnosis codes..."
                        />
                    </div>
                )}
                
                {activeTab === 'P' && (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800 mb-3">Plan</h3>
                            <textarea 
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                rows={4}
                                placeholder="Enter treatment plan..."
                            />
                        </div>
                        
                        <div className="flex space-x-3">
                            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                                💊 Order Prescription
                            </button>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                                🧪 Order Labs
                            </button>
                            <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                                🏥 Order Imaging
                            </button>
                        </div>
                    </div>
                )}
                
                {/* Action Buttons */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                    <div className="flex space-x-3">
                        <button className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                            💾 Save Draft
                        </button>
                    </div>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 rounded-lg font-semibold transition-colors">
                        ✅ Sign & Complete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EncounterNoteView;