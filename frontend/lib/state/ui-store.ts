import { create } from "zustand"

interface UIState {
  sidebarCollapsed: boolean
  currentTheme: "light" | "dark" | "high_contrast"
  notifications: any[]
  loading: boolean
  toasts: any[]
  modal: {
    isOpen: boolean
    type: string | null
    data: any | null
  }
}

interface UIActions {
  toggleSidebar: () => void
  setTheme: (theme: "light" | "dark" | "high_contrast") => void
  addNotification: (notification: any) => void
  removeNotification: (id: string) => void
  addToast: (toast: any) => void
  removeToast: (id: string) => void
  openModal: (type: string, data?: any) => void
  closeModal: () => void
}

export const useUIStore = create<UIState & UIActions>((set, get) => ({
  // State
  sidebarCollapsed: false,
  currentTheme: "light",
  notifications: [],
  loading: false,
  toasts: [],
  modal: {
    isOpen: false,
    type: null,
    data: null,
  },

  // Actions
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setTheme: (theme) => set({ currentTheme: theme }),
  addNotification: (notification) =>
    set((state) => ({
      notifications: [...state.notifications, notification],
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
  addToast: (toast) =>
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id: Date.now().toString() }],
    })),
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
  openModal: (type, data = null) =>
    set({
      modal: { isOpen: true, type, data },
    }),
  closeModal: () =>
    set({
      modal: { isOpen: false, type: null, data: null },
    }),
}))
