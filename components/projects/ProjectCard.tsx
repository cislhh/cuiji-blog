'use client'

import { motion } from 'motion/react'
import { memo } from 'react'
import Image from '@/components/Image'
import { projectsConfig } from '@/data/projectsConfig'
import { Project } from '@/data/projects/types'

interface ProjectCardProps {
  project: Project
  onClick: () => void
  index: number
}

function ProjectCard({ project, onClick, index }: ProjectCardProps) {
  const isCompany = project.ownershipType === 'company'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="glass-panel hover:border-primary-500/30 h-full overflow-hidden rounded-xl border border-transparent transition-all duration-300 hover:shadow-xl">
        {/* Cover Image */}
        <div className="relative overflow-hidden">
          <Image
            alt={project.name}
            src={project.coverImage || project.images[0]?.src || ''}
            className="w-full object-cover object-center transition-transform duration-300 group-hover:scale-105 aspect-video"
            width={800}
            height={450}
          />
          {/* Screenshot Count Overlay */}
          <div className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs text-white backdrop-blur-sm">
            {project.images.length} {projectsConfig.modal.screenshotCountText}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Type Badge and Date */}
          <div className="mb-3 flex items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                isCompany ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
              }`}
            >
              {isCompany ? projectsConfig.typeLabels.company : projectsConfig.typeLabels.personal}
            </span>
            <span className="text-gray-500 text-sm">{project.date}</span>
          </div>

          {/* Title */}
          <h3 className="mb-2 text-xl font-bold text-gray-100">{project.name}</h3>

          {/* Description */}
          <p className="mb-4 line-clamp-2 text-gray-400 text-sm">{project.description}</p>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-md bg-gray-800/50 px-2 py-1 text-xs text-gray-300">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/**
 * React.memo 优化
 *
 * 防止在父组件重新渲染时不必要地重新渲染 ProjectCard。
 *
 * 比较函数：
 * - 仅当 project.id 或 index 改变时才重新渲染
 * - project 对象的其他属性变化不会触发重新渲染
 */
export default memo(ProjectCard, (prevProps, nextProps) => {
  return (
    prevProps.project.id === nextProps.project.id &&
    prevProps.index === nextProps.index
  )
})
