import ClientProviders from './components/ClientProviders'
import { HeroSection, AboutSection, FeaturedWorks, ContactSection } from './components/home'

export default function HomePage() {
  return (
    <ClientProviders>
      <main>
        <HeroSection />
        <AboutSection />
        <FeaturedWorks />
        <ContactSection />
      </main>
    </ClientProviders>
  )
}
