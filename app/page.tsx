import SmoothScroll from '@/components/SmoothScroll'
import { HeroSection, AboutSection, TimelineSection, ContactSection } from './components/home'

export default function HomePage() {
  return (
    <SmoothScroll>
      <main>
        <HeroSection />
        <AboutSection />
        <TimelineSection />
        <ContactSection />
      </main>
    </SmoothScroll>
  )
}
