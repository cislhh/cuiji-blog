import SmoothScroll from '@/components/SmoothScroll'
import { HeroSection, IntroSection, WorksSection, ContactSection } from './components/home'

export default function HomePage() {
  return (
    <SmoothScroll>
      <main>
        <HeroSection />
        <IntroSection />
        <WorksSection />
        <ContactSection />
      </main>
    </SmoothScroll>
  )
}
