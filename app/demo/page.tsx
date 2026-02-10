'use client'

import { ParallaxSection, ScrollTrigger, StaggerScroll } from '@/components/scroll'
import { useScrollProgress } from '@/components/scroll'
import HorizontalScroll from '@/components/scroll/HorizontalScroll'

/**
 * 滚动效果演示页面
 *
 * 展示所有滚动效果组件的使用方法
 */
export default function DemoPage() {
  const progress = useScrollProgress()

  // 自定义卡片数据
  const customCards = [
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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* 滚动进度条 */}
      <div className="fixed top-0 right-0 left-0 z-50 h-1 bg-gray-200 dark:bg-gray-800">
        <div
          className="h-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-75"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Hero Section */}
      <section className="flex h-screen items-center justify-center">
        <ScrollTrigger animation="fade-up">
          <h1 className="mb-4 text-6xl font-bold">滚动效果演示</h1>
          <p className="text-xl text-gray-400">向下滚动查看各种效果</p>
        </ScrollTrigger>
      </section>

      {/* HorizontalScroll 演示 - 核心功能 */}
      <section>
        <div className="mb-12 px-4 pt-20 text-center">
          <ScrollTrigger animation="fade-up">
            <h2 className="mb-4 text-4xl font-bold">水平滚动 (Horizontal Scroll)</h2>
            <p className="text-gray-400">
              参考 lenis.darkroom.engineering 实现，当滚动到中心时触发水平滚动
            </p>
          </ScrollTrigger>
        </div>
        <HorizontalScroll cards={customCards} />
      </section>

      {/* ScrollTrigger 演示 */}
      <section className="min-h-screen px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <ScrollTrigger animation="fade-up" className="mb-12">
            <h2 className="mb-4 text-4xl font-bold">ScrollTrigger 效果</h2>
            <p className="text-gray-400">当元素进入视口时触发动画。刷新页面重新查看效果。</p>
          </ScrollTrigger>

          <StaggerScroll stagger={0.1} animation="fade-up" className="grid grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 text-4xl font-bold dark:from-amber-900 dark:to-amber-800"
              >
                {i}
              </div>
            ))}
          </StaggerScroll>
        </div>
      </section>

      {/* ParallaxSection 演示 */}
      <section className="relative" style={{ height: '200vh' }}>
        <ParallaxSection
          height="100vh"
          layers={[
            {
              speed: 0,
              children: (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
                  <h3 className="text-5xl font-bold text-white opacity-20">背景层</h3>
                </div>
              ),
            },
            {
              speed: 0.5,
              children: (
                <div className="flex h-full w-full items-center justify-center">
                  <div className="text-center">
                    <h2 className="mb-4 text-6xl font-bold">视差滚动</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400">不同层以不同速度移动</p>
                  </div>
                </div>
              ),
            },
          ]}
        />
      </section>

      {/* 更多动画演示 */}
      <section className="min-h-screen px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-4xl font-bold">各种动画效果</h2>

          <div className="grid grid-cols-2 gap-8">
            <ScrollTrigger
              animation="fade-up"
              className="rounded-2xl bg-gray-100 p-8 dark:bg-gray-800"
            >
              <h3 className="mb-2 text-2xl font-bold">Fade Up</h3>
              <p className="text-gray-400">从下方淡入</p>
            </ScrollTrigger>

            <ScrollTrigger
              animation="fade-down"
              className="rounded-2xl bg-gray-100 p-8 dark:bg-gray-800"
            >
              <h3 className="mb-2 text-2xl font-bold">Fade Down</h3>
              <p className="text-gray-400">从上方淡入</p>
            </ScrollTrigger>

            <ScrollTrigger
              animation="zoom-in"
              className="rounded-2xl bg-gray-100 p-8 dark:bg-gray-800"
            >
              <h3 className="mb-2 text-2xl font-bold">Zoom In</h3>
              <p className="text-gray-400">从小到大缩放</p>
            </ScrollTrigger>

            <ScrollTrigger
              animation="rotate"
              className="rounded-2xl bg-gray-100 p-8 dark:bg-gray-800"
            >
              <h3 className="mb-2 text-2xl font-bold">Rotate</h3>
              <p className="text-gray-400">旋转进入</p>
            </ScrollTrigger>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-gray-400">
        <p>滚动到底部了！进度: {Math.round(progress * 100)}%</p>
      </footer>
    </div>
  )
}
