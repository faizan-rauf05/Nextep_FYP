"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Shield, CheckCircle2, Clock } from "lucide-react"

interface BookingPanelProps {
  pricePerSession: number
  counsellorName: string
}

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
]

const sessionTypes = [
  { value: "career-guidance", label: "Career Guidance", duration: "60 min" },
  { value: "resume-review", label: "Resume Review", duration: "45 min" },
  { value: "mock-interview", label: "Mock Interview", duration: "90 min" },
  { value: "linkedin-optimization", label: "LinkedIn Optimization", duration: "30 min" },
]

export function BookingPanel({ pricePerSession, counsellorName }: BookingPanelProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [sessionType, setSessionType] = useState<string>("")

  const selectedSession = sessionTypes.find(s => s.value === sessionType)

  return (
    <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-2xl font-bold text-foreground">${pricePerSession}</p>
          <p className="text-sm text-muted-foreground">per session</p>
        </div>
        <Badge variant="secondary" className="rounded-full px-3 py-1">
          <Clock className="h-3 w-3 mr-1" />
          Responds in 2h
        </Badge>
      </div>

      {/* Session Type */}
      <div className="space-y-2 mb-5">
        <label className="text-sm font-medium text-foreground">Session Type</label>
        <Select value={sessionType} onValueChange={setSessionType}>
          <SelectTrigger className="w-full rounded-xl h-11">
            <SelectValue placeholder="Select session type" />
          </SelectTrigger>
          <SelectContent>
            {sessionTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                <div className="flex items-center justify-between w-full gap-3">
                  <span>{type.label}</span>
                  <span className="text-xs text-muted-foreground">{type.duration}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Calendar */}
      <div className="space-y-2 mb-5">
        <label className="text-sm font-medium text-foreground">Select Date</label>
        <div className="border border-border rounded-xl overflow-hidden">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
            className="w-full"
          />
        </div>
      </div>

      {/* Time Slots */}
      <div className="space-y-2 mb-6">
        <label className="text-sm font-medium text-foreground">Select Time</label>
        <div className="grid grid-cols-3 gap-2">
          {timeSlots.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`
                py-2.5 px-3 rounded-xl text-sm font-medium transition-all duration-200
                ${selectedTime === time
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }
              `}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Price Summary */}
      {selectedSession && (
        <div className="bg-muted rounded-xl p-4 mb-6 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{selectedSession.label}</span>
            <span className="text-foreground">${pricePerSession}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Duration</span>
            <span className="text-foreground">{selectedSession.duration}</span>
          </div>
          <div className="border-t border-border pt-2 mt-2">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${pricePerSession}</span>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <Button 
        className="w-full h-12 rounded-xl font-semibold text-base"
        disabled={!selectedDate || !selectedTime || !sessionType}
      >
        Book Session
      </Button>

      {/* Trust Indicators */}
      <div className="mt-6 pt-6 border-t border-border space-y-3">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Shield className="h-4 w-4 text-foreground" />
          <span>Secure booking & payment</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <CheckCircle2 className="h-4 w-4 text-foreground" />
          <span>Verified professional</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Clock className="h-4 w-4 text-foreground" />
          <span>Free cancellation up to 24h before</span>
        </div>
      </div>
    </div>
  )
}
