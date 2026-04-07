import { Search, CalendarCheck, MessageSquare, Award } from "lucide-react"

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Browse Counsellors",
    description: "Explore our verified career experts filtered by industry, experience, and specialization."
  },
  {
    icon: CalendarCheck,
    step: "02",
    title: "Book a Session",
    description: "Choose a convenient time slot and book your personalized counseling session."
  },
  {
    icon: MessageSquare,
    step: "03",
    title: "Get Expert Advice",
    description: "Connect via video call and receive actionable insights for your career growth."
  },
  {
    icon: Award,
    step: "04",
    title: "Achieve Your Goals",
    description: "Follow your personalized roadmap and reach your career milestones with confidence."
  }
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-gradient-to-b from-background to-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Your journey to career success in four simple steps
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <div 
              key={item.step} 
              className="group relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Card */}
              <div className="relative bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 h-full">
                {/* Step Number Badge */}
                <div className="absolute -top-3 left-6 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                  Step {item.step}
                </div>

                {/* Image Placeholder */}
                <div className="aspect-square rounded-xl bg-gradient-to-br from-secondary to-muted mb-5 flex items-center justify-center overflow-hidden group-hover:from-primary/5 group-hover:to-accent/5 transition-all duration-300">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                      <item.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Connector Arrow (except last) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <svg className="w-8 h-8 text-border" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
