"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { cn } from "@/lib/utils"
import {
  DashboardSlide,
  ValvesSlide,
  InspectionsSlide,
  InspectionDetailSlide,
  ReportsSlide,
  PdfSlide,
  AgendaSlide,
  ConfigSlide,
} from "@/components/landing/carousel-slides"

const slides = [
  { id: "dashboard", label: "Dashboard", component: DashboardSlide },
  { id: "valves", label: "Válvulas", component: ValvesSlide },
  { id: "inspections", label: "Inspeções", component: InspectionsSlide },
  { id: "detail", label: "Detalhes", component: InspectionDetailSlide },
  { id: "reports", label: "Relatórios", component: ReportsSlide },
  { id: "pdf", label: "Laudo PDF", component: PdfSlide },
  { id: "agenda", label: "Agenda", component: AgendaSlide },
  { id: "config", label: "Config.", component: ConfigSlide },
]

export function ScreenCarousel() {
  const [hovering, setHovering] = useState(false)
  const autoplayRef = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, playOnInit: true })
  )

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, dragFree: false, align: "start" },
    [autoplayRef.current]
  )

  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on("select", onSelect)
    onSelect()
  }, [emblaApi, onSelect])

  useEffect(() => {
    if (hovering) {
      autoplayRef.current.stop()
    } else {
      autoplayRef.current.play()
    }
  }, [hovering])

  const scrollTo = (index: number) => emblaApi?.scrollTo(index)

  return (
    <div
      className="relative w-full h-full flex flex-col"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="overflow-hidden flex-1" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((s) => (
            <s.component key={s.id} />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-1.5 px-4 pb-3 pt-2">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => scrollTo(i)}
            className={cn(
              "h-1 rounded-full transition-all duration-300",
              i === selectedIndex
                ? "w-5 bg-primary"
                : "w-1.5 bg-border hover:bg-text-muted"
            )}
            aria-label={`Slide ${i + 1}: ${s.label}`}
          />
        ))}
      </div>
    </div>
  )
}
