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
    title: 'Building the Future',
    subtitle: 'One line of code at a time',
  },

  // Introduction text (if used in your design)
  introduction:
    "I'm a passionate developer crafting beautiful digital experiences. Exploring the intersection of design and technology, one project at a time.",

  // Technologies displayed in "Currently Learning & Using" section
  techStack: [
    { name: 'React', icon: '', color: 'hover:text-cyan-400' },
    { name: 'Next.js', icon: '', color: 'hover:text-white' },
    { name: 'TypeScript', icon: '', color: 'hover:text-blue-400' },
    { name: 'Tailwind', icon: '', color: 'hover:text-teal-400' },
    { name: 'Node.js', icon: '', color: 'hover:text-green-400' },
    { name: 'Vue', icon: '', color: 'hover:text-green-500' },
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
      text: 'View Blog',
      href: '/blog',
    },
    secondary: {
      text: 'View Projects',
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
    email: 'hi@dalelarroder.com',
  },
}
