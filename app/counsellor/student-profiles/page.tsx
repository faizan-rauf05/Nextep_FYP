'use client'

import { useState, useMemo } from 'react'
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

// Mock data
const MOCK_STUDENTS: Student[] = [
  {
    id: '1',
    name: 'Ahmed Khan',
    email: 'ahmed@example.com',
    educationLevel: 'Bachelor - Computer Science',
    institution: 'FAST-NUCES',
    careerInterests: ['Software Development', 'Tech Startups', 'AI/ML'],
    careerGoals: 'Become a Senior Software Engineer within 5 years and lead a tech team',
    sessionsTaken: 5,
    counsellingHistory: [
      { date: 'Feb 10, 2024', topic: 'Career Guidance' },
      { date: 'Jan 28, 2024', topic: 'Resume Review' },
      { date: 'Jan 15, 2024', topic: 'Interview Preparation' },
      { date: 'Dec 20, 2023', topic: 'Career Assessment' },
      { date: 'Nov 30, 2023', topic: 'Career Guidance' },
    ],
    notes: 'Highly motivated student with strong technical background. Shows consistent progress in career development.',
  },
  {
    id: '2',
    name: 'Fatima Ali',
    email: 'fatima@example.com',
    educationLevel: 'Master - Business Administration',
    institution: 'IBA Karachi',
    careerInterests: ['Management', 'Finance', 'Consulting'],
    careerGoals: 'Work in management consulting and eventually establish own consultancy',
    sessionsTaken: 3,
    counsellingHistory: [
      { date: 'Feb 08, 2024', topic: 'Interview Preparation' },
      { date: 'Jan 20, 2024', topic: 'Career Guidance' },
      { date: 'Dec 25, 2023', topic: 'Career Assessment' },
    ],
    notes: 'Excellent communication skills and leadership potential. Needs focus on networking and industry connections.',
  },
  {
    id: '3',
    name: 'Hassan Ali',
    email: 'hassan@example.com',
    educationLevel: 'Bachelor - Mechanical Engineering',
    institution: 'NED University',
    careerInterests: ['Manufacturing', 'Automotive', 'Energy Sector'],
    careerGoals: 'Transition into management and lead engineering teams',
    sessionsTaken: 2,
    counsellingHistory: [
      { date: 'Jan 30, 2024', topic: 'Resume Review' },
      { date: 'Dec 18, 2023', topic: 'Career Assessment' },
    ],
    notes: 'Strong technical foundation but needs guidance on transitioning to management roles.',
  },
  {
    id: '4',
    name: 'Zainab Hassan',
    email: 'zainab@example.com',
    educationLevel: 'Bachelor - Marketing',
    institution: 'Lahore University',
    careerInterests: ['Digital Marketing', 'Brand Management', 'Content Strategy'],
    careerGoals: 'Become a Digital Marketing Manager and lead creative campaigns',
    sessionsTaken: 4,
    counsellingHistory: [
      { date: 'Feb 05, 2024', topic: 'Career Guidance' },
      { date: 'Jan 25, 2024', topic: 'Interview Preparation' },
      { date: 'Dec 28, 2023', topic: 'Resume Review' },
      { date: 'Nov 20, 2023', topic: 'Career Assessment' },
    ],
  },
  {
    id: '5',
    name: 'Sara Khan',
    email: 'sara@example.com',
    educationLevel: 'Bachelor - Psychology',
    institution: 'University of Karachi',
    careerInterests: ['HR', 'Organizational Psychology', 'Training & Development'],
    careerGoals: 'Build expertise in organizational psychology and talent management',
    sessionsTaken: 3,
    counsellingHistory: [
      { date: 'Feb 02, 2024', topic: 'Career Assessment' },
      { date: 'Jan 15, 2024', topic: 'Career Guidance' },
      { date: 'Dec 10, 2023', topic: 'Resume Review' },
    ],
  },
]

type FilterLevel = 'all' | 'bachelor' | 'master' | 'phd'

export default function StudentProfilesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterLevel, setFilterLevel] = useState<FilterLevel>('all')
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const filteredStudents = useMemo(() => {
    let students = MOCK_STUDENTS

    if (searchQuery) {
      students = students.filter((s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.careerInterests.some((interest) =>
          interest.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    }

    if (filterLevel !== 'all') {
      students = students.filter((s) => {
        const level = s.educationLevel.toLowerCase().split(' - ')[0]
        return level === filterLevel
      })
    }

    return students
  }, [searchQuery, filterLevel])

  const bachelorCount = MOCK_STUDENTS.filter((s) => s.educationLevel.includes('Bachelor')).length
  const masterCount = MOCK_STUDENTS.filter((s) => s.educationLevel.includes('Master')).length
  const totalSessions = MOCK_STUDENTS.reduce((sum, s) => sum + s.sessionsTaken, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Student Profiles</h1>
        <p className="text-muted-foreground">
          Manage and view profiles of all students assigned to you
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-muted/50 border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Students</p>
                <p className="text-2xl font-bold text-foreground">{MOCK_STUDENTS.length}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/50 border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Sessions</p>
                <p className="text-2xl font-bold text-foreground">{totalSessions}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-muted-foreground opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/50 border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Avg Sessions per Student</p>
                <p className="text-2xl font-bold text-foreground">
                  {(totalSessions / MOCK_STUDENTS.length).toFixed(1)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-muted-foreground opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Students List */}
      <Card className="border-border">
        <CardHeader className="border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-lg">Student Directory</CardTitle>
          </div>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or interest..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Tabs
              value={filterLevel}
              onValueChange={(value) => setFilterLevel(value as FilterLevel)}
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All Students</TabsTrigger>
                <TabsTrigger value="bachelor">Bachelor ({bachelorCount})</TabsTrigger>
                <TabsTrigger value="master">Master ({masterCount})</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
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
