"use client"

import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { slides } from "./carousel-slides"
import { useReducedMotion } from "./motion-provider"

export function HeroCarousel() {
  const { prefersReducedMotion } = useReducedMotion()
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", skipSnaps: false },
    [Autoplay({ delay: 5000, stopOnInteraction: false })],
  )
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on("select", onSelect)
    onSelect()
    return () => { emblaApi.off("select", onSelect) }
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    if (isHovered) {
      emblaApi.plugins().autoplay?.stop()
    } else {
      emblaApi.plugins().autoplay?.play()
    }
  }, [emblaApi, isHovered])

  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi])
  const onPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const onNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, i) => {
            const isActive = i === selectedIndex
            return (
              <div
                key={slide.id}
                className="flex-[0_0_100%] min-w-0"
                style={{
                  transition: prefersReducedMotion ? "none" : "opacity 0.5s ease, transform 0.5s ease",
                  opacity: prefersReducedMotion ? 1 : isActive ? 1 : 0.35,
                  transform: prefersReducedMotion ? "none" : isActive ? "scale(1)" : "scale(0.96)",
                }}
              >
                <div className="min-h-[320px] sm:min-h-[360px]">
                  {slide.content}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <button
        onClick={onPrev}
        aria-label="Slide anterior"
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 border border-[#EDE9E3] flex items-center justify-center text-[#676767] hover:text-[#171717] hover:bg-white transition-all shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      <button
        onClick={onNext}
        aria-label="Próximo slide"
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 border border-[#EDE9E3] flex items-center justify-center text-[#676767] hover:text-[#171717] hover:bg-white transition-all shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>

      <div className="flex justify-center gap-1.5 pb-4 pt-3">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => scrollTo(index)}
            aria-label={`Slide ${slide.name}`}
            className="transition-all duration-300 rounded-full"
            style={{
              width: index === selectedIndex ? 24 : 6,
              height: 6,
              backgroundColor: index === selectedIndex ? "#C56A2D" : "#D4CFC8",
              transform: `scale(${index === selectedIndex ? 1 : 0.85})`,
            }}
            onMouseEnter={(e) => { if (index !== selectedIndex) e.currentTarget.style.backgroundColor = "#676767" }}
            onMouseLeave={(e) => { if (index !== selectedIndex) e.currentTarget.style.backgroundColor = "#D4CFC8" }}
          />
        ))}
      </div>
    </div>
  )
}
