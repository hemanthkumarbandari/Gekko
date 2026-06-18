'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUIStore } from '@/store/ui.store'

export default function Preloader() {
  const setPreloader = useUIStore((s) => s.setPreloader)
  const [phase, setPhase] = useState<1 | 2 | 3>(1)
  const [count, setCount] = useState(0)
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)
  const progressRef = useRef(0)

  useEffect(() => {
    // Phase 1 → 2 at 1.5s
    const t1 = setTimeout(() => setPhase(2), 1500)

    // Phase 2: count 0 → 100 over 1.3s
    const t2 = setTimeout(() => {
      const start = Date.now()
      const dur = 1300
      const tick = () => {
        const elapsed = Date.now() - start
        const progress = Math.min(elapsed / dur, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.round(eased * 100))
        setProgress(eased * 100)
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, 1600)

    // Phase 3 exit at 2.8s
    const t3 = setTimeout(() => {
      setPhase(3)
      setTimeout(() => {
        setVisible(false)
        setPreloader(true)
      }, 900)
    }, 2800)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [setPreloader])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#eaf7fd',
            zIndex: 10000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
          }}
        >
          {/* Gecko SVG */}
          <motion.svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Body */}
            <motion.ellipse
              cx="40"
              cy="44"
              rx="10"
              ry="18"
              stroke="#7dc9e8"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            />
            {/* Head */}
            <motion.circle
              cx="40"
              cy="22"
              r="7"
              stroke="#7dc9e8"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4, ease: 'easeOut' }}
            />
            {/* Front legs */}
            <motion.path
              d="M32 42 L20 36 M48 42 L60 36"
              stroke="#7dc9e8"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.6, ease: 'easeOut' }}
            />
            {/* Rear legs */}
            <motion.path
              d="M32 56 L18 64 M48 56 L62 64"
              stroke="#7dc9e8"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.8, ease: 'easeOut' }}
            />
            {/* Tail */}
            <motion.path
              d="M40 62 Q38 70 34 76"
              stroke="#7dc9e8"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.0, ease: 'easeOut' }}
            />
            {/* Eyes */}
            <motion.circle
              cx="37"
              cy="20"
              r="1.5"
              fill="#7dc9e8"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2, delay: 1.1 }}
            />
            <motion.circle
              cx="43"
              cy="20"
              r="1.5"
              fill="#7dc9e8"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2, delay: 1.15 }}
            />
          </motion.svg>

          {/* Phase 2: Counter */}
          {phase >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              style={{ textAlign: 'center' }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontSize: '3.5rem',
                  fontWeight: 800,
                  color: '#0d3a52',
                  lineHeight: 1,
                }}
              >
                {count}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '0.85rem',
                  fontWeight: 300,
                  color: '#7dc9e8',
                  marginTop: '0.5rem',
                  letterSpacing: '0.08em',
                }}
              >
                Loading Gekko...
              </div>
              {/* Progress bar */}
              <div
                style={{
                  marginTop: '1.5rem',
                  width: '200px',
                  height: '1px',
                  background: 'rgba(125,201,232,0.25)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                }}
              >
                <motion.div
                  style={{
                    height: '100%',
                    background: '#7dc9e8',
                    width: `${progress}%`,
                  }}
                />
              </div>
            </motion.div>
          )}

          {/* Phase 3: Crack exit overlay */}
          {phase === 3 && (
            <>
              {[
                { id: 'tl', clipPath: 'polygon(0 0, 50% 0, 40% 50%, 0 40%)', x: '-101%', y: '-101%' },
                { id: 'tr', clipPath: 'polygon(50% 0, 100% 0, 100% 40%, 60% 50%)', x: '101%', y: '-101%' },
                { id: 'bl', clipPath: 'polygon(0 40%, 40% 50%, 50% 100%, 0 100%)', x: '-101%', y: '101%' },
                { id: 'br', clipPath: 'polygon(60% 50%, 100% 40%, 100% 100%, 50% 100%)', x: '101%', y: '101%' },
              ].map((piece) => (
                <motion.div
                  key={piece.id}
                  initial={{ x: 0, y: 0 }}
                  animate={{ x: piece.x, y: piece.y }}
                  transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                  style={{
                    position: 'fixed',
                    inset: 0,
                    background: '#eaf7fd',
                    clipPath: piece.clipPath,
                    zIndex: 10001,
                  }}
                />
              ))}
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
