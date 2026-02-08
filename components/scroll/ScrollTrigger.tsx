'use client'

import { useEffect, useRef, useState, ReactNode, Children } from 'react'
import { motion, type Transition } from 'motion/react'
import type { ScrollTriggerProps, ScrollAnimationType } from './types'

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * 动画变体配置
 * 基于 Motion (Framer Motion) 的动画系统
 */
const animationVariants: Record<ScrollAnimationType, Record<string, unknown>> = {
  'fade-up': {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-down': {
    hidden: { opacity: 0, y: -60 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-left': {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  'fade-right': {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  'zoom-in': {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  'zoom-out': {
    hidden: { opacity: 0, scale: 1.2 },
    visible: { opacity: 1, scale: 1 },
  },
  'slide-up': {
    hidden: { y: '100%' },
    visible: { y: 0 },
  },
  'slide-down': {
    hidden: { y: '-100%' },
    visible: { y: 0 },
  },
  rotate: {
    hidden: { opacity: 0, rotate: -10, scale: 0.9 },
    visible: { opacity: 1, rotate: 0, scale: 1 },
  },
}

/**
 * ScrollTrigger Component
 *
 * 滚动触发动画组件，基于 Intersection Observer 和 Motion
 * 当元素进入视口时触发动画
 *
 * @example
 * <ScrollTrigger animation="fade-up" delay={200}>
 *   <h1>Title</h1>
 * </ScrollTrigger>
 *
 * @example - 自定义阈值
 * <ScrollTrigger animation="zoom-in" threshold={0.3} once={false}>
 *   <Image src={...} />
 * </ScrollTrigger>
 *
 * 特性：
 * - 支持 9 种预设动画类型
 * - 可配置触发阈值
 * - 支持延迟和持续时间
 * - 可选择是否仅触发一次
 * - 性能优化：使用 Intersection Observer
 */
export default function ScrollTrigger({
  children,
  animation = 'fade-up',
  threshold = 0.1,
  delay = 0,
  duration = 0.6,
  className = '',
  once = true,
  initialInView = false,
}: ScrollTriggerProps) {
  const [isVisible, setIsVisible] = useState(initialInView)
  const [hasAnimated, setHasAnimated] = useState(initialInView)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // 创建 Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!hasAnimated || !once) {
              setIsVisible(true)
              setHasAnimated(true)
            }
          } else if (!once) {
            // 如果不是仅触发一次，离开视口时重置
            setIsVisible(false)
          }
        })
      },
      {
        threshold,
        rootMargin: '50px', // 提前 50px 开始触发
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, once, hasAnimated])

  const variants = animationVariants[animation]

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      // @ts-expect-error - Motion variant types are complex
      variants={variants}
      transition={{
        duration,
        delay: delay / 1000,
        ease: [0.25, 0.1, 0.25, 1], // 自定义缓动函数
      }}
      style={{
        // 性能优化提示
        willChange: isVisible ? 'auto' : 'transform, opacity',
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * 批量滚动触发组件
 * 用于为多个子元素添加交错动画
 *
 * @example
 * <StaggerScroll stagger={0.1} animation="fade-up">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </StaggerScroll>
 */
export interface StaggerScrollProps {
  children: ReactNode
  stagger?: number // 每个子元素的延迟间隔（秒）
  animation?: ScrollAnimationType
  threshold?: number
  duration?: number
  className?: string
}

export function StaggerScroll({
  children,
  stagger = 0.1,
  animation = 'fade-up',
  threshold = 0.1,
  duration = 0.6,
  className = '',
}: StaggerScrollProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold])

  const variants = animationVariants[animation]

  return (
    <div ref={ref} className={className}>
      {(Children.toArray(children) as ReactNode[]).map((child, index) => (
        <motion.div
          key={index}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          // @ts-expect-error - Motion variant types are complex
          variants={variants}
          transition={{
            duration,
            delay: index * stagger,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}
