'use client'

import { useEffect, useState } from 'react'
import { useScrollState } from '@/components/SmoothScroll'

/**
 * useScrollProgress Hook
 *
 * 基于 Lenis 的 scroll 事件提供实时滚动进度（0-1）
 * 可用于进度条、页面指示器等
 *
 * @example
 * const progress = useScrollProgress()
 * return <progress value={progress} max={1} />
 *
 * @example - 带节流
 * const progress = useScrollProgress({ throttle: 100 })
 */
export function useScrollProgress(options?: { throttle?: number }) {
  const { progress } = useScrollState()
  const [throttledProgress, setThrottledProgress] = useState(progress)
  const throttleRef = useRef<NodeJS.Timeout | undefined>(undefined)

  useEffect(() => {
    if (options?.throttle) {
      if (throttleRef.current) {
        clearTimeout(throttleRef.current)
      }
      throttleRef.current = setTimeout(() => {
        setThrottledProgress(progress)
      }, options.throttle)
    } else {
      setThrottledProgress(progress)
    }

    return () => {
      if (throttleRef.current) {
        clearTimeout(throttleRef.current)
      }
    }
  }, [progress, options?.throttle])

  return options?.throttle ? throttledProgress : progress
}

/**
 * useScrollVelocity Hook
 *
 * 获取当前滚动速度，可用于动态效果
 * 速度值越大表示滚动越快
 *
 * @example
 * const velocity = useScrollVelocity()
 * const scale = 1 + Math.min(velocity * 0.01, 0.2)
 * return <div style={{ transform: `scale(${scale})` }} />
 */
export function useScrollVelocity() {
  const { velocity } = useScrollState()
  return velocity
}

/**
 * useScrollDirection Hook
 *
 * 检测滚动方向（向上或向下）
 *
 * @example
 * const direction = useScrollDirection()
 * const isVisible = direction === 1
 * return <header className={isVisible ? 'visible' : 'hidden'} />
 */
export function useScrollDirection() {
  const { direction } = useScrollState()
  return direction // 1: 向下, -1: 向上
}

import { useRef } from 'react'
