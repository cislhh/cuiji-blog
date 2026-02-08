'use client'

import { motion } from 'motion/react'
import PersonalTagline from './PersonalTagline'
import LearningPanel from './LearningPanel'
import DataStatsPanel from './DataStatsPanel'
import HeroCTA from './HeroCTA'

/**
 * HeroSection Component
 *
 * Main immersive hero section for the homepage.
 * Contains all personal elements:
 * - Personal tagline with gradient text
 * - Brief introduction
 * - Learning/Using tech panel
 * - Data statistics panel
 * - CTA buttons
 *
 * Layout: Full-screen with centered content.
 */
export default function HeroSection() {
  return (
    <section className="-mt-20 flex min-h-screen items-center justify-center px-4">
      <div className="mx-auto max-w-4xl text-center">
        <PersonalTagline />

        <motion.p
          className="mx-auto mb-8 max-w-2xl text-lg text-gray-400 md:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          I'm a passionate developer crafting beautiful digital experiences. Exploring the
          intersection of design and technology, one project at a time.
        </motion.p>

        <div className="mb-8 flex flex-col gap-4 md:flex-row">
          <div className="flex-1">
            <LearningPanel />
          </div>
          <div className="flex-1">
            <DataStatsPanel />
          </div>
        </div>

        <HeroCTA />
      </div>
    </section>
  )
}
