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
    description: "Our algorithm connects you with counselors who specialize in your career goals."
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
    <section className="py-24 md:py-32 bg-secondary/50">
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
              className="group p-6 md:p-8 bg-card rounded-2xl border border-border hover:border-foreground/20 transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-5">
                <feature.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
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
