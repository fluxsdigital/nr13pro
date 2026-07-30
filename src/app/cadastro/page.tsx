"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { useAuth } from "@/lib/auth-context"
import { Container } from "@/components/ui/container"

export default function CadastroPage() {
  const router = useRouter()
  const { signup, isAuthenticated } = useAuth()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [crea, setCrea] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  if (isAuthenticated && typeof window !== "undefined") {
    router.push("/")
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !password || !crea) {
      toast.error("Preencha todos os campos.")
      return
    }
    if (password.length < 6) {
      toast.error("A senha deve ter no mínimo 6 caracteres.")
      return
    }
    setLoading(true)
    try {
      await signup({ name, email, password, crea })
      toast.success("Conta criada com sucesso! Bem-vindo ao NR-13 Pro.")
      router.push("/")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao criar conta.")
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

            <h1 className="text-xl font-medium text-text-primary">Criar conta</h1>
            <p className="text-sm text-text-secondary mt-1 mb-6">
              Crie sua conta para começar a gerenciar inspeções NR-13.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs text-text-secondary mb-1.5">Nome completo</label>
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-11 px-4 rounded-md bg-card border border-input text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                />
              </div>
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
                <label className="block text-xs text-text-secondary mb-1.5">CREA</label>
                <input
                  type="text"
                  placeholder="Seu número do CREA"
                  value={crea}
                  onChange={(e) => setCrea(e.target.value)}
                  className="w-full h-11 px-4 rounded-md bg-card border border-input text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-xs text-text-secondary mb-1.5">Senha</label>
                <input
                  type="password"
                  placeholder="Mínimo 6 caracteres"
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
                {loading ? "Criando conta..." : "Criar conta gratuita"}
              </motion.button>
            </form>

            <p className="mt-6 text-center text-sm text-text-secondary">
              Já tem conta?{" "}
              <Link href="/login" className="text-primary hover:text-primary-hover font-medium underline underline-offset-2">
                Entrar
              </Link>
            </p>

            <p className="mt-4 text-xs text-text-muted leading-relaxed text-center">
              Ao criar conta, você aceita nossos{" "}
              <Link href="/termos-de-uso" className="underline underline-offset-2 hover:text-text-secondary">Termos de Uso</Link>{" "}
              e{" "}
              <Link href="/privacidade" className="underline underline-offset-2 hover:text-text-secondary">Política de Privacidade</Link>.
            </p>
          </div>
        </motion.div>
      </Container>
    </div>
  )
}
