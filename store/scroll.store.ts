import { create } from 'zustand'

interface ScrollState {
  scrollY: number
  scrollProgress: number
  velocity: number
  direction: 'up' | 'down'
  setScrollY: (y: number) => void
  setScrollProgress: (p: number) => void
  setVelocity: (v: number) => void
  setDirection: (d: 'up' | 'down') => void
}

export const useScrollStore = create<ScrollState>((set) => ({
  scrollY: 0,
  scrollProgress: 0,
  velocity: 0,
  direction: 'down',
  setScrollY: (y) => set({ scrollY: y }),
  setScrollProgress: (p) => set({ scrollProgress: p }),
  setVelocity: (v) => set({ velocity: v }),
  setDirection: (d) => set({ direction: d }),
}))
