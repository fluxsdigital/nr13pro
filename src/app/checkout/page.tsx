"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { useAuth } from "@/lib/auth-context"
import { leadService } from "@/lib/services"
import { Container } from "@/components/ui/container"
import { MessageCircle } from "lucide-react"

export default function CheckoutPage() {
  const router = useRouter()
  const { signup, setPlan, isAuthenticated } = useAuth()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [crea, setCrea] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [paid, setPaid] = useState(false)

  // Rastreamento do lead: criado quando o visitante demonstra interesse (preenche o formulário)
  const leadIdRef = useRef<string | null>(null)
  const convertidoRef = useRef(false)

  const criarLead = async () => {
    if (leadIdRef.current || !name.trim() || !whatsapp.trim()) return
    try {
      const lead = await leadService.create({
        nome: name,
        whatsapp: whatsapp.replace(/\D/g, ""),
        email,
        origem: "checkout",
        status: "novo",
        mensagemAutomatizada: `Olá ${name.split(" ")[0]}! Notei que você iniciou a assinatura do NR-13 Pro mas não concluiu. Teve alguma dúvida no fechamento? Posso te ajudar!`,
      }, "nr13pro_empresa")
      leadIdRef.current = lead.id
    } catch {
      // silencioso — lead é opcional
    }
  }

  // Marca como "abandonou_checkout" se o visitante sair sem concluir
  useEffect(() => {
    const marcarAbandono = () => {
      if (leadIdRef.current && !convertidoRef.current) {
        leadService.update(leadIdRef.current, { status: "abandonou_checkout" }).catch(() => {})
      }
    }
    window.addEventListener("beforeunload", marcarAbandono)
    return () => {
      window.removeEventListener("beforeunload", marcarAbandono)
      marcarAbandono()
    }
  }, [])

  // Se já estiver logado com plano, redireciona
  if (isAuthenticated && typeof window !== "undefined") {
    router.push("/")
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !password || !crea || !whatsapp) {
      toast.error("Preencha todos os campos, incluindo o WhatsApp.")
      return
    }
    if (password.length < 6) {
      toast.error("A senha deve ter no mínimo 6 caracteres.")
      return
    }
    setLoading(true)

    try {
      // Garante que o lead existe antes de converter
      await criarLead()

      // Simula processamento de pagamento
      await new Promise((r) => setTimeout(r, 2000))

      // Cria a conta
      await signup({ name, email, password, crea })

      // Atribui o plano
      await setPlan("Mensal")

      // Marca o lead como convertido
      convertidoRef.current = true
      if (leadIdRef.current) {
        await leadService.update(leadIdRef.current, {
          status: "convertido",
          mensagemAutomatizada: `Olá ${name.split(" ")[0]}! Sua assinatura foi confirmada. Bem-vindo ao NR-13 Pro! 🎉`,
        }).catch(() => {})
      }

      setPaid(true)
      toast.success("Assinatura confirmada! Bem-vindo ao NR-13 Pro.")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao processar assinatura.")
    } finally {
      setLoading(false)
    }
  }

  if (paid) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-background">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 rounded-full bg-success-subtle flex items-center justify-center mx-auto mb-6">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-success">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h1 className="text-2xl font-medium text-text-primary">Assinatura confirmada!</h1>
          <p className="mt-3 text-base text-text-secondary leading-relaxed">
            Seu plano mensal de <strong className="text-text-primary">R$ 97/mês</strong> está ativo, {name.split(" ")[0]}.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-success bg-success-subtle px-3 py-1.5 rounded-full mx-auto w-fit">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Cancele quando quiser, sem multa
          </div>
          <Link
            href="/"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-200 cursor-pointer px-7 py-3 text-base bg-primary text-white hover:bg-primary-hover shadow-sm"
          >
            Acessar Plataforma
          </Link>
        </div>
      </div>
    )
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

            <h1 className="text-xl font-medium text-text-primary">Assinar plano</h1>
            <div className="flex items-baseline gap-1 mt-2 mb-6">
              <span className="text-2xl font-semibold text-text-primary">R$ 97</span>
              <span className="text-sm text-text-secondary">/mês</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs text-text-secondary mb-1.5">Nome completo</label>
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => { setName(e.target.value); criarLead() }}
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
                <label className="block text-xs text-text-secondary mb-1.5 flex items-center gap-1.5">
                  <MessageCircle className="h-3.5 w-3.5 text-success" />
                  WhatsApp <span className="text-text-muted">(para receber suporte e novidades)</span>
                </label>
                <input
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={whatsapp}
                  onChange={(e) => { setWhatsapp(e.target.value); criarLead() }}
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
                {loading ? "Processando pagamento..." : "Assinar agora — R$ 97/mês"}
              </motion.button>
            </form>

            <div className="mt-4 flex items-center gap-2 text-xs text-success bg-success-subtle px-3 py-1.5 rounded-lg">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Cancele quando quiser, sem multa
            </div>

            <p className="mt-4 text-xs text-text-muted leading-relaxed">
              Ao assinar, você aceita nossos{" "}
              <Link href="/termos-de-uso" className="underline underline-offset-2 hover:text-text-secondary">Termos de Uso</Link>{" "}
              e{" "}
              <Link href="/privacidade" className="underline underline-offset-2 hover:text-text-secondary">Política de Privacidade</Link>.
            </p>

            <p className="mt-4 text-center text-xs text-text-secondary">
              Já tem conta?{" "}
              <Link href="/login" className="text-primary hover:text-primary-hover font-medium underline underline-offset-2">
                Fazer login
              </Link>
            </p>
          </div>
        </motion.div>
      </Container>
    </div>
  )
}
