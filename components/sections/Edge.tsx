'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import CountUp from '@/components/ui/CountUp'
import Marquee from '@/components/ui/Marquee'
import { useScrollStore } from '@/store/scroll.store'

const edges = [
  {
    title: 'Precision Grip',
    body: 'We don\'t take on everything. We take on what we can make extraordinary. Every engagement is senior-level, zero handoffs.',
  },
  {
    title: 'Moves Fast',
    body: 'No waiting for 6 agency approval rounds. We ship working code in days, not months. Speed without sloppiness.',
  },
  {
    title: 'Sees Everything',
    body: 'Business goals, user psychology, technical constraints — we hold all of it in view. The result is work that actually moves metrics.',
  },
  {
    title: 'Adapts Relentlessly',
    body: 'Markets pivot, products evolve, visions shift. We\'re structured to move with you, not against you.',
  },
]

const brands = [
  'Alpine Co', 'DataCrystal', 'NovaMed', 'Solara', 'Orca', 'Meridian', 'Vanta', 'Prism', 'Strata',
]

const cardFlipVariant = {
  hidden: { rotateY: 90, opacity: 0 },
  visible: (i: number) => ({
    rotateY: 0,
    opacity: 1,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Edge() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const scrollY = useScrollStore((s) => s.scrollY)
  const scrollRef = useRef(0)

  // Wave canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let t = 0
    let frame: number

    const draw = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const layers = [
        { amplitude: 18, freq: 0.008, speed: 0.6, yOff: 0.6 },
        { amplitude: 12, freq: 0.012, speed: 0.9, yOff: 0.7 },
        { amplitude: 22, freq: 0.006, speed: 0.4, yOff: 0.8 },
      ]

      layers.forEach((layer) => {
        ctx.beginPath()
        ctx.strokeStyle = 'rgba(125,201,232,0.055)'
        ctx.lineWidth = 1.5
        const baseY = canvas.height * layer.yOff + scrollRef.current * 0.04

        for (let x = 0; x <= canvas.width; x += 2) {
          const y = baseY + Math.sin(x * layer.freq + t * layer.speed) * layer.amplitude
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      })

      t += 0.02
      frame = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  useEffect(() => {
    scrollRef.current = scrollY
  }, [scrollY])

  return (
    <section
      id="edge"
      className="relative z-10 py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0d3a52 0%, #1a5f7a 100%)' }}
    >
      {/* Wave canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.7 }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-body text-glacier text-sm font-semibold tracking-widest uppercase mb-3">
            The Gekko Edge
          </p>
          <h2 className="font-display font-black text-[clamp(2.5rem,5vw,4.5rem)] text-white leading-tight">
            Why serious brands
            <br />
            <span className="text-glacier">don&apos;t settle.</span>
          </h2>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { value: 40, suffix: '+', label: 'Brands shipped' },
            { value: 98, suffix: '%', label: 'Client retention' },
            { value: 6, suffix: 'wk', label: 'Avg delivery' },
            { value: 4, suffix: '×', label: 'Avg ROI lift' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="font-display font-black text-5xl text-glacier">
                <CountUp to={stat.value} suffix={stat.suffix} />
              </p>
              <p className="font-body text-sm text-white/50 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Differentiator cards — 2×2 grid with 3D flip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16" style={{ perspective: '1200px' }}>
          {edges.map((edge, i) => (
            <motion.div
              key={edge.title}
              custom={i}
              variants={cardFlipVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="rounded-2xl p-6 border"
              style={{
                background: 'rgba(255,255,255,0.07)',
                borderColor: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 rounded-full bg-glacier" />
                <h3 className="font-display font-bold text-lg text-white">{edge.title}</h3>
              </div>
              <p className="font-body text-sm text-white/60 leading-relaxed">{edge.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Brand marquee */}
        <div className="border-t border-white/10 pt-10">
          <p className="font-body text-xs text-white/30 uppercase tracking-widest text-center mb-6">
            Trusted by
          </p>
          <Marquee speed={18}>
            {brands.map((brand) => (
              <span
                key={brand}
                className="font-display font-bold text-xl text-white/20 mx-8 hover:text-white/40 transition-colors cursor-default"
              >
                {brand}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  )
}
