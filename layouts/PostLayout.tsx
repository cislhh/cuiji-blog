'use client'

import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import { motion } from 'motion/react'
import { Github, MessageCircle, ArrowLeft, ArrowRight, Calendar, User } from 'lucide-react'

const editUrl = (path: string) => `${siteMetadata.siteRepo}/blob/main/data/${path}`
const discussUrl = (path: string) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { filePath, path, slug, date, title, tags } = content
  const basePath = path?.split('/')[0] || ''

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-bg-start dark:to-dark-bg-end">
      <SectionContainer>
        <ScrollTopAndComment />
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 文章头部 */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel rounded-xl p-8 md:p-12 mb-8"
          >
            <div className="space-y-6 text-center">
              {/* 发布日期 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400"
              >
                <Calendar className="w-4 h-4" />
                <time dateTime={date} className="text-base font-medium">
                  {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                </time>
              </motion.div>

              {/* 标题 */}
              <PageTitle>{title}</PageTitle>

              {/* 作者信息 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center justify-center gap-4"
              >
                {authorDetails.map((author) => (
                  <div key={author.name} className="flex items-center gap-3">
                    {author.avatar && (
                      <Image
                        src={author.avatar}
                        width={40}
                        height={40}
                        alt="avatar"
                        className="h-10 w-10 rounded-full ring-2 ring-primary-500/20"
                      />
                    )}
                    <div className="text-left">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {author.name}
                      </div>
                      {author.twitter && (
                        <Link
                          href={author.twitter}
                          className="text-xs text-primary-600 dark:text-primary-400 hover:underline cursor-pointer"
                        >
                          {author.twitter
                            .replace('https://twitter.com/', '@')
                            .replace('https://x.com/', '@')}
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* 文章内容 */}
          <div className="xl:grid xl:grid-cols-4 xl:gap-x-6">
            {/* 侧边栏（桌面端） */}
            <aside className="hidden xl:block xl:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* 标签 */}
                {tags && tags.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="glass-panel rounded-xl p-6"
                  >
                    <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
                      标签
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* 导航链接 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="glass-panel rounded-xl p-6"
                >
                  <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
                    操作
                  </h3>
                  <div className="space-y-3 text-sm">
                    <Link
                      href={discussUrl(path)}
                      rel="nofollow"
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      在 Twitter 讨论
                    </Link>
                    <Link
                      href={editUrl(filePath)}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer"
                    >
                      <Github className="w-4 h-4" />
                      在 GitHub 查看
                    </Link>
                    <Link
                      href={`/${basePath}`}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      返回博客
                    </Link>
                  </div>
                </motion.div>
              </div>
            </aside>

            {/* 主要内容 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="xl:col-span-3"
            >
              <div className="glass-panel rounded-xl p-8 md:p-12">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  {children}
                </div>
              </div>

              {/* 移动端标签和操作 */}
              <div className="xl:hidden mt-8 space-y-6">
                {tags && tags.length > 0 && (
                  <div className="glass-panel rounded-xl p-6">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
                      标签
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                <div className="glass-panel rounded-xl p-6">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
                    操作
                  </h3>
                  <div className="space-y-3 text-sm">
                    <Link
                      href={discussUrl(path)}
                      rel="nofollow"
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      在 Twitter 讨论
                    </Link>
                    <Link
                      href={editUrl(filePath)}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer"
                    >
                      <Github className="w-4 h-4" />
                      在 GitHub 查看
                    </Link>
                    <Link
                      href={`/${basePath}`}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      返回博客
                    </Link>
                  </div>
                </div>
              </div>

              {/* 评论区 */}
              {siteMetadata.comments && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="mt-8"
                  id="comment"
                >
                  <div className="glass-panel rounded-xl p-8 md:p-12">
                    <Comments slug={slug || ''} />
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* 上一篇/下一篇导航 */}
          {(next || prev) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-8 grid md:grid-cols-2 gap-6"
            >
              {prev && prev.path && (
                <Link
                  href={`/${prev.path}`}
                  className="glass-panel rounded-xl p-6 hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <ArrowLeft className="w-4 h-4" />
                    <span>上一篇</span>
                  </div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {prev.title}
                  </div>
                </Link>
              )}
              {next && next.path && (
                <Link
                  href={`/${next.path}`}
                  className="glass-panel rounded-xl p-6 hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-center justify-end gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <span>下一篇</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors text-right">
                    {next.title}
                  </div>
                </Link>
              )}
            </motion.div>
          )}
        </motion.article>
      </SectionContainer>
    </div>
  )
}
