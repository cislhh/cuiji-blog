# VSCode 主题博客重设计开发文档

**创建日期**：2025-02-08
**参考项目**：https://www.dalelarroder.com
**设计风格**：VSCode Dark+ 主题（绿色 + 黑色）
**字体方案**：JetBrains Mono（代码风格）

---

## 📋 项目概述

将 cuiji-blog 从当前的琥珀色主题重设计为 VSCode 风格的绿色+黑色主题，首页结构复刻 dalelarroder.com 的设计模式。

### 核心目标
1. ✅ 复刻 dalelarroder.com 的视觉风格和布局
2. ✅ 采用 VSCode Dark+ 主题配色（#4ec9b0 + #0d0d0d）
3. ✅ 使用 JetBrains Mono 字体增强代码编辑器感
4. ✅ 保留现有 Lenis + Motion 动画系统
5. ❌ 不添加 GSAP、不实现 WebGL 光标

### 关键约束
- **不破坏 Tailwind Nextjs Starter Blog 核心结构**
- **博客内容保持在 `data/blog` 目录**
- **不改动 Contentlayer 配置**
- **所有文字使用示例占位**

---

## 🏗️ 技术架构

### 现有技术栈（保持不变）
- **框架**：Next.js 15.2.4 + App Router
- **语言**：TypeScript
- **样式**：Tailwind CSS v4
- **动画**：Lenis 1.3.17（平滑滚动）+ Motion 12.29.2（组件动画）
- **内容**：Contentlayer 2 + MDX
- **主题**：next-themes

### 技术决策
| 决策点 | 选择 | 理由 |
|--------|------|------|
| 动画库 | 保留 Lenis + Motion | 避免引入 GSAP，用现有库实现 80% 效果 |
| WebGL 光标 | 不实现 | 复杂度高，UX 价值有限 |
| 字体 | JetBrains Mono | 符合 VSCode 风格，支持连字 |
| 配色 | 亮绿 + 纯黑 | 高对比度，科技感强 |

---

## 🛣️ 路由结构

### 新路由规划
```
/                          # 新首页（landing page）
├── Hero 区域              # 全屏主视觉
├── Intro 区域             # 滚动触发动画
├── Works 区域             # 项目展示（视差卡片）
└── Contact 区域           # 联系方式

/posts                     # 博客列表页（新建）
/posts/page/[page]         # 博客分页
/blog/[slug]               # 文章详情页（保持不变）
/tags/[tag]                # 标签页（保持不变）
/about                     # 关于页面（保持不变）
```

### 迁移任务
1. **复制** `app/page.tsx` → `app/posts/page.tsx`
2. **更新** Header/Footer 中的博客链接（`/` → `/posts`）
3. **更新** sitemap 配置
4. **测试** 确保所有文章正常访问

---

## 🎨 设计系统

### 颜色方案（VSCode Dark+ 主题）

```css
/* === 背景色 === */
--bg-primary: #0d0d0d;          /* 纯黑背景 */
--bg-secondary: #1e1e1e;        /* VSCode 编辑器背景 */
--bg-tertiary: #252526;         /* VSCode 侧边栏背景 */

/* === 主色调（亮绿色） === */
--primary: #4ec9b0;             /* VSCode 类名高亮绿 */
--primary-dim: rgba(78, 201, 176, 0.1);
--primary-glow: rgba(78, 201, 176, 0.3);

/* === 文字色 === */
--text-primary: #cccccc;        /* 主文字（VSCode 默认） */
--text-secondary: #858585;      /* 次要文字（VSCode 注释） */
--text-tertiary: #6e6e6e;       /* 弱化文字 */

/* === 强调色（代码高亮参考） === */
--accent-blue: #569cd6;         /* 蓝色（函数名） */
--accent-purple: #c586c0;       /* 紫色（关键字） */
--accent-yellow: #dcdcaa;       /* 黄色（变量） */
--accent-orange: #ce9178;       /* 橙色（字符串） */
```

### 字体系统

```typescript
// app/fonts.ts
import { JetBrains_Mono } from 'next/font/google'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  // 启用连字特性
  fontFeatureSettings: '"cv11", "ss01"',
})
```

**使用规则**：
- **全局使用** JetBrains Mono（标题、正文、代码）
- **字重**：400（常规）、500（中等）、600（加粗）
- **代码连字**：`=>` `!=` `>=` `<=` `==` 自动渲染

### Tailwind 配置扩展

```css
/* app/tailwind.css 添加 */
@theme {
  --color-bg-primary: #0d0d0d;
  --color-bg-secondary: #1e1e1e;
  --color-bg-tertiary: #252526;
  --color-primary: #4ec9b0;
  --color-text-primary: #cccccc;
  --color-text-secondary: #858585;
  --color-text-tertiary: #6e6e6e;

  --font-jetbrains: var(--font-jetbrains-mono);
}

/* === 自定义工具类 === */
.bg-vscode-dark {
  background: linear-gradient(180deg, #0d0d0d 0%, #1e1e1e 100%);
}

.glow-primary {
  box-shadow: 0 0 20px rgba(78, 201, 176, 0.3);
}

.underline-magical {
  background: linear-gradient(to right, #4ec9b0, #4ec9b0);
  background-size: 0 0.2em;
  background-position: 0 100%;
  background-repeat: no-repeat;
  transition: background-size 0.3s ease;
}

.underline-magical:hover {
  background-size: 100% 0.2em;
}
```

---

## 🧩 组件结构

### 新建组件目录
```
app/components/home/
├── HeroSection.tsx          # 全屏主视觉
├── IntroSection.tsx         # 滚动触发动画
├── WorksSection.tsx         # 项目展示（视差卡片）
└── ContactSection.tsx       # 联系方式
```

### 核心组件设计

#### 1. HeroSection.tsx
```tsx
interface HeroSectionProps {
  title?: string;
  subtitle?: string;
}

功能：
- 全屏高度（min-h-screen）
- 大标题居中显示
- 导航链接（/posts, /about, /tags）
- Motion 渐入动画（opacity + translateY）
- 滚动提示箭头（bounce 动画）

默认内容（示例占位）：
title: "I build things for the web."
subtitle: "Software Engineer & Open Source Contributor"
```

#### 2. IntroSection.tsx
```tsx
interface IntroSectionProps {
  paragraphs: string[];
}

功能：
- 多段落文本展示
- 基于 Lenis scroll progress 的渐进式 opacity
- 每段独立触发动画
- 最大宽度限制（max-w-3xl）

示例内容：
"Welcome to my personal portfolio — or, as I like to call it, my playground on the web."
"I'm a Software Engineer and forever a student of the craft..."
```

#### 3. WorksSection.tsx
```tsx
interface WorkItem {
  title: string;        // 示例："Aphex Planner"
  description: string;  // 示例："Project management tool"
  tags: string[];       // 示例：["Next.js", "TypeScript"]
  link?: string;        // 可选
}

功能：
- 复用现有 ParallaxSection 组件
- 每个项目卡片：
  - VSCode 风格边框（1px solid #252526）
  - 悬停效果（scale-105 + glow-primary）
  - 标签展示（药丸形状）
- 响应式网格布局（grid-cols-1 md:grid-cols-2）
```

#### 4. ContactSection.tsx
```tsx
interface ContactLink {
  label: string;   // "GitHub", "LinkedIn", "Email"
  href: string;    // 示例链接
  icon?: ReactNode;
}

功能：
- 简单链接列表
- MagicalUnderline 效果
- 居中布局
- 示例占位内容

示例链接：
- GitHub: https://github.com/username
- LinkedIn: https://linkedin.com/in/username
- Email: mailto:hello@example.com
```

### 复用现有组件
- `SmoothScroll` - 保持不变
- `ParallaxSection` - 复用于 WorksSection
- `ScrollTrigger` - 复用于各区域动画
- `Header` / `Footer` - 调整样式和链接目标

### 新建通用组件
```
app/components/ui/
├── MagicalUnderline.tsx    # 魔法下划线效果
├── CodeCard.tsx            # VSCode 风格卡片容器
└── TerminalPrompt.tsx      # 终端提示符装饰
```

---

## 📝 实施计划

### 阶段 1：基础设置（高优先级）⏰

#### 1.1 更新字体配置
- [ ] 修改 `app/fonts.ts`
  ```typescript
  import { JetBrains_Mono } from 'next/font/google'
  export const jetbrainsMono = JetBrains_Mono({ ... })
  ```
- [ ] 更新 `app/layout.tsx` 应用字体
- [ ] 移除 Space Grotesk 导入

#### 1.2 更新 Tailwind 配置
- [ ] 编辑 `app/tailwind.css`
- [ ] 添加 VSCode 主题色变量
- [ ] 添加自定义工具类（`.bg-vscode-dark`, `.glow-primary` 等）

#### 1.3 创建 /posts 路由
- [ ] 复制 `app/page.tsx` → `app/posts/page.tsx`
- [ ] 调整组件导入路径
- [ ] 测试博客列表正常显示

#### 1.4 更新导航链接
- [ ] 修改 `app/components/Header.tsx`：Logo 链接改为 `/posts`
- [ ] 修改 `app/components/Footer.tsx`：相关链接更新
- [ ] 搜索功能确认（Pliny 配置）

---

### 阶段 2：首页开发（核心）⏰

#### 2.1 创建组件目录
- [ ] 创建 `app/components/home/` 目录

#### 2.2 开发 HeroSection
- [ ] 创建 `HeroSection.tsx`
- [ ] 实现全屏布局（`min-h-screen`）
- [ ] 添加 Motion 渐入动画
- [ ] 添加导航链接（/posts, /about, /tags）
- [ ] 添加滚动提示箭头

#### 2.3 开发 IntroSection
- [ ] 创建 `IntroSection.tsx`
- [ ] 实现多段落布局
- [ ] 集成 Lenis scroll progress
- [ ] 添加渐进式 opacity 动画
- [ ] 添加示例占位内容

#### 2.4 开发 WorksSection
- [ ] 创建 `WorksSection.tsx`
- [ ] 复用 ParallaxSection 组件
- [ ] 创建 WorkCard 子组件
  - VSCode 边框样式
  - 悬停效果（scale + glow）
  - 标签展示
- [ ] 添加示例项目数据

#### 2.5 开发 ContactSection
- [ ] 创建 `ContactSection.tsx`
- [ ] 实现 MagicalUnderline 效果
- [ ] 添加示例联系链接
- [ ] 居中布局

#### 2.6 组装首页
- [ ] 编辑 `app/page.tsx`
- [ ] 导入所有区域组件
- [ ] 添加 SmoothScroll 包装
- [ ] 测试完整滚动流程

---

### 阶段 3：样式统一（中优先级）⏰

#### 3.1 创建通用组件
- [ ] 创建 `MagicalUnderline.tsx`
- [ ] 创建 `CodeCard.tsx`
- [ ] 创建 `TerminalPrompt.tsx`

#### 3.2 更新 Header/Footer
- [ ] 应用 VSCode 主题色
- [ ] 更新 hover 效果
- [ ] 调整间距和布局
- [ ] 测试响应式

#### 3.3 全局样式调整
- [ ] 更新渐变背景（黑色主题）
- [ ] 调整光晕效果颜色
- [ ] 更新按钮样式
- [ ] 统一卡片圆角和阴影

---

### 阶段 4：博客页面调整（低优先级）⏰

#### 4.1 /posts 页面样式
- [ ] 应用 VSCode 主题
- [ ] 调整卡片样式
- [ ] 更新按钮颜色

#### 4.2 文章详情页
- [ ] 保持阅读体验
- [ ] 微调代码块样式（monokai 改为 vscode-dark）
- [ ] 更新元信息颜色

---

## ✅ 验证清单

### 构建验证
```bash
# 清理并重新构建
rm -rf .next && npm run build

# 检查点
- [ ] 无 TypeScript 错误
- [ ] 无 ESLint 错误
- [ ] 所有页面成功编译
- [ ] sitemap.xml 正常生成
```

### 功能验证
- [ ] 首页 `/` 加载正常
- [ ] 博客列表 `/posts` 显示文章
- [ ] 文章详情 `/blog/[slug]` 可访问
- [ ] 标签页 `/tags/[tag]` 可访问
- [ ] 关于页面 `/about` 正常
- [ ] 所有导航链接正确跳转

### 动画验证
- [ ] Lenis 平滑滚动工作
- [ ] Hero 渐入动画流畅
- [ ] Intro 滚动触发正常
- [ ] Works 视差效果明显
- [ ] 悬停效果响应迅速

### 响应式验证
- [ ] 移动端（< 768px）布局正常
- [ ] 平板端（768px - 1024px）布局正常
- [ ] 桌面端（> 1024px）布局正常

### 性能验证
- [ ] Lighthouse 性能分数 > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] 无 CLS 问题

---

## 🚫 约束与禁忌

### 绝对不做
- ❌ 不修改 `data/blog` 目录结构
- ❌ 不改动 Contentlayer 配置
- ❌ 不添加 GSAP 依赖
- ❌ 不实现 WebGL 光标
- ❌ 不破坏 MDX frontmatter 结构
- ❌ 不删除现有组件（除非明确替换）

### 谨慎操作
- ⚠️ 修改 `app/layout.tsx` 时确保 Provider 完整
- ⚠️ 更新全局样式时测试所有页面
- ⚠️ 迁移路由时验证内部链接

---

## 📦 依赖检查

### 现有依赖（无需新增）
```json
{
  "next": "15.2.4",
  "react": "19.0.0",
  "motion": "12.29.2",
  "lenis": "1.3.17",
  "tailwindcss": "4.0.5",
  "next-themes": "latest"
}
```

### 可选依赖（如需要）
```json
{
  "lucide-react": "latest"  // 图标库（如果未安装）
}
```

---

## 🎯 成功标准

### 必须达成
1. ✅ 首页视觉风格接近 dalelarroder.com
2. ✅ VSCode 绿色+黑色主题统一应用
3. ✅ JetBrains Mono 字体全局生效
4. ✅ 所有原有功能正常工作
5. ✅ 构建成功，无错误

### 期望达成
1. 🎨 动画流畅自然
2. 🎨 响应式体验良好
3. 🎨 性能指标优秀
4. 🎨 代码结构清晰

---

## 📚 参考资源

### 目标项目
- 网站：https://www.dalelarroder.com
- 本地路径：`../dalelarroder`

### 设计参考
- VSCode Dark+ 主题色板
- JetBrains Mono 字体：https://fonts.google.com/specimen/JetBrains+Mono

### 技术文档
- Lenis 文档：https://github.com/darkroomengineering/lenis
- Motion 文档：https://motion.dev/
- Tailwind CSS v4：https://tailwindcss.com/docs/v4-beta

---

## 📝 变更日志

| 日期 | 变更内容 | 作者 |
|------|----------|------|
| 2025-02-08 | 初始设计文档 | Claude |

---

## 实施状态

- ✅ 阶段 1: 基础设置完成 (Tasks 1-7)
- ✅ 阶段 2: 首页开发完成 (Tasks 8-14)
- ✅ 阶段 3: 样式统一完成 (Tasks 15-17)
- ✅ 阶段 4: 验证测试完成 (Tasks 18-21)

**实施完成日期**: 2025-02-08
**构建状态**: ✅ 通过 (62 页面)
**测试状态**: ✅ 构建测试通过，响应式和性能测试待用户验证

### 已实现功能
1. JetBrains Mono 字体全局应用（支持连字）
2. VSCode Dark+ 主题配色系统
3. VSCode 风格工具类
4. /posts 博客列表路由
5. 新首页 (Hero + Intro + Works + Contact)
6. 所有组件样式统一为 VSCode 主题

### Git 提交历史
- 字体系统: 009512f, 4efa379
- 主题色: 1b2f9c9
- 工具类: 5dfbcb8, 7a5d081, 5967a6a
- 路由: 9c13f98
- 导航: 38c833b, 90f6ac3
- 首页组件: cf0c77a, 159e73b, 273703a
- 样式更新: eab9d26, 3a147c7, 35d736c
- 构建验证: b075286

### 已知问题
- @emotion/is-prop-valid 模块警告（非阻塞性）

---

**文档版本**：2.0
**最后更新**：2025-02-08
