"use client"

import { useEffect } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Clock, FileText, Video } from "lucide-react"
import { useRouter } from "next/navigation"
import { mockAppointments, mockUsers } from "@/lib/mock-data"
import { useAuthStore } from "@/lib/state/auth-store"

export default function OHProfessionalDashboard() {
  const { user, isAuthenticated, hydrate } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    hydrate()
  }, [hydrate])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) {
    return <div>Loading...</div>
  }

  const todaysAppointments = mockAppointments.filter(
    (apt) => apt.professional_id === user.id && apt.date === new Date().toISOString().split("T")[0],
  )

  const totalPatients = mockUsers.filter((u) => u.role === "employee").length
  const activeCases = mockAppointments.filter(
    (apt) => apt.professional_id === user.id && apt.status === "scheduled",
  ).length

  const handleJoinVideo = (appointmentId: string) => {
    router.push(`/oh/video-call/${appointmentId}`)
  }

  const handleViewDetails = (appointmentId: string) => {
    router.push(`/oh/appointments?appointment=${appointmentId}`)
  }

  return (
    <MainLayout>
      <div className="container mx-auto p-6 space-y-6">
        {/* Welcome Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Good morning, Dr. {user.last_name}!</h1>
          <p className="text-muted-foreground">
            {new Date().toLocaleDateString("en-GB", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPatients}</div>
              <p className="text-xs text-muted-foreground">Active in system</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeCases}</div>
              <p className="text-xs text-muted-foreground">Pending appointments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Schedule</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todaysAppointments.length}</div>
              <p className="text-xs text-muted-foreground">Appointments today</p>
            </CardContent>
          </Card>
        </div>

        {/* Today's Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Today's Schedule</CardTitle>
              <Button variant="outline" size="sm" onClick={() => router.push("/oh/appointments")}>
                View All
              </Button>
            </CardHeader>
            <CardContent>
              {todaysAppointments.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No appointments scheduled for today</p>
              ) : (
                <div className="space-y-4">
                  {todaysAppointments.map((appointment) => {
                    const employee = mockUsers.find((u) => u.id === appointment.employee_id)

                    return (
                      <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{appointment.time}</span>
                            {appointment.mode === "video" && (
                              <Video className="h-4 w-4 text-blue-600" title="Video Call" />
                            )}
                          </div>
                          <p className="text-sm">{appointment.reason}</p>
                          {employee && (
                            <p className="text-sm text-muted-foreground">
                              with {employee.first_name} {employee.last_name}
                            </p>
                          )}
                          <Badge variant="outline" className="capitalize">
                            {appointment.type.replace("_", " ")}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          {appointment.mode === "video" && (
                            <Button size="sm" onClick={() => handleJoinVideo(appointment.id)} className="nhsuk-button">
                              Join Video Call
                            </Button>
                          )}
                          <Button size="sm" variant="outline" onClick={() => handleViewDetails(appointment.id)}>
                            View Details
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                className="w-full justify-start bg-transparent"
                variant="outline"
                onClick={() => router.push("/oh/appointments")}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Manage Appointments
              </Button>
              <Button
                className="w-full justify-start bg-transparent"
                variant="outline"
                onClick={() => router.push("/oh/patients")}
              >
                <Users className="mr-2 h-4 w-4" />
                Patient Records
              </Button>
              <Button
                className="w-full justify-start bg-transparent"
                variant="outline"
                onClick={() => router.push("/oh/documents")}
              >
                <FileText className="mr-2 h-4 w-4" />
                Document Management
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
