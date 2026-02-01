"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  DialogFooter,
} from "@/components/ui/dialog"
import {
  UserCog,
  Search,
  Star,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Mail,
  Calendar,
  DollarSign,
  TrendingUp,
  Award,
  Briefcase,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

// Mock data
const counsellors = [
  { 
    id: 1, 
    name: "Dr. Amanda Foster", 
    email: "amanda.f@pathfinder.com",
    headline: "Senior Career Coach | 15+ Years Experience",
    specializations: ["Technology", "Engineering", "Leadership"],
    rating: 4.9, 
    reviews: 156,
    totalSessions: 487,
    completionRate: 98,
    pricePerSession: 120,
    status: "verified",
    joinedDate: "Mar 2023",
    availability: "Available"
  },
  { 
    id: 2, 
    name: "Robert Kim", 
    email: "robert.k@pathfinder.com",
    headline: "Healthcare Career Specialist",
    specializations: ["Healthcare", "Medical", "Nursing"],
    rating: 4.7, 
    reviews: 98,
    totalSessions: 234,
    completionRate: 95,
    pricePerSession: 100,
    status: "pending",
    joinedDate: "Nov 2024",
    availability: "Available"
  },
  { 
    id: 3, 
    name: "Lisa Thompson", 
    email: "lisa.t@pathfinder.com",
    headline: "Finance & Banking Expert",
    specializations: ["Finance", "Banking", "Investment"],
    rating: 4.8, 
    reviews: 124,
    totalSessions: 356,
    completionRate: 97,
    pricePerSession: 150,
    status: "verified",
    joinedDate: "Jun 2023",
    availability: "Busy"
  },
  { 
    id: 4, 
    name: "David Martinez", 
    email: "david.m@pathfinder.com",
    headline: "Creative Arts Career Mentor",
    specializations: ["Creative Arts", "Design", "Media"],
    rating: 4.6, 
    reviews: 87,
    totalSessions: 198,
    completionRate: 94,
    pricePerSession: 85,
    status: "verified",
    joinedDate: "Aug 2023",
    availability: "Available"
  },
  { 
    id: 5, 
    name: "Jennifer Lee", 
    email: "jennifer.l@pathfinder.com",
    headline: "Software Engineering Career Coach",
    specializations: ["Software", "AI/ML", "Data Science"],
    rating: 4.9, 
    reviews: 203,
    totalSessions: 521,
    completionRate: 99,
    pricePerSession: 140,
    status: "pending",
    joinedDate: "Jan 2025",
    availability: "Available"
  },
  { 
    id: 6, 
    name: "Marcus Johnson", 
    email: "marcus.j@pathfinder.com",
    headline: "Executive Career Strategist",
    specializations: ["Executive", "Management", "Business"],
    rating: 4.8, 
    reviews: 145,
    totalSessions: 389,
    completionRate: 96,
    pricePerSession: 200,
    status: "verified",
    joinedDate: "Apr 2023",
    availability: "Busy"
  },
]

const pendingApplications = counsellors.filter(c => c.status === "pending")
const verifiedCounsellors = counsellors.filter(c => c.status === "verified")

export default function CounsellorsAdminPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [specializationFilter, setSpecializationFilter] = useState("all")
  const [selectedCounsellor, setSelectedCounsellor] = useState<typeof counsellors[0] | null>(null)
  const [showApprovalDialog, setShowApprovalDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)

  const filteredCounsellors = counsellors.filter(counsellor => {
    const matchesSearch = counsellor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      counsellor.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSpecialization = specializationFilter === "all" || 
      counsellor.specializations.some(s => s.toLowerCase() === specializationFilter.toLowerCase())
    return matchesSearch && matchesSpecialization
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Career Counsellors</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage counsellor profiles, verify applications, and monitor performance</p>
        </div>
        <Button className="gap-2">
          <UserCog className="h-4 w-4" />
          Invite Counsellor
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Counsellors</p>
                <p className="text-2xl font-semibold mt-1">156</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-foreground/5 flex items-center justify-center">
                <UserCog className="h-5 w-5 text-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Approval</p>
                <p className="text-2xl font-semibold mt-1">{pendingApplications.length}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-foreground/5 flex items-center justify-center">
                <Clock className="h-5 w-5 text-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Rating</p>
                <div className="flex items-center gap-1 mt-1">
                  <p className="text-2xl font-semibold">4.78</p>
                  <Star className="h-5 w-5 fill-foreground text-foreground" />
                </div>
              </div>
              <div className="h-10 w-10 rounded-full bg-foreground/5 flex items-center justify-center">
                <Award className="h-5 w-5 text-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-semibold mt-1">$248K</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-foreground/5 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <TabsList>
            <TabsTrigger value="all">All Counsellors</TabsTrigger>
            <TabsTrigger value="pending" className="relative">
              Pending Approval
              {pendingApplications.length > 0 && (
                <span className="ml-2 h-5 w-5 rounded-full bg-foreground text-background text-xs flex items-center justify-center">
                  {pendingApplications.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="verified">Verified</TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search counsellors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={specializationFilter} onValueChange={setSpecializationFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Specialization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Fields</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="creative arts">Creative Arts</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* All Counsellors Tab */}
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredCounsellors.map((counsellor) => (
              <Card key={counsellor.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-foreground text-background flex items-center justify-center font-medium">
                        {counsellor.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{counsellor.name}</h3>
                          {counsellor.status === "verified" && (
                            <CheckCircle2 className="h-4 w-4 text-foreground" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1">{counsellor.headline}</p>
                      </div>
                    </div>
                    <Badge 
                      variant={counsellor.status === "verified" ? "default" : "outline"}
                      className="capitalize"
                    >
                      {counsellor.status}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-4">
                    {counsellor.specializations.slice(0, 3).map((spec) => (
                      <Badge key={spec} variant="secondary" className="text-xs font-normal">
                        {spec}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="h-3 w-3 fill-foreground text-foreground" />
                        <span className="font-medium text-sm">{counsellor.rating}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{counsellor.reviews} reviews</p>
                    </div>
                    <div className="text-center border-x border-border">
                      <p className="font-medium text-sm">{counsellor.totalSessions}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Sessions</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-sm">${counsellor.pricePerSession}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Per session</p>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 bg-transparent"
                      onClick={() => setSelectedCounsellor(counsellor)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Mail className="h-4 w-4 mr-1" />
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between pt-4">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium">1-6</span> of <span className="font-medium">156</span>
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="bg-foreground text-background hover:bg-foreground/90">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <span className="text-muted-foreground">...</span>
              <Button variant="outline" size="sm">26</Button>
              <Button variant="outline" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Pending Approval Tab */}
        <TabsContent value="pending" className="space-y-4">
          {pendingApplications.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <CheckCircle2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-medium text-lg">All caught up!</h3>
                <p className="text-muted-foreground text-sm mt-1">No pending applications to review</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {pendingApplications.map((counsellor) => (
                <Card key={counsellor.id}>
                  <CardContent className="py-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="h-14 w-14 rounded-full bg-foreground text-background flex items-center justify-center font-semibold text-lg">
                          {counsellor.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-semibold">{counsellor.name}</h3>
                          <p className="text-sm text-muted-foreground">{counsellor.headline}</p>
                          <div className="flex flex-wrap gap-1 pt-1">
                            {counsellor.specializations.map((spec) => (
                              <Badge key={spec} variant="outline" className="text-xs font-normal">
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                            <span>{counsellor.totalSessions} sessions</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span>${counsellor.pricePerSession}/session</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Applied {counsellor.joinedDate}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedCounsellor(counsellor)
                            }}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Review
                          </Button>
                          <Button 
                            size="sm" 
                            className="gap-1"
                            onClick={() => {
                              setSelectedCounsellor(counsellor)
                              setShowApprovalDialog(true)
                            }}
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            Approve
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="gap-1 bg-transparent"
                            onClick={() => {
                              setSelectedCounsellor(counsellor)
                              setShowRejectDialog(true)
                            }}
                          >
                            <XCircle className="h-4 w-4" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Verified Tab */}
        <TabsContent value="verified" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Verified Counsellors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Counsellor</th>
                      <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">Specialization</th>
                      <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Rating</th>
                      <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Sessions</th>
                      <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden xl:table-cell">Completion</th>
                      <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Availability</th>
                      <th className="text-right py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {verifiedCounsellors.map((counsellor) => (
                      <tr key={counsellor.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                        <td className="py-4 px-2">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-foreground text-background flex items-center justify-center font-medium text-sm">
                              {counsellor.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div className="flex items-center gap-1">
                                <p className="text-sm font-medium">{counsellor.name}</p>
                                <CheckCircle2 className="h-3 w-3 text-foreground" />
                              </div>
                              <p className="text-xs text-muted-foreground">{counsellor.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-2 hidden md:table-cell">
                          <div className="flex flex-wrap gap-1">
                            {counsellor.specializations.slice(0, 2).map((spec) => (
                              <Badge key={spec} variant="secondary" className="text-xs font-normal">
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 px-2 hidden sm:table-cell">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-foreground text-foreground" />
                            <span className="text-sm font-medium">{counsellor.rating}</span>
                            <span className="text-xs text-muted-foreground">({counsellor.reviews})</span>
                          </div>
                        </td>
                        <td className="py-4 px-2 hidden lg:table-cell">
                          <span className="text-sm font-medium">{counsellor.totalSessions}</span>
                        </td>
                        <td className="py-4 px-2 hidden xl:table-cell">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-foreground rounded-full" 
                                style={{ width: `${counsellor.completionRate}%` }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground">{counsellor.completionRate}%</span>
                          </div>
                        </td>
                        <td className="py-4 px-2">
                          <Badge 
                            variant={counsellor.availability === "Available" ? "default" : "secondary"}
                          >
                            {counsellor.availability}
                          </Badge>
                        </td>
                        <td className="py-4 px-2">
                          <div className="flex items-center justify-end gap-1">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => setSelectedCounsellor(counsellor)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Mail className="h-4 w-4" />
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
        </TabsContent>
      </Tabs>

      {/* Counsellor Detail Dialog */}
      <Dialog open={!!selectedCounsellor && !showApprovalDialog && !showRejectDialog} onOpenChange={() => setSelectedCounsellor(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Counsellor Profile</DialogTitle>
            <DialogDescription>View detailed counsellor information</DialogDescription>
          </DialogHeader>
          {selectedCounsellor && (
            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-foreground text-background flex items-center justify-center font-semibold text-xl">
                  {selectedCounsellor.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{selectedCounsellor.name}</h3>
                    {selectedCounsellor.status === "verified" && (
                      <CheckCircle2 className="h-5 w-5 text-foreground" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedCounsellor.email}</p>
                </div>
              </div>

              <p className="text-sm">{selectedCounsellor.headline}</p>

              <div className="flex flex-wrap gap-1">
                {selectedCounsellor.specializations.map((spec) => (
                  <Badge key={spec} variant="outline">
                    {spec}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1 p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-foreground text-foreground" />
                    <span className="font-semibold">{selectedCounsellor.rating}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{selectedCounsellor.reviews} reviews</p>
                </div>
                <div className="space-y-1 p-3 bg-muted rounded-lg">
                  <p className="font-semibold">{selectedCounsellor.totalSessions}</p>
                  <p className="text-xs text-muted-foreground">Total sessions</p>
                </div>
                <div className="space-y-1 p-3 bg-muted rounded-lg">
                  <p className="font-semibold">{selectedCounsellor.completionRate}%</p>
                  <p className="text-xs text-muted-foreground">Completion rate</p>
                </div>
                <div className="space-y-1 p-3 bg-muted rounded-lg">
                  <p className="font-semibold">${selectedCounsellor.pricePerSession}</p>
                  <p className="text-xs text-muted-foreground">Per session</p>
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

      {/* Approval Dialog */}
      <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Counsellor</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve {selectedCounsellor?.name}? They will be able to start accepting bookings immediately.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApprovalDialog(false)}>Cancel</Button>
            <Button onClick={() => setShowApprovalDialog(false)}>Approve</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Application</DialogTitle>
            <DialogDescription>
              Are you sure you want to reject {selectedCounsellor?.name}&apos;s application? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => setShowRejectDialog(false)}>Reject</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
