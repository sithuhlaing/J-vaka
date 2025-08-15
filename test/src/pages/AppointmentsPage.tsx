import React from 'react';
import AppointmentCalendar from '../components/organisms/AppointmentCalendar';
import { AppScreen } from '../contexts/NavigationContext';

interface AppointmentsPageProps {
    onNavigate: (screen: AppScreen, data?: any) => void;
}

const AppointmentsPage: React.FC<AppointmentsPageProps> = ({ onNavigate }) => {
  return (
    <div className="nhsuk-width-container nhsuk-main-wrapper" id="maincontent" role="main">
      <AppointmentCalendar />
    </div>
  );
};

export default AppointmentsPage;