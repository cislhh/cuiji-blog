'use client'

import { useState } from 'react'
import { Mail } from './social-icons/icons'
import { motion, AnimatePresence } from 'motion/react'

interface EmailOption {
  label: string
  address: string
}

interface EmailDropdownProps {
  emails: EmailOption[]
  size?: number
}

export default function EmailDropdown({ emails, size = 6 }: EmailDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null)

  const handleCopyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email)
      setCopiedEmail(email)
      setTimeout(() => setCopiedEmail(null), 2000)
    } catch (err) {
      console.error('Failed to copy email:', err)
    }
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Mail Icon */}
      <button
        className="text-sm text-gray-500 transition hover:text-gray-600 cursor-pointer bg-transparent border-0 p-0"
        onClick={() => {
          setIsOpen(!isOpen)
        }}
        aria-label="Email"
        aria-expanded={isOpen}
      >
        <Mail
          className={`hover:text-primary-400 fill-current text-gray-200 h-${size} w-${size}`}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-1/2 mb-3 -translate-x-1/2 z-50"
          >
            <div className="glass-panel rounded-lg p-2 min-w-[200px] shadow-xl border border-gray-700/50">
              <div className="space-y-1">
                {emails.map((email) => (
                  <motion.button
                    key={email.address}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCopyEmail(email.address)}
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 transition-colors duration-200 group"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-200 group-hover:text-white">
                          {email.label}
                        </span>
                        <span className="text-xs text-gray-400 group-hover:text-gray-300">
                          {email.address}
                        </span>
                      </div>
                      {copiedEmail === email.address ? (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-xs text-green-400 whitespace-nowrap"
                        >
                          已复制!
                        </motion.span>
                      ) : (
                        <span className="text-xs text-gray-500 group-hover:text-gray-400 whitespace-nowrap">
                          点击复制
                        </span>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
