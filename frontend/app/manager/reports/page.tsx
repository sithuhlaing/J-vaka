"use client"

import { useState, useEffect } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BarChart3, 
  Download, 
  TrendingUp, 
  TrendingDown,
  Users, 
  Calendar,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  PieChart,
  Target
} from "lucide-react"
import { useAuthStore } from "@/lib/state/auth-store"
import { mockUsers, mockAppointments } from "@/lib/mock-data"

interface DepartmentMetrics {
  total_employees: number
  health_score: number
  compliance_rate: number
  overdue_assessments: number
  health_distribution: {
    healthy: number
    needs_attention: number
    high_risk: number
    overdue: number
  }
  recent_trends: {
    health_score_change: number
    compliance_trend: "improving" | "declining" | "stable"
    vaccination_rate: number
  }
  appointment_metrics: {
    total_this_month: number
    completed_rate: number
    average_wait_time: number
    no_show_rate: number
  }
}

export default function ManagerReports() {
  const { user, isAuthenticated } = useAuthStore()
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  // Calculate department metrics
  const departmentEmployees = mockUsers.filter(u => 
    u.department === user?.department && u.role === "employee"
  )

  const departmentAppointments = mockAppointments.filter(apt => {
    const employee = mockUsers.find(u => u.id === apt.employee_id)
    return employee?.department === user?.department
  })

  const metrics: DepartmentMetrics = {
    total_employees: departmentEmployees.length,
    health_score: 87.5,
    compliance_rate: 92.3,
    overdue_assessments: 3,
    health_distribution: {
      healthy: Math.floor(departmentEmployees.length * 0.75),
      needs_attention: Math.floor(departmentEmployees.length * 0.15),
      high_risk: Math.floor(departmentEmployees.length * 0.07),
      overdue: Math.floor(departmentEmployees.length * 0.03)
    },
    recent_trends: {
      health_score_change: 2.1,
      compliance_trend: "improving",
      vaccination_rate: 96.7
    },
    appointment_metrics: {
      total_this_month: departmentAppointments.length,
      completed_rate: 89.2,
      average_wait_time: 12,
      no_show_rate: 4.3
    }
  }

  const getHealthDistributionColor = (category: string) => {
    switch (category) {
      case "healthy": return "bg-green-100 text-green-800"
      case "needs_attention": return "bg-yellow-100 text-yellow-800"
      case "high_risk": return "bg-red-100 text-red-800"
      case "overdue": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving": return <TrendingUp className="h-4 w-4 text-green-600" />
      case "declining": return <TrendingDown className="h-4 w-4 text-red-600" />
      default: return <Activity className="h-4 w-4 text-blue-600" />
    }
  }

  if (!isAuthenticated || user?.role !== "manager") {
    return <div>Access Denied</div>
  }

  return (
    <MainLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Department Reports</h1>
            <p className="text-muted-foreground">Health and compliance analytics for {user.department}</p>
          </div>
          <div className="flex gap-2">
            <select 
              className="p-2 border rounded-md"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Employees</p>
                  <p className="text-3xl font-bold">{metrics.total_employees}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Health Score</p>
                  <div className="flex items-center gap-2">
                    <p className="text-3xl font-bold">{metrics.health_score}%</p>
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm">+{metrics.recent_trends.health_score_change}</span>
                    </div>
                  </div>
                </div>
                <Target className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Compliance Rate</p>
                  <p className="text-3xl font-bold">{metrics.compliance_rate}%</p>
                </div>
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Overdue</p>
                  <p className="text-3xl font-bold text-red-600">{metrics.overdue_assessments}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="health">Health Status</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Health Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Health Status Distribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(metrics.health_distribution).map(([status, count]) => (
                    <div key={status} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Badge className={getHealthDistributionColor(status)} variant="secondary">
                          {status.replace("_", " ")}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{count}</span>
                        <span className="text-sm text-muted-foreground">
                          ({((count / metrics.total_employees) * 100).toFixed(1)}%)
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      {getTrendIcon(metrics.recent_trends.compliance_trend)}
                      <span className="font-medium">Trend: {metrics.recent_trends.compliance_trend}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Health scores have improved by {metrics.recent_trends.health_score_change} points this month
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Key Performance Indicators</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Vaccination Rate</span>
                      <span className="font-bold text-green-600">{metrics.recent_trends.vaccination_rate}%</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Appointment Completion</span>
                      <span className="font-bold">{metrics.appointment_metrics.completed_rate}%</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Average Wait Time</span>
                      <span className="font-bold">{metrics.appointment_metrics.average_wait_time} days</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">No-Show Rate</span>
                      <span className="font-bold text-orange-600">{metrics.appointment_metrics.no_show_rate}%</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="text-center">
                      <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Detailed charts and visualizations would be displayed here
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="health" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Health Score Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">
                      Health score trend chart would be displayed here
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Risk Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <PieChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">
                      Risk distribution pie chart would be displayed here
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Health Actions Required</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-semibold text-red-700">High Priority</h4>
                    <p className="text-sm text-muted-foreground">3 employees need immediate health assessments</p>
                  </div>
                  
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h4 className="font-semibold text-yellow-700">Medium Priority</h4>
                    <p className="text-sm text-muted-foreground">7 employees due for routine check-ups</p>
                  </div>
                  
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-blue-700">Upcoming</h4>
                    <p className="text-sm text-muted-foreground">12 assessments scheduled this month</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Appointment Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{metrics.appointment_metrics.total_this_month}</div>
                      <div className="text-sm text-muted-foreground">Total This Month</div>
                    </div>
                    
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{metrics.appointment_metrics.completed_rate}%</div>
                      <div className="text-sm text-muted-foreground">Completion Rate</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Average Wait Time</span>
                      <span className="font-medium">{metrics.appointment_metrics.average_wait_time} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">No-Show Rate</span>
                      <span className="font-medium text-orange-600">{metrics.appointment_metrics.no_show_rate}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Appointment Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">
                      Appointment type breakdown chart would be displayed here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 border rounded-lg">
                    <div className="text-3xl font-bold text-green-600 mb-2">{metrics.compliance_rate}%</div>
                    <div className="text-sm text-muted-foreground">Overall Compliance</div>
                    <div className="mt-2 text-xs text-green-600">
                      {getTrendIcon("improving")} Improving
                    </div>
                  </div>
                  
                  <div className="text-center p-6 border rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{metrics.recent_trends.vaccination_rate}%</div>
                    <div className="text-sm text-muted-foreground">Vaccination Coverage</div>
                    <div className="mt-2 text-xs text-blue-600">Target: 95%</div>
                  </div>
                  
                  <div className="text-center p-6 border rounded-lg">
                    <div className="text-3xl font-bold text-orange-600 mb-2">{metrics.overdue_assessments}</div>
                    <div className="text-sm text-muted-foreground">Overdue Assessments</div>
                    <div className="mt-2 text-xs text-orange-600">Requires Action</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}