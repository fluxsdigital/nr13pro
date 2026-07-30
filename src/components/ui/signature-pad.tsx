"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"

interface SignaturePadProps {
  value: string | null
  onChange: (base64: string | null) => void
  label?: string
  height?: number
}

export function SignaturePad({
  value,
  onChange,
  label = "Assinatura do PLH",
  height = 180,
}: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasDrawn, setHasDrawn] = useState(false)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    context.lineCap = "round"
    context.lineJoin = "round"
    context.strokeStyle = "#171717"
    context.lineWidth = 2.5
    setCtx(context)

    // If there's an existing signature, load it
    if (value) {
      const img = new Image()
      img.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.drawImage(img, 0, 0)
        setHasDrawn(true)
      }
      img.src = value
    }
  }, [value])

  const getPos = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }

    const rect = canvas.getBoundingClientRect()

    if ("touches" in e) {
      const touch = e.touches[0] || e.changedTouches[0]
      return {
        x: (touch.clientX - rect.left) * (canvas.width / rect.width),
        y: (touch.clientY - rect.top) * (canvas.height / rect.height),
      }
    }

    return {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height),
    }
  }, [])

  const startDrawing = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault()
      if (!ctx) return
      const pos = getPos(e)
      ctx.beginPath()
      ctx.moveTo(pos.x, pos.y)
      setIsDrawing(true)
      setHasDrawn(true)
    },
    [ctx, getPos]
  )

  const draw = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault()
      if (!isDrawing || !ctx) return
      const pos = getPos(e)
      ctx.lineTo(pos.x, pos.y)
      ctx.stroke()
    },
    [isDrawing, ctx, getPos]
  )

  const stopDrawing = useCallback(() => {
    if (!ctx || !isDrawing) return
    setIsDrawing(false)
    ctx.closePath()
    // Save to parent
    const dataUrl = canvasRef.current?.toDataURL("image/png") ?? null
    onChange(dataUrl)
  }, [ctx, isDrawing, onChange])

  const handleClear = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext("2d")
    if (!context) return
    context.clearRect(0, 0, canvas.width, canvas.height)
    setHasDrawn(false)
    setIsDrawing(false)
    onChange(null)
  }

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-text-secondary">{label}</p>
          {hasDrawn && (
            <button
              type="button"
              onClick={handleClear}
              className="text-[11px] text-destructive hover:text-destructive/80 transition-colors"
            >
              Limpar
            </button>
          )}
        </div>
      )}

      <div className="relative rounded-lg border border-border bg-white overflow-hidden">
        <canvas
          ref={canvasRef}
          width={600}
          height={height}
          className="w-full touch-none cursor-crosshair"
          style={{ height, minHeight: height }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />

        {/* Placeholder text */}
        {!hasDrawn && !value && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <p className="text-sm text-text-muted/50 font-serif italic">
              Assine aqui
            </p>
          </div>
        )}
      </div>

      <p className="text-[10px] text-text-muted">
        Desenhe sua assinatura usando o mouse ou touch.
      </p>
    </div>
  )
}
