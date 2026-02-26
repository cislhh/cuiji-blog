'use client'

import { motion } from 'motion/react'
import { heroConfig } from '@/data/heroConfig'

/**
 * LearningPanel Component
 *
 * Displays technologies currently being learned/used.
 * Grid layout with hover effects on each tech item.
 *
 * Data source: heroConfig.techStack in data/heroConfig.ts
 */
export default function LearningPanel() {
  const techStack = heroConfig.techStack

  return (
    <motion.div
      className="glass-panel mb-6 rounded-2xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h3 className="mb-4 text-lg font-semibold text-gray-300">Currently Learning & Using</h3>
      <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
        {techStack.map((tech, index) => (
          <motion.div
            key={tech.name}
            className={`flex flex-col items-center justify-center rounded-lg p-3 transition-all duration-300 ${tech.color} cursor-default bg-white/5 hover:bg-white/10`}
            whileHover={{ scale: 1.05, y: -2 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.05 }}
          >
            <span className="mb-1 text-2xl">{tech.icon}</span>
            <span className="text-xs text-gray-400">{tech.name}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
