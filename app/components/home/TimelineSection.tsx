'use client'

import { motion } from 'motion/react'
import { projectsConfig } from '@/data/projectsConfig'

export default function TimelineSection() {
  return (
    <section className="relative min-h-screen bg-gray-900 py-20">
      <div className="mx-auto max-w-7xl px-8">
        <h2 className="mb-20 text-center text-4xl font-bold text-gray-100">
          项目时间轴
        </h2>

        {/* 时间轴容器 */}
        <div className="relative">
          {/* 中心垂直线 */}
          <div className="absolute left-1/2 hidden h-full w-0.5 -translate-x-1/2 transform bg-gray-700 md:block" />

          {/* 移动端左侧线条 */}
          <div className="absolute left-8 h-full w-0.5 bg-gray-700 md:hidden" />

          {/* 项目列表 */}
          <div className="space-y-16">
            {projectsConfig.projects.map((project, index) => {
              const isLeft = index % 2 === 0

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${
                    isLeft ? 'justify-end md:justify-start' : 'justify-end md:justify-end'
                  }`}
                >
                  {/* 时间标签 */}
                  <div className="absolute left-1/2 z-10 hidden -translate-x-1/2 transform rounded-full bg-gray-100 px-4 py-2 text-sm font-bold text-gray-900 md:block">
                    {project.date}
                  </div>

                  {/* 移动端时间标签 */}
                  <div className="absolute left-8 z-10 -translate-x-1/2 transform rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-900 md:hidden">
                    {project.date}
                  </div>

                  {/* 项目卡片 */}
                  <div
                    className={`w-full md:w-5/12 ${isLeft ? 'pr-4 text-left md:pr-12 md:text-right' : 'pl-4 text-left md:pl-12'}`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="group relative overflow-hidden rounded-lg shadow-lg"
                    >
                      {/* 项目图片占位 */}
                      <div className="relative aspect-video bg-gray-700">
                        {/* 图片后续填充 */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                        {/* 项目名称覆盖 */}
                        <div className="absolute right-4 bottom-4 left-4">
                          <h3 className="text-xl font-bold text-white">{project.name}</h3>
                          <p className="mt-1 line-clamp-2 text-sm text-gray-200">
                            {project.description}
                          </p>
                        </div>

                        {/* 标签 */}
                        {project.tags && (
                          <div className="absolute top-4 right-4 flex gap-2">
                            {project.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="rounded bg-white/20 px-2 py-1 text-xs text-white backdrop-blur-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
