import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section
      className="relative flex items-center overflow-hidden pt-20"
      style={{ background: "linear-gradient(135deg, #0a1628 0%, #0d1f3c 50%, #0a1628 100%)" }}
    >
      {/* Decorative blobs */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "rgba(0, 99, 196, 0.25)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "rgba(0, 99, 196, 0.15)" }}
      />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "rgba(0, 99, 196, 0.1)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-16 md:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="animate-fade-in-up">
            <Badge
              variant="outline"
              className="mb-6"
              style={{
                borderColor: "rgba(0, 99, 196, 0.5)",
                background: "rgba(0, 99, 196, 0.15)",
                color: "#60a5fa",
              }}
            >
              <Sparkles className="mr-1.5 h-3 w-3" />
              AI-Powered Career Counselling
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] text-balance text-white">
              Find the Right Career Path with{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg, #60a5fa, #0063c4)" }}
              >
                Expert Guidance
              </span>
            </h1>

            <p
              className="mt-6 text-lg md:text-xl leading-relaxed max-w-xl"
              style={{ color: "#94a3b8" }}
            >
              Connect with experienced career counselors who understand your
              goals. Get personalized advice to unlock your full professional
              potential.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="rounded-xl px-8 h-14 text-base font-semibold text-white transition-all group border-0"
                style={{
                  background: "linear-gradient(135deg, #0063c4, #004a93)",
                  boxShadow: "0 8px 32px rgba(0, 99, 196, 0.4)",
                }}
                asChild
              >
                <Link href="/login">
                  Book a Session
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="rounded-xl px-8 h-14 text-base font-semibold text-white transition-all"
                style={{
                  borderColor: "rgba(0, 99, 196, 0.5)",
                  background: "rgba(0, 99, 196, 0.1)",
                }}
                asChild
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>

            {/* Social proof strip */}
            <div className="mt-10 flex items-center gap-6">
              <div className="flex -space-x-2">
                {["AM", "UT", "SR", "HA"].map((initials, i) => (
                  <div
                    key={initials}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 text-[10px] font-bold text-white"
                    style={{
                      borderColor: "#0a1628",
                      background: [
                        "linear-gradient(135deg, #0063c4, #004a93)",
                        "linear-gradient(135deg, #1d6fd4, #0063c4)",
                        "linear-gradient(135deg, #3b82f6, #0063c4)",
                        "linear-gradient(135deg, #60a5fa, #1d6fd4)",
                      ][i],
                    }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <p className="text-sm" style={{ color: "#64748b" }}>
                Trusted by{" "}
                <span className="font-semibold text-white">10,000+</span>{" "}
                students across Pakistan
              </p>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] animate-slide-in-right">
            <div
              className="absolute inset-0 rounded-2xl blur-xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,99,196,0.4), rgba(96,165,250,0.2))",
              }}
            />
            <div
              className="relative h-full w-full rounded-2xl p-[2px] shadow-2xl"
              style={{ background: "linear-gradient(135deg, #0063c4, #60a5fa)" }}
            >
              <img
                src="/hero.jpg"
                alt="Career Counselling"
                className="h-full w-full rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
