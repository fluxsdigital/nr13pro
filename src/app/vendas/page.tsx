import type { Metadata } from "next"
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

export const metadata: Metadata = {
  title: "NR-13 Pro — Plataforma de Inspeção de Válvulas | Conformidade NR-13",
  description:
    "Software profissional para inspeção de válvulas industriais conforme NR-13. QR Code, laudos PDF automáticos, assinatura digital e armazenamento em nuvem.",
  openGraph: {
    title: "NR-13 Pro — Inspeção de Válvulas Profissional",
    description:
      "Cadastre válvulas, inspecione em campo com QR Code, gere laudos PDF e mantenha tudo na nuvem.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "NR-13 Pro — Inspeção de Válvulas Profissional",
    description:
      "Cadastre válvulas, inspecione em campo com QR Code, gere laudos PDF e mantenha tudo na nuvem.",
  },
  keywords: [
    "NR-13",
    "inspeção de válvulas",
    "laudo NR-13",
    "software inspeção",
    "QR Code válvulas",
    "gestão de ativos",
    "conformidade NR-13",
  ],
  robots: "index, follow",
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "NR-13 Pro",
      url: "https://nr13pro.vercel.app",
      description:
        "Plataforma completa para gestão de inspeções de válvulas conforme a NR-13.",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+55-19-99223-2149",
        contactType: "sales",
      },
    },
    {
      "@type": "SoftwareApplication",
      name: "NR-13 Pro",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "Software para inspeção de válvulas industriais com QR Code, laudos PDF automáticos e assinatura digital.",
      offers: {
        "@type": "Offer",
        price: "179",
        priceCurrency: "BRL",
      },
    },
  ],
}

export default function VendasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
    </>
  )
}
