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
    <section className="py-24 md:py-32 bg-gradient-to-b from-background via-blue-50/30 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20 animate-fade-in-down">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Why Choose PathFinder
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We make career guidance accessible, personalized, and effective.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group relative p-6 md:p-8 bg-white rounded-2xl border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer animate-fade-in-up"
              style={{animationDelay: `${index * 0.1}s`, animationFillMode: 'both'}}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-5 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                  {feature.description}
                </p>
              </div>

              {/* Animated border effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
