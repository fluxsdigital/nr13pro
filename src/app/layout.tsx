import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"
import { Sidebar } from "@/components/layout/sidebar"
import { SidebarProvider } from "@/lib/sidebar-context"
import { MainContent } from "@/components/layout/main-content"

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
        <SidebarProvider>
          <Sidebar />
          <MainContent>{children}</MainContent>
        </SidebarProvider>
        <Toaster richColors closeButton />
      </body>
    </html>
  )
}
