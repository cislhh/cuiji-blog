'use client'

import { motion } from 'motion/react'
import { MapPin } from 'lucide-react'
import EmailDropdown from '@/components/EmailDropdown'
import QRCodePopup from '@/components/QRCodePopup'
import { contactConfig } from '@/data/contactConfig'
import { aboutConfig } from '@/data/aboutConfig'
import { Qq, Wechat, Github, Xiaohongshu } from '@/components/social-icons/icons'
import Image from 'next/image'
import BackToHome from '@/components/BackToHome'

// Icon component map for standard links
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  qq: Qq,
  wechat: Wechat,
  xiaohongshu: Xiaohongshu,
}

export default function AboutPage() {
  // Get social links to display in About page from config
  const aboutSocialLinks = contactConfig.display.about.socialLinks
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
  const renderSocialLink = (social: (typeof aboutSocialLinks)[0]) => {
    // Special handling for Email (dropdown)
    if (social.kind === 'mail' && contactConfig.emails) {
      return <EmailDropdown key={social.kind} emails={contactConfig.emails} size={6} />
    }

    // Special handling for QQ (QR code popup)
    if (social.kind === 'qq') {
      return (
        <QRCodePopup
          key={social.kind}
          icon={Qq}
          qrCodeUrl="/images/qq-qr.png"
          alt="QQ二维码"
          size={6}
        />
      )
    }

    // Special handling for WeChat (QR code popup)
    if (social.kind === 'wechat') {
      return (
        <QRCodePopup
          key={social.kind}
          icon={Wechat}
          qrCodeUrl="/images/wechat-qr.png"
          alt="微信二维码"
          size={6}
        />
      )
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
        <IconComponent className="h-6 w-6" />
      </a>
    )
  }

  return (
    <div className="from-dark-bg-start to-dark-bg-end min-h-screen bg-gradient-to-br">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative px-4 pt-24 pb-12 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          {/* 返回首页按钮 */}
          <div className="mb-8">
            <BackToHome variant="full" />
          </div>

          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-4 text-5xl font-bold text-gray-100 md:text-6xl lg:text-7xl"
            >
              关于我
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-gray-400 md:text-xl"
            >
              {aboutConfig.personalInfo.tagline}
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Sidebar - Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            {/* Profile Card */}
            <div className="glass-panel mb-6 overflow-hidden rounded-2xl">
              <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-600">
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    className="ring-gray-900 h-32 w-32 rounded-full ring-4 ring-offset-4 ring-offset-gray-900"
                  >
                    <Image
                      src={aboutConfig.personalInfo.avatar}
                      alt={aboutConfig.personalInfo.name}
                      width={128}
                      height={128}
                      className="h-full w-full rounded-full object-cover"
                    />
                  </motion.div>
                </div>
              </div>

              <div className="pt-20 pb-6 text-center">
                <h3 className="text-2xl font-bold text-gray-100">
                  {aboutConfig.personalInfo.name}
                </h3>
                <p className="text-gray-400">{aboutConfig.personalInfo.tagline}</p>

                {/* Location */}
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-400">
                  <MapPin className="h-4 w-4" />
                  <span>{aboutConfig.personalInfo.location}</span>
                </div>

                {/* Social Links - using unified config */}
                <div className="mt-6 flex items-center justify-center gap-4">
                  {aboutSocialLinks.map(renderSocialLink)}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Main Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            {/* Bio Section */}
            <div className="glass-panel mb-6 rounded-2xl p-8">
              <h2 className="mb-6 text-2xl font-bold text-gray-100">个人简介</h2>
              <div className="space-y-4 text-gray-300">
                {aboutConfig.personalInfo.bio.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Skills Section */}
            <div className="glass-panel mb-6 rounded-2xl p-8">
              <h2 className="mb-6 text-2xl font-bold text-gray-100">技能专长</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {aboutConfig.skills.map((skillGroup, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="rounded-xl border border-gray-700/50 bg-gray-800/30 p-4"
                  >
                    <h3 className="mb-3 font-semibold text-gray-100">{skillGroup.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-lg bg-blue-500/10 px-3 py-1.5 text-sm text-blue-400"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Current Focus */}
            <div className="glass-panel mb-6 rounded-2xl p-8">
              <h2 className="mb-6 text-2xl font-bold text-gray-100">
                {aboutConfig.currentFocus.title}
              </h2>
              <p className="mb-4 text-gray-300">{aboutConfig.currentFocus.description}</p>
              <div className="flex flex-wrap gap-2">
                {aboutConfig.currentFocus.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-3 py-1.5 text-sm text-gray-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Experience */}
            <div className="glass-panel mb-6 rounded-2xl p-8">
              <h2 className="mb-6 text-2xl font-bold text-gray-100">重点项目经历</h2>
              <div className="space-y-6">
                {aboutConfig.experience.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    className="relative border-l-2 border-blue-500/30 pl-6"
                  >
                    <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-blue-500" />
                    <h3 className="mb-1 text-lg font-semibold text-gray-100">{item.title}</h3>
                    <div className="mb-2 text-sm text-gray-400">{item.organization}</div>
                    <p className="text-gray-300 whitespace-pre-line">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div className="glass-panel mb-6 rounded-2xl p-8">
              <h2 className="mb-6 text-2xl font-bold text-gray-100">兴趣爱好</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {aboutConfig.interests.map((interest, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-700/50 bg-gray-800/30 p-4 transition-all hover:border-blue-500/50 hover:bg-gray-800/50"
                  >
                    <span className="text-2xl">{interest.icon}</span>
                    <span className="text-sm font-medium text-gray-200">{interest.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Achievements - Conditionally render if exists */}
            {aboutConfig.achievements && aboutConfig.achievements.length > 0 && (
              <div className="glass-panel mb-6 rounded-2xl p-8">
                <h2 className="mb-6 text-2xl font-bold text-gray-100">成就</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {aboutConfig.achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                      className="rounded-xl border border-gray-700/50 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 p-6"
                    >
                      <div className="mb-2 text-2xl">🏆</div>
                      <h3 className="mb-2 font-semibold text-gray-100">{achievement.title}</h3>
                      <p className="text-sm text-gray-300">{achievement.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Personal Stats & Vision */}
            {aboutConfig.personalStats && (
              <div className="glass-panel rounded-2xl p-8">
                <h2 className="mb-6 text-2xl font-bold text-gray-100">
                  {aboutConfig.personalStats.title}
                </h2>
                <p className="mb-8 text-gray-300 leading-relaxed whitespace-pre-line">
                  {aboutConfig.personalStats.description}
                </p>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {aboutConfig.personalStats.stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                      className="rounded-xl border border-gray-700/50 bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-6 text-center"
                    >
                      <div className="mb-2 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
