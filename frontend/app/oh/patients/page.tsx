"use client"

import { useEffect, useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, User, Calendar, FileText, Phone, Mail, Filter } from "lucide-react"
import { useRouter } from "next/navigation"
import { mockUsers, mockHealthRecords, mockAppointments } from "@/lib/mock-data"
import { useAuthStore } from "@/lib/state/auth-store"

export default function PatientRecordsPage() {
  const { user, isAuthenticated, hydrate } = useAuthStore()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name")

  useEffect(() => {
    hydrate()
  }, [hydrate])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isAuthenticated) {
        router.push("/login")
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) {
    return <div>Loading...</div>
  }

  // Get all employees (patients)
  const patients = mockUsers.filter((u) => u.role === "employee")

  // Filter and search patients
  const filteredPatients = patients
    .filter((patient) => {
      const matchesSearch =
        patient.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase())

      if (statusFilter === "all") return matchesSearch

      // Get patient's health record to check status
      const healthRecord = mockHealthRecords.find((hr) => hr.employee_id === patient.id)
      return matchesSearch && healthRecord?.health_status === statusFilter
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`)
      }
      return 0
    })

  const getPatientHealthStatus = (patientId: string) => {
    const healthRecord = mockHealthRecords.find((hr) => hr.employee_id === patientId)
    return healthRecord?.health_status || "unknown"
  }

  const getPatientLastAppointment = (patientId: string) => {
    const appointments = mockAppointments
      .filter((apt) => apt.employee_id === patientId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    return appointments[0]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "fit_for_work":
        return "bg-green-100 text-green-800"
      case "fit_with_adjustments":
        return "bg-yellow-100 text-yellow-800"
      case "temporarily_unfit":
        return "bg-red-100 text-red-800"
      case "under_review":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatStatus = (status: string) => {
    return status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  }

  return (
    <MainLayout>
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Patient Records</h1>
            <p className="text-muted-foreground">Manage employee health records and assessments</p>
          </div>
          <Button onClick={() => router.push("/oh/assessments")}>
            <FileText className="mr-2 h-4 w-4" />
            New Assessment
          </Button>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search patients by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="fit_for_work">Fit for Work</SelectItem>
                  <SelectItem value="fit_with_adjustments">Fit with Adjustments</SelectItem>
                  <SelectItem value="temporarily_unfit">Temporarily Unfit</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Patient List */}
        <div className="grid gap-4">
          {filteredPatients.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <User className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No patients found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || statusFilter !== "all"
                    ? "Try adjusting your search or filters"
                    : "No patient records available"}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredPatients.map((patient) => {
              const healthStatus = getPatientHealthStatus(patient.id)
              const lastAppointment = getPatientLastAppointment(patient.id)

              return (
                <Card key={patient.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">
                              {patient.first_name} {patient.last_name}
                            </h3>
                            <p className="text-sm text-muted-foreground">{patient.department}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{patient.email}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{patient.phone}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                          <Badge className={getStatusColor(healthStatus)}>{formatStatus(healthStatus)}</Badge>
                          {lastAppointment && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span>Last seen: {new Date(lastAppointment.date).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Records
                        </Button>
                        <Button size="sm">Schedule Appointment</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {patients.filter((p) => getPatientHealthStatus(p.id) === "fit_for_work").length}
              </div>
              <p className="text-sm text-muted-foreground">Fit for Work</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {patients.filter((p) => getPatientHealthStatus(p.id) === "fit_with_adjustments").length}
              </div>
              <p className="text-sm text-muted-foreground">With Adjustments</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">
                {patients.filter((p) => getPatientHealthStatus(p.id) === "temporarily_unfit").length}
              </div>
              <p className="text-sm text-muted-foreground">Temporarily Unfit</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {patients.filter((p) => getPatientHealthStatus(p.id) === "under_review").length}
              </div>
              <p className="text-sm text-muted-foreground">Under Review</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
