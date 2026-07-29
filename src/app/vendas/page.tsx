"use client"

import { useEffect, useRef } from "react"
import type { Metadata } from "next"
import Lenis from "lenis"
import { MotionProvider } from "@/components/landing/motion-provider"
import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { Logos } from "@/components/landing/logos"
import { Benefits } from "@/components/landing/benefits"
import { Problem } from "@/components/landing/problem"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Showcase } from "@/components/landing/showcase"
import { Features } from "@/components/landing/features"
import { DashboardPreview } from "@/components/landing/dashboard-preview"
import { Differentials } from "@/components/landing/differentials"
import { Testimonials } from "@/components/landing/testimonials"
import { FAQ } from "@/components/landing/faq"
import { CTA } from "@/components/landing/cta"
import { Footer } from "@/components/landing/footer"

export default function VendasPage() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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
      <div className="min-h-dvh bg-background text-text-primary">
        <Navbar />
        <Hero />
        <Logos />
        <Benefits />
        <Problem />
        <HowItWorks />
        <Showcase />
        <Features />
        <DashboardPreview />
        <Differentials />
        <Testimonials />
        <FAQ />
        <CTA />
        <Footer />
      </div>
    </MotionProvider>
  )
}
