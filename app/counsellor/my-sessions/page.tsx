'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { SessionRow } from '@/components/counsellor/session-row'
import { SessionDetailModal } from '@/components/counsellor/session-detail-modal'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Search, Calendar } from 'lucide-react'

interface Session {
  id: string
  studentName: string
  studentEmail: string
  date: Date
  time: string
  sessionType: string
  duration: string
  status: 'upcoming' | 'completed' | 'cancelled'
  notes?: string
  joinLink?: string
}

// Mock data
const MOCK_SESSIONS: Session[] = [
  {
    id: '1',
    studentName: 'Ahmed Khan',
    studentEmail: 'ahmed@example.com',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    time: '10:00 AM',
    sessionType: 'Career Guidance',
    duration: '30 mins',
    status: 'upcoming',
    joinLink: 'https://meet.example.com/session-1',
  },
  {
    id: '2',
    studentName: 'Fatima Ali',
    studentEmail: 'fatima@example.com',
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    time: '2:00 PM',
    sessionType: 'Interview Preparation',
    duration: '45 mins',
    status: 'upcoming',
    joinLink: 'https://meet.example.com/session-2',
  },
  {
    id: '3',
    studentName: 'Hassan Ali',
    studentEmail: 'hassan@example.com',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    time: '11:00 AM',
    sessionType: 'Resume Review',
    duration: '30 mins',
    status: 'completed',
    notes: 'Discussed resume structure, highlighted strong project descriptions, suggested portfolio improvements. Student is well-prepared and proactive.',
  },
  {
    id: '4',
    studentName: 'Zainab Hassan',
    studentEmail: 'zainab@example.com',
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    time: '3:30 PM',
    sessionType: 'Career Assessment',
    duration: '60 mins',
    status: 'completed',
    notes: 'Completed career assessment. Student shows strong aptitude for management roles. Discussed three potential career paths aligned with interests.',
  },
  {
    id: '5',
    studentName: 'Sara Khan',
    studentEmail: 'sara@example.com',
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    time: '9:00 AM',
    sessionType: 'Career Guidance',
    duration: '30 mins',
    status: 'cancelled',
  },
]

type FilterStatus = 'all' | 'upcoming' | 'completed' | 'cancelled'

export default function CounsellorMySessionsPage() {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSession, setSelectedSession] = useState<Session | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const filteredSessions = useMemo(() => {
    let sessions = MOCK_SESSIONS

    if (filterStatus !== 'all') {
      sessions = sessions.filter((s) => s.status === filterStatus)
    }

    if (searchQuery) {
      sessions = sessions.filter((s) =>
        s.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.studentEmail.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return sessions
  }, [filterStatus, searchQuery])

  const upcomingSessions = MOCK_SESSIONS.filter((s) => s.status === 'upcoming').length
  const completedSessions = MOCK_SESSIONS.filter((s) => s.status === 'completed').length

  const sortedSessions = [...filteredSessions].sort((a, b) => {
    if (a.status === 'upcoming' && b.status !== 'upcoming') return -1
    if (a.status !== 'upcoming' && b.status === 'upcoming') return 1
    return b.date.getTime() - a.date.getTime()
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">My Sessions</h1>
        <p className="text-muted-foreground">
          Manage and view details of all your counseling sessions
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-muted/50 border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Upcoming Sessions</p>
                <p className="text-2xl font-bold text-foreground">{upcomingSessions}</p>
              </div>
              <Calendar className="h-8 w-8 text-muted-foreground opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/50 border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Completed Sessions</p>
                <p className="text-2xl font-bold text-foreground">{completedSessions}</p>
              </div>
              <Calendar className="h-8 w-8 text-muted-foreground opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sessions Table */}
      <Card className="border-border">
        <CardHeader className="border-b border-border">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Session List</CardTitle>
          </div>
          <div className="mt-4 flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by student name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Tabs
            value={filterStatus}
            onValueChange={(value) => setFilterStatus(value as FilterStatus)}
            className="w-full"
          >
            <div className="border-b border-border px-6 pt-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Sessions</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              {sortedSessions.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Session Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedSessions.map((session) => (
                        <SessionRow
                          key={session.id}
                          session={session}
                          onViewDetails={() => {
                            setSelectedSession(session)
                            setModalOpen(true)
                          }}
                        />
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <p className="text-muted-foreground">No sessions found.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="upcoming" className="mt-0">
              {sortedSessions.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Session Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedSessions.map((session) => (
                        <SessionRow
                          key={session.id}
                          session={session}
                          onViewDetails={() => {
                            setSelectedSession(session)
                            setModalOpen(true)
                          }}
                        />
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <p className="text-muted-foreground">No upcoming sessions.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="completed" className="mt-0">
              {sortedSessions.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Session Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedSessions.map((session) => (
                        <SessionRow
                          key={session.id}
                          session={session}
                          onViewDetails={() => {
                            setSelectedSession(session)
                            setModalOpen(true)
                          }}
                        />
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <p className="text-muted-foreground">No completed sessions.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="cancelled" className="mt-0">
              {sortedSessions.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Session Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedSessions.map((session) => (
                        <SessionRow
                          key={session.id}
                          session={session}
                          onViewDetails={() => {
                            setSelectedSession(session)
                            setModalOpen(true)
                          }}
                        />
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <p className="text-muted-foreground">No cancelled sessions.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Session Detail Modal */}
      {selectedSession && (
        <SessionDetailModal
          session={selectedSession}
          open={modalOpen}
          onOpenChange={setModalOpen}
        />
      )}
    </div>
  )
}
