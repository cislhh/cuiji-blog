'use client'

import Card from '@/components/Card'
import { motion } from 'motion/react'

interface Project {
  title?: string
  description?: string
  imgSrc?: string
  href?: string
}

interface ProjectsClientProps {
  projectsData: Project[]
}

export default function ProjectsClient({ projectsData }: ProjectsClientProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg-start to-dark-bg-end">
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
              className="mb-4 text-5xl font-bold text-gray-100 md:text-6xl"
            >
              项目作品
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-gray-400"
            >
              我参与开发的一些项目展示
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* 项目网格 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8"
      >
        <div className="-m-4 flex flex-wrap">
          {projectsData.map((d, index) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card title={d.title} description={d.description} imgSrc={d.imgSrc} href={d.href} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
