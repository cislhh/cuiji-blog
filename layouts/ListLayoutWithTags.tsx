'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'
import { motion } from 'motion/react'
import { Calendar, Clock, ArrowRight, Folder } from 'lucide-react'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const segments = pathname.split('/')
  const lastSegment = segments[segments.length - 1]
  const basePath = pathname
    .replace(/^\//, '') // Remove leading slash
    .replace(/\/page\/\d+\/?$/, '') // Remove any trailing /page
    .replace(/\/$/, '') // Remove trailing slash
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <nav className="flex justify-between items-center gap-4">
        {!prevPage ? (
          <button
            className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed transition-all duration-200"
            disabled
          >
            上一页
          </button>
        ) : (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
            className="px-4 py-2 rounded-lg bg-primary-500/10 hover:bg-primary-500/20 text-primary-600 dark:text-primary-400 transition-all duration-200 cursor-pointer inline-flex items-center gap-2"
          >
            上一页
          </Link>
        )}
        <span className="text-sm text-gray-600 dark:text-gray-400">
          第 {currentPage} / {totalPages} 页
        </span>
        {!nextPage ? (
          <button
            className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed transition-all duration-200"
            disabled
          >
            下一页
          </button>
        ) : (
          <Link
            href={`/${basePath}/page/${currentPage + 1}`}
            rel="next"
            className="px-4 py-2 rounded-lg bg-primary-500/10 hover:bg-primary-500/20 text-primary-600 dark:text-primary-400 transition-all duration-200 cursor-pointer inline-flex items-center gap-2"
          >
            下一页
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-bg-start dark:to-dark-bg-end">
      {/* 页面标题 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative pt-16 pb-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4"
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-gray-600 dark:text-gray-400"
            >
              探索技术文章与思考记录
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* 主内容区 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 侧边栏标签 */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:w-72 flex-shrink-0"
          >
            <div className="sticky top-24 space-y-6">
              {/* 分类卡片 */}
              <div className="glass-panel rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Folder className="w-5 h-5 text-primary-500" />
                  <h3 className="font-bold text-gray-900 dark:text-gray-100">文章分类</h3>
                </div>
                <nav className="space-y-2">
                  {pathname.startsWith('/blog') ? (
                    <div className="px-3 py-2 rounded-lg bg-primary-500/10 text-primary-600 dark:text-primary-400 font-medium">
                      全部文章
                    </div>
                  ) : (
                    <Link
                      href={`/blog`}
                      className="block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors duration-200 cursor-pointer"
                    >
                      全部文章
                    </Link>
                  )}
                  {sortedTags.map((t) => {
                    const isActive = decodeURI(pathname.split('/tags/')[1]) === slug(t)
                    return (
                      <Link
                        key={t}
                        href={`/tags/${slug(t)}`}
                        className={`block px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
                          isActive
                            ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400 font-medium'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
                        }`}
                        aria-label={`查看标签 ${t} 的文章`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="uppercase text-sm">{t}</span>
                          <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                            {tagCounts[t]}
                          </span>
                        </div>
                      </Link>
                    )
                  })}
                </nav>
              </div>

              {/* 统计信息卡片 */}
              <div className="glass-panel rounded-xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4">博客统计</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">总文章数</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">{posts.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">标签数量</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">{sortedTags.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* 文章列表 */}
          <div className="flex-1 min-w-0">
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              {displayPosts.map((post, index) => {
                const { path, date, title, summary, tags, readingTime } = post
                return (
                  <motion.li
                    key={path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    whileHover={{ y: -4 }}
                    className="group"
                  >
                    <Link href={`/${path}`} className="block cursor-pointer">
                      <article className="glass-panel rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full border border-transparent hover:border-primary-500/30">
                        {/* 元信息 */}
                        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <time dateTime={date} suppressHydrationWarning>
                              {formatDate(date, siteMetadata.locale)}
                            </time>
                          </div>
                          {readingTime && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{readingTime.text}</span>
                            </div>
                          )}
                        </div>

                        {/* 标题 */}
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                          {title}
                        </h2>

                        {/* 摘要 */}
                        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                          {summary}
                        </p>

                        {/* 标签 */}
                        {tags && tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {tags.slice(0, 5).map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        )}

                        {/* 阅读更多指示器 */}
                        <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          阅读全文
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                        </div>
                      </article>
                    </Link>
                  </motion.li>
                )
              })}
            </motion.ul>

            {/* 分页 */}
            {pagination && pagination.totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
