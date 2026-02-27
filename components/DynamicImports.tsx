/**
 * Dynamic Imports Configuration
 *
 * 为重型组件配置动态导入，减少初始 bundle 大小。
 *
 * 策略：
 * - 模态框组件延迟加载（用户交互时才加载）
 * - 数据面板延迟加载
 * - 提供骨架屏加载状态
 *
 * 注意：ImageCarousel 不需要动态导入，因为它只在 ProjectModal 内部使用，
 * 而 ProjectModal 本身已经是动态导入的。
 *
 * 注意：评论功能已移除，不再需要 Comments 动态导入。
 */

'use client'

import dynamic from 'next/dynamic'
import { ComponentType } from 'react'

/**
 * ProjectModal - 项目详情模态框
 * 延迟加载：用户点击项目卡片时才加载
 * SSR：禁用（模态框不需要 SEO）
 *
 * 包含内容：ImageCarousel（内部导入）
 */
export const ProjectModal = dynamic(
  () => import('./projects/ProjectModal'),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="animate-pulse rounded-lg bg-gray-800 p-8">
          <div className="h-64 w-64 rounded bg-gray-700" />
        </div>
      </div>
    ),
  }
) as ComponentType<any>

/**
 * DataStatsPanel - 数据统计面板
 * 延迟加载：滚动到视口时才加载
 * SSR：启用
 */
export const DataStatsPanel = dynamic(
  () => import('./DataStatsPanel'),
  {
    loading: () => (
      <div className="glass-panel rounded-xl p-6 shadow-lg">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-24 rounded bg-gray-700" />
          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="h-4 w-20 rounded bg-gray-700" />
              <div className="h-4 w-12 rounded bg-gray-700" />
            </div>
            <div className="flex justify-between">
              <div className="h-4 w-20 rounded bg-gray-700" />
              <div className="h-4 w-12 rounded bg-gray-700" />
            </div>
          </div>
        </div>
      </div>
    ),
  }
) as ComponentType<any>

/**
 * LearningPanel - 学习进度面板
 * 延迟加载：滚动到视口时才加载
 * SSR：启用
 */
export const LearningPanel = dynamic(
  () => import('./LearningPanel'),
  {
    loading: () => (
      <div className="glass-panel rounded-xl p-6 shadow-lg">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-24 rounded bg-gray-700" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-full rounded bg-gray-700" />
                <div className="h-2 w-3/4 rounded bg-gray-700" />
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  }
) as ComponentType<any>

/**
 * EmailDropdown - 邮箱下拉组件
 * 延迟加载：交互时才加载
 * SSR：启用
 */
export const EmailDropdown = dynamic(
  () => import('./EmailDropdown'),
  {
    ssr: true,
    loading: () => (
      <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800 transition-colors hover:bg-gray-700">
        <div className="animate-pulse h-5 w-5 rounded bg-gray-600" />
      </button>
    ),
  }
) as ComponentType<any>

/**
 * QRCodePopup - 二维码弹窗组件
 * 延迟加载：交互时才加载
 * SSR：启用
 */
export const QRCodePopup = dynamic(
  () => import('./QRCodePopup'),
  {
    ssr: true,
    loading: () => (
      <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800 transition-colors hover:bg-gray-700">
        <div className="animate-pulse h-5 w-5 rounded bg-gray-600" />
      </button>
    ),
  }
) as ComponentType<any>
