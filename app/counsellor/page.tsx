'use client'

import { CounsellorStatCard } from "@/components/counsellor/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  BookOpen,
  Users,
  TrendingUp,
  Star,
  Clock,
  DollarSign,
  ArrowRight,
  CheckCircle,
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
} from "recharts"
import Link from "next/link"

// Mock data
const earningsData = [
  { month: "Jan", earnings: 25000 },
  { month: "Feb", earnings: 32000 },
  { month: "Mar", earnings: 28000 },
  { month: "Apr", earnings: 41000 },
  { month: "May", earnings: 38000 },
  { month: "Jun", earnings: 45000 },
]

const sessionsData = [
  { month: "Jan", sessions: 8 },
  { month: "Feb", sessions: 12 },
  { month: "Mar", sessions: 10 },
  { month: "Apr", sessions: 15 },
  { month: "May", sessions: 14 },
  { month: "Jun", sessions: 18 },
]

const upcomingSessions = [
  { id: 1, studentName: "Sarah Johnson", sessionType: "Career Guidance", date: "Jan 25, 2026", time: "10:00 AM", status: "confirmed" },
  { id: 2, studentName: "Ahmed Hassan", sessionType: "Resume Review", date: "Jan 25, 2026", time: "2:00 PM", status: "confirmed" },
  { id: 3, studentName: "Fatima Khan", sessionType: "Interview Prep", date: "Jan 26, 2026", time: "11:00 AM", status: "pending" },
]

const studentProfiles = [
  { id: 1, name: "Sarah Johnson", careerInterest: "Tech Roles", rating: 4.8, sessions: 5, lastSession: "2h ago" },
  { id: 2, name: "Ahmed Hassan", careerInterest: "Finance", rating: 5.0, sessions: 3, lastSession: "1d ago" },
  { id: 3, name: "Fatima Khan", careerInterest: "Creative Arts", rating: 4.6, sessions: 4, lastSession: "3d ago" },
]

export default function CounsellorDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Welcome Back, Dr. Sarah</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your students and track your performance</p>
        </div>
        <Button asChild>
          <Link href="/counsellor/availability" className="gap-2">
            <Clock className="h-4 w-4" />
            Manage Availability
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <CounsellorStatCard
          title="This Month Sessions"
          value="18"
          change="4 more than last month"
          changeType="positive"
          icon={BookOpen}
        />
        <CounsellorStatCard
          title="Active Students"
          value="24"
          change="2 new this month"
          changeType="positive"
          icon={Users}
        />
        <CounsellorStatCard
          title="Monthly Earnings"
          value="Rs. 45,000"
          change="+12% from last month"
          changeType="positive"
          icon={DollarSign}
        />
        <CounsellorStatCard
          title="Average Rating"
          value="4.8"
          change="Based on 48 reviews"
          icon={Star}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Earnings Trend */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <span>Earnings Trend</span>
                <Badge variant="secondary">Last 6 months</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={earningsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "var(--color-background)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="earnings" 
                    stroke="var(--color-foreground)" 
                    strokeWidth={2}
                    dot={{ fill: "var(--color-foreground)", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Sessions Booked */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <span>Sessions Booked</span>
                <Badge variant="secondary">Last 6 months</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sessionsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "var(--color-background)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar 
                    dataKey="sessions" 
                    fill="var(--color-foreground)"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Quick Info */}
        <div className="space-y-6">
          {/* Upcoming Sessions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Upcoming Sessions</span>
                <Badge variant="secondary">{upcomingSessions.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{session.studentName}</p>
                    <p className="text-xs text-muted-foreground mb-1">{session.sessionType}</p>
                    <p className="text-xs text-muted-foreground">{session.date} at {session.time}</p>
                  </div>
                  <Badge 
                    variant={session.status === "confirmed" ? "default" : "outline"}
                    className="text-xs whitespace-nowrap"
                  >
                    {session.status}
                  </Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-2" asChild>
                <Link href="/counsellor/my-sessions" className="gap-2">
                  View All Sessions
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Top Performing Students */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Students</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {studentProfiles.map((student) => (
                <div key={student.id} className="flex items-center gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs bg-muted">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{student.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-foreground text-foreground" />
                        <span>{student.rating}</span>
                      </div>
                      <span>•</span>
                      <span>{student.sessions} sessions</span>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-2" asChild>
                <Link href="/counsellor/student-profiles" className="gap-2">
                  View All Students
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
