'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SessionCard } from '@/components/student/session-card'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'

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

// Mock data for sessions
const MOCK_SESSIONS: Session[] = [
  {
    id: '1',
    counsellorName: 'Dr. Sarah Ahmed',
    counsellorPhoto: '/api/placeholder/48/48',
    counsellorSpecialization: 'Career Strategy & Leadership',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    time: '10:00 AM',
    sessionType: 'Career Guidance',
    duration: '30 mins',
    status: 'upcoming',
    joinLink: 'https://meet.example.com/session-1',
  },
  {
    id: '2',
    counsellorName: 'Ms. Fatima Hassan',
    counsellorPhoto: '/api/placeholder/48/48',
    counsellorSpecialization: 'Career Assessment & Planning',
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    time: '2:00 PM',
    sessionType: 'Interview Preparation',
    duration: '45 mins',
    status: 'upcoming',
    joinLink: 'https://meet.example.com/session-2',
  },
  {
    id: '3',
    counsellorName: 'Md. Hassan Khan',
    counsellorPhoto: '/api/placeholder/48/48',
    counsellorSpecialization: 'Technical Roles & Startups',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    time: '11:00 AM',
    sessionType: 'Resume Review',
    duration: '30 mins',
    status: 'completed',
    notes: 'Great resume structure! Consider adding more quantifiable achievements in your project descriptions. Your technical skills section looks solid. We discussed potential improvements for the portfolio section and how to better highlight your leadership experience.',
    feedback: {
      rating: 5,
      comment: 'Excellent guidance and very helpful feedback on my resume. Dr. Hassan was attentive and provided actionable insights.',
    },
  },
  {
    id: '4',
    counsellorName: 'Dr. Ahmed Ali',
    counsellorPhoto: '/api/placeholder/48/48',
    counsellorSpecialization: 'MBA & Advanced Careers',
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
    time: '3:30 PM',
    sessionType: 'Career Assessment',
    duration: '60 mins',
    status: 'completed',
    notes: 'Your assessment results indicate strong aptitude for management roles. We identified three potential career paths aligned with your interests and strengths. Action items: 1) Complete the online certifications we discussed, 2) Network with 5 professionals in your target roles, 3) Prepare for informational interviews.',
  },
  {
    id: '5',
    counsellorName: 'Dr. Sarah Ahmed',
    counsellorPhoto: '/api/placeholder/48/48',
    counsellorSpecialization: 'Career Strategy & Leadership',
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    time: '9:00 AM',
    sessionType: 'Career Guidance',
    duration: '30 mins',
    status: 'cancelled',
  },
]

type FilterStatus = 'all' | 'upcoming' | 'completed' | 'cancelled'

export default function MySessionsPage() {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all')

  const filteredSessions = useMemo(() => {
    if (filterStatus === 'all') {
      return MOCK_SESSIONS
    }
    return MOCK_SESSIONS.filter((session) => session.status === filterStatus)
  }, [filterStatus])

  const upcomingSessions = MOCK_SESSIONS.filter(
    (s) => s.status === 'upcoming'
  ).length
  const completedSessions = MOCK_SESSIONS.filter(
    (s) => s.status === 'completed'
  ).length

  // Sort sessions by date (upcoming first, then by date descending)
  const sortedSessions = [...filteredSessions].sort((a, b) => {
    if (a.status === 'upcoming' && b.status !== 'upcoming') return -1
    if (a.status !== 'upcoming' && b.status === 'upcoming') return 1
    return b.date.getTime() - a.date.getTime()
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">My Sessions</h1>
          <p className="text-muted-foreground">
            Manage your past and upcoming counseling sessions
          </p>
        </div>
        <Button asChild>
          <Link href="/student/book-session" className="gap-2">
            <Calendar className="h-4 w-4" />
            Book New Session
          </Link>
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-muted/50 border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Upcoming Sessions
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {upcomingSessions}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-muted-foreground opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/50 border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Completed Sessions
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {completedSessions}
                </p>
              </div>
              <Clock className="h-8 w-8 text-muted-foreground opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sessions Tabs */}
      <Card className="border-border">
        <CardHeader className="border-b border-border">
          <CardTitle className="text-lg">Session History</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs
            value={filterStatus}
            onValueChange={(value) => setFilterStatus(value as FilterStatus)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>

            {/* All Sessions */}
            <TabsContent value="all" className="space-y-4 mt-6">
              {sortedSessions.length > 0 ? (
                <div className="space-y-4">
                  {sortedSessions.map((session) => (
                    <SessionCard key={session.id} session={session} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <p className="text-muted-foreground mb-4">
                    No sessions yet. Book your first session to get started!
                  </p>
                  <Button asChild>
                    <Link href="/student/book-session" className="gap-2">
                      Book a Session
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Upcoming Sessions */}
            <TabsContent value="upcoming" className="space-y-4 mt-6">
              {sortedSessions.length > 0 ? (
                <div className="space-y-4">
                  {sortedSessions.map((session) => (
                    <SessionCard key={session.id} session={session} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <p className="text-muted-foreground mb-4">
                    No upcoming sessions. Let's book one!
                  </p>
                  <Button asChild>
                    <Link href="/student/book-session" className="gap-2">
                      Book a Session
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Completed Sessions */}
            <TabsContent value="completed" className="space-y-4 mt-6">
              {sortedSessions.length > 0 ? (
                <div className="space-y-4">
                  {sortedSessions.map((session) => (
                    <SessionCard key={session.id} session={session} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <p className="text-muted-foreground">
                    No completed sessions yet. Your completed sessions will appear here.
                  </p>
                </div>
              )}
            </TabsContent>

            {/* Cancelled Sessions */}
            <TabsContent value="cancelled" className="space-y-4 mt-6">
              {sortedSessions.length > 0 ? (
                <div className="space-y-4">
                  {sortedSessions.map((session) => (
                    <SessionCard key={session.id} session={session} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <p className="text-muted-foreground">
                    No cancelled sessions. All your sessions are active!
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
