import { api, getAuthHeader, getApiErrorMessage } from "@/lib/api"
import { type User, type SignupDTO, type LoginDTO, type AuthSession } from "@/lib/types"

const STORAGE_KEYS = {
  session: "nr13pro_session",
}

function saveSession(session: AuthSession) {
  localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(session))
}

export const authService = {
  /**
   * Os usuários de demonstração são criados pelo backend no boot
   * (AuthModule.onModuleInit → seedDemoUsers). Mantido por compatibilidade.
   */
  seedDemoUser(): void {},

  async signup(data: SignupDTO): Promise<AuthSession> {
    try {
      const { data: session } = await api.post<AuthSession>("/auth/signup", data)
      saveSession(session)
      return session
    } catch (error) {
      throw new Error(getApiErrorMessage(error))
    }
  },

  async login(data: LoginDTO): Promise<AuthSession> {
    try {
      const { data: session } = await api.post<AuthSession>("/auth/login", data)
      saveSession(session)
      return session
    } catch (error) {
      throw new Error(getApiErrorMessage(error))
    }
  },

  async logout(): Promise<void> {
    localStorage.removeItem(STORAGE_KEYS.session)
  },

  getSession(): AuthSession | null {
    if (typeof window === "undefined") return null
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.session)
      if (!stored) return null
      const session = JSON.parse(stored) as AuthSession
      if (new Date(session.expiresAt) < new Date()) {
        localStorage.removeItem(STORAGE_KEYS.session)
        return null
      }
      return session
    } catch {
      return null
    }
  },

  async updateUser(updates: Partial<User> & { password?: string }): Promise<User> {
    const session = this.getSession()
    if (!session) throw new Error("Não autenticado.")

    const allowed: Partial<User> & { password?: string } = {}
    if (updates.name !== undefined) allowed.name = updates.name
    if (updates.email !== undefined) allowed.email = updates.email
    if (updates.password !== undefined) allowed.password = updates.password
    if (updates.crea !== undefined) allowed.crea = updates.crea

    try {
      const { data: user } = await api.patch<User>("/auth/me", allowed, {
        headers: getAuthHeader(session.token),
      })
      saveSession({ ...session, user })
      return user
    } catch (error) {
      throw new Error(getApiErrorMessage(error))
    }
  },

  async setPlan(plan: "Mensal" | "Anual"): Promise<User> {
    const session = this.getSession()
    if (!session) throw new Error("Não autenticado.")

    try {
      const { data: user } = await api.post<User>("/auth/plan", { plan }, {
        headers: getAuthHeader(session.token),
      })
      saveSession({ ...session, user })
      return user
    } catch (error) {
      throw new Error(getApiErrorMessage(error))
    }
  },

  async requestPasswordReset(email: string): Promise<{ success: boolean }> {
    try {
      const { data } = await api.post<{ success: boolean }>("/auth/request-reset", { email })
      return data
    } catch (error) {
      throw new Error(getApiErrorMessage(error))
    }
  },

  async resetPassword(codigo: string, newPassword: string): Promise<void> {
    try {
      await api.post<{ success: boolean }>("/auth/reset-password", {
        token: codigo,
        newPassword,
      })
    } catch (error) {
      throw new Error(getApiErrorMessage(error))
    }
  },

  isAuthenticated(): boolean {
    return this.getSession() !== null
  },

  /**
   * Cria um usuário de degustação no backend — o lead consegue logar
   * de verdade no sistema com as credenciais geradas, até a expiração.
   * Requer autenticação (usado pelo closer ao liberar acesso).
   */
  async criarUsuarioDegustacao(data: { nome: string; email: string; senha: string; expiraEm: string }): Promise<User> {
    const session = this.getSession()
    if (!session) throw new Error("Não autenticado.")

    try {
      const { data: user } = await api.post<User>("/auth/degustacao", data, {
        headers: getAuthHeader(session.token),
      })
      return user
    } catch (error) {
      throw new Error(getApiErrorMessage(error))
    }
  },
}
