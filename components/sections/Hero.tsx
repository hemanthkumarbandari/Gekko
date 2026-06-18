'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useMousePosition } from '@/hooks/useMousePosition'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import MagneticButton from '@/components/ui/MagneticButton'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const childVariants = {
  hidden: { y: 44, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const panelARef = useRef<HTMLDivElement>(null)
  const panelBRef = useRef<HTMLDivElement>(null)
  const panelCRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const mouse = useMousePosition()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // 3D tilt for the mock panel group
  const rotX = useMotionValue(0)
  const rotY = useMotionValue(0)
  const springX = useSpring(rotX, { stiffness: 80, damping: 16 })
  const springY = useSpring(rotY, { stiffness: 80, damping: 16 })

  useEffect(() => {
    if (reduced) return
    rotX.set(-mouse.normalizedY * 8)
    rotY.set(mouse.normalizedX * 10)
  }, [mouse, rotX, rotY, reduced])

  // GSAP ScrollTrigger parallax
  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        gsap.to(headlineRef.current, {
          y: -80,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }
      if (panelARef.current) {
        gsap.to([panelARef.current, panelBRef.current, panelCRef.current], {
          y: 40,
          opacity: 0.6,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '60% top',
            scrub: 1.2,
          },
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [reduced])

  // Animated sine-wave line chart in canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    canvas.width = 220
    canvas.height = 80
    let frame: number
    let t = 0

    const draw = () => {
      ctx.clearRect(0, 0, 220, 80)
      ctx.beginPath()
      ctx.strokeStyle = '#7dc9e8'
      ctx.lineWidth = 2
      ctx.lineCap = 'round'
      for (let x = 0; x <= 220; x++) {
        const y = 40 + Math.sin((x / 220) * Math.PI * 3 + t) * 18 +
                  Math.sin((x / 220) * Math.PI * 6 + t * 1.4) * 7
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
      t += 0.02
      frame = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative z-10 min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Top Left White Fog */}
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-white/10 blur-[120px] pointer-events-none -z-10" />
      
      {/* Bottom Right White Fog */}
      <div className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-white/10 blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-12 lg:gap-8 items-center">
          {/* LEFT — Copy */}
          <motion.div
            ref={headlineRef}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            {/* Eyebrow pill */}
            <motion.div variants={childVariants}>
              <span className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-md border border-glacier/30 rounded-full px-4 py-2 font-body text-xs font-medium text-deep">
                <Sparkles size={12} className="text-glacier" />
                ✦ Digital Studio · Vijayawada → Worldwide
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div variants={childVariants} className="flex flex-col">
              <h1 className="font-display font-black leading-[0.95] tracking-tight text-white">
                <div
                  className="text-[clamp(3rem,6vw,5.5rem)]"
                >
                  We don&apos;t make
                </div>
                <div className="relative inline-block text-[clamp(3rem,6vw,5.5rem)]">
                  websites.
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{ originX: 0 }}
                    className="absolute left-0 bottom-3 right-0 h-[1.5px] bg-glacier"
                  />
                </div>
                <div className="text-[clamp(3rem,6vw,5.5rem)]">We engineer</div>
                <div className="text-[clamp(3rem,6vw,5.5rem)] bg-gradient-to-r from-glacier via-deep to-night bg-clip-text text-transparent">
                  obsessions.
                </div>
              </h1>
            </motion.div>

            {/* Sub */}
            <motion.p
              variants={childVariants}
              className="font-body text-lg text-white/80 max-w-md leading-relaxed"
            >
              3D worlds. Live data. Digital products.
              <br />
              Built to make your competitors uncomfortable.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={childVariants} className="flex flex-wrap items-center gap-4">
              <MagneticButton>
                <a
                  href="#contact"
                  className="relative overflow-hidden inline-flex items-center gap-2 bg-gradient-to-r from-glacier to-deep text-white font-body font-semibold px-7 py-3.5 rounded-full group"
                >
                  <span className="relative z-10">Start a Project</span>
                  <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    animate={{ x: ['-100%', '150%'] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
                  />
                </a>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-md border border-glacier/40 text-deep font-body font-semibold px-7 py-3.5 rounded-full hover:bg-white/70 transition-colors"
                >
                  See the work
                </a>
              </MagneticButton>
            </motion.div>

            {/* Trust line */}
            <motion.div variants={childVariants} className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {['#1a5f7a', '#7dc9e8', '#b8e4f7'].map((color, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.2 + i * 0.08 }}
                    className="w-8 h-8 rounded-full border-2 border-snow"
                    style={{ background: `radial-gradient(circle at 35% 35%, ${color}aa, ${color})` }}
                  />
                ))}
              </div>
              <span className="font-body text-sm text-white/70">40+ brands shipped</span>
            </motion.div>
          </motion.div>

          {/* RIGHT — CSS 3D floating panels */}
          <motion.div
            style={{
              perspective: '1200px',
              rotateX: springX,
              rotateY: springY,
            }}
            className="relative h-[480px] hidden lg:flex items-center justify-center"
          >
            {/* Panel A — Main Dashboard */}
            <motion.div
              ref={panelARef}
              animate={reduced ? {} : { y: [-14, 14] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', repeatType: 'reverse' }}
              className="absolute w-72 bg-white/70 backdrop-blur-xl border border-white/60 rounded-2xl shadow-glass p-4"
              style={{ top: '10%', left: '0%', zIndex: 3 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-body text-xs text-deep/50">Revenue</p>
                  <p className="font-display font-bold text-xl text-night">$2.4M</p>
                </div>
                <div className="bg-glacier/20 text-glacier rounded-full px-2 py-0.5 text-xs font-semibold">
                  +34%
                </div>
              </div>
              <canvas ref={canvasRef} className="w-full h-16 rounded-lg" style={{ display: 'block' }} />
            </motion.div>

            {/* Panel B — Stat */}
            <motion.div
              ref={panelBRef}
              animate={reduced ? {} : { y: [8, -16] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', repeatType: 'reverse', delay: 0.5 }}
              className="absolute w-44 bg-gradient-to-br from-glacier/90 to-deep backdrop-blur-xl border border-white/30 rounded-2xl shadow-deep p-4"
              style={{ top: '45%', right: '2%', zIndex: 4 }}
            >
              <p className="font-body text-xs text-white/70 mb-1">Conversion</p>
              <p className="font-display font-black text-3xl text-white">3.2×</p>
              <p className="font-body text-xs text-white/60 mt-1">vs. previous</p>
            </motion.div>

            {/* Panel C — Browser chrome */}
            <motion.div
              ref={panelCRef}
              animate={reduced ? {} : { y: [6, -10] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', repeatType: 'reverse', delay: 1 }}
              className="absolute w-64 bg-white/60 backdrop-blur-xl border border-white/50 rounded-xl shadow-glass overflow-hidden"
              style={{ bottom: '5%', left: '15%', zIndex: 2 }}
            >
              {/* Browser chrome bar */}
              <div className="flex items-center gap-1.5 px-3 py-2 bg-white/50 border-b border-white/40">
                <div className="w-2 h-2 rounded-full bg-red-300" />
                <div className="w-2 h-2 rounded-full bg-yellow-300" />
                <div className="w-2 h-2 rounded-full bg-green-300" />
                <div className="flex-1 bg-white/60 rounded-full px-3 py-0.5 text-[10px] font-body text-deep/50 ml-2">
                  gekko.studio
                </div>
              </div>
              <div className="p-3">
                <div className="h-2 bg-glacier/30 rounded mb-2 w-3/4" />
                <div className="h-2 bg-glacier/20 rounded mb-2 w-full" />
                <div className="h-2 bg-glacier/20 rounded w-2/3" />
                <div className="mt-3 h-12 bg-gradient-to-r from-ice to-mist rounded-lg" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
