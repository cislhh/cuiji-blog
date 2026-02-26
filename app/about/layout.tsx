import { Metadata } from 'next'
import { genPageMetadata } from 'app/seo'

export const metadata: Metadata = genPageMetadata({
  title: 'About',
  description: '了解更多关于我的背景和经历',
})

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
