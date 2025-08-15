"use client"

import { useState, useEffect } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Settings, 
  Shield, 
  Database, 
  Mail, 
  Bell, 
  Users, 
  Clock,
  Lock,
  Server,
  AlertTriangle,
  Save,
  RefreshCw
} from "lucide-react"
import { useAuthStore } from "@/lib/state/auth-store"

interface SystemSettings {
  general: {
    system_name: string
    organization: string
    contact_email: string
    support_phone: string
    timezone: string
    date_format: string
  }
  security: {
    password_policy: {
      min_length: number
      require_uppercase: boolean
      require_lowercase: boolean
      require_numbers: boolean
      require_symbols: boolean
      expiry_days: number
    }
    session_timeout: number
    two_factor_required: boolean
    ip_whitelist_enabled: boolean
    audit_logging: boolean
  }
  notifications: {
    email_enabled: boolean
    sms_enabled: boolean
    appointment_reminders: boolean
    system_alerts: boolean
    maintenance_notifications: boolean
  }
  data_retention: {
    appointment_history_months: number
    document_retention_years: number
    audit_log_months: number
    auto_archive_enabled: boolean
  }
}

export default function AdminSystemSettings() {
  const { user, isAuthenticated } = useAuthStore()
  const [settings, setSettings] = useState<SystemSettings>({
    general: {
      system_name: "OH eHR System",
      organization: "NHS Trust",
      contact_email: "support@nhstrust.uk",
      support_phone: "+44 0800 123 4567",
      timezone: "Europe/London",
      date_format: "DD/MM/YYYY"
    },
    security: {
      password_policy: {
        min_length: 8,
        require_uppercase: true,
        require_lowercase: true,
        require_numbers: true,
        require_symbols: false,
        expiry_days: 90
      },
      session_timeout: 30,
      two_factor_required: false,
      ip_whitelist_enabled: false,
      audit_logging: true
    },
    notifications: {
      email_enabled: true,
      sms_enabled: false,
      appointment_reminders: true,
      system_alerts: true,
      maintenance_notifications: true
    },
    data_retention: {
      appointment_history_months: 24,
      document_retention_years: 7,
      audit_log_months: 12,
      auto_archive_enabled: true
    }
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleSaveSettings = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log("Settings saved:", settings)
    setIsSaving(false)
  }

  const updateSetting = (section: keyof SystemSettings, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }))
  }

  const updateNestedSetting = (section: keyof SystemSettings, parent: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [parent]: {
          ...(prev[section] as any)[parent],
          [key]: value
        }
      }
    }))
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return <div>Access Denied</div>
  }

  return (
    <MainLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">System Settings</h1>
            <p className="text-muted-foreground">Configure system-wide settings and preferences</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset to Defaults
            </Button>
            <Button onClick={handleSaveSettings} disabled={isSaving}>
              {isSaving ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="data" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Data & Retention
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="system_name">System Name</Label>
                    <Input
                      id="system_name"
                      value={settings.general.system_name}
                      onChange={(e) => updateSetting("general", "system_name", e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="organization">Organization</Label>
                    <Input
                      id="organization"
                      value={settings.general.organization}
                      onChange={(e) => updateSetting("general", "organization", e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="contact_email">Contact Email</Label>
                    <Input
                      id="contact_email"
                      type="email"
                      value={settings.general.contact_email}
                      onChange={(e) => updateSetting("general", "contact_email", e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="support_phone">Support Phone</Label>
                    <Input
                      id="support_phone"
                      value={settings.general.support_phone}
                      onChange={(e) => updateSetting("general", "support_phone", e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <select 
                      id="timezone"
                      className="w-full p-2 border rounded-md"
                      value={settings.general.timezone}
                      onChange={(e) => updateSetting("general", "timezone", e.target.value)}
                    >
                      <option value="Europe/London">Europe/London</option>
                      <option value="UTC">UTC</option>
                      <option value="Europe/Dublin">Europe/Dublin</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="date_format">Date Format</Label>
                    <select 
                      id="date_format"
                      className="w-full p-2 border rounded-md"
                      value={settings.general.date_format}
                      onChange={(e) => updateSetting("general", "date_format", e.target.value)}
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Password Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="min_length">Minimum Password Length</Label>
                    <Input
                      id="min_length"
                      type="number"
                      value={settings.security.password_policy.min_length}
                      onChange={(e) => updateNestedSetting("security", "password_policy", "min_length", parseInt(e.target.value))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="expiry_days">Password Expiry (Days)</Label>
                    <Input
                      id="expiry_days"
                      type="number"
                      value={settings.security.password_policy.expiry_days}
                      onChange={(e) => updateNestedSetting("security", "password_policy", "expiry_days", parseInt(e.target.value))}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="require_uppercase">Require Uppercase Letters</Label>
                    <Switch
                      id="require_uppercase"
                      checked={settings.security.password_policy.require_uppercase}
                      onCheckedChange={(checked) => updateNestedSetting("security", "password_policy", "require_uppercase", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="require_lowercase">Require Lowercase Letters</Label>
                    <Switch
                      id="require_lowercase"
                      checked={settings.security.password_policy.require_lowercase}
                      onCheckedChange={(checked) => updateNestedSetting("security", "password_policy", "require_lowercase", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="require_numbers">Require Numbers</Label>
                    <Switch
                      id="require_numbers"
                      checked={settings.security.password_policy.require_numbers}
                      onCheckedChange={(checked) => updateNestedSetting("security", "password_policy", "require_numbers", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="require_symbols">Require Special Characters</Label>
                    <Switch
                      id="require_symbols"
                      checked={settings.security.password_policy.require_symbols}
                      onCheckedChange={(checked) => updateNestedSetting("security", "password_policy", "require_symbols", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="session_timeout">Session Timeout (Minutes)</Label>
                  <Input
                    id="session_timeout"
                    type="number"
                    value={settings.security.session_timeout}
                    onChange={(e) => updateSetting("security", "session_timeout", parseInt(e.target.value))}
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="two_factor_required">Require Two-Factor Authentication</Label>
                    <Switch
                      id="two_factor_required"
                      checked={settings.security.two_factor_required}
                      onCheckedChange={(checked) => updateSetting("security", "two_factor_required", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="audit_logging">Enable Audit Logging</Label>
                    <Switch
                      id="audit_logging"
                      checked={settings.security.audit_logging}
                      onCheckedChange={(checked) => updateSetting("security", "audit_logging", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email_enabled">Enable Email Notifications</Label>
                    <Switch
                      id="email_enabled"
                      checked={settings.notifications.email_enabled}
                      onCheckedChange={(checked) => updateSetting("notifications", "email_enabled", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms_enabled">Enable SMS Notifications</Label>
                    <Switch
                      id="sms_enabled"
                      checked={settings.notifications.sms_enabled}
                      onCheckedChange={(checked) => updateSetting("notifications", "sms_enabled", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="appointment_reminders">Appointment Reminders</Label>
                    <Switch
                      id="appointment_reminders"
                      checked={settings.notifications.appointment_reminders}
                      onCheckedChange={(checked) => updateSetting("notifications", "appointment_reminders", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="system_alerts">System Alerts</Label>
                    <Switch
                      id="system_alerts"
                      checked={settings.notifications.system_alerts}
                      onCheckedChange={(checked) => updateSetting("notifications", "system_alerts", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="maintenance_notifications">Maintenance Notifications</Label>
                    <Switch
                      id="maintenance_notifications"
                      checked={settings.notifications.maintenance_notifications}
                      onCheckedChange={(checked) => updateSetting("notifications", "maintenance_notifications", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Data Retention Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="appointment_history">Appointment History (Months)</Label>
                    <Input
                      id="appointment_history"
                      type="number"
                      value={settings.data_retention.appointment_history_months}
                      onChange={(e) => updateSetting("data_retention", "appointment_history_months", parseInt(e.target.value))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="document_retention">Document Retention (Years)</Label>
                    <Input
                      id="document_retention"
                      type="number"
                      value={settings.data_retention.document_retention_years}
                      onChange={(e) => updateSetting("data_retention", "document_retention_years", parseInt(e.target.value))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="audit_log">Audit Log Retention (Months)</Label>
                    <Input
                      id="audit_log"
                      type="number"
                      value={settings.data_retention.audit_log_months}
                      onChange={(e) => updateSetting("data_retention", "audit_log_months", parseInt(e.target.value))}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto_archive">Enable Auto-Archive</Label>
                  <Switch
                    id="auto_archive"
                    checked={settings.data_retention.auto_archive_enabled}
                    onCheckedChange={(checked) => updateSetting("data_retention", "auto_archive_enabled", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}