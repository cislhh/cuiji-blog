/**
 * Contentlayer2 配置文件
 *
 * Contentlayer2 是一个内容管理库，可以将 MDX 文件转换为 TypeScript 数据对象。
 * 此配置定义了博客文章和作者档案的处理方式。
 *
 * 核心概念：
 * - Document Types（文档类型）：定义内容的形状（Blog、Authors）
 * - MDX Processing（MDX 处理）：使用 React 组件转换 markdown
 * - Computed Fields（计算字段）：生成派生数据（slug、readingTime 等）
 * - Plugins（插件）：转换内容（语法高亮、目录等）
 *
 * 数据流：
 * 1. MDX 文件位于 data/ 目录
 * 2. Contentlayer 读取并解析 frontmatter 和内容
 * 3. 插件转换内容（添加语法高亮、处理数学公式等）
 * 4. 计算字段生成派生数据（阅读时间、slug 等）
 * 5. 输出 TypeScript 类型定义到 contentlayer/generated/
 * 6. 生成 tag-data.json 和 search.json 索引文件
 */

import { defineDocumentType, ComputedFields, makeSource } from 'contentlayer2/source-files'
import { writeFileSync } from 'fs'
import readingTime from 'reading-time'
import { slug } from 'github-slugger'
import path from 'path'
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic'
// Remark packages - 用于转换 markdown AST
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { remarkAlert } from 'remark-github-blockquote-alert'
import {
  remarkExtractFrontmatter,
  remarkCodeTitles,
  remarkImgToJsx,
  extractTocHeadings,
} from 'pliny/mdx-plugins/index.js'
// Rehype packages - 用于转换 HTML AST
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypeKatexNoTranslate from 'rehype-katex-notranslate'
import rehypeCitation from 'rehype-citation'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypePresetMinify from 'rehype-preset-minify'
import siteMetadata from './data/siteMetadata'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer.js'
import prettier from 'prettier'

const root = process.cwd()
const isProduction = process.env.NODE_ENV === 'production'

// heroicon mini link - 用于标题自动生成的链接图标
const icon = fromHtmlIsomorphic(
  `
  <span class="content-header-link">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 linkicon">
  <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
  <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
  </svg>
  </span>
`,
  { fragment: true }
)

/**
 * 计算字段定义
 *
 * 这些字段会在构建时自动从文档内容计算得出，无需在 frontmatter 中手动添加。
 *
 * - readingTime: 阅读时间估算（分钟）
 * - slug: URL 友好的文件路径（移除开头的目录）
 * - path: 完整的文件路径（用于生成 URL）
 * - filePath: 源文件的实际路径
 * - toc: 目录（Table of Contents），从标题提取
 */
const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ''),
  },
  path: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath,
  },
  filePath: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFilePath,
  },
  toc: { type: 'json', resolve: (doc) => extractTocHeadings(doc.body.raw) },
}

/**
 * 创建标签计数文件
 *
 * 遍历所有博客文章，统计每个标签出现的次数，并生成 tag-data.json 文件。
 * 该文件用于生成标签页面和显示标签数量。
 *
 * 生成的文件位置：app/tag-data.json
 */
async function createTagCount(allBlogs) {
  const tagCount: Record<string, number> = {}
  allBlogs.forEach((file) => {
    if (file.tags && (!isProduction || file.draft !== true)) {
      file.tags.forEach((tag) => {
        const formattedTag = slug(tag)
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1
        } else {
          tagCount[formattedTag] = 1
        }
      })
    }
  })
  const formatted = await prettier.format(JSON.stringify(tagCount, null, 2), { parser: 'json' })
  writeFileSync('./app/tag-data.json', formatted)
}

/**
 * 创建搜索索引
 *
 * 如果配置了 Kbar 搜索，则生成本地搜索索引文件。
 * 该文件包含所有博客文章的核心内容，用于客户端搜索。
 *
 * 生成的文件位置：public/search.json（默认）
 */
function createSearchIndex(allBlogs) {
  if (
    siteMetadata?.search?.provider === 'kbar' &&
    siteMetadata.search.kbarConfig.searchDocumentsPath
  ) {
    writeFileSync(
      `public/${path.basename(siteMetadata.search.kbarConfig.searchDocumentsPath)}`,
      JSON.stringify(allCoreContent(sortPosts(allBlogs)))
    )
    if (process.env.NODE_ENV === 'development') {
      console.log('Local search index generated...')
    }
  }
}

// Blog 文档类型定义
// 定义博客文章的 frontmatter 字段结构
// 文件路径模式：data/blog/**/*.mdx
// Frontmatter 字段：title(必需), date(必需), tags, lastmod, draft, summary, images, authors, layout, bibliography, canonicalUrl
// 计算字段：继承所有 computedFields，额外添加 structuredData 用于 SEO
export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blog/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    lastmod: { type: 'date' },
    draft: { type: 'boolean' },
    summary: { type: 'string' },
    images: { type: 'json' },
    authors: { type: 'list', of: { type: 'string' } },
    layout: { type: 'string' },
    bibliography: { type: 'string' },
    canonicalUrl: { type: 'string' },
    slug: { type: 'string' },
    keywords: { type: 'list', of: { type: 'string' }, default: [] },
    description: { type: 'string' },
  },
  computedFields: {
    ...computedFields,
    structuredData: {
      type: 'json',
      resolve: (doc) => ({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: doc.title,
        datePublished: doc.date,
        dateModified: doc.lastmod || doc.date,
        description: doc.description || doc.summary,
        image: doc.images ? (typeof doc.images === 'string' ? doc.images : doc.images[0]?.src || doc.images[0]) : siteMetadata.socialBanner,
        url: `${siteMetadata.siteUrl}/blog/${doc.slug}`,
        keywords: Array.isArray(doc.keywords) ? doc.keywords.join(', ') : '',
        inLanguage: siteMetadata.language || 'zh-CN',
        author: {
          '@type': 'Person',
          name: siteMetadata.author,
          url: siteMetadata.siteUrl,
        },
        publisher: {
          '@type': 'Organization',
          name: siteMetadata.title,
          logo: {
            '@type': 'ImageObject',
            url: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${siteMetadata.siteUrl}/blog/${doc.slug}`,
        },
      }),
    },
  },
}))

// Authors 文档类型定义
// 定义作者档案的 frontmatter 字段结构
// 文件路径模式：data/authors/**/*.mdx
// Frontmatter 字段：name(必需), avatar, occupation, company, email, twitter, bluesky, linkedin, github, layout
export const Authors = defineDocumentType(() => ({
  name: 'Authors',
  filePathPattern: 'authors/**/*.mdx',
  contentType: 'mdx',
  fields: {
    name: { type: 'string', required: true },
    avatar: { type: 'string' },
    occupation: { type: 'string' },
    company: { type: 'string' },
    email: { type: 'string' },
    twitter: { type: 'string' },
    bluesky: { type: 'string' },
    linkedin: { type: 'string' },
    github: { type: 'string' },
    layout: { type: 'string' },
  },
  computedFields,
}))

// Contentlayer 数据源配置
// 配置 Contentlayer 如何读取和处理 MDX 内容
// contentDirPath: 内容目录路径 (data/)
// documentTypes: 定义的文档类型数组
// mdx: MDX 处理配置，包含 remarkPlugins (Markdown 转换) 和 rehypePlugins (HTML 转换)
// onSuccess: 构建成功后的回调，生成标签计数和搜索索引
export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Blog, Authors],
  mdx: {
    cwd: process.cwd(),
    remarkPlugins: [
      remarkExtractFrontmatter,
      remarkGfm,
      remarkCodeTitles,
      remarkMath,
      remarkImgToJsx,
      remarkAlert,
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'prepend',
          headingProperties: {
            className: ['content-header'],
          },
          content: icon,
        },
      ],
      rehypeKatex,
      rehypeKatexNoTranslate,
      [rehypeCitation, { path: path.join(root, 'data') }],
      [rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],
      rehypePresetMinify,
    ],
  },
  onSuccess: async (importData) => {
    const { allBlogs } = await importData()
    createTagCount(allBlogs)
    createSearchIndex(allBlogs)
  },
})
