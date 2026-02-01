import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Star, ArrowRight } from "lucide-react"

const counsellors = [
  {
    name: "Dr. Sarah Chen",
    specialization: "Tech Industry & Leadership",
    rating: 4.9,
    sessions: 342,
    image: null
  },
  {
    name: "Michael Roberts",
    specialization: "Finance & Consulting",
    rating: 4.8,
    sessions: 256,
    image: null
  },
  {
    name: "Emma Williams",
    specialization: "Creative Industries",
    rating: 4.9,
    sessions: 198,
    image: null
  },
  {
    name: "James Anderson",
    specialization: "Healthcare & Medicine",
    rating: 4.7,
    sessions: 287,
    image: null
  }
]

export function Counsellors() {
  return (
    <section id="counsellors" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 md:mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Featured Counsellors
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl">
              Connect with industry experts who have helped thousands achieve their career goals.
            </p>
          </div>
          <Button variant="outline" className="rounded-full self-start md:self-auto bg-transparent" asChild>
            <Link href="/counsellors">
              View All Counsellors
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Counsellors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {counsellors.map((counsellor) => (
            <div 
              key={counsellor.name}
              className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-foreground/20 transition-all duration-300 hover:shadow-xl"
            >
              {/* Image Placeholder */}
              <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-muted/50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-secondary border-2 border-border" />
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-semibold text-foreground text-lg">
                  {counsellor.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {counsellor.specialization}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 mt-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-foreground text-foreground" />
                    <span className="font-medium">{counsellor.rating}</span>
                  </div>
                  <span className="text-muted-foreground">
                    {counsellor.sessions} sessions
                  </span>
                </div>

                {/* Button */}
                <Button 
                  variant="outline" 
                  className="w-full mt-4 rounded-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300 bg-transparent"
                >
                  View Profile
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
