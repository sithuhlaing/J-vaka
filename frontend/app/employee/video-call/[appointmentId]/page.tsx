"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { VideoCallInterface } from "@/components/video-call/video-call-interface"
import { useAuthContext } from "@/lib/auth-context"
import { mockAppointments, mockUsers } from "@/lib/mock-data"

export default function EmployeeVideoCallPage() {
  const router = useRouter()
  const params = useParams()
  const { user } = useAuthContext()
  const [appointment, setAppointment] = useState<any>(null)
  const [professional, setProfessional] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    const appointmentId = params.appointmentId as string

    // Find the appointment
    const foundAppointment = mockAppointments.find((apt) => apt.id === appointmentId && apt.employee_id === user.id)

    if (!foundAppointment) {
      router.push("/employee/appointments")
      return
    }

    // Find the professional
    const foundProfessional = mockUsers.find((u) => u.id === foundAppointment.professional_id)

    setAppointment(foundAppointment)
    setProfessional(foundProfessional)
    setLoading(false)
  }, [user, params.appointmentId, router])

  const handleEndCall = () => {
    router.push("/employee/appointments")
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

  if (!appointment || !professional) {
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
      participantName={`${professional.first_name} ${professional.last_name}`}
      participantRole="oh_professional"
      onEndCall={handleEndCall}
    />
  )
}
