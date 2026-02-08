'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

export default function IntroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  const paragraphs = [
    "I'm a software engineer who loves building things for the web. I specialize in creating beautiful, functional, and user-friendly applications.",
    'With a passion for open source, I contribute to various projects and share my knowledge through blog posts and tutorials.',
    'When I am not coding, you can find me exploring new technologies, reading about software architecture, or enjoying a good cup of coffee.',
  ]

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-6 py-20">
      <motion.div
        style={{ opacity }}
        className="max-w-3xl mx-auto space-y-8"
      >
        {paragraphs.map((paragraph, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="text-lg text-text-secondary leading-relaxed"
          >
            {paragraph}
          </motion.p>
        ))}
      </motion.div>
    </section>
  )
}
