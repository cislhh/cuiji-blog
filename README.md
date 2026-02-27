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

在 `data/blog` 目录下创建 `.mdx` 或 `.md` 文件：

```yaml
---
title: '文章标题'
date: '2024-01-01'
tags: ['next-js', 'tailwind', 'guide']
summary: '文章简介'
authors: ['default']
---

# 文章内容

这里是你的文章正文...
```

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
