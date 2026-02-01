'use client'

import { motion } from 'motion/react'
import { useEffect, useState } from 'react'

/**
 * DataStatsPanel Component
 *
 * Displays site statistics with animated counters.
 * - Blog post count
 * - Project count
 * - Years of experience
 *
 * Uses intersection observer to trigger animation when visible.
 */
interface StatItem {
  label: string
  value: number
  suffix?: string
}

export default function DataStatsPanel() {
  const [isVisible, setIsVisible] = useState(false)
  const [counts, setCounts] = useState({ posts: 0, projects: 0, experience: 0 })

  // These would normally come from actual data
  const stats: StatItem[] = [
    { label: 'Blog Posts', value: 12 },
    { label: 'Projects', value: 8 },
    { label: 'Years Coding', value: 5, suffix: '+' },
  ]

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  }, [isVisible])

  return (
    <motion.div
      className="glass-panel rounded-2xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      onViewportEnter={() => setIsVisible(true)}
    >
      <h3 className="text-lg font-semibold text-gray-300 mb-4">Site Statistics</h3>
      <div className="grid grid-cols-3 gap-4">
        <motion.div
          className="text-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="text-3xl font-bold text-amber-400">{counts.posts}</div>
          <div className="text-sm text-gray-400 mt-1">Blog Posts</div>
        </motion.div>
        <motion.div
          className="text-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="text-3xl font-bold text-blue-400">{counts.projects}</div>
          <div className="text-sm text-gray-400 mt-1">Projects</div>
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
          <div className="text-sm text-gray-400 mt-1">Years Coding</div>
        </motion.div>
      </div>
    </motion.div>
  )
}
