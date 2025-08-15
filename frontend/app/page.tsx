"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/state/auth-store"

export default function HomePage() {
  const router = useRouter()
  const { user, isAuthenticated, hydrate } = useAuthStore()
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    hydrate()
    setIsHydrated(true)
  }, [hydrate])

  useEffect(() => {
    if (!isHydrated) return

    // Add a small delay to ensure hydration is complete
    const timer = setTimeout(() => {
      if (isAuthenticated && user) {
        // Redirect to appropriate dashboard based on role
        switch (user.role) {
          case "employee":
            router.push("/employee/dashboard")
            break
          case "oh_professional":
            router.push("/oh/dashboard")
            break
          case "manager":
            router.push("/manager/dashboard")
            break
          case "admin":
            router.push("/admin/dashboard")
            break
          default:
            router.push("/login")
        }
      } else {
        router.push("/login")
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [isAuthenticated, user, router, isHydrated])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
          <span className="text-white font-bold text-xl">NHS</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">OH eHR System</h1>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}
