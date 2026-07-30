import type { AppNotification, NotificationType } from "@/lib/types"

const STORAGE_KEY = "nr13pro_notifications"

function generateId(): string {
  return `notif_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

function getStored(userId: string): AppNotification[] {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY}_${userId}`)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveStored(userId: string, notifications: AppNotification[]) {
  localStorage.setItem(`${STORAGE_KEY}_${userId}`, JSON.stringify(notifications))
}

export const notificationService = {
  async list(userId: string): Promise<AppNotification[]> {
    return getStored(userId).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  },

  async add(userId: string, type: NotificationType, title: string, message: string, link?: string): Promise<AppNotification> {
    const notif: AppNotification = {
      id: generateId(),
      userId,
      type,
      title,
      message,
      link,
      read: false,
      createdAt: new Date().toISOString(),
    }
    const list = getStored(userId)
    list.unshift(notif)
    saveStored(userId, list)
    return notif
  },

  async markAsRead(userId: string, id: string): Promise<void> {
    const list = getStored(userId)
    const idx = list.findIndex((n) => n.id === id)
    if (idx !== -1) {
      list[idx].read = true
      saveStored(userId, list)
    }
  },

  async markAllAsRead(userId: string): Promise<void> {
    const list = getStored(userId)
    list.forEach((n) => (n.read = true))
    saveStored(userId, list)
  },

  async delete(userId: string, id: string): Promise<void> {
    const list = getStored(userId).filter((n) => n.id !== id)
    saveStored(userId, list)
  },

  async getUnreadCount(userId: string): Promise<number> {
    return getStored(userId).filter((n) => !n.read).length
  },

  // Generate notifications based on inspection data
  generateNotifications(userId: string): void {
    const existing = getStored(userId)
    const existingTitles = new Set(existing.map((n) => n.title))

    // Get inspections nearing expiry (next inspection within 60 days)
    import("@/lib/store").then(({ inspecoes, equipamentos, laudos }) => {
      const userInspecoes = inspecoes.filter((i) => i.userId === userId)
      const userLaudos = laudos.filter((l) => l.userId === userId)
      const userEqs = equipamentos.filter((e) => e.userId === userId)

      // Check laudos with upcoming inspections
      for (const laudo of userLaudos) {
        if (!laudo.dataProximaInspecao) continue
        const diffDays = Math.ceil(
          (new Date(laudo.dataProximaInspecao).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
        )

        if (diffDays <= 0 && diffDays > -30) {
          const eq = userEqs.find((e) => e.id === laudo.equipamentoId)
          const title = "⚠️ Inspeção vencida"
          const msg = `Inspeção do equipamento ${eq?.tag || "desconhecido"} venceu em ${laudo.dataProximaInspecao}.`
          if (!existingTitles.has(title)) {
            saveStored(userId, [...getStored(userId), {
              id: generateId(), userId, type: "inspecao_vencendo" as NotificationType,
              title, message: msg, link: `/laudos/${laudo.id}`, read: false,
              createdAt: new Date().toISOString(),
            }])
          }
        } else if (diffDays > 0 && diffDays <= 60) {
          const eq = userEqs.find((e) => e.id === laudo.equipamentoId)
          const title = "🔔 Inspeção próxima do vencimento"
          const msg = `Inspeção do equipamento ${eq?.tag || "desconhecido"} vence em ${diffDays} dias (${laudo.dataProximaInspecao}).`
          if (!existingTitles.has(title)) {
            saveStored(userId, [...getStored(userId), {
              id: generateId(), userId, type: "inspecao_vencendo" as NotificationType,
              title, message: msg, link: `/laudos/${laudo.id}`, read: false,
              createdAt: new Date().toISOString(),
            }])
          }
        }
      }

      // Check anomalies with critical severity
      for (const inspecao of userInspecoes) {
        for (const ano of inspecao.anomalias) {
          if (ano.gravidade === "critica" && !ano.resolvida) {
            const eq = userEqs.find((e) => e.id === inspecao.equipamentoId)
            const title = "🚨 Anomalia crítica"
            const msg = `Anomalia crítica no equipamento ${eq?.tag || "desconhecido"}: ${ano.descricao.slice(0, 80)}`
            if (!existingTitles.has(title)) {
              saveStored(userId, [...getStored(userId), {
                id: generateId(), userId, type: "anomalia_critica" as NotificationType,
                title, message: msg, link: `/inspecoes/${inspecao.id}`, read: false,
                createdAt: new Date().toISOString(),
              }])
            }
          }
        }
      }

      // Welcome notification for new users
      if (existing.length === 0) {
        saveStored(userId, [...getStored(userId), {
          id: generateId(), userId, type: "sistema" as NotificationType,
          title: "👋 Bem-vindo ao NR-13 Pro",
          message: "Comece cadastrando seus clientes e equipamentos para gerenciar as inspeções NR-13.",
          link: "/clientes", read: false,
          createdAt: new Date().toISOString(),
        }])
      }
    }).catch(() => {})
  },
}

export function triggerNotificationEvent(userId: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("nr13pro_notification_update", { detail: { userId } }))
  }
}
