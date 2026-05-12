'use client'

import { useState, useEffect, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableHeader, TableRow, TableHead } from '@/components/ui/table'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Search, Calendar, CalendarDays } from 'lucide-react'
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

/* ─── Shared Styles ───────────────────────── */
const glassCard: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(0,99,196,0.25)',
  backdropFilter: 'blur(8px)',
  borderRadius: '1rem',
}

const pageBackground: React.CSSProperties = {
  background: 'linear-gradient(135deg, #0a1628 0%, #0d1f3c 50%, #0a1628 100%)',
  minHeight: '100vh',
}

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
      <div
        className="min-h-screen flex items-center justify-center"
        style={pageBackground}
      >
        <div
          className="flex items-center gap-3"
          style={{ color: 'rgba(255,255,255,0.7)' }}
        >
          <div
            className="h-5 w-5 rounded-full border-2 border-t-transparent animate-spin"
            style={{
              borderColor: 'rgba(0,99,196,0.4)',
              borderTopColor: '#0063c4',
            }}
          />
          <span className="text-sm">Loading earnings...</span>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen p-6 space-y-6"
      style={pageBackground}
    >
      {/* blobs */}
      <div
        className="pointer-events-none fixed -top-32 -left-32 h-96 w-96 rounded-full blur-3xl -z-10"
        style={{ background: 'rgba(0,99,196,0.2)' }}
      />

      <div
        className="pointer-events-none fixed -bottom-32 -right-32 h-96 w-96 rounded-full blur-3xl -z-10"
        style={{ background: 'rgba(0,99,196,0.15)' }}
      />

      {/* Header */}
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Earnings
          </h1>

          <p
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            View your total earnings and session payments
          </p>
        </div>

        <div
          className="h-10 w-10 flex items-center justify-center rounded-xl"
          style={{
            background:
              'linear-gradient(135deg, rgba(0,99,196,0.3), rgba(0,74,147,0.2))',
            border: '1px solid rgba(0,99,196,0.4)',
          }}
        >
          <CalendarDays
            className="h-5 w-5"
            style={{ color: '#60a5fa' }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        <div style={glassCard} className="p-6">
          <p
            className="text-sm mb-2"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            Total Earnings
          </p>

          <h2 className="text-3xl font-bold text-white">
            Rs. {totalEarnings}
          </h2>
        </div>

        <div style={glassCard} className="p-6">
          <p
            className="text-sm mb-2"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            Upcoming Earnings
          </p>

          <h2 className="text-3xl font-bold text-white">
            Rs. {upcomingEarnings}
          </h2>
        </div>

        <div style={glassCard} className="p-6">
          <p
            className="text-sm mb-2"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            Completed Earnings
          </p>

          <h2 className="text-3xl font-bold text-white">
            Rs. {completedEarnings}
          </h2>
        </div>
      </div>

      {/* Main Card */}
      <div className="max-w-7xl mx-auto">
        <div style={glassCard}>
          {/* Header */}
          <div
            className="p-6 border-b"
            style={{
              borderColor: 'rgba(0,99,196,0.15)',
            }}
          >
            <div className="flex flex-col lg:flex-row gap-4 justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Session Payments
                </h2>

                <p
                  className="text-sm mt-1"
                  style={{ color: 'rgba(255,255,255,0.65)' }}
                >
                  Track your counselling earnings
                </p>
              </div>

              {/* Search */}
              <div className="relative w-full lg:w-80">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                />

                <Input
                  placeholder="Search by student name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11 text-white placeholder:text-white/50 border-0"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(0,99,196,0.3)',
                  }}
                />
              </div>
            </div>
          </div>

          <Tabs
            value={filterStatus}
            onValueChange={(v) => setFilterStatus(v as FilterStatus)}
          >
            {/* Tabs */}
            <div className="px-6 pt-6">
              <TabsList
                className="grid w-full grid-cols-4 p-1 rounded-xl"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(0,99,196,0.2)',
                }}
              >
                <TabsTrigger
                  value="all"
                  className="
                    text-white
                    data-[state=active]:text-white
                    data-[state=active]:bg-[#0063c4]
                    rounded-lg
                  "
                >
                  All
                </TabsTrigger>

                <TabsTrigger
                  value="upcoming"
                  className="
                    text-white
                    data-[state=active]:text-white
                    data-[state=active]:bg-[#0063c4]
                    rounded-lg
                  "
                >
                  Upcoming
                </TabsTrigger>

                <TabsTrigger
                  value="completed"
                  className="
                    text-white
                    data-[state=active]:text-white
                    data-[state=active]:bg-[#0063c4]
                    rounded-lg
                  "
                >
                  Completed
                </TabsTrigger>

                <TabsTrigger
                  value="cancelled"
                  className="
                    text-white
                    data-[state=active]:text-white
                    data-[state=active]:bg-[#0063c4]
                    rounded-lg
                  "
                >
                  Cancelled
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Table */}
            <TabsContent value={filterStatus} className="mt-0">
              {sortedSessions.length > 0 ? (
                <div className="overflow-x-auto p-6">
                  <div
                    className="rounded-2xl overflow-hidden"
                    style={{
                      border: '1px solid rgba(0,99,196,0.2)',
                      background: 'rgba(255,255,255,0.02)',
                    }}
                  >
                    <table className="w-full">
                      <TableHeader>
                        <TableRow
                          style={{
                            borderBottom:
                              '1px solid rgba(0,99,196,0.15)',
                          }}
                        >
                          <TableHead className="text-white">
                            Student
                          </TableHead>

                          <TableHead className="text-white">
                            Date
                          </TableHead>

                          <TableHead className="text-white">
                            Time
                          </TableHead>

                          <TableHead className="text-white">
                            Session
                          </TableHead>

                          <TableHead className="text-white">
                            Status
                          </TableHead>

                          <TableHead className="text-right text-white">
                            Amount
                          </TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        {sortedSessions.map((s) => (
                          <TableRow
                            key={s.id}
                            className="border-white/5 hover:bg-white/[0.03]"
                          >
                            <TableHead className="text-white font-medium">
                              <div>
                                <p>{s.studentName}</p>

                                <p
                                  className="text-xs mt-1"
                                  style={{
                                    color: 'rgba(255,255,255,0.6)',
                                  }}
                                >
                                  {s.studentEmail}
                                </p>
                              </div>
                            </TableHead>

                            <TableHead className="text-white">
                              {format(new Date(s.date), 'dd MMM yyyy')}
                            </TableHead>

                            <TableHead className="text-white">
                              {s.time}
                            </TableHead>

                            <TableHead className="text-white">
                              {s.sessionType}
                            </TableHead>

                            <TableHead>
                              <span
                                className="px-3 py-1 rounded-full text-xs font-medium capitalize"
                                style={
                                  s.status === 'upcoming'
                                    ? {
                                        background:
                                          'rgba(59,130,246,0.15)',
                                        border:
                                          '1px solid rgba(59,130,246,0.3)',
                                        color: '#60a5fa',
                                      }
                                    : s.status === 'completed'
                                      ? {
                                          background:
                                            'rgba(16,185,129,0.15)',
                                          border:
                                            '1px solid rgba(16,185,129,0.3)',
                                          color: '#34d399',
                                        }
                                      : {
                                          background:
                                            'rgba(239,68,68,0.15)',
                                          border:
                                            '1px solid rgba(239,68,68,0.3)',
                                          color: '#f87171',
                                        }
                                }
                              >
                                {s.status}
                              </span>
                            </TableHead>

                            <TableHead className="text-right text-white">
                              Rs. {s.totalAmount}
                            </TableHead>
                          </TableRow>
                        ))}
                      </TableBody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="text-center py-20">
                  <Calendar
                    className="h-14 w-14 mx-auto mb-4"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                  />

                  <p className="text-white font-medium">
                    No sessions found
                  </p>

                  <p
                    className="text-sm mt-1"
                    style={{ color: 'rgba(255,255,255,0.6)' }}
                  >
                    Try adjusting your filters
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}