import { Search, CalendarCheck, MessageSquare } from "lucide-react"

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Find Your Counsellor",
    description: "Browse our curated list of verified career experts and find the perfect match for your goals."
  },
  {
    icon: CalendarCheck,
    step: "02",
    title: "Book a Session",
    description: "Choose a time that works for you and book your personalized career counseling session."
  },
  {
    icon: MessageSquare,
    step: "03",
    title: "Get Guidance",
    description: "Connect via video call and receive actionable insights to accelerate your career growth."
  }
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-gradient-to-r from-primary via-accent to-primary text-primary-foreground relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse opacity-30" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse opacity-30" style={{animationDelay: '1s'}} />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20 animate-fade-in-down">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Get started in three simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((item, index) => (
            <div 
              key={item.step} 
              className="relative group animate-fade-in-up"
              style={{animationDelay: `${index * 0.15}s`, animationFillMode: 'both'}}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary-foreground/30 via-primary-foreground/20 to-transparent" />
              )}

              <div className="flex flex-col items-center text-center relative">
                {/* Icon Container with Hover Effect */}
                <div className="w-24 h-24 rounded-2xl bg-primary-foreground/10 flex items-center justify-center mb-6 border-2 border-primary-foreground/30 group-hover:bg-primary-foreground/20 group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300 backdrop-blur-md">
                  <item.icon className="h-10 w-10 text-primary-foreground group-hover:scale-125 transition-transform duration-300" />
                </div>

                {/* Step Number */}
                <span className="text-sm font-medium text-primary-foreground/60 mb-2 group-hover:text-primary-foreground/100 transition-colors duration-300">
                  Step {item.step}
                </span>

                {/* Title */}
                <h3 className="text-xl font-semibold mb-3 group-hover:text-white transition-colors duration-300">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-primary-foreground/70 leading-relaxed max-w-xs group-hover:text-primary-foreground/90 transition-colors duration-300">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center animate-fade-in-up opacity-0" style={{animationDelay: '0.6s', animationFillMode: 'forwards'}}>
          <p className="text-lg text-primary-foreground/80">
            Ready to take the next step?
          </p>
          <button className="mt-4 px-8 py-3 rounded-full bg-white text-primary font-semibold hover:bg-primary-foreground/90 hover:shadow-xl transition-all duration-300 hover:scale-105">
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  )
}
