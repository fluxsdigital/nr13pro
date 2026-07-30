"use client"

"use client"

import { useState, useEffect, useCallback } from "react"
import {
  Camera,
  CreditCard,
  Globe,
  Bell,
  Shield,
  Save,
  User,
  Moon,
  Sun,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { settingsService } from "@/lib/services"
import type { Settings } from "@/lib/settings"

function Section({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string
  description?: string
  icon?: React.ElementType
  children: React.ReactNode
}) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-primary-subtle flex items-center justify-center">
            <Icon className="h-4 w-4 text-primary" />
          </div>
        )}
        <div>
          <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
          {description && (
            <p className="text-xs text-text-muted mt-0.5">{description}</p>
          )}
        </div>
      </div>
      {children}
    </div>
  )
}

export default function ConfiguracoesPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [data, setData] = useState<Settings>({
    profile: { nome: "", crea: "", email: "", foto: "" },
    payment: { cardNumber: "", holderName: "", expiry: "", brand: "", last4: "" },
    preferences: { theme: "dark", notifications: true },
    updatedAt: "",
  })

  useEffect(() => {
    async function load() {
      try {
        const s = await settingsService.get()
        setData(s)
        document.documentElement.setAttribute("data-theme", s.preferences.theme)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  function updateProfile(field: keyof Settings["profile"], value: string) {
    setData((prev) => ({
      ...prev,
      profile: { ...prev.profile, [field]: value },
    }))
  }

  function updatePayment(field: keyof Settings["payment"], value: string) {
    setData((prev) => ({
      ...prev,
      payment: { ...prev.payment, [field]: value },
    }))
  }

  function toggleTheme() {
    const next = data.preferences.theme === "dark" ? "light" : "dark"
    setData((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, theme: next },
    }))
    document.documentElement.setAttribute("data-theme", next)
  }

  function toggleNotifications() {
    setData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        notifications: !prev.preferences.notifications,
      },
    }))
  }

  async function handleSave() {
    setSaving(true)
    try {
      await settingsService.update({
        profile: data.profile,
        payment: data.payment,
        preferences: data.preferences,
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="p-4 sm:p-6 text-text-secondary">
        Carregando configurações...
      </div>
    )
  }

  const maskedCard = data.payment.cardNumber
    ? `**** **** **** ${data.payment.last4}`
    : ""

  return (
    <div className="p-4 sm:p-6 max-w-3xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-text-primary">
          Configurações
        </h1>
        <p className="text-sm text-text-muted mt-1">
          Gerencie seu perfil, método de pagamento e preferências do sistema.
        </p>
      </div>

      <Section icon={User} title="Perfil" description="Atualize seus dados pessoais e foto">
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="h-16 w-16">
            <AvatarImage src={data.profile.foto} />
            <AvatarFallback className="bg-primary/20 text-primary text-lg">
              {data.profile.nome
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <Button variant="secondary" size="sm" className="text-xs">
              <Camera className="mr-1 h-3 w-3" /> Alterar foto
            </Button>
            <p className="text-[10px] text-text-muted mt-1">
              PNG, JPG ou GIF. Máximo 2MB.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-xs text-text-secondary">Nome completo</Label>
            <Input
              value={data.profile.nome}
              onChange={(e) => updateProfile("nome", e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs text-text-secondary">CREA profissional</Label>
            <Input
              value={data.profile.crea}
              onChange={(e) => updateProfile("crea", e.target.value)}
              className="mt-1"
            />
          </div>
          <div className="sm:col-span-2">
            <Label className="text-xs text-text-secondary">E-mail</Label>
            <Input
              type="email"
              value={data.profile.email}
              onChange={(e) => updateProfile("email", e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      </Section>

      <Section icon={CreditCard} title="Pagamento" description="Salve seu cartão para cobrança recorrente">
        <div className="space-y-4">
          {maskedCard && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-primary-subtle border border-primary/20">
              <CreditCard className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-text-primary">
                  {maskedCard}
                </p>
                <p className="text-xs text-text-muted">
                  {data.payment.brand} • Validade {data.payment.expiry}
                </p>
              </div>
            </div>
          )}
          <div>
            <Label className="text-xs text-text-secondary">Nome no cartão</Label>
            <Input
              value={data.payment.holderName}
              onChange={(e) => updatePayment("holderName", e.target.value)}
              placeholder="Nome como aparece no cartão"
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs text-text-secondary">Número do cartão</Label>
            <Input
              value={data.payment.cardNumber}
              onChange={(e) => {
                const raw = e.target.value.replace(/\D/g, "")
                const formatted = raw.replace(/(\d{4})(?=\d)/g, "$1 ").trim()
                updatePayment("cardNumber", formatted)
                if (raw.length >= 4) {
                  updatePayment("last4", raw.slice(-4))
                }
              }}
              placeholder="0000 0000 0000 0000"
              maxLength={19}
              className="mt-1"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-text-secondary">Validade</Label>
              <Input
                value={data.payment.expiry}
                onChange={(e) => {
                  let v = e.target.value.replace(/\D/g, "")
                  if (v.length >= 2) v = v.slice(0, 2) + "/" + v.slice(2, 4)
                  updatePayment("expiry", v.slice(0, 5))
                }}
                placeholder="MM/AA"
                maxLength={5}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs text-text-secondary">CVV</Label>
              <Input
                placeholder="123"
                maxLength={4}
                className="mt-1"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <Shield className="h-3 w-3" />
            Dados criptografados. Nunca armazenamos o CVV.
          </div>
        </div>
      </Section>

      <Section icon={Moon} title="Aparência" description="Personalize o visual do sistema">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {data.preferences.theme === "dark" ? (
              <Moon className="h-4 w-4 text-text-secondary" />
            ) : (
              <Sun className="h-4 w-4 text-text-secondary" />
            )}
            <div>
              <p className="text-sm text-text-primary">
                {data.preferences.theme === "dark" ? "Modo escuro" : "Modo claro"}
              </p>
              <p className="text-xs text-text-muted">
                {data.preferences.theme === "dark"
                  ? "O sistema está no modo escuro"
                  : "O sistema está no modo claro"}
              </p>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className={cn(
              "relative h-6 w-11 rounded-full transition-colors duration-200",
              data.preferences.theme === "dark" ? "bg-primary" : "bg-secondary"
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200",
                data.preferences.theme === "dark"
                  ? "translate-x-5"
                  : "translate-x-0"
              )}
            />
          </button>
        </div>
      </Section>

      <Section icon={Bell} title="Notificações" description="Controle como você recebe alertas do sistema">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="h-4 w-4 text-text-secondary" />
            <div>
              <p className="text-sm text-text-primary">Notificações por e-mail</p>
              <p className="text-xs text-text-muted">
                Receba lembretes de inspeções e laudos por e-mail
              </p>
            </div>
          </div>
          <button
            onClick={toggleNotifications}
            className={cn(
              "relative h-6 w-11 rounded-full transition-colors duration-200",
              data.preferences.notifications ? "bg-primary" : "bg-secondary"
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200",
                data.preferences.notifications ? "translate-x-5" : "translate-x-0"
              )}
            />
          </button>
        </div>
      </Section>

      <div className="flex items-center justify-between">
        <Button variant="secondary" size="sm">
          <Globe className="mr-1 h-3 w-3" /> Idioma: Português
        </Button>
        <Button
          size="sm"
          onClick={handleSave}
          disabled={saving}
          className="gap-1"
        >
          <Save className="h-3 w-3" />{" "}
          {saving ? "Salvando..." : saved ? "Salvo!" : "Salvar alterações"}
        </Button>
      </div>
    </div>
  )
}