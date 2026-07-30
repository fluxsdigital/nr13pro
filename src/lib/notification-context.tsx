"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { notificationService } from "@/lib/services/notification-service"
import { useAuth } from "@/lib/auth-context"
import type { AppNotification } from "@/lib/types"

type NotificationContextType = {
  notifications: AppNotification[]
  unreadCount: number
  isLoading: boolean
  markAsRead: (id: string) => Promise<void>
  markAllAsRead: () => Promise<void>
  deleteNotification: (id: string) => Promise<void>
  refresh: () => void
}

const NotificationContext = createContext<NotificationContextType | null>(null)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<AppNotification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const refresh = useCallback(() => {
    if (!user) {
      setNotifications([])
      setUnreadCount(0)
      setIsLoading(false)
      return
    }

    notificationService.list(user.id).then((list) => {
      setNotifications(list)
      setUnreadCount(list.filter((n) => !n.read).length)
      setIsLoading(false)
    }).catch(() => {
      setIsLoading(false)
    })
  }, [user])

  useEffect(() => {
    refresh()
  }, [refresh])

  // Listen for custom events
  useEffect(() => {
    const handler = () => refresh()
    window.addEventListener("nr13pro_notification_update", handler)
    return () => window.removeEventListener("nr13pro_notification_update", handler)
  }, [refresh])

  // Generate notifications on first load
  useEffect(() => {
    if (user) {
      notificationService.generateNotifications(user.id)
      // Refresh after generation
      setTimeout(refresh, 500)
    }
  }, [user?.id, refresh])

  const markAsRead = useCallback(async (id: string) => {
    if (!user) return
    await notificationService.markAsRead(user.id, id)
    refresh()
  }, [user, refresh])

  const markAllAsRead = useCallback(async () => {
    if (!user) return
    await notificationService.markAllAsRead(user.id)
    refresh()
  }, [user, refresh])

  const deleteNotification = useCallback(async (id: string) => {
    if (!user) return
    await notificationService.delete(user.id, id)
    refresh()
  }, [user, refresh])

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, isLoading, markAsRead, markAllAsRead, deleteNotification, refresh }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const ctx = useContext(NotificationContext)
  if (!ctx) throw new Error("useNotifications must be used within a NotificationProvider")
  return ctx
}
