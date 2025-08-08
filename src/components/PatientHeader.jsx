import React from 'react';

const PatientHeader = ({ onStartEncounter }) => {
    return (
        <div className="bg-white shadow-md p-3 flex justify-between items-center border-b-2 border-gray-200">
            <div className="flex items-center">
                <img src="https://i.pravatar.cc/50?u=sarah" alt="Patient" className="w-12 h-12 rounded-full mr-4" />
                <div>
                    <h1 className="text-xl font-bold text-gray-800">Sarah Jones</h1>
                    <div className="text-sm text-gray-500">Age: 34 | DOB: 05/20/1989</div>
                </div>
            </div>
            <div className="bg-red-100 border border-red-500 text-red-700 px-4 py-2 rounded-md font-semibold">
                <span className="font-bold">Alerts:</span> Penicillin Allergy
            </div>
            {onStartEncounter && (
                <button onClick={onStartEncounter} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
                    Start Encounter
                </button>
            )}
        </div>
    );
};

export default PatientHeader;