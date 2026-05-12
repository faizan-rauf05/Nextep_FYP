import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTA() {
  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{
        background:
          "linear-gradient(135deg, #0a1628 0%, #0d1f3c 50%, #0a1628 100%)",
      }}
    >
      {/* Outer blobs */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "rgba(0, 99, 196, 0.2)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "rgba(0, 99, 196, 0.15)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Card */}
        <div
          className="relative rounded-3xl overflow-hidden p-[1px]"
          style={{
            background: "linear-gradient(135deg, #0063c4, rgba(0,99,196,0.2))",
          }}
        >
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,99,196,0.15) 0%, rgba(0,30,80,0.6) 100%)",
              backdropFilter: "blur(12px)",
            }}
          >
            {/* Inner glow blobs */}
            <div
              className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full blur-3xl"
              style={{ background: "rgba(0, 99, 196, 0.3)" }}
            />
            <div
              className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full blur-3xl"
              style={{ background: "rgba(96, 165, 250, 0.15)" }}
            />

            {/* Subtle dot pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(96,165,250,0.6) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />

            {/* Content */}
            <div className="relative px-8 py-20 md:py-28 flex flex-col lg:flex-row items-center gap-12">
              {/* Left - Image */}
              <div className="hidden lg:block w-1/3 flex-shrink-0">
                <div
                  className="relative aspect-square rounded-2xl overflow-hidden p-[1px]"
                  style={{
                    background:
                      "linear-gradient(135deg, #0063c4, rgba(96,165,250,0.4))",
                  }}
                >
                  <div className="relative h-full w-full rounded-2xl overflow-hidden">
                    <img
                      src="/cta.jpg"
                      alt="Career Growth"
                      className="w-full h-full object-cover"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(0,99,196,0.5), transparent)",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Right - Text */}
              <div className="flex-1 text-center lg:text-left">
                {/* Badge */}
                <span
                  className="inline-block mb-5 px-4 py-1 rounded-full text-sm font-medium"
                  style={{
                    background: "rgba(0, 99, 196, 0.25)",
                    border: "1px solid rgba(0, 99, 196, 0.6)",
                    color: "#60a5fa",
                  }}
                >
                  <Sparkles className="inline-block mr-1.5 h-3 w-3" />
                  Start Today — It&apos;s Free
                </span>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white max-w-xl text-balance leading-tight">
                  Ready to Take the Next Step in Your{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, #60a5fa, #0063c4)",
                    }}
                  >
                    Career?
                  </span>
                </h2>

                <p
                  className="mt-6 text-lg max-w-lg"
                  style={{ color: "#94a3b8" }}
                >
                  Join thousands of professionals who have found clarity and
                  direction with PathFinder. Start your journey today.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button
                    size="lg"
                    className="rounded-xl px-8 h-14 text-base font-semibold text-white transition-all group border-0"
                    style={{
                      background: "linear-gradient(135deg, #0063c4, #004a93)",
                      boxShadow: "0 8px 32px rgba(0, 99, 196, 0.45)",
                    }}
                    asChild
                  >
                    <Link href="/signup">
                      Get Started Free
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>

                  
                </div>

                {/* Trust strip */}
                <p className="mt-8 text-sm" style={{ color: "#ffffff" }}>
                  No credit card required &nbsp;·&nbsp; Cancel anytime
                  &nbsp;·&nbsp; 10,000+ students guided
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
