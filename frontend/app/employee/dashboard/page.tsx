"use client"

import { useEffect } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { HealthStatusCard } from "@/components/dashboard/health-status-card"
import { AppointmentsCard } from "@/components/dashboard/appointments-card"
import { NotificationsCard } from "@/components/dashboard/notifications-card"
import { Button } from "@/components/ui/button"
import { Calendar, FileText, MessageSquare } from "lucide-react"
import { useRouter } from "next/navigation"
import { type User, mockHealthRecords, mockAppointments, mockNotifications } from "@/lib/mock-data"
import { useAuthStore } from "@/lib/state/auth-store"

export default function EmployeeDashboard() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) {
    return <div>Loading...</div>
  }

  const userHealthRecord = mockHealthRecords.find((hr) => hr.employeeId === user.id)
  const userAppointments = mockAppointments.filter((apt) => apt.employeeId === user.id)
  const userNotifications = mockNotifications.filter((not) => not.userId === user.id)

  const handleJoinVideo = (appointmentId: string) => {
    router.push(`/employee/video-call/${appointmentId}`)
  }

  const handleReschedule = (appointmentId: string) => {
    router.push(`/employee/appointments?reschedule=${appointmentId}`)
  }

  return (
    <MainLayout>
      <div className="container mx-auto p-6 space-y-6">
        {/* Welcome Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Welcome back, {user.firstName}!</h1>
          <p className="text-muted-foreground">
            {new Date().toLocaleDateString("en-GB", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="h-20 flex flex-col gap-2 bg-transparent"
            onClick={() => router.push("/employee/appointments")}
          >
            <Calendar className="h-6 w-6" />
            Book Appointment
          </Button>
          <Button
            variant="outline"
            className="h-20 flex flex-col gap-2 bg-transparent"
            onClick={() => router.push("/employee/documents")}
          >
            <FileText className="h-6 w-6" />
            View Documents
          </Button>
          <Button
            variant="outline"
            className="h-20 flex flex-col gap-2 bg-transparent"
            onClick={() => router.push("/employee/messages")}
          >
            <MessageSquare className="h-6 w-6" />
            Messages
          </Button>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            {userHealthRecord && <HealthStatusCard healthRecord={userHealthRecord} />}
          </div>

          <div className="lg:col-span-1">
            <AppointmentsCard
              appointments={userAppointments}
              onBookNew={() => router.push("/employee/appointments")}
              onJoinVideo={handleJoinVideo}
              onReschedule={handleReschedule}
            />
          </div>

          <div className="lg:col-span-1">
            <NotificationsCard notifications={userNotifications} />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
