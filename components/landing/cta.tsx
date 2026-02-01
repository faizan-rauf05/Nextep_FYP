import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="py-24 md:py-32 bg-secondary/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative rounded-3xl bg-primary text-primary-foreground overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="relative px-6 py-16 md:py-24 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight max-w-2xl mx-auto text-balance">
              Ready to Take the Next Step in Your Career?
            </h2>
            <p className="mt-6 text-lg text-primary-foreground/70 max-w-xl mx-auto">
              Join thousands of professionals who have found clarity and direction with PathFinder.
            </p>
            <div className="mt-10">
              <Button 
                size="lg"
                variant="secondary"
                className="rounded-full px-8 h-12 text-base font-medium group"
              >
                Start Your Journey Today
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
