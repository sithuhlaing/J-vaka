"use client"

import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl"
  color?: "primary" | "secondary" | "white"
  className?: string
}

export function LoadingSpinner({ 
  size = "md", 
  color = "primary", 
  className 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6", 
    lg: "h-8 w-8",
    xl: "h-12 w-12"
  }

  const colorClasses = {
    primary: "text-primary",
    secondary: "text-muted-foreground",
    white: "text-white"
  }

  return (
    <div 
      className={cn(
        "animate-spin rounded-full border-2 border-transparent border-t-current",
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

interface LoadingStateProps {
  message?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

export function LoadingState({ 
  message = "Loading...", 
  size = "md",
  className 
}: LoadingStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8", className)}>
      <LoadingSpinner size={size} />
      <p className="mt-4 text-sm text-muted-foreground">{message}</p>
    </div>
  )
}

export function PageLoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <LoadingSpinner size="xl" />
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Loading OH eHR System</h3>
          <p className="text-muted-foreground">Please wait while we load your data...</p>
        </div>
      </div>
    </div>
  )
}