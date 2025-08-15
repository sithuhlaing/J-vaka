import React, { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { DateSelectArg, EventClickArg } from '@fullcalendar/core';

interface SnomedCode {
  code: string;
  display: string;
}

interface AppointmentEvent {
  id: string;
  title: string;
  start: string;
  end?: string;
  description?: string;
  snomed?: SnomedCode;
  status?: 'confirmed' | 'pending' | 'completed';
}

const EmployeeAppointmentCalendar: React.FC = () => {
  const calendarRef = useRef<FullCalendar>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<AppointmentEvent | null>(null);
  const [currentSelection, setCurrentSelection] = useState<DateSelectArg | null>(null);
  const [selectedSnomed, setSelectedSnomed] = useState<SnomedCode | null>(null);
  const [snomedResults, setSnomedResults] = useState<SnomedCode[]>([]);
  const [snomedSearchTerm, setSnomedSearchTerm] = useState('');
  const [showSnomedResults, setShowSnomedResults] = useState(false);

  // Employee's existing and upcoming appointments
  const [events, setEvents] = useState<AppointmentEvent[]>([
    {
      id: 'my1',
      title: 'Annual Health Check',
      start: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10) + 'T10:00:00',
      end: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10) + 'T10:45:00',
      description: 'Routine annual physical examination',
      status: 'confirmed'
    },
    {
      id: 'my2',
      title: 'Follow-up Consultation',
      start: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10) + 'T14:00:00',
      end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10) + 'T14:30:00',
      description: 'Review recent health concerns',
      status: 'pending'
    }
  ]);

  const mockSnomedDb: SnomedCode[] = [
    { code: '386661006', display: 'Fever (finding)' },
    { code: '44054006', display: 'Type 2 diabetes mellitus (disorder)' },
    { code: '185349003', display: 'Annual physical examination (procedure)' },
    { code: '271737000', display: 'Patient referral (procedure)' },
    { code: '6571000', display: 'Headache (finding)' },
    { code: '25064002', display: 'Head injury (disorder)' }
  ];

  const appointmentTypes = [
    'Annual Health Check',
    'Health Consultation', 
    'Follow-up Appointment',
    'Occupational Health Assessment',
    'Return to Work Assessment',
    'Mental Health Support',
    'Vaccination'
  ];

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    appointmentType: '',
    appointmentMode: 'in-person',
    reason: ''
  });

  const formatEventsForCalendar = () => {
    return events.map(event => ({
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
      backgroundColor: event.status === 'confirmed' ? '#28a745' : 
                     event.status === 'pending' ? '#ffc107' : '#17a2b8',
      borderColor: event.status === 'confirmed' ? '#28a745' : 
                  event.status === 'pending' ? '#ffc107' : '#17a2b8',
      extendedProps: {
        description: event.description,
        snomed: event.snomed,
        status: event.status
      }
    }));
  };

  const handleDateSelect = (selectionInfo: DateSelectArg) => {
    const selectedDate = new Date(selectionInfo.start);
    const now = new Date();
    
    // Don't allow booking appointments in the past
    if (selectedDate < now) {
      alert('Cannot book appointments in the past');
      return;
    }
    
    setCurrentSelection(selectionInfo);
    setCurrentEvent(null);
    setFormData({ 
      title: '', 
      description: '', 
      appointmentType: '', 
      appointmentMode: 'in-person', 
      reason: '' 
    });
    setSelectedSnomed(null);
    setIsModalOpen(true);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = events.find(e => e.id === clickInfo.event.id);
    if (event) {
      setCurrentEvent(event);
      setFormData({
        title: event.title,
        description: event.description || '',
        appointmentType: event.title,
        appointmentMode: 'in-person',
        reason: event.description || ''
      });
      setSelectedSnomed(event.snomed || null);
      setCurrentSelection(null);
      setIsModalOpen(true);
    }
  };

  const searchSnomed = (term: string) => {
    if (term.length < 3) {
      setSnomedResults([]);
      setShowSnomedResults(false);
      return;
    }

    const results = mockSnomedDb.filter(item =>
      item.display.toLowerCase().includes(term.toLowerCase())
    );
    setSnomedResults(results);
    setShowSnomedResults(true);
  };

  const handleSnomedSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSnomedSearchTerm(term);
    searchSnomed(term);
  };

  const selectSnomedCode = (snomed: SnomedCode) => {
    setSelectedSnomed(snomed);
    setSnomedSearchTerm('');
    setShowSnomedResults(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentEvent) {
      // For existing appointments, employees can only view/cancel, not edit
      alert('To modify this appointment, please contact the OH department');
      return;
    }
    
    if (currentSelection) {
      const newEvent: AppointmentEvent = {
        id: 'req' + Date.now(),
        title: formData.appointmentType || formData.title,
        start: currentSelection.startStr,
        end: currentSelection.endStr,
        description: formData.reason,
        snomed: selectedSnomed || undefined,
        status: 'pending'
      };
      setEvents([...events, newEvent]);
      alert('Appointment request submitted! You will receive a confirmation email shortly.');
    }
    
    closeModal();
  };

  const handleCancel = () => {
    if (currentEvent && window.confirm('Are you sure you want to cancel this appointment?')) {
      setEvents(events.filter(event => event.id !== currentEvent.id));
      alert('Appointment cancelled. The OH department has been notified.');
      closeModal();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEvent(null);
    setCurrentSelection(null);
    setFormData({ 
      title: '', 
      description: '', 
      appointmentType: '', 
      appointmentMode: 'in-person', 
      reason: '' 
    });
    setSelectedSnomed(null);
    setSnomedSearchTerm('');
    setShowSnomedResults(false);
  };

  return (
    <div className="nhsuk-width-container">
      <h1 className="nhsuk-heading-xl">My Appointments</h1>
      
      <div className="nhsuk-inset-text">
        <p>
          <strong>Click on a date</strong> to request a new appointment, or <strong>click on an existing appointment</strong> to view details.
        </p>
      </div>

      <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.07)' }}>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,listWeek'
          }}
          initialView="dayGridMonth"
          selectable={true}
          events={formatEventsForCalendar()}
          select={handleDateSelect}
          eventClick={handleEventClick}
          height="auto"
          selectMirror={true}
          dayMaxEvents={true}
        />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
            width: '90%',
            maxWidth: '500px',
            zIndex: 1001
          }}>
            <h3 className="nhsuk-heading-m">
              {currentEvent ? 'Appointment Details' : 'Request New Appointment'}
            </h3>
            
            {currentEvent && (
              <div className="nhsuk-warning-callout">
                <h3 className="nhsuk-warning-callout__label">
                  <span role="status">
                    <span className="nhsuk-u-visually-hidden">Information: </span>
                    Appointment Status: {currentEvent.status?.toUpperCase()}
                  </span>
                </h3>
              </div>
            )}
            
            <form onSubmit={handleSave}>
              <div className="nhsuk-form-group">
                <label className="nhsuk-label" htmlFor="appointment-type">
                  Appointment Type
                </label>
                <select
                  className="nhsuk-select"
                  id="appointment-type"
                  value={formData.appointmentType}
                  onChange={(e) => setFormData(prev => ({ ...prev, appointmentType: e.target.value, title: e.target.value }))}
                  required
                  disabled={!!currentEvent}
                >
                  <option value="">Select appointment type...</option>
                  {appointmentTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="nhsuk-form-group">
                <label className="nhsuk-label" htmlFor="appointment-mode">
                  Preferred Mode
                </label>
                <div className="nhsuk-radios">
                  <div className="nhsuk-radios__item">
                    <input
                      className="nhsuk-radios__input"
                      id="mode-person"
                      name="appointment-mode"
                      type="radio"
                      value="in-person"
                      checked={formData.appointmentMode === 'in-person'}
                      onChange={(e) => setFormData(prev => ({ ...prev, appointmentMode: e.target.value }))}
                      disabled={!!currentEvent}
                    />
                    <label className="nhsuk-label nhsuk-radios__label" htmlFor="mode-person">
                      In-Person
                    </label>
                  </div>
                  <div className="nhsuk-radios__item">
                    <input
                      className="nhsuk-radios__input"
                      id="mode-video"
                      name="appointment-mode"
                      type="radio"
                      value="video"
                      checked={formData.appointmentMode === 'video'}
                      onChange={(e) => setFormData(prev => ({ ...prev, appointmentMode: e.target.value }))}
                      disabled={!!currentEvent}
                    />
                    <label className="nhsuk-label nhsuk-radios__label" htmlFor="mode-video">
                      Video Call
                    </label>
                  </div>
                  <div className="nhsuk-radios__item">
                    <input
                      className="nhsuk-radios__input"
                      id="mode-phone"
                      name="appointment-mode"
                      type="radio"
                      value="phone"
                      checked={formData.appointmentMode === 'phone'}
                      onChange={(e) => setFormData(prev => ({ ...prev, appointmentMode: e.target.value }))}
                      disabled={!!currentEvent}
                    />
                    <label className="nhsuk-label nhsuk-radios__label" htmlFor="mode-phone">
                      Phone Call
                    </label>
                  </div>
                </div>
              </div>

              {!currentEvent && (
                <div className="nhsuk-form-group">
                  <label className="nhsuk-label" htmlFor="snomed-search">
                    Health Concern (Optional)
                  </label>
                  <div className="snomed-search-container" style={{ position: 'relative' }}>
                    <input
                      className="nhsuk-input"
                      id="snomed-search"
                      type="text"
                      placeholder="Search for health conditions (e.g., 'headache')"
                      value={snomedSearchTerm}
                      onChange={handleSnomedSearch}
                    />
                    {showSnomedResults && (
                      <ul style={{
                        position: 'absolute',
                        width: '100%',
                        background: 'white',
                        border: '1px solid #ccc',
                        borderTop: 'none',
                        borderRadius: '0 0 4px 4px',
                        listStyleType: 'none',
                        padding: 0,
                        margin: '-1px 0 0',
                        maxHeight: '150px',
                        overflowY: 'auto',
                        zIndex: 1002
                      }}>
                        {snomedResults.length === 0 ? (
                          <li style={{ padding: '10px' }}>No results found</li>
                        ) : (
                          snomedResults.map((result) => (
                            <li
                              key={result.code}
                              style={{
                                padding: '10px',
                                cursor: 'pointer'
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                              onClick={() => selectSnomedCode(result)}
                            >
                              {result.display}
                            </li>
                          ))
                        )}
                      </ul>
                    )}
                  </div>
                  {selectedSnomed && (
                    <div style={{
                      backgroundColor: '#e7f3ff',
                      border: '1px solid #b3d7ff',
                      padding: '8px',
                      borderRadius: '4px',
                      fontSize: '13px',
                      marginTop: '5px'
                    }}>
                      <strong>Selected:</strong> {selectedSnomed.display}
                    </div>
                  )}
                </div>
              )}

              <div className="nhsuk-form-group">
                <label className="nhsuk-label" htmlFor="reason">
                  {currentEvent ? 'Notes' : 'Reason for Visit (Optional)'}
                </label>
                <textarea
                  className="nhsuk-textarea"
                  id="reason"
                  rows={3}
                  value={formData.reason}
                  onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                  placeholder={currentEvent ? '' : 'Please describe the reason for your appointment...'}
                  disabled={!!currentEvent}
                />
              </div>

              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {currentEvent && (
                  <button
                    type="button"
                    className="nhsuk-button nhsuk-button--reverse"
                    onClick={handleCancel}
                  >
                    Cancel Appointment
                  </button>
                )}
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    className="nhsuk-button nhsuk-button--secondary"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                  {!currentEvent && (
                    <button
                      type="submit"
                      className="nhsuk-button"
                    >
                      Request Appointment
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeAppointmentCalendar;