"use client"

import { useState, useEffect } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  MessageSquare, 
  Send, 
  Users, 
  Bell,
  Search,
  Plus,
  Filter,
  Mail,
  AlertCircle
} from "lucide-react"
import { useAuthStore } from "@/lib/state/auth-store"
import { mockUsers } from "@/lib/mock-data"

interface TeamMessage {
  id: string
  sender_id: string
  recipients: string[]
  subject: string
  content: string
  type: "announcement" | "reminder" | "urgent" | "general"
  sent_at: string
  read_by: string[]
  department: string
}

export default function ManagerMessages() {
  const { user, isAuthenticated } = useAuthStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [newMessage, setNewMessage] = useState({
    subject: "",
    content: "",
    type: "general" as const,
    recipients: [] as string[]
  })

  // Mock messages for manager's department
  const teamMessages: TeamMessage[] = [
    {
      id: "msg_001",
      sender_id: user?.id || "mgr_001",
      recipients: ["usr_001", "usr_003", "usr_004"],
      subject: "Department Meeting - December 15th",
      content: "Please confirm your attendance for our monthly department meeting scheduled for December 15th at 2:00 PM in Conference Room A.",
      type: "announcement",
      sent_at: "2024-12-10T09:00:00Z",
      read_by: ["usr_001"],
      department: user?.department || "Emergency Medicine"
    },
    {
      id: "msg_002",
      sender_id: user?.id || "mgr_001", 
      recipients: ["all_department"],
      subject: "Health and Safety Reminder",
      content: "As we approach the holiday season, please remember to follow all health and safety protocols. Report any incidents immediately.",
      type: "reminder",
      sent_at: "2024-12-09T14:30:00Z",
      read_by: ["usr_001", "usr_003"],
      department: user?.department || "Emergency Medicine"
    },
    {
      id: "msg_003",
      sender_id: "usr_002",
      recipients: [user?.id || "mgr_001"],
      subject: "Urgent: Staff Coverage Request",
      content: "We need additional coverage for the night shift on December 12th due to unexpected absence. Please advise on available options.",
      type: "urgent",
      sent_at: "2024-12-08T16:45:00Z",
      read_by: [user?.id || "mgr_001"],
      department: user?.department || "Emergency Medicine"
    }
  ]

  // Get department team members
  const departmentTeam = mockUsers.filter(u => 
    u.department === user?.department && u.role === "employee"
  )

  const getMessageStats = () => {
    const total = teamMessages.length
    const unread = teamMessages.filter(msg => 
      !msg.read_by.includes(user?.id || "")
    ).length
    const urgent = teamMessages.filter(msg => msg.type === "urgent").length
    const thisWeek = teamMessages.filter(msg => 
      new Date(msg.sent_at) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    ).length

    return { total, unread, urgent, thisWeek }
  }

  const stats = getMessageStats()

  const getTypeColor = (type: string) => {
    switch (type) {
      case "urgent": return "bg-red-100 text-red-800"
      case "announcement": return "bg-blue-100 text-blue-800"
      case "reminder": return "bg-orange-100 text-orange-800"
      case "general": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const handleSendMessage = () => {
    console.log("Sending team message:", newMessage)
    // In a real app, this would send to the backend
    setNewMessage({
      subject: "",
      content: "",
      type: "general",
      recipients: []
    })
  }

  const filteredMessages = teamMessages.filter(msg =>
    msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (!isAuthenticated || user?.role !== "manager") {
    return <div>Access Denied</div>
  }

  return (
    <MainLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Team Messages</h1>
            <p className="text-muted-foreground">Communicate with your {user.department} team</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Message
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-sm text-muted-foreground">Total Messages</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Mail className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.unread}</p>
                  <p className="text-sm text-muted-foreground">Unread</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-8 w-8 text-red-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.urgent}</p>
                  <p className="text-sm text-muted-foreground">Urgent</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">{departmentTeam.length}</p>
                  <p className="text-sm text-muted-foreground">Team Members</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="messages" className="space-y-6">
          <TabsList>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="compose">Compose</TabsTrigger>
            <TabsTrigger value="team">Team Directory</TabsTrigger>
          </TabsList>

          <TabsContent value="messages" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search messages..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Messages List */}
            <Card>
              <CardHeader>
                <CardTitle>Team Communications ({filteredMessages.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredMessages.map((message) => {
                    const sender = mockUsers.find(u => u.id === message.sender_id)
                    const isUnread = !message.read_by.includes(user?.id || "")
                    
                    return (
                      <div key={message.id} className={`border rounded-lg p-4 space-y-3 ${
                        isUnread ? "bg-blue-50 border-blue-200" : ""
                      }`}>
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={sender?.avatar} />
                              <AvatarFallback>
                                {sender?.first_name?.[0]}{sender?.last_name?.[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold">{message.subject}</h3>
                              <p className="text-sm text-muted-foreground">
                                From: {sender?.first_name} {sender?.last_name}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getTypeColor(message.type)}>
                              {message.type}
                            </Badge>
                            {isUnread && (
                              <Badge variant="default">New</Badge>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-sm">{message.content}</p>
                        
                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <span>Sent: {new Date(message.sent_at).toLocaleString()}</span>
                            <span>Read by: {message.read_by.length} of {message.recipients.length}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Reply</Button>
                            <Button variant="outline" size="sm">Forward</Button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compose" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Compose Team Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Subject</label>
                    <Input
                      placeholder="Enter message subject..."
                      value={newMessage.subject}
                      onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Message Type</label>
                    <select 
                      className="w-full p-2 border rounded-md"
                      value={newMessage.type}
                      onChange={(e) => setNewMessage({ ...newMessage, type: e.target.value as any })}
                    >
                      <option value="general">General</option>
                      <option value="announcement">Announcement</option>
                      <option value="reminder">Reminder</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Recipients</label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="all_team" />
                      <label htmlFor="all_team" className="text-sm">All {user.department} Team</label>
                    </div>
                    {departmentTeam.slice(0, 5).map(member => (
                      <div key={member.id} className="flex items-center gap-2">
                        <input type="checkbox" id={member.id} />
                        <label htmlFor={member.id} className="text-sm">
                          {member.first_name} {member.last_name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Message Content</label>
                  <Textarea
                    placeholder="Enter your message..."
                    className="min-h-[120px]"
                    value={newMessage.content}
                    onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    This message will be sent to selected team members
                  </div>
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{user.department} Team Directory</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {departmentTeam.map((member) => (
                    <div key={member.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>
                            {member.first_name[0]}{member.last_name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{member.first_name} {member.last_name}</h3>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      
                      <div className="text-sm">
                        <p><strong>ID:</strong> {member.employee_number}</p>
                        <p><strong>Email:</strong> {member.email}</p>
                        <p><strong>Phone:</strong> {member.phone}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Mail className="h-4 w-4 mr-2" />
                          Email
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}