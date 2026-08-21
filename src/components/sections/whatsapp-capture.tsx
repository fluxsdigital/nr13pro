"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { leadService } from "@/lib/services"
import { MessageCircle, X, KeyRound, Clock, LogIn, RefreshCw } from "lucide-react"
import { toast } from "sonner"
import type { Lead } from "@/lib/types"

const STORAGE_KEY = "nr13pro_whatsapp_captured"
const LEAD_ID_KEY = "nr13pro_lead_id"

type EstadoDegustacao = "formulario" | "aguardando" | "liberado"

function formatarValidade(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })
}

export function WhatsAppCapture() {
  const [open, setOpen] = useState(false)
  const [nome, setNome] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [saving, setSaving] = useState(false)
  const [estado, setEstado] = useState<EstadoDegustacao>("formulario")
  const [lead, setLead] = useState<Lead | null>(null)

  // Ao montar: verifica se o visitante já informou os dados antes
  useEffect(() => {
    const leadId = localStorage.getItem(LEAD_ID_KEY)
    if (leadId) {
      leadService.getById(leadId)
        .then((l) => {
          if (l) {
            setLead(l)
            setEstado(l.acessoDegustacaoLiberado ? "liberado" : "aguardando")
            setNome(l.nome)
            setWhatsapp(l.whatsapp)
          }
        })
        .catch(() => {})
    }
    // Exibe o modal após 4s (sempre que houver algo a mostrar)
    const timer = setTimeout(() => setOpen(true), 4000)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nome.trim() || !whatsapp.trim()) {
      toast.error("Informe seu nome e WhatsApp para continuar.")
      return
    }
    setSaving(true)
    try {
      const criado = await leadService.create({
        nome,
        whatsapp: whatsapp.replace(/\D/g, ""),
        email: "",
        origem: "landing",
        status: "novo",
        mensagemAutomatizada: `Olá ${nome.split(" ")[0]}! Vi que você demonstrou interesse no NR-13 Pro. Posso ajudar com alguma dúvida sobre o fechamento?`,
      })
      localStorage.setItem(LEAD_ID_KEY, criado.id)
      setLead(criado)
      setEstado("aguardando")
      toast.success("Dados enviados! Nosso time de vendas vai liberar seu acesso de degustação.")
    } catch {
      toast.error("Erro ao registrar. Tente novamente.")
    } finally {
      setSaving(false)
    }
  }

  const reenviar = async () => {
    if (!lead) return
    setSaving(true)
    try {
      const atualizado = await leadService.getById(lead.id)
      if (atualizado) {
        setLead(atualizado)
        setEstado(atualizado.acessoDegustacaoLiberado ? "liberado" : "aguardando")
      }
      toast.success("Situação atualizada.")
    } catch {
      toast.error("Erro ao verificar. Tente novamente.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-[#676767] hover:text-[#171717] hover:bg-[#F1ECE6] transition-colors"
              aria-label="Fechar"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center mb-4">
              <MessageCircle className="h-6 w-6 text-[#25D366]" />
            </div>

            {estado === "formulario" && (
              <>
                <h2 className="text-xl font-semibold text-[#171717] tracking-tight">
                  Receba acesso e suporte pelo WhatsApp
                </h2>
                <p className="text-sm text-[#676767] mt-2 leading-relaxed">
                  Informe seus dados para solicitar a <strong className="text-[#171717]">degustação de 7 dias</strong> da
                  plataforma. Nosso time de vendas libera o acesso e você recebe as credenciais aqui mesmo.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                  <div>
                    <label className="block text-xs text-[#676767] mb-1.5">Seu nome</label>
                    <input
                      type="text"
                      placeholder="Nome completo"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      className="w-full h-11 px-4 rounded-md bg-white border border-[#EDE9E3] text-sm text-[#171717] placeholder:text-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#C56A2D]/40 focus:border-[#C56A2D] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#676767] mb-1.5">WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="(11) 99999-9999"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full h-11 px-4 rounded-md bg-white border border-[#EDE9E3] text-sm text-[#171717] placeholder:text-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#C56A2D]/40 focus:border-[#C56A2D] transition-all"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={saving}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full h-11 rounded-md bg-[#C56A2D] text-white text-sm font-medium hover:bg-[#B35C24] transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-sm mt-1"
                  >
                    {saving ? "Enviando..." : "Solicitar degustação"}
                  </motion.button>
                </form>
              </>
            )}

            {estado === "aguardando" && (
              <>
                <h2 className="text-xl font-semibold text-[#171717] tracking-tight">
                  Degustação solicitada! 🎉
                </h2>
                <p className="text-sm text-[#676767] mt-2 leading-relaxed">
                  Recebemos seus dados, <strong className="text-[#171717]">{nome.split(" ")[0]}</strong>. Nosso time de
                  vendas está verificando e vai liberar seu acesso de <strong className="text-[#171717]">7 dias</strong>.
                </p>
                <div className="mt-5 p-3 rounded-lg bg-[#F7F5F2] border border-[#EDE9E3] space-y-1.5">
                  <p className="text-xs text-[#676767] flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-[#C56A2D]" />
                    Assim que liberado, suas credenciais aparecem aqui.
                  </p>
                  <p className="text-xs text-[#676767]">
                    Você também pode acompanhar pelo WhatsApp.
                  </p>
                </div>
                <button
                  onClick={reenviar}
                  disabled={saving}
                  className="mt-4 w-full h-10 rounded-md border border-[#EDE9E3] text-[#171717] text-sm font-medium hover:bg-[#F1ECE6] transition-colors disabled:opacity-60 flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  {saving ? "Verificando..." : "Verificar se já foi liberado"}
                </button>
              </>
            )}

            {estado === "liberado" && lead?.credenciaisDegustacao && (
              <>
                <h2 className="text-xl font-semibold text-[#171717] tracking-tight">
                  Acesso liberado! 🎉
                </h2>
                <p className="text-sm text-[#676767] mt-2 leading-relaxed">
                  Sua degustação de <strong className="text-[#171717]">7 dias</strong> está ativa. Use as credenciais
                  abaixo para entrar na plataforma:
                </p>
                <div className="mt-5 p-4 rounded-lg bg-[#2E7D32]/5 border border-[#2E7D32]/20 space-y-2">
                  <div className="flex items-center gap-2">
                    <KeyRound className="h-4 w-4 text-[#2E7D32] shrink-0" />
                    <div className="text-xs text-[#676767] font-mono break-all">
                      <p><span className="text-[#171717] font-semibold">E-mail:</span> {lead.credenciaisDegustacao.email}</p>
                      <p><span className="text-[#171717] font-semibold">Senha:</span> {lead.credenciaisDegustacao.senha}</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#2E7D32] flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Válido até {formatarValidade(lead.credenciaisDegustacao.expiraEm)}
                  </p>
                </div>
                <a
                  href="/login"
                  className="mt-4 w-full h-11 rounded-md bg-[#C56A2D] text-white text-sm font-medium hover:bg-[#B35C24] transition-colors shadow-sm flex items-center justify-center gap-1.5"
                >
                  <LogIn className="h-4 w-4" />
                  Acessar o sistema
                </a>
              </>
            )}

            <p className="mt-4 text-[11px] text-[#A0A0A0] text-center leading-relaxed">
              Seus dados são usados apenas para contato comercial. Nada de spam.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
