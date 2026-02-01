'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar, Clock, FileText, Save, X } from 'lucide-react'
import { format } from 'date-fns'

interface SessionDetailModalProps {
  session: {
    id: string
    studentName: string
    studentEmail: string
    date: Date
    time: string
    sessionType: string
    duration: string
    status: 'upcoming' | 'completed' | 'cancelled'
    notes?: string
  }
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SessionDetailModal({
  session,
  open,
  onOpenChange,
}: SessionDetailModalProps) {
  const [notes, setNotes] = useState(session.notes || '')
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const handleSaveNotes = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setIsSaving(false)
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge className="bg-blue-100 text-blue-800">Upcoming</Badge>
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
      default:
        return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Session Details</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Session Info</TabsTrigger>
            <TabsTrigger value="notes">Session Notes</TabsTrigger>
          </TabsList>

          {/* Session Details Tab */}
          <TabsContent value="details" className="space-y-4 mt-4">
            <div className="space-y-4">
              {/* Student Info */}
              <Card className="bg-muted/50 border-border">
                <CardHeader>
                  <CardTitle className="text-sm">Student Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-foreground text-background text-xs">
                        {session.studentName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{session.studentName}</p>
                      <p className="text-sm text-muted-foreground">{session.studentEmail}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Session Details */}
              <Card className="bg-muted/50 border-border">
                <CardHeader>
                  <CardTitle className="text-sm">Session Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">DATE</p>
                      <div className="flex items-center gap-2 text-foreground">
                        <Calendar className="h-4 w-4" />
                        {format(session.date, 'MMM dd, yyyy')}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">TIME</p>
                      <div className="flex items-center gap-2 text-foreground">
                        <Clock className="h-4 w-4" />
                        {session.time}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">SESSION TYPE</p>
                      <p className="text-foreground">{session.sessionType}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">DURATION</p>
                      <p className="text-foreground">{session.duration}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">STATUS</p>
                      {getStatusBadge(session.status)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Session Notes Tab */}
          <TabsContent value="notes" className="space-y-4 mt-4">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Session Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-sm">
                    Add or edit session notes
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Write your session notes here... Record key discussion points, action items, recommendations, etc."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-32"
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
