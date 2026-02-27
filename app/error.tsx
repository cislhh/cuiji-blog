'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

/**
 * Global Error Boundary
 *
 * 捕获应用中的错误并显示友好的错误页面。
 *
 * 功能：
 * - 捕获渲染错误
 * - 提供重试机制
 * - 记录错误信息（开发环境）
 * - 友好的用户界面
 *
 * Next.js App Router 会自动捕获：
 * - 渲染错误
 * - 服务器错误
 * - 客户端错误
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 开发环境下记录错误到控制台
    if (process.env.NODE_ENV === 'development') {
      console.error('Application error:', error)
      console.error('Error digest:', error.digest)
    }

    // 生产环境可以将错误发送到监控服务
    // 例如：Sentry, LogRocket, Vercel Analytics
    if (process.env.NODE_ENV === 'production') {
      // TODO: 集成错误监控服务
      // logErrorToService(error, error.digest)
    }
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4">
      <div className="max-w-md rounded-2xl bg-gray-900 p-8 text-center shadow-2xl">
        {/* 错误图标 */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
            <AlertTriangle className="h-10 w-10 text-red-500" />
          </div>
        </div>

        {/* 错误标题 */}
        <h2 className="mb-4 text-3xl font-bold text-gray-100">出错了</h2>

        {/* 错误描述 */}
        <p className="mb-8 text-gray-400">
          {process.env.NODE_ENV === 'development'
            ? `错误信息: ${error.message}`
            : '页面加载时遇到问题，请稍后重试'}
        </p>

        {/* 错误摘要（仅开发环境） */}
        {process.env.NODE_ENV === 'development' && error.digest && (
          <div className="mb-6 rounded-lg bg-gray-800 p-4">
            <p className="mb-2 text-sm font-semibold text-gray-300">错误 ID</p>
            <code className="text-xs text-gray-400">{error.digest}</code>
          </div>
        )}

        {/* 操作按钮 */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="flex items-center justify-center gap-2 rounded-lg bg-primary-500 px-6 py-3 text-white transition-all hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <RefreshCw className="h-4 w-4" />
            <span>重试</span>
          </button>

          <button
            onClick={() => (window.location.href = '/')}
            className="flex items-center justify-center gap-2 rounded-lg bg-gray-800 px-6 py-3 text-gray-300 transition-all hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <span>返回首页</span>
          </button>
        </div>

        {/* 帮助信息 */}
        <div className="mt-8 rounded-lg bg-gray-800/50 p-4">
          <p className="text-sm text-gray-400">
            如果问题持续存在，请{' '}
            <a
              href="https://github.com/anthropic/cuiji-blog/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300 underline"
            >
              提交 Issue
            </a>
            {' '}或联系支持团队。
          </p>
        </div>
      </div>
    </div>
  )
}
