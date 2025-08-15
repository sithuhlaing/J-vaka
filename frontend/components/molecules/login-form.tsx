"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/atoms/input"
import { Select } from "@/components/atoms/select"
import { Checkbox } from "@/components/atoms/checkbox"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/lib/state/auth-store"

export function LoginForm() {
  const router = useRouter()
  const { login, loading, error } = useAuthStore()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
    remember: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  // Fixed to use simple string array as expected by Select component
  const roleOptions = ["employee", "oh_professional", "manager", "admin"]

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "email":
        if (!value) return "Email is required"
        if (!/\S+@\S+\.\S+/.test(value)) return "Please enter a valid email"
        return ""
      case "password":
        if (!value) return "Password is required"
        if (value.length < 6) return "Password must be at least 6 characters"
        return ""
      case "role":
        if (!value) return "Please select your role"
        return ""
      default:
        return ""
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const error = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Real-time validation for touched fields
    if (touched[name]) {
      const error = validateField(name, value)
      setErrors((prev) => ({ ...prev, [name]: error }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields
    const newErrors: Record<string, string> = {}
    Object.keys(formData).forEach((key) => {
      if (key !== "remember") {
        const error = validateField(key, formData[key as keyof typeof formData] as string)
        if (error) newErrors[key] = error
      }
    })

    setErrors(newErrors)
    setTouched({ email: true, password: true, role: true })

    if (Object.keys(newErrors).length === 0) {
      setErrors({})

      await login({
        email: formData.email,
        password: formData.password,
        role: formData.role,
      })

      if (!error) {
        const redirectMap = {
          employee: "/employee/dashboard",
          oh_professional: "/oh/dashboard",
          manager: "/manager/dashboard",
          admin: "/admin/dashboard",
        }
        router.push(redirectMap[formData.role as keyof typeof redirectMap] || "/employee/dashboard")
      }
    } else {
      // Focus first error field
      const firstErrorField = Object.keys(newErrors)[0]
      const element = document.getElementById(firstErrorField)
      element?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e as any)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <img src="/generic-healthcare-logo.png" alt="NHS Logo" className="h-10 w-30" />
        </div>
        <h1 className="text-2xl font-bold">OH eHR System</h1>
      </div>

      {error && (
        <div className="p-3 rounded-md bg-red-50 border border-red-200" role="alert">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Input
          name="email"
          type="email"
          label="NHS Email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          error={touched.email ? errors.email : ""}
          required
          validation="email"
          accessibility={{
            "aria-label": "Enter your NHS email address",
            "aria-describedby": errors.email ? "email-error" : undefined,
          }}
        />

        <Input
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          error={touched.password ? errors.password : ""}
          required
          validation="password"
          accessibility={{
            "aria-label": "Enter your password",
          }}
        />

        <Select
          name="role"
          label="Role"
          options={roleOptions}
          value={formData.role}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.role ? errors.role : ""}
          required
          accessibility={{
            "aria-label": "Select your role",
          }}
        />

        <Checkbox
          name="remember"
          label="Remember me"
          checked={formData.remember}
          onChange={handleChange}
          accessibility={{
            "aria-label": "Remember my login",
          }}
        />

        <Button type="submit" className="w-full" disabled={loading} aria-label="Sign in to OH eHR system">
          {loading ? "Signing In..." : "Sign In"}
        </Button>

        <div className="text-center">
          <a
            href="/forgot-password"
            className="text-sm text-blue-600 hover:underline"
            aria-label="Recover your password"
          >
            Forgot password?
          </a>
        </div>
      </form>
    </div>
  )
}
