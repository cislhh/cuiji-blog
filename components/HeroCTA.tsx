'use client'

import { motion } from 'motion/react'
import Link from 'next/link'

/**
 * HeroCTA Component
 *
 * Call-to-action buttons for main site navigation.
 * - "View Blog" links to /blog
 * - "View Projects" links to /projects
 *
 * Features glow effects and hover animations.
 */
export default function HeroCTA() {
  return (
    <motion.div
      className="flex gap-4 mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <Link href="/blog">
        <motion.button
          className="px-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-semibold rounded-lg glow-primary"
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(251, 191, 36, 0.5)' }}
          whileTap={{ scale: 0.95 }}
        >
          View Blog
        </motion.button>
      </Link>
      <Link href="/projects">
        <motion.button
          className="px-8 py-3 bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20"
          whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
          whileTap={{ scale: 0.95 }}
        >
          View Projects
        </motion.button>
      </Link>
    </motion.div>
  )
}
