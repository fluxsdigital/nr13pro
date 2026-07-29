"use client"

import { useRef, useCallback } from "react"
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion"
import { useReducedMotion } from "./motion-provider"
import { HeroCarousel } from "./hero-carousel"
import { Floating } from "@/components/ui/floating"

export function SafariMockup() {
  const { prefersReducedMotion } = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [2, -2]), { stiffness: 120, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-2, 2]), { stiffness: 120, damping: 20 })

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [20, -20])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (prefersReducedMotion) return
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
    },
    [mouseX, mouseY, prefersReducedMotion],
  )

  const handleMouseLeave = useCallback(() => {
    if (prefersReducedMotion) return
    mouseX.set(0)
    mouseY.set(0)
  }, [mouseX, mouseY, prefersReducedMotion])

  const mockupContent = (
    <motion.div
      style={prefersReducedMotion ? {} : { rotateX, rotateY, y }}
      className="relative perspective-[1200px]"
    >
      <div className="relative mx-auto max-w-[800px] w-full">
        <div className="relative bg-white rounded-[10px] shadow-[0_8px_30px_rgba(23,23,23,0.12),0_1px_3px_rgba(23,23,23,0.06)] overflow-hidden">
          <div className="flex items-center gap-1.5 px-4 pt-3 pb-2 bg-[#F7F5F2] border-b border-[#EDE9E3]">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840]" />
            <div className="flex-1 flex items-center justify-center mx-4">
              <div className="bg-white border border-[#EDE9E3] rounded-md px-3 py-1 text-xs text-[#676767] flex items-center gap-2 max-w-[300px] w-full">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M2 12h20"/>
                  <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
                </svg>
                <span className="truncate">app.nr13pro.com.br</span>
              </div>
            </div>
            <div className="flex gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#9E9E9E]">
                <path d="M12 19V5M5 12l7-7 7 7"/>
              </svg>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#9E9E9E]">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </div>
          </div>
          <div className="bg-white">
            <HeroCarousel />
          </div>
        </div>
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[60%] h-3 bg-black/5 blur-xl rounded-full" />
      </div>
    </motion.div>
  )

  return (
    <div ref={containerRef} className="relative w-full" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {prefersReducedMotion ? (
        mockupContent
      ) : (
        <Floating y={4} rotate={0.2} duration={8}>
          {mockupContent}
        </Floating>
      )}
    </div>
  )
}
