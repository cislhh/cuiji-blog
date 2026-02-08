# VSCode 主题重设计 - 测试清单

## 响应式测试 (Task 19)

使用浏览器 DevTools (F12) 测试以下尺寸：

### 移动端
- [ ] 375px (iPhone SE) - Hero 文字不溢出，Works 单列，Contact 链接垂直
- [ ] 390px (iPhone 12/13) - 同上
- [ ] 428px (iPhone 14 Pro Max) - 同上

### 平板端
- [ ] 768px (iPad) - Works 双列显示，导航正常
- [ ] 1024px (iPad Pro) - 同上

### 桌面端
- [ ] 1920px (Full HD) - 布局居中，最大宽度生效
- [ ] 2560px (2K) - 同上

## 性能测试 (Task 20)

使用 Chrome DevTools Lighthouse:
- [ ] Performance > 90
- [ ] Accessibility > 90
- [ ] Best Practices > 90
- [ ] SEO > 90

Core Web Vitals:
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
