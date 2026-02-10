/**
 * 滚动效果组件导出
 *
 * 基于 Lenis 官方 API 构建的滚动效果组件集合
 */

export { default as ParallaxSection } from './ParallaxSection'
export type { ParallaxLayer, ParallaxSectionProps } from './ParallaxSection'

export { default as ScrollTrigger, StaggerScroll } from './ScrollTrigger'
export type { ScrollTriggerProps, StaggerScrollProps, ScrollAnimationType } from './types'

export { default as HorizontalScroll } from './HorizontalScroll'
export type { Card, HorizontalScrollProps } from './HorizontalScroll'

export { useScrollProgress, useScrollVelocity, useScrollDirection } from './useScrollProgress'
