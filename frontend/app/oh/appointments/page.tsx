"use client"

import { useEffect, useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { EnhancedCalendar } from "@/components/organisms/enhanced-calendar"
import { AppointmentWizard } from "@/components/organisms/appointment-wizard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Video, MapPin, Plus, CalendarDays } from "lucide-react"
import { useRouter } from "next/navigation"
import { type Appointment, mockAppointments, mockUsers } from "@/lib/mock-data"

export default function OHAppointments() {
  const [user, setUser] = useState<any | null>(null)
  const [showWizard, setShowWizard] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  if (!user) {
    return <div>Loading...</div>
  }

  if (showWizard) {
    return (
      <MainLayout>
        <AppointmentWizard
          onComplete={(data) => {
            console.log("OH Professional scheduled appointment:", data)
            setShowWizard(false)
          }}
          onCancel={() => setShowWizard(false)}
        />
      </MainLayout>
    )
  }

  const ohAppointments = mockAppointments.filter((apt) => apt.professionalId === user.id)
  const todayAppointments = ohAppointments.filter((apt) => {
    const appointmentDate = new Date(apt.scheduledDate).toDateString()
    const today = new Date().toDateString()
    return appointmentDate === today
  })
  const upcomingAppointments = ohAppointments.filter((apt) => {
    const appointmentDate = new Date(apt.scheduledDate)
    const today = new Date()
    return appointmentDate > today
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const AppointmentCard = ({ appointment }: { appointment: Appointment }) => {
    const employee = mockUsers.find((u) => u.id === appointment.employeeId)

    return (
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={employee?.avatar || "/placeholder.svg"}
                  alt={`${employee?.firstName} ${employee?.lastName}`}
                />
                <AvatarFallback>
                  {employee?.firstName?.[0]}
                  {employee?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">
                  {employee?.firstName} {employee?.lastName}
                </h3>
                <p className="text-sm text-muted-foreground">{appointment.appointmentType}</p>
              </div>
            </div>
            <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
          </div>

          <div className="space-y-2 text-sm mb-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(appointment.scheduledDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>
                {new Date(appointment.scheduledDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {appointment.appointmentMode === "virtual" ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
              <span>{appointment.appointmentMode === "virtual" ? "Virtual Meeting" : appointment.location}</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-3">
            <strong>Reason:</strong> {appointment.reason}
          </p>

          {appointment.status === "confirmed" && (
            <div className="flex gap-2">
              {appointment.appointmentMode === "virtual" && (
                <Button size="sm" className="flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  Start Call
                </Button>
              )}
              <Button variant="outline" size="sm">
                View Patient Record
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  // Convert appointments to calendar format
  const calendarAppointments = ohAppointments.map(apt => ({
    id: apt.id,
    calendarId: 'appointments',
    title: `${apt.appointmentType} - ${mockUsers.find(u => u.id === apt.employeeId)?.firstName} ${mockUsers.find(u => u.id === apt.employeeId)?.lastName}`,
    start: apt.scheduledDate,
    end: apt.scheduledDate, // Add duration later
    description: apt.reason,
    employeeId: apt.employeeId,
    professionalId: apt.professionalId,
    type: apt.appointmentType,
    mode: apt.appointmentMode,
    status: apt.status
  }))

  const handleAppointmentCreate = (appointment: any) => {
    console.log("Creating appointment:", appointment)
    // Here you would typically call an API to create the appointment
  }

  const handleAppointmentUpdate = (appointmentId: string, updates: any) => {
    console.log("Updating appointment:", appointmentId, updates)
    // Here you would typically call an API to update the appointment
  }

  const handleAppointmentDelete = (appointmentId: string) => {
    console.log("Deleting appointment:", appointmentId)
    // Here you would typically call an API to delete the appointment
  }

  return (
    <MainLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Patient Appointments</h1>
            <p className="text-muted-foreground">Manage your patient appointments and schedule</p>
          </div>
          <Button className="flex items-center gap-2" onClick={() => setShowWizard(true)}>
            <Plus className="h-4 w-4" />
            Schedule Appointment
          </Button>
        </div>

        <Tabs defaultValue="calendar" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              Calendar View
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              List View
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar" className="mt-6">
            <EnhancedCalendar
              appointments={calendarAppointments}
              onAppointmentCreate={handleAppointmentCreate}
              onAppointmentUpdate={handleAppointmentUpdate}
              onAppointmentDelete={handleAppointmentDelete}
              userRole="oh_professional"
              className="w-full"
            />
          </TabsContent>
          
          <TabsContent value="list" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Today's Schedule</CardTitle>
                    <CardDescription>
                      {todayAppointments.length} appointment{todayAppointments.length !== 1 ? "s" : ""} today
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {todayAppointments.length > 0 ? (
                      todayAppointments.map((appointment) => (
                        <AppointmentCard key={appointment.id} appointment={appointment} />
                      ))
                    ) : (
                      <p className="text-muted-foreground text-center py-8">No appointments scheduled for today</p>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Appointments</CardTitle>
                    <CardDescription>Your future appointments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {upcomingAppointments.length > 0 ? (
                      upcomingAppointments
                        .slice(0, 5)
                        .map((appointment) => <AppointmentCard key={appointment.id} appointment={appointment} />)
                    ) : (
                      <p className="text-muted-foreground text-center py-8">No upcoming appointments scheduled</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
