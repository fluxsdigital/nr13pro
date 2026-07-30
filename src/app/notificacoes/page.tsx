"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Bell, CheckCheck, Trash2, ArrowLeft, BellOff } from "lucide-react"
import { useNotifications } from "@/lib/notification-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function NotificacoesPage() {
  const router = useRouter()
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification } = useNotifications()

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-lg hover:bg-accent transition-colors text-text-secondary"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-text-primary">Notificações</h1>
            <p className="text-sm text-text-secondary mt-0.5">
              {unreadCount > 0
                ? `${unreadCount} notificação${unreadCount > 1 ? "ões" : ""} não lida${unreadCount > 1 ? "s" : ""}`
                : "Todas as notificações estão lidas"}
            </p>
          </div>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllAsRead} className="border-border text-text-secondary gap-1.5">
            <CheckCheck className="h-3.5 w-3.5" />
            Marcar todas como lidas
          </Button>
        )}
      </div>

      <Card className="border-border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-text-primary flex items-center gap-2">
            <Bell className="h-4 w-4 text-primary" />
            Histórico
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {notifications.length === 0 ? (
            <div className="py-16 text-center">
              <BellOff className="h-12 w-12 text-text-muted mx-auto mb-3" />
              <p className="text-sm text-text-secondary">Nenhuma notificação</p>
              <p className="text-xs text-text-muted mt-1">Você receberá notificações sobre inspeções, vencimentos e anomalias.</p>
            </div>
          ) : (
            <div className="divide-y divide-border/50">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={cn(
                    "flex items-start gap-3 px-4 sm:px-6 py-4 transition-colors",
                    !notif.read ? "bg-primary-subtle/20" : "hover:bg-accent/30"
                  )}
                >
                  <Link
                    href={notif.link || "#"}
                    className="flex-1 min-w-0"
                    onClick={() => markAsRead(notif.id)}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                      )}
                      <p className={cn("text-sm", !notif.read ? "font-medium text-text-primary" : "text-text-secondary")}>
                        {notif.title}
                      </p>
                    </div>
                    <p className="text-xs text-text-muted ml-4">{notif.message}</p>
                    <p className="text-[10px] text-text-muted mt-1.5 ml-4">
                      {new Date(notif.createdAt).toLocaleDateString("pt-BR", {
                        day: "numeric", month: "long", year: "numeric",
                        hour: "2-digit", minute: "2-digit",
                      })}
                    </p>
                  </Link>
                  <div className="flex items-center gap-1 shrink-0">
                    {!notif.read && (
                      <button
                        onClick={() => markAsRead(notif.id)}
                        className="p-1.5 text-text-muted hover:text-primary transition-colors"
                        title="Marcar como lida"
                      >
                        <CheckCheck className="h-3.5 w-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notif.id)}
                      className="p-1.5 text-text-muted hover:text-destructive transition-colors"
                      title="Remover"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
