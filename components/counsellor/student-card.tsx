'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { BookOpen, Eye, TrendingUp } from 'lucide-react'

interface StudentCardProps {
  student: {
    id: string
    name: string
    educationLevel: string
    careerInterest: string
    sessionsTaken: number
  }
  onViewDetails: () => void
}

export function StudentCard({ student, onViewDetails }: StudentCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow border-border">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Student Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-foreground text-background text-sm font-semibold">
                  {student.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-foreground">{student.name}</p>
                <p className="text-xs text-muted-foreground">Student</p>
              </div>
            </div>
          </div>

          {/* Student Info */}
          <div className="space-y-2">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">EDUCATION LEVEL</p>
              <p className="text-sm text-foreground">{student.educationLevel}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">CAREER INTEREST</p>
              <p className="text-sm text-foreground">{student.careerInterest}</p>
            </div>
          </div>

          {/* Sessions Taken */}
          <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-3">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs font-medium text-muted-foreground">Sessions Completed</p>
              <p className="text-sm font-semibold text-foreground">{student.sessionsTaken}</p>
            </div>
          </div>

          {/* Actions */}
          <Button
            onClick={onViewDetails}
            className="w-full gap-2"
            variant="outline"
          >
            <Eye className="h-4 w-4" />
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
