"use client"

import { createContext, useContext, useEffect, useState } from "react"

type MotionContextType = {
  prefersReducedMotion: boolean
}

const MotionContext = createContext<MotionContextType>({ prefersReducedMotion: false })

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  return (
    <MotionContext.Provider value={{ prefersReducedMotion }}>
      {children}
    </MotionContext.Provider>
  )
}

export function useReducedMotion() {
  return useContext(MotionContext)
}
