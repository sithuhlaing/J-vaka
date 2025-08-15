"use client"

import { useState } from "react"
import { useAuthStore } from "@/lib/state/auth-store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/atoms/input"
import { Select } from "@/components/atoms/select"
import { Checkbox } from "@/components/atoms/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Bell, Shield, Eye } from "lucide-react"

export default function ProfilePage() {
  const { user } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: "",
    department: user?.department || "",
    jobTitle: "",
    preferredLanguage: "en",
    timezone: "Europe/London",
  })

  const [notifications, setNotifications] = useState({
    emailAppointments: true,
    smsReminders: false,
    systemUpdates: true,
    healthAlerts: true,
  })

  const [accessibility, setAccessibility] = useState({
    highContrast: false,
    largeText: false,
    screenReader: false,
    keyboardNavigation: true,
  })

  return (
    <div className="nhsuk-width-container">
      <main className="nhsuk-main-wrapper" id="maincontent" role="main">
        <div className="nhsuk-grid-row">
          <div className="nhsuk-grid-column-full">
            <nav className="nhsuk-breadcrumb" aria-label="Breadcrumb">
              <div className="nhsuk-width-container">
                <ol className="nhsuk-breadcrumb__list">
                  <li className="nhsuk-breadcrumb__item">
                    <a className="nhsuk-breadcrumb__link" href={`/${user?.role}/dashboard`}>
                      Dashboard
                    </a>
                  </li>
                  <li className="nhsuk-breadcrumb__item">
                    <a className="nhsuk-breadcrumb__link" href="/profile">
                      Profile Settings
                    </a>
                  </li>
                </ol>
              </div>
            </nav>

            <div className="nhsuk-u-margin-bottom-8">
              <h1 className="nhsuk-heading-xl">
                <User className="nhsuk-icon nhsuk-icon__user" aria-hidden="true" />
                Profile Settings
              </h1>
              <p className="nhsuk-body-l nhsuk-u-margin-bottom-0">
                Manage your personal information, preferences, and accessibility settings
              </p>
            </div>

            <Tabs defaultValue="personal" className="nhsuk-tabs">
              <TabsList className="nhsuk-tabs__list" role="tablist">
                <TabsTrigger
                  value="personal"
                  className="nhsuk-tabs__list-item"
                  role="tab"
                  aria-controls="personal-panel"
                >
                  <User className="nhsuk-icon" aria-hidden="true" />
                  Personal Information
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="nhsuk-tabs__list-item"
                  role="tab"
                  aria-controls="notifications-panel"
                >
                  <Bell className="nhsuk-icon" aria-hidden="true" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger
                  value="accessibility"
                  className="nhsuk-tabs__list-item"
                  role="tab"
                  aria-controls="accessibility-panel"
                >
                  <Eye className="nhsuk-icon" aria-hidden="true" />
                  Accessibility
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="nhsuk-tabs__list-item"
                  role="tab"
                  aria-controls="security-panel"
                >
                  <Shield className="nhsuk-icon" aria-hidden="true" />
                  Security
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal" id="personal-panel" role="tabpanel">
                <Card className="nhsuk-card">
                  <CardHeader className="nhsuk-card__header">
                    <CardTitle className="nhsuk-card__heading nhsuk-heading-m">Personal Information</CardTitle>
                    <CardDescription className="nhsuk-body-s">
                      Update your personal details and contact information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="nhsuk-card__content">
                    <form className="nhsuk-form" onSubmit={(e) => e.preventDefault()}>
                      <div className="nhsuk-form-group">
                        <div className="nhsuk-grid-row">
                          <div className="nhsuk-grid-column-one-half">
                            <Input
                              id="firstName"
                              label="First Name"
                              value={formData.firstName}
                              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                              disabled={!isEditing}
                              required
                              aria-describedby="firstName-hint"
                            />
                            <div id="firstName-hint" className="nhsuk-hint">
                              Your legal first name as it appears on official documents
                            </div>
                          </div>
                          <div className="nhsuk-grid-column-one-half">
                            <Input
                              id="lastName"
                              label="Last Name"
                              value={formData.lastName}
                              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                              disabled={!isEditing}
                              required
                              aria-describedby="lastName-hint"
                            />
                            <div id="lastName-hint" className="nhsuk-hint">
                              Your legal surname as it appears on official documents
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="nhsuk-form-group">
                        <Input
                          id="email"
                          label="Email Address"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          disabled={!isEditing}
                          required
                          aria-describedby="email-hint"
                        />
                        <div id="email-hint" className="nhsuk-hint">
                          This email will be used for system notifications and communications
                        </div>
                      </div>

                      <div className="nhsuk-form-group">
                        <div className="nhsuk-grid-row">
                          <div className="nhsuk-grid-column-one-half">
                            <Input
                              id="phone"
                              label="Phone Number"
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              disabled={!isEditing}
                              aria-describedby="phone-hint"
                            />
                            <div id="phone-hint" className="nhsuk-hint">
                              Optional: For SMS notifications and emergency contact
                            </div>
                          </div>
                          <div className="nhsuk-grid-column-one-half">
                            <Input
                              id="jobTitle"
                              label="Job Title"
                              value={formData.jobTitle}
                              onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                              disabled={!isEditing}
                              aria-describedby="jobTitle-hint"
                            />
                            <div id="jobTitle-hint" className="nhsuk-hint">
                              Your current position or role
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="nhsuk-form-group">
                        <Select
                          id="preferredLanguage"
                          label="Preferred Language"
                          value={formData.preferredLanguage}
                          onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
                          disabled={!isEditing}
                          options={["en", "cy", "gd"]}
                          aria-describedby="language-hint"
                        />
                        <div id="language-hint" className="nhsuk-hint">
                          Choose your preferred language for the interface
                        </div>
                      </div>

                      <div className="nhsuk-button-group">
                        {!isEditing ? (
                          <Button type="button" onClick={() => setIsEditing(true)} className="nhsuk-button">
                            Edit Information
                          </Button>
                        ) : (
                          <>
                            <Button type="submit" className="nhsuk-button" onClick={() => setIsEditing(false)}>
                              Save Changes
                            </Button>
                            <Button
                              type="button"
                              variant="secondary"
                              className="nhsuk-button nhsuk-button--secondary"
                              onClick={() => setIsEditing(false)}
                            >
                              Cancel
                            </Button>
                          </>
                        )}
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" id="notifications-panel" role="tabpanel">
                <Card className="nhsuk-card">
                  <CardHeader className="nhsuk-card__header">
                    <CardTitle className="nhsuk-card__heading nhsuk-heading-m">Notification Preferences</CardTitle>
                    <CardDescription className="nhsuk-body-s">
                      Choose how you want to receive notifications and updates
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="nhsuk-card__content">
                    <form className="nhsuk-form">
                      <fieldset className="nhsuk-fieldset">
                        <legend className="nhsuk-fieldset__legend nhsuk-fieldset__legend--m">
                          Email Notifications
                        </legend>
                        <div className="nhsuk-checkboxes">
                          <Checkbox
                            id="emailAppointments"
                            label="Appointment confirmations and reminders"
                            checked={notifications.emailAppointments}
                            onChange={(e) =>
                              setNotifications({ ...notifications, emailAppointments: e.target.checked })
                            }
                            description="Receive email notifications for upcoming appointments"
                          />
                          <Checkbox
                            id="systemUpdates"
                            label="System updates and maintenance"
                            checked={notifications.systemUpdates}
                            onChange={(e) => setNotifications({ ...notifications, systemUpdates: e.target.checked })}
                            description="Important system announcements and scheduled maintenance"
                          />
                          <Checkbox
                            id="healthAlerts"
                            label="Health alerts and recommendations"
                            checked={notifications.healthAlerts}
                            onChange={(e) => setNotifications({ ...notifications, healthAlerts: e.target.checked })}
                            description="Health-related notifications and wellness reminders"
                          />
                        </div>
                      </fieldset>

                      <fieldset className="nhsuk-fieldset nhsuk-u-margin-top-6">
                        <legend className="nhsuk-fieldset__legend nhsuk-fieldset__legend--m">SMS Notifications</legend>
                        <div className="nhsuk-checkboxes">
                          <Checkbox
                            id="smsReminders"
                            label="SMS appointment reminders"
                            checked={notifications.smsReminders}
                            onChange={(e) => setNotifications({ ...notifications, smsReminders: e.target.checked })}
                            description="Text message reminders 24 hours before appointments"
                          />
                        </div>
                      </fieldset>

                      <Button type="submit" className="nhsuk-button nhsuk-u-margin-top-4">
                        Save Notification Preferences
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="accessibility" id="accessibility-panel" role="tabpanel">
                <Card className="nhsuk-card">
                  <CardHeader className="nhsuk-card__header">
                    <CardTitle className="nhsuk-card__heading nhsuk-heading-m">Accessibility Settings</CardTitle>
                    <CardDescription className="nhsuk-body-s">
                      Customize the interface to meet your accessibility needs
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="nhsuk-card__content">
                    <form className="nhsuk-form">
                      <fieldset className="nhsuk-fieldset">
                        <legend className="nhsuk-fieldset__legend nhsuk-fieldset__legend--m">
                          Visual Accessibility
                        </legend>
                        <div className="nhsuk-checkboxes">
                          <Checkbox
                            id="highContrast"
                            label="High contrast mode"
                            checked={accessibility.highContrast}
                            onChange={(e) => setAccessibility({ ...accessibility, highContrast: e.target.checked })}
                            description="Increase color contrast for better visibility"
                          />
                          <Checkbox
                            id="largeText"
                            label="Large text size"
                            checked={accessibility.largeText}
                            onChange={(e) => setAccessibility({ ...accessibility, largeText: e.target.checked })}
                            description="Increase text size throughout the application"
                          />
                        </div>
                      </fieldset>

                      <fieldset className="nhsuk-fieldset nhsuk-u-margin-top-6">
                        <legend className="nhsuk-fieldset__legend nhsuk-fieldset__legend--m">
                          Navigation Accessibility
                        </legend>
                        <div className="nhsuk-checkboxes">
                          <Checkbox
                            id="screenReader"
                            label="Screen reader optimizations"
                            checked={accessibility.screenReader}
                            onChange={(e) => setAccessibility({ ...accessibility, screenReader: e.target.checked })}
                            description="Enhanced support for screen reading software"
                          />
                          <Checkbox
                            id="keyboardNavigation"
                            label="Enhanced keyboard navigation"
                            checked={accessibility.keyboardNavigation}
                            onChange={(e) =>
                              setAccessibility({ ...accessibility, keyboardNavigation: e.target.checked })
                            }
                            description="Improved keyboard shortcuts and focus indicators"
                          />
                        </div>
                      </fieldset>

                      <Button type="submit" className="nhsuk-button nhsuk-u-margin-top-4">
                        Save Accessibility Settings
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" id="security-panel" role="tabpanel">
                <Card className="nhsuk-card">
                  <CardHeader className="nhsuk-card__header">
                    <CardTitle className="nhsuk-card__heading nhsuk-heading-m">Security Settings</CardTitle>
                    <CardDescription className="nhsuk-body-s">
                      Manage your account security and privacy settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="nhsuk-card__content">
                    <div className="nhsuk-summary-list">
                      <div className="nhsuk-summary-list__row">
                        <dt className="nhsuk-summary-list__key">Password</dt>
                        <dd className="nhsuk-summary-list__value">
                          <Badge variant="secondary">Last changed 30 days ago</Badge>
                        </dd>
                        <dd className="nhsuk-summary-list__actions">
                          <Button variant="link" className="nhsuk-link">
                            Change password
                          </Button>
                        </dd>
                      </div>
                      <div className="nhsuk-summary-list__row">
                        <dt className="nhsuk-summary-list__key">Two-factor authentication</dt>
                        <dd className="nhsuk-summary-list__value">
                          <Badge variant="outline">Not enabled</Badge>
                        </dd>
                        <dd className="nhsuk-summary-list__actions">
                          <Button variant="link" className="nhsuk-link">
                            Enable 2FA
                          </Button>
                        </dd>
                      </div>
                      <div className="nhsuk-summary-list__row">
                        <dt className="nhsuk-summary-list__key">Login sessions</dt>
                        <dd className="nhsuk-summary-list__value">2 active sessions</dd>
                        <dd className="nhsuk-summary-list__actions">
                          <Button variant="link" className="nhsuk-link">
                            Manage sessions
                          </Button>
                        </dd>
                      </div>
                    </div>

                    <Separator className="nhsuk-u-margin-top-6 nhsuk-u-margin-bottom-6" />

                    <div className="nhsuk-warning-callout">
                      <h3 className="nhsuk-warning-callout__label">
                        <span role="text">
                          <span className="nhsuk-u-visually-hidden">Important: </span>
                          Data Protection
                        </span>
                      </h3>
                      <p>
                        Your personal health information is protected under NHS data protection policies. You can
                        request a copy of your data or ask for it to be deleted at any time.
                      </p>
                      <Button variant="link" className="nhsuk-link">
                        View privacy policy
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
