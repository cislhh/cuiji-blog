'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue } from 'motion/react'

/**
 * Particle Interface
 *
 * Represents a single particle in the trail effect.
 */
interface Particle {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  color: string
}

/**
 * ParticleTrail Component
 *
 * Creates a firefly/starfield style particle trail that follows the mouse cursor.
 * Uses Motion free APIs only - no Motion+ paid features.
 *
 * Particle Behavior:
 * - Spawn rate: 1-3 particles per mouse movement
 * - Size: 2-6px random
 * - Color: Warm tones (gold/amber) matching dark theme
 * - Lifetime: 800-1500ms
 * - Motion: Slight drift + fade out
 *
 * Performance Notes:
 * - Particles are cleaned up after animation completes
 * - Maximum 100 particles to prevent memory issues
 * - Uses AnimatePresence for exit animations
 */
export default function ParticleTrail() {
  const [particles, setParticles] = useState<Particle[]>([])
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const particleIdRef = useRef(0)

  /**
   * Creates a new particle at the current mouse position.
   * Randomizes size, color, and lifetime for variety.
   */
  const createParticle = useCallback(
    (x: number, y: number) => {
      // Color palette for particles (warm amber/gold tones)
      const colors = [
        'rgba(251, 191, 36, 0.6)', // amber-400
        'rgba(252, 211, 77, 0.5)', // amber-300
        'rgba(245, 158, 11, 0.7)', // amber-500
      ]
      return {
        id: particleIdRef.current++,
        x,
        y,
        size: Math.random() * 4 + 2, // 2-6px
        opacity: Math.random() * 0.4 + 0.4, // 0.4-0.8
        color: colors[Math.floor(Math.random() * colors.length)],
      }
    },
    []
  )

  /**
   * Handles mouse movement and spawns particles.
   * Throttled to prevent excessive particle creation.
   */
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseX.set(e.clientX)
    mouseY.set(e.clientY)

    // Spawn 1-3 particles per movement
    const particleCount = Math.floor(Math.random() * 3) + 1
    const newParticles = Array.from({ length: particleCount }, () =>
      createParticle(e.clientX, e.clientY)
    )

    setParticles((prev) => {
      // Limit total particles to prevent performance issues
      const combined = [...prev, ...newParticles]
      if (combined.length > 100) {
        return combined.slice(combined.length - 100)
      }
      return combined
    })
  }, [mouseX, mouseY, createParticle])

  /**
   * Removes a particle after its animation completes.
   */
  const removeParticle = useCallback((id: number) => {
    setParticles((prev) => prev.filter((p) => p.id !== id))
  }, [])

  /**
   * Sets up mouse move listener on mount.
   * Cleans up on unmount.
   */
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleMouseMove])

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <AnimatePresence mode="popLayout">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full blur-sm"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1, 0.5],
              opacity: [particle.opacity, particle.opacity * 0.5, 0],
              x: (Math.random() - 0.5) * 50, // Slight drift
              y: (Math.random() - 0.5) * 50,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: Math.random() * 0.7 + 0.8, // 800-1500ms
              ease: 'easeOut',
            }}
            onAnimationComplete={() => removeParticle(particle.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
