'use client'

import { motion } from 'motion/react'
import { projects } from '@/data/projects'

export default function TimelineSection() {
  return (
    <section className="relative min-h-screen bg-white dark:bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-4xl font-bold text-center mb-20 text-gray-900 dark:text-gray-100">
          项目时间轴
        </h2>

        {/* 时间轴容器 */}
        <div className="relative">
          {/* 中心垂直线 */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-300 dark:bg-gray-700" />

          {/* 移动端左侧线条 */}
          <div className="md:hidden absolute left-8 h-full w-0.5 bg-gray-300 dark:bg-gray-700" />

          {/* 项目列表 */}
          <div className="space-y-16">
            {projects.map((project, index) => {
              const isLeft = index % 2 === 0

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${
                    isLeft ? 'md:justify-start justify-end' : 'md:justify-end justify-end'
                  }`}
                >
                  {/* 时间标签 */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-2 rounded-full text-sm font-bold z-10">
                    {project.date}
                  </div>

                  {/* 移动端时间标签 */}
                  <div className="md:hidden absolute left-8 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-3 py-1 rounded-full text-xs font-bold z-10">
                    {project.date}
                  </div>

                  {/* 项目卡片 */}
                  <div
                    className={`w-full md:w-5/12 ${isLeft ? 'md:pr-12 pr-4 md:text-right text-left' : 'md:pl-12 pl-4 text-left'}`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="relative group overflow-hidden rounded-lg shadow-lg"
                    >
                      {/* 项目图片占位 */}
                      <div className="relative aspect-video bg-gray-200 dark:bg-gray-700">
                        {/* 图片后续填充 */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                        {/* 项目名称覆盖 */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-xl font-bold text-white">{project.name}</h3>
                          <p className="text-sm text-gray-200 mt-1 line-clamp-2">
                            {project.description}
                          </p>
                        </div>

                        {/* 标签 */}
                        {project.tags && (
                          <div className="absolute top-4 right-4 flex gap-2">
                            {project.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>

                  {/* 时间节点圆点 */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-900 dark:bg-gray-100 rounded-full border-4 border-white dark:border-gray-900 z-10" />

                  {/* 移动端节点圆点 */}
                  <div className="md:hidden absolute left-8 transform -translate-x-1/2 w-3 h-3 bg-gray-900 dark:bg-gray-100 rounded-full border-4 border-white dark:border-gray-900 z-10" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
