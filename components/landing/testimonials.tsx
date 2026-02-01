import { Quote } from "lucide-react"

const testimonials = [
  {
    quote: "PathFinder connected me with an amazing mentor who helped me transition from engineering to product management. Best investment in my career.",
    author: "Alex Thompson",
    role: "Product Manager at Tech Co",
    image: null
  },
  {
    quote: "The quality of counselors on this platform is exceptional. My advisor had exactly the industry experience I needed for my job search.",
    author: "Maria Garcia",
    role: "Senior Designer",
    image: null
  },
  {
    quote: "After three sessions, I had a clear roadmap for my career. The personalized approach made all the difference in my journey.",
    author: "David Kim",
    role: "Marketing Director",
    image: null
  }
]

export function Testimonials() {
  return (
    <section className="py-24 md:py-32">
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
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.author}
              className="bg-card rounded-2xl p-6 md:p-8 border border-border hover:border-foreground/20 transition-all duration-300 hover:shadow-lg"
            >
              {/* Quote Icon */}
              <Quote className="h-8 w-8 text-muted-foreground/30 mb-4" />

              {/* Quote */}
              <p className="text-foreground leading-relaxed mb-6">
                {`"${testimonial.quote}"`}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted" />
                <div>
                  <p className="font-medium text-foreground text-sm">
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
