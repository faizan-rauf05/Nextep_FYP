'use client'

import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { StudentCard } from '@/components/counsellor/student-card'
import { StudentDetailModal } from '@/components/counsellor/student-detail-modal'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search, Users, TrendingUp } from 'lucide-react'

interface Student {
  id: string
  name: string
  email: string
  educationLevel: string
  institution: string
  careerInterests: string[]
  careerGoals: string
  sessionsTaken: number
  counsellingHistory: {
    date: string
    topic: string
  }[]
  notes?: string
}

type FilterLevel = 'all' | 'bachelor' | 'master' | 'phd'

export default function StudentProfilesPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterLevel, setFilterLevel] = useState<FilterLevel>('all')
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  // ✅ Fetch students assigned to counsellor
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const storedUser = localStorage.getItem('user')
        if (!storedUser) return
        const userData = JSON.parse(storedUser)
        const counsellorId = userData.id || userData._id

        const res = await fetch(`/api/students/getAssignedStudents?counsellorId=${counsellorId}`)
        const data = await res.json()
        if (!res.ok) throw new Error(data.message)

        setStudents(data)
      } catch (error) {
        console.error('Error fetching students:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStudents()
  }, [])

  // Filtered students
  const filteredStudents = useMemo(() => {
    let result = students

    if (searchQuery) {
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.careerInterests.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    if (filterLevel !== 'all') {
      result = result.filter((s) => s.educationLevel.toLowerCase().startsWith(filterLevel))
    }

    return result
  }, [students, searchQuery, filterLevel])

  // Stats
  const totalStudents = students.length
  const totalSessions = students.reduce((sum, s) => sum + s.sessionsTaken, 0)
  const avgSessions = totalStudents ? (totalSessions / totalStudents).toFixed(1) : 0

  if (loading) {
    return <p className="text-center py-12 text-muted-foreground">Loading students...</p>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Student Profiles</h1>
        <p className="text-muted-foreground">Manage and view profiles of all students assigned to you</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-muted/50 border-border">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Total Students</p>
              <p className="text-2xl font-bold text-foreground">{totalStudents}</p>
            </div>
            <Users className="h-8 w-8 text-muted-foreground opacity-50" />
          </CardContent>
        </Card>

        <Card className="bg-muted/50 border-border">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Total Sessions</p>
              <p className="text-2xl font-bold text-foreground">{totalSessions}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-muted-foreground opacity-50" />
          </CardContent>
        </Card>

        <Card className="bg-muted/50 border-border">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Avg Sessions per Student</p>
              <p className="text-2xl font-bold text-foreground">{avgSessions}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-muted-foreground opacity-50" />
          </CardContent>
        </Card>
      </div>

      {/* Students List */}
      <Card className="border-border">
        <CardHeader className="border-b border-border">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <CardTitle className="text-lg">Student Directory</CardTitle>
            <div className="flex gap-4 flex-1 md:max-w-sm">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or interest..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <Tabs value={filterLevel} onValueChange={(v) => setFilterLevel(v as FilterLevel)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All Students</TabsTrigger>
              <TabsTrigger value="bachelor">Bachelor</TabsTrigger>
              <TabsTrigger value="master">Master</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>

        <CardContent className="p-6">
          {filteredStudents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStudents.map((student) => (
                <StudentCard
                  key={student.id}
                  student={{
                    id: student.id,
                    name: student.name,
                    educationLevel: student.educationLevel.split(' - ')[0],
                    careerInterest: student.careerInterests[0],
                    sessionsTaken: student.sessionsTaken,
                  }}
                  onViewDetails={() => {
                    setSelectedStudent(student)
                    setModalOpen(true)
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground">No students found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <StudentDetailModal
          student={selectedStudent}
          open={modalOpen}
          onOpenChange={setModalOpen}
        />
      )}
    </div>
  )
}