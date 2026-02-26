/**
 * Configuration types for contact, footer, and hero sections
 */

// Social icon kinds supported by the SocialIcon component
export type SocialIconKind =
  | 'mail'
  | 'github'
  | 'facebook'
  | 'youtube'
  | 'linkedin'
  | 'twitter'
  | 'x'
  | 'mastodon'
  | 'threads'
  | 'instagram'
  | 'medium'
  | 'bluesky'
  | 'wechat'
  | 'xiaohongshu'
  | 'qq'

// Social link data (all available social links)
export interface SocialLinkData {
  kind: SocialIconKind
  href: string
  label: string // For aria-label and display
  name: string // Display name (Chinese)
}

// Social link display configuration (which links to show and in what order)
export interface SocialLinkDisplay {
  kind: SocialIconKind
  show: boolean // Whether to display this link
}

// Social links configuration (data + display settings)
export interface SocialLinksConfig {
  hero: SocialLinkDisplay[] // Hero section display order
  footer: SocialLinkDisplay[] // Footer display order
}

// Legacy interface for backward compatibility
export interface SocialLink {
  kind: SocialIconKind
  href: string
  enabled: boolean
}

// Email configuration
export interface EmailConfig {
  label: string
  address: string
}

// Contact configuration
export interface ContactConfig {
  // Personal info
  name: string // Display name in Hero section
  description: string // Description in Hero section

  // Email configuration
  email: string
  emails?: EmailConfig[] // Multiple email options

  // All available social links data
  socialLinks: SocialLinkData[]

  // Display configuration for each section
  display: {
    hero: {
      socialLinks: SocialLinkDisplay[] // Which links to show in Hero section
    }
    footer: {
      socialLinks: SocialLinkDisplay[] // Which links to show in Footer
      showSocialLinks: boolean // Master toggle for footer social links
    }
  }

  // Footer specific settings
  footer: {
    copyright: CopyrightConfig
    themeLink: {
      text: string
      href: string
    }
  }
}

// Keep old interface for backward compatibility
export interface ContactConfigLegacy {
  email: string
  emails?: EmailConfig[]
  socialLinks: SocialLink[]
}

// Copyright configuration
export interface CopyrightConfig {
  showAuthor: boolean
  showYear: boolean
  showSiteName: boolean
  customText?: string
}

// Footer configuration
export interface FooterConfig {
  showSocialLinks: boolean
  copyright: CopyrightConfig
  themeLink: {
    text: string
    href: string
  }
}

// Tagline configuration
export interface TaglineConfig {
  title: string
  subtitle: string
}

// Tech stack item
export interface TechStackItem {
  name: string
  icon: string
  color: string
}

// Statistics configuration
export interface StatisticsConfig {
  posts: number
  projects: number
  yearsOfExperience: number
}

// CTA button configuration
export interface CTAButton {
  text: string
  href: string
}

export interface CTAConfig {
  primary: CTAButton
  secondary: CTAButton
}

// About page configuration
export interface AboutConfig {
  title: string
  subtitle: string
  contactSectionTitle: string
}

// Contact section configuration
export interface ContactSectionConfig {
  title: string
  email: string
}

// Hero configuration (combines all hero-related configs)
export interface HeroConfig {
  tagline: TaglineConfig
  introduction: string
  techStack: TechStackItem[]
  statistics: StatisticsConfig
  cta: CTAConfig
  about: AboutConfig
  contact: ContactSectionConfig
}
