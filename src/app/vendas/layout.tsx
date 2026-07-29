import type { Metadata } from "next"

const siteUrl = "https://nr13pro.com.br"

export const metadata: Metadata = {
  title: {
    default: "NR-13 Pro | Software para Inspeção de Válvulas",
    template: "%s | NR-13 Pro",
  },
  description:
    "Software completo para gestão de inspeção de válvulas conforme NR-13. Cadastro, QR Code, laudos PDF, assinatura digital e histórico na nuvem.",
  keywords: [
    "NR-13",
    "inspeção de válvulas",
    "laudo técnico",
    "válvula de segurança",
    "gestão de inspeção",
    "software NR-13",
    "QR Code válvula",
    "laudo PDF",
    "inspeção industrial",
  ],
  authors: [{ name: "NR-13 Pro" }],
  creator: "NR-13 Pro",
  publisher: "NR-13 Pro",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "NR-13 Pro",
    title: "NR-13 Pro | Software para Inspeção de Válvulas",
    description:
      "Software completo para gestão de inspeção de válvulas conforme NR-13. Cadastro, QR Code, laudos PDF, assinatura digital e histórico na nuvem.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "NR-13 Pro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NR-13 Pro | Software para Inspeção de Válvulas",
    description:
      "Software completo para gestão de inspeção de válvulas conforme NR-13.",
    images: [`${siteUrl}/og-image.png`],
    creator: "@nr13pro",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "NR-13 Pro",
      url: siteUrl,
      logo: `${siteUrl}/logo.png`,
      description:
        "Software para gestão de inspeção de válvulas conforme NR-13.",
      address: {
        "@type": "PostalAddress",
        addressCountry: "BR",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#software`,
      name: "NR-13 Pro",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "Software completo para gestão de inspeção de válvulas conforme NR-13. Cadastro, QR Code, laudos PDF, assinatura digital e histórico na nuvem.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "BRL",
      },
      author: {
        "@id": `${siteUrl}/#organization`,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "NR-13 Pro",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    },
  ],
}

export default function VendasLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}
