'use client'

import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import { motion } from 'motion/react'
import { Mail, MapPin } from 'lucide-react'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, email, twitter, bluesky, linkedin, github } = content

  return (
    <div className="dark:from-dark-bg-start dark:to-dark-bg-end min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* 页面标题 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative px-4 pt-16 pb-12 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-4 text-5xl font-bold text-gray-900 md:text-6xl dark:text-gray-100"
            >
              关于我
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-gray-600 dark:text-gray-400"
            >
              了解更多关于我的背景和经历
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* 内容区 */}
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="xl:grid xl:grid-cols-3 xl:space-y-0 xl:gap-x-8"
        >
          {/* 侧边栏个人信息 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center space-y-6 pt-8 xl:sticky xl:top-24 xl:items-start"
          >
            {/* 头像卡片 */}
            <div className="glass-panel w-full max-w-sm rounded-xl p-8">
              <div className="flex flex-col items-center text-center">
                {avatar && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    className="relative"
                  >
                    <Image
                      src={avatar}
                      alt="avatar"
                      width={192}
                      height={192}
                      className="ring-primary-500/20 h-48 w-48 rounded-full ring-4"
                    />
                  </motion.div>
                )}
                <h3 className="pt-6 pb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {name}
                </h3>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4" />
                  {occupation}
                </div>
                <div className="text-gray-600 dark:text-gray-400">{company}</div>

                {/* 社交链接 */}
                <div className="flex space-x-4 pt-6">
                  {email && <SocialIcon kind="mail" href={`mailto:${email}`} size={6} />}
                  {github && <SocialIcon kind="github" href={github} size={6} />}
                  {linkedin && <SocialIcon kind="linkedin" href={linkedin} size={6} />}
                  {twitter && <SocialIcon kind="x" href={twitter} size={6} />}
                  {bluesky && <SocialIcon kind="bluesky" href={bluesky} size={6} />}
                </div>
              </div>
            </div>

            {/* 快速信息卡片 */}
            <div className="glass-panel w-full max-w-sm rounded-xl p-6">
              <h4 className="mb-4 font-bold text-gray-900 dark:text-gray-100">联系方式</h4>
              <div className="space-y-3 text-sm">
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="hover:text-primary-600 dark:hover:text-primary-400 flex cursor-pointer items-center gap-3 text-gray-600 transition-colors duration-200 dark:text-gray-400"
                  >
                    <Mail className="h-4 w-4" />
                    <span>{email}</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* 主要内容 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="xl:col-span-2"
          >
            <div className="glass-panel rounded-xl p-8 xl:p-12">
              <div className="prose prose-lg dark:prose-invert max-w-none">{children}</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
