"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { mockUsers } from "./mock-data"

interface User {
  id: string
  email: string
  name: string
  role: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  role: string | null
  permissions: string[]
  loading: boolean
  error: string | null
  login: (credentials: { email: string; password: string; role: string }) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const validateCredentials = (email: string, password: string, role: string) => {
  const user = mockUsers.find((u) => u.email === email && u.role === role)
  if (user && password === "password123") {
    return user
  }
  return null
}

const getPermissions = (role: string) => {
  switch (role) {
    case "employee":
      return ["view_own_data", "book_appointments", "upload_documents", "video_calls", "messaging"]
    case "oh_professional":
      return ["view_all_data", "manage_appointments", "access_documents", "video_calls", "messaging", "manage_patients"]
    case "manager":
      return ["view_team_data", "manage_appointments", "access_reports", "messaging", "team_management"]
    case "admin":
      return ["full_access", "user_management", "system_settings", "audit_logs", "all_reports"]
    default:
      return []
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [role, setRole] = useState<string | null>(null)
  const [permissions, setPermissions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const userData = localStorage.getItem("user")
      const authState = localStorage.getItem("authState")

      if (userData && authState) {
        const user = JSON.parse(userData)
        const auth = JSON.parse(authState)

        setUser(user)
        setIsAuthenticated(auth.isAuthenticated)
        setRole(auth.role)
        setPermissions(getPermissions(auth.role))
      }
    } catch (error) {
      console.error("Failed to hydrate auth state:", error)
    }
  }, [])

  const login = async (credentials: { email: string; password: string; role: string }) => {
    setLoading(true)
    setError(null)
    setUser(null)
    setIsAuthenticated(false)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const validUser = validateCredentials(credentials.email, credentials.password, credentials.role)

      if (!validUser) {
        setError("Invalid credentials")
        setLoading(false)
        return
      }

      const userPermissions = getPermissions(credentials.role)

      // Store in localStorage for persistence
      localStorage.setItem("user", JSON.stringify(validUser))
      localStorage.setItem(
        "authState",
        JSON.stringify({
          isAuthenticated: true,
          role: credentials.role,
          token: "mock-token",
        }),
      )

      setUser(validUser)
      setIsAuthenticated(true)
      setRole(credentials.role)
      setPermissions(userPermissions)
      setLoading(false)
      setError(null)
    } catch (error) {
      setError("Authentication failed")
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("authState")

    setUser(null)
    setIsAuthenticated(false)
    setRole(null)
    setPermissions([])
    setLoading(false)
    setError(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        role,
        permissions,
        loading,
        error,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider")
  }
  return context
}
