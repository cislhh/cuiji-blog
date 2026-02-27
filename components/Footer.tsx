'use client'

import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import EmailDropdown from './EmailDropdown'
import QRCodePopup from './QRCodePopup'
import { contactConfig } from '@/data/contactConfig'
import { Qq, Wechat, Xiaohongshu, Github, Twitter } from '@/components/social-icons/icons'

// Icon component map (for standard links without special behavior)
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  x: Twitter,
  qq: Qq,
  wechat: Wechat,
  xiaohongshu: Xiaohongshu,
}

export default function Footer() {
  // Get social links to display in Footer from config (same as Hero)
  const footerSocialLinks = contactConfig.display.footer.socialLinks
    .filter((link) => link.show)
    .map((displayLink) => {
      const data = contactConfig.socialLinks.find((s) => s.kind === displayLink.kind)
      return {
        kind: displayLink.kind,
        href: data?.href || '#',
        label: data?.label || displayLink.kind,
        name: data?.name || displayLink.kind,
      }
    })

  // Render a social link based on its kind (same logic as Hero)
  const renderSocialLink = (social: (typeof footerSocialLinks)[0]) => {
    // Special handling for QQ (QR code popup)
    if (social.kind === 'qq') {
      return (
        <QRCodePopup
          key={social.kind}
          icon={Qq}
          qrCodeUrl="/images/qq-qr.png"
          alt="QQ二维码"
          size={6}
        />
      )
    }

    // Special handling for WeChat (QR code popup)
    if (social.kind === 'wechat') {
      return (
        <QRCodePopup
          key={social.kind}
          icon={Wechat}
          qrCodeUrl="/images/wechat-qr.png"
          alt="微信二维码"
          size={6}
        />
      )
    }

    // Special handling for Email (dropdown)
    if (social.kind === 'mail' && contactConfig.emails) {
      return <EmailDropdown key={social.kind} emails={contactConfig.emails} size={6} />
    }

    // Standard social links
    const IconComponent = iconMap[social.kind]
    if (!IconComponent) return null

    return (
      <a
        key={social.kind}
        href={social.href}
        aria-label={social.label}
        className="text-gray-400 transition-colors hover:text-gray-100"
        target={social.href.startsWith('http') ? '_blank' : undefined}
        rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        <IconComponent className="h-6 w-6" />
      </a>
    )
  }

  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        {contactConfig.display.footer.showSocialLinks && (
          <div className="mb-3 flex items-center gap-6">
            {/* Social links from config - same rendering as Hero */}
            {footerSocialLinks.map(renderSocialLink)}
          </div>
        )}
        <div className="text-text-secondary mb-2 flex space-x-2 text-sm">
          {contactConfig.footer.copyright.showAuthor && <div>{siteMetadata.author}</div>}
          {contactConfig.footer.copyright.showAuthor &&
            (contactConfig.footer.copyright.showYear || contactConfig.footer.copyright.showSiteName) && (
            <div>{` • `}</div>
          )}
          {contactConfig.footer.copyright.showYear && <div>{`© ${new Date().getFullYear()}`}</div>}
          {contactConfig.footer.copyright.showYear && contactConfig.footer.copyright.showSiteName && (
            <div>{` • `}</div>
          )}
          {contactConfig.footer.copyright.showSiteName && (
            <Link href="/posts">{siteMetadata.title}</Link>
          )}
          {contactConfig.footer.copyright.customText && (
            <>
              <div>{` • `}</div>
              <div>{contactConfig.footer.copyright.customText}</div>
            </>
          )}
        </div>
        <div className="text-text-secondary mb-8 text-sm">
          <Link href={contactConfig.footer.themeLink.href}>{contactConfig.footer.themeLink.text}</Link>
        </div>
      </div>
    </footer>
  )
}
