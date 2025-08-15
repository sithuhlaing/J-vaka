import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, FileText, Calendar, AlertTriangle } from "lucide-react"
import type { Notification } from "@/lib/mock-data"

interface NotificationsCardProps {
  notifications: Notification[]
}

export function NotificationsCard({ notifications }: NotificationsCardProps) {
  const recentNotifications = notifications
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5)

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "appointment_reminder":
        return Calendar
      case "document_uploaded":
        return FileText
      case "system_alert":
        return AlertTriangle
      default:
        return Bell
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        {recentNotifications.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No recent notifications</p>
        ) : (
          <div className="space-y-3">
            {recentNotifications.map((notification) => {
              const Icon = getNotificationIcon(notification.type)
              return (
                <div
                  key={notification.id}
                  className={`flex items-start gap-3 p-3 rounded-lg border ${
                    notification.read_at ? "bg-background" : "bg-muted/50"
                  }`}
                >
                  <Icon className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{notification.title}</p>
                      {!notification.read_at && <Badge variant="secondary" className="h-2 w-2 p-0 rounded-full" />}
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{formatTimeAgo(notification.created_at)}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
