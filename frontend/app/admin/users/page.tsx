"use client"

import { useState, useEffect } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  UserCheck, 
  UserX, 
  Filter,
  Download,
  Mail,
  Shield
} from "lucide-react"
import { useAuthStore } from "@/lib/state/auth-store"
import { mockUsers } from "@/lib/mock-data"

export default function AdminUserManagement() {
  const { user, isAuthenticated } = useAuthStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [showNewUserDialog, setShowNewUserDialog] = useState(false)

  const [users, setUsers] = useState(mockUsers)

  const roleColors = {
    employee: "bg-blue-100 text-blue-800",
    oh_professional: "bg-green-100 text-green-800", 
    manager: "bg-purple-100 text-purple-800",
    admin: "bg-red-100 text-red-800"
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.employeeNumber.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesRole = selectedRole === "all" || user.role === selectedRole
    const matchesStatus = selectedStatus === "all" || 
                         (selectedStatus === "active" && new Date(user.lastLogin) > new Date(Date.now() - 30*24*60*60*1000)) ||
                         (selectedStatus === "inactive" && new Date(user.lastLogin) <= new Date(Date.now() - 30*24*60*60*1000))
    
    return matchesSearch && matchesRole && matchesStatus
  })

  const getUserStats = () => {
    const totalUsers = users.length
    const activeUsers = users.filter(u => new Date(u.last_login) > new Date(Date.now() - 30*24*60*60*1000)).length
    const roleBreakdown = users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return { totalUsers, activeUsers, roleBreakdown }
  }

  const stats = getUserStats()

  const handleUserAction = (userId: string, action: string) => {
    console.log(`Performing ${action} on user ${userId}`)
    // In a real app, this would call the backend API
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return <div>Access Denied</div>
  }

  return (
    <MainLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">User Management</h1>
            <p className="text-muted-foreground">Manage system users and permissions</p>
          </div>
          <Button 
            className="flex items-center gap-2"
            onClick={() => setShowNewUserDialog(true)}
          >
            <Plus className="h-4 w-4" />
            Add New User
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{stats.totalUsers}</p>
                <p className="text-sm text-muted-foreground">Total Users</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{stats.activeUsers}</p>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{stats.roleBreakdown.employee || 0}</p>
                <p className="text-sm text-muted-foreground">Employees</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{stats.roleBreakdown.oh_professional || 0}</p>
                <p className="text-sm text-muted-foreground">OH Professionals</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{stats.roleBreakdown.manager || 0}</p>
                <p className="text-sm text-muted-foreground">Managers</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <select 
                  className="p-2 border rounded-md"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <option value="all">All Roles</option>
                  <option value="employee">Employee</option>
                  <option value="oh_professional">OH Professional</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>

                <select 
                  className="p-2 border rounded-md"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>

                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Table */}
        <Card>
          <CardHeader>
            <CardTitle>Users ({filteredUsers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((userData) => {
                  const isActive = new Date(userData.last_login) > new Date(Date.now() - 30*24*60*60*1000)
                  
                  return (
                    <TableRow key={userData.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={userData.avatar} alt={`${userData.firstName} ${userData.lastName}`} />
                            <AvatarFallback>
                              {userData.firstName[0]}{userData.lastName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{userData.firstName} {userData.lastName}</div>
                            <div className="text-sm text-muted-foreground">{userData.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{userData.employeeNumber}</TableCell>
                      <TableCell>
                        <Badge className={roleColors[userData.role as keyof typeof roleColors]}>
                          {userData.role.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>{userData.department}</TableCell>
                      <TableCell className="text-sm">
                        {new Date(userData.last_login).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant={isActive ? "default" : "secondary"}>
                          {isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* New User Dialog */}
        <Dialog open={showNewUserDialog} onOpenChange={setShowNewUserDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">First Name</label>
                  <Input placeholder="Enter first name" />
                </div>
                <div>
                  <label className="text-sm font-medium">Last Name</label>
                  <Input placeholder="Enter last name" />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input type="email" placeholder="Enter email address" />
              </div>
              
              <div>
                <label className="text-sm font-medium">Role</label>
                <select className="w-full p-2 border rounded-md">
                  <option value="employee">Employee</option>
                  <option value="oh_professional">OH Professional</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium">Department</label>
                <Input placeholder="Enter department" />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowNewUserDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowNewUserDialog(false)}>
                  Create User
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  )
}