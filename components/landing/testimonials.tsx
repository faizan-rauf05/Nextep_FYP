import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "PathFinder connected me with an amazing mentor who helped me transition from engineering to product management. Best investment in my career.",
    author: "Alex Thompson",
    role: "Product Manager at Tech Co",
    initials: "AT",
  },
  {
    quote:
      "The quality of counselors on this platform is exceptional. My advisor had exactly the industry experience I needed for my job search.",
    author: "Maria Garcia",
    role: "Senior Designer",
    initials: "MG",
  },
  {
    quote:
      "After three sessions, I had a clear roadmap for my career. The personalized approach made all the difference in my journey.",
    author: "David Kim",
    role: "Marketing Director",
    initials: "DK",
  },
];

const avatarGradients = [
  "linear-gradient(135deg, #0063c4, #004a93)",
  "linear-gradient(135deg, #1d6fd4, #0063c4)",
  "linear-gradient(135deg, #3b82f6, #0063c4)",
];

export function Testimonials() {
  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{
        background:
          "linear-gradient(135deg, #0a1628 0%, #0d1f3c 50%, #0a1628 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "rgba(0, 99, 196, 0.2)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "rgba(0, 99, 196, 0.15)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span
            className="inline-block mb-4 px-4 py-1 rounded-full text-sm font-medium"
            style={{
              background: "rgba(0, 99, 196, 0.15)",
              border: "1px solid rgba(0, 99, 196, 0.5)",
              color: "#60a5fa",
            }}
          >
            Student Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            What Our{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(90deg, #60a5fa, #0063c4)",
              }}
            >
              Clients Say
            </span>
          </h2>
          <p className="mt-4 text-lg" style={{ color: "#94a3b8" }}>
            Join thousands of professionals who have transformed their careers
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.author}
              className="group relative rounded-2xl p-6 md:p-8 transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(0, 99, 196, 0.25)",
                backdropFilter: "blur(8px)",
              }}
              
            >
              {/* Quote Icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,99,196,0.3), rgba(0,74,147,0.2))",
                  border: "1px solid rgba(0, 99, 196, 0.4)",
                }}
              >
                <Quote className="h-5 w-5" style={{ color: "#60a5fa" }} />
              </div>

              {/* Quote */}
              <p className="leading-relaxed mb-6" style={{ color: "#cbd5e1" }}>
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Divider */}
              <div
                className="mb-5 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(0,99,196,0.4), transparent)",
                }}
              />

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: avatarGradients[index] }}
                >
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">
                    {testimonial.author}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#60a5fa" }}>
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
