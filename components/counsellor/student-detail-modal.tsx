'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { FileText, Save, BookOpen, Target, History } from 'lucide-react'
import { useState } from 'react'

interface StudentDetailModalProps {
  student: {
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
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function StudentDetailModal({
  student,
  open,
  onOpenChange,
}: StudentDetailModalProps) {
  const [notes, setNotes] = useState(student.notes || '')
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const handleSaveNotes = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setIsSaving(false)
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Student Profile</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile Info</TabsTrigger>
            <TabsTrigger value="history">Session History</TabsTrigger>
            <TabsTrigger value="notes">Counsellor Notes</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4 mt-4">
            <div className="space-y-4">
              {/* Student Header */}
              <Card className="bg-muted/50 border-border">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-foreground text-background text-lg font-semibold">
                        {student.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground">{student.name}</h3>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Academic Background */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Academic Background
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">EDUCATION LEVEL</p>
                    <p className="text-sm text-foreground">{student.educationLevel}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">INSTITUTION</p>
                    <p className="text-sm text-foreground">{student.institution}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Career Interests */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Career Interests & Goals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">INTERESTS</p>
                    <div className="flex flex-wrap gap-2">
                      {student.careerInterests.map((interest) => (
                        <Badge key={interest} variant="secondary">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">CAREER GOALS</p>
                    <p className="text-sm text-foreground">{student.careerGoals}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Engagement Stats */}
              <Card className="bg-muted/50 border-border">
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">SESSIONS TAKEN</p>
                      <p className="text-2xl font-bold text-foreground">{student.sessionsTaken}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">MEMBER SINCE</p>
                      <p className="text-foreground">2024</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-4 mt-4">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <History className="h-4 w-4" />
                  Counselling History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {student.counsellingHistory.length > 0 ? (
                    student.counsellingHistory.map((record, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 pb-3 border-b border-border last:border-0"
                      >
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-semibold text-muted-foreground">
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{record.topic}</p>
                          <p className="text-xs text-muted-foreground">{record.date}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No counselling history yet.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notes Tab */}
          <TabsContent value="notes" className="space-y-4 mt-4">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Counsellor Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="student-notes" className="text-sm">
                    Internal counsellor notes about this student
                  </Label>
                  <Textarea
                    id="student-notes"
                    placeholder="Write notes about the student's progress, observations, recommendations, etc."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-40"
                  />
                </div>

                <div className="flex gap-2 pt-4 border-t border-border">
                  <Button
                    onClick={handleSaveNotes}
                    disabled={isSaving}
                    className="gap-2"
                  >
                    <Save className="h-4 w-4" />
                    {isSaving ? 'Saving...' : 'Save Notes'}
                  </Button>
                  {isSaved && (
                    <div className="flex items-center text-sm text-green-600">
                      ✓ Notes saved successfully
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-border">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
