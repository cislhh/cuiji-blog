'use client'

import { motion, useScroll } from 'motion/react'
import { useRef, useState, useEffect } from 'react'
import { FileText, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { formatDate } from 'pliny/utils/formatDate'
import siteMetadata from '@/data/siteMetadata'
import { aboutConfig } from '@/data/aboutConfig'

interface Post {
  slug?: string
  date: string
  title: string
  summary?: string
  tags: string[]
}

interface BlogHighlightsSectionProps {
  posts: Post[]
}

export default function BlogHighlightsSection({ posts }: BlogHighlightsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState('blog')

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  // 根据滚动位置切换显示的分类
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest < 0.5) {
        setActiveCategory('blog')
      } else {
        setActiveCategory('vision')
      }
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  const categories = [
    {
      id: 'blog',
      title: '最新文章',
      icon: FileText,
    },
    {
      id: 'vision',
      title: '个人愿景',
      icon: Sparkles,
    },
  ]

  const activeData = categories.find((cat) => cat.id === activeCategory)!
  const latestPosts = posts.slice(0, 4) // 显示最新4篇文章
  const personalStats = aboutConfig.personalStats

  return (
    <section className="relative grid min-h-screen grid-cols-1 bg-gray-900 md:min-h-screen md:grid-cols-13">
      {/* 左侧展示区域 - 4fr */}
      <div className="relative md:col-span-4">
        <div className="sticky top-0 flex h-screen items-center justify-center px-8">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <activeData.icon className="mx-auto mb-6 h-16 w-16 text-gray-100" />
            <h2 className="text-3xl font-bold text-gray-100">{activeData.title}</h2>
          </motion.div>
        </div>
      </div>

      {/* 右侧内容区域 - 9fr */}
      <div ref={containerRef} className="px-6 py-20 md:col-span-9 md:px-12">
        {/* 最新文章部分 */}
        <div className="min-h-[50vh] py-12">
          <h3 className="mb-8 text-2xl font-bold text-gray-100">最新文章</h3>
          <div className="space-y-6">
            {latestPosts.length === 0 ? (
              <div className="rounded-lg bg-gray-800 p-6 text-center text-gray-500">
                暂无文章
              </div>
            ) : (
              latestPosts.map((post, index) => (
                <motion.div
                  key={post.slug || index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="rounded-lg bg-gray-800 p-6 transition-all duration-300 hover:border-primary-500/30 hover:shadow-xl">
                      {/* 元信息 */}
                      <div className="mb-3 flex flex-wrap items-center gap-3 text-sm">
                        <time dateTime={post.date} className="text-gray-500">
                          {formatDate(post.date, siteMetadata.locale)}
                        </time>
                        <span className="text-gray-700">•</span>
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-md bg-gray-700/50 px-2 py-1 text-xs text-primary-400"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* 标题 */}
                      <h4 className="mb-2 text-lg font-semibold text-gray-100 transition-colors group-hover:text-primary-400">
                        {post.title}
                      </h4>

                      {/* 摘要 */}
                      {post.summary && (
                        <p className="text-sm text-gray-400 line-clamp-2">{post.summary}</p>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </div>

          {/* 查看更多 */}
          {latestPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mt-6"
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-primary-400 hover:text-primary-300"
              >
                查看全部文章 →
              </Link>
            </motion.div>
          )}
        </div>

        {/* 个人愿景部分 */}
        {personalStats && (
          <div className="min-h-[50vh] py-12">
            <h3 className="mb-8 text-2xl font-bold text-gray-100">{personalStats.title}</h3>

            {/* 描述 */}
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="mb-8 text-gray-300 leading-relaxed whitespace-pre-line"
            >
              {personalStats.description}
            </motion.p>

            {/* 统计数据 */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {personalStats.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
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
      </div>
    </section>
  )
}
