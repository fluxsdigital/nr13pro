"use client"

import { Monitor, Tablet, Smartphone } from "lucide-react"
import { Section } from "@/components/landing/section"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

const devices = [
  {
    icon: Monitor,
    label: "Desktop",
    desc: "Painel web completo",
    size: "w-full h-48",
  },
  {
    icon: Tablet,
    label: "Tablet",
    desc: "Inspeção em campo",
    size: "w-3/4 h-40 mx-auto",
  },
  {
    icon: Smartphone,
    label: "Celular",
    desc: "QR Code e fotos",
    size: "w-1/2 h-36 mx-auto",
  },
]

export function Showcase() {
  return (
    <Section
      title="Funciona em qualquer dispositivo"
      subtitle="Desktop para gestão, tablet e celular para inspeção em campo. Tudo sincronizado na nuvem."
    >
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {devices.map((device, i) => (
          <DeviceCard key={device.label} device={device} index={i} />
        ))}
      </div>
    </Section>
  )
}

function DeviceCard({
  device,
  index,
}: {
  device: { icon: React.ElementType; label: string; desc: string; size: string }
  index: number
}) {
  const { ref, isVisible } = useScrollAnimation()
  const Icon = device.icon

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-border bg-white p-6 text-center transition-all duration-500 hover:shadow-card-hover",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary-subtle">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-text-primary">{device.label}</h3>
      <p className="text-sm text-text-secondary">{device.desc}</p>
      <div className="mt-6 rounded-xl border border-border bg-card-hover p-4">
        <div className={cn("rounded-lg border border-border bg-white", device.size)}>
          <div className="flex items-center gap-1 border-b border-border px-3 py-2">
            <div className="h-2 w-2 rounded-full bg-danger/50" />
            <div className="h-2 w-2 rounded-full bg-warning/50" />
            <div className="h-2 w-2 rounded-full bg-success/50" />
          </div>
          <div className="p-3 space-y-2">
            <div className="h-2 w-3/4 rounded bg-card-hover" />
            <div className="h-2 w-1/2 rounded bg-card-hover" />
            <div className="h-2 w-5/6 rounded bg-card-hover" />
          </div>
        </div>
      </div>
    </div>
  )
}
