'use client'

import { motion } from 'motion/react'

/**
 * PersonalTagline Component
 *
 * Displays the site owner's main tagline with subtle animation.
 * Features:
 * - Large, prominent typography
 * - Fade-in + slide-up animation on mount
 * - Gradient text effect
 */
export default function PersonalTagline() {
  return (
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
        Building the Future
      </h1>
      <p className="mt-4 text-xl md:text-2xl text-gray-400">
        One line of code at a time
      </p>
    </motion.div>
  )
}
