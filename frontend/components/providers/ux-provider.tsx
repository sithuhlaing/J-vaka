"use client"

import { createContext, useContext, ReactNode } from "react"
import { useToasts, ToastContainer } from "@/components/ui/enhanced-toast"
import { LoadingState, PageLoadingState } from "@/components/ui/loading-spinner"

interface UXContextType {
  showSuccess: (title: string, description?: string) => void
  showError: (title: string, description?: string) => void
  showWarning: (title: string, description?: string) => void
  showInfo: (title: string, description?: string) => void
}

const UXContext = createContext<UXContextType | undefined>(undefined)

interface UXProviderProps {
  children: ReactNode
}

export function UXProvider({ children }: UXProviderProps) {
  const { toasts, removeToast, showSuccess, showError, showWarning, showInfo } = useToasts()

  const contextValue: UXContextType = {
    showSuccess,
    showError,
    showWarning,
    showInfo
  }

  return (
    <UXContext.Provider value={contextValue}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </UXContext.Provider>
  )
}

export function useUX() {
  const context = useContext(UXContext)
  if (context === undefined) {
    throw new Error('useUX must be used within a UXProvider')
  }
  return context
}