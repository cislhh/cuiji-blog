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

  // Featured works section (homepage)
  featuredWorks: {
    title: '精选作品',
    subtitle: 'Selected Works',
    viewMoreText: '查看全部作品 →',
    // Optional: Specify featured projects by ID
    // If not provided, will use the first 3 projects sorted by date (descending)
    projectIds: ['umpaas', 'cuiji-blog', 'beijing-credit-card'],
    maxProjects: 3,
  },

  // Projects data
  projects: [
    {
      id: 'b2c-ecommerce',
      name: '某电商平台',
      description:
        '现代化的前台电商购物网站，支持完整的购物流程，包括商品浏览、购物车、结账和支付集成。',
      longDescription:
        '这是一个功能完整的B2C电商平台，支持商品浏览、购物车、结账流程、支付集成等功能。作为核心开发人员，我负责了前端架构设计和主要业务模块的实现。',
      type: 'ecommerce',
      ownershipType: 'company',
      date: '2024.07',
      images: [
        {
          src: '/static/images/projects/ecommerce-cover.jpg',
          alt: '封面',
          caption: '项目封面',
        },
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
      images: [
        {
          src: '/static/images/projects/admin-cover.jpg',
          alt: '封面',
          caption: '项目封面',
        },
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
      id: 'beijing-credit-card',
      name: '北京银行信用卡中心',
      description:
        '从 Vue2 升级到 Vue3 的移动端应用重构项目，采用 H5 页面渲染方式，提供信用卡申请、借款、查询等金融服务功能。',
      longDescription:
        '这是北京银行信用卡中心的移动端应用重构项目，将原有 Vue2 架构升级到 Vue3，并新增多项业务功能。项目采用 H5 渲染页面的方式进行开发，支持信用卡申请、额度查询、借款申请、还款管理等核心业务功能。升级后显著提升了应用的性能和用户体验。',
      type: 'mobile',
      ownershipType: 'company',
      date: '2024.06',
      images: [
        {
          src: '/images/beijingMobile/封面图.png',
          alt: '封面',
          caption: '项目封面',
        },
        {
          src: '/images/beijingMobile/首页.png',
          alt: '首页',
          caption: '应用首页',
        },
        {
          src: '/images/beijingMobile/查询列表.png',
          alt: '查询列表',
          caption: '业务查询功能',
        },
        {
          src: '/images/beijingMobile/借款页.png',
          alt: '借款页',
          caption: '借款申请页面',
        },
        {
          src: '/images/beijingMobile/我的.png',
          alt: '我的',
          caption: '个人中心',
        },
      ],
      tags: ['Vue3', 'Vue2', 'H5', 'JavaScript', 'CSS3'],
      highlights: [
        {
          title: 'Vue2 到 Vue3 升级',
          description: '完成整个应用从 Vue2 到 Vue3 的平滑升级，利用 Composition API 优化代码结构',
        },
        {
          title: 'H5 页面渲染',
          description: '采用 H5 页面渲染方式，实现跨平台兼容，提升用户体验',
        },
        {
          title: '性能优化',
          description: '通过框架升级和代码优化，应用启动速度和页面渲染性能显著提升',
        },
        {
          title: '功能扩展',
          description: '新增多项业务功能，完善金融服务体系',
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
      images: [
        {
          src: '/static/images/projects/miniprogram-cover.jpg',
          alt: '封面',
          caption: '项目封面',
        },
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
      id: 'udesk-website',
      name: 'Udesk 企业官网',
      description:
        '基于 Bootstrap 的企业官网系统，展示公司产品、新闻资讯，提供在线咨询和客户服务功能。',
      longDescription:
        '这是为 Udesk 开发的企业官方网站，采用响应式设计，支持多终端访问。网站包含产品展示、解决方案、新闻中心、关于我们等模块，集成了在线客服系统，为用户提供便捷的咨询服务。',
      type: 'website',
      ownershipType: 'company',
      date: '2024.08',
      images: [
        {
          src: '/images/wofe/封面图.png',
          alt: '封面',
          caption: '项目封面',
        },
        {
          src: '/images/wofe/导航栏.png',
          alt: '导航栏',
          caption: '响应式导航栏设计',
        },
        {
          src: '/images/wofe/产品窗.png',
          alt: '产品展示',
          caption: '产品展示模块',
        },
        {
          src: '/images/wofe/新闻中心.png',
          alt: '新闻中心',
          caption: '新闻资讯模块',
        },
      ],
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
      link: 'https://www.udesk.cn',
      highlights: [
        {
          title: '响应式设计',
          description: '基于 Bootstrap 实现完美响应式布局，适配各种设备屏幕',
        },
        {
          title: '性能优化',
          description: '通过代码压缩、图片优化等手段，提升页面加载速度',
        },
        {
          title: 'SEO 友好',
          description: '符合搜索引擎优化标准，提升网站搜索排名',
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
      images: [
        {
          src: '/static/images/projects/blog-cover.jpg',
          alt: '封面',
          caption: '项目封面',
        },
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
    {
      id: 'cuiji-blog',
      name: '个人博客系统',
      description:
        '基于 Next.js 15 的现代化个人博客系统，采用 App Router 架构，支持 MDX 写作、深色模式和响应式设计。',
      longDescription:
        '这是我开发的个人博客系统，使用 Next.js 15 和 App Router 架构从零重构完成。系统支持 MDX 格式的文章写作、代码语法高亮、数学公式渲染、标签分类等功能。博客采用响应式设计，完美适配各种设备，支持深色模式，集成了现代化的 UI 组件和流畅的动画效果，提供优质的阅读体验。',
      type: 'website',
      ownershipType: 'personal',
      date: '2024.12',
      images: [
        {
          src: '/images/cuijiBlog/封面图.png',
          alt: '封面',
          caption: '项目封面',
        },
        {
          src: '/images/cuijiBlog/文章列表.png',
          alt: '文章列表',
          caption: '博客文章列表页',
        },
        {
          src: '/images/cuijiBlog/文章详情.png',
          alt: '文章详情',
          caption: '文章阅读页面',
        },
        {
          src: '/images/cuijiBlog/关于.png',
          alt: '关于页面',
          caption: '个人关于页面',
        },
      ],
      tags: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'MDX', 'Framer Motion', 'App Router'],
      link: 'https://www.azocuiji.com',
      highlights: [
        {
          title: 'Next.js 15 重构',
          description: '采用最新 Next.js 15 和 App Router 架构，利用 Server Components 和 RSC 提升性能',
        },
        {
          title: 'MDX 支持',
          description: '支持在 Markdown 中使用 React 组件，实现更丰富的内容表现形式',
        },
        {
          title: '现代化 UI',
          description: '使用 Tailwind CSS 和 Framer Motion 构建流畅的动画效果和精美的用户界面',
        },
        {
          title: 'SEO 优化',
          description: '完善的 SEO 配置和元数据管理，提升搜索引擎可见性和用户体验',
        },
      ],
    },
    {
      id: 'umpaas',
      name: 'UMPaaS',
      description:
        '企业级低代码开发平台，通过可视化编辑器和组件库，让非技术人员快速构建定制化应用。',
      longDescription:
        '针对客户定制化开发需求频繁、人力投入大的痛点问题，开发的低代码平台。平台内置可视化编辑器、丰富组件库和数据可视化能力，使非开发人员或初级开发人员能够在短时间内完成定制化需求开发，实现快速上架，大幅降低开发成本和交付周期。',
      type: 'other',
      ownershipType: 'company',
      date: '2024.10',
      images: [
        {
          src: '/images/umpaas/封面图.png',
          alt: '封面',
          caption: '项目封面',
        },
        {
          src: '/images/umpaas/低代码界面.png',
          alt: '低代码界面',
          caption: '可视化页面编辑器',
        },
        {
          src: '/images/umpaas/环境管理.png',
          alt: '环境管理',
          caption: '多环境配置管理',
        },
        {
          src: '/images/umpaas/接口管理.png',
          alt: '接口管理',
          caption: 'API 接口管理',
        },
        {
          src: '/images/umpaas/流程日志.png',
          alt: '流程日志',
          caption: '流程执行日志追踪',
        },
      ],
      tags: ['react', 'TypeScript', 'CSS3', 'ECharts', 'umijs'],
      highlights: [
        {
          title: '可视化编辑',
          description: '拖拽式页面构建器，所见即所得，无需编写代码即可完成页面搭建',
        },
        {
          title: '组件化架构',
          description: '提供丰富预置组件库，支持自定义组件扩展，满足多样化业务需求',
        },
        {
          title: '数据可视化',
          description: '深度集成 ECharts，提供多种图表组件，轻松实现数据可视化展示',
        },
        {
          title: '快速交付',
          description: '将定制化开发周期从数周缩短至数天，大幅提升项目交付效率',
        },
      ],
    },
  ] as Project[],
}
