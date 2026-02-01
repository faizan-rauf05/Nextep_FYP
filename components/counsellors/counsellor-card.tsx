"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Briefcase } from "lucide-react"
import Link from "next/link"

export interface CounsellorData {
  id: string
  name: string
  expertise: string
  bio: string
  experience: number
  rating: number
  reviewCount: number
  pricePerSession: number
  availableToday: boolean
  image: string | null
}

interface CounsellorCardProps {
  counsellor: CounsellorData
}

export function CounsellorCard({ counsellor }: CounsellorCardProps) {
  return (
    <div className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-foreground/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Image */}
      <div className="aspect-[4/3] bg-muted relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20" />
        
        {/* Profile placeholder with zoom effect */}
        <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
          <div className="w-24 h-24 rounded-full bg-secondary border-2 border-border flex items-center justify-center">
            <span className="text-3xl font-semibold text-muted-foreground">
              {counsellor.name.split(" ").map(n => n[0]).join("")}
            </span>
          </div>
        </div>

        {/* Availability Badge */}
        {counsellor.availableToday && (
          <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground border-0 rounded-full px-3 py-1 text-xs font-medium">
            Available Today
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Name & Expertise */}
        <h3 className="font-semibold text-foreground text-lg leading-tight">
          {counsellor.name}
        </h3>
        <p className="text-sm text-primary/80 font-medium mt-0.5">
          {counsellor.expertise}
        </p>

        {/* Bio */}
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
          {counsellor.bio}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 mt-4">
          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-foreground text-foreground" />
            <span className="font-semibold text-sm">{counsellor.rating}</span>
            <span className="text-xs text-muted-foreground">({counsellor.reviewCount})</span>
          </div>

          {/* Experience */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Briefcase className="h-3.5 w-3.5" />
            <span>{counsellor.experience}+ yrs</span>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-border">
          <div>
            <span className="text-lg font-bold text-foreground">${counsellor.pricePerSession}</span>
            <span className="text-sm text-muted-foreground"> / session</span>
          </div>
          <Button
            variant="outline"
            className="rounded-full px-5 font-medium group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300 bg-transparent"
            asChild
          >
            <Link href={`/counsellors/${counsellor.id}`}>View Profile</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
