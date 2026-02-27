import { NewsletterAPI } from 'pliny/newsletter'
import siteMetadata from '@/data/siteMetadata'

export const dynamic = 'force-static'

// 类型安全的 newsletter 配置处理
type NewsletterProvider = 'buttondown' | 'convertkit' | 'klaviyo' | 'mailchimp' | 'emailoctopus' | 'beehiiv'

const newsletterConfig = siteMetadata.newsletter as { provider?: NewsletterProvider } | undefined
const provider = newsletterConfig?.provider as NewsletterProvider | undefined

// 创建 handler，只传递有效配置
const config = provider ? { provider } : {}
const handler = NewsletterAPI(config as any)

export { handler as GET, handler as POST }
