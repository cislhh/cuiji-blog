'use client'

import { useEffect, useRef, useState } from 'react'
import { useSmoothScroll } from '@/components/SmoothScroll'

export interface Card {
  id: number
  title: string
  description: string
  category: string
  image?: string
}

export interface HorizontalScrollProps {
  cards?: Card[]
  cardWidth?: number
  gapPercent?: number
  className?: string
}

const DEFAULT_CARDS: Card[] = [
  {
    id: 1,
    title: 'Ibicash',
    description: 'darkroom.engineering',
    category: 'Finance',
  },
  {
    id: 2,
    title: 'Grand Theft Auto VI',
    description: 'Rockstar Games',
    category: 'Gaming',
  },
  {
    id: 3,
    title: 'Getty - Sculpting Harmony',
    description: 'Resn',
    category: 'Art',
  },
  {
    id: 4,
    title: 'Microsoft Design',
    description: 'Microsoft',
    category: 'Technology',
  },
  {
    id: 5,
    title: 'Shopify Supply',
    description: 'Shopify',
    category: 'E-commerce',
  },
]

/**
 * HorizontalScroll Component
 *
 * 参考 lenis.darkroom.engineering 的实现
 * 使用 sticky + Lenis 实现的水平滚动组件
 *
 * 核心原理:
 * 1. 创建足够高的父容器，高度 = 视口高度 + 滚动距离
 * 2. 使用 sticky 定位在屏幕中心（top: 0 配合 flex 居中）
 * 3. 监听 Lenis 的 scroll 事件获取实时滚动位置
 * 4. 将垂直滚动距离转换为水平位移
 *
 * 特性:
 * - 完全解耦，可复用
 * - 响应式设计，使用 viewport 单位
 * - Lenis 原生 API，无额外依赖
 * - 自动计算高度和滚动距离
 * - 垂直滚动停止，视觉上水平滚动
 */
export function HorizontalScroll({
  cards = DEFAULT_CARDS,
  cardWidth = 320,
  gapPercent = 3,
  className = '',
}: HorizontalScrollProps) {
  const lenis = useSmoothScroll()
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyWrapperRef = useRef<HTMLDivElement>(null)
  const horizontalWrapperRef = useRef<HTMLDivElement>(null)
  const [containerHeight, setContainerHeight] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [dimensions, setDimensions] = useState({ viewportWidth: 1200, viewportHeight: 800 })
  const [cardSize, setCardSize] = useState(0)

  // 监听视口尺寸变化
  useEffect(() => {
    const updateDimensions = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight

      // 响应式卡片宽度：基于基准宽度和视口宽度的比例
      const size = (cardWidth * vw) / 1440

      setDimensions({
        viewportWidth: vw,
        viewportHeight: vh,
      })
      setCardSize(size)
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [cardWidth])

  // 计算 gap（视口宽度的百分比）
  const gapPx = (dimensions.viewportWidth * gapPercent) / 100

  // 计算水平滚动的总距离
  // 初始状态：第一个card在视口中心
  // 结束状态：最后一个card在视口中心
  // 滚动距离 = (cards.length - 1) * (cardWidth + gap)
  const scrollDistance = Math.max(0, (cards.length - 1) * (cardSize + gapPx))

  // 计算容器高度
  useEffect(() => {
    // 容器高度 = 视口高度 + 水平滚动距离
    const height = dimensions.viewportHeight + scrollDistance
    setContainerHeight(height)
  }, [dimensions.viewportHeight, scrollDistance])

  // 水平滚动逻辑
  useEffect(() => {
    if (!lenis || !containerRef.current || !horizontalWrapperRef.current) return

    const container = containerRef.current
    const horizontalElement = horizontalWrapperRef.current

    const handleScroll = () => {
      if (!container || !horizontalElement) return

      // 获取容器的虚拟滚动位置（相对于视口顶部的距离）
      const rect = container.getBoundingClientRect()
      const currentScroll = -rect.top

      // 当容器顶部到达视口顶部时，开始计算水平滚动
      if (currentScroll >= 0) {
        // 计算滚动进度
        const progress = Math.min(1, Math.max(0, currentScroll / scrollDistance))
        setScrollProgress(progress)

        // 转换为水平滚动（向左移动）
        const translateX = -(progress * scrollDistance)
        horizontalElement.style.transform = `translateX(${translateX}px)`
      }
    }

    lenis.on('scroll', handleScroll)

    return () => {
      lenis.off('scroll', handleScroll)
    }
  }, [lenis, scrollDistance])

  // 计算内边距，使第一个card居中
  const paddingX = (dimensions.viewportWidth - cardSize) / 2

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ height: containerHeight }}
    >
      {/* Sticky 容器 - 固定在视口顶部，内容垂直居中 */}
      <div
        ref={stickyWrapperRef}
        className="sticky top-0 z-10 flex h-screen w-full items-center justify-center bg-white dark:bg-gray-950"
      >
        {/* 水平滚动的内容容器 - 使用 max-width 限制内容宽度 */}
        <div
          className="relative w-full"
          style={{ maxWidth: `${dimensions.viewportWidth}px` }}
        >
          {/* 实际滚动的卡片容器 */}
          <div
            ref={horizontalWrapperRef}
            className="flex will-change-transform"
            style={{
              gap: `${gapPx}px`,
              paddingLeft: `${paddingX}px`,
              paddingRight: `${paddingX}px`,
            }}
          >
            {cards.map((card) => (
              <div
                key={card.id}
                className="group hover:shadow-3xl flex-shrink-0 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl transition-all duration-300 hover:scale-105 dark:border-gray-700 dark:bg-gray-900"
                style={{ width: cardSize }}
              >
                {/* Card Image/Visual Area */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-900 backdrop-blur-sm dark:bg-gray-900/90 dark:text-white">
                    {card.category}
                  </div>

                  {/* Visual Content */}
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="text-center">
                      <div className="mb-2 text-6xl opacity-20 transition-opacity duration-300 group-hover:opacity-30">
                        {String(card.id).padStart(2, '0')}
                      </div>
                      <div className="text-sm font-medium tracking-wider text-gray-400 uppercase">
                        Showcase
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                {/* Card Info */}
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Progress Indicator */}
        <div className="fixed bottom-8 left-1/2 z-20 -translate-x-1/2 rounded-full bg-white/90 px-6 py-3 text-sm font-medium text-gray-900 shadow-lg backdrop-blur-sm dark:bg-gray-900/90 dark:text-white">
          <div className="flex items-center gap-2">
            <span>Scroll</span>
            <span className="text-gray-400">→</span>
            <span className="font-bold">{Math.round(scrollProgress * 100)}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HorizontalScroll
