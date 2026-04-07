import { Shield, Users, Calendar, Star } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Verified Experts",
    description: "All counselors are thoroughly vetted with proven industry experience and credentials."
  },
  {
    icon: Users,
    title: "Personalized Matching",
    description: "Our system connects you with counselors who specialize in your career goals."
  },
  {
    icon: Calendar,
    title: "Flexible Scheduling",
    description: "Book sessions at your convenience with our easy-to-use scheduling system."
  },
  {
    icon: Star,
    title: "Guaranteed Quality",
    description: "Every session is backed by our satisfaction guarantee and quality standards."
  }
]

export function Features() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Why Choose PathFinder
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We make career guidance accessible, personalized, and effective.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature) => (
            <div 
              key={feature.title}
              className="group relative p-6 md:p-8 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-5 group-hover:from-primary/20 group-hover:to-accent/20 group-hover:scale-110 transition-all duration-300">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
