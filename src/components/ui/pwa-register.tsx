"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Download } from "lucide-react"

export function PwaRegister() {
  const [installPrompt, setInstallPrompt] = useState<Event | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true)
      return
    }

    // Listen for install prompt
    const handler = (e: Event) => {
      e.preventDefault()
      setInstallPrompt(e)
      setShowPrompt(true)
    }
    window.addEventListener("beforeinstallprompt", handler)

    // Check if installed
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true)
      setShowPrompt(false)
    })

    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  // Register service worker
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // SW registration failed (expected in dev)
      })
    }
  }, [])

  const handleInstall = async () => {
    if (!installPrompt) return
    ;(installPrompt as any).prompt()
    const result = await (installPrompt as any).userChoice
    if (result.outcome === "accepted") {
      setShowPrompt(false)
    }
  }

  return (
    <AnimatePresence>
      {showPrompt && !isInstalled && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 z-50 max-w-sm mx-auto"
        >
          <div className="bg-card border border-border rounded-lg shadow-lg p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shrink-0">
              <Download className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary">Instalar NR-13 Pro</p>
              <p className="text-xs text-text-muted">Instale para acesso rápido offline</p>
            </div>
            <button
              onClick={handleInstall}
              className="px-3 py-1.5 rounded-md bg-primary text-white text-xs font-medium hover:bg-primary-hover transition-colors shrink-0"
            >
              Instalar
            </button>
            <button
              onClick={() => setShowPrompt(false)}
              className="p-1.5 text-text-muted hover:text-text-secondary transition-colors shrink-0"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
