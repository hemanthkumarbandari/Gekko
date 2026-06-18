'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { services } from '@/data/services'
import GlassCard from '@/components/ui/GlassCard'
import CountUp from '@/components/ui/CountUp'
import { cn } from '@/lib/utils'

const cardVariant = {
  hidden: { y: 55, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 },
  }),
}

const hoverVariant = {
  rest: { scale: 1, y: 0, boxShadow: '0 8px 32px rgba(26,95,122,0.12)' },
  hover: {
    scale: 1.015,
    y: -7,
    boxShadow: '0 28px 64px rgba(26,95,122,0.18)',
    transition: { type: 'spring', stiffness: 300, damping: 22 },
  },
}

export default function Services() {
  const barChartRef = useRef<HTMLDivElement>(null)

  // Animated bar chart for Data card
  useEffect(() => {
    const container = barChartRef.current
    if (!container) return
    const bars = container.querySelectorAll<HTMLDivElement>('.bar')
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          bars.forEach((bar) => {
            const height = bar.dataset.height ?? '50'
            bar.style.transform = `scaleY(1)`
            bar.style.height = height + '%'
          })
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" className="relative z-10 py-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="font-body text-glacier text-sm font-semibold tracking-widest uppercase mb-3">
            The Craft
          </p>
          <h2 className="font-display font-black text-[clamp(2.5rem,5vw,4.5rem)] text-white leading-tight">
            Six weapons.
            <br />
            <span className="text-glacier">Pick yours.</span>
          </h2>
        </motion.div>
        {/* Bento grid */}
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'auto',
          }}
        >
          {/* Card A — 3D Websites (large, spans 2 cols) */}
          <motion.div
            custom={0}
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{
              scale: 1.015,
              y: -7,
              boxShadow: '0 28px 64px rgba(26, 95, 122, 0.18)',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="col-span-2 row-span-1"
          >
            <GlassCard variant="gradient" className="h-full min-h-[280px] flex flex-col justify-between overflow-hidden">
              {/* CSS 3D cube */}
              <div className="absolute top-6 right-6 opacity-60">
                <div className="relative" style={{ width: 60, height: 60, perspective: '200px' }}>
                  <div
                    className="w-full h-full"
                    style={{
                      transformStyle: 'preserve-3d',
                      animation: 'spin-slow 8s linear infinite',
                      position: 'relative',
                    }}
                  >
                    {[
                      { transform: 'translateZ(30px)', bg: 'rgba(125,201,232,0.4)' },
                      { transform: 'rotateY(180deg) translateZ(30px)', bg: 'rgba(125,201,232,0.2)' },
                      { transform: 'rotateY(90deg) translateZ(30px)', bg: 'rgba(26,95,122,0.3)' },
                      { transform: 'rotateY(-90deg) translateZ(30px)', bg: 'rgba(26,95,122,0.2)' },
                      { transform: 'rotateX(90deg) translateZ(30px)', bg: 'rgba(184,228,247,0.4)' },
                      { transform: 'rotateX(-90deg) translateZ(30px)', bg: 'rgba(214,240,251,0.5)' },
                    ].map((face, i) => (
                      <div
                        key={i}
                        className="absolute inset-0 border border-glacier/40"
                        style={{ transform: face.transform, background: face.bg }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-glacier/20 flex items-center justify-center">
                  {(() => { const Icon = services[0].icon; return <Icon size={20} className="text-deep" /> })()}
                </div>
                <div>
                  <p className="font-body text-xs text-glacier font-semibold tracking-wider uppercase mb-1">
                    {services[0].tagline}
                  </p>
                  <h3 className="font-display font-bold text-2xl text-night">{services[0].title}</h3>
                  <p className="font-body text-sm text-deep/70 mt-2 max-w-sm leading-relaxed">
                    {services[0].body}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {services[0].tags.map((tag) => (
                  <span key={tag} className="bg-white/60 border border-glacier/30 rounded-full px-3 py-1 text-xs font-body text-deep font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Card B — Digital Products (tall) */}
          <motion.div
            custom={1}
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="col-span-1 row-span-2"
          >
            <GlassCard variant="glass" className="h-full min-h-[580px] flex flex-col justify-between">
              <div className="flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-deep/10 flex items-center justify-center">
                  {(() => { const Icon = services[1].icon; return <Icon size={20} className="text-deep" /> })()}
                </div>
                <h3 className="font-display font-bold text-xl text-night">{services[1].title}</h3>
                <p className="font-body text-sm text-deep/70 leading-relaxed">{services[1].body}</p>
              </div>
              {/* Minimal UI mockup */}
              <div className="mt-4 rounded-xl bg-white/60 border border-glacier/20 p-3">
                <div className="flex gap-1 mb-2">
                  {['bg-red-300', 'bg-yellow-300', 'bg-green-300'].map((c, i) => (
                    <div key={i} className={cn('w-2 h-2 rounded-full', c)} />
                  ))}
                </div>
                {[80, 60, 90, 50].map((w, i) => (
                  <div key={i} className="h-2 bg-glacier/25 rounded mb-1.5" style={{ width: `${w}%` }} />
                ))}
                <div className="h-8 bg-glacier/15 rounded mt-3" />
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {services[1].tags.map((tag) => (
                  <span key={tag} className="bg-glacier/15 border border-glacier/20 rounded-full px-2 py-0.5 text-xs font-body text-deep">
                    {tag}
                  </span>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Card C — UI/UX (dark) */}
          <motion.div
            custom={2}
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="col-span-1"
          >
            <GlassCard variant="dark" className="h-full min-h-[280px] flex flex-col justify-between">
              <div className="flex flex-col gap-2">
                <div className="w-10 h-10 rounded-xl bg-glacier/15 flex items-center justify-center">
                  {(() => { const Icon = services[2].icon; return <Icon size={20} className="text-glacier" /> })()}
                </div>
                <h3 className="font-display font-bold text-xl text-white">{services[2].title}</h3>
                <p className="font-body text-sm text-white/60 leading-relaxed">{services[2].body}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {services[2].tags.map((tag) => (
                  <span key={tag} className="bg-white/10 border border-white/15 rounded-full px-2 py-0.5 text-xs font-body text-white/70">
                    {tag}
                  </span>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Card D — Data Analytics (dark, with bar chart) */}
          <motion.div
            custom={3}
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="col-span-1"
          >
            <GlassCard variant="dark" className="h-full min-h-[280px] flex flex-col justify-between">
              <div className="flex flex-col gap-2">
                <div className="w-10 h-10 rounded-xl bg-glacier/15 flex items-center justify-center">
                  {(() => { const Icon = services[3].icon; return <Icon size={20} className="text-glacier" /> })()}
                </div>
                <h3 className="font-display font-bold text-xl text-white">{services[3].title}</h3>
              </div>
              {/* Animated bar chart */}
              <div ref={barChartRef} className="flex items-end gap-1.5 h-16 mt-3">
                {[65, 80, 45, 90, 70, 55, 85, 60].map((h, i) => (
                  <div
                    key={i}
                    className="bar flex-1 rounded-t-sm transition-all duration-700 ease-out bg-gradient-to-t from-deep to-glacier"
                    data-height={h}
                    style={{ height: 0, transitionDelay: `${i * 60}ms` }}
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {services[3].tags.map((tag) => (
                  <span key={tag} className="bg-white/10 border border-white/15 rounded-full px-2 py-0.5 text-xs font-body text-white/70">
                    {tag}
                  </span>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Card E — Performance (full width) */}
          <motion.div
            custom={4}
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="col-span-3"
          >
            <GlassCard variant="gradient" className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex flex-col gap-2">
                <div className="w-10 h-10 rounded-xl bg-white/60 flex items-center justify-center">
                  {(() => { const Icon = services[4].icon; return <Icon size={20} className="text-deep" /> })()}
                </div>
                <h3 className="font-display font-bold text-2xl text-night">{services[4].title}</h3>
                <p className="font-body text-sm text-deep/70 max-w-sm">{services[4].body}</p>
              </div>
              <div className="flex gap-8 md:gap-16">
                {[
                  { to: 99, suffix: '%', label: 'Lighthouse Score' },
                  { to: 40, suffix: 'ms', label: 'TTFB avg' },
                  { to: 100, suffix: '%', label: 'Core Web Vitals' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="font-display font-black text-4xl text-night">
                      <CountUp to={stat.to} suffix={stat.suffix} />
                    </p>
                    <p className="font-body text-xs text-deep/60 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
