import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import EmailDropdown from './EmailDropdown'
import { contactConfig } from '@/data/contactConfig'

export default function Footer() {
  // Get social links to display in Footer from config
  const footerSocialLinks = contactConfig.display.footer.socialLinks
    .filter((link) => link.show)
    .map((displayLink) => {
      if (displayLink.kind === 'mail') {
        return {
          kind: 'mail' as const,
          href: `mailto:${contactConfig.email}`,
        }
      }
      const data = contactConfig.socialLinks.find((s) => s.kind === displayLink.kind)
      return {
        kind: displayLink.kind,
        href: data?.href || '#',
      }
    })

  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        {contactConfig.display.footer.showSocialLinks && (
          <div className="mb-3 flex space-x-4">
            {footerSocialLinks.map((link) =>
              link.kind === 'mail' && contactConfig.emails ? (
                <EmailDropdown key={link.kind} emails={contactConfig.emails} size={6} />
              ) : (
                <SocialIcon key={link.kind} kind={link.kind} href={link.href} size={6} />
              )
            )}
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
