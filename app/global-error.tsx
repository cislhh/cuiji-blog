'use client'

import { useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'

/**
 * Global Error Boundary
 *
 * 捕获根布局中的错误，这是最后的错误处理防线。
 *
 * 重要说明：
 * - 必须是客户端组件 ('use client')
 * - 不能使用其他组件（会导致无限循环）
 * - 只能使用原生 HTML 元素
 *
 * 使用场景：
 * - 处理根布局错误
 * - 处理服务端组件错误
 * - 作为最后的错误捕获器
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 记录全局错误
    console.error('Global error:', error)
  }, [error])

  return (
    <html>
      <body>
        <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4">
          <div className="max-w-md rounded-2xl bg-gray-900 p-8 text-center shadow-2xl">
            {/* 错误图标 */}
            <div className="mb-6 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
                <AlertTriangle className="h-10 w-10 text-red-500" />
              </div>
            </div>

            {/* 错误标题 */}
            <h2 className="mb-4 text-3xl font-bold text-gray-100">应用错误</h2>

            {/* 错误描述 */}
            <p className="mb-8 text-gray-400">
              应用遇到了严重错误。请刷新页面或稍后重试。
            </p>

            {/* 操作按钮 */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={() => window.location.reload()}
                className="flex items-center justify-center gap-2 rounded-lg bg-primary-500 px-6 py-3 text-white transition-all hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span>刷新页面</span>
              </button>
            </div>

            {/* 开发环境错误信息 */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-6 rounded-lg bg-red-500/10 p-4">
                <p className="mb-2 text-sm font-semibold text-red-400">错误详情</p>
                <p className="text-xs text-gray-400">{error.message}</p>
                {error.digest && (
                  <p className="mt-2 text-xs text-gray-500">Digest: {error.digest}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </body>
    </html>
  )
}
