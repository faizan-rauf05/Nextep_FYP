import { Cpu, Stethoscope, Briefcase, Code, Palette, GraduationCap } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    title: "Engineering",
    icon: Cpu,
    description: "Mechanical, Civil, Electrical & more",
  },
  {
    title: "Medical",
    icon: Stethoscope,
    description: "Healthcare, Nursing, Pharmacy",
  },
  {
    title: "Business",
    icon: Briefcase,
    description: "Management, Finance, Marketing",
  },
  {
    title: "IT & Software",
    icon: Code,
    description: "Development, Data Science, AI",
  },
  {
    title: "Creative Arts",
    icon: Palette,
    description: "Design, Media, Entertainment",
  },
  {
    title: "Education",
    icon: GraduationCap,
    description: "Teaching, Research, Academia",
  },
];

export function CareerCategories() {
  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: "linear-gradient(135deg, #0a1628 0%, #0d1f3c 50%, #0a1628 100%)" }}
    >
      {/* Decorative blobs */}
      <div
        className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "rgba(0, 99, 196, 0.2)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full blur-3xl"
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
            Explore Fields
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Career{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, #60a5fa, #0063c4)" }}
            >
              Categories
            </span>
          </h2>
          <p className="mt-4 text-lg" style={{ color: "#94a3b8" }}>
            Find expert counsellors across various industries and career paths
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.title}
              href="/counsellors"
              className="group relative rounded-2xl p-6 overflow-hidden transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(0, 99, 196, 0.25)",
                backdropFilter: "blur(8px)",
              }}
              
            >
              <div className="relative flex items-start gap-4">
                {/* Icon box */}
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: "linear-gradient(135deg, rgba(0,99,196,0.3), rgba(0,74,147,0.2))",
                    border: "1px solid rgba(0, 99, 196, 0.4)",
                  }}
                >
                  <category.icon className="w-8 h-8" style={{ color: "#60a5fa" }} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white transition-colors duration-200 group-hover:text-blue-400">
                    {category.title}
                  </h3>
                  <p className="text-sm mt-1" style={{ color: "#94a3b8" }}>
                    {category.description}
                  </p>

                  {/* Explore arrow */}
                  <div
                    className="mt-3 flex items-center text-sm font-medium opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-300"
                    style={{ color: "#60a5fa" }}
                  >
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
  );
}
