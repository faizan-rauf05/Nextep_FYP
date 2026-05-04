import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex items-center pt-20 overflow-hidden bg-gradient-to-br from-background via-secondary/30 to-background">
      {/* Subtle background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 md:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1] text-balance">
              Find the Right Career Path with{" "}
              <span className="text-primary">Expert Guidance</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
              Connect with experienced career counselors who understand your
              goals. Get personalized advice to unlock your full professional
              potential.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="rounded-xl px-8 h-14 text-base font-semibold group shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
                asChild
              >
                <Link href="/login">
                  Book Session
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-xl px-8 h-14 text-base font-semibold border-2 hover:bg-secondary transition-all"
                asChild
              ></Button>
            </div>

          </div>

          {/* Right Side - Image Placeholder */}
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] animate-slide-in-right">
            <img src="/hero.jpg" alt="Hero" style={{ borderRadius: "10px" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
