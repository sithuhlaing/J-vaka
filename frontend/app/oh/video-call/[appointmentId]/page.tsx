"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { VideoCallInterface } from "@/components/video-call/video-call-interface"
import { useAuthContext } from "@/lib/auth-context"
import { mockAppointments, mockUsers } from "@/lib/mock-data"

export default function OHVideoCallPage() {
  const router = useRouter()
  const params = useParams()
  const { user } = useAuthContext()
  const [appointment, setAppointment] = useState<any>(null)
  const [employee, setEmployee] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    const appointmentId = params.appointmentId as string

    // Find the appointment
    const foundAppointment = mockAppointments.find((apt) => apt.id === appointmentId && apt.professional_id === user.id)

    if (!foundAppointment) {
      router.push("/oh/appointments")
      return
    }

    // Find the employee
    const foundEmployee = mockUsers.find((u) => u.id === foundAppointment.employee_id)

    setAppointment(foundAppointment)
    setEmployee(foundEmployee)
    setLoading(false)
  }, [user, params.appointmentId, router])

  const handleEndCall = () => {
    router.push("/oh/appointments")
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading video call...</p>
        </div>
      </div>
    )
  }

  if (!appointment || !employee) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <p>Appointment not found</p>
        </div>
      </div>
    )
  }

  return (
    <VideoCallInterface
      appointmentId={appointment.id}
      participantName={`${employee.first_name} ${employee.last_name}`}
      participantRole="employee"
      onEndCall={handleEndCall}
    />
  )
}
