# 滚动效果组件库

基于 [Lenis](https://github.com/darkroomengineering/lenis) 官方 API 构建的滚动效果组件集合。

## 功能特性

- ✅ **完全基于 Lenis 官方 API** - 使用 `scroll` 事件、`progress`、`velocity`、`direction` 等原生属性
- ✅ **性能优化** - 使用 `transform3d`、`will-change`、GPU 加速
- ✅ **类型安全** - 完整的 TypeScript 类型定义
- ✅ **易于使用** - 简洁的 API 设计

## 组件列表

### 1. ParallaxSection - 视差滚动

多层视差滚动效果，不同层以不同速度移动。

```tsx
import { ParallaxSection } from '@/components/scroll'

<ParallaxSection
  height="100vh"
  layers={[
    {
      speed: 0,  // 背景层 - 不动
      children: <Background />
    },
    {
      speed: 0.5,  // 中间层 - 半速
      children: <MiddleContent />
    },
    {
      speed: 1,  // 前景层 - 正常速度
      children: <Foreground />
    }
  ]}
/>
```

**参数：**
- `layers`: 视差层数组
  - `speed`: 视差速度 (0-1)，0 表示不动，1 表示正常速度
  - `children`: 层内容
  - `className`: 自定义类名
- `height`: 容器高度（默认 `"100vh"`）
- `className`: 容器类名

### 2. HorizontalScroll - 水平滚动

将垂直滚动转换为水平移动的效果。

```tsx
import { HorizontalScroll } from '@/components/scroll'

<HorizontalScroll itemWidth={500} gap={32}>
  <div>项目 1</div>
  <div>项目 2</div>
  <div>项目 3</div>
</HorizontalScroll>
```

**参数：**
- `itemWidth`: 每个项目宽度（默认 `400px`）
- `gap`: 项目间距（默认 `24`）
- `className`: 自定义类名
- `showScrollIndicator`: 显示进度指示器（默认 `true`）

### 3. ScrollTrigger - 滚动触发动画

元素进入视口时触发动画效果。

```tsx
import { ScrollTrigger } from '@/components/scroll'

<ScrollTrigger animation="fade-up" delay={200}>
  <h1>标题</h1>
</ScrollTrigger>
```

**动画类型：**
- `fade-up` - 从下方淡入
- `fade-down` - 从上方淡入
- `fade-left` - 从左侧淡入
- `fade-right` - 从右侧淡入
- `zoom-in` - 从小到大缩放
- `zoom-out` - 从大到小缩放
- `slide-up` - 从下方滑入
- `slide-down` - 从上方滑入
- `rotate` - 旋转进入

**参数：**
- `animation`: 动画类型（默认 `"fade-up"`）
- `threshold`: 触发阈值 0-1（默认 `0.1`）
- `delay`: 动画延迟毫秒（默认 `0`）
- `duration`: 动画持续秒数（默认 `0.6`）
- `once`: 仅触发一次（默认 `true`）
- `className`: 自定义类名

### 4. StaggerScroll - 交错动画

为多个子元素添加延迟交错动画。

```tsx
import { StaggerScroll } from '@/components/scroll'

<StaggerScroll stagger={0.1} animation="fade-up">
  <div>项目 1</div>
  <div>项目 2</div>
  <div>项目 3</div>
</StaggerScroll>
```

**参数：**
- `stagger`: 每个子元素延迟间隔秒数（默认 `0.1`）
- `animation`: 动画类型（默认 `"fade-up"`）
- `threshold`: 触发阈值（默认 `0.1`）
- `duration`: 动画持续时间（默认 `0.6`）
- `className`: 自定义类名

## Hooks

### useScrollProgress

获取滚动进度（0-1）。

```tsx
import { useScrollProgress } from '@/components/scroll'

function ProgressBar() {
  const progress = useScrollProgress()
  return <div style={{ width: `${progress * 100}%` }} />
}
```

### useScrollVelocity

获取当前滚动速度。

```tsx
import { useScrollVelocity } from '@/components/scroll'

function DynamicElement() {
  const velocity = useScrollVelocity()
  const scale = 1 + Math.min(velocity * 0.01, 0.2)
  return <div style={{ transform: `scale(${scale})` }} />
}
```

### useScrollDirection

获取滚动方向。

```tsx
import { useScrollDirection } from '@/components/scroll'

function Header() {
  const direction = useScrollDirection()
  return <header className={direction === 1 ? 'visible' : 'hidden'} />
}
```

## 完整示例

查看 `/app/demo/page.tsx` 获取完整的使用示例。

## 技术实现

- **Lenis** - 平滑滚动核心
- **Motion (Framer Motion)** - 动画效果
- **Intersection Observer** - 视口检测
- **Transform API** - GPU 加速性能优化

## 性能优化

1. **GPU 加速** - 使用 `transform3d` 而非 `top/left`
2. **will-change 提示** - 提前告知浏览器优化
3. **Intersection Observer** - 高效的视口检测
4. **节流滚动事件** - 避免过度计算

## 浏览器兼容性

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+

## License

MIT
