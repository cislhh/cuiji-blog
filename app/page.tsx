import ClientProviders from './components/ClientProviders'
import { HeroSection, AboutSection, TimelineSection, ContactSection } from './components/home'

export default function HomePage() {
  return (
    <ClientProviders>
      <main>
        <HeroSection />
        <AboutSection />
        <TimelineSection />
        <ContactSection />
      </main>
    </ClientProviders>
  )
}
