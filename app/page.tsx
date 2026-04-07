import { Navigation } from "@/components/landing/navigation"
import { Hero } from "@/components/landing/hero"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Counsellors } from "@/components/landing/counsellors"
import { CareerCategories } from "@/components/landing/career-categories"
import { Testimonials } from "@/components/landing/testimonials"
import { CTA } from "@/components/landing/cta"
import { Footer } from "@/components/landing/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <HowItWorks />
      <Counsellors />
      <CareerCategories />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}
