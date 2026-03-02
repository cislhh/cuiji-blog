import ClientProviders from './components/ClientProviders'
import { HeroSection, FeaturedWorks, ContactSection } from './components/home'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import BlogHighlightsSection from './components/home/BlogHighlightsSection'

export default function HomePage() {
  // 获取最新的博客文章
  const posts = allCoreContent(sortPosts(allBlogs))
  const latestPosts = posts.slice(0, 5) // 获取最新5篇

  return (
    <ClientProviders>
      <main>
        <HeroSection />
        <BlogHighlightsSection posts={latestPosts} />
        <FeaturedWorks />
        <ContactSection />
      </main>
    </ClientProviders>
  )
}
