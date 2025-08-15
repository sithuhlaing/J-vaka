"use client"

import { useEffect, useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { AppointmentWizard } from "@/components/organisms/appointment-wizard"
import { DashboardSkeleton, CardSkeleton } from "@/components/ui/enhanced-skeleton"
import { LoadingState } from "@/components/ui/loading-spinner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Video, MapPin, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { type User, type Appointment, mockAppointments } from "@/lib/mock-data"

export default function EmployeeAppointments() {
  const [user, setUser] = useState<User | null>(null)
  const [showWizard, setShowWizard] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loadUserData = async () => {
      // Simulate loading time for better UX
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const userData = localStorage.getItem("user")
      if (userData) {
        setUser(JSON.parse(userData))
      }
      setLoading(false)
    }
    
    loadUserData()
  }, [])

  if (loading) {
    return (
      <MainLayout>
        <DashboardSkeleton />
      </MainLayout>
    )
  }

  if (!user) {
    return (
      <MainLayout>
        <LoadingState message="Unable to load user data. Please refresh the page." />
      </MainLayout>
    )
  }

  if (showWizard) {
    return (
      <MainLayout>
        <AppointmentWizard
          onComplete={(data) => {
            console.log("Appointment booked:", data)
            setShowWizard(false)
          }}
          onCancel={() => setShowWizard(false)}
        />
      </MainLayout>
    )
  }

  const userAppointments = mockAppointments.filter((apt) => apt.employeeId === user.id)
  const upcomingAppointments = userAppointments.filter((apt) => new Date(apt.scheduledDate) > new Date())
  const pastAppointments = userAppointments.filter((apt) => new Date(apt.scheduledDate) <= new Date())

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

  const AppointmentCard = ({ appointment }: { appointment: Appointment }) => (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold text-lg">{appointment.appointmentType}</h3>
            <p className="text-sm text-muted-foreground">{appointment.reason}</p>
          </div>
          <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
        </div>

        <div className="space-y-2 text-sm">
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

        {appointment.status === "confirmed" && new Date(appointment.scheduledDate) > new Date() && (
          <div className="flex gap-2 mt-4">
            {appointment.appointmentMode === "virtual" && (
              <Button size="sm" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                Join Call
              </Button>
            )}
            <Button variant="outline" size="sm">
              Reschedule
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <MainLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">My Appointments</h1>
            <p className="text-muted-foreground">Manage your occupational health appointments</p>
          </div>
          <Button className="flex items-center gap-2" onClick={() => setShowWizard(true)}>
            <Plus className="h-4 w-4" />
            Book New Appointment
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Appointments */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>
                  {upcomingAppointments.length} appointment{upcomingAppointments.length !== 1 ? "s" : ""} scheduled
                </CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingAppointments.length > 0 ? (
                  upcomingAppointments.map((appointment) => (
                    <AppointmentCard key={appointment.id} appointment={appointment} />
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-8">No upcoming appointments scheduled</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Past Appointments */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Past Appointments</CardTitle>
                <CardDescription>Your appointment history</CardDescription>
              </CardHeader>
              <CardContent>
                {pastAppointments.length > 0 ? (
                  pastAppointments
                    .slice(0, 5)
                    .map((appointment) => <AppointmentCard key={appointment.id} appointment={appointment} />)
                ) : (
                  <p className="text-muted-foreground text-center py-8">No past appointments found</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
