'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Calendar, Clock, Briefcase, DollarSign } from 'lucide-react'
import { format } from 'date-fns'

interface BookingConfirmationProps {
  counsellor: {
    name: string
    photo?: string
    specialization: string
    sessionPrice: number
  }
  date: Date | null
  time: string | null
  sessionType: {
    title: string
    duration: string
    price: number
  }
  onConfirm: () => void
  onCancel: () => void
  isLoading: boolean
}

export function BookingConfirmation({
  counsellor,
  date,
  time,
  sessionType,
  onConfirm,
  onCancel,
  isLoading,
}: BookingConfirmationProps) {
  console.log(counsellor);
  return (
    <div className="space-y-4">
      {/* Booking Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Booking Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Counsellor Info */}
          <div className="flex gap-4 items-start pb-4 border-b border-border">
            <Avatar className="h-12 w-12">
              <AvatarImage src={counsellor.photo} alt={counsellor.name} />
              <AvatarFallback className="bg-background border border-border">
                {counsellor?.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold text-foreground">{counsellor.name}</h4>
              <p className="text-sm text-muted-foreground">{counsellor.specialization}</p>
            </div>
          </div>

          {/* Booking Details */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                <span className="font-medium text-foreground">
                  {date ? format(date, 'EEEE, MMMM dd, yyyy') : 'Not selected'}
                </span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                <span className="font-medium text-foreground">
                  {time || 'Not selected'}
                </span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <div>
                <span className="font-medium text-foreground">{sessionType.title}</span>
                <span className="text-sm text-muted-foreground ml-2">({sessionType.duration})</span>
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="mt-4 pt-4 border-t border-border space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Session Price</span>
              <span className="font-medium">Rs. {sessionType.price}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Platform Fee</span>
              <span className="font-medium">Rs. 50</span>
            </div>
            <div className="flex items-center justify-between text-base font-semibold pt-2 border-t border-border">
              <span>Total Amount</span>
              <span>Rs. {sessionType.price + 50}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms */}
      <Card className="bg-muted/50 border-0">
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground">
            By confirming this booking, you agree to our terms and conditions. You can cancel this booking up to 24 hours before the scheduled session.
          </p>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          disabled={isLoading}
          className="flex-1"
        >
          {isLoading ? 'Confirming...' : 'Confirm Booking'}
        </Button>
      </div>
    </div>
  )
}
