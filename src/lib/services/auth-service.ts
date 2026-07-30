import { type User, type SignupDTO, type LoginDTO, type AuthSession } from "@/lib/types"

const STORAGE_KEYS = {
  users: "nr13pro_users",
  session: "nr13pro_session",
}

function generateId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

function generateToken(): string {
  return `tok_${Date.now()}_${Math.random().toString(36).slice(2, 15)}`
}

function getUsers(): Record<string, { user: User; password: string }> {
  if (typeof window === "undefined") return {}
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.users) || "{}")
  } catch {
    return {}
  }
}

function saveUsers(users: Record<string, { user: User; password: string }>) {
  localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users))
}

export const authService = {
  async signup(data: SignupDTO): Promise<AuthSession> {
    // Simula delay de rede
    await new Promise((r) => setTimeout(r, 800))

    const users = getUsers()

    // Verifica se email já existe
    if (Object.values(users).some((u) => u.user.email === data.email)) {
      throw new Error("Este e-mail já está cadastrado.")
    }

    const user: User = {
      id: generateId(),
      name: data.name,
      email: data.email,
      crea: data.crea,
      plan: null,
      createdAt: new Date().toISOString(),
    }

    users[user.id] = { user, password: data.password }
    saveUsers(users)

    const session: AuthSession = {
      user,
      token: generateToken(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 dias
    }

    localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(session))
    return session
  },

  async login(data: LoginDTO): Promise<AuthSession> {
    await new Promise((r) => setTimeout(r, 600))

    const users = getUsers()
    const entry = Object.values(users).find((u) => u.user.email === data.email)

    if (!entry) {
      throw new Error("E-mail não encontrado.")
    }

    if (entry.password !== data.password) {
      throw new Error("Senha incorreta.")
    }

    const session: AuthSession = {
      user: entry.user,
      token: generateToken(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    }

    localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(session))
    return session
  },

  async logout(): Promise<void> {
    await new Promise((r) => setTimeout(r, 200))
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

  async updateUser(updates: Partial<User>): Promise<User> {
    await new Promise((r) => setTimeout(r, 300))

    const session = this.getSession()
    if (!session) throw new Error("Não autenticado.")

    const users = getUsers()
    const entry = users[session.user.id]
    if (!entry) throw new Error("Usuário não encontrado.")

    const updatedUser = { ...entry.user, ...updates }
    users[session.user.id] = { ...entry, user: updatedUser }
    saveUsers(users)

    const newSession = { ...session, user: updatedUser }
    localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(newSession))

    return updatedUser
  },

  async setPlan(plan: "Mensal" | "Anual"): Promise<User> {
    const session = this.getSession()
    if (!session) throw new Error("Não autenticado.")

    const users = getUsers()
    const entry = users[session.user.id]
    if (!entry) throw new Error("Usuário não encontrado.")

    const updatedUser = { ...entry.user, plan }
    users[session.user.id] = { ...entry, user: updatedUser }
    saveUsers(users)

    const newSession = { ...session, user: updatedUser }
    localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(newSession))

    return updatedUser
  },

  isAuthenticated(): boolean {
    return this.getSession() !== null
  },
}
