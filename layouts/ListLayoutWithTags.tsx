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
      <nav className="flex items-center justify-between gap-4">
        {!prevPage ? (
          <button
            className="cursor-not-allowed rounded-lg bg-gray-100 px-4 py-2 text-gray-400 transition-all duration-200 dark:bg-gray-800"
            disabled
          >
            上一页
          </button>
        ) : (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
            className="bg-primary-500/10 hover:bg-primary-500/20 text-primary-600 dark:text-primary-400 inline-flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 transition-all duration-200"
          >
            上一页
          </Link>
        )}
        <span className="text-sm text-gray-600 dark:text-gray-400">
          第 {currentPage} / {totalPages} 页
        </span>
        {!nextPage ? (
          <button
            className="cursor-not-allowed rounded-lg bg-gray-100 px-4 py-2 text-gray-400 transition-all duration-200 dark:bg-gray-800"
            disabled
          >
            下一页
          </button>
        ) : (
          <Link
            href={`/${basePath}/page/${currentPage + 1}`}
            rel="next"
            className="bg-primary-500/10 hover:bg-primary-500/20 text-primary-600 dark:text-primary-400 inline-flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 transition-all duration-200"
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
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* 侧边栏标签 */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex-shrink-0 lg:w-72"
          >
            <div className="sticky top-24 space-y-6">
              {/* 分类卡片 */}
              <div className="glass-panel rounded-xl p-6 shadow-lg">
                <div className="mb-4 flex items-center gap-2">
                  <Folder className="text-primary-500 h-5 w-5" />
                  <h3 className="font-bold text-gray-900 dark:text-gray-100">文章分类</h3>
                </div>
                {/* data-lenis-prevent 排除 Lenis 平滑滚动,启用局部原生滚动 */}
                <nav
                  data-lenis-prevent
                  className="scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500 max-h-[calc(100vh-12rem)] space-y-2 overflow-y-auto pr-2"
                >
                  {pathname.startsWith('/blog') ? (
                    <div className="bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-lg px-3 py-2 font-medium">
                      全部文章
                    </div>
                  ) : (
                    <Link
                      href={`/blog`}
                      className="block cursor-pointer rounded-lg px-3 py-2 text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
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
                        className={`block cursor-pointer rounded-lg px-3 py-2 transition-all duration-200 ${
                          isActive
                            ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400 font-medium'
                            : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                        }`}
                        aria-label={`查看标签 ${t} 的文章`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm uppercase">{t}</span>
                          <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs dark:bg-gray-700">
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
                <h3 className="mb-4 font-bold text-gray-900 dark:text-gray-100">博客统计</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">总文章数</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {posts.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">标签数量</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {sortedTags.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* 文章列表 */}
          <div className="min-w-0 flex-1">
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
                      <article className="glass-panel hover:border-primary-500/30 h-full rounded-xl border border-transparent p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
                        {/* 元信息 */}
                        <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <time dateTime={date} suppressHydrationWarning>
                              {formatDate(date, siteMetadata.locale)}
                            </time>
                          </div>
                          {readingTime && (
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{readingTime.text}</span>
                            </div>
                          )}
                        </div>

                        {/* 标题 */}
                        <h2 className="group-hover:text-primary-600 dark:group-hover:text-primary-400 mb-3 text-2xl font-bold text-gray-900 transition-colors duration-200 dark:text-gray-100">
                          {title}
                        </h2>

                        {/* 摘要 */}
                        <p className="mb-4 line-clamp-2 text-gray-600 dark:text-gray-400">
                          {summary}
                        </p>

                        {/* 标签 */}
                        {tags && tags.length > 0 && (
                          <div className="mb-4 flex flex-wrap gap-2">
                            {tags.slice(0, 5).map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        )}

                        {/* 阅读更多指示器 */}
                        <div className="text-primary-600 dark:text-primary-400 flex items-center gap-2 text-sm font-medium opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                          阅读全文
                          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
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
                <Pagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
