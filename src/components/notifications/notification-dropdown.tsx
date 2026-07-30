"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, CheckCheck, Trash2 } from "lucide-react"
import { useNotifications } from "@/lib/notification-context"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export function NotificationBell() {
  const { unreadCount, notifications, markAsRead, markAllAsRead, deleteNotification } = useNotifications()
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative w-8 h-8 flex items-center justify-center text-foreground/50 hover:text-foreground transition-colors"
        aria-label="Notificações"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-destructive text-[9px] font-bold text-destructive-foreground flex items-center justify-center shadow-sm">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute right-0 top-full mt-2 w-80 sm:w-96 z-50 bg-card border border-border rounded-lg shadow-lg overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <h3 className="text-sm font-semibold text-text-primary">Notificações</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={() => markAllAsRead()}
                    className="flex items-center gap-1 text-[11px] text-primary hover:text-primary-hover transition-colors"
                  >
                    <CheckCheck className="h-3 w-3" />
                    Marcar todas como lidas
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <Bell className="h-8 w-8 text-text-muted mx-auto mb-2" />
                    <p className="text-sm text-text-secondary">Nenhuma notificação</p>
                  </div>
                ) : (
                  notifications.slice(0, 10).map((notif) => (
                    <div
                      key={notif.id}
                      className={cn(
                        "flex items-start gap-3 px-4 py-3 border-b border-border/50 hover:bg-accent/30 transition-colors group",
                        !notif.read && "bg-primary-subtle/30"
                      )}
                    >
                      <Link
                        href={notif.link || "#"}
                        className="flex-1 min-w-0"
                        onClick={() => {
                          markAsRead(notif.id)
                          setOpen(false)
                        }}
                      >
                        <p className={cn("text-sm", !notif.read ? "font-medium text-text-primary" : "text-text-secondary")}>
                          {notif.title}
                        </p>
                        <p className="text-xs text-text-muted mt-0.5 line-clamp-2">{notif.message}</p>
                        <p className="text-[10px] text-text-muted mt-1">
                          {new Date(notif.createdAt).toLocaleDateString("pt-BR")}
                        </p>
                      </Link>
                      <button
                        onClick={() => deleteNotification(notif.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-text-muted hover:text-destructive shrink-0"
                        title="Remover"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {notifications.length > 0 && (
                <Link
                  href="/notificacoes"
                  onClick={() => setOpen(false)}
                  className="block text-center text-xs text-primary hover:text-primary-hover py-3 border-t border-border font-medium transition-colors"
                >
                  Ver todas as notificações
                </Link>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
