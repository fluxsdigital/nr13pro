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
  /**
   * Garante os usuários de demonstração no localStorage (idempotente).
   * Cria o engenheiro demo e o closer (vendas) de forma independente —
   * se um já existir, cria apenas o que falta.
   */
  seedDemoUser(): void {
    if (typeof window === "undefined") return
    const users = getUsers()
    let criados: string[] = []

    // Usuário demo (engenheiro — inspeções e laudos)
    if (!Object.values(users).some((u) => u.user.email === "demo@nr13pro.com.br")) {
      const demoUser: User = {
        id: "user_demo_001",
        name: "Eng. Carlos Alberto Santos",
        email: "demo@nr13pro.com.br",
        crea: "CREA-SP 123.456",
        role: "engenheiro",
        plan: "Mensal",
        degustacaoExpiraEm: null,
        createdAt: "2025-01-01T00:00:00.000Z",
      }
      users[demoUser.id] = { user: demoUser, password: "123456" }
      criados.push("demo@nr13pro.com.br")
    }

    // Usuário closer (vendedor NR-13 Pro) — acesso exclusivo à carteira de leads
    if (!Object.values(users).some((u) => u.user.email === "closer@nr13pro.com.br")) {
      const closerUser: User = {
        id: "user_closer_001",
        name: "Vendas NR-13 Pro",
        email: "closer@nr13pro.com.br",
        crea: "—",
        role: "closer",
        plan: null,
        degustacaoExpiraEm: null,
        createdAt: "2025-01-01T00:00:00.000Z",
      }
      users[closerUser.id] = { user: closerUser, password: "123456" }
      criados.push("closer@nr13pro.com.br")
    }

    if (criados.length > 0) {
      saveUsers(users)
      console.log(`[auth] Usuários demo criados: ${criados.join(", ")} (senha 123456)`)
    }
  },

  async signup(data: SignupDTO): Promise<AuthSession> {
    await new Promise((r) => setTimeout(r, 800))

    const users = getUsers()

    if (Object.values(users).some((u) => u.user.email === data.email)) {
      throw new Error("Este e-mail já está cadastrado.")
    }

    const user: User = {
      id: generateId(),
      name: data.name,
      email: data.email,
      crea: data.crea,
      role: "engenheiro",
      plan: null,
      degustacaoExpiraEm: null,
      createdAt: new Date().toISOString(),
    }

    users[user.id] = { user, password: data.password }
    saveUsers(users)

    const session: AuthSession = {
      user,
      token: generateToken(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
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

    // Acesso de degustação expirado? Bloqueia o login
    if (entry.user.plan === "Degustação" && entry.user.degustacaoExpiraEm) {
      if (new Date(entry.user.degustacaoExpiraEm) < new Date()) {
        throw new Error("Seu acesso de degustação expirou. Fale com o time de vendas da NR-13 Pro para renovar.")
      }
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

  /**
   * Cria um usuário de degustação no mock (localStorage).
   * Usado pelo closer ao liberar acesso — o lead consegue logar de verdade
   * no sistema com as credenciais geradas, até a data de expiração.
   */
  async criarUsuarioDegustacao(data: { nome: string; email: string; senha: string; expiraEm: string }): Promise<User> {
    const users = getUsers()
    const jaExiste = Object.values(users).find((u) => u.user.email === data.email)

    // Se já existe, apenas atualiza a expiração (re-liberação)
    if (jaExiste) {
      const updatedUser: User = { ...jaExiste.user, plan: "Degustação", degustacaoExpiraEm: data.expiraEm, name: data.nome }
      users[jaExiste.user.id] = { user: updatedUser, password: data.senha }
      saveUsers(users)
      return updatedUser
    }

    const user: User = {
      id: generateId(),
      name: data.nome,
      email: data.email,
      crea: "—",
      role: "engenheiro",
      plan: "Degustação",
      degustacaoExpiraEm: data.expiraEm,
      createdAt: new Date().toISOString(),
    }
    users[user.id] = { user, password: data.senha }
    saveUsers(users)
    return user
  },
}
