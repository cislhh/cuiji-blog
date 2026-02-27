'use client'

import { Suspense, Component, ReactNode } from 'react'
import SmoothScroll from '@/components/SmoothScroll'
import ParticleTrail from '@/components/ParticleTrail'

/**
 * ClientProviders Component
 *
 * 客户端功能包装器，将客户端交互组件与服务端组件分离。
 *
 * 职责：
 * - 管理平滑滚动（Lenis）
 * - 管理粒子特效
 * - 提供客户端交互上下文
 * - 错误边界保护
 *
 * 性能优化：
 * - 使用 Suspense 包装客户端组件，避免阻塞渲染
 * - 错误边界防止客户端组件崩溃影响整个应用
 */

interface ClientProvidersProps {
  children: ReactNode
}

interface ClientProvidersState {
  hasError: boolean
}

class ClientErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_: Error): { hasError: boolean } {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-gray-950">
          <div className="max-w-md rounded-lg bg-gray-900 p-8 text-center shadow-lg">
            <h2 className="mb-4 text-2xl font-bold text-red-500">出错了</h2>
            <p className="mb-6 text-gray-400">页面加载时遇到问题，请刷新重试</p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-lg bg-primary-500 px-6 py-2 text-white hover:bg-primary-600 transition-colors"
            >
              刷新页面
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <ClientErrorBoundary>
      <Suspense
        fallback={
          <div
            className="min-h-screen flex items-center justify-center"
            role="status"
            aria-live="polite"
          >
            <div className="animate-pulse text-gray-600">加载中...</div>
          </div>
        }
      >
        <ParticleTrail />
        <SmoothScroll>{children}</SmoothScroll>
      </Suspense>
    </ClientErrorBoundary>
  )
}
