import type { Metadata } from 'next'
import { Syne, Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/layout/Providers'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Gekko — Premium 3D Web Studio | Digital Products & Brand Experiences',
  description:
    'Gekko is a premium freelance studio specializing in 3D websites, digital products, data analytics, and brand experiences. Built for founders, CTOs, and brand directors who refuse mediocrity.',
  keywords: [
    'WebGL studio',
    '3D websites',
    'Next.js development',
    'digital products',
    'brand experiences',
    'data analytics',
    'Vijayawada',
  ],
  openGraph: {
    title: 'Gekko — Premium 3D Web Studio',
    description: 'Sharp. Adaptive. Relentless. Digital experiences that make your competitors uncomfortable.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gekko — Premium 3D Web Studio',
    description: 'Sharp. Adaptive. Relentless.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <body className="font-body theme-dark-bg text-white/95 overflow-x-hidden">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
