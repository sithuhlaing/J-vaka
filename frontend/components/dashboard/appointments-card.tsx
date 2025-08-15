"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Video, MapPin } from "lucide-react"
import type { Appointment } from "@/lib/mock-data"

interface AppointmentsCardProps {
  appointments: Appointment[]
  onBookNew?: () => void
  onJoinVideo?: (appointmentId: string) => void
  onReschedule?: (appointmentId: string) => void
}

export function AppointmentsCard({ appointments, onBookNew, onJoinVideo, onReschedule }: AppointmentsCardProps) {
  const upcomingAppointments = appointments
    .filter((apt) => apt.status === "scheduled" && new Date(apt.scheduledDate) > new Date())
    .sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime())
    .slice(0, 3)

  const getTypeColor = (type: string) => {
    switch (type) {
      case "health_check":
        return "default"
      case "consultation":
        return "secondary"
      case "follow_up":
        return "outline"
      case "emergency":
        return "destructive"
      default:
        return "outline"
    }
  }

  const isVideoCallReady = (appointment: Appointment) => {
    const appointmentDateTime = new Date(appointment.scheduledDate)
    const now = new Date()
    const timeDiff = appointmentDateTime.getTime() - now.getTime()
    const minutesDiff = timeDiff / (1000 * 60)

    // Allow joining 15 minutes before appointment time
    return minutesDiff <= 15 && minutesDiff >= -30 // Can join 15 min early, up to 30 min after
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Upcoming Appointments</CardTitle>
        {onBookNew && (
          <Button variant="outline" size="sm" onClick={onBookNew}>
            Book New
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {upcomingAppointments.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No upcoming appointments</p>
        ) : (
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">
                        {new Date(appointment.scheduledDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {new Date(appointment.scheduledDate).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                  <Badge variant={getTypeColor(appointment.appointmentType)} className="capitalize">
                    {appointment.appointmentType.replace("_", " ")}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium">{appointment.reason}</p>
                  {appointment.professional_name && (
                    <p className="text-sm text-muted-foreground">with {appointment.professional_name}</p>
                  )}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {appointment.mode === "video" ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                    <span>{appointment.location}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {appointment.mode === "video" && onJoinVideo && (
                    <Button
                      size="sm"
                      onClick={() => onJoinVideo(appointment.id)}
                      disabled={!isVideoCallReady(appointment)}
                      className="nhsuk-button"
                      title={
                        isVideoCallReady(appointment)
                          ? "Join Video Call"
                          : "Video call will be available 15 minutes before appointment"
                      }
                    >
                      {isVideoCallReady(appointment) ? "Join Video Call" : "Video Call (Not Ready)"}
                    </Button>
                  )}
                  {onReschedule && (
                    <Button variant="outline" size="sm" onClick={() => onReschedule(appointment.id)}>
                      Reschedule
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
