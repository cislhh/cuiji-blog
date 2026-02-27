# 项目展示页面使用指南

## 功能概述

项目展示页面已经完成升级，现在支持：

✅ **卡片网格布局**：响应式展示项目卡片
✅ **多张截图支持**：每个项目可以有多张截图
✅ **模态框详情**：点击卡片查看项目详情和截图轮播
✅ **公司/个人项目区分**：视觉上区分项目类型
✅ **项目亮点**：展示项目的技术亮点和挑战
✅ **配置化管理**：所有内容和数据通过配置文件管理

## 文件结构

```
cuiji-blog/
├── data/
│   ├── projectsConfig.ts     # 项目页面配置（页面文案+项目数据）
│   └── projects/
│       └── types.ts          # 项目数据类型定义
├── components/projects/
│   ├── ProjectCard.tsx       # 项目卡片组件
│   ├── ProjectModal.tsx      # 项目详情模态框
│   └── ImageCarousel.tsx     # 图片轮播组件
└── public/static/images/projects/  # 项目截图目录
```

## 配置文件

**主文件：** `data/projectsConfig.ts`

这个文件包含了项目页面的所有内容：

1. **页面文案配置** - 页面标题、描述、标签等
2. **项目数据** - 所有项目的详细信息

### 配置结构

```typescript
export const projectsConfig = {
  // 页面标题和描述
  header: {
    title: '项目作品',
    description: '我参与开发的一些项目展示',
  },

  // 项目类型标签
  typeLabels: {
    company: '公司项目',
    personal: '个人项目',
  },

  // 模态框中的标签
  modal: {
    closeButtonAriaLabel: '关闭',
    projectIntroTitle: '项目简介',
    techStackTitle: '技术栈',
    highlightsTitle: '项目亮点',
    visitProjectText: '访问项目',
    screenshotCountText: '张截图',
  },

  // 项目数据数组
  projects: [
    // 项目对象...
  ],
}
```

## 如何添加新项目

### 1. 准备截图

将项目截图放到 `public/static/images/projects/` 目录：

```
public/static/images/projects/
├── your-project-cover.jpg    # 封面图（必需）
├── your-project-1.jpg        # 截图1
├── your-project-2.jpg        # 截图2
└── your-project-3.jpg        # 截图3
```

### 2. 编辑配置文件

在 `data/projectsConfig.ts` 的 `projects` 数组中添加新项目：

```typescript
export const projectsConfig = {
  // ...其他配置

  projects: [
    // 现有项目...
    {
      id: 'your-project-id',                    // 唯一标识
      name: '你的项目名称',                       // 或 "某XX平台"（公司项目）
      description: '简短描述，会显示在卡片上',
      longDescription: '详细描述，显示在模态框中',
      type: 'ecommerce',                         // 项目类型
      ownershipType: 'company',                  // 'company' 或 'personal'
      date: '2024.07',                           // 格式: YYYY.MM
      coverImage: '/static/images/projects/your-project-cover.jpg',
      images: [
        {
          src: '/static/images/projects/your-project-1.jpg',
          alt: '首页',
          caption: '项目首页截图'
        },
        // 更多截图...
      ],
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      link: 'https://your-project.com',         // 可选
      highlights: [                              // 可选
        {
          title: '性能优化',
          description: '实现了代码分割，首屏加载时间减少40%'
        }
      ]
    },
    // 更多项目...
  ],
}
```

### 3. 项目类型说明

**ProjectType**（type 字段）：
- `'admin'` - 后台管理系统
- `'miniprogram'` - 小程序
- `'ecommerce'` - 电商平台
- `'website'` - 网站
- `'other'` - 其他

**OwnershipType**（ownershipType 字段）：
- `'company'` - 公司项目（蓝色标签）
- `'personal'` - 个人项目（绿色标签）

## 自定义页面文案

如果你想修改页面显示的文本，编辑 `data/projectsConfig.ts`：

```typescript
export const projectsConfig = {
  header: {
    title: '项目作品',        // 修改这里
    description: '我参与开发的一些项目展示',
  },
  typeLabels: {
    company: '公司项目',      // 修改这里
    personal: '个人项目',
  },
  modal: {
    projectIntroTitle: '项目简介',  // 修改这里
    // ... 其他标签
  },
  // 项目数据保持不变
}
```

## 公司项目匿名化建议

对于公司项目，建议使用匿名化名称：

- ✅ "某电商平台"
- ✅ "企业管理后台"
- ✅ "金融科技公司项目"
- ❌ "淘宝"
- ❌ "京东商城"

描述中也不应透露具体的公司名称或敏感信息。

## 图片要求

- **格式**: JPG 或 PNG
- **封面图**: 建议尺寸 1600x900 (16:9)
- **截图**: 建议尺寸 1920x1080 或以上
- **文件大小**: 建议压缩到 500KB 以下

## 使用示例

### 导入项目数据

```typescript
import { projectsConfig } from '@/data/projectsConfig'

// 访问项目数组
const projects = projectsConfig.projects

// 访问页面配置
const title = projectsConfig.header.title
```

### 在组件中使用

```typescript
{projectsConfig.projects.map((project) => (
  <ProjectCard key={project.id} project={project} />
))}
```

## 优势

1. **集中管理**：所有项目数据集中在一个配置文件中
2. **易于维护**：添加/修改项目不需要在多个文件中操作
3. **类型安全**：完整的 TypeScript 类型支持
4. **统一配置**：页面文案和项目数据在同一文件中管理

## 需要帮助？

如果遇到问题，检查：
1. 图片路径是否正确（以 `/static/images/projects/` 开头）
2. 数据结构是否符合 `Project` 类型（`data/projects/types.ts`）
3. 是否运行了 `npm run build` 验证构建
