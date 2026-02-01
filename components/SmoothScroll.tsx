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
 */

const LenisContext = createContext<Lenis | null>(null)

export function SmoothScroll({
  children,
  options = {},
}: {
  children: React.ReactNode
  options?: LenisOptions
}) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const optionsRef = useRef(options)

  // Update ref when options change
  useEffect(() => {
    optionsRef.current = options
  }, [options])

  useEffect(() => {
    const lenisInstance = new Lenis({
      autoRaf: true, // 自动处理 RAF 循环，无需手动管理
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
      anchors: true, // 自动处理锚点链接
      syncTouch: false, // 更好的移动端性能
      ...optionsRef.current,
    })

    setLenis(lenisInstance)

    return () => {
      lenisInstance.destroy()
      setLenis(null)
    }
  }, []) // 空依赖数组 - 仅初始化一次

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
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
  return context
}

// 默认导出保持兼容性
export default SmoothScroll
