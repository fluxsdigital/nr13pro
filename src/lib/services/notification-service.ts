import { api, getApiErrorMessage } from "@/lib/api"
import { laudoService } from "@/lib/services/laudo-service"
import { equipamentoService } from "@/lib/services/equipamento-service"
import { inspecaoService } from "@/lib/services/inspecao-service"
import type { AppNotification, NotificationType } from "@/lib/types"

export interface NotificationService {
  list(userId?: string): Promise<AppNotification[]>
  add(
    userId: string,
    type: NotificationType,
    title: string,
    message: string,
    link?: string
  ): Promise<AppNotification>
  markAsRead(userId: string, id: string): Promise<void>
  markAllAsRead(userId: string): Promise<void>
  delete(userId: string, id: string): Promise<void>
  getUnreadCount(userId?: string): Promise<number>
  generateNotifications(userId: string): Promise<void>
}

interface CreateNotificationPayload {
  type: NotificationType
  title: string
  message: string
  link?: string
}

async function create(payload: CreateNotificationPayload): Promise<AppNotification> {
  const { data } = await api.post<AppNotification>("/notifications", payload)
  return data
}

export const notificationService: NotificationService = {
  async list() {
    try {
      const { data } = await api.get<AppNotification[]>("/notifications")
      return [...data].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    } catch (error) {
      throw new Error(getApiErrorMessage(error))
    }
  },

  async add(_userId: string, type: NotificationType, title: string, message: string, link?: string) {
    try {
      return await create({ type, title, message, link })
    } catch (error) {
      throw new Error(getApiErrorMessage(error))
    }
  },

  async markAsRead(_userId, id) {
    try {
      await api.post(`/notifications/${id}/read`)
    } catch (error) {
      throw new Error(getApiErrorMessage(error))
    }
  },

  async markAllAsRead() {
    try {
      await api.post("/notifications/read-all")
    } catch (error) {
      throw new Error(getApiErrorMessage(error))
    }
  },

  async delete(_userId, id) {
    try {
      await api.delete(`/notifications/${id}`)
    } catch (error) {
      throw new Error(getApiErrorMessage(error))
    }
  },

  async getUnreadCount() {
    try {
      const { data } = await api.get<number>("/notifications/unread-count")
      return data
    } catch {
      return 0
    }
  },

  // Gera notificações a partir dos dados de inspeção (laudos vencendo,
  // anomalias críticas). Deduplica pelo título já existente.
  async generateNotifications() {
    let existing: AppNotification[] = []
    try {
      existing = await this.list()
    } catch {
      return
    }
    const existingTitles = new Set(existing.map((n) => n.title))
    const pending: CreateNotificationPayload[] = []

    try {
      const [laudos, equipamentos] = await Promise.all([
        laudoService.list(),
        equipamentoService.list(),
      ])

      for (const laudo of laudos) {
        if (!laudo.dataProximaInspecao) continue
        const diffDays = Math.ceil(
          (new Date(laudo.dataProximaInspecao).getTime() - Date.now()) /
            (1000 * 60 * 60 * 24)
        )
        const eq = equipamentos.find((e) => e.id === laudo.equipamentoId)
        if (diffDays <= 0 && diffDays > -30) {
          const title = "⚠️ Inspeção vencida"
          if (!existingTitles.has(title)) {
            pending.push({
              type: "inspecao_vencendo",
              title,
              message: `Inspeção do equipamento ${eq?.tag || "desconhecido"} venceu em ${laudo.dataProximaInspecao}.`,
              link: `/laudos/${laudo.id}`,
            })
            existingTitles.add(title)
          }
        } else if (diffDays > 0 && diffDays <= 60) {
          const title = "🔔 Inspeção próxima do vencimento"
          if (!existingTitles.has(title)) {
            pending.push({
              type: "inspecao_vencendo",
              title,
              message: `Inspeção do equipamento ${eq?.tag || "desconhecido"} vence em ${diffDays} dias (${laudo.dataProximaInspecao}).`,
              link: `/laudos/${laudo.id}`,
            })
            existingTitles.add(title)
          }
        }
      }

      const inspecoes = await inspecaoService.list()
      for (const inspecao of inspecoes) {
        for (const ano of inspecao.anomalias) {
          if (ano.gravidade === "critica" && !ano.resolvida) {
            const eq = equipamentos.find((e) => e.id === inspecao.equipamentoId)
            const title = `🚨 Anomalia crítica: ${ano.descricao.slice(0, 60)}`
            if (!existingTitles.has(title)) {
              pending.push({
                type: "anomalia_critica",
                title,
                message: `Anomalia crítica no equipamento ${eq?.tag || "desconhecido"}: ${ano.descricao.slice(0, 80)}`,
                link: `/inspecoes/${inspecao.id}`,
              })
              existingTitles.add(title)
            }
          }
        }
      }

      // Boas-vindas para usuário sem nenhuma notificação
      if (existing.length === 0 && pending.length === 0) {
        pending.push({
          type: "sistema",
          title: "👋 Bem-vindo ao NR-13 Pro",
          message:
            "Comece cadastrando seus clientes e equipamentos para gerenciar as inspeções NR-13.",
          link: "/clientes",
        })
      }

      for (const payload of pending) {
        await create(payload)
      }
    } catch {
      // geração de notificações nunca deve quebrar o app
    }
  },
}
