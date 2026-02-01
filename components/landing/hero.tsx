import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-muted/50 via-background to-background" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-muted/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-muted/20 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground text-balance leading-[1.1]">
            Navigate Your Career<br className="hidden sm:block" />
            <span className="text-muted-foreground">With Confidence</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 md:mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
            Connect with experienced career counselors who understand your industry. 
            Get personalized guidance to unlock your full potential.
          </p>

          {/* CTAs */}
          <div className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="rounded-full px-8 h-12 text-base font-medium group"
            >
              Find Your Career Path
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full px-8 h-12 text-base font-medium bg-transparent"
            >
              Become a Counsellor
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 md:mt-20 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className="w-8 h-8 rounded-full bg-muted border-2 border-background"
                  />
                ))}
              </div>
              <span>500+ Counsellors</span>
            </div>
            <div className="h-4 w-px bg-border hidden sm:block" />
            <span>10,000+ Sessions Completed</span>
            <div className="h-4 w-px bg-border hidden sm:block" />
            <span>4.9/5 Average Rating</span>
          </div>
        </div>
      </div>
    </section>
  )
}
