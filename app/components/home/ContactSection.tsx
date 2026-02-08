'use client'

import React from 'react'
import { motion } from 'motion/react'
import MagicalUnderline from './MagicalUnderline'

export interface ContactLink {
  label: string
  href: string
}

interface ContactSectionProps {
  links?: ContactLink[]
}

export default function ContactSection({
  links = [
    { label: 'GitHub', href: 'https://github.com/username' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/username' },
    { label: 'Email', href: 'mailto:hello@example.com' },
  ],
}: ContactSectionProps) {
  return (
    <section className="bg-bg-secondary flex min-h-screen items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-text-primary mb-12 text-4xl font-bold md:text-5xl">Get In Touch</h2>

        <div className="flex flex-col gap-8 text-xl md:flex-row">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-primary hover:text-primary transition-colors"
            >
              <MagicalUnderline>{link.label}</MagicalUnderline>
            </a>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-text-secondary mt-12"
        >
          Feel free to reach out for collaborations or just a friendly hello!
        </motion.p>
      </motion.div>
    </section>
  )
}
