import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Meeting from "@/models/Meeting"

export async function GET() {
  await connectDB()

  const meetings = await Meeting.find()
    .populate("student", "firstName lastName email")
    .populate("counsellor", "firstName lastName specialization")
    .sort({ date: -1 })

  const today = new Date()
  today.setHours(0,0,0,0)

  const todaySessions = meetings.filter(
    (m) => new Date(m.date).toDateString() === new Date().toDateString()
  )

  const stats = {
    total: meetings.length,
    today: todaySessions.length,
    revenue: meetings.reduce((a, m) => a + m.totalAmount, 0),
    completed: meetings.filter(m => m.status === "completed").length
  }

  return NextResponse.json({
    meetings,
    stats
  })
}