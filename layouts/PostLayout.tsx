'use client'

import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import { Comments } from '@/components/DynamicImports'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import { motion } from 'motion/react'
import { ArrowLeft, ArrowRight, Calendar, User } from 'lucide-react'

const editUrl = (path: string) => `${siteMetadata.siteRepo}/blob/main/data/${path}`

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
    <div className="from-dark-bg-start to-dark-bg-end min-h-screen bg-gradient-to-br">
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
            className="glass-panel mb-8 rounded-xl p-8 md:p-12"
          >
            <div className="space-y-6 text-center">
              {/* 发布日期 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-center justify-center gap-2 text-gray-400"
              >
                <Calendar className="h-4 w-4" />
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
                        className="ring-primary-500/20 h-10 w-10 rounded-full ring-2"
                      />
                    )}
                    <div className="text-left">
                      <div className="flex items-center gap-1 text-sm font-medium text-gray-100">
                        <User className="h-3 w-3" />
                        {author.name}
                      </div>
                      {author.twitter && (
                        <Link
                          href={author.twitter}
                          className="text-primary-400 cursor-pointer text-xs hover:underline"
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
            <aside className="hidden xl:col-span-1 xl:block">
              <div className="sticky top-24 space-y-6">
                {/* 标签 */}
                {tags && tags.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="glass-panel rounded-xl p-6"
                  >
                    <h3 className="mb-4 text-sm font-bold tracking-wider text-gray-100 uppercase">
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
                  <h3 className="mb-4 text-sm font-bold tracking-wider text-gray-100 uppercase">
                    操作
                  </h3>
                  <div className="text-sm">
                    <Link
                      href={`/${basePath}`}
                      className="hover:text-primary-400 flex cursor-pointer items-center gap-2 text-gray-400 transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4" />
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
                <div className="prose prose-lg prose-invert max-w-none">{children}</div>
              </div>

              {/* 移动端标签和操作 */}
              <div className="mt-8 space-y-6 xl:hidden">
                {tags && tags.length > 0 && (
                  <div className="glass-panel rounded-xl p-6">
                    <h3 className="mb-4 text-sm font-bold tracking-wider text-gray-100 uppercase">
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
                  <h3 className="mb-4 text-sm font-bold tracking-wider text-gray-100 uppercase">
                    操作
                  </h3>
                  <div className="text-sm">
                    <Link
                      href={`/${basePath}`}
                      className="hover:text-primary-400 flex cursor-pointer items-center gap-2 text-gray-400 transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4" />
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
              className="mt-8 grid gap-6 md:grid-cols-2"
            >
              {prev && prev.path && (
                <Link
                  href={`/${prev.path}`}
                  className="glass-panel group cursor-pointer rounded-xl p-6 transition-all duration-300 hover:shadow-xl"
                >
                  <div className="mb-2 flex items-center gap-2 text-sm text-gray-400">
                    <ArrowLeft className="h-4 w-4" />
                    <span>上一篇</span>
                  </div>
                  <div className="group-hover:text-primary-400 text-lg font-semibold text-gray-100 transition-colors">
                    {prev.title}
                  </div>
                </Link>
              )}
              {next && next.path && (
                <Link
                  href={`/${next.path}`}
                  className="glass-panel group cursor-pointer rounded-xl p-6 transition-all duration-300 hover:shadow-xl"
                >
                  <div className="mb-2 flex items-center justify-end gap-2 text-sm text-gray-400">
                    <span>下一篇</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                  <div className="group-hover:text-primary-400 text-right text-lg font-semibold text-gray-100 transition-colors">
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
