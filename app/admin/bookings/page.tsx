"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Calendar as CalendarIcon,
  Search,
  Clock,
  Video,
  Phone,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Filter,
  Eye,
  XCircle,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  DollarSign,
  Users,
} from "lucide-react"
import { format } from "date-fns"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

// Mock data
const bookingsData = [
  { day: "Mon", bookings: 24 },
  { day: "Tue", bookings: 31 },
  { day: "Wed", bookings: 28 },
  { day: "Thu", bookings: 35 },
  { day: "Fri", bookings: 42 },
  { day: "Sat", bookings: 18 },
  { day: "Sun", bookings: 12 },
]

const sessions = [
  {
    id: 1,
    student: { name: "Alex Johnson", email: "alex.j@email.com" },
    counsellor: { name: "Dr. Amanda Foster", specialization: "Tech Careers" },
    date: "Jan 24, 2026",
    time: "10:00 AM",
    duration: 60,
    type: "video",
    sessionType: "Career Guidance",
    price: 120,
    status: "confirmed",
  },
  {
    id: 2,
    student: { name: "Sarah Williams", email: "sarah.w@email.com" },
    counsellor: { name: "Lisa Thompson", specialization: "Finance" },
    date: "Jan 24, 2026",
    time: "2:00 PM",
    duration: 45,
    type: "video",
    sessionType: "Resume Review",
    price: 90,
    status: "pending",
  },
  {
    id: 3,
    student: { name: "Michael Chen", email: "michael.c@email.com" },
    counsellor: { name: "David Martinez", specialization: "Creative Arts" },
    date: "Jan 23, 2026",
    time: "11:00 AM",
    duration: 60,
    type: "phone",
    sessionType: "Mock Interview",
    price: 100,
    status: "completed",
  },
  {
    id: 4,
    student: { name: "Emily Davis", email: "emily.d@email.com" },
    counsellor: { name: "Robert Kim", specialization: "Healthcare" },
    date: "Jan 23, 2026",
    time: "3:00 PM",
    duration: 30,
    type: "chat",
    sessionType: "Quick Consultation",
    price: 50,
    status: "cancelled",
  },
  {
    id: 5,
    student: { name: "James Wilson", email: "james.w@email.com" },
    counsellor: { name: "Dr. Amanda Foster", specialization: "Tech Careers" },
    date: "Jan 25, 2026",
    time: "9:00 AM",
    duration: 60,
    type: "video",
    sessionType: "Career Guidance",
    price: 120,
    status: "confirmed",
  },
  {
    id: 6,
    student: { name: "Rachel Green", email: "rachel.g@email.com" },
    counsellor: { name: "Marcus Johnson", specialization: "Executive" },
    date: "Jan 25, 2026",
    time: "4:00 PM",
    duration: 90,
    type: "video",
    sessionType: "Executive Coaching",
    price: 200,
    status: "confirmed",
  },
  {
    id: 7,
    student: { name: "David Kim", email: "david.k@email.com" },
    counsellor: { name: "Jennifer Lee", specialization: "Software" },
    date: "Jan 24, 2026",
    time: "11:30 AM",
    duration: 60,
    type: "video",
    sessionType: "Career Guidance",
    price: 140,
    status: "in-progress",
  },
  {
    id: 8,
    student: { name: "Amanda Foster", email: "amanda.s@email.com" },
    counsellor: { name: "Lisa Thompson", specialization: "Finance" },
    date: "Jan 26, 2026",
    time: "10:00 AM",
    duration: 45,
    type: "phone",
    sessionType: "Resume Review",
    price: 90,
    status: "pending",
  },
]

const todaySessions = sessions.filter(s => s.date === "Jan 24, 2026")
const upcomingSessions = sessions.filter(s => ["confirmed", "pending"].includes(s.status))

export default function BookingsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined)
  const [selectedSession, setSelectedSession] = useState<typeof sessions[0] | null>(null)

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = 
      session.student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.counsellor.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || session.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getSessionTypeIcon = (type: string) => {
    switch (type) {
      case "video": return <Video className="h-4 w-4" />
      case "phone": return <Phone className="h-4 w-4" />
      case "chat": return <MessageSquare className="h-4 w-4" />
      default: return <Video className="h-4 w-4" />
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "confirmed": return "default"
      case "completed": return "secondary"
      case "pending": return "outline"
      case "in-progress": return "default"
      case "cancelled": return "destructive"
      default: return "outline"
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Bookings & Sessions</h1>
          <p className="text-muted-foreground text-sm mt-1">Monitor and manage all counseling sessions</p>
        </div>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2 bg-transparent">
                <CalendarIcon className="h-4 w-4" />
                {dateFilter ? format(dateFilter, "MMM d, yyyy") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={dateFilter}
                onSelect={setDateFilter}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today&apos;s Sessions</p>
                <p className="text-2xl font-semibold mt-1">{todaySessions.length}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-foreground/5 flex items-center justify-center">
                <CalendarIcon className="h-5 w-5 text-foreground" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-xs">
              <Clock className="h-3 w-3 text-muted-foreground" />
              <span className="text-muted-foreground">Next session in 45 min</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-2xl font-semibold mt-1">187</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-foreground/5 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-foreground" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-xs">
              <TrendingUp className="h-3 w-3 text-foreground" />
              <span className="font-medium">+23%</span>
              <span className="text-muted-foreground">vs last week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
                <p className="text-2xl font-semibold mt-1">94.2%</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-foreground/5 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-foreground" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-xs">
              <span className="text-muted-foreground">5.8% cancellation rate</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Week&apos;s Revenue</p>
                <p className="text-2xl font-semibold mt-1">$18,420</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-foreground/5 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-foreground" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-xs">
              <TrendingUp className="h-3 w-3 text-foreground" />
              <span className="font-medium">+$2,340</span>
              <span className="text-muted-foreground">vs last week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart and Today's Schedule */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Bookings Chart */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base font-medium">Weekly Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={bookingsData}>
                  <defs>
                    <linearGradient id="bookingsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#171717" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#171717" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                  <XAxis dataKey="day" stroke="#737373" fontSize={12} />
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
                    dataKey="bookings"
                    stroke="#171717"
                    strokeWidth={2}
                    fill="url(#bookingsGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-medium">Today&apos;s Schedule</CardTitle>
            <Badge variant="outline">{todaySessions.length} sessions</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todaySessions.length === 0 ? (
                <div className="py-8 text-center">
                  <CalendarIcon className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">No sessions scheduled for today</p>
                </div>
              ) : (
                todaySessions.map((session) => (
                  <div 
                    key={session.id} 
                    className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedSession(session)}
                  >
                    <div className="h-10 w-10 rounded-full bg-foreground/5 flex items-center justify-center shrink-0">
                      {getSessionTypeIcon(session.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{session.student.name}</p>
                      <p className="text-xs text-muted-foreground truncate">with {session.counsellor.name}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-medium">{session.time}</p>
                      <Badge variant={getStatusVariant(session.status)} className="text-xs capitalize">
                        {session.status}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by student or counsellor name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sessions Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-base font-medium">All Sessions</CardTitle>
          <span className="text-sm text-muted-foreground">{filteredSessions.length} sessions</span>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Session</th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">Counsellor</th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Date & Time</th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Type</th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden xl:table-cell">Price</th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="text-right py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSessions.map((session) => (
                  <tr key={session.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-foreground text-background flex items-center justify-center font-medium text-sm shrink-0">
                          {session.student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{session.student.name}</p>
                          <p className="text-xs text-muted-foreground">{session.sessionType}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2 hidden md:table-cell">
                      <div>
                        <p className="text-sm">{session.counsellor.name}</p>
                        <p className="text-xs text-muted-foreground">{session.counsellor.specialization}</p>
                      </div>
                    </td>
                    <td className="py-4 px-2 hidden sm:table-cell">
                      <div>
                        <p className="text-sm">{session.date}</p>
                        <p className="text-xs text-muted-foreground">{session.time} ({session.duration} min)</p>
                      </div>
                    </td>
                    <td className="py-4 px-2 hidden lg:table-cell">
                      <div className="flex items-center gap-2">
                        {getSessionTypeIcon(session.type)}
                        <span className="text-sm capitalize">{session.type}</span>
                      </div>
                    </td>
                    <td className="py-4 px-2 hidden xl:table-cell">
                      <span className="text-sm font-medium">${session.price}</span>
                    </td>
                    <td className="py-4 px-2">
                      <Badge variant={getStatusVariant(session.status)} className="capitalize">
                        {session.status === "in-progress" ? "In Progress" : session.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex items-center justify-end gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => setSelectedSession(session)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {session.status === "pending" && (
                          <>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <CheckCircle2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium">1-8</span> of <span className="font-medium">1,234</span> sessions
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="bg-foreground text-background hover:bg-foreground/90">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <span className="text-muted-foreground">...</span>
              <Button variant="outline" size="sm">155</Button>
              <Button variant="outline" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Session Detail Dialog */}
      <Dialog open={!!selectedSession} onOpenChange={() => setSelectedSession(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Session Details</DialogTitle>
            <DialogDescription>View and manage session information</DialogDescription>
          </DialogHeader>
          {selectedSession && (
            <div className="space-y-6 pt-4">
              {/* Status Banner */}
              <div className={`p-3 rounded-lg flex items-center gap-2 ${
                selectedSession.status === "confirmed" ? "bg-foreground/5" :
                selectedSession.status === "in-progress" ? "bg-foreground/10" :
                selectedSession.status === "completed" ? "bg-muted" :
                selectedSession.status === "cancelled" ? "bg-destructive/10" :
                "bg-muted"
              }`}>
                {selectedSession.status === "confirmed" && <CheckCircle2 className="h-4 w-4" />}
                {selectedSession.status === "in-progress" && <Clock className="h-4 w-4" />}
                {selectedSession.status === "completed" && <CheckCircle2 className="h-4 w-4" />}
                {selectedSession.status === "cancelled" && <XCircle className="h-4 w-4 text-destructive" />}
                {selectedSession.status === "pending" && <AlertCircle className="h-4 w-4" />}
                <span className="text-sm font-medium capitalize">
                  {selectedSession.status === "in-progress" ? "Session In Progress" : `Session ${selectedSession.status}`}
                </span>
              </div>

              {/* Participants */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Student</p>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-foreground text-background flex items-center justify-center font-medium text-xs">
                      {selectedSession.student.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{selectedSession.student.name}</p>
                      <p className="text-xs text-muted-foreground">{selectedSession.student.email}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Counsellor</p>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-foreground text-background flex items-center justify-center font-medium text-xs">
                      {selectedSession.counsellor.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{selectedSession.counsellor.name}</p>
                      <p className="text-xs text-muted-foreground">{selectedSession.counsellor.specialization}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Session Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1 p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground">Date & Time</p>
                  <p className="text-sm font-medium">{selectedSession.date}</p>
                  <p className="text-xs">{selectedSession.time} ({selectedSession.duration} min)</p>
                </div>
                <div className="space-y-1 p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground">Session Type</p>
                  <div className="flex items-center gap-2">
                    {getSessionTypeIcon(selectedSession.type)}
                    <span className="text-sm font-medium capitalize">{selectedSession.type}</span>
                  </div>
                  <p className="text-xs">{selectedSession.sessionType}</p>
                </div>
                <div className="space-y-1 p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground">Price</p>
                  <p className="text-sm font-medium">${selectedSession.price}</p>
                </div>
                <div className="space-y-1 p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground">Duration</p>
                  <p className="text-sm font-medium">{selectedSession.duration} minutes</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                {selectedSession.status === "pending" && (
                  <>
                    <Button className="flex-1">Confirm Session</Button>
                    <Button variant="outline" className="flex-1 bg-transparent">Cancel Session</Button>
                  </>
                )}
                {selectedSession.status === "confirmed" && (
                  <>
                    <Button className="flex-1">Join Session</Button>
                    <Button variant="outline" className="flex-1 bg-transparent">Reschedule</Button>
                  </>
                )}
                {selectedSession.status === "completed" && (
                  <>
                    <Button className="flex-1">View Recording</Button>
                    <Button variant="outline" className="flex-1 bg-transparent">View Feedback</Button>
                  </>
                )}
                {selectedSession.status === "in-progress" && (
                  <Button className="flex-1">Join Session</Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
