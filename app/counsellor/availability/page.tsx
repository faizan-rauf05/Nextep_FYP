'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calendar, CalendarDays } from 'lucide-react'

interface Availability {
  _id: string
  date: string
  timeSlots: string[]
}

/* ─── Shared Styles ───────────────────────── */
const glassCard: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(0,99,196,0.25)',
  backdropFilter: 'blur(8px)',
  borderRadius: '1rem',
}

const pageBackground: React.CSSProperties = {
  background: 'linear-gradient(135deg, #0a1628 0%, #0d1f3c 50%, #0a1628 100%)',
  minHeight: '100vh',
}

export default function AvailabilityPage() {
  const [availability, setAvailability] = useState<Availability[]>([])
  const [date, setDate] = useState('')
  const [timeSlot, setTimeSlot] = useState('')
  const [loading, setLoading] = useState(true)

  const getCounsellorId = () => {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) return null
    const userData = JSON.parse(storedUser)
    return userData.id || userData._id
  }

  // ✅ Fetch Availability
  const fetchAvailability = async () => {
    const counsellorId = getCounsellorId()
    if (!counsellorId) return

    const res = await fetch(
      `/api/availability/get?counsellorId=${counsellorId}`
    )
    const data = await res.json()
    setAvailability(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchAvailability()
  }, [])

  // ✅ Add Availability
  const handleAdd = async () => {
    const counsellorId = getCounsellorId()
    if (!date || !timeSlot || !counsellorId) return

    await fetch('/api/availability/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        counsellor: counsellorId,
        date,
        timeSlots: [timeSlot],
      }),
    })

    setDate('')
    setTimeSlot('')
    fetchAvailability()
  }

  // ✅ Delete
  const handleDelete = async (id: string) => {
    await fetch(`/api/availability/delete?id=${id}`, {
      method: 'DELETE',
    })

    fetchAvailability()
  }

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={pageBackground}
      >
        <div
          className="flex items-center gap-3"
          style={{ color: 'rgba(255,255,255,0.7)' }}
        >
          <div
            className="h-5 w-5 rounded-full border-2 border-t-transparent animate-spin"
            style={{
              borderColor: 'rgba(0,99,196,0.4)',
              borderTopColor: '#0063c4',
            }}
          />
          <span className="text-sm">Loading availability...</span>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen p-6 space-y-6"
      style={pageBackground}
    >
      {/* blobs */}
      <div
        className="pointer-events-none fixed -top-32 -left-32 h-96 w-96 rounded-full blur-3xl -z-10"
        style={{ background: 'rgba(0,99,196,0.2)' }}
      />

      <div
        className="pointer-events-none fixed -bottom-32 -right-32 h-96 w-96 rounded-full blur-3xl -z-10"
        style={{ background: 'rgba(0,99,196,0.15)' }}
      />

      {/* Header */}
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Availability Management
          </h1>

          <p
            className="text-sm mt-1"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            Manage your available dates and time slots
          </p>
        </div>

        <div
          className="h-10 w-10 flex items-center justify-center rounded-xl"
          style={{
            background:
              'linear-gradient(135deg, rgba(0,99,196,0.3), rgba(0,74,147,0.2))',
            border: '1px solid rgba(0,99,196,0.4)',
          }}
        >
          <CalendarDays
            className="h-5 w-5"
            style={{ color: '#60a5fa' }}
          />
        </div>
      </div>

      {/* Add Availability */}
      <div className="max-w-6xl mx-auto">
        <div style={glassCard}>
          <div
            className="p-6 border-b"
            style={{
              borderColor: 'rgba(0,99,196,0.15)',
            }}
          >
            <h2 className="text-xl font-semibold text-white">
              Add Availability
            </h2>

            <p
              className="text-sm mt-1"
              style={{ color: 'rgba(255,255,255,0.65)' }}
            >
              Add new available time slots for students
            </p>
          </div>

          <div className="p-6 flex flex-col md:flex-row gap-4 items-end">
            <div className="w-full">
              <label
                className="text-sm mb-2 block"
                style={{ color: 'rgba(255,255,255,0.8)' }}
              >
                Select Date
              </label>

              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="h-11 text-white border-0"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(0,99,196,0.3)',
                }}
              />
            </div>

            <div className="w-full">
              <label
                className="text-sm mb-2 block"
                style={{ color: 'rgba(255,255,255,0.8)' }}
              >
                Select Time
              </label>

              <Input
                type="time"
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="h-11 text-white border-0"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(0,99,196,0.3)',
                }}
              />
            </div>

            <Button
              onClick={handleAdd}
              className="h-11 px-6 text-white border-0 font-semibold"
              style={{
                background:
                  'linear-gradient(135deg, #0063c4, #004a93)',
                boxShadow: '0 4px 20px rgba(0,99,196,0.4)',
              }}
            >
              Add Slot
            </Button>
          </div>
        </div>
      </div>

      {/* Availability List */}
      <div className="max-w-6xl mx-auto">
        <div style={glassCard}>
          <div
            className="p-6 border-b"
            style={{
              borderColor: 'rgba(0,99,196,0.15)',
            }}
          >
            <h2 className="text-xl font-semibold text-white">
              Your Availability
            </h2>

            <p
              className="text-sm mt-1"
              style={{ color: 'rgba(255,255,255,0.65)' }}
            >
              View and manage your available schedules
            </p>
          </div>

          <div className="p-6 space-y-4">
            {availability.length === 0 ? (
              <div className="text-center py-16">
                <Calendar
                  className="h-14 w-14 mx-auto mb-4"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                />

                <p className="text-white font-medium">
                  No availability added
                </p>

                <p
                  className="text-sm mt-1"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                >
                  Add your first available slot
                </p>
              </div>
            ) : (
              availability.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 rounded-2xl"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(0,99,196,0.2)',
                  }}
                >
                  <div>
                    <p className="font-semibold text-white text-lg">
                      {new Date(item.date).toLocaleDateString()}
                    </p>

                    <p
                      className="text-sm mt-1"
                      style={{ color: 'rgba(255,255,255,0.7)' }}
                    >
                      {item.timeSlots.join(', ')}
                    </p>
                  </div>

                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(item._id)}
                    className="md:w-auto w-full"
                  >
                    Delete
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}