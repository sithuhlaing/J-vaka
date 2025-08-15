import React, { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { DateSelectArg, EventClickArg, EventDropArg } from '@fullcalendar/core';

interface SnomedCode {
  code: string;
  display: string;
}

interface AppointmentEvent {
  id: string;
  calendarId: string;
  title: string;
  start: string;
  end?: string;
  description?: string;
  snomed?: SnomedCode;
}

interface Calendar {
  id: string;
  name: string;
  color: string;
}

const AppointmentCalendar: React.FC = () => {
  const calendarRef = useRef<FullCalendar>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<AppointmentEvent | null>(null);
  const [currentSelection, setCurrentSelection] = useState<DateSelectArg | null>(null);
  const [selectedSnomed, setSelectedSnomed] = useState<SnomedCode | null>(null);
  const [snomedResults, setSnomedResults] = useState<SnomedCode[]>([]);
  const [snomedSearchTerm, setSnomedSearchTerm] = useState('');
  const [showSnomedResults, setShowSnomedResults] = useState(false);
  const [visibleCalendars, setVisibleCalendars] = useState<Set<string>>(new Set(['1', '2']));

  const mockCalendars: Record<string, Calendar> = {
    '1': { id: '1', name: 'Patient Appointments', color: '#28a745' },
    '2': { id: '2', name: 'Staff Meetings', color: '#ffc107' }
  };

  const [events, setEvents] = useState<AppointmentEvent[]>([
    {
      id: 'evt1',
      calendarId: '1',
      title: 'Annual Checkup - John Doe',
      start: new Date().toISOString().slice(0, 10) + 'T10:00:00',
      end: new Date().toISOString().slice(0, 10) + 'T10:45:00',
      description: 'Routine annual physical examination.',
      snomed: { code: '185349003', display: 'Annual physical examination (procedure)' }
    },
    {
      id: 'evt2',
      calendarId: '1',
      title: 'Diabetes Follow-up - Jane Smith',
      start: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10) + 'T14:00:00',
      end: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10) + 'T14:30:00',
      description: 'Follow-up for type 2 diabetes management.',
      snomed: { code: '44054006', display: 'Type 2 diabetes mellitus (disorder)' }
    },
    {
      id: 'evt3',
      calendarId: '2',
      title: 'Weekly Team Sync',
      start: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10) + 'T09:00:00',
      end: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10) + 'T10:00:00',
      description: 'Discuss weekly progress and blockers.',
      snomed: undefined
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

  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  const formatEventsForCalendar = () => {
    return events
      .filter(event => visibleCalendars.has(event.calendarId))
      .map(event => ({
        id: event.id,
        title: event.title,
        start: event.start,
        end: event.end,
        backgroundColor: mockCalendars[event.calendarId]?.color,
        borderColor: mockCalendars[event.calendarId]?.color,
        extendedProps: {
          calendarId: event.calendarId,
          description: event.description,
          snomed: event.snomed
        }
      }));
  };

  const handleDateSelect = (selectionInfo: DateSelectArg) => {
    setCurrentSelection(selectionInfo);
    setCurrentEvent(null);
    setFormData({ title: '', description: '' });
    setSelectedSnomed(null);
    setIsModalOpen(true);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = events.find(e => e.id === clickInfo.event.id);
    if (event) {
      setCurrentEvent(event);
      setFormData({
        title: event.title,
        description: event.description || ''
      });
      setSelectedSnomed(event.snomed || null);
      setCurrentSelection(null);
      setIsModalOpen(true);
    }
  };

  const handleEventDrop = (dropInfo: EventDropArg) => {
    const updatedEvents = events.map(event => {
      if (event.id === dropInfo.event.id) {
        return {
          ...event,
          start: dropInfo.event.startStr,
          end: dropInfo.event.endStr || dropInfo.event.startStr
        };
      }
      return event;
    });
    setEvents(updatedEvents);
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
    if (!formData.title) {
      setFormData(prev => ({ ...prev, title: snomed.display }));
    }
    setSnomedSearchTerm('');
    setShowSnomedResults(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentEvent) {
      const updatedEvents = events.map(event => {
        if (event.id === currentEvent.id) {
          return {
            ...event,
            title: formData.title,
            description: formData.description,
            snomed: selectedSnomed || undefined
          };
        }
        return event;
      });
      setEvents(updatedEvents);
    } else if (currentSelection) {
      const newEvent: AppointmentEvent = {
        id: 'evt' + Date.now(),
        calendarId: Array.from(visibleCalendars)[0] || '1',
        title: formData.title,
        start: currentSelection.startStr,
        end: currentSelection.endStr,
        description: formData.description,
        snomed: selectedSnomed || undefined
      };
      setEvents([...events, newEvent]);
    }
    
    closeModal();
  };

  const handleDelete = () => {
    if (currentEvent && window.confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(event => event.id !== currentEvent.id));
      closeModal();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEvent(null);
    setCurrentSelection(null);
    setFormData({ title: '', description: '' });
    setSelectedSnomed(null);
    setSnomedSearchTerm('');
    setShowSnomedResults(false);
  };

  const toggleCalendarVisibility = (calendarId: string) => {
    const newVisibleCalendars = new Set(visibleCalendars);
    if (newVisibleCalendars.has(calendarId)) {
      newVisibleCalendars.delete(calendarId);
    } else {
      newVisibleCalendars.add(calendarId);
    }
    setVisibleCalendars(newVisibleCalendars);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showSnomedResults && !(event.target as Element)?.closest('.snomed-search-container')) {
        setShowSnomedResults(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showSnomedResults]);

  return (
    <div className="nhsuk-width-container">
      <h1 className="nhsuk-heading-xl">Appointment Calendar</h1>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Sidebar */}
        <div style={{ width: '200px', padding: '15px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', height: 'fit-content' }}>
          <h3 className="nhsuk-heading-s">My Calendars</h3>
          {Object.values(mockCalendars).map(calendar => (
            <div key={calendar.id} className="nhsuk-checkboxes__item" style={{ marginBottom: '10px' }}>
              <input
                className="nhsuk-checkboxes__input"
                id={`calendar-${calendar.id}`}
                type="checkbox"
                checked={visibleCalendars.has(calendar.id)}
                onChange={() => toggleCalendarVisibility(calendar.id)}
              />
              <label className="nhsuk-label nhsuk-checkboxes__label" htmlFor={`calendar-${calendar.id}`} style={{ display: 'flex', alignItems: 'center' }}>
                <span
                  style={{
                    width: '15px',
                    height: '15px',
                    backgroundColor: calendar.color,
                    marginRight: '8px',
                    borderRadius: '3px',
                    border: '1px solid rgba(0,0,0,0.1)'
                  }}
                />
                {calendar.name}
              </label>
            </div>
          ))}
        </div>

        {/* Calendar */}
        <div style={{ flexGrow: 1, backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.07)' }}>
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            events={formatEventsForCalendar()}
            select={handleDateSelect}
            eventClick={handleEventClick}
            eventDrop={handleEventDrop}
            height="auto"
          />
        </div>
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
              {currentEvent ? 'Edit Event' : 'Create New Event'}
            </h3>
            
            <form onSubmit={handleSave}>
              <div className="nhsuk-form-group">
                <label className="nhsuk-label" htmlFor="event-title">
                  Event Title
                </label>
                <input
                  className="nhsuk-input"
                  id="event-title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>

              <div className="nhsuk-form-group">
                <label className="nhsuk-label" htmlFor="snomed-search">
                  Diagnosis/Procedure (SNOMED CT)
                </label>
                <div className="snomed-search-container" style={{ position: 'relative' }}>
                  <input
                    className="nhsuk-input"
                    id="snomed-search"
                    type="text"
                    placeholder="Search clinical terms (e.g., 'fever')"
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
                    <strong>Selected:</strong> {selectedSnomed.display} <code>[{selectedSnomed.code}]</code>
                  </div>
                )}
              </div>

              <div className="nhsuk-form-group">
                <label className="nhsuk-label" htmlFor="event-description">
                  Description
                </label>
                <textarea
                  className="nhsuk-textarea"
                  id="event-description"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {currentEvent && (
                  <button
                    type="button"
                    className="nhsuk-button nhsuk-button--reverse"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                )}
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    className="nhsuk-button nhsuk-button--secondary"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="nhsuk-button"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentCalendar;