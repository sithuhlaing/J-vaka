"use client"

import React, { useState, useRef, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import { DateSelectArg, EventClickArg, EventDropArg } from '@fullcalendar/core'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Calendar, Clock, User, Search, Save, Trash2, X } from 'lucide-react'

interface SnomedCode {
  code: string
  display: string
}

interface AppointmentEvent {
  id: string
  calendarId: string
  title: string
  start: string
  end?: string
  description?: string
  snomed?: SnomedCode
  employeeId?: string
  professionalId?: string
  type?: string
  mode?: string
  status?: string
}

interface Calendar {
  id: string
  name: string
  color: string
}

interface EnhancedCalendarProps {
  appointments?: AppointmentEvent[]
  onAppointmentCreate?: (appointment: Partial<AppointmentEvent>) => void
  onAppointmentUpdate?: (appointmentId: string, updates: Partial<AppointmentEvent>) => void
  onAppointmentDelete?: (appointmentId: string) => void
  userRole?: 'employee' | 'oh_professional' | 'manager' | 'admin'
  className?: string
}

export function EnhancedCalendar({ 
  appointments = [], 
  onAppointmentCreate,
  onAppointmentUpdate,
  onAppointmentDelete,
  userRole = 'employee',
  className = ''
}: EnhancedCalendarProps) {
  const calendarRef = useRef<FullCalendar>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentEvent, setCurrentEvent] = useState<AppointmentEvent | null>(null)
  const [currentSelection, setCurrentSelection] = useState<DateSelectArg | null>(null)
  const [selectedSnomed, setSelectedSnomed] = useState<SnomedCode | null>(null)
  const [snomedResults, setSnomedResults] = useState<SnomedCode[]>([])
  const [snomedSearchTerm, setSnomedSearchTerm] = useState('')
  const [showSnomedResults, setShowSnomedResults] = useState(false)
  const [visibleCalendars, setVisibleCalendars] = useState<Set<string>>(new Set(['appointments', 'meetings']))

  const calendars: Record<string, Calendar> = {
    'appointments': { id: 'appointments', name: 'Patient Appointments', color: '#007f3b' },
    'meetings': { id: 'meetings', name: 'Staff Meetings', color: '#005eb8' },
    'assessments': { id: 'assessments', name: 'Health Assessments', color: '#d5281b' }
  }

  // Mock SNOMED CT database for clinical coding
  const mockSnomedDb: SnomedCode[] = [
    { code: '386661006', display: 'Fever (finding)' },
    { code: '44054006', display: 'Type 2 diabetes mellitus (disorder)' },
    { code: '185349003', display: 'Annual physical examination (procedure)' },
    { code: '271737000', display: 'Patient referral (procedure)' },
    { code: '6571000', display: 'Headache (finding)' },
    { code: '25064002', display: 'Head injury (disorder)' },
    { code: '73211009', display: 'Diabetes mellitus (disorder)' },
    { code: '38341003', display: 'Hypertensive disorder (disorder)' },
    { code: '195967001', display: 'Asthma (disorder)' },
    { code: '22298006', display: 'Myocardial infarction (disorder)' }
  ]

  const [events, setEvents] = useState<AppointmentEvent[]>(() => {
    // Initialize with provided appointments or default mock data
    if (appointments.length > 0) {
      return appointments
    }
    
    return [
      {
        id: 'evt1',
        calendarId: 'appointments',
        title: 'Annual Checkup - John Doe',
        start: new Date().toISOString().slice(0, 10) + 'T10:00:00',
        end: new Date().toISOString().slice(0, 10) + 'T10:45:00',
        description: 'Routine annual physical examination.',
        snomed: { code: '185349003', display: 'Annual physical examination (procedure)' },
        employeeId: 'usr_001',
        professionalId: 'usr_002',
        type: 'health_check',
        mode: 'in_person',
        status: 'confirmed'
      },
      {
        id: 'evt2',
        calendarId: 'appointments',
        title: 'Diabetes Follow-up - Jane Smith',
        start: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10) + 'T14:00:00',
        end: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10) + 'T14:30:00',
        description: 'Follow-up for type 2 diabetes management.',
        snomed: { code: '44054006', display: 'Type 2 diabetes mellitus (disorder)' },
        employeeId: 'usr_001',
        professionalId: 'usr_002',
        type: 'follow_up',
        mode: 'virtual',
        status: 'confirmed'
      },
      {
        id: 'evt3',
        calendarId: 'meetings',
        title: 'Weekly Team Sync',
        start: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10) + 'T09:00:00',
        end: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10) + 'T10:00:00',
        description: 'Discuss weekly progress and blockers.',
        type: 'meeting'
      }
    ]
  })

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'health_check',
    mode: 'in_person'
  })

  const formatEventsForCalendar = () => {
    return events
      .filter(event => visibleCalendars.has(event.calendarId))
      .map(event => ({
        id: event.id,
        title: event.title,
        start: event.start,
        end: event.end,
        backgroundColor: calendars[event.calendarId]?.color || '#007f3b',
        borderColor: calendars[event.calendarId]?.color || '#007f3b',
        textColor: '#ffffff',
        classNames: ['cursor-pointer', 'hover:opacity-80'],
        extendedProps: {
          calendarId: event.calendarId,
          description: event.description,
          snomed: event.snomed,
          employeeId: event.employeeId,
          professionalId: event.professionalId,
          type: event.type,
          mode: event.mode,
          status: event.status
        }
      }))
  }

  const handleDateSelect = (selectionInfo: DateSelectArg) => {
    setCurrentSelection(selectionInfo)
    setCurrentEvent(null)
    setFormData({ title: '', description: '', type: 'health_check', mode: 'in_person' })
    setSelectedSnomed(null)
    setIsModalOpen(true)
  }

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = events.find(e => e.id === clickInfo.event.id)
    if (event) {
      setCurrentEvent(event)
      setFormData({
        title: event.title,
        description: event.description || '',
        type: event.type || 'health_check',
        mode: event.mode || 'in_person'
      })
      setSelectedSnomed(event.snomed || null)
      setCurrentSelection(null)
      setIsModalOpen(true)
    }
  }

  const handleEventDrop = (dropInfo: EventDropArg) => {
    const updatedEvents = events.map(event => {
      if (event.id === dropInfo.event.id) {
        const updatedEvent = {
          ...event,
          start: dropInfo.event.startStr,
          end: dropInfo.event.endStr || dropInfo.event.startStr
        }
        
        // Call update callback if provided
        if (onAppointmentUpdate) {
          onAppointmentUpdate(event.id, updatedEvent)
        }
        
        return updatedEvent
      }
      return event
    })
    setEvents(updatedEvents)
  }

  const searchSnomed = (term: string) => {
    if (term.length < 3) {
      setSnomedResults([])
      setShowSnomedResults(false)
      return
    }

    const results = mockSnomedDb.filter(item =>
      item.display.toLowerCase().includes(term.toLowerCase()) ||
      item.code.toLowerCase().includes(term.toLowerCase())
    )
    setSnomedResults(results)
    setShowSnomedResults(true)
  }

  const handleSnomedSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSnomedSearchTerm(term)
    searchSnomed(term)
  }

  const selectSnomedCode = (snomed: SnomedCode) => {
    setSelectedSnomed(snomed)
    if (!formData.title) {
      setFormData(prev => ({ ...prev, title: snomed.display }))
    }
    setSnomedSearchTerm('')
    setShowSnomedResults(false)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (currentEvent) {
      // Update existing event
      const updatedEvent = {
        ...currentEvent,
        title: formData.title,
        description: formData.description,
        snomed: selectedSnomed || undefined,
        type: formData.type,
        mode: formData.mode
      }
      
      const updatedEvents = events.map(event => 
        event.id === currentEvent.id ? updatedEvent : event
      )
      setEvents(updatedEvents)
      
      if (onAppointmentUpdate) {
        onAppointmentUpdate(currentEvent.id, updatedEvent)
      }
    } else if (currentSelection) {
      // Create new event
      const newEvent: AppointmentEvent = {
        id: 'evt' + Date.now(),
        calendarId: Array.from(visibleCalendars)[0] || 'appointments',
        title: formData.title,
        start: currentSelection.startStr,
        end: currentSelection.endStr,
        description: formData.description,
        snomed: selectedSnomed || undefined,
        type: formData.type,
        mode: formData.mode,
        status: 'scheduled'
      }
      
      setEvents([...events, newEvent])
      
      if (onAppointmentCreate) {
        onAppointmentCreate(newEvent)
      }
    }
    
    closeModal()
  }

  const handleDelete = () => {
    if (currentEvent && window.confirm('Are you sure you want to delete this appointment?')) {
      setEvents(events.filter(event => event.id !== currentEvent.id))
      
      if (onAppointmentDelete) {
        onAppointmentDelete(currentEvent.id)
      }
      
      closeModal()
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentEvent(null)
    setCurrentSelection(null)
    setFormData({ title: '', description: '', type: 'health_check', mode: 'in_person' })
    setSelectedSnomed(null)
    setSnomedSearchTerm('')
    setShowSnomedResults(false)
  }

  const toggleCalendarVisibility = (calendarId: string) => {
    const newVisibleCalendars = new Set(visibleCalendars)
    if (newVisibleCalendars.has(calendarId)) {
      newVisibleCalendars.delete(calendarId)
    } else {
      newVisibleCalendars.add(calendarId)
    }
    setVisibleCalendars(newVisibleCalendars)
  }

  // Close SNOMED search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showSnomedResults && !(event.target as Element)?.closest('.snomed-search-container')) {
        setShowSnomedResults(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [showSnomedResults])

  return (
    <div className={`w-full ${className}`}>
      <div className="flex gap-6">
        {/* Sidebar */}
        <Card className="w-64 h-fit">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              My Calendars
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.values(calendars).map(calendar => (
              <div key={calendar.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`calendar-${calendar.id}`}
                  checked={visibleCalendars.has(calendar.id)}
                  onCheckedChange={() => toggleCalendarVisibility(calendar.id)}
                />
                <Label htmlFor={`calendar-${calendar.id}`} className="flex items-center gap-2 cursor-pointer">
                  <div
                    className="w-3 h-3 rounded border"
                    style={{ backgroundColor: calendar.color }}
                  />
                  <span className="text-sm">{calendar.name}</span>
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Calendar */}
        <Card className="flex-1">
          <CardContent className="p-6">
            <div className="fullcalendar-container">
              <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                }}
                initialView="dayGridMonth"
                editable={userRole !== 'employee'}
                selectable={userRole !== 'employee'}
                events={formatEventsForCalendar()}
                select={handleDateSelect}
                eventClick={handleEventClick}
                eventDrop={handleEventDrop}
                height="700px"
                dayMaxEvents={3}
                moreLinkClick="day"
                eventDisplay="block"
                displayEventTime={true}
                eventTimeFormat={{
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Appointment Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {currentEvent ? 'Edit Appointment' : 'Create New Appointment'}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Appointment Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                  placeholder="e.g., Annual Health Check"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2 border border-input rounded-md text-sm"
                >
                  <option value="health_check">Health Check</option>
                  <option value="consultation">Consultation</option>
                  <option value="follow_up">Follow-up</option>
                  <option value="emergency">Emergency</option>
                  <option value="pre_employment">Pre-Employment</option>
                  <option value="return_to_work">Return to Work</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="snomed-search">Clinical Coding (SNOMED CT)</Label>
              <div className="snomed-search-container relative">
                <div className="relative">
                  <Input
                    id="snomed-search"
                    type="text"
                    placeholder="Search clinical terms (e.g., 'diabetes', 'hypertension')"
                    value={snomedSearchTerm}
                    onChange={handleSnomedSearch}
                  />
                  <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
                
                {showSnomedResults && (
                  <div className="absolute w-full bg-background border border-input rounded-md mt-1 max-h-40 overflow-y-auto z-50 shadow-lg">
                    {snomedResults.length === 0 ? (
                      <div className="p-3 text-sm text-muted-foreground">No results found</div>
                    ) : (
                      snomedResults.map((result) => (
                        <div
                          key={result.code}
                          className="p-3 hover:bg-accent cursor-pointer text-sm border-b last:border-b-0"
                          onClick={() => selectSnomedCode(result)}
                        >
                          <div className="font-medium">{result.display}</div>
                          <div className="text-xs text-muted-foreground">Code: {result.code}</div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
              
              {selectedSnomed && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <div className="text-sm font-medium text-blue-900">Selected: {selectedSnomed.display}</div>
                  <div className="text-xs text-blue-700">Code: {selectedSnomed.code}</div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedSnomed(null)}
                    className="mt-1 h-6 px-2 text-xs"
                  >
                    <X className="h-3 w-3" />
                    Remove
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="mode">Mode</Label>
              <select
                id="mode"
                value={formData.mode}
                onChange={(e) => setFormData(prev => ({ ...prev, mode: e.target.value }))}
                className="w-full px-3 py-2 border border-input rounded-md text-sm"
              >
                <option value="in_person">In Person</option>
                <option value="virtual">Virtual/Video</option>
                <option value="phone">Phone</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Additional notes about the appointment..."
              />
            </div>

            {currentSelection && (
              <div className="p-3 bg-accent rounded-md">
                <div className="text-sm font-medium">Scheduled Time:</div>
                <div className="text-sm text-muted-foreground">
                  {new Date(currentSelection.startStr).toLocaleString()} - {' '}
                  {currentSelection.endStr ? new Date(currentSelection.endStr).toLocaleString() : 'No end time'}
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4">
              {currentEvent && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              )}
              
              <div className="flex gap-2 ml-auto">
                <Button type="button" variant="outline" onClick={closeModal}>
                  Cancel
                </Button>
                <Button type="submit" className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  {currentEvent ? 'Update' : 'Create'} Appointment
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <style jsx global>{`
        .fc-event {
          border-radius: 4px !important;
          border: none !important;
          padding: 2px 4px !important;
          margin: 1px 0 !important;
        }
        
        .fc-daygrid-event {
          white-space: nowrap !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
        }
        
        .fc-toolbar-title {
          font-size: 1.5rem !important;
          font-weight: 600 !important;
        }
        
        .fc-button {
          background-color: #007f3b !important;
          border-color: #007f3b !important;
        }
        
        .fc-button:hover {
          background-color: #005a2b !important;
          border-color: #005a2b !important;
        }
        
        .fc-button-active {
          background-color: #005a2b !important;
          border-color: #005a2b !important;
        }
        
        .fc-today {
          background-color: rgba(0, 127, 59, 0.1) !important;
        }
      `}</style>
    </div>
  )
}