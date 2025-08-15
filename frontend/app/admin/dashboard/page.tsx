"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Users, Shield, Database, Activity, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AdminDashboardPage() {
  const router = useRouter()

  const systemStats = {
    totalUsers: 1247,
    activeUsers: 892,
    systemUptime: 99.8,
    dataBackups: 24,
  }

  const userRoleDistribution = [
    { role: "Employees", count: 1089, percentage: 87 },
    { role: "OH Professionals", count: 45, percentage: 4 },
    { role: "Managers", count: 98, percentage: 8 },
    { role: "Admins", count: 15, percentage: 1 },
  ]

  const systemAlerts = [
    {
      id: "1",
      type: "warning",
      message: "Database backup completed with warnings",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      type: "info",
      message: "System maintenance scheduled for this weekend",
      timestamp: "1 day ago",
    },
    {
      id: "3",
      type: "success",
      message: "Security audit completed successfully",
      timestamp: "3 days ago",
    },
  ]

  return (
    <MainLayout>
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">System Administration</h1>
          <p className="text-muted-foreground">Manage users, system settings, and monitor performance</p>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Registered in system</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.activeUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.systemUptime}%</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Data Backups</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.dataBackups}</div>
              <p className="text-xs text-muted-foreground">Completed this month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Role Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>User Role Distribution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {userRoleDistribution.map((role, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{role.role}</span>
                    <span>
                      {role.count} ({role.percentage}%)
                    </span>
                  </div>
                  <Progress value={role.percentage} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* System Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-3">
                    <div className="mt-1">
                      {alert.type === "warning" && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                      {alert.type === "info" && <Activity className="h-4 w-4 text-blue-500" />}
                      {alert.type === "success" && <CheckCircle className="h-4 w-4 text-green-500" />}
                    </div>
                    <div className="space-y-1 flex-1">
                      <p className="text-sm">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Administrative Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button className="h-20 flex-col" onClick={() => router.push("/admin/users")}>
                <Users className="h-6 w-6 mb-2" />
                User Management
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col bg-transparent"
                onClick={() => router.push("/admin/settings")}
              >
                <Shield className="h-6 w-6 mb-2" />
                Security Settings
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col bg-transparent"
                onClick={() => router.push("/admin/settings")}
              >
                <Database className="h-6 w-6 mb-2" />
                Data Management
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col bg-transparent"
                onClick={() => router.push("/admin/messages")}
              >
                <TrendingUp className="h-6 w-6 mb-2" />
                System Reports
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
