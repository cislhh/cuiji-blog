'use client'

import { motion } from 'motion/react'
import { heroConfig } from '@/data/heroConfig'

export default function ContactSection() {
  return (
    <section className="flex h-screen flex-col items-center justify-center bg-black px-8">
      {/* 主标题 */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12 w-full max-w-5xl text-left text-4xl font-bold text-white md:text-5xl lg:text-7xl"
      >
        {heroConfig.contact.title}
      </motion.h1>

      {/* 邮箱地址 */}
      <motion.a
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        href={`mailto:${heroConfig.contact.email}`}
        className="w-full max-w-5xl text-left text-xl text-white transition-colors hover:text-gray-300 md:text-2xl lg:text-3xl"
      >
        {heroConfig.contact.email}
      </motion.a>
    </section>
  )
}
