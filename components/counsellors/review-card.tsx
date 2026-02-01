"use client"

import { Star } from "lucide-react"

interface Review {
  id: string
  author: string
  rating: number
  date: string
  content: string
  helpful: number
}

interface ReviewCardProps {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="py-6 first:pt-0 border-b border-border last:border-0">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <span className="text-sm font-semibold text-muted-foreground">
              {review.author.split(" ").map(n => n[0]).join("")}
            </span>
          </div>
          <div>
            <p className="font-medium text-foreground">{review.author}</p>
            <p className="text-sm text-muted-foreground">{review.date}</p>
          </div>
        </div>
        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < review.rating
                  ? "fill-foreground text-foreground"
                  : "fill-muted text-muted"
              }`}
            />
          ))}
        </div>
      </div>
      <p className="text-foreground leading-relaxed">{review.content}</p>
      {review.helpful > 0 && (
        <p className="text-sm text-muted-foreground mt-3">
          {review.helpful} people found this helpful
        </p>
      )}
    </div>
  )
}

interface RatingBreakdownProps {
  ratings: { stars: number; count: number }[]
  totalReviews: number
  averageRating: number
}

export function RatingBreakdown({ ratings, totalReviews, averageRating }: RatingBreakdownProps) {
  const maxCount = Math.max(...ratings.map(r => r.count))

  return (
    <div className="bg-muted rounded-2xl p-6 mb-6">
      <div className="flex items-center gap-6">
        {/* Average Rating */}
        <div className="text-center">
          <p className="text-5xl font-bold text-foreground">{averageRating}</p>
          <div className="flex items-center justify-center gap-0.5 my-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.round(averageRating)
                    ? "fill-foreground text-foreground"
                    : "fill-muted-foreground/30 text-muted-foreground/30"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">{totalReviews} reviews</p>
        </div>

        {/* Breakdown Bars */}
        <div className="flex-1 space-y-2">
          {ratings.map((rating) => (
            <div key={rating.stars} className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground w-3">{rating.stars}</span>
              <Star className="h-3 w-3 fill-foreground text-foreground" />
              <div className="flex-1 h-2 bg-background rounded-full overflow-hidden">
                <div
                  className="h-full bg-foreground rounded-full transition-all duration-500"
                  style={{ width: `${(rating.count / maxCount) * 100}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground w-8 text-right">{rating.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
