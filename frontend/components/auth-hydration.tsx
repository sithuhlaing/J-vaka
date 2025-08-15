"use client"

import { useEffect } from 'react'
import { useAuthStore } from '@/lib/state/auth-store'

export function AuthHydration() {
  const hydrate = useAuthStore((state) => state.hydrate)

  useEffect(() => {
    hydrate()
  }, [hydrate])

  return null
}