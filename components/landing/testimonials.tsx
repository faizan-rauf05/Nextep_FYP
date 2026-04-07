import { Quote, Star } from "lucide-react"

const testimonials = [
  {
    quote: "PathFinder connected me with an amazing mentor who helped me transition from engineering to product management. The personalized guidance was invaluable.",
    author: "Alex Thompson",
    role: "Product Manager at TechCorp",
    rating: 5,
  },
  {
    quote: "The quality of counselors on this platform is exceptional. My advisor had exactly the industry experience I needed, and I landed my dream job within 3 months.",
    author: "Maria Garcia",
    role: "Senior UX Designer",
    rating: 5,
  },
  {
    quote: "After just three sessions, I had a clear roadmap for my career. The personalized approach and actionable insights made all the difference in my professional journey.",
    author: "David Kim",
    role: "Marketing Director",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-background to-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of professionals who have transformed their careers
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.author}
              className="group bg-card rounded-2xl p-6 md:p-8 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl"
            >
              {/* Quote Icon */}
              <Quote className="h-10 w-10 text-primary/20 mb-4" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground leading-relaxed mb-6">
                {`"${testimonial.quote}"`}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                {/* Avatar Placeholder */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-border">
                  <span className="text-sm font-semibold text-primary">
                    {testimonial.author.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.author}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
