'use client'

import Link from '@/components/Link'
import { slug } from 'github-slugger'
import { motion } from 'motion/react'
import { Hash } from 'lucide-react'

interface TagsClientProps {
  sortedTags: string[]
  tagCounts: Record<string, number>
}

export default function TagsClient({ sortedTags, tagCounts }: TagsClientProps) {
  // 计算标签大小（根据文章数量）
  const maxCount = Math.max(...Object.values(tagCounts))
  const minCount = Math.min(...Object.values(tagCounts))
  const getTagSize = (count: number) => {
    const normalized = (count - minCount) / (maxCount - minCount)
    // 返回不同的尺寸类
    if (normalized > 0.7) return 'text-2xl'
    if (normalized > 0.4) return 'text-xl'
    return 'text-lg'
  }

  // 为标签分配颜色
  const colors = [
    'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
    'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
    'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300',
    'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
    'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300',
  ]

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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <Hash className="w-10 h-10 text-primary-500" />
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100">
                标签云
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-gray-600 dark:text-gray-400"
            >
              按标签探索我的文章
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* 标签云 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
      >
        {sortedTags.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-12">
            暂无标签
          </div>
        ) : (
          <div className="glass-panel rounded-xl p-8 md:p-12">
            <div className="flex flex-wrap justify-center gap-4">
              {sortedTags.map((t, index) => {
                const count = tagCounts[t]
                const size = getTagSize(count)
                const color = colors[index % colors.length]

                return (
                  <motion.div
                    key={t}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.05 * index }}
                    whileHover={{ scale: 1.05 }}
                    className="group"
                  >
                    <Link
                      href={`/tags/${slug(t)}`}
                      aria-label={`查看标签 ${t} 的文章`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-black/30 hover:shadow-lg transition-all duration-200 cursor-pointer font-medium uppercase"
                    >
                      <span className={size}>{t}</span>
                      <span className="text-xs bg-white/50 dark:bg-black/30 px-2 py-0.5 rounded-full font-bold">
                        {count}
                      </span>
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            {/* 统计信息 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-center gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    {sortedTags.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    标签总数
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    {Object.values(tagCounts).reduce((a, b) => a + b, 0)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    文章总数
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
