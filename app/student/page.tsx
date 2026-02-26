"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { StudentStatCard } from "@/components/student/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Calendar,
  CheckCircle,
  Lightbulb,
  MessageSquare,
  Star,
  Clock,
  Award,
} from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"

interface DashboardData {
  sessionsData: Array<{ month: string; sessions: number }>
  progressData: Array<{ week: string; progress: number }>
  upcomingSessions: Array<{
    id: string
    counsellor: string
    specialization: string
    date: string
    time: string
    status: string
  }>
  recentMessages: Array<{
    id: number
    from: string
    message: string
    time: string
    unread: boolean
  }>
  stats: {
    totalSessions: number
    completedSessions: number
    nextSession: {
      daysUntil: number
      counsellor: string
    } | null
    profileStrength: number
    newMessages: number
  }
  careerRecommendations: Array<{
    id: number
    title: string
    match: number
    reason: string
  }>
}

export default function StudentDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [studentName, setStudentName] = useState("Sarah")

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)

        // Get student ID from localStorage or session
        const studentId = localStorage.getItem("studentId")
        const firstName = localStorage.getItem("firstName")

        if (firstName) {
          setStudentName(firstName)
        }

        if (!studentId) {
          setError("Student ID not found")
          setLoading(false)
          return
        }

        const response = await fetch(`/api/student/dashboard?studentId=${studentId}`)

        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data")
        }

        const dashboardData = await response.json()
        setData(dashboardData)
        setError(null)
      } catch (err) {
        console.error("Error fetching dashboard data:", err)
        setError("Failed to load dashboard data")
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (error) {
    return (
      <div className="space-y-6">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-800">{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const sessionsData = data?.sessionsData || []
  const progressData = data?.progressData || []
  const upcomingSessions = data?.upcomingSessions || []
  const careerRecommendations = data?.careerRecommendations || []
  const recentMessages = data?.recentMessages || []
  const stats = data?.stats || {
    totalSessions: 0,
    completedSessions: 0,
    nextSession: null,
    profileStrength: 0,
    newMessages: 0,
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Welcome Back, {studentName}</h1>
          <p className="text-muted-foreground text-sm mt-1">Track your career journey and upcoming sessions</p>
        </div>
        {/* <Button className="w-fit">
          <Calendar className="mr-2 h-4 w-4" />
          Book New Session
        </Button> */}
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StudentStatCard
          title="Sessions Booked"
          value={loading ? <Skeleton className="h-8 w-12" /> : stats.totalSessions.toString()}
          subtitle={`${stats.completedSessions} completed`}
          icon={CheckCircle}
        />
        <StudentStatCard
          title="Next Session"
          value={
            loading ? (
              <Skeleton className="h-8 w-20" />
            ) : stats.nextSession ? (
              `${stats.nextSession.daysUntil} days`
            ) : (
              "—"
            )
          }
          subtitle={
            loading ? (
              <Skeleton className="h-4 w-32 mt-1" />
            ) : stats.nextSession ? (
              `With ${stats.nextSession.counsellor}`
            ) : (
              "No upcoming sessions"
            )
          }
          icon={Clock}
        />
        <StudentStatCard
          title="Profile Strength"
          value={loading ? <Skeleton className="h-8 w-12" /> : `${stats.profileStrength}%`}
          subtitle="Almost complete"
          icon={Award}
        />
        <StudentStatCard
          title="New Messages"
          value={loading ? <Skeleton className="h-8 w-12" /> : stats.newMessages.toString()}
          subtitle="From your counsellors"
          icon={MessageSquare}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Sessions Progress */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-medium">Your Sessions Progress</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sessionsData}>
                    <defs>
                      <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#171717" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#171717" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                    <XAxis dataKey="month" stroke="#737373" fontSize={12} />
                    <YAxis stroke="#737373" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e5e5",
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="sessions"
                      stroke="#171717"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorSessions)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Career Discovery Progress */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-medium">Career Discovery Progress</CardTitle>
              <Lightbulb className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                    <XAxis dataKey="week" stroke="#737373" fontSize={12} />
                    <YAxis stroke="#737373" fontSize={12} tickFormatter={(value) => `${value}%`} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e5e5",
                        borderRadius: "8px",
                      }}
                      formatter={(value) => [`${value}%`, "Progress"]}
                    />
                    <Bar dataKey="progress" fill="#171717" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sidebar Content */}
        <div className="space-y-6">
          {/* Top Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Star className="h-4 w-4" />
                Top Matches
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {careerRecommendations.map((rec) => (
                  <div key={rec.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{rec.title}</p>
                      <Badge variant="secondary" className="text-xs">{rec.match}%</Badge>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-foreground h-2 rounded-full transition-all"
                        style={{ width: `${rec.match}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">{rec.reason}</p>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 text-sm">
                View All Recommendations
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start text-sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book a Session
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  View Messages
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm">
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Career Resources
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Upcoming Sessions & Messages */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Sessions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-medium">Upcoming Sessions</CardTitle>
            <Button variant="ghost" size="sm" className="text-sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-start justify-between py-3 border-b border-border last:border-0"
                >
                  <div className="space-y-1 flex-1">
                    <p className="text-sm font-medium">{session.counsellor}</p>
                    <p className="text-xs text-muted-foreground">{session.specialization}</p>
                    <p className="text-xs text-muted-foreground">{session.date} at {session.time}</p>
                  </div>
                  <Badge
                    variant={session.status === "confirmed" ? "default" : "outline"}
                    className="capitalize ml-2"
                  >
                    {session.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Messages */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-medium">Recent Messages</CardTitle>
            <Button variant="ghost" size="sm" className="text-sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="py-3 border-b border-border last:border-0 hover:bg-muted/30 px-2 -mx-2 rounded transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1 flex-1 min-w-0">
                      <p className={cn(
                        "text-sm truncate",
                        msg.unread ? "font-semibold" : "font-medium"
                      )}>
                        {msg.from}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">{msg.message}</p>
                    </div>
                    {msg.unread && (
                      <div className="h-2 w-2 bg-foreground rounded-full shrink-0 mt-2" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{msg.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
