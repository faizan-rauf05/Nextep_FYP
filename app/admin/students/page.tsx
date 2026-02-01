"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
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
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Users,
  UserPlus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Mail,
  Ban,
  Trash2,
  Download,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  TrendingUp,
  UserCheck,
  Clock,
} from "lucide-react"

// Mock data
const students = [
  { 
    id: 1, 
    name: "Alex Johnson", 
    email: "alex.j@email.com", 
    phone: "+1 234-567-8901",
    education: "Bachelor's", 
    careerInterest: "Technology",
    sessionsBooked: 5,
    joinedDate: "Dec 15, 2025",
    lastActive: "2 hours ago",
    status: "active" 
  },
  { 
    id: 2, 
    name: "Sarah Williams", 
    email: "sarah.w@email.com", 
    phone: "+1 234-567-8902",
    education: "Master's", 
    careerInterest: "Healthcare",
    sessionsBooked: 12,
    joinedDate: "Nov 20, 2025",
    lastActive: "1 day ago",
    status: "active" 
  },
  { 
    id: 3, 
    name: "Michael Chen", 
    email: "michael.c@email.com", 
    phone: "+1 234-567-8903",
    education: "High School", 
    careerInterest: "Finance",
    sessionsBooked: 2,
    joinedDate: "Jan 5, 2026",
    lastActive: "1 week ago",
    status: "inactive" 
  },
  { 
    id: 4, 
    name: "Emily Davis", 
    email: "emily.d@email.com", 
    phone: "+1 234-567-8904",
    education: "Bachelor's", 
    careerInterest: "Creative Arts",
    sessionsBooked: 8,
    joinedDate: "Oct 10, 2025",
    lastActive: "3 hours ago",
    status: "active" 
  },
  { 
    id: 5, 
    name: "James Wilson", 
    email: "james.w@email.com", 
    phone: "+1 234-567-8905",
    education: "PhD", 
    careerInterest: "Engineering",
    sessionsBooked: 15,
    joinedDate: "Sep 1, 2025",
    lastActive: "5 hours ago",
    status: "active" 
  },
  { 
    id: 6, 
    name: "Rachel Green", 
    email: "rachel.g@email.com", 
    phone: "+1 234-567-8906",
    education: "Master's", 
    careerInterest: "Marketing",
    sessionsBooked: 3,
    joinedDate: "Jan 10, 2026",
    lastActive: "2 days ago",
    status: "pending" 
  },
  { 
    id: 7, 
    name: "David Kim", 
    email: "david.k@email.com", 
    phone: "+1 234-567-8907",
    education: "Bachelor's", 
    careerInterest: "Technology",
    sessionsBooked: 7,
    joinedDate: "Nov 5, 2025",
    lastActive: "12 hours ago",
    status: "active" 
  },
  { 
    id: 8, 
    name: "Amanda Foster", 
    email: "amanda.f@email.com", 
    phone: "+1 234-567-8908",
    education: "High School", 
    careerInterest: "Healthcare",
    sessionsBooked: 1,
    joinedDate: "Jan 18, 2026",
    lastActive: "Just now",
    status: "active" 
  },
]

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStudents, setSelectedStudents] = useState<number[]>([])
  const [statusFilter, setStatusFilter] = useState("all")
  const [educationFilter, setEducationFilter] = useState("all")
  const [selectedStudent, setSelectedStudent] = useState<typeof students[0] | null>(null)

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || student.status === statusFilter
    const matchesEducation = educationFilter === "all" || student.education === educationFilter
    return matchesSearch && matchesStatus && matchesEducation
  })

  const toggleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([])
    } else {
      setSelectedStudents(filteredStudents.map(s => s.id))
    }
  }

  const toggleSelect = (id: number) => {
    setSelectedStudents(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Students</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage and monitor all registered students</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-semibold mt-1">2,847</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-foreground/5 flex items-center justify-center">
                <Users className="h-5 w-5 text-foreground" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-xs">
              <TrendingUp className="h-3 w-3 text-foreground" />
              <span className="font-medium">+12.5%</span>
              <span className="text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Students</p>
                <p className="text-2xl font-semibold mt-1">2,156</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-foreground/5 flex items-center justify-center">
                <UserCheck className="h-5 w-5 text-foreground" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-xs">
              <span className="text-muted-foreground">75.7% of total</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">New This Month</p>
                <p className="text-2xl font-semibold mt-1">324</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-foreground/5 flex items-center justify-center">
                <UserPlus className="h-5 w-5 text-foreground" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-xs">
              <TrendingUp className="h-3 w-3 text-foreground" />
              <span className="font-medium">+8.3%</span>
              <span className="text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Sessions/Student</p>
                <p className="text-2xl font-semibold mt-1">4.2</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-foreground/5 flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-foreground" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-xs">
              <span className="text-muted-foreground">+0.5 from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Select value={educationFilter} onValueChange={setEducationFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Education" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Education</SelectItem>
                  <SelectItem value="High School">High School</SelectItem>
                  <SelectItem value="Bachelor's">Bachelor&apos;s</SelectItem>
                  <SelectItem value="Master's">Master&apos;s</SelectItem>
                  <SelectItem value="PhD">PhD</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedStudents.length > 0 && (
            <div className="flex items-center gap-4 mt-4 p-3 bg-muted rounded-lg">
              <span className="text-sm font-medium">{selectedStudents.length} selected</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                  <Mail className="h-3 w-3" />
                  Email
                </Button>
                <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                  <Ban className="h-3 w-3" />
                  Suspend
                </Button>
                <Button variant="outline" size="sm" className="gap-1 text-destructive hover:text-destructive bg-transparent">
                  <Trash2 className="h-3 w-3" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-base font-medium">All Students</CardTitle>
          <span className="text-sm text-muted-foreground">{filteredStudents.length} results</span>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 w-10">
                    <Checkbox
                      checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Student</th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">Education</th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Career Interest</th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Sessions</th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden xl:table-cell">Last Active</th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="text-right py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-2">
                      <Checkbox
                        checked={selectedStudents.includes(student.id)}
                        onCheckedChange={() => toggleSelect(student.id)}
                      />
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-foreground text-background flex items-center justify-center font-medium text-sm">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{student.name}</p>
                          <p className="text-xs text-muted-foreground">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2 hidden md:table-cell">
                      <span className="text-sm text-muted-foreground">{student.education}</span>
                    </td>
                    <td className="py-4 px-2 hidden lg:table-cell">
                      <Badge variant="outline" className="font-normal">
                        {student.careerInterest}
                      </Badge>
                    </td>
                    <td className="py-4 px-2 hidden sm:table-cell">
                      <span className="text-sm font-medium">{student.sessionsBooked}</span>
                    </td>
                    <td className="py-4 px-2 hidden xl:table-cell">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {student.lastActive}
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <Badge 
                        variant={
                          student.status === "active" 
                            ? "default" 
                            : student.status === "pending"
                            ? "outline"
                            : "secondary"
                        } 
                        className="capitalize"
                      >
                        {student.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex items-center justify-end">
                        <Dialog>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DialogTrigger asChild onClick={() => setSelectedStudent(student)}>
                                <DropdownMenuItem className="cursor-pointer">
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                              </DialogTrigger>
                              <DropdownMenuItem className="cursor-pointer">
                                <Mail className="h-4 w-4 mr-2" />
                                Send Email
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="cursor-pointer">
                                <Ban className="h-4 w-4 mr-2" />
                                Suspend Account
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Student Details</DialogTitle>
                              <DialogDescription>View and manage student information</DialogDescription>
                            </DialogHeader>
                            {selectedStudent && (
                              <div className="space-y-6 pt-4">
                                <div className="flex items-center gap-4">
                                  <div className="h-16 w-16 rounded-full bg-foreground text-background flex items-center justify-center font-semibold text-xl">
                                    {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                                  </div>
                                  <div>
                                    <h3 className="font-semibold text-lg">{selectedStudent.name}</h3>
                                    <p className="text-sm text-muted-foreground">{selectedStudent.email}</p>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Education</p>
                                    <p className="text-sm font-medium">{selectedStudent.education}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Career Interest</p>
                                    <p className="text-sm font-medium">{selectedStudent.careerInterest}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Phone</p>
                                    <p className="text-sm font-medium">{selectedStudent.phone}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Sessions</p>
                                    <p className="text-sm font-medium">{selectedStudent.sessionsBooked} booked</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Joined</p>
                                    <p className="text-sm font-medium">{selectedStudent.joinedDate}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Status</p>
                                    <Badge variant={selectedStudent.status === "active" ? "default" : "secondary"} className="capitalize">
                                      {selectedStudent.status}
                                    </Badge>
                                  </div>
                                </div>
                                <div className="flex gap-2 pt-2">
                                  <Button className="flex-1">Edit Profile</Button>
                                  <Button variant="outline" className="flex-1 bg-transparent">View Sessions</Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
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
              Showing <span className="font-medium">1-8</span> of <span className="font-medium">2,847</span> students
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="bg-foreground text-background hover:bg-foreground/90">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <span className="text-muted-foreground">...</span>
              <Button variant="outline" size="sm">356</Button>
              <Button variant="outline" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
