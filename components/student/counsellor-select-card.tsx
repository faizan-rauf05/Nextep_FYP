'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star, MapPin, Briefcase, Users } from 'lucide-react'

interface CounsellorCardProps {
  counsellor: {
    id: string
    name: string
    photo?: string
    specialization: string
    experience: number
    rating: number
    totalReviews: number
    availability: string[]
    sessionPrice: number
    bio: string
  }
  isSelected: boolean
  onSelect: (id: string) => void
}

export function CounsellorCard({ counsellor, isSelected, onSelect }: CounsellorCardProps) {
  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-lg ${
        isSelected ? 'border-foreground ring-2 ring-foreground' : ''
      }`}
      onClick={() => onSelect(counsellor.id)}
    >
      <CardContent className="p-6">
        <div className="flex gap-4">
          {/* Avatar */}
          <Avatar className="h-16 w-16 flex-shrink-0">
            <AvatarImage src={counsellor.photo} alt={counsellor.name} />
            <AvatarFallback className="bg-background border border-border">
              {counsellor.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-semibold text-foreground">{counsellor.name}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                  <Briefcase className="h-3.5 w-3.5" />
                  {counsellor.specialization}
                </p>
              </div>
              <Badge variant="outline" className="whitespace-nowrap">
                Rs. {counsellor.sessionPrice}/session
              </Badge>
            </div>

            {/* Rating and Experience */}
            <div className="flex items-center gap-4 mb-3 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{counsellor.rating.toFixed(1)}</span>
                <span className="text-muted-foreground">({counsellor.totalReviews})</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{counsellor.experience}+ years</span>
              </div>
            </div>

            {/* Bio */}
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {counsellor.bio}
            </p>

            {/* Availability */}
            <div className="flex flex-wrap gap-2 mb-3">
              {counsellor.availability.slice(0, 3).map((slot) => (
                <Badge key={slot} variant="secondary" className="text-xs">
                  {slot}
                </Badge>
              ))}
              {counsellor.availability.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{counsellor.availability.length - 3} more
                </Badge>
              )}
            </div>

            {/* Selection Indicator */}
            {isSelected && (
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <span className="text-sm font-medium text-foreground">Selected</span>
                <div className="h-2 w-2 rounded-full bg-foreground" />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
