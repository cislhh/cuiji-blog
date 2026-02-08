'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'
import { useSmoothScroll } from '@/components/SmoothScroll'

export interface ParallaxLayer {
  /** 层内容 */
  children: ReactNode
  /** 视差速度 (0-1)，越小越慢 */
  speed: number
  /** 自定义类名 */
  className?: string
}

export interface ParallaxSectionProps {
  /** 视差层配置数组 */
  layers: ParallaxLayer[]
  /** 容器高度（像素或 vh 单位） */
  height?: string | number
  /** 容器类名 */
  className?: string
}

/**
 * ParallaxSection Component
 *
 * 多层视差滚动组件，基于 Lenis 的 scroll 事件实现
 * 使用 transform 进行 GPU 加速优化性能
 *
 * @example
 * <ParallaxSection
 *   height="100vh"
 *   layers={[
 *     { speed: 0, children: <Background /> },
 *     { speed: 0.5, children: <MiddleContent /> },
 *     { speed: 1, children: <Foreground /> },
 *   ]}
 * />
 *
 * 性能优化：
 * - 使用 transform 而非 top/position
 * - 使用 will-change 提示浏览器优化
 * - 使用 requestAnimationFrame 同步渲染
 */
export default function ParallaxSection({
  layers,
  height = '100vh',
  className = '',
}: ParallaxSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lenis = useSmoothScroll()
  const [offsets, setOffsets] = useState<number[]>(() => layers.map(() => 0))

  useEffect(() => {
    if (!lenis || !containerRef.current) return

    const container = containerRef.current
    const rect = container.getBoundingClientRect()
    const containerHeight = rect.height

    // 监听 Lenis scroll 事件（官方 API）
    const unsubscribe = lenis.on('scroll', (lenisInstance) => {
      const scrollY = lenisInstance.actualScroll
      const containerTop = scrollY + rect.top
      const containerBottom = containerTop + containerHeight

      // 只在容器可见时计算
      if (scrollY < containerBottom && scrollY + window.innerHeight > containerTop) {
        // 计算相对容器的滚动位置
        const relativeScroll = scrollY - containerTop
        const progress = relativeScroll / containerHeight

        // 为每一层计算偏移
        const newOffsets = layers.map((layer) => {
          // 速度差：speed=0 不动，speed=1 正常速度，speed=0.5 半速
          const offset = relativeScroll * (1 - layer.speed)
          return offset
        })

        setOffsets(newOffsets)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [lenis, layers])

  const containerStyle = {
    height: typeof height === 'number' ? `${height}px` : height,
    position: 'relative' as const,
    overflow: 'hidden',
  }

  return (
    <div ref={containerRef} className={className} style={containerStyle}>
      {layers.map((layer, index) => (
        <div
          key={index}
          className={`absolute inset-0 ${layer.className || ''}`}
          style={{
            transform: `translate3d(0, ${offsets[index]}px, 0)`,
            willChange: 'transform',
          }}
        >
          {layer.children}
        </div>
      ))}
    </div>
  )
}
