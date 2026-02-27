import { ProjectsPageConfig } from './types/contact'
import { Project } from './projects/types'

/**
 * Projects Page Configuration
 *
 * Configure all projects page content including:
 * - Page header (title and description)
 * - Project type labels (company/personal)
 * - Modal section labels
 * - Projects data
 */
export const projectsConfig: ProjectsPageConfig = {
  // Page header displayed on projects page
  header: {
    title: '项目作品',
    description: '我参与开发的一些项目展示',
  },

  // Project type labels
  typeLabels: {
    company: '公司项目',
    personal: '个人项目',
  },

  // Modal section labels
  modal: {
    closeButtonAriaLabel: '关闭',
    projectIntroTitle: '项目简介',
    techStackTitle: '技术栈',
    highlightsTitle: '项目亮点',
    visitProjectText: '访问项目',
    screenshotCountText: '张截图',
  },

  // Projects data
  projects: [
    {
      id: 'b2c-ecommerce',
      name: '某电商平台',
      description: '现代化的前台电商购物网站，支持完整的购物流程，包括商品浏览、购物车、结账和支付集成。',
      longDescription:
        '这是一个功能完整的B2C电商平台，支持商品浏览、购物车、结账流程、支付集成等功能。作为核心开发人员，我负责了前端架构设计和主要业务模块的实现。',
      type: 'ecommerce',
      ownershipType: 'company',
      date: '2024.07',
      coverImage: '/static/images/projects/ecommerce-cover.jpg',
      images: [
        {
          src: '/static/images/projects/ecommerce-1.jpg',
          alt: '首页',
          caption: '平台首页设计',
        },
        {
          src: '/static/images/projects/ecommerce-2.jpg',
          alt: '商品详情',
          caption: '商品详情页',
        },
        {
          src: '/static/images/projects/ecommerce-3.jpg',
          alt: '购物车',
          caption: '购物车功能',
        },
      ],
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe'],
      highlights: [
        {
          title: '性能优化',
          description: '实现了代码分割和图片优化，首屏加载时间减少40%',
        },
        {
          title: '支付集成',
          description: '集成Stripe支付，支持多种支付方式',
        },
      ],
    },
    {
      id: 'admin-dashboard',
      name: '企业管理后台',
      description:
        '基于 React + Ant Design 的企业级后台管理平台，提供数据可视化、权限管理、内容管理等功能。',
      longDescription:
        '这是一个功能完善的企业管理后台系统，包含数据可视化仪表盘、用户权限管理、内容管理、系统设置等模块。系统采用 RBAC 权限模型，支持细粒度的权限控制。',
      type: 'admin',
      ownershipType: 'company',
      date: '2024.11',
      coverImage: '/static/images/projects/admin-cover.jpg',
      images: [
        {
          src: '/static/images/projects/admin-1.jpg',
          alt: '仪表盘',
          caption: '数据可视化仪表盘',
        },
        {
          src: '/static/images/projects/admin-2.jpg',
          alt: '用户管理',
          caption: '用户权限管理',
        },
      ],
      tags: ['React', 'TypeScript', 'Ant Design', 'ECharts'],
      highlights: [
        {
          title: '权限系统',
          description: '实现 RBAC 权限模型，支持角色和权限的灵活配置',
        },
        {
          title: '数据可视化',
          description: '集成 ECharts 实现丰富的数据可视化图表',
        },
      ],
    },
    {
      id: 'miniprogram',
      name: '生活服务小程序',
      description: '提供本地生活服务的微信小程序，包含商家列表、在线预约、订单管理等功能。',
      longDescription:
        '这是一个生活服务类微信小程序，用户可以浏览附近商家、在线预约服务、查看订单状态等。小程序使用 Taro 框架开发，支持微信支付、消息推送等功能。',
      type: 'miniprogram',
      ownershipType: 'company',
      date: '2024.09',
      coverImage: '/static/images/projects/miniprogram-cover.jpg',
      images: [
        {
          src: '/static/images/projects/miniprogram-1.jpg',
          alt: '首页',
          caption: '小程序首页',
        },
        {
          src: '/static/images/projects/miniprogram-2.jpg',
          alt: '商家详情',
          caption: '商家详情页',
        },
      ],
      tags: ['微信小程序', 'Taro', 'TypeScript'],
      highlights: [
        {
          title: '跨平台',
          description: '使用 Taro 框架，支持编译到多个平台',
        },
      ],
    },
    {
      id: 'personal-blog',
      name: '个人博客系统',
      description: '基于 Next.js 的个人博客系统，支持 Markdown 写作、标签分类、评论功能。',
      longDescription:
        '这是我开发的个人博客系统，支持 MDX 格式的文章写作、代码高亮、数学公式渲染、标签分类等功能。博客具有响应式设计，支持深色模式，集成了 Giscus 评论系统。',
      type: 'website',
      ownershipType: 'personal',
      date: '2024.12',
      coverImage: '/static/images/projects/blog-cover.jpg',
      images: [
        {
          src: '/static/images/projects/blog-1.jpg',
          alt: '首页',
          caption: '博客首页',
        },
        {
          src: '/static/images/projects/blog-2.jpg',
          alt: '文章详情',
          caption: '文章阅读页面',
        },
      ],
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MDX'],
      link: 'https://github.com/cislhh',
      highlights: [
        {
          title: 'MDX 支持',
          description: '支持在 Markdown 中使用 React 组件',
        },
        {
          title: 'SEO 优化',
          description: '完善的 SEO 配置，提升搜索引擎可见性',
        },
      ],
    },
  ] as Project[],
}
