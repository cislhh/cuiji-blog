'use client'

import { motion } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'
import { heroConfig } from '@/data/heroConfig'

/**
 * DataStatsPanel Component
 *
 * Displays site statistics with animated counters.
 * - Blog post count
 * - Project count
 * - Years of experience
 *
 * Uses intersection observer to trigger animation when visible.
 * Data source: heroConfig.statistics in data/heroConfig.ts
 */
interface StatItem {
  label: string
  value: number
  suffix?: string
}

export default function DataStatsPanel() {
  const [isVisible, setIsVisible] = useState(false)
  const [counts, setCounts] = useState({ posts: 0, projects: 0, experience: 0 })

  // Statistics from config
  const stats: StatItem[] = useMemo(
    () => [
      { label: 'Blog Posts', value: heroConfig.statistics.posts },
      { label: 'Projects', value: heroConfig.statistics.projects },
      { label: 'Years Coding', value: heroConfig.statistics.yearsOfExperience, suffix: '+' },
    ],
    []
  )

  useEffect(() => {
    if (isVisible) {
      // Animate counts
      const duration = 1500
      const steps = 60
      const interval = duration / steps

      stats.forEach((stat, index) => {
        let step = 0
        const timer = setInterval(() => {
          step++
          const progress = step / steps
          const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic

          if (index === 0) {
            setCounts((prev) => ({ ...prev, posts: Math.round(stat.value * eased) }))
          } else if (index === 1) {
            setCounts((prev) => ({ ...prev, projects: Math.round(stat.value * eased) }))
          } else if (index === 2) {
            setCounts((prev) => ({ ...prev, experience: Math.round(stat.value * eased) }))
          }

          if (step >= steps) clearInterval(timer)
        }, interval)
      })
    }
  }, [isVisible, stats])

  return (
    <motion.div
      className="glass-panel rounded-2xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      onViewportEnter={() => setIsVisible(true)}
    >
      <h3 className="mb-4 text-lg font-semibold text-gray-300">Site Statistics</h3>
      <div className="grid grid-cols-3 gap-4">
        <motion.div
          className="text-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="text-3xl font-bold text-amber-400">{counts.posts}</div>
          <div className="mt-1 text-sm text-gray-400">Blog Posts</div>
        </motion.div>
        <motion.div
          className="text-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="text-3xl font-bold text-blue-400">{counts.projects}</div>
          <div className="mt-1 text-sm text-gray-400">Projects</div>
        </motion.div>
        <motion.div
          className="text-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="text-3xl font-bold text-purple-400">
            {counts.experience}
            {stats[2].suffix}
          </div>
          <div className="mt-1 text-sm text-gray-400">Years Coding</div>
        </motion.div>
      </div>
    </motion.div>
  )
}
