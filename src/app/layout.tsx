import type { Metadata } from "next"
import { Inter, Lora } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"
import { AppShell } from "@/components/layout/app-shell"
import { PwaRegister } from "@/components/ui/pwa-register"

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
})

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "NR-13 Pro — Gestão de Conformidade de Equipamentos",
  description:
    "Plataforma completa para inspeção, classificação e emissão de laudos técnicos conforme a NR-13.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "NR-13 Pro",
  },
  icons: {
    apple: "/icons/icon-192.svg",
  },
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${lora.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.svg" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('theme');
                if (theme === 'dark') {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full bg-background text-foreground">
        <AppShell>{children}</AppShell>
        <PwaRegister />
        <Toaster richColors closeButton />
      </body>
    </html>
  )
}
