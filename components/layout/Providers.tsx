'use client'

import { createContext, useContext, useEffect, useRef } from 'react'
import type { LenisInstance } from '@/lib/lenis'
import { createLenis } from '@/lib/lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useScrollStore } from '@/store/scroll.store'
import { useUIStore } from '@/store/ui.store'

export const LenisContext = createContext<LenisInstance | null>(null)

export function useLenisContext() {
  return useContext(LenisContext)
}

interface ProvidersProps {
  children: React.ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  const lenisRef = useRef<LenisInstance | null>(null)
  const setScrollY = useScrollStore((s) => s.setScrollY)
  const setScrollProgress = useScrollStore((s) => s.setScrollProgress)
  const setVelocity = useScrollStore((s) => s.setVelocity)
  const setDirection = useScrollStore((s) => s.setDirection)
  const preloaderDone = useUIStore((s) => s.preloaderDone)

  useEffect(() => {
    const lenis = createLenis()
    lenisRef.current = lenis

    // Sync Lenis RAF with GSAP ticker
    const onTick = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    // Sync scroll data to Zustand
    lenis.on('scroll', ({ scroll, progress, velocity, direction }: {
      scroll: number
      progress: number
      velocity: number
      direction: number
    }) => {
      setScrollY(scroll)
      setScrollProgress(progress)
      setVelocity(velocity)
      setDirection(direction > 0 ? 'down' : 'up')
    })

    // Feed Lenis to ScrollTrigger
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop() {
        return lenis.scroll
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
      },
    })

    return () => {
      gsap.ticker.remove(onTick)
      lenis.destroy()
      ScrollTrigger.clearScrollMemory()
    }
  }, [setScrollY, setScrollProgress, setVelocity, setDirection])

  // Pause Lenis during preloader
  useEffect(() => {
    if (!lenisRef.current) return
    if (preloaderDone) {
      lenisRef.current.start()
    } else {
      lenisRef.current.stop()
    }
  }, [preloaderDone])

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  )
}
