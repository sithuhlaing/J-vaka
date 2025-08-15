"use client"

import { useState, useEffect } from "react"
import { CheckCircle, AlertCircle, XCircle, Info, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ToastProps {
  id: string
  type: "success" | "error" | "warning" | "info"
  title: string
  description?: string
  duration?: number
  persistent?: boolean
  onDismiss?: (id: string) => void
}

const toastIcons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info
}

const toastStyles = {
  success: "bg-green-50 border-green-200 text-green-800",
  error: "bg-red-50 border-red-200 text-red-800",
  warning: "bg-orange-50 border-orange-200 text-orange-800",
  info: "bg-blue-50 border-blue-200 text-blue-800"
}

export function Toast({ 
  id, 
  type, 
  title, 
  description, 
  duration = 5000, 
  persistent = false,
  onDismiss 
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isExiting, setIsExiting] = useState(false)
  
  const Icon = toastIcons[type]

  useEffect(() => {
    if (!persistent && duration > 0) {
      const timer = setTimeout(() => {
        handleDismiss()
      }, duration)
      
      return () => clearTimeout(timer)
    }
  }, [duration, persistent])

  const handleDismiss = () => {
    setIsExiting(true)
    setTimeout(() => {
      setIsVisible(false)
      onDismiss?.(id)
    }, 300)
  }

  if (!isVisible) return null

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 border rounded-lg shadow-lg transition-all duration-300 max-w-md",
        toastStyles[type],
        isExiting && "translate-x-full opacity-0"
      )}
      role="alert"
      aria-live="polite"
    >
      <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
      
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm">{title}</h4>
        {description && (
          <p className="text-sm mt-1 opacity-90">{description}</p>
        )}
      </div>
      
      <button
        onClick={handleDismiss}
        className="flex-shrink-0 p-1 hover:bg-black/10 rounded-md transition-colors"
        aria-label="Dismiss notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

interface ToastContainerProps {
  toasts: ToastProps[]
  onDismiss: (id: string) => void
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div 
      className="fixed top-4 right-4 z-50 flex flex-col gap-2"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onDismiss={onDismiss} />
      ))}
    </div>
  )
}

// Toast hook for managing toasts
export function useToasts() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const addToast = (toast: Omit<ToastProps, "id">) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts(prev => [...prev, { ...toast, id }])
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const showSuccess = (title: string, description?: string) => {
    addToast({ type: "success", title, description })
  }

  const showError = (title: string, description?: string) => {
    addToast({ type: "error", title, description, persistent: true })
  }

  const showWarning = (title: string, description?: string) => {
    addToast({ type: "warning", title, description })
  }

  const showInfo = (title: string, description?: string) => {
    addToast({ type: "info", title, description })
  }

  return {
    toasts,
    addToast,
    removeToast,
    showSuccess,
    showError,
    showWarning,
    showInfo
  }
}