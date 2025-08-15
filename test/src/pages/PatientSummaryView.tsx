import React from 'react';
import PatientHeader from '../components/PatientHeader';
import InfoCard from '../components/InfoCard';

interface PatientSummaryViewProps {
    onStartEncounter: () => void;
}

const PatientSummaryView: React.FC<PatientSummaryViewProps> = ({ onStartEncounter }) => {
    const problems = ["Hypertension (I10)", "Type 2 Diabetes (E11.9)"];
    
    return (
        <div>
            <PatientHeader onStartEncounter={onStartEncounter} />
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <InfoCard title="Problem List">
                    <ul className="list-disc pl-5">
                        {problems.map(p => <li key={p}>{p}</li>)}
                    </ul>
                </InfoCard>
            </div>
        </div>
    );
};

export default PatientSummaryView;