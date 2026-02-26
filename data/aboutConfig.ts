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
    tagline: '软件工程师 / 终身学习者',
    avatar: '/static/images/avatar.png',
    location: '中国',
    bio: [
      '我是一名充满激情的软件工程师，专注于构建优雅且高效的数字体验。',
      '我相信优秀的代码不仅仅是功能性的，更应该是艺术性和可持续性的。',
      '在技术道路上，我始终保持好奇心和学习的热情，探索新技术、新框架、新方法论。',
      '我喜欢将复杂的问题简化，用最少的代码实现最大的价值。',
    ],
  },

  // ===== Skills & Expertise =====
  skills: [
    {
      category: '前端开发',
      items: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Vite'],
    },
    {
      category: '后端开发',
      items: ['Node.js', 'Express', 'NestJS', 'PostgreSQL', 'MongoDB', 'Redis'],
    },
    {
      category: '工具 & DevOps',
      items: ['Git', 'Docker', 'CI/CD', 'Vercel', 'AWS', 'Linux'],
    },
    {
      category: '设计',
      items: ['Figma', 'UI/UX', '响应式设计', '动画效果', '可访问性'],
    },
  ],

  // ===== Experience Timeline =====
  experience: [
    {
      year: '2022 - 至今',
      title: '高级前端工程师',
      organization: '某科技公司',
      description: '负责公司核心产品的前端架构设计和开发，推动技术栈升级和性能优化。',
    },
    {
      year: '2020 - 2022',
      title: '全栈工程师',
      organization: '某互联网公司',
      description: '参与多个项目的全栈开发，从需求分析到部署上线的完整流程。',
    },
    {
      year: '2018 - 2020',
      title: '初级前端工程师',
      organization: '某创业公司',
      description: '开始我的编程之旅，负责公司官网和管理系统的前端开发。',
    },
  ],

  // ===== Education =====
  education: [
    {
      year: '2014 - 2018',
      title: '计算机科学与技术',
      organization: '某大学',
      description: '本科，主修软件工程、数据结构与算法、计算机网络等核心课程。',
    },
  ],

  // ===== Interests & Hobbies =====
  interests: [
    { name: '开源贡献', icon: '🌟' },
    { name: '技术写作', icon: '✍️' },
    { name: '摄影', icon: '📷' },
    { name: '阅读', icon: '📚' },
    { name: '游戏开发', icon: '🎮' },
    { name: '旅行', icon: '✈️' },
  ],

  // ===== Achievements =====
  achievements: [
    {
      title: '开源项目贡献者',
      description: '为多个知名开源项目贡献代码，包括 bug 修复和功能开发。',
    },
    {
      title: '技术博客作者',
      description: '在个人博客和各大技术平台发布 50+ 篇技术文章，累计阅读量 10万+。',
    },
    {
      title: '技术分享者',
      description: '在多个技术会议和meetup中进行分享，传播前端技术知识。',
    },
  ],

  // ===== Current Focus =====
  currentFocus: {
    title: '当前专注',
    description: '探索 Next.js 15、React Server Components、AI 辅助编程等前沿技术，并将其应用到实际项目中。',
    technologies: ['Next.js', 'React 19', 'TypeScript', 'AI/ML', 'Web3'],
  },

  // ===== Fun Facts =====
  funFacts: [
    '我写代码时喜欢听 Lo-Fi 音乐',
    '我有收集机械键盘的习惯',
    '最喜欢的编程语言是 TypeScript',
    '我是一名开源软件的忠实支持者',
    '我喜欢在深夜思考和解决问题',
  ],
}

/**
 * Legacy compatibility: Extract bio for old components
 */
export const bioText = aboutConfig.personalInfo.bio.join('\n\n')
