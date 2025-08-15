"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface KeyboardNavigationProps {
  children: React.ReactNode
  onEscape?: () => void
  trapFocus?: boolean
  autoFocus?: boolean
  className?: string
}

export function KeyboardNavigation({ 
  children, 
  onEscape, 
  trapFocus = false,
  autoFocus = false,
  className 
}: KeyboardNavigationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [focusableElements, setFocusableElements] = useState<HTMLElement[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])'
    ].join(', ')

    const elements = Array.from(
      containerRef.current.querySelectorAll(focusableSelectors)
    ) as HTMLElement[]

    setFocusableElements(elements)

    if (autoFocus && elements.length > 0) {
      elements[0].focus()
    }
  }, [autoFocus])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onEscape) {
        onEscape()
        return
      }

      if (trapFocus && e.key === 'Tab' && focusableElements.length > 0) {
        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]
        const activeElement = document.activeElement as HTMLElement

        if (e.shiftKey) {
          if (activeElement === firstElement) {
            e.preventDefault()
            lastElement.focus()
          }
        } else {
          if (activeElement === lastElement) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    if (trapFocus || onEscape) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [trapFocus, onEscape, focusableElements])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}

interface SkipLinkProps {
  href: string
  children: React.ReactNode
}

export function SkipLink({ href, children }: SkipLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4",
        "bg-primary text-primary-foreground px-4 py-2 rounded-md",
        "z-50 transition-all duration-200"
      )}
    >
      {children}
    </a>
  )
}

interface FocusIndicatorProps {
  children: React.ReactNode
  className?: string
}

export function FocusIndicator({ children, className }: FocusIndicatorProps) {
  return (
    <div 
      className={cn(
        "focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2",
        "transition-all duration-200 rounded-md",
        className
      )}
    >
      {children}
    </div>
  )
}

// Custom hook for keyboard shortcuts
export function useKeyboardShortcuts(shortcuts: Record<string, () => void>) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      const combo = [
        e.ctrlKey && 'ctrl',
        e.shiftKey && 'shift',
        e.altKey && 'alt',
        e.metaKey && 'meta',
        key
      ].filter(Boolean).join('+')

      if (shortcuts[combo]) {
        e.preventDefault()
        shortcuts[combo]()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [shortcuts])
}

// Announce changes for screen readers
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
  const announcement = document.createElement('div')
  announcement.setAttribute('aria-live', priority)
  announcement.setAttribute('aria-atomic', 'true')
  announcement.className = 'sr-only'
  announcement.textContent = message

  document.body.appendChild(announcement)

  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

// Hook for managing focus restoration
export function useFocusRestore() {
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const saveFocus = () => {
    previousFocusRef.current = document.activeElement as HTMLElement
  }

  const restoreFocus = () => {
    if (previousFocusRef.current) {
      previousFocusRef.current.focus()
    }
  }

  return { saveFocus, restoreFocus }
}