"use client"

import { useState, useEffect } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Search, Send, MessageSquare, Users, Bell, Archive } from "lucide-react"
import { useAuthStore } from "@/lib/state/auth-store"

interface SystemMessage {
  id: string
  type: "system_alert" | "broadcast" | "notification"
  title: string
  content: string
  recipients: string[]
  sent_at: string
  status: "draft" | "sent" | "scheduled"
  priority: "low" | "normal" | "high" | "urgent"
}

export default function AdminMessages() {
  const { user, isAuthenticated } = useAuthStore()
  const [selectedTab, setSelectedTab] = useState<"system" | "broadcasts" | "alerts">("system")
  const [searchTerm, setSearchTerm] = useState("")
  const [newMessage, setNewMessage] = useState({
    title: "",
    content: "",
    type: "broadcast" as const,
    priority: "normal" as const,
    recipients: [] as string[]
  })

  const systemMessages: SystemMessage[] = [
    {
      id: "msg_001",
      type: "system_alert",
      title: "System Maintenance Scheduled",
      content: "The OH eHR system will undergo scheduled maintenance on December 20th from 11:00 PM to 1:00 AM. During this time, the system will be unavailable.",
      recipients: ["all"],
      sent_at: "2024-12-10T14:30:00Z",
      status: "sent",
      priority: "high"
    },
    {
      id: "msg_002", 
      type: "broadcast",
      title: "New COVID-19 Vaccination Guidelines",
      content: "Updated guidelines for COVID-19 vaccinations have been released. All OH professionals should review the new protocols by December 15th.",
      recipients: ["oh_professional"],
      sent_at: "2024-12-09T09:00:00Z",
      status: "sent",
      priority: "normal"
    },
    {
      id: "msg_003",
      type: "notification",
      title: "Security Update Required",
      content: "All users must update their passwords by December 25th to comply with new security requirements.",
      recipients: ["all"],
      sent_at: "2024-12-08T16:45:00Z",
      status: "sent",
      priority: "urgent"
    }
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-100 text-red-800"
      case "high": return "bg-orange-100 text-orange-800" 
      case "normal": return "bg-blue-100 text-blue-800"
      case "low": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const handleSendMessage = () => {
    console.log("Sending system message:", newMessage)
    // In a real app, this would send to the backend
    setNewMessage({
      title: "",
      content: "",
      type: "broadcast",
      priority: "normal",
      recipients: []
    })
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return <div>Access Denied</div>
  }

  return (
    <MainLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">System Messages</h1>
            <p className="text-muted-foreground">Manage system-wide communications and notifications</p>
          </div>
          <Button className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            New System Message
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-sm text-muted-foreground">Total Messages</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">1,247</p>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Bell className="h-8 w-8 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold">23</p>
                  <p className="text-sm text-muted-foreground">Pending Alerts</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Archive className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">89</p>
                  <p className="text-sm text-muted-foreground">Archived</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Message Composition */}
        <Card>
          <CardHeader>
            <CardTitle>Compose System Message</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Message Title</label>
                <Input
                  placeholder="Enter message title..."
                  value={newMessage.title}
                  onChange={(e) => setNewMessage({ ...newMessage, title: e.target.value })}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Priority</label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={newMessage.priority}
                  onChange={(e) => setNewMessage({ ...newMessage, priority: e.target.value as any })}
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Message Content</label>
              <Textarea
                placeholder="Enter your message content..."
                className="min-h-[100px]"
                value={newMessage.content}
                onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
              />
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                This message will be sent to all system users
              </div>
              <Button onClick={handleSendMessage}>
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Message History */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Message History</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  className="pl-10 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemMessages.map((message) => (
                <div key={message.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{message.title}</h3>
                        <Badge className={getPriorityColor(message.priority)}>
                          {message.priority}
                        </Badge>
                        <Badge variant="outline">{message.type.replace("_", " ")}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Sent: {new Date(message.sent_at).toLocaleString()}
                      </p>
                    </div>
                    <Badge variant={message.status === "sent" ? "default" : "secondary"}>
                      {message.status}
                    </Badge>
                  </div>
                  
                  <p className="text-sm">{message.content}</p>
                  
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>Recipients: {message.recipients.join(", ")}</span>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button variant="outline" size="sm">Resend</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}