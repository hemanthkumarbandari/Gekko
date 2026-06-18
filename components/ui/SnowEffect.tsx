'use client'

import { useEffect, useRef } from 'react'

export default function SnowEffect() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const snowContainer = containerRef.current
    if (!snowContainer) return

    // Clear existing flakes if re-rendered
    snowContainer.innerHTML = ''

    const snowChars = ["❄", "❅", "❆", "✻", "✼", "•"]

    for (let i = 0; i < 35; i++) {
      const flake = document.createElement("span")
      flake.className = "snowflake"
      
      // Randomize character
      flake.textContent = snowChars[Math.floor(Math.random() * snowChars.length)]

      // Randomize size
      const size = Math.random() * 10 + 6
      flake.style.fontSize = size + "px"
      
      // Randomize initial position
      flake.style.left = Math.random() * 100 + "%"
      flake.style.top = Math.random() * -100 + "vh"
      
      // Randomize opacity
      flake.style.opacity = (Math.random() * 0.2 + 0.15).toString()

      // Randomize animation speed and delay for organic feel
      const duration = Math.random() * 12 + 8
      const delay = Math.random() * -duration

      flake.style.animationDuration = duration + "s"
      flake.style.animationDelay = delay + "s"

      // Append to container
      snowContainer.appendChild(flake)
    }

    return () => {
      if (snowContainer) snowContainer.innerHTML = ''
    }
  }, [])

  return (
    <div 
      id="snowContainer" 
      ref={containerRef} 
      className="snow-container fixed inset-0 z-0 pointer-events-none" 
    />
  )
}
