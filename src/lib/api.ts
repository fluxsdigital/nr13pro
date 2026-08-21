import axios, { AxiosError } from "axios"

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3333/api",
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
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
