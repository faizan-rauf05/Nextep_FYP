"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { BookingPanel } from "@/components/counsellors/booking-panel"
import { ReviewCard, RatingBreakdown } from "@/components/counsellors/review-card"
import { RelatedCounsellors } from "@/components/counsellors/related-counsellors"
import {
  Star,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  ArrowLeft,
  Calendar,
  MessageSquare,
  Globe,
  Linkedin,
} from "lucide-react"

// Mock data
const counsellorData = {
  id: "1",
  name: "Dr. Sarah Mitchell",
  headline: "Executive Career Coach & Leadership Development Specialist",
  expertise: "Tech & Leadership",
  bio: `With over 15 years of experience in career counseling and executive coaching, I've helped thousands of professionals navigate their career journeys. My approach combines data-driven insights with personalized mentoring to help you achieve your professional goals.

I specialize in career transitions, particularly for professionals moving into leadership roles or switching to the tech industry. My methodology focuses on identifying your unique strengths, building confidence, and creating actionable roadmaps for success.

Whether you're a recent graduate looking to launch your career or an experienced professional seeking a meaningful change, I'm here to guide you every step of the way.`,
  location: "San Francisco, CA",
  experience: 15,
  rating: 4.9,
  reviewCount: 248,
  pricePerSession: 150,
  responseTime: "2 hours",
  sessionsCompleted: 1240,
  skills: [
    "Career Transitions",
    "Executive Coaching",
    "Leadership Development",
    "Tech Industry",
    "Interview Preparation",
    "Resume Building",
    "Salary Negotiation",
    "Personal Branding",
  ],
  education: [
    { degree: "Ph.D. in Organizational Psychology", school: "Stanford University" },
    { degree: "MBA", school: "Harvard Business School" },
    { degree: "B.A. in Psychology", school: "UC Berkeley" },
  ],
  certifications: [
    "Certified Professional Career Coach (CPCC)",
    "ICF Professional Certified Coach (PCC)",
    "SHRM Senior Certified Professional",
  ],
  industries: ["Technology", "Finance", "Healthcare", "Consulting", "Startups"],
}

const reviews = [
  {
    id: "1",
    author: "Michael Chen",
    rating: 5,
    date: "December 2025",
    content: "Dr. Mitchell's guidance was invaluable during my career transition from finance to tech. Her structured approach and deep industry knowledge helped me land my dream role at a top tech company. Highly recommend for anyone considering a career change.",
    helpful: 24,
  },
  {
    id: "2",
    author: "Emily Rodriguez",
    rating: 5,
    date: "November 2025",
    content: "The mock interview sessions were incredibly helpful. Sarah provided detailed feedback and helped me identify areas for improvement. I felt so much more confident going into my actual interviews.",
    helpful: 18,
  },
  {
    id: "3",
    author: "David Park",
    rating: 4,
    date: "October 2025",
    content: "Great insights on salary negotiation strategies. I was able to negotiate a 25% higher offer thanks to the techniques Sarah taught me. Worth every penny.",
    helpful: 12,
  },
]

const ratingBreakdown = [
  { stars: 5, count: 198 },
  { stars: 4, count: 35 },
  { stars: 3, count: 10 },
  { stars: 2, count: 3 },
  { stars: 1, count: 2 },
]

const relatedCounsellors = [
  { id: "2", name: "James Wilson", expertise: "Tech Careers", rating: 4.8, pricePerSession: 120 },
  { id: "3", name: "Lisa Chen", expertise: "Leadership Coaching", rating: 4.9, pricePerSession: 175 },
  { id: "4", name: "Robert Taylor", expertise: "Career Transitions", rating: 4.7, pricePerSession: 100 },
]

function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back button skeleton */}
        <Skeleton className="h-10 w-32 rounded-full mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile header skeleton */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <Skeleton className="w-32 h-32 rounded-2xl" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-5 w-full max-w-md" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-24 rounded-full" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                  </div>
                  <div className="flex gap-4">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                </div>
              </div>
            </div>

            {/* Skills skeleton */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="flex flex-wrap gap-2">
                {[...Array(8)].map((_, i) => (
                  <Skeleton key={i} className="h-8 w-28 rounded-full" />
                ))}
              </div>
            </div>

            {/* About skeleton */}
            <div className="bg-card rounded-2xl border border-border p-6 space-y-3">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>

          {/* Right column skeleton */}
          <div>
            <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-11 w-full rounded-xl" />
              <Skeleton className="h-64 w-full rounded-xl" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CounsellorProfilePage() {
  const params = useParams()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <ProfileSkeleton />
  }

  const counsellor = counsellorData

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-8 rounded-full -ml-2 text-muted-foreground hover:text-foreground"
          asChild
        >
          <Link href="/counsellors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Counsellors
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Profile Image */}
                <div className="w-32 h-32 rounded-2xl bg-secondary flex items-center justify-center flex-shrink-0">
                  <span className="text-4xl font-bold text-muted-foreground">
                    {counsellor.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                        {counsellor.name}
                      </h1>
                      <p className="text-muted-foreground mt-1 max-w-lg">
                        {counsellor.headline}
                      </p>
                    </div>
                    {/* Social Links */}
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" className="rounded-full bg-transparent">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-full bg-transparent">
                        <Globe className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="secondary" className="rounded-full px-3 py-1">
                      {counsellor.expertise}
                    </Badge>
                    <Badge variant="outline" className="rounded-full px-3 py-1">
                      Top Rated
                    </Badge>
                  </div>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5 text-sm">
                    <div className="flex items-center gap-1.5">
                      <Star className="h-4 w-4 fill-foreground text-foreground" />
                      <span className="font-semibold">{counsellor.rating}</span>
                      <span className="text-muted-foreground">({counsellor.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{counsellor.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Briefcase className="h-4 w-4" />
                      <span>{counsellor.experience}+ years experience</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{counsellor.sessionsCompleted.toLocaleString()} sessions</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills & Expertise */}
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Skills & Expertise
              </h2>
              <div className="flex flex-wrap gap-2">
                {counsellor.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="rounded-full px-4 py-2 text-sm font-medium hover:bg-secondary/80 transition-colors cursor-default"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* About */}
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                About
              </h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                {counsellor.bio.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="text-foreground leading-relaxed mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Education & Certifications */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Education */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="h-5 w-5 text-foreground" />
                  <h2 className="text-lg font-semibold text-foreground">Education</h2>
                </div>
                <div className="space-y-4">
                  {counsellor.education.map((edu, i) => (
                    <div key={i}>
                      <p className="font-medium text-foreground">{edu.degree}</p>
                      <p className="text-sm text-muted-foreground">{edu.school}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="h-5 w-5 text-foreground" />
                  <h2 className="text-lg font-semibold text-foreground">Certifications</h2>
                </div>
                <div className="space-y-3">
                  {counsellor.certifications.map((cert, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 flex-shrink-0" />
                      <p className="text-foreground">{cert}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Industries */}
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Industries Served
              </h2>
              <div className="flex flex-wrap gap-2">
                {counsellor.industries.map((industry) => (
                  <Badge
                    key={industry}
                    variant="outline"
                    className="rounded-full px-4 py-2 text-sm font-medium"
                  >
                    {industry}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-foreground" />
                  <h2 className="text-lg font-semibold text-foreground">Reviews</h2>
                </div>
                <Button variant="outline" className="rounded-full bg-transparent">
                  Write a Review
                </Button>
              </div>

              {/* Rating Breakdown */}
              <RatingBreakdown
                ratings={ratingBreakdown}
                totalReviews={counsellor.reviewCount}
                averageRating={counsellor.rating}
              />

              {/* Reviews List */}
              <div>
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>

              {/* Load More */}
              <Button variant="outline" className="w-full mt-6 rounded-xl bg-transparent">
                Load More Reviews
              </Button>
            </div>

            {/* Related Counsellors */}
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
              <RelatedCounsellors counsellors={relatedCounsellors} />
            </div>
          </div>

          {/* Right Column - Booking Panel (Sticky) */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8">
              <BookingPanel
                pricePerSession={counsellor.pricePerSession}
                counsellorName={counsellor.name}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Fixed CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border lg:hidden">
        <div className="flex items-center justify-between gap-4 max-w-lg mx-auto">
          <div>
            <p className="text-lg font-bold text-foreground">${counsellor.pricePerSession}</p>
            <p className="text-sm text-muted-foreground">per session</p>
          </div>
          <Button className="flex-1 h-12 rounded-xl font-semibold">
            Book Session
          </Button>
        </div>
      </div>
    </div>
  )
}
