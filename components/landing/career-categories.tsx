import { Cpu, Stethoscope, Briefcase, Code, Palette, GraduationCap } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    title: "Engineering",
    icon: Cpu,
    description: "Mechanical, Civil, Electrical & more",
    color: "from-blue-500/10 to-blue-600/5",
    iconColor: "text-blue-600",
  },
  {
    title: "Medical",
    icon: Stethoscope,
    description: "Healthcare, Nursing, Pharmacy",
    color: "from-emerald-500/10 to-emerald-600/5",
    iconColor: "text-emerald-600",
  },
  {
    title: "Business",
    icon: Briefcase,
    description: "Management, Finance, Marketing",
    color: "from-amber-500/10 to-amber-600/5",
    iconColor: "text-amber-600",
  },
  {
    title: "IT & Software",
    icon: Code,
    description: "Development, Data Science, AI",
    color: "from-primary/10 to-accent/5",
    iconColor: "text-primary",
  },
  {
    title: "Creative Arts",
    icon: Palette,
    description: "Design, Media, Entertainment",
    color: "from-pink-500/10 to-pink-600/5",
    iconColor: "text-pink-600",
  },
  {
    title: "Education",
    icon: GraduationCap,
    description: "Teaching, Research, Academia",
    color: "from-indigo-500/10 to-indigo-600/5",
    iconColor: "text-indigo-600",
  },
]

export function CareerCategories() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Career Categories
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Find expert counsellors across various industries and career paths
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.title}
              href="/counsellors"
              className="group relative bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl overflow-hidden"
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className="relative flex items-start gap-4">
                {/* Image Placeholder / Icon */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className={`w-8 h-8 ${category.iconColor}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {category.description}
                  </p>
                  
                  {/* Arrow */}
                  <div className="mt-3 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300">
                    Explore
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
