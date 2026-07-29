"use client"

import { motion } from "framer-motion"
import { useReducedMotion } from "@/components/sections/motion-provider"

type FadeInProps = {
  children: React.ReactNode
  delay?: number
  y?: number
  blur?: number
  scale?: number
  duration?: number
  className?: string
}

export function FadeIn({
  children,
  delay = 0,
  y = 0,
  blur = 0,
  scale = 1,
  duration = 0.6,
  className,
}: FadeInProps) {
  const { prefersReducedMotion } = useReducedMotion()

  if (prefersReducedMotion) return <>{children}</>

  return (
    <motion.div
      initial={{ opacity: 0, y, filter: `blur(${blur}px)`, scale }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
      transition={{ duration, ease: [0.25, 0.1, 0.25, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
