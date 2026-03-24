import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Benefits from '@/components/sections/Benefits';
import Features from '@/components/sections/Features';
import Pricing from '@/components/sections/Pricing';
import Trust from '@/components/sections/Trust';
import FAQ from '@/components/sections/FAQ';
import Integrations from '@/components/sections/Integrations';
import CTABanner from '@/components/sections/CTABanner';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/ui/FadeIn';

export default function Home() {
  return (
    <main className="bg-cream min-h-screen font-poppins overflow-x-hidden">
      <Navbar />
      <Hero />
      <FadeIn>
        <About />
      </FadeIn>
      <FadeIn delay={100}>
        <Benefits />
      </FadeIn>
      <FadeIn delay={200}>
        <Features />
      </FadeIn>
      <FadeIn>
        <Pricing />
      </FadeIn>
      <FadeIn delay={100}>
        <Trust />
      </FadeIn>
      <FadeIn>
        <FAQ />
      </FadeIn>
      <FadeIn delay={100}>
        <Integrations />
      </FadeIn>
      <FadeIn>
        <CTABanner />
      </FadeIn>
      <Footer />
    </main>
  );
}
