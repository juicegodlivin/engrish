import { Navbar } from '~/components/layout/navbar'
import { Footer } from '~/components/layout/footer'
import { HeroSection } from '~/components/landing/hero-section'
import { StatsBar } from '~/components/landing/stats-bar'
import { AboutSection } from '~/components/landing/about-section'
import { TokenomicsSection } from '~/components/landing/tokenomics-section'
import { TeamSection } from '~/components/landing/team-section'
import { HowToBuySection } from '~/components/landing/how-to-buy-section'
import { MemeGallery } from '~/components/landing/meme-gallery'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <StatsBar />
      <AboutSection />
      <TokenomicsSection />
      <TeamSection />
      <HowToBuySection />
      <MemeGallery />
      <Footer />
    </main>
  )
}

