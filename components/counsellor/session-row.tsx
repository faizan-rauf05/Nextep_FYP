'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { Calendar, Clock, Eye, Video } from 'lucide-react'
import { format } from 'date-fns'

interface SessionRowProps {
  session: {
    id: string
    studentName: string
    date: Date
    time: string
    sessionType: string
    status: 'upcoming' | 'completed' | 'cancelled'
    joinLink?: string
  }
  onViewDetails: () => void
}

export function SessionRow({ session, onViewDetails }: SessionRowProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge className="bg-blue-100 text-blue-800">Upcoming</Badge>
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
      default:
        return null
    }
  }

  return (
    <TableRow className="hover:bg-muted/50 transition-colors">
      <TableCell className="font-medium text-foreground">{session.studentName}</TableCell>
      <TableCell className="text-muted-foreground text-sm">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          {format(session.date, 'MMM dd, yyyy')}
        </div>
      </TableCell>
      <TableCell className="text-muted-foreground text-sm">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          {session.time}
        </div>
      </TableCell>
      <TableCell className="text-muted-foreground text-sm">{session.sessionType}</TableCell>
      <TableCell>{getStatusBadge(session.status)}</TableCell>
      <TableCell>
        <div className="flex gap-2">
          {session.status === 'upcoming' && session.joinLink && (
            <Button size="sm" className="gap-2" asChild>
              <a href={session.joinLink} target="_blank" rel="noopener noreferrer">
                <Video className="h-4 w-4" />
                Join
              </a>
            </Button>
          )}
          <Button size="sm" variant="outline" onClick={onViewDetails} className="gap-2">
            <Eye className="h-4 w-4" />
            View Notes
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}
