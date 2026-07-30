import type { Metadata } from "next"
import { Inter, Lora } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"
import { AppShell } from "@/components/layout/app-shell"

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
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${lora.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full bg-background text-foreground">
        <AppShell>{children}</AppShell>
        <Toaster richColors closeButton />
      </body>
    </html>
  )
}
