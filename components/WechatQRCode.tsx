'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface WechatQRCodeProps {
  qrCodeUrl?: string // Path to QR code image
  size?: number // Tailwind size number (e.g., 5 for h-5 w-5)
}

export default function WechatQRCode({
  qrCodeUrl = '/images/wechat-qr.png',
  size = 5, // Default Tailwind size (h-5 w-5 = 20px)
}: WechatQRCodeProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* WeChat Icon */}
      <div className="cursor-pointer text-gray-400 transition-colors hover:text-gray-100">
        <svg
          className={`h-${size} w-${size}`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M8.5,4C4.9,4,2,6.5,2,9.5c0,2,1.5,3.8,3,5c0,0-0.5,1.5-1.5,2c0,0,1.5,0,3-1c1,0.5,2,0.5,3,0c3.6,0,6.5-2.5,6.5-5.5S12.1,4,8.5,4z M18.5,12c-2.9,0-5.2,2.1-5.2,4.7c0,1.7,1.2,3.2,2.6,4.1c0,0-0.4,1.3-1.3,1.7c0,0,1.3,0,2.5-0.9c0.8,0.4,1.7,0.6,2.6,0.6c2.9,0,5.2-2.1,5.2-4.7S21.4,12,18.5,12z" />
        </svg>
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
            <div className="glass-panel rounded-lg border border-gray-700/50 p-4 shadow-xl">
              <div className="text-center">
                {/* QR Code Image */}
                <div className="mb-2 rounded-lg bg-white p-2">
                  <img
                    src={qrCodeUrl}
                    alt="微信二维码"
                    className="h-32 w-32 object-contain"
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
                <p className="text-sm text-gray-300">扫描二维码</p>
                <p className="text-xs text-gray-500">或搜索微信号</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
