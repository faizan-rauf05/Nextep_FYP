"use client"

import { useState } from "react"
import { StatCard } from "@/components/admin/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Users,
  UserCog,
  Calendar,
  DollarSign,
  Eye,
  Ban,
  Check,
  XCircle,
  TrendingUp,
} from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

// Mock data
const sessionsData = [
  { month: "Jan", sessions: 120 },
  { month: "Feb", sessions: 145 },
  { month: "Mar", sessions: 180 },
  { month: "Apr", sessions: 165 },
  { month: "May", sessions: 210 },
  { month: "Jun", sessions: 245 },
]

const revenueData = [
  { month: "Jan", revenue: 4200 },
  { month: "Feb", revenue: 5100 },
  { month: "Mar", revenue: 6300 },
  { month: "Apr", revenue: 5800 },
  { month: "May", revenue: 7400 },
  { month: "Jun", revenue: 8600 },
]

const careerInterestData = [
  { name: "Technology", value: 35 },
  { name: "Healthcare", value: 25 },
  { name: "Finance", value: 20 },
  { name: "Creative", value: 12 },
  { name: "Other", value: 8 },
]

const recentStudents = [
  { id: 1, name: "Alex Johnson", email: "alex.j@email.com", education: "Bachelor's", status: "active" },
  { id: 2, name: "Sarah Williams", email: "sarah.w@email.com", education: "Master's", status: "active" },
  { id: 3, name: "Michael Chen", email: "michael.c@email.com", education: "High School", status: "inactive" },
  { id: 4, name: "Emily Davis", email: "emily.d@email.com", education: "Bachelor's", status: "active" },
  { id: 5, name: "James Wilson", email: "james.w@email.com", education: "PhD", status: "active" },
]

const counsellors = [
  { id: 1, name: "Dr. Amanda Foster", specialization: "Tech Careers", rating: 4.9, sessions: 156, status: "verified" },
  { id: 2, name: "Robert Kim", specialization: "Healthcare", rating: 4.7, sessions: 98, status: "pending" },
  { id: 3, name: "Lisa Thompson", specialization: "Finance", rating: 4.8, sessions: 124, status: "verified" },
  { id: 4, name: "David Martinez", specialization: "Creative Arts", rating: 4.6, sessions: 87, status: "verified" },
  { id: 5, name: "Jennifer Lee", specialization: "Engineering", rating: 4.9, sessions: 203, status: "pending" },
]

const recentBookings = [
  { id: 1, student: "Alex Johnson", counsellor: "Dr. Amanda Foster", date: "Jan 24, 2026", time: "10:00 AM", status: "confirmed" },
  { id: 2, student: "Sarah Williams", counsellor: "Lisa Thompson", date: "Jan 24, 2026", time: "2:00 PM", status: "pending" },
  { id: 3, student: "Michael Chen", counsellor: "David Martinez", date: "Jan 23, 2026", time: "11:00 AM", status: "completed" },
  { id: 4, student: "Emily Davis", counsellor: "Robert Kim", date: "Jan 23, 2026", time: "3:00 PM", status: "cancelled" },
  { id: 5, student: "James Wilson", counsellor: "Dr. Amanda Foster", date: "Jan 25, 2026", time: "9:00 AM", status: "confirmed" },
]

const COLORS = ["#171717", "#404040", "#737373", "#a3a3a3", "#d4d4d4"]

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("6months")

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground text-sm mt-1">Welcome back, Admin. Here&apos;s what&apos;s happening today.</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="6months">Last 6 months</SelectItem>
            <SelectItem value="1year">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Students"
          value="2,847"
          change="+12.5% from last month"
          changeType="positive"
          icon={Users}
        />
        <StatCard
          title="Total Counsellors"
          value="156"
          change="+8 new this month"
          changeType="positive"
          icon={UserCog}
        />
        <StatCard
          title="Sessions Booked"
          value="1,234"
          change="+18.2% from last month"
          changeType="positive"
          icon={Calendar}
        />
        <StatCard
          title="Monthly Revenue"
          value="$48,250"
          change="+22.4% from last month"
          changeType="positive"
          icon={DollarSign}
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sessions Over Time */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">Sessions Over Time</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sessionsData}>
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
                  <Line
                    type="monotone"
                    dataKey="sessions"
                    stroke="#171717"
                    strokeWidth={2}
                    dot={{ fill: "#171717", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Revenue */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                  <XAxis dataKey="month" stroke="#737373" fontSize={12} />
                  <YAxis stroke="#737373" fontSize={12} tickFormatter={(value) => `$${value}`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e5e5",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => [`$${value}`, "Revenue"]}
                  />
                  <Bar dataKey="revenue" fill="#171717" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pie Chart & Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Student Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Student Career Interests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={careerInterestData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {careerInterestData.map((entry, index) => (
                      <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e5e5",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => [`${value}%`, "Interest"]}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value) => <span className="text-xs text-muted-foreground">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Bookings */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-medium">Recent Bookings</CardTitle>
            <Button variant="ghost" size="sm" className="text-sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.slice(0, 4).map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{booking.student} with {booking.counsellor}</p>
                    <p className="text-xs text-muted-foreground">{booking.date} at {booking.time}</p>
                  </div>
                  <Badge
                    variant={
                      booking.status === "confirmed"
                        ? "default"
                        : booking.status === "completed"
                        ? "secondary"
                        : booking.status === "pending"
                        ? "outline"
                        : "destructive"
                    }
                    className="capitalize"
                  >
                    {booking.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tables Section */}
      <div className="grid gap-6 xl:grid-cols-2">
        {/* Recent Students Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-medium">Recent Students</CardTitle>
            <Button variant="ghost" size="sm" className="text-sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                    <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Education</th>
                    <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="text-right py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentStudents.map((student) => (
                    <tr key={student.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-2">
                        <div>
                          <p className="text-sm font-medium">{student.name}</p>
                          <p className="text-xs text-muted-foreground">{student.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-2 hidden sm:table-cell">
                        <span className="text-sm text-muted-foreground">{student.education}</span>
                      </td>
                      <td className="py-3 px-2">
                        <Badge variant={student.status === "active" ? "default" : "secondary"} className="capitalize">
                          {student.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Ban className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Counsellors Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-medium">Counsellor Management</CardTitle>
            <Button variant="ghost" size="sm" className="text-sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Counsellor</th>
                    <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Rating</th>
                    <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="text-right py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {counsellors.map((counsellor) => (
                    <tr key={counsellor.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-2">
                        <div>
                          <p className="text-sm font-medium">{counsellor.name}</p>
                          <p className="text-xs text-muted-foreground">{counsellor.specialization}</p>
                        </div>
                      </td>
                      <td className="py-3 px-2 hidden sm:table-cell">
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium">{counsellor.rating}</span>
                          <span className="text-xs text-muted-foreground">({counsellor.sessions})</span>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <Badge variant={counsellor.status === "verified" ? "default" : "outline"} className="capitalize">
                          {counsellor.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center justify-end gap-1">
                          {counsellor.status === "pending" && (
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-foreground">
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
