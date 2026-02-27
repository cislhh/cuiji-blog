'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import Image from '@/components/Image'
import ProjectModal from '@/components/projects/ProjectModal'
import { projectsConfig } from '@/data/projectsConfig'
import { getFeaturedProjects } from '@/data/projects/utils'
import { Project } from '@/data/projects/types'
import Link from 'next/link'

function FeaturedProjectCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.03, y: -5 }}
      className="group"
    >
      <button
        onClick={onClick}
        className="block h-full w-full text-left"
        aria-label={`查看 ${project.name} 项目详情`}
      >
        <div className="glass-panel hover:border-primary-500/30 h-full overflow-hidden rounded-xl border border-transparent transition-all duration-300 hover:shadow-xl">
          {/* Cover Image with Gradient Overlay */}
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={project.coverImage || project.images[0]?.src || '/static/images/project-placeholder.jpg'}
              alt={project.name}
              width={800}
              height={450}
              className="object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Date Badge (top-right) */}
            <div className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur-sm">
              {project.date}
            </div>

            {/* Tags (top-right, below date) */}
            <div className="absolute right-3 top-10 flex flex-col items-end gap-1.5">
              {project.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-white/20 px-2 py-0.5 text-xs text-white backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title and Description (bottom) */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="mb-2 text-lg font-bold text-white">{project.name}</h3>
              <p className="line-clamp-2 text-sm text-gray-300">{project.description}</p>
            </div>
          </div>
        </div>
      </button>
    </motion.div>
  )
}

export default function FeaturedWorks() {
  const featuredWorks = projectsConfig.featuredWorks
  const projects = getFeaturedProjects()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  if (!featuredWorks || projects.length === 0) {
    return null
  }

  return (
    <section className="relative bg-gray-900 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-2 text-3xl font-bold text-gray-100 md:text-4xl">{featuredWorks.title}</h2>
          <p className="text-gray-400">{featuredWorks.subtitle}</p>
        </motion.div>

        {/* Cards Grid with View More Button */}
        <div className="relative">
          {/* Project Cards Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <FeaturedProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => handleProjectClick(project)}
              />
            ))}
          </div>

          {/* View More Button - Desktop (bottom-right, absolute positioned) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 text-right lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:mt-0"
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-gray-400 transition-colors hover:text-primary-400"
            >
              <span className="text-sm">{featuredWorks.viewMoreText}</span>
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </motion.div>

          {/* View More Button - Mobile (centered below) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 text-center md:hidden"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-gray-400 transition-colors hover:text-primary-400"
            >
              <span>{featuredWorks.viewMoreText}</span>
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={handleCloseModal} />
    </section>
  )
}
