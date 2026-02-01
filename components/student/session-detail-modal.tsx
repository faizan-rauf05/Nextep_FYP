'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar, Clock, Star, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Session {
  id: string
  counsellorName: string
  counsellorPhoto: string
  counsellorSpecialization: string
  date: Date
  time: string
  sessionType: string
  duration: string
  status: 'upcoming' | 'completed' | 'cancelled'
  notes?: string
  feedback?: {
    rating: number
    comment: string
  }
  joinLink?: string
}

interface SessionDetailModalProps {
  session: Session
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SessionDetailModal({
  session,
  open,
  onOpenChange,
}: SessionDetailModalProps) {
  const [submittedFeedback, setSubmittedFeedback] = useState(
    session.feedback || null
  )
  const [feedbackRating, setFeedbackRating] = useState(
    session.feedback?.rating || 0
  )
  const [feedbackComment, setFeedbackComment] = useState(
    session.feedback?.comment || ''
  )
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false)

  const formattedDate = session.date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const handleSubmitFeedback = async () => {
    setIsSubmittingFeedback(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))
    setSubmittedFeedback({
      rating: feedbackRating,
      comment: feedbackComment,
    })
    setIsSubmittingFeedback(false)
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'default'
      case 'completed':
        return 'secondary'
      case 'cancelled':
        return 'destructive'
      default:
        return 'default'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'Upcoming'
      case 'completed':
        return 'Completed'
      case 'cancelled':
        return 'Cancelled'
      default:
        return status
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Session Details</DialogTitle>
        </DialogHeader>

        {/* Session Summary */}
        <div className="space-y-6">
          <Card className="bg-muted/50 border-border">
            <CardContent className="p-6">
              <div className="flex gap-4 mb-4">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={session.counsellorPhoto} />
                  <AvatarFallback className="bg-muted">
                    {session.counsellorName
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-foreground">
                      {session.counsellorName}
                    </p>
                    <Badge variant={getStatusBadgeColor(session.status) as any}>
                      {getStatusLabel(session.status)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {session.counsellorSpecialization}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    DATE
                  </p>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{formattedDate}</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    TIME & DURATION
                  </p>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{session.time} • {session.duration}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    SESSION TYPE
                  </p>
                  <p className="text-sm text-foreground">{session.sessionType}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs for Notes and Feedback */}
          <Tabs defaultValue="notes" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="notes">Counsellor Notes</TabsTrigger>
              <TabsTrigger value="feedback">
                Feedback
                {submittedFeedback && (
                  <span className="ml-2 h-2 w-2 rounded-full bg-foreground" />
                )}
              </TabsTrigger>
            </TabsList>

            {/* Notes Tab */}
            <TabsContent value="notes" className="space-y-4">
              {session.notes ? (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex gap-2 mb-3">
                      <MessageSquare className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">
                          Notes from {session.counsellorName}
                        </p>
                        <p className="text-sm text-foreground whitespace-pre-wrap">
                          {session.notes}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-muted/50 border-border">
                  <CardContent className="p-6 text-center">
                    <MessageSquare className="h-8 w-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                    <p className="text-sm text-muted-foreground">
                      No notes from counsellor yet.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Feedback Tab */}
            <TabsContent value="feedback" className="space-y-4">
              {submittedFeedback ? (
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-base">Your Feedback</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">
                        Rating
                      </p>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={cn(
                              'h-5 w-5',
                              star <= submittedFeedback.rating
                                ? 'fill-foreground text-foreground'
                                : 'text-muted-foreground'
                            )}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">
                        Your Comment
                      </p>
                      <p className="text-sm text-foreground">
                        {submittedFeedback.comment}
                      </p>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSubmittedFeedback(null)}
                    >
                      Edit Feedback
                    </Button>
                  </CardContent>
                </Card>
              ) : session.status === 'completed' ? (
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-base">Share Your Feedback</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        How would you rate this session?
                      </Label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setFeedbackRating(star)}
                            className="transition-transform hover:scale-110"
                          >
                            <Star
                              className={cn(
                                'h-6 w-6 cursor-pointer',
                                star <= feedbackRating
                                  ? 'fill-foreground text-foreground'
                                  : 'text-muted-foreground'
                              )}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="feedback-comment" className="text-sm font-medium mb-2 block">
                        Additional Comments (Optional)
                      </Label>
                      <Textarea
                        id="feedback-comment"
                        placeholder="Share your thoughts about the session..."
                        value={feedbackComment}
                        onChange={(e) => setFeedbackComment(e.target.value)}
                        className="min-h-20"
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={handleSubmitFeedback}
                        disabled={feedbackRating === 0 || isSubmittingFeedback}
                        className="flex-1"
                      >
                        {isSubmittingFeedback ? 'Submitting...' : 'Submit Feedback'}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setFeedbackRating(0)
                          setFeedbackComment('')
                        }}
                      >
                        Clear
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-muted/50 border-border">
                  <CardContent className="p-6 text-center">
                    <Star className="h-8 w-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                    <p className="text-sm text-muted-foreground">
                      Feedback can only be submitted after the session is completed.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex gap-2 justify-end border-t border-border pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
            {session.status === 'upcoming' && session.joinLink && (
              <Button>Join Session</Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
