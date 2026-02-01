'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { format, addDays, startOfToday, isSameDay } from 'date-fns'

interface DateTimeSelectionProps {
  selectedDate: Date | null
  selectedTime: string | null
  onDateChange: (date: Date) => void
  onTimeChange: (time: string) => void
  availableTimeSlots: string[]
}

export function DateTimeSelection({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
  availableTimeSlots,
}: DateTimeSelectionProps) {
  const today = startOfToday()
  const [displayedMonth, setDisplayedMonth] = useState(today)

  // Generate next 14 days
  const dates = Array.from({ length: 14 }, (_, i) => addDays(today, i))

  const handlePrevMonth = () => {
    setDisplayedMonth(addDays(displayedMonth, -7))
  }

  const handleNextMonth = () => {
    setDisplayedMonth(addDays(displayedMonth, 7))
  }

  return (
    <div className="space-y-6">
      {/* Date Selection */}
      <div>
        <h3 className="font-semibold mb-4">Select Date</h3>
        <div className="flex items-center gap-2 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrevMonth}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium flex-1 text-center">
            {format(displayedMonth, 'MMMM yyyy')}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNextMonth}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
              {day}
            </div>
          ))}

          {dates.map((date) => {
            const isSelected = selectedDate && isSameDay(date, selectedDate)
            const isToday = isSameDay(date, today)

            return (
              <Button
                key={date.toISOString()}
                variant={isSelected ? 'default' : isToday ? 'outline' : 'ghost'}
                size="sm"
                className="h-10 w-10 p-0"
                onClick={() => onDateChange(date)}
              >
                {date.getDate()}
              </Button>
            )
          })}
        </div>
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <div>
          <h3 className="font-semibold mb-4">
            Select Time - {format(selectedDate, 'MMM dd, yyyy')}
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {availableTimeSlots.map((slot) => (
              <Button
                key={slot}
                variant={selectedTime === slot ? 'default' : 'outline'}
                size="sm"
                onClick={() => onTimeChange(slot)}
                className="text-sm"
              >
                {slot}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
