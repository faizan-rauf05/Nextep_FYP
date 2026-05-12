'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react'
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

  const dates = Array.from({ length: 14 }, (_, i) => addDays(today, i))

  const handlePrevMonth = () => setDisplayedMonth(addDays(displayedMonth, -7))
  const handleNextMonth = () => setDisplayedMonth(addDays(displayedMonth, 7))

  return (
    <div className="space-y-6">

      {/* ── Date Selection ── */}
      <div>
        <div className="flex items-center gap-2 mb-5">
          <div
            style={{
              height: 30, width: 30, flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: "0.5rem",
              background: "linear-gradient(135deg, rgba(0,99,196,0.3), rgba(0,74,147,0.2))",
              border: "1px solid rgba(0,99,196,0.4)",
            }}
          >
            <ChevronRight size={14} color="#60a5fa" />
          </div>
          <h3 style={{ fontWeight: 600, color: "#ffffff", fontSize: 14, margin: 0 }}>
            Select Date
          </h3>
        </div>

        {/* Month navigator */}
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={handlePrevMonth}
            style={{
              height: 32, width: 32,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(0,99,196,0.25)",
              borderRadius: "0.5rem",
              cursor: "pointer",
              color: "#60a5fa",
              flexShrink: 0,
            }}
          >
            <ChevronLeft size={15} />
          </button>

          <span
            style={{
              flex: 1, textAlign: "center",
              fontSize: 13, fontWeight: 600, color: "#ffffff",
            }}
          >
            {format(displayedMonth, 'MMMM yyyy')}
          </span>

          <button
            onClick={handleNextMonth}
            style={{
              height: 32, width: 32,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(0,99,196,0.25)",
              borderRadius: "0.5rem",
              cursor: "pointer",
              color: "#60a5fa",
              flexShrink: 0,
            }}
          >
            <ChevronRight size={15} />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-2 mb-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div
              key={day}
              style={{
                textAlign: "center", fontSize: 11,
                fontWeight: 600, color: "#64748b",
                paddingBottom: 6,
              }}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Date buttons */}
        <div className="grid grid-cols-7 gap-2">
          {dates.map((date) => {
            const isSelected = selectedDate && isSameDay(date, selectedDate)
            const isToday = isSameDay(date, today)

            return (
              <button
                key={date.toISOString()}
                onClick={() => onDateChange(date)}
                style={{
                  height: 40, width: "100%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: "0.5rem",
                  fontSize: 13, fontWeight: isSelected || isToday ? 600 : 400,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  background: isSelected
                    ? "linear-gradient(135deg, #0063c4, #004a93)"
                    : isToday
                    ? "rgba(0,99,196,0.15)"
                    : "rgba(255,255,255,0.03)",
                  border: isSelected
                    ? "1px solid rgba(0,99,196,0.7)"
                    : isToday
                    ? "1px solid rgba(0,99,196,0.4)"
                    : "1px solid rgba(255,255,255,0.06)",
                  color: "#ffffff",
                  boxShadow: isSelected ? "0 4px 14px rgba(0,99,196,0.35)" : "none",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    const el = e.currentTarget as HTMLButtonElement
                    el.style.background = "rgba(0,99,196,0.15)"
                    el.style.border = "1px solid rgba(0,99,196,0.4)"
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    const el = e.currentTarget as HTMLButtonElement
                    el.style.background = isToday ? "rgba(0,99,196,0.15)" : "rgba(255,255,255,0.03)"
                    el.style.border = isToday ? "1px solid rgba(0,99,196,0.4)" : "1px solid rgba(255,255,255,0.06)"
                  }
                }}
              >
                {date.getDate()}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Time Selection ── */}
      {selectedDate && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div
              style={{
                height: 30, width: 30, flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                borderRadius: "0.5rem",
                background: "linear-gradient(135deg, rgba(0,99,196,0.3), rgba(0,74,147,0.2))",
                border: "1px solid rgba(0,99,196,0.4)",
              }}
            >
              <Clock size={14} color="#60a5fa" />
            </div>
            <h3 style={{ fontWeight: 600, color: "#ffffff", fontSize: 14, margin: 0 }}>
              Select Time —{" "}
              <span style={{ color: "#60a5fa", fontWeight: 500 }}>
                {format(selectedDate, 'MMM dd, yyyy')}
              </span>
            </h3>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {availableTimeSlots.map((slot) => {
              const isActive = selectedTime === slot
              return (
                <button
                  key={slot}
                  onClick={() => onTimeChange(slot)}
                  style={{
                    padding: "9px 8px",
                    borderRadius: "0.5rem",
                    fontSize: 12, fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    background: isActive
                      ? "linear-gradient(135deg, #0063c4, #004a93)"
                      : "rgba(255,255,255,0.04)",
                    border: isActive
                      ? "1px solid rgba(0,99,196,0.7)"
                      : "1px solid rgba(0,99,196,0.25)",
                    color: "#ffffff",
                    boxShadow: isActive ? "0 4px 14px rgba(0,99,196,0.35)" : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      const el = e.currentTarget as HTMLButtonElement
                      el.style.background = "rgba(0,99,196,0.12)"
                      el.style.border = "1px solid rgba(0,99,196,0.45)"
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      const el = e.currentTarget as HTMLButtonElement
                      el.style.background = "rgba(255,255,255,0.04)"
                      el.style.border = "1px solid rgba(0,99,196,0.25)"
                    }
                  }}
                >
                  {slot}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}