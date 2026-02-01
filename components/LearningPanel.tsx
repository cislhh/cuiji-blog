'use client'

import { motion } from 'motion/react'

/**
 * LearningPanel Component
 *
 * Displays technologies currently being learned/used.
 * Grid layout with hover effects on each tech item.
 *
 * Data source: Can be extended to read from a config file.
 */
const techStack = [
  { name: 'React', icon: '', color: 'hover:text-cyan-400' },
  { name: 'Next.js', icon: '', color: 'hover:text-white' },
  { name: 'TypeScript', icon: '', color: 'hover:text-blue-400' },
  { name: 'Tailwind', icon: '', color: 'hover:text-teal-400' },
  { name: 'Node.js', icon: '', color: 'hover:text-green-400' },
  { name: 'Vue', icon: '', color: 'hover:text-green-500' },
]

export default function LearningPanel() {
  return (
    <motion.div
      className="glass-panel rounded-2xl p-6 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h3 className="text-lg font-semibold text-gray-300 mb-4">
        Currently Learning & Using
      </h3>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {techStack.map((tech, index) => (
          <motion.div
            key={tech.name}
            className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-300 ${tech.color} bg-white/5 hover:bg-white/10 cursor-default`}
            whileHover={{ scale: 1.05, y: -2 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.05 }}
          >
            <span className="text-2xl mb-1">{tech.icon}</span>
            <span className="text-xs text-gray-400">{tech.name}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
