'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '@/data/projects'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { Project } from '@/types/project'
import { cn } from '@/lib/utils'

function ProjectMockup({ project }: { project: Project }) {
  const themeColors = {
    light: { bg: 'from-ice to-snow', accent: project.mockupAccent },
    dark: { bg: 'from-night to-deep', accent: project.mockupAccent },
    warm: { bg: 'from-amber-50 to-orange-50', accent: project.mockupAccent },
  }
  const theme = themeColors[project.mockupTheme]

  return (
    <div
      className={cn(
        'w-full h-full rounded-2xl overflow-hidden border border-white/30 shadow-glass',
        `bg-gradient-to-br ${theme.bg}`
      )}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/20 bg-white/20">
        <div className="w-2.5 h-2.5 rounded-full bg-red-300/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-300/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-300/80" />
        <div className="flex-1 ml-3 bg-white/30 rounded-full px-3 py-0.5 text-[10px] font-body opacity-70">
          {project.url === '#' ? `${project.id}.com` : project.url}
        </div>
      </div>
      {/* Content area */}
      <div className="p-6 flex flex-col gap-3">
        <div
          className="w-16 h-16 rounded-xl opacity-80"
          style={{ background: `${project.mockupAccent}33` }}
        />
        <div className="h-3 rounded-full bg-current opacity-20 w-3/4" />
        <div className="h-3 rounded-full bg-current opacity-15 w-full" />
        <div className="h-3 rounded-full bg-current opacity-10 w-2/3" />
        <div
          className="mt-2 h-24 rounded-xl"
          style={{ background: `linear-gradient(135deg, ${project.mockupAccent}22, ${project.mockupAccent}55)` }}
        />
        <div className="flex gap-3 mt-2">
          {project.stats.map((stat) => (
            <div key={stat.label} className="flex-1 bg-white/25 rounded-lg p-3">
              <p className="font-display font-bold text-lg" style={{ color: project.mockupAccent }}>
                {stat.value}
              </p>
              <p className="font-body text-[10px] opacity-60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProjectRow({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  const isEven = index % 2 === 0
  const textVariant = {
    hidden: { x: isEven ? -45 : 45, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  }
  const mockupVariant = {
    hidden: { x: isEven ? 45 : -45, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <div className={cn('grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-20 border-b border-glacier/15')}>
      {/* Text */}
      <motion.div
        variants={textVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className={cn('flex flex-col gap-5', !isEven && 'lg:order-2')}
      >
        <div className="flex items-center gap-3">
          <span className="font-body text-xs text-glacier font-bold tracking-widest">{project.index}</span>
          <span className="w-8 h-px bg-glacier/40" />
          <span className="font-body text-xs text-deep/50 uppercase tracking-wider">{project.category}</span>
        </div>
        <h3 className="font-display font-black text-[clamp(2rem,4vw,3.5rem)] text-night leading-none">
          {project.title}
        </h3>
        <p className="font-body text-base text-deep/70 leading-relaxed max-w-md">
          {project.description}
        </p>
        <div className="flex gap-6">
          {project.stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display font-black text-2xl text-glacier">{stat.value}</p>
              <p className="font-body text-xs text-deep/50 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
        <motion.a
          href={project.url}
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-2 text-deep font-body font-semibold text-sm group w-fit hover:text-glacier transition-colors"
        >
          Case Study
          <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </motion.a>
      </motion.div>

      {/* Mockup */}
      <motion.div
        variants={mockupVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        whileHover={{ scale: 1.028 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className={cn('h-72 lg:h-96', !isEven && 'lg:order-1')}
      >
        <ProjectMockup project={project} />
      </motion.div>
    </div>
  )
}

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  // Horizontal scroll for projects 3 & 4 (index 2 & 3)
  useEffect(() => {
    if (reduced) return
    const track = trackRef.current
    const sticky = stickyRef.current
    if (!track || !sticky) return

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: '-50%',
        ease: 'none',
        scrollTrigger: {
          trigger: sticky,
          start: 'top top',
          end: '+=200%',
          scrub: 1,
          pin: true,
        },
      })
    })

    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={sectionRef} id="work" className="relative z-10 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <p className="font-body text-glacier text-sm font-semibold tracking-widest uppercase mb-3">
            The Proof
          </p>
          <h2 className="font-display font-black text-[clamp(2.5rem,5vw,4.5rem)] text-night leading-tight">
            Not portfolios.
            <br />
            <span className="text-glacier">Battle records.</span>
          </h2>
        </motion.div>

        {/* Projects 1 & 2 — regular rows */}
        <ProjectRow project={projects[0]} index={0} />
        <ProjectRow project={projects[1]} index={1} />

        {/* Projects 3 & 4 — horizontal sticky scroll */}
        <div ref={stickyRef} className="relative overflow-hidden" style={{ height: '100vh' }}>
          <div
            ref={trackRef}
            className="absolute top-0 left-0 h-full flex"
            style={{ width: '200%' }}
          >
            {[projects[2], projects[3]].map((project, i) => (
              <div key={project.id} className="w-1/2 h-full px-6 flex items-center">
                <div className="grid grid-cols-2 gap-10 items-center w-full">
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-3">
                      <span className="font-body text-xs text-glacier font-bold tracking-widest">{project.index}</span>
                      <span className="w-8 h-px bg-glacier/40" />
                      <span className="font-body text-xs text-deep/50 uppercase tracking-wider">{project.category}</span>
                    </div>
                    <h3 className="font-display font-black text-5xl text-night">{project.title}</h3>
                    <p className="font-body text-base text-deep/70 leading-relaxed">{project.description}</p>
                    <div className="flex gap-6">
                      {project.stats.map((stat) => (
                        <div key={stat.label}>
                          <p className="font-display font-black text-2xl text-glacier">{stat.value}</p>
                          <p className="font-body text-xs text-deep/50">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="h-80">
                    <ProjectMockup project={project} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project 5 — regular row */}
        <ProjectRow project={projects[4]} index={4} />
      </div>
    </section>
  )
}
