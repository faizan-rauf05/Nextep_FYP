"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { StudentStatCard } from "@/components/student/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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

// Mock data
const sessionsData = [
  { month: "Jan", sessions: 2 },
  { month: "Feb", sessions: 3 },
  { month: "Mar", sessions: 2 },
  { month: "Apr", sessions: 4 },
  { month: "May", sessions: 3 },
  { month: "Jun", sessions: 5 },
]

const progressData = [
  { week: "Week 1", progress: 20 },
  { week: "Week 2", progress: 35 },
  { week: "Week 3", progress: 50 },
  { week: "Week 4", progress: 65 },
]

const upcomingSessions = [
  { id: 1, counsellor: "Dr. Amanda Foster", specialization: "Tech Careers", date: "Jan 25, 2026", time: "10:00 AM", status: "confirmed" },
  { id: 2, counsellor: "Lisa Thompson", specialization: "Finance", date: "Jan 27, 2026", time: "2:00 PM", status: "confirmed" },
  { id: 3, counsellor: "David Martinez", specialization: "Creative Arts", date: "Feb 1, 2026", time: "11:00 AM", status: "pending" },
]

const careerRecommendations = [
  { id: 1, title: "Software Engineer", match: 92, reason: "Strong technical skills & problem-solving" },
  { id: 2, title: "Product Manager", match: 88, reason: "Good analytical & communication abilities" },
  { id: 3, title: "Data Analyst", match: 85, reason: "Excellent with data interpretation" },
]

const recentMessages = [
  { id: 1, from: "Dr. Amanda Foster", message: "Great session today! Here's a follow-up resource...", time: "2h ago", unread: true },
  { id: 2, from: "Lisa Thompson", message: "Looking forward to our next session next week.", time: "1d ago", unread: false },
  { id: 3, from: "David Martinez", message: "Your portfolio is impressive. Let's discuss...", time: "3d ago", unread: false },
]

export default function StudentDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Welcome Back, Sarah</h1>
          <p className="text-muted-foreground text-sm mt-1">Track your career journey and upcoming sessions</p>
        </div>
        <Button className="w-fit">
          <Calendar className="mr-2 h-4 w-4" />
          Book New Session
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StudentStatCard
          title="Sessions Booked"
          value="12"
          subtitle="2 completed this month"
          icon={CheckCircle}
        />
        <StudentStatCard
          title="Next Session"
          value="2 days"
          subtitle="With Dr. Amanda Foster"
          icon={Clock}
        />
        <StudentStatCard
          title="Profile Strength"
          value="85%"
          subtitle="Almost complete"
          icon={Award}
        />
        <StudentStatCard
          title="New Messages"
          value="3"
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
