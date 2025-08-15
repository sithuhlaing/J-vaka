"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Clock,
  Users,
  Search,
  Filter,
  Download,
  AlertCircle,
  CheckCircle,
  XCircle,
  MoreHorizontal,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"

export default function AdminAppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock appointment data for admin overview
  const appointmentStats = {
    total: 1247,
    scheduled: 892,
    completed: 298,
    cancelled: 57,
    todayTotal: 45,
    thisWeekTotal: 234,
  }

  const appointments = [
    {
      id: "APT-001",
      employee: "John Doe",
      employeeId: "EMP-001",
      ohProfessional: "Dr. Sarah Smith",
      date: "2024-01-15",
      time: "09:00",
      type: "Health Assessment",
      status: "scheduled",
      department: "Engineering",
      priority: "routine",
    },
    {
      id: "APT-002",
      employee: "Jane Wilson",
      employeeId: "EMP-045",
      ohProfessional: "Dr. Michael Brown",
      date: "2024-01-15",
      time: "10:30",
      type: "Follow-up",
      status: "completed",
      department: "HR",
      priority: "urgent",
    },
    {
      id: "APT-003",
      employee: "Robert Johnson",
      employeeId: "EMP-123",
      ohProfessional: "Dr. Sarah Smith",
      date: "2024-01-15",
      time: "14:00",
      type: "Fitness Assessment",
      status: "cancelled",
      department: "Operations",
      priority: "routine",
    },
    {
      id: "APT-004",
      employee: "Emily Davis",
      employeeId: "EMP-089",
      ohProfessional: "Dr. Lisa Anderson",
      date: "2024-01-16",
      time: "11:00",
      type: "Return to Work",
      status: "scheduled",
      department: "Finance",
      priority: "high",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3 mr-1" />
            Scheduled
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        )
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge variant="destructive">Urgent</Badge>
      case "high":
        return <Badge className="bg-orange-100 text-orange-800">High</Badge>
      case "routine":
        return <Badge variant="outline">Routine</Badge>
      default:
        return <Badge variant="secondary">{priority}</Badge>
    }
  }

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.ohProfessional.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || apt.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <MainLayout>
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Appointment Management</h1>
          <p className="text-muted-foreground">System-wide appointment oversight and administration</p>
        </div>

        {/* Appointment Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{appointmentStats.total}</div>
              <p className="text-xs text-muted-foreground">All appointments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
              <Clock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{appointmentStats.scheduled}</div>
              <p className="text-xs text-muted-foreground">Upcoming</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{appointmentStats.completed}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{appointmentStats.cancelled}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today</CardTitle>
              <AlertCircle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{appointmentStats.todayTotal}</div>
              <p className="text-xs text-muted-foreground">Scheduled today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <Users className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{appointmentStats.thisWeekTotal}</div>
              <p className="text-xs text-muted-foreground">Total this week</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search & Filter Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by employee, OH professional, or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={statusFilter === "all" ? "default" : "outline"}
                  onClick={() => setStatusFilter("all")}
                  size="sm"
                >
                  All
                </Button>
                <Button
                  variant={statusFilter === "scheduled" ? "default" : "outline"}
                  onClick={() => setStatusFilter("scheduled")}
                  size="sm"
                >
                  Scheduled
                </Button>
                <Button
                  variant={statusFilter === "completed" ? "default" : "outline"}
                  onClick={() => setStatusFilter("completed")}
                  size="sm"
                >
                  Completed
                </Button>
                <Button
                  variant={statusFilter === "cancelled" ? "default" : "outline"}
                  onClick={() => setStatusFilter("cancelled")}
                  size="sm"
                >
                  Cancelled
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appointments Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Appointments ({filteredAppointments.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 font-medium">ID</th>
                    <th className="text-left p-2 font-medium">Employee</th>
                    <th className="text-left p-2 font-medium">OH Professional</th>
                    <th className="text-left p-2 font-medium">Date & Time</th>
                    <th className="text-left p-2 font-medium">Type</th>
                    <th className="text-left p-2 font-medium">Department</th>
                    <th className="text-left p-2 font-medium">Priority</th>
                    <th className="text-left p-2 font-medium">Status</th>
                    <th className="text-left p-2 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((appointment) => (
                    <tr key={appointment.id} className="border-b hover:bg-muted/50">
                      <td className="p-2 font-mono text-sm">{appointment.id}</td>
                      <td className="p-2">
                        <div>
                          <div className="font-medium">{appointment.employee}</div>
                          <div className="text-sm text-muted-foreground">{appointment.employeeId}</div>
                        </div>
                      </td>
                      <td className="p-2">{appointment.ohProfessional}</td>
                      <td className="p-2">
                        <div>
                          <div className="font-medium">{appointment.date}</div>
                          <div className="text-sm text-muted-foreground">{appointment.time}</div>
                        </div>
                      </td>
                      <td className="p-2">{appointment.type}</td>
                      <td className="p-2">{appointment.department}</td>
                      <td className="p-2">{getPriorityBadge(appointment.priority)}</td>
                      <td className="p-2">{getStatusBadge(appointment.status)}</td>
                      <td className="p-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Appointment</DropdownMenuItem>
                            <DropdownMenuItem>Reschedule</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Cancel</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
