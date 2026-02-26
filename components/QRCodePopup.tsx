'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface QRCodePopupProps {
  icon: React.ComponentType<{ className?: string }>
  qrCodeUrl: string
  alt: string
  size?: number // Tailwind size number (e.g., 5 for h-5 w-5)
}

export default function QRCodePopup({
  icon: Icon,
  qrCodeUrl,
  alt,
  size = 5, // Default Tailwind size (h-5 w-5 = 20px)
}: QRCodePopupProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Icon */}
      <div className="cursor-pointer text-gray-400 transition-colors hover:text-gray-100">
        <Icon className={`h-${size} w-${size}`} />
      </div>

      {/* QR Code Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-1/2 z-50 mb-3 -translate-x-1/2"
          >
            <div className="glass-panel min-w-[180px] rounded-lg border border-gray-700/50 p-2 shadow-xl">
              {/* QR Code Image */}
              <div className="rounded-lg bg-white">
                <img
                  src={qrCodeUrl}
                  alt={alt}
                  className="h-40 w-40 object-contain"
                  onError={(e) => {
                    console.error('QR code image failed to load:', qrCodeUrl)
                    // Fallback if image not found
                    const target = e.target as HTMLImageElement
                    target.src =
                      'data:image/svg+xml,' +
                      encodeURIComponent(`
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                        <rect fill="#000" x="10" y="10" width="30" height="30"/>
                        <rect fill="#000" x="60" y="10" width="30" height="30"/>
                        <rect fill="#000" x="10" y="60" width="30" height="30"/>
                        <rect fill="#000" x="50" y="50" width="40" height="40"/>
                      </svg>
                    `)
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
