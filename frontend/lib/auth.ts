import { mockUsers, type User } from "./mock-data"

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

export const authenticate = async (email: string, password: string, role: string): Promise<User | null> => {
  // Mock authentication - in real app, this would call an API
  await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay

  const user = mockUsers.find((u) => u.email === email && u.role === role)
  if (user && password === "password") {
    // Mock password check
    return user
  }
  return null
}

export const getDefaultRoute = (role: string): string => {
  switch (role) {
    case "employee":
      return "/employee/dashboard"
    case "oh_professional":
      return "/oh/dashboard"
    case "manager":
      return "/manager/dashboard"
    case "admin":
      return "/admin/dashboard"
    default:
      return "/login"
  }
}
