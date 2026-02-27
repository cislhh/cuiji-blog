![CuiJi Blog Banner](/public/static/images/twitter-card.png)

# CuiJi 的博客

这是我的个人博客，基于 [Next.js](https://nextjs.org/) 和 [Tailwind CSS](https://tailwindcss.com/) 构建的现代化博客系统。

## 项目简介

这是一个功能丰富的 Next.js 博客模板，使用 Contentlayer 管理 Markdown 内容。我对其进行了一些个性化定制，包括：

- 简洁优雅的中文界面设计
- 配置化的页面内容管理
- 优化的标签云和关于页面
- 完善的联系方式集成

## 技术栈

- **框架**: Next.js 16 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS v4
- **内容**: Contentlayer (MDX)
- **动画**: Framer Motion
- **部署**: Vercel

## 功能特性

- ✅ 响应式设计，完美支持移动端
- ✅ 支持暗色/亮色主题切换
- ✅ MDX 支持，可在 Markdown 中使用 React 组件
- ✅ 代码语法高亮
- ✅ 数学公式渲染 (KaTeX)
- ✅ 标签分类系统
- ✅ 搜索功能
- ✅ 评论系统集成 (Giscus)
- ✅ SEO 优化

## 项目结构

```
cuiji-blog/
├── app/                 # Next.js App Router 页面
├── data/               # 配置文件和数据
│   ├── contactConfig.ts    # 联系方式配置
│   ├── heroConfig.ts       # 首页配置
│   ├── aboutConfig.ts      # 关于页面配置
│   └── tagsConfig.ts       # 标签页面配置
├── components/         # React 组件
├── layouts/           # 页面布局模板
└── public/            # 静态资源
```

## 快速开始

### 安装依赖

```bash
yarn install
```

### 开发模式

```bash
yarn dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看效果。

### 构建生产版本

```bash
yarn build
```

## 配置说明

### 个人信息配置

编辑 `data/siteMetadata.js` 修改站点基本信息：

```javascript
const siteMetadata = {
  title: 'CuiJi的博客',
  author: 'CuiJi',
  email: '1353761785@qq.com',
  // ...
}
```

### 联系方式配置

编辑 `data/contactConfig.ts` 配置社交链接和联系方式：

```typescript
export const contactConfig = {
  name: 'CuiJi',
  email: '1353761785@qq.com',
  emails: [
    { label: 'QQ邮箱', address: '1353761785@qq.com' },
    { label: 'Gmail', address: 'wangliyu3611@gmail.com' },
  ],
  // ...
}
```

### 首页配置

编辑 `data/heroConfig.ts` 自定义首页内容：

```typescript
export const heroConfig = {
  tagline: {
    title: '构建未来',
    subtitle: '一行代码一行代码地',
  },
  techStack: [
    { name: 'React', icon: '', color: 'hover:text-cyan-400' },
    // 更多技术栈...
  ],
  // ...
}
```

### 关于页面配置

编辑 `data/aboutConfig.ts` 管理关于页面内容：

```typescript
export const aboutConfig = {
  personalInfo: {
    name: 'CuiJi',
    tagline: '软件工程师 / 终身学习者',
    bio: [
      '我是一名充满激情的软件工程师...',
      // 更多简介...
    ],
  },
  skills: [
    { category: '前端开发', items: ['React', 'Next.js', 'Vue.js'] },
    // 更多技能...
  ],
  // ...
}
```

### 标签页面配置

编辑 `data/tagsConfig.ts` 自定义标签页面：

```typescript
export const tagsConfig = {
  title: '标签云',
  subtitle: '按标签探索我的文章',
  layout: 'cloud',
  showCount: true,
  enableSearch: true,
  // ...
}
```

## 添加博客文章

### SEO 优化规范（重要）

为了确保博客文章能被搜索引擎（Google、百度等）正确索引，请务必遵循以下 SEO 编写规范：

#### 必需字段

```yaml
---
title: '文章标题'                          # 必需：清晰、简洁、包含关键词
date: '2024-01-01'                        # 必需：发布日期 (YYYY-MM-DD)
slug: 'url-friendly-slug'                 # 推荐：URL 友好的标识符
tags: ['next-js', 'tailwind', 'guide']    # 必需：分类标签（英文，用于生成标签页）
keywords: ['关键词1', '关键词2', '关键词3'] # 必需：SEO 搜索关键词（中英文混合）
description: '120-160 字符的详细描述...'   # 必需：搜索引擎显示的摘要
summary: '简短的文章简介'                  # 必需：列表页显示的简短摘要
authors: ['default']                      # 必需：作者标识
draft: false                             # 可选：是否为草稿
---
```

#### 字段说明

| 字段 | 必需 | 说明 | 最佳实践 |
|------|------|------|----------|
| `title` | ✅ | 文章标题 | • 包含核心关键词<br>• 吸引人且准确描述内容<br>• 10-60 个字符<br>• 避免过度重复关键词 |
| `slug` | 推荐 | URL 标识符 | • 使用英文小写<br>• 用连字符分隔单词<br>• 简短且包含关键词<br>• 例如：`typescript-advanced-types` |
| `tags` | ✅ | 分类标签 | • 使用英文标签<br>• 用于生成标签归档页<br>• 3-5 个相关标签<br>• 例如：`['react', 'hooks', 'tutorial']` |
| `keywords` | ✅ | SEO 关键词 | • **中英文混合**（国内外搜索）<br>• 5-10 个关键词<br>• 包含同义词和相关词<br>• 例如：`['React', 'useContext', '状态管理', 'context API']` |
| `description` | ✅ | 搜索摘要 | • **120-160 个字符**（Google 显示限制）<br>• 包含核心关键词<br>• 吸引点击的营销语言<br>• 准确描述文章内容 |
| `summary` | ✅ | 列表简介 | • 显示在博客列表页<br>• 50-100 个字符<br>• 简洁明了的概述 |

#### 完整示例

```yaml
---
title: 'TypeScript 高级类型系统与工程化实践'
slug: typescript-advanced-type-system-engineering
date: 2025-04-12
authors: [cuiji]
tags: [typescript, advanced-types, generics, engineering]
keywords: [TypeScript, 高级类型, 泛型, 类型体操, 工程化, 类型安全, 类型推导]
description: '深入 TypeScript 高级类型系统，包括泛型、条件类型、映射类型、模板字面量类型等。通过实际项目案例，学习如何构建类型安全的应用程序，掌握类型体操技巧，提升代码质量和可维护性。适合有一定 TypeScript 基础的前端开发者进阶学习。'
summary: '深入探讨 TypeScript 高级类型系统，包括泛型、条件类型等。
draft: false
---

# 文章正文

这里是你的文章内容...
```

#### SEO 最佳实践

1. **关键词布局**
   - 标题中至少包含 1-2 个核心关键词
   - description 中自然融入 3-5 个关键词
   - keywords 字段包含长尾关键词和同义词
   - 文章正文中关键词密度保持在 1-3%

2. **中英文优化**
   - `tags` 使用英文（便于生成 URL 和分类）
   - `keywords` 中英混合（兼顾 Google 和百度）
   - `title` 和 `description` 使用中文（中文读者为主）
   - `slug` 使用英文（URL 友好且 SEO 友好）

3. **描述写作技巧**
   - 使用"你"或"您"增加亲和力
   - 突出文章的价值和收益
   - 包含数字和具体成果
   - 避免过度夸张的标题党

4. **结构化数据**
   - 系统会自动为每篇文章生成 JSON-LD 结构化数据
   - 包含文章类型、发布时间、作者、发布者等信息
   - 帮助搜索引擎更好地理解文章内容

### 文件位置

在 `data/blog` 目录下创建 `.mdx` 或 `.md` 文件：

```
data/blog/
├── myNewBlog/              # 原创博客目录
│   ├── typescript-advanced-types.mdx
│   └── react-hooks-guide.mdx
├── nested-route/           # 嵌套路由示例
│   └── introducing-multi-part-posts.mdx
└── example-post.mdx        # 单篇文章
```

### 基础模板

复制以下模板开始写文章：

```yaml
---
title: '文章标题'
slug: article-url-slug
date: YYYY-MM-DD
authors: [cuiji]
tags: [tag1, tag2, tag3]
keywords: ['关键词1', '关键词2', '关键词3', 'keyword1', 'keyword2']
description: '120-160 字符的文章描述，包含核心关键词，吸引读者点击。'
summary: '简短的文章简介，显示在博客列表页。'
draft: false
---

# 文章标题

文章导语...

## 小节标题

内容...

## 部署

### Vercel 部署

最简单的方式是通过 [Vercel](https://vercel.com) 部署：

1. Fork 本仓库到你的 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 自动构建和部署

### 其他平台

也支持部署到以下平台：
- GitHub Pages
- Netlify
- 任何支持 Next.js 的托管平台

## 相关链接

- GitHub: [https://github.com/cislhh](https://github.com/cislhh)
- 基于模板: [tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog)

## 许可证

MIT License

---

**CuiJi** - 软件工程师 / 终身学习者
