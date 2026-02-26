'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { Github, Twitter } from 'lucide-react'

// 社交图标组件（暂时留空）
const WechatIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8.5,4C4.9,4,2,6.5,2,9.5c0,2,1.5,3.8,3,5c0,0-0.5,1.5-1.5,2c0,0,1.5,0,3-1c1,0.5,2,0.5,3,0c3.6,0,6.5-2.5,6.5-5.5S12.1,4,8.5,4z M18.5,12c-2.9,0-5.2,2.1-5.2,4.7c0,1.7,1.2,3.2,2.6,4.1c0,0-0.4,1.3-1.3,1.7c0,0,1.3,0,2.5-0.9c0.8,0.4,1.7,0.6,2.6,0.6c2.9,0,5.2-2.1,5.2-4.7S21.4,12,18.5,12z" />
  </svg>
)

const XiaohongshuIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
    <rect x="4" y="4" width="16" height="16" rx="2" />
  </svg>
)

const socialLinks = [
  { name: '微信', icon: WechatIcon, href: '#', label: '微信' },
  { name: '小红书', icon: XiaohongshuIcon, href: '#', label: '小红书' },
  { name: 'GitHub', icon: Github, href: 'https://github.com', label: 'GitHub' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
]

const navLinks = [
  { href: '/blog', title: '博客' },
  { href: '/tags', title: '标签' },
  { href: '/projects', title: '项目' },
  { href: '/about', title: '关于' },
]

export default function HeroSection() {
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
          CuiJi
        </motion.h1>

        {/* 个人介绍 */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-10 max-w-2xl text-left text-base leading-relaxed text-gray-400 md:mb-12 md:text-lg"
        >
          欢迎来到我的个人作品集 —— 或者说，我在网络上的游乐场。
          我是一名软件工程师，永远专注于学习这门手艺。我喜欢为网络构建事物，
          始终寻找新的挑战和学习机会。我热衷于创造美观且实用的用户体验。
        </motion.p>

        {/* 社交链接 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8 flex gap-6 md:mb-12"
        >
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              aria-label={social.label}
              className="text-gray-400 transition-colors hover:text-gray-100"
            >
              <social.icon />
            </a>
          ))}
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
