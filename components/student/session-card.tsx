'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Calendar, Clock, Video, Eye } from 'lucide-react'
import { SessionDetailModal } from './session-detail-modal'

interface Session {
  id: string
  counsellorName: string
  counsellorPhoto: string
  counsellorSpecialization: string
  date: Date
  time: string
  sessionType: string
  duration: string
  status: 'upcoming' | 'completed' | 'cancelled'
  notes?: string
  feedback?: {
    rating: number
    comment: string
  }
  joinLink?: string
}

interface SessionCardProps {
  session: Session
}

const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case 'upcoming':
      return 'default'
    case 'completed':
      return 'secondary'
    case 'cancelled':
      return 'destructive'
    default:
      return 'default'
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'upcoming':
      return 'Upcoming'
    case 'completed':
      return 'Completed'
    case 'cancelled':
      return 'Cancelled'
    default:
      return status
  }
}

export function SessionCard({ session }: SessionCardProps) {
  const [showDetail, setShowDetail] = useState(false)
  const formattedDate = session.date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <>
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex gap-4">
            {/* Counsellor Avatar */}
            <div className="flex-shrink-0">
              <Avatar className="h-12 w-12">
                <AvatarImage src={session.counsellorPhoto} />
                <AvatarFallback className="bg-muted">
                  {session.counsellorName
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Session Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <p className="font-semibold text-foreground">
                    {session.counsellorName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {session.counsellorSpecialization}
                  </p>
                </div>
                <Badge variant={getStatusBadgeColor(session.status) as any}>
                  {getStatusLabel(session.status)}
                </Badge>
              </div>

              <div className="space-y-1 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{session.time} • {session.duration}</span>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                {session.status === 'upcoming' && session.joinLink && (
                  <Button size="sm" className="gap-2">
                    <Video className="h-4 w-4" />
                    Join Session
                  </Button>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDetail(true)}
                  className="gap-2"
                >
                  <Eye className="h-4 w-4" />
                  {session.status === 'upcoming' ? 'View Details' : 'View Session'}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <SessionDetailModal
        session={session}
        open={showDetail}
        onOpenChange={setShowDetail}
      />
    </>
  )
}
