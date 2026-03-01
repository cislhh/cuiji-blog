import { ContactConfig, SocialIconKind } from './types/contact'

/**
 * Contact and Social Links Configuration
 *
 * This file centralizes all contact information and social links.
 * Display settings for each section are configured separately.
 */

/**
 * All available social links data
 * Add your social media links here. These can be referenced in display configurations.
 */
const allSocialLinks: ContactConfig['socialLinks'] = [
  {
    kind: 'qq',
    href: 'tencent://message/?uin=1353761785', // Replace with your QQ number
    label: 'QQ',
    name: 'QQ',
  },
  {
    kind: 'wechat',
    href: '#', // WeChat uses QR code, no direct link
    label: '微信',
    name: '微信',
  },
  {
    kind: 'github',
    href: 'https://github.com/cislhh', // Replace with your GitHub profile
    label: 'GitHub',
    name: 'GitHub',
  },
  {
    kind: 'xiaohongshu',
    href: '#', // Replace with your Xiaohongshu link
    label: '小红书',
    name: '小红书',
  },
  {
    kind: 'x',
    href: 'https://twitter.com', // Replace with your X/Twitter profile
    label: 'X (Twitter)',
    name: 'Twitter',
  },
  {
    kind: 'bluesky',
    href: 'https://bsky.app/', // Replace with your Bluesky profile
    label: 'Bluesky',
    name: 'Bluesky',
  },
  {
    kind: 'linkedin',
    href: 'https://www.linkedin.com', // Replace with your LinkedIn profile
    label: 'LinkedIn',
    name: 'LinkedIn',
  },
  {
    kind: 'youtube',
    href: 'https://youtube.com', // Replace with your YouTube channel
    label: 'YouTube',
    name: 'YouTube',
  },
  {
    kind: 'instagram',
    href: 'https://www.instagram.com', // Replace with your Instagram profile
    label: 'Instagram',
    name: 'Instagram',
  },
  {
    kind: 'medium',
    href: 'https://medium.com', // Replace with your Medium profile
    label: 'Medium',
    name: 'Medium',
  },
  {
    kind: 'threads',
    href: 'https://www.threads.net', // Replace with your Threads profile
    label: 'Threads',
    name: 'Threads',
  },
  {
    kind: 'facebook',
    href: 'https://facebook.com', // Replace with your Facebook profile
    label: 'Facebook',
    name: 'Facebook',
  },
]

/**
 * Main contact configuration
 */
export const contactConfig: ContactConfig = {
  // ===== Personal Info =====
  name: 'CuiJi',
  description:
    '欢迎来到我的个人作品集 —— 或者说，我在网络上的游乐场。我是一名软件工程师，永远专注于学习这门手艺。"CuiJi" 取自"淬炼己身"，寓意着在代码与技术的世界里不断锤炼、打磨自己，追求卓越。我喜欢为网络构建事物，始终寻找新的挑战和学习机会。我热衷于创造美观且实用的用户体验。',

  // ===== Email Configuration =====
  email: '1353761785@qq.com',
  emails: [
    { label: 'QQ邮箱', address: '1353761785@qq.com' },
    { label: 'Gmail', address: 'wangliyu3611@gmail.com' },
  ],

  // ===== All Social Links Data =====
  socialLinks: allSocialLinks,

  // ===== Display Configuration =====
  display: {
    // Hero section - which links to show and in what order
    // Order: QQ, WeChat, GitHub, Xiaohongshu, Email
    hero: {
      socialLinks: [
        { kind: 'qq', show: true },
        { kind: 'wechat', show: true },
        { kind: 'github', show: true },
        { kind: 'xiaohongshu', show: true },
        { kind: 'mail', show: true },
      ],
    },

    // Footer - which links to show and in what order
    // Unified with Hero section for consistency
    footer: {
      showSocialLinks: true, // Master toggle for footer social links
      socialLinks: [
        { kind: 'qq', show: true },
        { kind: 'wechat', show: true },
        { kind: 'github', show: true },
        { kind: 'xiaohongshu', show: true },
        { kind: 'mail', show: true },
      ],
    },
  },

  // ===== Footer Specific Settings =====
  footer: {
    copyright: {
      showAuthor: true,
      showYear: true,
      showSiteName: true,
      // customText: 'All rights reserved', // Uncomment to add custom text
    },
    themeLink: {
      text: 'Tailwind Nextjs Theme',
      href: 'https://github.com/timlrx/tailwind-nextjs-starter-blog',
    },
  },
}

/**
 * Legacy compatibility: Extract enabled social links for old components
 * @deprecated Use contactConfig.socialLinks with contactConfig.display instead
 */
export const legacySocialLinks = contactConfig.display.footer.socialLinks
  .filter((link) => link.show)
  .map((displayLink) => {
    const data = contactConfig.socialLinks.find((s) => s.kind === displayLink.kind)
    if (displayLink.kind === 'mail') {
      return {
        kind: 'mail' as const,
        href: `mailto:${contactConfig.email}`,
        enabled: true,
      }
    }
    return {
      kind: displayLink.kind,
      href: data?.href || '#',
      enabled: displayLink.show,
    }
  })
