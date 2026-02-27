import { HeroConfig } from './types/contact'

/**
 * Hero Section Configuration
 *
 * Configure all hero section content including:
 * - Tagline and introduction
 * - Tech stack display
 * - Statistics
 * - CTA buttons
 * - About page text
 * - Contact section
 */
export const heroConfig: HeroConfig = {
  // Main tagline displayed on homepage
  tagline: {
    title: '构建未来',
    subtitle: '一行代码一行代码地',
  },

  // Introduction text (if used in your design)
  introduction:
    '我是一名充满激情的软件工程师，专注于构建优雅且高效的数字体验。探索设计与技术的交汇点，一次完成一个项目。',

  // Technologies displayed in "Currently Learning & Using" section
  techStack: [
    { name: 'React', icon: '', color: 'hover:text-cyan-400' },
    { name: 'Next.js', icon: '', color: 'hover:text-white' },
    { name: 'Vue.js', icon: '', color: 'hover:text-green-500' },
    { name: 'TypeScript', icon: '', color: 'hover:text-blue-400' },
    { name: 'Tailwind CSS', icon: '', color: 'hover:text-teal-400' },
    { name: 'Vite', icon: '', color: 'hover:text-purple-400' },
    { name: 'Node.js', icon: '', color: 'hover:text-green-400' },
    { name: 'NestJS', icon: '', color: 'hover:text-red-400' },
  ],

  // Statistics displayed on homepage
  statistics: {
    posts: 12,
    projects: 8,
    yearsOfExperience: 5,
  },

  // Call-to-action buttons
  cta: {
    primary: {
      text: '查看博客',
      href: '/blog',
    },
    secondary: {
      text: '查看项目',
      href: '/projects',
    },
  },

  // About page content
  about: {
    title: '关于我',
    subtitle: '了解更多关于我的背景和经历',
    contactSectionTitle: '联系方式',
  },

  // Contact section on homepage
  contact: {
    title: "Let's make something\ngreat together",
    email: '1353761785@qq.com',
  },
}
