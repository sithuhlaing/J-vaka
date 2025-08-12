import React from 'react';

interface PatientHeaderProps {
    onStartEncounter?: () => void;
    encounterType?: string;
}

const PatientHeader: React.FC<PatientHeaderProps> = ({ onStartEncounter, encounterType = "" }) => {
    return (
        <>
            <div className="bg-gradient-to-r from-slate-800 to-blue-600 text-white p-6 flex items-center justify-between">
                <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-3xl text-gray-600">
                        👤
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-1">
                            Sarah Johnson {encounterType && `- ${encounterType}`}
                        </h2>
                        <div className="text-blue-100 space-y-1">
                            <div>Age: 34 • DOB: 03/15/1990 • MRN: 12345678</div>
                            <div>Last Visit: 01/15/2025 • Primary Insurance: Blue Cross</div>
                        </div>
                    </div>
                </div>
                <div className="flex space-x-3">
                    {onStartEncounter && (
                        <button 
                            onClick={onStartEncounter} 
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                        >
                            Start Encounter
                        </button>
                    )}
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                        Send Message
                    </button>
                </div>
            </div>
            
            <div className="bg-red-600 text-white px-6 py-3 text-center font-semibold">
                🚨 ALLERGIES: Penicillin (Severe), Shellfish (Moderate)
            </div>
        </>
    );
};

export default PatientHeader;