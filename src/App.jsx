import React, { useState } from 'react';
import Navigation from './components/Navigation';
import PatientHeader from './components/PatientHeader';
import DashboardView from './pages/DashboardView';
import ScheduleView from './pages/ScheduleView';
import InboxView from './pages/InboxView';
import ReportsView from './pages/ReportsView';
import PatientSummaryView from './pages/PatientSummaryView';
import EncounterNoteView from './pages/EncounterNoteView';
import MedicationsView from './pages/MedicationsView';
import LabsView from './pages/LabsView';

const App = () => {
    const [activeMain, setActiveMain] = useState('Dashboard');
    const [activeSub, setActiveSub] = useState(null);

    const handleBeginEncounter = () => {
        setActiveMain('Patient Charts');
        setActiveSub('Encounters');
    };

    const handleStartEncounterFromSummary = () => setActiveSub('Encounters');

    let content;
    if (activeMain === 'Dashboard') {
        content = <DashboardView onBeginEncounter={handleBeginEncounter} />;
    } else if (activeMain === 'Schedule') {
        content = <ScheduleView />;
    } else if (activeMain === 'Inbox') {
        content = <InboxView />;
    } else if (activeMain === 'Reports') {
        content = <ReportsView />;
    } else if (activeMain === 'Patient Charts') {
        if (activeSub === 'Summary') {
            content = <PatientSummaryView onStartEncounter={handleStartEncounterFromSummary} />;
        } else if (activeSub === 'Encounters') {
            content = <EncounterNoteView />;
        } else if (activeSub === 'Medications') {
            content = <MedicationsView />;
        } else if (activeSub === 'Labs') {
            content = <LabsView />;
        } else {
            content = (
                <div>
                    <PatientHeader />
                    <div className="p-6">{activeSub} screen for Sarah Jones is not built yet.</div>
                </div>
            );
        }
    } else {
        content = <div className="p-6"><h1 className="text-2xl">{activeMain} - Screen not built yet.</h1></div>;
    }

    return (
        <div className="flex bg-gray-100 font-sans">
            <Navigation
                activeMain={activeMain} 
                setActiveMain={setActiveMain}
                activeSub={activeSub} 
                setActiveSub={setActiveSub}
            />
            <main className="ml-64 flex-1 h-screen overflow-y-auto">
                {content}
            </main>
        </div>
    );
};

export default App;