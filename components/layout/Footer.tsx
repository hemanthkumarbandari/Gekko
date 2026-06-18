'use client'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 border-t border-glacier/20 bg-snow/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
              <ellipse cx="14" cy="16" rx="5" ry="8" stroke="#7dc9e8" strokeWidth="1.5" />
              <circle cx="14" cy="6" r="4" stroke="#7dc9e8" strokeWidth="1.5" />
              <path d="M10 15 L4 11 M18 15 L24 11" stroke="#7dc9e8" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M10 20 L4 25 M18 20 L24 25" stroke="#7dc9e8" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="font-display font-black text-base">
              <span className="text-night">Gek</span>
              <span className="text-glacier">ko</span>
            </span>
          </div>

          {/* Copy */}
          <p className="font-body text-xs text-deep/50 text-center">
            © {year} Gekko Digital Studio · Vijayawada → Worldwide ·{' '}
            <span className="text-glacier">Built to make your competitors uncomfortable.</span>
          </p>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {['Twitter', 'LinkedIn', 'GitHub'].map((s) => (
              <a
                key={s}
                href="#"
                className="font-body text-xs text-deep/50 hover:text-glacier transition-colors"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
