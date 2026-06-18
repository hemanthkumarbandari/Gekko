'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  variant?: 'gradient' | 'glass' | 'dark'
  onMouseMove?: (e: React.MouseEvent<HTMLDivElement>) => void
}

const variantStyles = {
  gradient:
    'bg-gradient-to-br from-ice to-mist border border-white/60 shadow-glass',
  glass:
    'bg-white/45 border border-white/60 shadow-glass backdrop-blur-xl',
  dark:
    'bg-night/90 border border-white/10 shadow-deep backdrop-blur-xl',
}

export default function GlassCard({
  children,
  className,
  variant = 'glass',
  onMouseMove,
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      ref.current.style.setProperty('--mx', `${e.clientX - rect.left}px`)
      ref.current.style.setProperty('--my', `${e.clientY - rect.top}px`)
    }
    onMouseMove?.(e)
  }

  return (
    <div
      ref={ref}
      className={cn(
        'relative overflow-hidden rounded-2xl p-6 transition-all duration-300',
        'before:absolute before:inset-0 before:rounded-2xl before:pointer-events-none',
        'before:bg-[radial-gradient(220px_at_var(--mx,50%)_var(--my,50%),rgba(125,201,232,0.14),transparent_70%)]',
        variantStyles[variant],
        className
      )}
      onMouseMove={handleMouseMove}
    >
      {children}
    </div>
  )
}
