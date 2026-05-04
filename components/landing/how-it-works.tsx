import Image from "next/image"

const steps = [
  {
    step: "01",
    title: "Browse Counsellors",
    description:
      "Explore our verified career experts filtered by industry, experience, and specialization.",
    image: "/h_1.jpg",
  },
  {
    step: "02",
    title: "Book a Session",
    description:
      "Choose a convenient time slot and book your personalized counseling session.",
    image: "/h_2.jpg",
  },
  {
    step: "03",
    title: "Get Expert Advice",
    description:
      "Connect via video call and receive actionable insights for your career growth.",
    image: "/h_3.jpg",
  },
  {
    step: "04",
    title: "Achieve Your Goals",
    description:
      "Follow your personalized roadmap and reach your career milestones with confidence.",
    image: "/h_4.jpg",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="pb-24 -mt-34 md:py-32 bg-gradient-to-b from-background to-secondary/30"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Your journey to career success in four simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <div key={item.step} className="group relative">
              {/* Card */}
              <div className="relative bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 h-full">
                
                {/* Step Badge */}
                <div className="absolute -top-3 left-6 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                  Step {item.step}
                </div>

                {/* Image */}
                <div className="aspect-square rounded-xl overflow-hidden mb-5 relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-30 transition-all" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Arrow Connector */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <svg
                    className="w-8 h-8 text-border"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
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