'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calendar } from 'lucide-react'

interface Availability {
  _id: string
  date: string
  timeSlots: string[]
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
    return <p className="text-center py-10">Loading availability...</p>
  }

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">Availability Management</h1>
        <p className="text-muted-foreground">
          Manage your available dates and time slots
        </p>
      </div>

      {/* Add Availability */}
      <Card>
        <CardHeader>
          <CardTitle>Add Availability</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4 items-end">
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Input
            type="time"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
          />
          <Button onClick={handleAdd}>Add Slot</Button>
        </CardContent>
      </Card>

      {/* List Availability */}
      <Card>
        <CardHeader>
          <CardTitle>Your Availability</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {availability.length === 0 ? (
            <p className="text-muted-foreground">No availability added.</p>
          ) : (
            availability.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border p-3 rounded-md"
              >
                <div>
                  <p className="font-semibold">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {item.timeSlots.join(', ')}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}