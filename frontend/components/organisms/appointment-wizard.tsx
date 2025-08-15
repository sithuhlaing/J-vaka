"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { EnhancedInput, EnhancedTextarea } from "@/components/ui/enhanced-form"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { KeyboardNavigation, announceToScreenReader } from "@/components/ui/keyboard-navigation"
import { Calendar, Clock, Video, MapPin, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface AppointmentData {
  type: string
  date: string
  time: string
  mode: string
  reason: string
  preferences: {
    reminder_preference?: string
    special_requirements?: string
  }
}

interface AppointmentWizardProps {
  onComplete: (appointmentData: AppointmentData) => void
  onCancel: () => void
}

export function AppointmentWizard({ onComplete, onCancel }: AppointmentWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<AppointmentData>({
    type: "",
    date: "",
    time: "",
    mode: "",
    reason: "",
    preferences: {}
  })

  const steps = [
    { number: 1, title: "Appointment Type", description: "Select the type of appointment" },
    { number: 2, title: "Date & Time", description: "Choose your preferred date and time" },
    { number: 3, title: "Details & Preferences", description: "Add appointment details and preferences" },
    { number: 4, title: "Confirmation", description: "Review and confirm your appointment" }
  ]

  const appointmentTypes = [
    { 
      id: "health_check", 
      label: "Health Check", 
      description: "Annual or periodic health assessment",
      duration: "30 minutes"
    },
    { 
      id: "consultation", 
      label: "Consultation", 
      description: "Discuss health concerns or symptoms",
      duration: "20 minutes"
    },
    { 
      id: "follow_up", 
      label: "Follow-up", 
      description: "Follow-up on previous appointment",
      duration: "15 minutes"
    },
    { 
      id: "return_to_work", 
      label: "Return to Work", 
      description: "Assessment after illness or injury",
      duration: "45 minutes"
    },
    { 
      id: "pre_employment", 
      label: "Pre-Employment", 
      description: "Health assessment for new role",
      duration: "60 minutes"
    },
    { 
      id: "emergency", 
      label: "Emergency", 
      description: "Urgent health assessment",
      duration: "30 minutes"
    }
  ]

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", 
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
  ]

  const modes = [
    { id: "in_person", label: "In Person", icon: MapPin, description: "Visit our clinic" },
    { id: "video", label: "Video Call", icon: Video, description: "Online consultation" }
  ]

  const handleNext = async () => {
    if (currentStep < 4) {
      const nextStep = currentStep + 1
      setCurrentStep(nextStep)
      announceToScreenReader(`Moved to step ${nextStep}: ${steps[nextStep - 1].title}`)
    } else {
      setIsLoading(true)
      announceToScreenReader("Booking your appointment, please wait...")
      try {
        // Simulate appointment booking process
        await new Promise(resolve => setTimeout(resolve, 2000))
        announceToScreenReader("Appointment booked successfully!")
        onComplete(formData)
      } catch (error) {
        announceToScreenReader("Failed to book appointment. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1
      setCurrentStep(prevStep)
      announceToScreenReader(`Moved back to step ${prevStep}: ${steps[prevStep - 1].title}`)
    }
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'n' && isStepValid() && !isLoading) {
        e.preventDefault()
        handleNext()
      } else if (e.altKey && e.key === 'b' && currentStep > 1 && !isLoading) {
        e.preventDefault()
        handleBack()
      } else if (e.key === 'Escape' && !isLoading) {
        e.preventDefault()
        onCancel()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [currentStep, isLoading, formData])

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div 
            className={cn(
              "flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-200",
              currentStep > step.number 
                ? "bg-green-600 border-green-600 text-white" 
                : currentStep === step.number
                ? "bg-primary border-primary text-primary-foreground"
                : "border-muted-foreground text-muted-foreground"
            )}
          >
            {currentStep > step.number ? (
              <CheckCircle className="h-6 w-6" />
            ) : (
              step.number
            )}
          </div>
          {index < steps.length - 1 && (
            <div className={cn(
              "h-0.5 w-16 mx-4 transition-all duration-200",
              currentStep > step.number ? "bg-green-600" : "bg-muted"
            )} />
          )}
        </div>
      ))}
    </div>
  )

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Select Appointment Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {appointmentTypes.map((type) => (
                <Card 
                  key={type.id}
                  className={`cursor-pointer transition-all ${
                    formData.type === type.id ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/50"
                  }`}
                  onClick={() => setFormData({ ...formData, type: type.id })}
                >
                  <CardContent className="p-4">
                    <h4 className="font-medium">{type.label}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Choose Date & Time</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Select Date
                </h4>
                <div className="grid grid-cols-7 gap-2 text-center">
                  {["Dec 16", "Dec 17", "Dec 18", "Dec 19", "Dec 20", "Dec 23", "Dec 24"].map((date) => (
                    <Button
                      key={date}
                      variant={formData.date === date ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFormData({ ...formData, date })}
                      className="h-12"
                    >
                      {date}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Available Times
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={formData.time === time ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFormData({ ...formData, time })}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Appointment Details & Preferences</h3>
            
            {/* Mode Selection */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Select Appointment Mode</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {modes.map((mode) => {
                  const Icon = mode.icon
                  return (
                    <Card 
                      key={mode.id}
                      className={cn(
                        "cursor-pointer transition-all",
                        formData.mode === mode.id 
                          ? "ring-2 ring-primary bg-primary/5" 
                          : "hover:bg-muted/50"
                      )}
                      onClick={() => setFormData({ ...formData, mode: mode.id })}
                    >
                      <CardContent className="p-4 flex items-center space-x-3">
                        <Icon className="h-5 w-5 text-primary" />
                        <div>
                          <h4 className="font-medium">{mode.label}</h4>
                          <p className="text-sm text-muted-foreground">{mode.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Reason for Appointment */}
            <EnhancedTextarea
              id="reason"
              label="Reason for Appointment"
              placeholder="Please describe the reason for your appointment..."
              value={formData.reason}
              onChange={(value) => setFormData({ ...formData, reason: value })}
              validation={{
                required: true,
                minLength: 10,
                maxLength: 500
              }}
              required
              helpText="Please provide a clear description of why you need this appointment"
              rows={4}
            />

            {/* Special Requirements */}
            <EnhancedInput
              id="requirements"
              label="Special Requirements"
              placeholder="e.g., wheelchair access, interpreter needed"
              value={formData.preferences.special_requirements || ""}
              onChange={(value) => setFormData({ 
                ...formData, 
                preferences: { 
                  ...formData.preferences, 
                  special_requirements: value 
                }
              })}
              helpText="Let us know if you need any special accommodations"
            />

            {/* Reminder Preference */}
            <div className="space-y-2">
              <Label>Reminder Preference</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {["24_hours", "12_hours", "2_hours"].map((pref) => (
                  <Button
                    key={pref}
                    type="button"
                    variant={formData.preferences.reminder_preference === pref ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFormData({ 
                      ...formData, 
                      preferences: { 
                        ...formData.preferences, 
                        reminder_preference: pref 
                      }
                    })}
                  >
                    {pref.replace("_", " ")} before
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )

      case 4:
        const selectedType = appointmentTypes.find(t => t.id === formData.type)
        const selectedMode = modes.find(m => m.id === formData.mode)
        
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Review Your Appointment</h3>
              <p className="text-muted-foreground">Please review all details before confirming</p>
            </div>
            
            <Card className="border-2">
              <CardHeader className="bg-muted/30">
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Appointment Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Appointment Type</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary">{selectedType?.label}</Badge>
                        <span className="text-sm text-muted-foreground">({selectedType?.duration})</span>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Date & Time</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="h-4 w-4" />
                        <span className="font-medium">{formData.date}</span>
                        <Clock className="h-4 w-4 ml-2" />
                        <span className="font-medium">{formData.time}</span>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Mode</Label>
                      <div className="flex items-center gap-2 mt-1">
                        {selectedMode?.id === "video" ? (
                          <Video className="h-4 w-4 text-blue-600" />
                        ) : (
                          <MapPin className="h-4 w-4 text-green-600" />
                        )}
                        <span className="font-medium">{selectedMode?.label}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Reason</Label>
                      <p className="mt-1 text-sm">{formData.reason || "Not specified"}</p>
                    </div>
                    
                    {formData.preferences.special_requirements && (
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Special Requirements</Label>
                        <p className="mt-1 text-sm">{formData.preferences.special_requirements}</p>
                      </div>
                    )}
                    
                    {formData.preferences.reminder_preference && (
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Reminder</Label>
                        <p className="mt-1 text-sm">
                          {formData.preferences.reminder_preference.replace("_", " ")} before appointment
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Important Information</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Please arrive 10 minutes early for in-person appointments</li>
                      <li>• Bring a valid form of ID and your employee badge</li>
                      <li>• You will receive a confirmation email shortly</li>
                      {selectedMode?.id === "video" && (
                        <li>• You will receive video call instructions via email</li>
                      )}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return formData.type !== ""
      case 2: return formData.date !== "" && formData.time !== ""
      case 3: return formData.mode !== "" && formData.reason.trim() !== ""
      case 4: return true
      default: return false
    }
  }

  return (
    <KeyboardNavigation 
      onEscape={onCancel}
      autoFocus
      className="max-w-4xl mx-auto p-6"
    >
      {renderStepIndicator()}
      
      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep - 1].title}</CardTitle>
          <p className="text-muted-foreground">{steps[currentStep - 1].description}</p>
          
          {/* Keyboard shortcuts help */}
          <div className="text-xs text-muted-foreground mt-2">
            <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Alt+N</kbd> Next • 
            <kbd className="px-1 py-0.5 bg-muted rounded text-xs ml-1">Alt+B</kbd> Back • 
            <kbd className="px-1 py-0.5 bg-muted rounded text-xs ml-1">Esc</kbd> Cancel
          </div>
        </CardHeader>
        <CardContent>
          {renderStep()}
          
          <div className="flex justify-between items-center mt-8 pt-6 border-t">
            <Button 
              variant="outline" 
              onClick={currentStep === 1 ? onCancel : handleBack}
              disabled={isLoading}
              className="flex items-center gap-2"
              aria-label={currentStep === 1 ? "Cancel appointment booking" : "Go back to previous step"}
            >
              {currentStep === 1 ? (
                "Cancel"
              ) : (
                <>
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </>
              )}
            </Button>
            
            <div className="text-sm text-muted-foreground">
              Step {currentStep} of {steps.length}
            </div>
            
            <Button 
              onClick={handleNext}
              disabled={!isStepValid() || isLoading}
              className="flex items-center gap-2"
              aria-label={currentStep === 4 ? "Confirm and book appointment" : "Continue to next step"}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" color="white" />
                  Booking...
                </>
              ) : currentStep === 4 ? (
                "Confirm Appointment"
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </KeyboardNavigation>
  )
}