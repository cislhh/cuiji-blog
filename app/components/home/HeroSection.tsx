'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { Github, Twitter } from 'lucide-react'
import EmailDropdown from '@/components/EmailDropdown'
import WechatQRCode from '@/components/WechatQRCode'
import { contactConfig } from '@/data/contactConfig'
import { Qq, Xiaohongshu } from '@/components/social-icons/icons'

// Icon component map (for standard links without special behavior)
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  x: Twitter,
  qq: Qq,
  xiaohongshu: Xiaohongshu,
}

const navLinks = [
  { href: '/blog', title: '博客' },
  { href: '/tags', title: '标签' },
  { href: '/projects', title: '项目' },
  { href: '/about', title: '关于' },
]

export default function HeroSection() {
  // Get social links to display in Hero section from config
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

  // Render a social link based on its kind
  const renderSocialLink = (social: typeof heroSocialLinks[0]) => {
    // Special handling for WeChat (QR code popup)
    if (social.kind === 'wechat') {
      return <WechatQRCode key={social.kind} size={5} />
    }

    // Special handling for Email (dropdown)
    if (social.kind === 'mail' && contactConfig.emails) {
      return <EmailDropdown key={social.kind} emails={contactConfig.emails} size={5} />
    }

    // Standard social links
    const IconComponent = iconMap[social.kind]
    if (!IconComponent) return null

    return (
      <a
        key={social.kind}
        href={social.href}
        aria-label={social.label}
        className="text-gray-400 transition-colors hover:text-gray-100"
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
        {/* 姓名 */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-left text-5xl font-bold text-gray-100 md:text-6xl lg:text-7xl"
        >
          {contactConfig.name}
        </motion.h1>

        {/* 个人介绍 */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-10 max-w-2xl text-left text-base leading-relaxed text-gray-400 md:mb-12 md:text-lg"
        >
          {contactConfig.description}
        </motion.p>

        {/* 社交链接 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8 flex gap-6 md:mb-12 items-center"
        >
          {/* Social links from config - renders in configured order */}
          {heroSocialLinks.map(renderSocialLink)}
        </motion.div>

        {/* 路由入口 */}
        <motion.nav
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap gap-4"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base transition-colors hover:text-blue-400 md:text-lg"
            >
              {link.title}
            </Link>
          ))}
        </motion.nav>
      </div>

      {/* 右侧内容区域 - 5fr */}
      <div className="relative hidden md:col-span-5 md:block">
        {/* 背景图片 - 在 5fr 区域内中心定位 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1.5, delay: 0.8 }}
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
