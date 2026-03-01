import { AboutPageConfig } from './types/contact'

/**
 * About Page Configuration
 *
 * This file centralizes all About page content including:
 * - Personal information
 * - Skills and expertise
 * - Experience timeline
 * - Education
 * - Interests
 * - Achievements
 */

/**
 * Main About Page Configuration
 */
export const aboutConfig: AboutPageConfig = {
  // ===== Personal Information =====
  personalInfo: {
    name: 'CuiJi',
    tagline: '前端开发工程师 / 6年开发经验',
    avatar: '/images/profile-photo.png',
    location: '长春',
    bio: [
      '我是一名拥有6年经验的前端开发工程师，专注于构建高性能、用户友好的Web应用。',
      '擅长React和Vue3生态系统，在企业级低代码平台、智慧医疗系统、金融H5应用等领域有丰富的实战经验。',
      '"淬己"取自"淬炼己身"，寓意着在代码与技术的世界里不断锤炼、打磨自己，追求卓越。',
      '我相信优秀的代码不仅仅是功能性的，更应该是艺术性和可持续性的。始终保持好奇心和学习的热情。',
    ],
  },

  // ===== Skills & Expertise =====
  skills: [
    {
      category: '前端开发',
      items: ['React', 'Next.js', 'Nuxt.js', 'Vue3', 'UniApp', 'TypeScript', 'JavaScript', 'UmiJS'],
    },
    {
      category: 'UI框架 & 工具',
      items: ['Ant Design', 'Element Plus', 'Tailwind CSS', 'Vite', 'ECharts'],
    },
    {
      category: '后端',
      items: ['Node.js', 'Prisma', 'PostgreSQL'],
    },
    {
      category: '开发工具',
      items: ['Git', 'VSCode', 'Claude Code'],
    },
  ],

  // ===== Project Experience =====
  experience: [
    {
      title: 'SaaS客服系统 | 前端架构师 & 开发工程师',
      organization: '沈阳丰星科技股份有限公司',
      description:
        '作为项目前端架构成员，主导新SaaS客服系统前端技术体系从0到1搭建，覆盖工单管理、系统配置、人员管理、工作流引擎等核心业务模块。\n- 技术选型与架构定型：主导项目初期前端技术栈论证，基于 Vue3 + TypeScript + Vite 构建高性能技术方案，替代传统Vue2选项式API，提升代码可维护性及开发效率30%\n- 模块化工程架构：设计并落地分层模块化架构（核心业务层/通用组件层/工具服务层），实现 40+可复用业务组件，封装统一请求拦截、权限控制、错误监控等基础服务模块，降低业务代码耦合度\n- 团队建设与赋能：编写项目专用技术文档，培训新进人员，帮助实习生尽快融入项目开发，为项目组的人员更替节省时间\n- 技术创新实践：使用 Nuxt 开发部分中间件，增强系统功能扩展性，探索前端新技术在实际业务中的应用',
    },
    {
      title: 'UDESK工单系统 | 前端开发工程师',
      organization: '北京沃丰时代数据科技有限公司',
      description:
        '负责工单应用平台核心开发与持续迭代，参与公司前端业务功能重构，从 Ember 迁移至 React Hooks 架构。\n- 工单系统开发：根据客户需求持续迭代主项目，在职期间零故障回滚，产品按时上线，UI 优化获得客户好评\n- PaaS 低代码平台：独立开发公司服务中间件技术，提供可视化页面搭建和接口调用能力，培训实施和前端人员，将原外包服务转为内部消化，节省大量成本，并将平台包装为产品向客户提供\n- 官网重构优化：使用 Next.js 替换旧技术栈，统筹更新计划解决加载缓慢问题，提供 SEO 优化方案，提升客户点击率',
    },
    {
      title: '北京银行信用卡 | 前端开发工程师',
      organization: '北京银行股份有限公司',
      description:
        '北京银行信用卡App新版本开发，在旧版本基础上增加定制首页、授权登录、卡片管理等便民功能，对现有功能进行重构优化，提升用户体验。\n- 团队管理：担任开发小组组长，带领8名前端开发人员协作开发，高质保时完成迭代任务\n- 组件化开发：对常用模块进行组件化开发，减少代码冗余，提高代码复用率\n- 技术选型：使用特殊框架进行项目搭建，优化开发流程和项目结构\n- Element UI 定制：对 Element UI 进行拆解，提取可用组件并进行二次开发\n- 原生联调：与客户端进行方法联调，包括扫描、权限等原生功能交互',
    },
  ],

  // ===== Interests & Hobbies =====
  interests: [
    { name: '前端技术', icon: '💻' },
    { name: '后端技术', icon: '⚙️' },
    { name: '开源项目', icon: '🌟' },
    { name: '技术博客', icon: '✍️' },
    { name: '阅读', icon: '📚' },
    { name: '音乐', icon: '🎵' },
  ],

  // ===== Achievements =====
  achievements: [],

  // ===== Current Focus =====
  currentFocus: {
    title: '当前专注',
    description:
      '深耕 Next.js 全栈开发领域，探索后端应用接口开发，学习 AI 应用相关技术。持续优化个人技能体系，提升 AI 辅助开发效率，追求技术与创新的最佳实践。',
    technologies: ['Next.js', '全栈开发', 'AI 应用', '后端开发', '技能优化'],
  },

  // ===== Personal Stats & Vision =====
  personalStats: {
    title: '数字化足迹与愿景',
    description:
      '作为一名心理学背景的开发者，我始终怀揣着一个技术梦想：实现心理学与计算机科学的深度融合。在人工智能技术迅猛发展的当下，从自然语言处理到情感计算，从用户行为分析到智能交互设计，每一个技术层级都在不断突破边界。我坚信，跨学科的融合能够创造出更有温度、更懂人心的技术产品。这个愿景不仅是我踏入编程领域的敲门砖，更是我在技术道路上不断探索、持续创新的动力源泉。',
    stats: [
      { label: '完成项目', value: '15+' },
      { label: '技术栈掌握', value: '10+' },
      { label: '代码贡献', value: '50万+' },
      { label: '团队协作', value: '8人团队' },
    ],
  },
}

/**
 * Legacy compatibility: Extract bio for old components
 */
export const bioText = aboutConfig.personalInfo.bio.join('\n\n')
