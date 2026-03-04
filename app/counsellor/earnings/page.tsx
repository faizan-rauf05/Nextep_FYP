'use client'

import { useState, useEffect, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableHeader, TableRow, TableHead } from '@/components/ui/table'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Search, Calendar } from 'lucide-react'
import { format } from 'date-fns'

interface Session {
  id: string
  studentName: string
  studentEmail: string
  date: Date
  time: string
  sessionType: string
  duration: string
  status: 'upcoming' | 'completed' | 'cancelled'
  totalAmount: number
}

type FilterStatus = 'all' | 'upcoming' | 'completed' | 'cancelled'

export default function CounsellorEarningsPage() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const storedUser = localStorage.getItem('user')
        if (!storedUser) return
        const userData = JSON.parse(storedUser)
        const counsellorId = userData.id || userData._id

        const res = await fetch(`/api/meetings/getCounsellorMeetings?counsellorId=${counsellorId}`)
        const data = await res.json()
        if (!res.ok) throw new Error(data.message)

        const formatted: Session[] = data.map((m: any) => ({
          id: m._id,
          studentName: `${m.student?.firstName || ''} ${m.student?.lastName || ''}`,
          studentEmail: m.student?.email || '',
          date: new Date(m.date),
          time: m.time,
          sessionType: m.sessionType,
          duration: m.sessionDuration,
          status: m.status === 'scheduled' ? 'upcoming' : m.status,
          totalAmount: m.totalAmount,
        }))

        setSessions(formatted)
      } catch (error) {
        console.error('Error fetching sessions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSessions()
  }, [])

  // Earnings Calculations
  const totalEarnings = useMemo(() => {
    return sessions
      .filter((s) => s.status === 'completed')
      .reduce((sum, s) => sum + s.totalAmount, 0)
  }, [sessions])

  const upcomingEarnings = useMemo(() => {
    return sessions
      .filter((s) => s.status === 'upcoming')
      .reduce((sum, s) => sum + s.totalAmount, 0)
  }, [sessions])

  const completedEarnings = useMemo(() => {
    return sessions
      .filter((s) => s.status === 'completed')
      .reduce((sum, s) => sum + s.totalAmount, 0)
  }, [sessions])

  // Filtering
  const filteredSessions = useMemo(() => {
    let filtered = sessions
    if (filterStatus !== 'all') {
      filtered = filtered.filter((s) => s.status === filterStatus)
    }
    if (searchQuery) {
      filtered = filtered.filter(
        (s) =>
          s.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.studentEmail.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    return filtered
  }, [sessions, filterStatus, searchQuery])

  // Sorting by upcoming first
  const sortedSessions = [...filteredSessions].sort((a, b) => {
    if (a.status === 'upcoming' && b.status !== 'upcoming') return -1
    if (a.status !== 'upcoming' && b.status === 'upcoming') return 1
    return b.date.getTime() - a.date.getTime()
  })

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Loading earnings...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Earnings</h1>
        <p className="text-muted-foreground">
          View your total earnings and session payments
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-muted/50 border-border">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground mb-1">Total Earnings</p>
            <p className="text-2xl font-bold text-foreground">Rs. {totalEarnings}</p>
          </CardContent>
        </Card>
        <Card className="bg-muted/50 border-border">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground mb-1">Upcoming Earnings</p>
            <p className="text-2xl font-bold text-foreground">Rs. {upcomingEarnings}</p>
          </CardContent>
        </Card>
        <Card className="bg-muted/50 border-border">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground mb-1">Completed Earnings</p>
            <p className="text-2xl font-bold text-foreground">Rs. {completedEarnings}</p>
          </CardContent>
        </Card>
      </div>

      {/* Sessions Table */}
      <Card className="border-border">
        <CardHeader className="border-b border-border flex flex-col gap-4">
          <CardTitle className="text-lg">Session Payments</CardTitle>
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by student name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs value={filterStatus} onValueChange={(v) => setFilterStatus(v as FilterStatus)}>
            <div className="border-b border-border px-6 pt-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={filterStatus} className="mt-0">
              {sortedSessions.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Session</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedSessions.map((s) => (
                        <TableRow key={s.id}>
                          <TableHead>{s.studentName}</TableHead>
                          <TableHead>{format(new Date(s.date), 'dd MMM yyyy')}</TableHead>
                          <TableHead>{s.time}</TableHead>
                          <TableHead>{s.sessionType}</TableHead>
                          <TableHead>{s.status}</TableHead>
                          <TableHead className="text-right">Rs. {s.totalAmount}</TableHead>
                        </TableRow>
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
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}