"use client"

import { useEffect, useRef } from "react"
import Lenis from "lenis"
import { MotionProvider } from "@/components/sections/motion-provider"
import { Navbar } from "@/components/sections/navbar"
import { Hero } from "@/components/sections/hero"
import { Logos } from "@/components/sections/logos"
import { Benefits } from "@/components/sections/benefits"
import { Problem } from "@/components/sections/problem"
import { Timeline } from "@/components/sections/timeline"
import { DashboardPreview } from "@/components/sections/dashboard"
import { Features } from "@/components/sections/features"
import { Testimonials } from "@/components/sections/testimonials"
import { FAQ } from "@/components/sections/faq"
import { CTA } from "@/components/sections/cta"
import { Footer } from "@/components/sections/footer"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import { GlowBackground } from "@/components/ui/glow-background"
import { WhatsAppCapture } from "@/components/sections/whatsapp-capture"

export default function VendasPage() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <MotionProvider>
      <ScrollProgress />
      <GlowBackground />
      <div className="min-h-dvh relative z-10" style={{ backgroundColor: "#F7F5F2", color: "#171717" }}>
        <Navbar />
        <Hero />
        <Logos />
        <Benefits />
        <Problem />
        <Timeline />
        <DashboardPreview />
        <Features />
        <Testimonials />
        <FAQ />
        <CTA />
        <Footer />
      </div>
      <WhatsAppCapture />
    </MotionProvider>
  )
}
