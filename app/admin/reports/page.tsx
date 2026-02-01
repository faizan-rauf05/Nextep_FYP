"use client"

import { useState } from "react"
import {
  TrendingUp,
  TrendingDown,
  Users,
  UserCheck,
  CheckCircle,
  DollarSign,
  Download,
  FileText,
  Calendar,
  Filter,
  ChevronDown,
  BarChart3,
  PieChart,
  Activity,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { format } from "date-fns"

// Mock data for charts
const userGrowthData = [
  { month: "Jan", students: 120, counsellors: 8 },
  { month: "Feb", students: 180, counsellors: 12 },
  { month: "Mar", students: 250, counsellors: 15 },
  { month: "Apr", students: 320, counsellors: 18 },
  { month: "May", students: 410, counsellors: 22 },
  { month: "Jun", students: 520, counsellors: 28 },
  { month: "Jul", students: 650, counsellors: 32 },
  { month: "Aug", students: 780, counsellors: 38 },
  { month: "Sep", students: 920, counsellors: 42 },
  { month: "Oct", students: 1080, counsellors: 48 },
  { month: "Nov", students: 1250, counsellors: 52 },
  { month: "Dec", students: 1456, counsellors: 58 },
]

const sessionsPerCounsellorData = [
  { name: "Dr. Sarah Ahmed", sessions: 145 },
  { name: "Dr. Ali Hassan", sessions: 132 },
  { name: "Ms. Fatima Khan", sessions: 128 },
  { name: "Mr. Usman Malik", sessions: 115 },
  { name: "Dr. Ayesha Siddiqui", sessions: 108 },
  { name: "Mr. Bilal Shah", sessions: 95 },
  { name: "Ms. Hina Raza", sessions: 88 },
  { name: "Dr. Kamran Ali", sessions: 76 },
]

const careerInterestData = [
  { name: "Engineering", value: 35, color: "#18181b" },
  { name: "Medical", value: 25, color: "#3f3f46" },
  { name: "Business", value: 20, color: "#71717a" },
  { name: "Arts & Design", value: 12, color: "#a1a1aa" },
  { name: "IT & Tech", value: 8, color: "#d4d4d8" },
]

// Booking activity heatmap data (hours x days)
const bookingHeatmapData = [
  { day: "Mon", "9AM": 5, "10AM": 8, "11AM": 12, "12PM": 6, "1PM": 4, "2PM": 10, "3PM": 14, "4PM": 11, "5PM": 7 },
  { day: "Tue", "9AM": 6, "10AM": 10, "11AM": 15, "12PM": 8, "1PM": 5, "2PM": 12, "3PM": 16, "4PM": 13, "5PM": 9 },
  { day: "Wed", "9AM": 4, "10AM": 7, "11AM": 11, "12PM": 5, "1PM": 3, "2PM": 9, "3PM": 12, "4PM": 10, "5PM": 6 },
  { day: "Thu", "9AM": 7, "10AM": 11, "11AM": 14, "12PM": 9, "1PM": 6, "2PM": 13, "3PM": 17, "4PM": 14, "5PM": 10 },
  { day: "Fri", "9AM": 8, "10AM": 12, "11AM": 16, "12PM": 10, "1PM": 7, "2PM": 14, "3PM": 18, "4PM": 15, "5PM": 11 },
  { day: "Sat", "9AM": 10, "10AM": 15, "11AM": 20, "12PM": 12, "1PM": 8, "2PM": 16, "3PM": 22, "4PM": 18, "5PM": 14 },
  { day: "Sun", "9AM": 3, "10AM": 5, "11AM": 7, "12PM": 4, "1PM": 2, "2PM": 6, "3PM": 8, "4PM": 6, "5PM": 4 },
]

const timeSlots = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"]

const downloadableReports = [
  {
    id: 1,
    title: "Monthly Revenue Report",
    description: "Complete financial breakdown including transactions, refunds, and platform earnings",
    lastGenerated: "2024-01-15",
    type: "Financial",
    formats: ["PDF", "CSV", "Excel"],
  },
  {
    id: 2,
    title: "Counsellor Performance Report",
    description: "Individual counsellor metrics including sessions, ratings, and completion rates",
    lastGenerated: "2024-01-14",
    type: "Performance",
    formats: ["PDF", "CSV"],
  },
  {
    id: 3,
    title: "Student Engagement Report",
    description: "Student activity metrics, booking patterns, and satisfaction scores",
    lastGenerated: "2024-01-13",
    type: "Engagement",
    formats: ["PDF", "CSV", "Excel"],
  },
  {
    id: 4,
    title: "Platform Usage Report",
    description: "Overall platform statistics, peak hours, and feature utilization",
    lastGenerated: "2024-01-12",
    type: "Analytics",
    formats: ["PDF", "CSV"],
  },
]

function MetricCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  trend,
}: {
  title: string
  value: string
  change: string
  changeLabel: string
  icon: React.ElementType
  trend: "up" | "down"
}) {
  return (
    <Card className="border-zinc-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-100">
            <Icon className="h-6 w-6 text-zinc-700" />
          </div>
          <div className={`flex items-center gap-1 text-sm font-medium ${trend === "up" ? "text-emerald-600" : "text-red-600"}`}>
            {trend === "up" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            {change}
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm font-medium text-zinc-500">{title}</p>
          <p className="mt-1 text-3xl font-semibold tracking-tight text-zinc-900">{value}</p>
          <p className="mt-1 text-xs text-zinc-400">{changeLabel}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function HeatmapCell({ value, maxValue }: { value: number; maxValue: number }) {
  const intensity = value / maxValue
  const bgColor = intensity > 0.8 
    ? "bg-zinc-900" 
    : intensity > 0.6 
    ? "bg-zinc-700" 
    : intensity > 0.4 
    ? "bg-zinc-500" 
    : intensity > 0.2 
    ? "bg-zinc-300" 
    : "bg-zinc-100"
  const textColor = intensity > 0.5 ? "text-white" : "text-zinc-600"
  
  return (
    <div 
      className={`flex h-10 w-full items-center justify-center rounded text-xs font-medium ${bgColor} ${textColor} transition-all hover:ring-2 hover:ring-zinc-400`}
      title={`${value} bookings`}
    >
      {value}
    </div>
  )
}

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })
  const [userType, setUserType] = useState("all")
  const [sessionType, setSessionType] = useState("all")
  const [chartsLoaded, setChartsLoaded] = useState(true)

  const maxHeatmapValue = Math.max(
    ...bookingHeatmapData.flatMap(day => 
      timeSlots.map(slot => day[slot as keyof typeof day] as number)
    )
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">Reports & Analytics</h1>
          <p className="mt-1 text-zinc-500">Platform insights and performance overview</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export All
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-zinc-200">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-zinc-500" />
              <span className="text-sm font-medium text-zinc-700">Filters:</span>
            </div>
            
            {/* Date Range */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "MMM d")} - {format(dateRange.to, "MMM d, yyyy")}
                      </>
                    ) : (
                      format(dateRange.from, "MMM d, yyyy")
                    )
                  ) : (
                    "Select date range"
                  )}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="range"
                  selected={{ from: dateRange.from, to: dateRange.to }}
                  onSelect={(range) => setDateRange({ from: range?.from, to: range?.to })}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>

            {/* User Type */}
            <Select value={userType} onValueChange={setUserType}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="User Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="students">Students</SelectItem>
                <SelectItem value="counsellors">Counsellors</SelectItem>
              </SelectContent>
            </Select>

            {/* Session Type */}
            <Select value={sessionType} onValueChange={setSessionType}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Session Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sessions</SelectItem>
                <SelectItem value="video">Video Call</SelectItem>
                <SelectItem value="audio">Audio Call</SelectItem>
                <SelectItem value="chat">Chat</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                setDateRange({ from: undefined, to: undefined })
                setUserType("all")
                setSessionType("all")
              }}
            >
              Clear filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Student Growth Rate"
          value="+24.5%"
          change="+3.2%"
          changeLabel="vs last month"
          icon={Users}
          trend="up"
        />
        <MetricCard
          title="Counsellor Utilization"
          value="78.3%"
          change="+5.8%"
          changeLabel="vs last month"
          icon={UserCheck}
          trend="up"
        />
        <MetricCard
          title="Session Completion Rate"
          value="94.2%"
          change="+1.4%"
          changeLabel="vs last month"
          icon={CheckCircle}
          trend="up"
        />
        <MetricCard
          title="Revenue Growth"
          value="+32.1%"
          change="-2.3%"
          changeLabel="vs last month"
          icon={DollarSign}
          trend="down"
        />
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="growth" className="space-y-6">
        <TabsList className="bg-zinc-100">
          <TabsTrigger value="growth" className="gap-2 data-[state=active]:bg-white">
            <Activity className="h-4 w-4" />
            User Growth
          </TabsTrigger>
          <TabsTrigger value="sessions" className="gap-2 data-[state=active]:bg-white">
            <BarChart3 className="h-4 w-4" />
            Sessions
          </TabsTrigger>
          <TabsTrigger value="heatmap" className="gap-2 data-[state=active]:bg-white">
            <Clock className="h-4 w-4" />
            Booking Activity
          </TabsTrigger>
          <TabsTrigger value="interests" className="gap-2 data-[state=active]:bg-white">
            <PieChart className="h-4 w-4" />
            Career Interests
          </TabsTrigger>
        </TabsList>

        {/* User Growth Chart */}
        <TabsContent value="growth">
          <Card className="border-zinc-200">
            <CardHeader>
              <CardTitle className="text-lg">User Growth Over Time</CardTitle>
              <CardDescription>Monthly breakdown of student and counsellor registrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={userGrowthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="studentGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#18181b" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#18181b" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="counsellorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#71717a" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#71717a" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                    <XAxis dataKey="month" stroke="#71717a" fontSize={12} />
                    <YAxis stroke="#71717a" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e4e4e7",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="students"
                      stroke="#18181b"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#studentGradient)"
                      name="Students"
                    />
                    <Area
                      type="monotone"
                      dataKey="counsellors"
                      stroke="#71717a"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#counsellorGradient)"
                      name="Counsellors"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sessions per Counsellor Chart */}
        <TabsContent value="sessions">
          <Card className="border-zinc-200">
            <CardHeader>
              <CardTitle className="text-lg">Sessions per Counsellor</CardTitle>
              <CardDescription>Top performing counsellors by total sessions conducted</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sessionsPerCounsellorData} layout="vertical" margin={{ top: 10, right: 30, left: 100, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" horizontal={true} vertical={false} />
                    <XAxis type="number" stroke="#71717a" fontSize={12} />
                    <YAxis type="category" dataKey="name" stroke="#71717a" fontSize={12} width={90} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e4e4e7",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                      formatter={(value: number) => [`${value} sessions`, "Total Sessions"]}
                    />
                    <Bar dataKey="sessions" fill="#18181b" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Booking Activity Heatmap */}
        <TabsContent value="heatmap">
          <Card className="border-zinc-200">
            <CardHeader>
              <CardTitle className="text-lg">Booking Activity by Day & Time</CardTitle>
              <CardDescription>Heatmap showing peak booking hours throughout the week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="min-w-[600px]">
                  {/* Time headers */}
                  <div className="mb-2 grid grid-cols-10 gap-2">
                    <div className="w-16" />
                    {timeSlots.map((slot) => (
                      <div key={slot} className="text-center text-xs font-medium text-zinc-500">
                        {slot}
                      </div>
                    ))}
                  </div>
                  
                  {/* Heatmap rows */}
                  {bookingHeatmapData.map((day) => (
                    <div key={day.day} className="mb-2 grid grid-cols-10 gap-2">
                      <div className="flex w-16 items-center text-sm font-medium text-zinc-700">
                        {day.day}
                      </div>
                      {timeSlots.map((slot) => (
                        <HeatmapCell 
                          key={`${day.day}-${slot}`} 
                          value={day[slot as keyof typeof day] as number} 
                          maxValue={maxHeatmapValue}
                        />
                      ))}
                    </div>
                  ))}

                  {/* Legend */}
                  <div className="mt-6 flex items-center justify-end gap-2">
                    <span className="text-xs text-zinc-500">Low</span>
                    <div className="flex gap-1">
                      <div className="h-4 w-8 rounded bg-zinc-100" />
                      <div className="h-4 w-8 rounded bg-zinc-300" />
                      <div className="h-4 w-8 rounded bg-zinc-500" />
                      <div className="h-4 w-8 rounded bg-zinc-700" />
                      <div className="h-4 w-8 rounded bg-zinc-900" />
                    </div>
                    <span className="text-xs text-zinc-500">High</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Career Interest Distribution */}
        <TabsContent value="interests">
          <Card className="border-zinc-200">
            <CardHeader>
              <CardTitle className="text-lg">Career Interest Distribution</CardTitle>
              <CardDescription>Breakdown of student career interests based on session topics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-8 lg:grid-cols-2">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={careerInterestData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {careerInterestData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #e4e4e7",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                        }}
                        formatter={(value: number) => [`${value}%`, "Interest Share"]}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col justify-center space-y-4">
                  {careerInterestData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="h-4 w-4 rounded"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm font-medium text-zinc-700">{item.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-zinc-900">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Downloadable Reports */}
      <Card className="border-zinc-200">
        <CardHeader>
          <CardTitle className="text-lg">Downloadable Reports</CardTitle>
          <CardDescription>Generate and download detailed platform reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            {downloadableReports.map((report) => (
              <div
                key={report.id}
                className="flex flex-col justify-between rounded-lg border border-zinc-200 p-4 transition-all hover:border-zinc-300 hover:shadow-sm"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100">
                      <FileText className="h-5 w-5 text-zinc-700" />
                    </div>
                    <Badge variant="secondary" className="bg-zinc-100 text-zinc-700">
                      {report.type}
                    </Badge>
                  </div>
                  <h3 className="mt-3 font-semibold text-zinc-900">{report.title}</h3>
                  <p className="mt-1 text-sm text-zinc-500">{report.description}</p>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-4">
                  <span className="text-xs text-zinc-400">
                    Last generated: {format(new Date(report.lastGenerated), "MMM d, yyyy")}
                  </span>
                  <div className="flex gap-2">
                    {report.formats.map((fmt) => (
                      <Button
                        key={fmt}
                        variant="outline"
                        size="sm"
                        className="h-7 gap-1 px-2 text-xs"
                      >
                        <Download className="h-3 w-3" />
                        {fmt}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
