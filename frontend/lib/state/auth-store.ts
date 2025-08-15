import { create } from "zustand"
import { mockUsers } from "../mock-data"

interface AuthState {
  user: any | null
  isAuthenticated: boolean
  token: string | null
  refreshToken: string | null
  role: string | null
  permissions: string[]
  loading: boolean
  error: string | null
}

interface AuthActions {
  login: (credentials: { email: string; password: string; role: string }) => Promise<void>
  logout: () => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  hydrate: () => void
}

const validateCredentials = (email: string, password: string, role: string) => {
  // Find user by email and role
  const user = mockUsers.find((u) => u.email === email && u.role === role)

  // For demo purposes, accept "password123" for all users
  if (user && password === "password123") {
    return user
  }

  return null
}

export const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
  // State
  user: null,
  isAuthenticated: false,
  token: null,
  refreshToken: null,
  role: null,
  permissions: [],
  loading: false,
  error: null,

  // Actions
  login: async (credentials) => {
    set({ loading: true, error: null, user: null, isAuthenticated: false })

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay

      const validUser = validateCredentials(credentials.email, credentials.password, credentials.role)

      if (!validUser) {
        set({ error: "Invalid credentials", loading: false })
        return
      }

      const getPermissions = (role: string) => {
        switch (role) {
          case "employee":
            return ["view_own_data", "book_appointments", "upload_documents", "video_calls", "messaging"]
          case "oh_professional":
            return [
              "view_all_data",
              "manage_appointments",
              "access_documents",
              "video_calls",
              "messaging",
              "manage_patients",
            ]
          case "manager":
            return ["view_team_data", "manage_appointments", "access_reports", "messaging", "team_management"]
          case "admin":
            return ["full_access", "user_management", "system_settings", "audit_logs", "all_reports"]
          default:
            return []
        }
      }

      const authData = {
        user: validUser,
        isAuthenticated: true,
        token: "mock-token",
        refreshToken: "mock-refresh-token",
        role: credentials.role,
        permissions: getPermissions(credentials.role),
        loading: false,
        error: null,
      }

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

      set(authData)
    } catch (error) {
      set({ error: "Authentication failed", loading: false })
    }
  },

  logout: () => {
    localStorage.removeItem("user")
    localStorage.removeItem("authState")

    set({
      user: null,
      isAuthenticated: false,
      token: null,
      refreshToken: null,
      role: null,
      permissions: [],
      loading: false,
      error: null,
    })
  },

  hydrate: () => {
    try {
      const userData = localStorage.getItem("user")
      const authState = localStorage.getItem("authState")

      if (userData && authState) {
        const user = JSON.parse(userData)
        const auth = JSON.parse(authState)

        const getPermissions = (role: string) => {
          switch (role) {
            case "employee":
              return ["view_own_data", "book_appointments", "upload_documents", "video_calls", "messaging"]
            case "oh_professional":
              return [
                "view_all_data",
                "manage_appointments",
                "access_documents",
                "video_calls",
                "messaging",
                "manage_patients",
              ]
            case "manager":
              return ["view_team_data", "manage_appointments", "access_reports", "messaging", "team_management"]
            case "admin":
              return ["full_access", "user_management", "system_settings", "audit_logs", "all_reports"]
            default:
              return []
          }
        }

        set({
          user,
          isAuthenticated: auth.isAuthenticated,
          token: auth.token,
          role: auth.role,
          permissions: getPermissions(auth.role),
          loading: false,
          error: null,
        })
      }
    } catch (error) {
      console.error("Failed to hydrate auth state:", error)
    }
  },

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}))
