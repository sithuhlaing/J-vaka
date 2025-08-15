"use client"

import { useEffect, useState } from "react"
import { useAuthStore } from "@/lib/state/auth-store"

export function AuthHydration({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false)
  const hydrateStore = useAuthStore((state) => state.hydrate)

  useEffect(() => {
    hydrateStore()
    setHydrated(true)
  }, [hydrateStore])

  return hydrated ? <>{children}</> : null
}