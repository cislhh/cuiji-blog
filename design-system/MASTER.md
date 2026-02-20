# CuiJi Blog - 设计系统

## 设计原则

基于 VSCode Dark+ 主题的现代开发者作品集风格，强调：
- 专业性与技术感
- 流畅的动画交互
- 优雅的深色模式体验
- 清晰的信息层级

## 核心配色

### 主色调（VSCode 风格）
```css
--color-vscode-primary: #4ec9b0        /* 青色/Teal - 主要强调色 */
--color-vscode-primary-dim: rgba(78, 201, 176, 0.1)
--color-vscode-primary-glow: rgba(78, 201, 176, 0.3)
```

### 背景色
```css
--color-bg-primary: #0d0d0d            /* 主背景 */
--color-bg-secondary: #1e1e1e          /* 次级背景 */
--color-bg-tertiary: #252526           /* 第三级背景 */
```

### 渐变背景（深色模式）
```css
background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%);
```

### 文字色
```css
--color-text-primary: #cccccc          /* 主要文字 */
--color-text-secondary: #858585        /* 次要文字 */
--color-text-tertiary: #6e6e6e         /* 辅助文字 */
```

### 强调色
```css
--color-accent-blue: #569cd6           /* 蓝色强调 */
--color-accent-purple: #c586c0         /* 紫色强调 */
--color-accent-yellow: #dcdcaa         /* 黄色强调 */
--color-accent-orange: #ce9178         /* 橙色强调 */
```

## 排版系统

### 字体家族
```css
font-family: var(--font-jetbrains-mono), ui-sans-serif, system-ui, sans-serif;
```

### 字号层级
- H1: 5xl (48px) / 6xl (60px) / 7xl (72px)
- H2: 2xl (24px) - 文章标题
- H3: xl (20px) - 区块标题
- Body: base (16px) / lg (18px)
- Small: sm (14px)

### 字重
- Bold: 700 (标题)
- Semibold: 600 (次级标题)
- Medium: 500 (强调)
- Normal: 400 (正文)
- Light: 300 (辅助信息)

## 组件样式

### 玻璃态卡片
```css
.glass-panel {
  background: rgba(26, 26, 46, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem; /* 12px */
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
```

### 按钮样式
**主按钮**：
```tsx
className="px-4 py-2 rounded-lg bg-primary-500/10 hover:bg-primary-500/20
  text-primary-600 dark:text-primary-400
  transition-all duration-200 cursor-pointer"
```

**次按钮**：
```tsx
className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800
  hover:bg-gray-200 dark:hover:bg-gray-700
  transition-all duration-200"
```

### 链接样式
```tsx
className="text-gray-600 dark:text-gray-400
  hover:text-primary-600 dark:hover:text-primary-400
  transition-colors duration-200 cursor-pointer"
```

### 卡片悬停效果
```tsx
className="glass-panel rounded-xl p-6 shadow-lg
  hover:shadow-xl transition-all duration-300
  border border-transparent hover:border-primary-500/30
  group"
```

## 动画规范

### 时间参数
- 快速过渡：150-200ms（微交互）
- 标准过渡：300ms（常规动画）
- 慢速过渡：600ms（页面元素进入）

### 缓动函数
```tsx
// 标准
transition={{ duration: 0.3 }}

// 带延迟
transition={{ duration: 0.6, delay: 0.2 }}

// 悬停效果
whileHover={{ y: -4 }}
```

### Framer Motion 常用模式
**渐入动画**：
```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
```

**列表项动画**：
```tsx
// 带索引延迟
displayPosts.map((post, index) => (
  <motion.li
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.1 * index }}
  />
))
```

## 间距系统

### 容器
```tsx
className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
```

### Section 间距
- 垂直内边距：py-16 (64px)
- 元素间距：gap-8 (32px)
- 卡片间距：space-y-6 (24px)

## 图标系统

### 图标库
使用 Lucide React（已安装）

### 图标样式
```tsx
// 小图标（文字旁）
<Calendar className="w-4 h-4" />

// 中等图标（标题旁）
<Folder className="w-5 h-5" />

// 大图标（hero 区域）
<Icon className="w-6 h-6" />
```

### 图标颜色
```tsx
// 强调色
className="text-primary-500"

// 灰度
className="text-gray-600 dark:text-gray-400"
```

## 响应式断点

```css
/* 移动端 */
sm: 640px

/* 平板 */
md: 768px

/* 桌面 */
lg: 1024px

/* 大屏 */
xl: 1280px
```

## 页面模板

### 标准 Page 结构
```tsx
export default function PageName() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100
      dark:from-dark-bg-start dark:to-dark-bg-end">
      {/* Hero/Title Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative pt-16 pb-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold
            text-gray-900 dark:text-gray-100 mb-4">
            页面标题
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            副标题说明
          </p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* 内容 */}
      </div>
    </div>
  )
}
```

## 可访问性要求

### 必须实现
- ✅ 所有可点击元素有 `cursor-pointer`
- ✅ 所有交互元素有悬停状态
- ✅ 所有链接有 `focus-visible` 状态
- ✅ 所有图片有 `alt` 属性
- ✅ 使用语义化 HTML 标签
- ✅ 颜色对比度至少 4.5:1
- ✅ 尊重 `prefers-reduced-motion`

### 键盘导航
```css
a:focus-visible,
button:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}
```

## 反模式（避免）

### ❌ 不要做
1. 使用 emoji 作为图标 → 使用 SVG 图标
2. 硬编码颜色值 → 使用 CSS 变量
3. 没有悬停状态的链接 → 添加 `hover:` 样式
4. 过快的动画（< 150ms）→ 使用 150-300ms
5. 过慢的动画（> 500ms）→ 除非是进入动画
6. 缺少过渡动画 → 添加 `transition-* duration-200`
7. 浅色模式下文字对比度不足 → 检查对比度
8. 使用 scale 导致布局偏移 → 使用颜色/透明度变化

## 具体页面规范

### /blog 页面
- 使用卡片布局
- 左侧固定侧边栏（标签）
- 右侧文章列表
- 玻璃态效果
- 悬停时卡片上浮

### /projects 页面
- 网格布局（masonry 风格）
- 项目卡片带预览图
- 技术栈标签
- 悬停显示详情

### /about 页面
- 个人信息卡片
- 技能展示（进度条或标签云）
- 时间线展示经历
- 联系方式

### /tags 页面
- 标签网格
- 大小表示文章数量
- 悬停效果
- 颜色编码

## 调试检查清单

提交前检查：
- [ ] 所有页面使用统一的背景渐变
- [ ] 所有卡片使用 `glass-panel` 样式
- [ ] 所有按钮/链接有悬停状态
- [ ] 所有动画时间在 150-600ms 范围内
- [ ] 所有图标来自 Lucide React
- [ ] 所有元素在浅色和深色模式下都清晰可读
- [ ] 响应式布局在 375px, 768px, 1024px, 1440px 正常
- [ ] 没有控制台错误
- [ ] 没有硬编码的颜色值（特殊情况除外）
