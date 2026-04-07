"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Star, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

type Counsellor = {
  _id: string
  firstName: string
  lastName: string
  specialization: string
  experience: number
  rating?: number
  image?: string
}

const fallbackCounsellors = [
  {
    _id: "1",
    firstName: "Sarah",
    lastName: "Johnson",
    specialization: "Tech & Engineering",
    experience: 8,
    rating: 4.9,
  },
  {
    _id: "2",
    firstName: "Michael",
    lastName: "Chen",
    specialization: "Business & Finance",
    experience: 12,
    rating: 4.8,
  },
  {
    _id: "3",
    firstName: "Emily",
    lastName: "Williams",
    specialization: "Healthcare",
    experience: 10,
    rating: 4.9,
  },
  {
    _id: "4",
    firstName: "David",
    lastName: "Kumar",
    specialization: "Creative Arts",
    experience: 6,
    rating: 4.7,
  },
]

export function Counsellors() {
  const [careerCounsellors, setCareerCounsellors] = useState<Counsellor[]>(fallbackCounsellors)

  useEffect(() => {
    getCareerCounsellors()
  }, [])

  const getCareerCounsellors = async () => {
    try {
      const res = await fetch("/api/counsellor/getcounsellor")
      const data = await res.json()
      if (data?.counsellors && data.counsellors.length > 0) {
        setCareerCounsellors(data.counsellors.slice(0, 4))
      }
    } catch {
      // Keep fallback data
    }
  }

  return (
    <section id="counsellors" className="py-24 md:py-32 bg-gradient-to-b from-secondary/30 to-background">
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
          <Button
            variant="outline"
            className="rounded-xl self-start md:self-auto border-2 hover:bg-secondary transition-all"
            asChild
          >
            <Link href="/counsellors">
              View All Counsellors
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Counsellors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {careerCounsellors.map((counsellor) => (
            <div
              key={counsellor._id}
              className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-xl"
            >
              {/* Image Placeholder */}
              <div className="aspect-[4/3] bg-gradient-to-br from-secondary to-muted overflow-hidden relative">
                {counsellor.image ? (
                  <img
                    src={counsellor.image}
                    alt={`${counsellor.firstName} ${counsellor.lastName}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <span className="text-2xl font-bold text-primary">
                        {counsellor.firstName[0]}{counsellor.lastName[0]}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">Profile Image</p>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">
                  {counsellor.firstName} {counsellor.lastName}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {counsellor.specialization}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 mt-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="font-medium text-foreground">
                      {counsellor.rating ?? "New"}
                    </span>
                  </div>
                  <span className="text-muted-foreground">
                    {counsellor.experience} years exp.
                  </span>
                </div>

                {/* Button */}
                <Button
                  variant="outline"
                  className="w-full mt-4 rounded-xl group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
                  asChild
                >
                  <Link href={`/counsellors/${counsellor._id}`}>
                    View Profile
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
