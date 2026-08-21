import axios, { AxiosError } from "axios"

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  (process.env.NODE_ENV === "production"
    ? "https://algebra-pointing-dose-screenshots.trycloudflare.com/api"
    : "http://localhost:3333/api")

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
})

// Anexa automaticamente o token JWT da sessão (localStorage "nr13pro_session")
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem("nr13pro_session")
      if (raw) {
        const session = JSON.parse(raw) as { token?: string }
        if (session.token && !config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${session.token}`
        }
      }
    } catch {
      // sessão corrompida — segue sem token
    }
  }
  return config
})

export function getAuthHeader(token?: string | null): Record<string, string> {
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export function getApiErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    if (error.code === "ECONNREFUSED" || !error.response) {
      return "Não foi possível conectar ao servidor. Verifique se a API está rodando."
    }
    const raw = error.response.data?.message
    if (Array.isArray(raw)) return raw[0]
    if (typeof raw === "string") return raw
    return `Erro ${error.response.status}: ${error.response.statusText}`
  }
  if (error instanceof Error) return error.message
  return "Erro inesperado."
}
