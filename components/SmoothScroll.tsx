'use client'

import { createContext, useContext, useEffect, useState, useRef } from 'react'
import Lenis from 'lenis'
import type { LenisOptions } from 'lenis'

/**
 * SmoothScroll Component (Lenis Provider)
 *
 * 使用 Lenis 库提供平滑滚动体验。
 * 基于 React Context + Provider 模式，符合 React 最佳实践。
 *
 * 关键配置：
 * - autoRaf: true - 自动管理 requestAnimationFrame 循环
 * - duration: 1.2s - 平滑滚动持续时间
 * - easing: 自定义缓动函数 - 自然的减速效果
 * - touchMultiplier: 2 - 触摸设备灵敏度
 * - anchors: true - 自动处理锚点链接
 * - syncTouch: false - 更好的移动端性能
 *
 * 增强功能：
 * - 滚动进度追踪 (progress: 0-1)
 * - 滚动速度检测 (velocity)
 * - 滚动方向检测 (direction: 1 | -1)
 * - 实时滚动数据更新
 */

interface ScrollState {
  progress: number // 0 到 1 的滚动进度
  velocity: number // 当前滚动速度
  direction: 1 | -1 // 1: 向下, -1: 向上
  isScrolling: boolean // 是否正在滚动
}

const LenisContext = createContext<{
  lenis: Lenis | null
  scrollState: ScrollState
}>({ lenis: null, scrollState: { progress: 0, velocity: 0, direction: 1, isScrolling: false } })

export function SmoothScroll({
  children,
  options = {},
}: {
  children: React.ReactNode
  options?: LenisOptions
}) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const [scrollState, setScrollState] = useState<ScrollState>({
    progress: 0,
    velocity: 0,
    direction: 1,
    isScrolling: false,
  })
  const optionsRef = useRef(options)
  const rafRef = useRef<number | undefined>(undefined)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  // Update ref when options change
  useEffect(() => {
    optionsRef.current = options
  }, [options])

  useEffect(() => {
    const lenisInstance = new Lenis({
      autoRaf: false, // 手动管理 RAF 以支持滚动状态追踪
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
      anchors: true,
      syncTouch: false,
      ...optionsRef.current,
    })

    setLenis(lenisInstance)

    // 监听 Lenis scroll 事件（官方 API）
    lenisInstance.on('scroll', (lenis) => {
      setScrollState({
        progress: lenis.progress,
        velocity: lenis.velocity,
        direction: lenis.direction as 1 | -1,
        isScrolling: true,
      })

      // 重置滚动超时
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setScrollState((prev) => ({ ...prev, isScrolling: false, velocity: 0 }))
      }, 150)
    })

    // 手动 RAF 循环
    function raf(time: number) {
      lenisInstance.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }
    rafRef.current = requestAnimationFrame(raf)

    return () => {
      lenisInstance.destroy()
      setLenis(null)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, []) // 空依赖数组 - 仅初始化一次

  const contextValue = { lenis, scrollState }

  return <LenisContext.Provider value={contextValue}>{children}</LenisContext.Provider>
}

/**
 * Hook to access Lenis instance
 * 用于在组件中访问 Lenis 实例
 *
 * @example
 * const lenis = useSmoothScroll()
 * lenis?.scrollTo('#top')
 */
export function useSmoothScroll() {
  const context = useContext(LenisContext)
  if (context === undefined) {
    throw new Error('useSmoothScroll must be used within SmoothScroll provider')
  }
  return context.lenis
}

/**
 * Hook to access scroll state
 * 用于访问实时滚动状态
 *
 * @example
 * const { progress, velocity, direction, isScrolling } = useScrollState()
 */
export function useScrollState(): ScrollState {
  const context = useContext(LenisContext)
  if (context === undefined) {
    throw new Error('useScrollState must be used within SmoothScroll provider')
  }
  return context.scrollState
}

// 默认导出保持兼容性
export default SmoothScroll
