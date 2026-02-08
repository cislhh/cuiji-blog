/**
 * 滚动效果组件的类型定义
 */

import { ReactNode } from 'react'

/**
 * 滚动触发动画类型
 */
export type ScrollAnimationType =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'zoom-in'
  | 'zoom-out'
  | 'slide-up'
  | 'slide-down'
  | 'rotate'

/**
 * 视差层配置
 */
export interface ParallaxLayer {
  /** 层内容 */
  children: ReactNode
  /** 视差速度 (0-1)，越小越慢 */
  speed: number
  /** 自定义类名 */
  className?: string
}

/**
 * 滚动触发组件属性
 */
export interface ScrollTriggerProps {
  /** 子元素 */
  children: ReactNode
  /** 动画类型 */
  animation?: ScrollAnimationType
  /** 触发阈值 (0-1)，元素进入视口的比例 */
  threshold?: number
  /** 动画延迟（毫秒） */
  delay?: number
  /** 动画持续时间（秒） */
  duration?: number
  /** 自定义类名 */
  className?: string
  /** 仅触发一次 */
  once?: boolean
  /** 初始状态是否可见 */
  initialInView?: boolean
}

/**
 * 批量滚动触发组件属性
 */
export interface StaggerScrollProps {
  /** 子元素 */
  children: ReactNode
  /** 每个子元素的延迟间隔（秒） */
  stagger?: number
  /** 动画类型 */
  animation?: ScrollAnimationType
  /** 触发阈值 */
  threshold?: number
  /** 动画持续时间（秒） */
  duration?: number
  /** 自定义类名 */
  className?: string
}
