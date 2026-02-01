"use client"

import { Star } from "lucide-react"
import Link from "next/link"

interface RelatedCounsellor {
  id: string
  name: string
  expertise: string
  rating: number
  pricePerSession: number
}

interface RelatedCounsellorsProps {
  counsellors: RelatedCounsellor[]
}

export function RelatedCounsellors({ counsellors }: RelatedCounsellorsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Related Counsellors</h3>
      <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3">
        {counsellors.map((counsellor) => (
          <Link
            key={counsellor.id}
            href={`/counsellors/${counsellor.id}`}
            className="group flex-shrink-0 w-64 md:w-auto bg-card rounded-xl border border-border p-4 hover:border-foreground/20 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <span className="text-sm font-semibold text-muted-foreground">
                  {counsellor.name.split(" ").map(n => n[0]).join("")}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{counsellor.name}</p>
                <p className="text-sm text-muted-foreground truncate">{counsellor.expertise}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
              <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-foreground text-foreground" />
                <span className="text-sm font-medium">{counsellor.rating}</span>
              </div>
              <span className="text-sm font-semibold text-foreground">${counsellor.pricePerSession}/hr</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
