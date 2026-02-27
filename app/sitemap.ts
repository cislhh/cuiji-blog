import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl

  // 1. 首页 - 最高优先级
  const homePage = {
    url: siteUrl,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: 1,
  }

  // 2. 主要页面 - 高优先级
  const mainPages = ['blog', 'projects', 'tags', 'about'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // 3. 博客文章 - 根据日期动态调整优先级
  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => {
      const ageInDays =
        (Date.now() - new Date(post.date).getTime()) / (1000 * 60 * 60 * 24)

      // 根据文章年龄调整优先级和更新频率
      let priority = 0.7
      let changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly' =
        'monthly'

      if (ageInDays < 30) {
        priority = 0.9
        changeFrequency = 'daily'
      } else if (ageInDays < 90) {
        priority = 0.8
        changeFrequency = 'weekly'
      } else if (ageInDays < 365) {
        priority = 0.6
        changeFrequency = 'monthly'
      } else {
        priority = 0.5
        changeFrequency = 'yearly'
      }

      return {
        url: `${siteUrl}/blog/${post.slug}`, // 修复路径格式
        lastModified: post.lastmod || post.date,
        changeFrequency,
        priority,
      }
    })

  return [homePage, ...mainPages, ...blogRoutes]
}
