"use client"

import { useState, useRef, type ChangeEvent } from "react"
import { Camera, Trash2, ZoomIn, Upload } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ImageUploadProps {
  value: string | null
  onChange: (base64: string | null) => void
  label?: string
}

export function ImageUpload({ value, onChange, label = "Adicionar foto" }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(value)
  const [zoomed, setZoomed] = useState(false)

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Valida tamanho (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("A imagem deve ter no máximo 5MB.")
      return
    }

    // Valida tipo
    if (!file.type.startsWith("image/")) {
      alert("Selecione apenas imagens.")
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const base64 = reader.result as string
      setPreview(base64)
      onChange(base64)
    }
    reader.readAsDataURL(file)
  }

  const handleRemove = () => {
    setPreview(null)
    onChange(null)
    if (inputRef.current) inputRef.current.value = ""
  }

  const handleClick = () => {
    inputRef.current?.click()
  }

  return (
    <div className="space-y-2">
      {label && <p className="text-xs text-text-secondary">{label}</p>}

      <AnimatePresence mode="wait">
        {preview ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative group rounded-lg overflow-hidden border border-border bg-card"
          >
            <img
              src={preview}
              alt="Preview"
              className="w-full h-40 object-cover cursor-pointer"
              onClick={() => setZoomed(true)}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
              <button
                type="button"
                onClick={() => setZoomed(true)}
                className="p-1.5 rounded-full bg-white/90 text-text-primary hover:bg-white transition-colors"
                title="Ampliar"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="p-1.5 rounded-full bg-white/90 text-destructive hover:bg-white transition-colors"
                title="Remover foto"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="upload"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            type="button"
            onClick={handleClick}
            className="w-full h-32 flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary-subtle/30 transition-all cursor-pointer bg-card"
          >
            <div className="w-10 h-10 rounded-full bg-primary-subtle flex items-center justify-center">
              <Camera className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xs text-text-secondary">{label}</span>
            <span className="text-[10px] text-text-muted">PNG, JPG • Máx 5MB</span>
          </motion.button>
        )}
      </AnimatePresence>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFile}
        className="hidden"
      />

      {/* Modal de zoom */}
      <AnimatePresence>
        {zoomed && preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setZoomed(false)}
          >
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={preview}
              alt="Foto ampliada"
              className="max-w-full max-h-full rounded-lg shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              type="button"
              onClick={() => setZoomed(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
