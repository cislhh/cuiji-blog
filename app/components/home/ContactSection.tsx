'use client'

import { motion } from 'motion/react'

export default function ContactSection() {
  return (
    <section className="h-screen bg-black dark:bg-black flex flex-col items-center justify-center px-8">
      {/* 主标题 */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl lg:text-7xl font-bold text-white text-left w-full max-w-5xl mb-12"
      >
        Let&apos;s make something
        <br />
        great together
      </motion.h1>

      {/* 邮箱地址 */}
      <motion.a
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        href="mailto:hi@dalelarroder.com"
        className="text-xl md:text-2xl lg:text-3xl text-white hover:text-gray-300 transition-colors text-left w-full max-w-5xl"
      >
        hi@dalelarroder.com
      </motion.a>
    </section>
  )
}
