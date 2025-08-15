"use client"

import { useState, useEffect } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  FileText, 
  Download, 
  Search, 
  Filter,
  Eye,
  Archive,
  AlertTriangle,
  Clock,
  Users,
  Folder,
  BarChart3
} from "lucide-react"
import { useAuthStore } from "@/lib/state/auth-store"
import { mockUsers } from "@/lib/mock-data"

interface Document {
  id: string
  name: string
  type: "health_certificate" | "test_result" | "medical_report" | "form" | "vaccination_record" | "assessment_report"
  employee_id: string
  uploaded_by: string
  file_size: number
  created_at: string
  status: "pending_review" | "approved" | "rejected" | "archived"
  confidential: boolean
  department: string
}

export default function ManagerDocuments() {
  const { user, isAuthenticated } = useAuthStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  // Mock documents for manager's department
  const departmentDocuments: Document[] = [
    {
      id: "doc_001",
      name: "Annual Health Assessment - John Doe",
      type: "health_certificate",
      employee_id: "usr_001",
      uploaded_by: "usr_002",
      file_size: 2048576,
      created_at: "2024-12-10T10:30:00Z",
      status: "pending_review",
      confidential: true,
      department: user?.department || "Emergency Medicine"
    },
    {
      id: "doc_002", 
      name: "COVID-19 Vaccination Record - Jane Smith",
      type: "vaccination_record",
      employee_id: "usr_003",
      uploaded_by: "usr_002",
      file_size: 1536000,
      created_at: "2024-12-09T14:15:00Z",
      status: "approved",
      confidential: false,
      department: user?.department || "Emergency Medicine"
    },
    {
      id: "doc_003",
      name: "Return to Work Assessment - Mike Johnson",
      type: "assessment_report",
      employee_id: "usr_004",
      uploaded_by: "usr_002",
      file_size: 3072000,
      created_at: "2024-12-08T09:45:00Z",
      status: "approved",
      confidential: true,
      department: user?.department || "Emergency Medicine"
    }
  ]

  const getDocumentStats = () => {
    const total = departmentDocuments.length
    const pendingReview = departmentDocuments.filter(doc => doc.status === "pending_review").length
    const confidential = departmentDocuments.filter(doc => doc.confidential).length
    const thisWeek = departmentDocuments.filter(doc => 
      new Date(doc.created_at) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    ).length

    const typeBreakdown = departmentDocuments.reduce((acc, doc) => {
      acc[doc.type] = (acc[doc.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return { total, pendingReview, confidential, thisWeek, typeBreakdown }
  }

  const stats = getDocumentStats()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending_review": return "bg-yellow-100 text-yellow-800"
      case "approved": return "bg-green-100 text-green-800"
      case "rejected": return "bg-red-100 text-red-800"
      case "archived": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "health_certificate": return "bg-blue-100 text-blue-800"
      case "vaccination_record": return "bg-green-100 text-green-800"
      case "assessment_report": return "bg-purple-100 text-purple-800"
      case "medical_report": return "bg-orange-100 text-orange-800"
      case "test_result": return "bg-cyan-100 text-cyan-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const filteredDocuments = departmentDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || doc.type === selectedType
    const matchesStatus = selectedStatus === "all" || doc.status === selectedStatus
    return matchesSearch && matchesType && matchesStatus
  })

  if (!isAuthenticated || user?.role !== "manager") {
    return <div>Access Denied</div>
  }

  return (
    <MainLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Team Documents</h1>
            <p className="text-muted-foreground">Review and manage documents for {user.department}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Archive className="h-4 w-4 mr-2" />
              Archive Selected
            </Button>
            <Button>
              <BarChart3 className="h-4 w-4 mr-2" />
              Document Reports
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-sm text-muted-foreground">Total Documents</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.pendingReview}</p>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-8 w-8 text-red-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.confidential}</p>
                  <p className="text-sm text-muted-foreground">Confidential</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.thisWeek}</p>
                  <p className="text-sm text-muted-foreground">This Week</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search documents..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <select 
                className="p-2 border rounded-md"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="health_certificate">Health Certificate</option>
                <option value="vaccination_record">Vaccination Record</option>
                <option value="assessment_report">Assessment Report</option>
                <option value="medical_report">Medical Report</option>
                <option value="test_result">Test Result</option>
              </select>

              <select 
                className="p-2 border rounded-md"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending_review">Pending Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="archived">Archived</option>
              </select>

              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="documents" className="space-y-6">
          <TabsList>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Department Documents ({filteredDocuments.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredDocuments.map((document) => {
                    const employee = mockUsers.find(u => u.id === document.employee_id)
                    const uploader = mockUsers.find(u => u.id === document.uploaded_by)
                    
                    return (
                      <div key={document.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <FileText className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{document.name}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className={getTypeColor(document.type)} variant="secondary">
                                  {document.type.replace("_", " ")}
                                </Badge>
                                {document.confidential && (
                                  <Badge variant="destructive">Confidential</Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <Badge className={getStatusColor(document.status)}>
                            {document.status.replace("_", " ")}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                          <div>
                            <span className="font-medium">Employee:</span><br />
                            {employee?.first_name} {employee?.last_name}
                          </div>
                          <div>
                            <span className="font-medium">Uploaded by:</span><br />
                            {uploader?.first_name} {uploader?.last_name}
                          </div>
                          <div>
                            <span className="font-medium">Size:</span><br />
                            {formatFileSize(document.file_size)}
                          </div>
                          <div>
                            <span className="font-medium">Created:</span><br />
                            {new Date(document.created_at).toLocaleDateString()}
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-muted-foreground">
                            Last updated: {new Date(document.created_at).toLocaleString()}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                            {document.status === "pending_review" && (
                              <>
                                <Button size="sm" variant="default">
                                  Approve
                                </Button>
                                <Button size="sm" variant="destructive">
                                  Reject
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Document Types</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(stats.typeBreakdown).map(([type, count]) => (
                    <div key={type} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Badge className={getTypeColor(type)} variant="secondary">
                          {type.replace("_", " ")}
                        </Badge>
                      </div>
                      <span className="font-semibold">{count}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upload Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Upload Analytics</h3>
                    <p className="text-muted-foreground">
                      Document upload trends would be displayed here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 border rounded-lg">
                    <div className="text-3xl font-bold text-green-600 mb-2">92%</div>
                    <div className="text-sm text-muted-foreground">Documents Reviewed</div>
                  </div>
                  <div className="text-center p-6 border rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-2">15</div>
                    <div className="text-sm text-muted-foreground">Avg. Review Time (hours)</div>
                  </div>
                  <div className="text-center p-6 border rounded-lg">
                    <div className="text-3xl font-bold text-orange-600 mb-2">3</div>
                    <div className="text-sm text-muted-foreground">Pending Reviews</div>
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