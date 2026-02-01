'use client'

import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'

/**
 * SmoothScroll Component
 *
 * Provides smooth scrolling using Lenis library.
 * Wraps the entire app content to enable smooth scroll behavior.
 *
 * Configuration:
 * - duration: 1.2s for smooth feel
 * - easing: custom cubic ease-out for natural feel
 * - smoothWheel: enables smooth mouse wheel scrolling
 * - touchMultiplier: adjusted for mobile touch
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis instance
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    })

    // Request animation frame loop for smooth scrolling
    let rafId: number
    function raf(time: number) {
      lenisRef.current?.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Cleanup on unmount
    return () => {
      lenisRef.current?.destroy()
      cancelAnimationFrame(rafId)
    }
  }, [])

  return <>{children}</>
}
