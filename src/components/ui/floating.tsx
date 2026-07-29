"use client"

import { motion } from "framer-motion"
import { useReducedMotion } from "@/components/sections/motion-provider"

type FloatingProps = {
  children: React.ReactNode
  y?: number
  rotate?: number
  duration?: number
  className?: string
}

export function Floating({
  children,
  y = 4,
  rotate = 0.2,
  duration = 8,
  className,
}: FloatingProps) {
  const { prefersReducedMotion } = useReducedMotion()

  if (prefersReducedMotion) return <>{children}</>

  return (
    <motion.div
      animate={{
        y: [0, -y, 0],
        rotateZ: [0, rotate, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
