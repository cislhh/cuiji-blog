'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'
import { usePathname } from 'next/navigation'

/**
 * BackToHome Component
 *
 * 统一的返回首页组件，在博客、标签、项目、关于页面使用
 * - 使用 Framer Motion 实现平滑动画
 * - 支持两种样式：完整版（带文字）和紧凑版（仅图标）
 * - 响应式设计，移动端自动切换为紧凑版
 * - 可访问性：ARIA 标签和键盘导航支持
 */

interface BackToHomeProps {
  variant?: 'full' | 'compact'
  className?: string
}

export default function BackToHome({ variant = 'full', className = '' }: BackToHomeProps) {
  const pathname = usePathname()

  // 如果已经在首页，不显示返回按钮
  if (pathname === '/') {
    return null
  }

  const content = {
    full: (
      <>
        <ArrowLeft className="h-5 w-5" />
        <span>返回首页</span>
      </>
    ),
    compact: (
      <>
        <Home className="h-5 w-5" />
        <span className="sr-only">返回首页</span>
      </>
    ),
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`${className}`}
    >
      <Link
        href="/"
        className="group inline-flex items-center gap-2 rounded-lg bg-gray-800/50 px-4 py-2 text-sm font-medium text-gray-300 backdrop-blur-sm transition-all duration-200 hover:bg-gray-700/50 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-950"
        aria-label="返回首页"
      >
        {content[variant]}
      </Link>
    </motion.div>
  )
}
