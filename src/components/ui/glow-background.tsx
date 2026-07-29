"use client"

import { useEffect, useState } from "react"

type Blob = {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  opacity: number
}

const blobs: Blob[] = [
  { id: 0, x: 20, y: 30, size: 500, duration: 40, delay: 0, opacity: 0.04 },
  { id: 1, x: 70, y: 60, size: 400, duration: 35, delay: -10, opacity: 0.03 },
  { id: 2, x: 50, y: 20, size: 350, duration: 45, delay: -5, opacity: 0.025 },
]

export function GlowBackground() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {blobs.map((blob) => (
        <div
          key={blob.id}
          className="absolute rounded-full"
          style={{
            width: blob.size,
            height: blob.size,
            left: `${blob.x}%`,
            top: `${blob.y}%`,
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(197, 106, 45, 0.08) 0%, transparent 70%)",
            animation: `blob-move-${blob.id} ${blob.duration}s ease-in-out infinite`,
            animationDelay: `${blob.delay}s`,
            opacity: blob.opacity,
          }}
        />
      ))}
      <style>{`
        ${blobs.map(
          (blob) => `
          @keyframes blob-move-${blob.id} {
            0%, 100% { transform: translate(-50%, -50%) translate(0, 0); }
            25% { transform: translate(-50%, -50%) translate(${Math.sin(blob.id * 2.1) * 80}px, ${Math.cos(blob.id * 1.7) * 60}px); }
            50% { transform: translate(-50%, -50%) translate(${Math.cos(blob.id * 1.3) * 100}px, ${Math.sin(blob.id * 2.3) * -70}px); }
            75% { transform: translate(-50%, -50%) translate(${Math.sin(blob.id * 1.9) * -60}px, ${Math.cos(blob.id * 2.7) * 80}px); }
          }
        `,
        ).join("\n")}
      `}</style>
    </div>
  )
}
