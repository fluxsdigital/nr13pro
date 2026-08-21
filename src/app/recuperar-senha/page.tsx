"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { MailCheck } from "lucide-react"
import { Container } from "@/components/ui/container"
import { authService } from "@/lib/services/auth-service"

type Etapa = "email" | "codigo" | "concluido"

export default function RecuperarSenhaPage() {
  const router = useRouter()

  const [etapa, setEtapa] = useState<Etapa>("email")
  const [loading, setLoading] = useState(false)

  const [email, setEmail] = useState("")
  const [codigo, setCodigo] = useState("")
  const [novaSenha, setNovaSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")

  const handleEnviarCodigo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast.error("Digite seu e-mail.")
      return
    }
    setLoading(true)
    try {
      await authService.requestPasswordReset(email)
      setEtapa("codigo")
      toast.success("Código de recuperação enviado para o seu e-mail.")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao solicitar código.")
    } finally {
      setLoading(false)
    }
  }

  const handleRedefinir = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!codigo || !novaSenha || !confirmarSenha) {
      toast.error("Preencha todos os campos.")
      return
    }
    if (novaSenha.length < 6) {
      toast.error("A nova senha deve ter pelo menos 6 caracteres.")
      return
    }
    if (novaSenha !== confirmarSenha) {
      toast.error("As senhas não coincidem.")
      return
    }
    setLoading(true)
    try {
      await authService.resetPassword(codigo, novaSenha)
      setEtapa("concluido")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao redefinir senha.")
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
            href="/login"
            className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors mb-8"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Voltar para o login
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

            {etapa === "email" && (
              <>
                <h1 className="text-xl font-medium text-text-primary">Recuperar senha</h1>
                <p className="text-sm text-text-secondary mt-1 mb-6">
                  Informe seu e-mail cadastrado para receber um código de recuperação.
                </p>

                <form onSubmit={handleEnviarCodigo} className="space-y-3">
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

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    className="w-full h-11 rounded-md bg-primary text-white text-sm font-medium hover:bg-primary-hover active:bg-primary-active transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-sm mt-1"
                  >
                    {loading ? "Enviando..." : "Enviar código"}
                  </motion.button>
                </form>
              </>
            )}

            {etapa === "codigo" && (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <MailCheck className="w-5 h-5 text-primary" />
                  <h1 className="text-xl font-medium text-text-primary">Verifique seu e-mail</h1>
                </div>
                <p className="text-sm text-text-secondary mb-6">
                  Enviamos um código de recuperação de 6 dígitos para{" "}
                  <strong className="text-text-primary">{email}</strong>. Ele expira em 1 hora.
                </p>

                <form onSubmit={handleRedefinir} className="space-y-3">
                  <div>
                    <label className="block text-xs text-text-secondary mb-1.5">Código de recuperação</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      placeholder="000000"
                      value={codigo}
                      onChange={(e) => setCodigo(e.target.value.replace(/\D/g, ""))}
                      className="w-full h-11 px-4 rounded-md bg-card border border-input text-sm font-mono tracking-[0.4em] text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-text-secondary mb-1.5">Nova senha</label>
                    <input
                      type="password"
                      placeholder="Mínimo 6 caracteres"
                      value={novaSenha}
                      onChange={(e) => setNovaSenha(e.target.value)}
                      className="w-full h-11 px-4 rounded-md bg-card border border-input text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-text-secondary mb-1.5">Confirmar nova senha</label>
                    <input
                      type="password"
                      placeholder="Repita a nova senha"
                      value={confirmarSenha}
                      onChange={(e) => setConfirmarSenha(e.target.value)}
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
                    {loading ? "Redefinindo..." : "Redefinir senha"}
                  </motion.button>

                  <button
                    type="button"
                    onClick={() => setEtapa("email")}
                    className="w-full text-xs text-text-secondary hover:text-text-primary transition-colors mt-1"
                  >
                    Não recebeu? Usar outro e-mail
                  </button>
                </form>
              </>
            )}

            {etapa === "concluido" && (
              <div className="text-center py-4">
                <div className="w-12 h-12 rounded-full bg-primary-subtle border border-primary/20 flex items-center justify-center mx-auto mb-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <h1 className="text-xl font-medium text-text-primary">Senha redefinida!</h1>
                <p className="text-sm text-text-secondary mt-1 mb-6">
                  Sua senha foi atualizada com sucesso. Faça login com a nova senha.
                </p>
                <motion.button
                  type="button"
                  onClick={() => router.push("/login")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  className="w-full h-11 rounded-md bg-primary text-white text-sm font-medium hover:bg-primary-hover active:bg-primary-active transition-colors shadow-sm"
                >
                  Ir para o login
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>
      </Container>
    </div>
  )
}
