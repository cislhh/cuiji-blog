'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { heroConfig } from '@/data/heroConfig'

/**
 * HeroCTA Component
 *
 * Call-to-action buttons for main site navigation.
 * - Primary button links to configured href (default: /blog)
 * - Secondary button links to configured href (default: /projects)
 *
 * Features glow effects and hover animations.
 */
export default function HeroCTA() {
  return (
    <motion.div
      className="mt-8 flex gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <Link href={heroConfig.cta.primary.href}>
        <motion.button
          className="glow-primary-amber rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 px-8 py-3 font-semibold text-black"
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(251, 191, 36, 0.5)' }}
          whileTap={{ scale: 0.95 }}
        >
          {heroConfig.cta.primary.text}
        </motion.button>
      </Link>
      <Link href={heroConfig.cta.secondary.href}>
        <motion.button
          className="rounded-lg border border-white/20 bg-white/10 px-8 py-3 font-semibold text-white hover:bg-white/20"
          whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
          whileTap={{ scale: 0.95 }}
        >
          {heroConfig.cta.secondary.text}
        </motion.button>
      </Link>
    </motion.div>
  )
}
