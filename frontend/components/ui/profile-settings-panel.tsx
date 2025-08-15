"use client"

import React, { useEffect } from "react"
import { X, User, Bell, Shield, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/atoms/input"
import { Select } from "@/components/atoms/select"
import { Checkbox } from "@/components/atoms/checkbox"
import type { User as UserType } from "@/lib/mock-data"

interface ProfileSettingsPanelProps {
  isOpen: boolean
  onClose: () => void
  user: UserType | null
}

export function ProfileSettingsPanel({ isOpen, onClose, user }: ProfileSettingsPanelProps) {
  const [formData, setFormData] = React.useState({
    firstName: user?.first_name || "",
    lastName: user?.last_name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    department: user?.department || "",
    preferredLanguage: "en",
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    systemUpdates: false,
    highContrast: false,
    largeText: false,
    screenReader: false,
  })

  // Close panel on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  // Prevent body scroll when panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handleSave = () => {
    // Save logic here
    console.log("Saving profile settings:", formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-settings-title"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 id="profile-settings-title" className="text-xl font-semibold text-gray-900 dark:text-white">
              Profile Settings
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
              aria-label="Close profile settings"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Personal Information */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-nhs-blue" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Personal Information</h3>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
            </section>

            {/* Notification Preferences */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Bell className="h-5 w-5 text-nhs-blue" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Notification Preferences</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="emailNotifications"
                    checked={formData.emailNotifications}
                    onChange={(e) => setFormData({ ...formData, emailNotifications: e.target.checked })}
                  />
                  <label htmlFor="emailNotifications" className="text-sm text-gray-700 dark:text-gray-300">
                    Email notifications
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="appointmentReminders"
                    checked={formData.appointmentReminders}
                    onChange={(e) => setFormData({ ...formData, appointmentReminders: e.target.checked })}
                  />
                  <label htmlFor="appointmentReminders" className="text-sm text-gray-700 dark:text-gray-300">
                    Appointment reminders
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="systemUpdates"
                    checked={formData.systemUpdates}
                    onChange={(e) => setFormData({ ...formData, systemUpdates: e.target.checked })}
                  />
                  <label htmlFor="systemUpdates" className="text-sm text-gray-700 dark:text-gray-300">
                    System updates
                  </label>
                </div>
              </div>
            </section>

            {/* Language Preferences */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Globe className="h-5 w-5 text-nhs-blue" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Language & Region</h3>
              </div>
              <div>
                <label
                  htmlFor="preferredLanguage"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Preferred Language
                </label>
                <Select
                  id="preferredLanguage"
                  value={formData.preferredLanguage}
                  onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
                  options={["en", "cy", "gd"]}
                />
              </div>
            </section>

            {/* Accessibility Settings */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5 text-nhs-blue" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Accessibility</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="highContrast"
                    checked={formData.highContrast}
                    onChange={(e) => setFormData({ ...formData, highContrast: e.target.checked })}
                  />
                  <label htmlFor="highContrast" className="text-sm text-gray-700 dark:text-gray-300">
                    High contrast mode
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="largeText"
                    checked={formData.largeText}
                    onChange={(e) => setFormData({ ...formData, largeText: e.target.checked })}
                  />
                  <label htmlFor="largeText" className="text-sm text-gray-700 dark:text-gray-300">
                    Large text
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="screenReader"
                    checked={formData.screenReader}
                    onChange={(e) => setFormData({ ...formData, screenReader: e.target.checked })}
                  />
                  <label htmlFor="screenReader" className="text-sm text-gray-700 dark:text-gray-300">
                    Screen reader optimizations
                  </label>
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="flex gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
            <Button onClick={handleSave} className="flex-1">
              Save Changes
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
