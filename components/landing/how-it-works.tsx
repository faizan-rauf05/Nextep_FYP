import Image from "next/image";

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
      className="relative overflow-hidden mt-8 pb-24 md:py-32"
      style={{ background: "linear-gradient(135deg, #0a1628 0%, #0d1f3c 50%, #0a1628 100%)" }}
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
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span
            className="inline-block mb-4 px-4 py-1 rounded-full text-sm font-medium"
            style={{
              borderColor: "rgba(0, 99, 196, 0.5)",
              background: "rgba(0, 99, 196, 0.15)",
              color: "#60a5fa",
              border: "1px solid rgba(0, 99, 196, 0.5)",
            }}
          >
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            How It{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, #60a5fa, #0063c4)" }}
            >
              Works
            </span>
          </h2>
          <p className="mt-4 text-lg" style={{ color: "#94a3b8" }}>
            Your journey to career success in four simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <div key={item.step} className="group relative">
              {/* Card */}
              <div
                className="relative rounded-2xl p-6 h-full transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(0, 99, 196, 0.25)",
                  backdropFilter: "blur(8px)",
                }}
                
              >
                {/* Step Badge */}
                <div
                  className="absolute -top-3 left-6 px-3 py-1 text-xs font-bold rounded-full text-white"
                  style={{
                    background: "linear-gradient(135deg, #0063c4, #004a93)",
                    boxShadow: "0 4px 12px rgba(0, 99, 196, 0.4)",
                  }}
                >
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
                  {/* gradient ring overlay */}
                  <div
                    className="absolute inset-0 opacity-40 group-hover:opacity-20 transition-opacity duration-300"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,99,196,0.7), transparent)",
                    }}
                  />
                </div>

                {/* Content */}
                <h3
                  className="text-lg font-semibold mb-2 text-white transition-colors duration-200 group-hover:text-blue-400"
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
                  {item.description}
                </p>
              </div>

              {/* Arrow Connector */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-5 -translate-y-1/2 z-10 items-center justify-center h-8 w-8 rounded-full"
                  style={{ background: "rgba(0,99,196,0.2)", border: "1px solid rgba(0,99,196,0.4)" }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    style={{ color: "#60a5fa" }}
                  >
                    <path
                      stroke="currentColor"
                      strokeWidth="2.5"
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
  );
}
