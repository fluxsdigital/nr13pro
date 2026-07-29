"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { useReducedMotion } from "@/components/landing/motion-provider"
import { ScreenCarousel } from "@/components/landing/screen-carousel"

export function MacbookMockup() {
  const containerRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const parallaxY = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : 40, reduced ? 0 : -40])
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.15], [reduced ? 0.95 : 0.88, 1])

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [reduced ? 0 : 3, reduced ? 0 : -3]), {
    stiffness: 120,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [reduced ? 0 : -3, reduced ? 0 : 3]), {
    stiffness: 120,
    damping: 20,
  })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (reduced) return
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      mouseX.set((e.clientX - rect.left) / rect.width)
      mouseY.set((e.clientY - rect.top) / rect.height)
    },
    [mouseX, mouseY, reduced]
  )

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5)
    mouseY.set(0.5)
  }, [mouseX, mouseY])

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-lg mx-auto perspective-[1000px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          y: parallaxY,
          opacity,
          scale,
        }}
        className="relative origin-center"
      >
        {/* Screen */}
        <div className="relative rounded-[20px] overflow-hidden bg-[#1a1a1a] shadow-[0_8px_40px_rgba(20,20,19,0.12),0_2px_8px_rgba(20,20,19,0.08)]">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-24 h-1.5 bg-[#1a1a1a] rounded-b-lg" />

          {/* Screen content */}
          <div className="relative aspect-[16/10] bg-white overflow-hidden rounded-[16px] m-[3px]">
            <ScreenCarousel />
          </div>
        </div>

        {/* Keyboard base */}
        <div className="relative mx-auto -mt-[2px] w-[102%] rounded-b-[12px] bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] p-[3px]">
          <div className="rounded-b-[10px] bg-[#2a2a2a] px-8 py-4">
            <div className="flex justify-center gap-[3px]">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="h-1.5 w-2 rounded-[1px] bg-[#3a3a3a]" />
              ))}
            </div>
            <div className="flex justify-center gap-[3px] mt-[2px]">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="h-1.5 w-2 rounded-[1px] bg-[#3a3a3a]" />
              ))}
            </div>
            <div className="flex justify-center mt-[3px]">
              <div className="h-1.5 w-6 rounded-[1px] bg-[#3a3a3a]" />
            </div>
          </div>
        </div>

        {/* Screen glow */}
        <div className="absolute -inset-2 -z-10 rounded-[24px] bg-primary/5 blur-xl opacity-60" />
      </motion.div>
    </div>
  )
}
