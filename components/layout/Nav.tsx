'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useUIStore } from '@/store/ui.store'
import { useScrollStore } from '@/store/scroll.store'
import MagneticButton from '@/components/ui/MagneticButton'
import { cn } from '@/lib/utils'

const links = [
  { label: 'Craft', href: '#services' },
  { label: 'The Proof', href: '#work' },
  { label: 'The Edge', href: '#edge' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const scrolled = useUIStore((s) => s.navScrolled)
  const setScrolled = useUIStore((s) => s.setNavScrolled)
  const mobileOpen = useUIStore((s) => s.mobileNavOpen)
  const setMobileOpen = useUIStore((s) => s.setMobileNav)
  const scrollY = useScrollStore((s) => s.scrollY)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [strokeDone, setStrokeDone] = useState(false)

  useEffect(() => {
    setScrolled(scrollY > 40)
  }, [scrollY, setScrolled])

  useEffect(() => {
    const t = setTimeout(() => setStrokeDone(true), 1500)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 3.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[100]"
      >
        <motion.div
          animate={{
            backdropFilter: scrolled ? 'blur(28px)' : 'blur(0px)',
            backgroundColor: scrolled ? 'rgba(9, 40, 58, 0.75)' : 'rgba(9, 40, 58, 0)',
            height: scrolled ? '52px' : '64px',
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={cn("border-b transition-colors duration-300", scrolled ? "border-white/10" : "border-transparent")}
        >
          <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group magnetic-target">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0"
              >
                <motion.ellipse
                  cx="14" cy="16" rx="5" ry="8"
                  stroke="#7dc9e8" strokeWidth="1.5"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 3.4, ease: 'easeOut' }}
                />
                <motion.circle
                  cx="14" cy="6" r="4"
                  stroke="#7dc9e8" strokeWidth="1.5"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 3.8, ease: 'easeOut' }}
                />
                <motion.path
                  d="M10 15 L4 11 M18 15 L24 11"
                  stroke="#7dc9e8" strokeWidth="1.5" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 4.0 }}
                />
                <motion.path
                  d="M10 20 L4 25 M18 20 L24 25"
                  stroke="#7dc9e8" strokeWidth="1.5" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 4.1 }}
                />
                <motion.path
                  d="M14 24 Q12 26 10 28"
                  stroke="#7dc9e8" strokeWidth="1.5" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, delay: 4.2 }}
                  className="group-hover:rotate-6 origin-top transition-transform"
                />
              </svg>
              <span className="font-display font-black text-[1.3rem] leading-none select-none">
                <span className="text-white">Gek</span>
                <span className="text-glacier">ko</span>
              </span>
            </a>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-8">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative font-body text-sm text-white/70 hover:text-white transition-colors py-1"
                  onMouseEnter={() => setHoveredLink(link.label)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {link.label}
                  <AnimatePresence>
                    {hoveredLink === link.label && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-0.5 left-0 right-0 h-px bg-glacier"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </AnimatePresence>
                </a>
              ))}
            </div>

            {/* Right side */}
            <div className="hidden md:flex items-center gap-4">
              {/* Availability pill */}
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5 cursor-default hover:bg-white/10 transition-colors">
                <motion.div
                  className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                />
                <span className="font-body text-xs text-white/90 font-medium tracking-wide">Available Now</span>
              </div>

              <MagneticButton as="div">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-glacier to-deep text-white font-body font-semibold text-sm px-5 py-2 rounded-full hover:shadow-ice transition-shadow"
                >
                  Start a Project →
                </a>
              </MagneticButton>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </motion.div>

        {/* Mobile panel */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden bg-night/95 backdrop-blur-2xl border-b border-white/10"
            >
              <div className="px-6 py-6 flex flex-col gap-4">
                {links.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.06 }}
                    className="font-display font-bold text-2xl text-white border-b border-glacier/20 pb-3"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <a
                  href="#contact"
                  className="mt-2 inline-flex justify-center bg-glacier text-white font-semibold text-sm px-6 py-3 rounded-full"
                  onClick={() => setMobileOpen(false)}
                >
                  Start a Project →
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}
