'use client'

import dynamic from 'next/dynamic'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import Work from '@/components/sections/Work'
import Edge from '@/components/sections/Edge'
import Contact from '@/components/sections/Contact'
import ScrollProgress from '@/components/ui/ScrollProgress'
import Preloader from '@/components/ui/Preloader'
import SnowEffect from '@/components/ui/SnowEffect'
const Cursor = dynamic(() => import('@/components/ui/Cursor'), { ssr: false })

export default function Home() {
  return (
    <>
      <SnowEffect />
      {/* Preloader */}
      <Preloader />

      {/* Custom cursor — desktop only */}
      <Cursor />

      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Page chrome */}
      <Nav />

      {/* Main content */}
      <main className="relative">
        <Hero />
        <Services />
        <Work />
        <Edge />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
