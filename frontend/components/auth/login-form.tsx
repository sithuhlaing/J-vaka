"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { authenticate, getDefaultRoute } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const user = await authenticate(email, password, role)
      if (user) {
        // Store user in localStorage (in real app, use secure session management)
        localStorage.setItem("user", JSON.stringify(user))
        toast({
          title: "Login successful",
          description: `Welcome back, ${user.first_name}!`,
        })
        router.push(getDefaultRoute(user.role))
      } else {
        setError("Invalid credentials or role selection")
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="w-24 h-12 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-lg">NHS</span>
          </div>
        </div>
        <CardTitle className="text-2xl font-bold">OH eHR System</CardTitle>
        <CardDescription>Sign in to access your Occupational Health records</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">NHS Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.name@nhs.uk"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              aria-describedby="email-error"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={role} onValueChange={setRole} required>
              <SelectTrigger aria-label="Select your role">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="employee">Employee</SelectItem>
                <SelectItem value="oh_professional">OH Professional</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="admin">Administrator</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={isLoading} aria-label="Sign in to OH eHR system">
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>

          <div className="text-center space-y-2 text-sm">
            <p className="text-muted-foreground">Demo credentials:</p>
            <p>Employee: john.doe@nhs.uk / password</p>
            <p>OH Professional: dr.smith@nhs.uk / password</p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
