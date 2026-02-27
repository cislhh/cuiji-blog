'use client'

import { Fragment, useEffect, useRef } from 'react'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { motion } from 'motion/react'
import { X } from 'lucide-react'
import { useSmoothScroll } from '@/components/SmoothScroll'
import { projectsConfig } from '@/data/projectsConfig'
import ImageCarousel from './ImageCarousel'
import { Project } from '@/data/projects/types'
import Link from '@/components/Link'

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const lenis = useSmoothScroll()

  // 处理 Lenis 平滑滚动锁定
  useEffect(() => {
    if (isOpen) {
      // 停止 Lenis 平滑滚动
      lenis?.stop()
      // 禁用 body 滚动
      document.body.style.overflow = 'hidden'
    } else {
      // 启动 Lenis 平滑滚动
      lenis?.start()
      // 恢复 body 滚动
      document.body.style.overflow = ''
    }

    return () => {
      // 清理：确保 Lenis 重新启动
      lenis?.start()
      document.body.style.overflow = ''
    }
  }, [isOpen, lenis])

  if (!project) return null

  const isCompany = project.ownershipType === 'company'

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" onClose={onClose} className="relative z-50">
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="glass-panel relative w-full max-w-4xl rounded-2xl shadow-2xl">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm hover:bg-black/70 transition-colors"
                  aria-label={projectsConfig.modal.closeButtonAriaLabel}
                >
                  <X className="h-5 w-5" />
                </button>

                <div
                  ref={modalRef}
                  className="p-6 md:p-8 overflow-y-auto max-h-[90vh]"
                  style={{
                    overscrollBehavior: 'contain',
                  }}
                  data-lenis-prevent
                >
                  {/* Type Badge and Date */}
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        isCompany ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
                      }`}
                    >
                      {isCompany ? projectsConfig.typeLabels.company : projectsConfig.typeLabels.personal}
                    </span>
                    <span className="text-gray-500">{project.date}</span>
                  </div>

                  {/* Title */}
                  <h2 className="mb-4 text-3xl font-bold text-gray-100">{project.name}</h2>

                  {/* Image Carousel */}
                  <div className="mb-8">
                    <ImageCarousel images={project.images} />
                  </div>

                  {/* Description */}
                  <div className="mb-8">
                    <h3 className="mb-3 text-xl font-semibold text-gray-200">
                      {projectsConfig.modal.projectIntroTitle}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {project.longDescription || project.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-8">
                    <h3 className="mb-3 text-xl font-semibold text-gray-200">
                      {projectsConfig.modal.techStackTitle}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="rounded-lg bg-gray-800/50 px-4 py-2 text-gray-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  {project.highlights && project.highlights.length > 0 && (
                    <div className="mb-8">
                      <h3 className="mb-3 text-xl font-semibold text-gray-200">
                        {projectsConfig.modal.highlightsTitle}
                      </h3>
                      <div className="space-y-3">
                        {project.highlights.map((highlight, index) => (
                          <div key={index} className="rounded-lg bg-gray-800/30 p-4">
                            <h4 className="mb-1 font-medium text-gray-200">{highlight.title}</h4>
                            <p className="text-gray-400 text-sm">{highlight.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Link */}
                  {project.link && (
                    <div className="flex justify-start">
                      <Link
                        href={project.link}
                        className="rounded-lg bg-primary-500 px-6 py-3 font-medium text-white hover:bg-primary-600 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {projectsConfig.modal.visitProjectText}
                      </Link>
                    </div>
                  )}
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
