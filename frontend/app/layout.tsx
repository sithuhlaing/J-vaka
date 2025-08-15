import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import { ThemeProvider } from "next-themes"
import { UXProvider } from "@/components/providers/ux-provider"
import { AuthHydration } from "@/components/auth-hydration"
import { Toaster } from "react-hot-toast"

export const metadata: Metadata = {
  title: "Occupational Health",
  description: "Created with Next.js and Geist UI",
  generator: "occupational-health",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
            <UXProvider>
              <AuthHydration>
                {children}
                <Toaster />
              </AuthHydration>
            </UXProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
