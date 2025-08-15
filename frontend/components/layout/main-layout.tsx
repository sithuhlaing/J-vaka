"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Calendar, FileText, MessageSquare, Home, Users, BarChart3, Shield, Menu, ChevronDown } from "lucide-react"
import type { User } from "@/lib/mock-data"
import { useAuthStore } from "@/lib/state/auth-store"
import { cn } from "@/lib/utils"
import { ProfileSettingsPanel } from "@/components/ui/profile-settings-panel"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const [profilePanelOpen, setProfilePanelOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { user, logout: authLogout } = useAuthStore()

  useEffect(() => {
    const handleOpenProfilePanel = () => {
      setProfilePanelOpen(true)
    }

    window.addEventListener("openProfilePanel", handleOpenProfilePanel)
    return () => window.removeEventListener("openProfilePanel", handleOpenProfilePanel)
  }, [])

  const handleLogout = () => {
    authLogout()
    router.push("/login")
  }

  const getNavigationItems = () => {
    if (!user) return []

    const baseItems = [
      { icon: Home, label: "Dashboard", href: `/${user.role === "oh_professional" ? "oh" : user.role}/dashboard` },
      {
        icon: Calendar,
        label: "Appointments",
        href: `/${user.role === "oh_professional" ? "oh" : user.role}/appointments`,
      },
      ...(user.role !== "admin"
        ? [
            {
              icon: FileText,
              label: "Documents",
              href: `/${user.role === "oh_professional" ? "oh" : user.role}/documents`,
            },
          ]
        : []),
      {
        icon: MessageSquare,
        label: "Messages",
        href: `/${user.role === "oh_professional" ? "oh" : user.role}/messages`,
      },
    ]

    if (user.role === "manager") {
      baseItems.push({ icon: BarChart3, label: "Reports", href: "/manager/reports" })
    }

    if (user.role === "admin") {
      baseItems.push(
        { icon: Users, label: "User Management", href: "/admin/users" },
        { icon: Shield, label: "System Settings", href: "/admin/settings" },
      )
    }

    return baseItems
  }

  const navigationItems = getNavigationItems()

  // This check is important to prevent rendering the layout for a null user
  // which can happen briefly during logout or if hydration fails.
  if (!user) {
    // Render nothing or a minimal loader, as AuthHydration should handle the main loading state.
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="nhsuk-header nhsuk-header--white" role="banner">
        <div className="nhsuk-width-container nhsuk-header__container">
          <div className="nhsuk-header__logo">
            <a className="nhsuk-header__link" href="/" aria-label="NHS homepage">
              <img
                src="/generic-healthcare-logo.png"
                alt="NHS Occupational Health"
                className="nhsuk-logo"
                height="40"
                width="100"
              />
            </a>
          </div>

          <div className="nhsuk-header__content" id="content-header">
            <div className="nhsuk-header__menu">
              <button
                className="nhsuk-header__menu-toggle"
                id="toggle-menu"
                aria-controls="header-navigation"
                aria-label="Open menu"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="nhsuk-icon nhsuk-icon__menu" />
              </button>
            </div>

            <div className="nhsuk-header__search">
              <div className="nhsuk-header__search-wrap" id="wrap-search">
                <div className="nhsuk-header__organisation">
                  <span className="nhsuk-header__organisation-name">Occupational Health</span>
                  <span className="nhsuk-header__organisation-descriptor">Electronic Health Records</span>
                </div>
              </div>
            </div>

            <div className="nhsuk-header__user-menu">
              <div className="relative">
                <button
                  className="nhsuk-header__user-button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  aria-expanded={userDropdownOpen}
                  aria-haspopup="true"
                >
                  <ChevronDown className="nhsuk-icon nhsuk-icon--size-16" aria-hidden="true" />
                  <span className="nhsuk-header__user-name">{`${user.firstName} ${user.lastName}`}</span>
                </button>

                {userDropdownOpen && (
                  <>
                    <div className="nhsuk-header__user-dropdown-backdrop" onClick={() => setUserDropdownOpen(false)} />
                    <div className="nhsuk-header__user-dropdown">
                      <ul className="nhsuk-header__user-dropdown-list">
                        <li>
                          <button
                            className="nhsuk-header__user-dropdown-link"
                            onClick={() => {
                              setUserDropdownOpen(false)
                              const event = new CustomEvent("openProfilePanel")
                              window.dispatchEvent(event)
                            }}
                          >
                            Profile Settings
                          </button>
                        </li>
                        <li>
                          <button
                            className="nhsuk-header__user-dropdown-link nhsuk-header__user-dropdown-link--danger"
                            onClick={() => {
                              setUserDropdownOpen(false)
                              handleLogout()
                            }}
                          >
                            Sign Out
                          </button>
                        </li>
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <nav
          className="nhsuk-header__navigation"
          id="header-navigation"
          role="navigation"
          aria-label="Primary navigation"
        >
          <div className="nhsuk-width-container">
            <p className="nhsuk-header__navigation-title">
              <span id="label-navigation">Menu</span>
              <button
                className="nhsuk-header__navigation-close"
                id="close-menu"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg
                  className="nhsuk-icon nhsuk-icon__close"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="m15.5 12-8-8v16l8-8z"></path>
                </svg>
                <span className="nhsuk-u-visually-hidden">Close menu</span>
              </button>
            </p>
            <ul
              className={cn("nhsuk-header__navigation-list", mobileMenuOpen && "nhsuk-header__navigation-list--open")}
            >
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <li key={item.href} className="nhsuk-header__navigation-item">
                    <a
                      className={cn(
                        "nhsuk-header__navigation-link",
                        isActive && "nhsuk-header__navigation-link--active",
                      )}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault()
                        router.push(item.href)
                        setMobileMenuOpen(false)
                      }}
                    >
                      <Icon className="nhsuk-icon nhsuk-icon--size-16 mr-2" aria-hidden="true" />
                      {item.label}
                      <svg
                        className="nhsuk-icon nhsuk-icon__chevron-right"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="m15.5 12-8-8v16l8-8z"></path>
                      </svg>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>
      </header>

      <main className="nhsuk-width-container" role="main" id="maincontent">
        <div className="nhsuk-main-wrapper" id="main-content">
          {children}
        </div>
      </main>

      <ProfileSettingsPanel isOpen={profilePanelOpen} onClose={() => setProfilePanelOpen(false)} user={user} />
    </div>
  )
}
