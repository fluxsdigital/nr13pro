"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { useAuth } from "@/lib/auth-context"
import { Container } from "@/components/ui/container"

export default function LoginPage() {
  const router = useRouter()
  const { login, logout, user, isAuthenticated } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    await logout()
    setEmail("")
    setPassword("")
    toast.success("Sessão encerrada. Faça login com outra conta.")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error("Preencha todos os campos.")
      return
    }
    setLoading(true)
    try {
      await login({ email, password })
      toast.success("Login realizado com sucesso!")
      router.push("/")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao fazer login.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-dvh bg-background flex items-center justify-center py-16 px-4">
      <Container className="max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Link
            href="/vendas"
            className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors mb-8"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Voltar
          </Link>

          <div className="bg-card border border-divider rounded-lg p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-7 h-7 rounded-lg bg-[#171717] flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 8v8M8 12h8"/>
                </svg>
              </div>
              <span className="font-semibold text-sm text-text-primary">NR-13 Pro</span>
            </div>

            <h1 className="text-xl font-medium text-text-primary">Entrar</h1>
            <p className="text-sm text-text-secondary mt-1 mb-6">
              Acesse sua conta para gerenciar inspeções e laudos.
            </p>

            {isAuthenticated && user && (
              <div className="mb-4 p-3 rounded-lg bg-amber-50 border border-amber-200">
                <p className="text-xs text-text-secondary leading-relaxed">
                  Você está logado como{" "}
                  <strong className="text-text-primary">{user.name}</strong> ({user.email}).
                </p>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-2 w-full h-9 rounded-md bg-amber-500 text-white text-xs font-medium hover:bg-amber-600 transition-colors"
                >
                  Sair e trocar de conta
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs text-text-secondary mb-1.5">E-mail</label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 px-4 rounded-md bg-card border border-input text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-xs text-text-secondary mb-1.5">Senha</label>
                <input
                  type="password"
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 px-4 rounded-md bg-card border border-input text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                className="w-full h-11 rounded-md bg-primary text-white text-sm font-medium hover:bg-primary-hover active:bg-primary-active transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-sm mt-1"
              >
                {loading ? "Entrando..." : "Entrar"}
              </motion.button>
            </form>

            {/* Acesso Demo */}
            <div className="mt-6 p-3 rounded-lg bg-primary-subtle border border-primary/20 space-y-2">
              <p className="text-xs font-semibold text-primary mb-1.5">🔑 Acessos de demonstração</p>
              <div className="text-xs text-text-secondary leading-relaxed">
                <p className="font-medium text-text-primary mb-0.5">👷 Engenheiro (inspeções e laudos)</p>
                <p>
                  <strong className="text-text-primary">demo@nr13pro.com.br</strong> /{" "}
                  <strong className="text-text-primary">123456</strong>
                </p>
              </div>
              <div className="text-xs text-text-secondary leading-relaxed">
                <p className="font-medium text-text-primary mb-0.5">💼 Closer — Vendas (carteira de leads)</p>
                <p>
                  <strong className="text-text-primary">closer@nr13pro.com.br</strong> /{" "}
                  <strong className="text-text-primary">123456</strong>
                </p>
              </div>
            </div>

            <p className="mt-4 text-center text-sm text-text-secondary">
              Não tem conta?{" "}
              <Link href="/cadastro" className="text-primary hover:text-primary-hover font-medium underline underline-offset-2">
                Criar conta
              </Link>
            </p>
          </div>
        </motion.div>
      </Container>
    </div>
  )
}
