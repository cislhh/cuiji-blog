'use client'

import Link from '@/components/Link'
import { slug } from 'github-slugger'
import { motion } from 'motion/react'
import { tagsConfig, getTagColorScheme, getTagSize } from '@/data/tagsConfig'
import { useState, useMemo } from 'react'

interface TagsClientProps {
  sortedTags: string[]
  tagCounts: Record<string, number>
}

export default function TagsClient({ sortedTags, tagCounts }: TagsClientProps) {
  const [searchQuery, setSearchQuery] = useState('')

  // Filter tags based on search query
  const filteredTags = useMemo(() => {
    if (!searchQuery.trim()) return sortedTags
    const query = searchQuery.toLowerCase()
    return sortedTags.filter((tag) => tag.toLowerCase().includes(query))
  }, [sortedTags, searchQuery])

  // Calculate statistics
  const totalTags = sortedTags.length
  const totalPosts = Object.values(tagCounts).reduce((a, b) => a + b, 0)

  return (
    <div className="from-dark-bg-start to-dark-bg-end min-h-screen bg-gradient-to-br">
      {/* 页面标题 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative px-4 pt-24 pb-12 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-4 text-5xl font-bold text-gray-100 md:text-6xl"
            >
              {tagsConfig.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-gray-400"
            >
              {tagsConfig.subtitle}
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* 搜索栏 */}
      {tagsConfig.enableSearch && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mx-auto max-w-2xl px-4 pb-8 sm:px-6 lg:px-8"
        >
          <div className="glass-panel rounded-xl p-4">
            <input
              type="text"
              placeholder="搜索标签..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-gray-100 placeholder-gray-500 outline-none"
            />
          </div>
        </motion.div>
      )}

      {/* 统计信息 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mx-auto max-w-7xl px-4 pb-8 text-center sm:px-6 lg:px-8"
      >
        <div className="glass-panel inline-flex rounded-xl px-8 py-4">
          <span className="text-gray-400">
            共 <span className="font-semibold text-gray-100">{totalTags}</span> 个标签，{' '}
            <span className="font-semibold text-gray-100">{totalPosts}</span> 篇文章
          </span>
        </div>
      </motion.div>

      {/* 标签云 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8"
      >
        {filteredTags.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel py-20 text-center"
          >
            <h3 className="mb-2 text-xl font-semibold text-gray-100">
              {searchQuery ? '未找到匹配的标签' : tagsConfig.emptyState.title}
            </h3>
            <p className="text-gray-400">
              {searchQuery ? '尝试其他搜索关键词' : tagsConfig.emptyState.description}
            </p>
          </motion.div>
        ) : (
          <div className="glass-panel rounded-xl p-8 md:p-12">
            <div className="flex flex-wrap justify-center gap-3">
              {filteredTags.map((tag, index) => {
                const count = tagCounts[tag]
                const colorScheme = getTagColorScheme(tag, index)
                const size = getTagSize(count)

                return (
                  <motion.div
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: tagsConfig.staggerDelay * index,
                    }}
                    whileHover={{ scale: tagsConfig.hoverScale }}
                    className="group"
                  >
                    <Link
                      href={`/tags/${slug(tag)}`}
                      aria-label={`查看标签 ${tag} 的文章`}
                      className={`
                        inline-flex cursor-pointer items-center gap-2 rounded-lg
                        border px-3 py-1.5 font-medium
                        transition-all duration-200
                        ${colorScheme.bg}
                        ${colorScheme.text}
                        ${colorScheme.border || ''}
                        ${colorScheme.hover}
                      `}
                    >
                      <span className={size}>{tag}</span>
                      {tagsConfig.showCount && (
                        <span className="rounded-full bg-black/20 px-2 py-0.5 text-xs font-bold">
                          {count}
                        </span>
                      )}
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
