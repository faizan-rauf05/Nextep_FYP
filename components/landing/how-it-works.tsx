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
    <section id="how-it-works" className="py-24 md:py-32 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/70">
            Get started in three simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((item, index) => (
            <div key={item.step} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-primary-foreground/20" />
              )}

              <div className="flex flex-col items-center text-center">
                {/* Icon */}
                <div className="w-24 h-24 rounded-2xl bg-primary-foreground/10 flex items-center justify-center mb-6 border border-primary-foreground/20">
                  <item.icon className="h-10 w-10 text-primary-foreground" />
                </div>

                {/* Step Number */}
                <span className="text-sm font-medium text-primary-foreground/50 mb-2">
                  Step {item.step}
                </span>

                {/* Title */}
                <h3 className="text-xl font-semibold mb-3">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-primary-foreground/70 leading-relaxed max-w-xs">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
