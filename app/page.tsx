import { Navigation } from "@/components/landing/navigation"
import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { Counsellors } from "@/components/landing/counsellors"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Testimonials } from "@/components/landing/testimonials"
import { CTA } from "@/components/landing/cta"
import { Footer } from "@/components/landing/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Features />
      <Counsellors />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}
