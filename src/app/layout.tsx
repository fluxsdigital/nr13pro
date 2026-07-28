import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"
import { Sidebar } from "@/components/layout/sidebar"

const inter = Inter({
  variable: "--font-sans",
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
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex bg-slate-50 text-slate-900">
        <Sidebar />
        <main className="flex-1 ml-64 min-h-screen">{children}</main>
        <Toaster richColors closeButton />
      </body>
    </html>
  )
}
