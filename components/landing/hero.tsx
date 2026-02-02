import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Enhanced Background with Animated Gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-blue-50" />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/10 rounded-full blur-3xl animate-pulse opacity-50" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-accent/20 to-primary/10 rounded-full blur-3xl animate-pulse opacity-50" style={{animationDelay: '1s'}} />
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-3xl animate-float" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 md:py-32 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Announcement Badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 animate-fade-in-down">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Join 5,000+ students finding their path</span>
          </div>

          {/* Headline with Gradient */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-balance leading-[1.1] mb-4 animate-fade-in-up">
            Navigate Your Career
            <br className="hidden sm:block" />
            <span className="gradient-text">With Confidence</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 md:mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed animate-fade-in-up opacity-0" style={{animationDelay: '0.2s', animationFillMode: 'forwards'}}>
            Connect with experienced career counselors who understand your industry. 
            Get personalized guidance to unlock your full potential.
          </p>

          {/* CTAs */}
          <div className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up opacity-0" style={{animationDelay: '0.4s', animationFillMode: 'forwards'}}>
            <Button 
              size="lg" 
              className="rounded-full px-8 h-12 text-base font-medium group bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Find Your Career Path
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full px-8 h-12 text-base font-medium bg-white hover:bg-blue-50 border-2 border-primary/20 text-foreground hover:border-primary/50 transition-all hover:scale-105"
            >
              Become a Counsellor
            </Button>
          </div>

          {/* Trust Indicators with Animation */}
          <div className="mt-16 md:mt-20 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground animate-fade-in-up opacity-0" style={{animationDelay: '0.6s', animationFillMode: 'forwards'}}>
            <div className="flex items-center gap-2 hover:text-foreground transition-colors group cursor-pointer">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-white shadow-md group-hover:scale-110 transition-transform"
                    style={{animationDelay: `${i * 0.1}s`}}
                  />
                ))}
              </div>
              <span className="font-medium">500+ Counsellors</span>
            </div>
            <div className="h-4 w-px bg-border hidden sm:block" />
            <div className="hover:text-foreground transition-colors group cursor-pointer font-medium">
              10,000+ Sessions Completed
            </div>
            <div className="h-4 w-px bg-border hidden sm:block" />
            <div className="flex items-center gap-2 hover:text-foreground transition-colors cursor-pointer font-medium">
              <span>4.9/5</span>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="text-primary">★</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
