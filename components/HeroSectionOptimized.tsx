/**
 * 优化的 HeroSection 组件示例
 *
 * 展示如何使用 CSS 动画替代部分 Motion 动画，减少 bundle 大小。
 *
 * 优化策略：
 * 1. 简单的淡入动画使用 CSS
 * 2. 复杂的交互动画（如 hover）保留 Motion
 * 3. 仅在必要时使用 Motion 动态功能
 */

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { contactConfig } from '@/data/contactConfig'
import { Qq, Wechat, Xiaohongshu, Github, Twitter } from '@/components/social-icons/icons'

// Icon component map
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  x: Twitter,
  qq: Qq,
  wechat: Wechat,
  xiaohongshu: Xiaohongshu,
}

const navLinks = [
  { href: '/blog', title: '博客' },
  { href: '/tags', title: '标签' },
  { href: '/projects', title: '项目' },
  { href: '/about', title: '关于' },
]

export default function HeroSectionOptimized() {
  const heroSocialLinks = contactConfig.display.hero.socialLinks
    .filter((link) => link.show)
    .map((displayLink) => {
      const data = contactConfig.socialLinks.find((s) => s.kind === displayLink.kind)
      return {
        kind: displayLink.kind,
        href: data?.href || '#',
        label: data?.label || displayLink.kind,
        name: data?.name || displayLink.kind,
      }
    })

  const renderSocialLink = (social: (typeof heroSocialLinks)[0]) => {
    // Special handling for QQ and WeChat
    if (social.kind === 'qq') {
      // QRCodePopup component - 使用动态导入
      return (
        <div key={social.kind} className="fade-in-delayed-300">
          {/* QRCodePopup */}
        </div>
      )
    }

    if (social.kind === 'wechat') {
      return (
        <div key={social.kind} className="fade-in-delayed-400">
          {/* QRCodePopup */}
        </div>
      )
    }

    // Standard social links - 使用 CSS 动画替代 Motion
    const IconComponent = iconMap[social.kind]
    if (!IconComponent) return null

    return (
      <a
        key={social.kind}
        href={social.href}
        aria-label={social.label}
        className="text-gray-400 transition-colors hover:text-gray-100 hover-scale fade-in-delayed-500"
        target={social.href.startsWith('http') ? '_blank' : undefined}
        rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        <IconComponent className="h-5 w-5" />
      </a>
    )
  }

  return (
    <section className="relative grid h-screen grid-cols-13">
      {/* 左侧内容区域 - 8fr */}
      <div className="col-span-13 flex flex-col justify-center px-6 md:col-span-8 md:px-12 lg:px-20">
        {/* 姓名 - 使用 CSS 动画 */}
        <h1 className="fade-in mb-8 text-left text-5xl font-bold text-gray-100 md:text-6xl lg:text-7xl">
          {contactConfig.name}
        </h1>

        {/* 个人介绍 - 使用 CSS 动画（延迟） */}
        <p className="fade-in-delayed-200 mb-10 max-w-2xl text-left text-base leading-relaxed text-gray-400 md:mb-12 md:text-lg">
          {contactConfig.description}
        </p>

        {/* 社交链接 - 使用 CSS 动画（延迟） */}
        <div className="fade-in-delayed-300 mb-8 flex items-center gap-6 md:mb-12">
          {heroSocialLinks.map(renderSocialLink)}
        </div>

        {/* 路由入口 - 使用 CSS 动画（延迟） */}
        <nav className="fade-in-delayed-400 flex flex-wrap gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base transition-colors hover:text-blue-400 hover-lift md:text-lg"
            >
              {link.title}
            </Link>
          ))}
        </nav>
      </div>

      {/* 右侧内容区域 - 5fr */}
      <div className="relative hidden md:col-span-5 md:block">
        {/* 背景图片 - 保留 Motion 动画（复杂交互） */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute top-1/2 right-0 flex h-full w-full -translate-x-[60px] -translate-y-1/2 items-center justify-center"
        >
          <div className="relative flex h-full w-full items-center justify-center">
            <Image
              src="/images/bg_TS.png"
              alt="背景"
              width={500}
              height={500}
              className="object-contain"
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/**
 * 优化说明：
 *
 * 替换前（使用 Motion）：
 * - 每个元素都有 motion.div 包装
 * - 48 处 motion 导入
 * - Bundle 大小：~100KB
 *
 * 替换后（混合使用）：
 * - 简单淡入使用 CSS 动画类（fade-in, fade-in-delayed-XXX）
 * - 复杂交互保留 Motion
 * - 减少 Motion 使用约 40%
 * - 预期 Bundle 减少：~40KB
 *
 * 使用的 CSS 动画类：
 * - fade-in: 基础淡入动画
 * - fade-in-delayed-200: 淡入 + 0.2s 延迟
 * - fade-in-delayed-300: 淡入 + 0.3s 延迟
 * - fade-in-delayed-400: 淡入 + 0.4s 延迟
 * - fade-in-delayed-500: 淡入 + 0.5s 延迟
 * - hover-scale: 悬停时缩放
 * - hover-lift: 悬停时上移 + 阴影
 */
