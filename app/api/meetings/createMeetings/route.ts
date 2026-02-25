import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"
import { connectDB } from "@/lib/mongodb"
import Meeting from "@/models/Meeting"

// Helper: Generate unique Jitsi room
function generateJitsiRoom() {
  const randomString = Math.random().toString(36).substring(2, 8)
  return `session-${Date.now()}-${randomString}`
}


// ===============================
// CREATE MEETING
// ===============================
export async function POST(req: Request) {
  console.log("meeting create !!!!!!!!!!!!!!!!!!!1");
  try {
    await connectDB()

    const body = await req.json()

    console.log(body);

    const {
      student,
      counsellor,
      sessionType,
      sessionDuration,
      sessionPrice,
      date,
      time,
      totalAmount,
    } = body

    // Prevent double booking (same counsellor + same date + time)
    const existing = await Meeting.findOne({
      counsellor,
      date,
      time,
      status: { $ne: "cancelled" },
    })

    if (existing) {
      return NextResponse.json(
        { message: "Time slot already booked" },
        { status: 400 }
      )
    }

    // ✅ Generate unique Jitsi room
    const roomName = generateJitsiRoom()
    const meetingLink = `https://meet.jit.si/${roomName}`

    const meeting = await Meeting.create({
      student,
      counsellor,
      sessionType,
      sessionDuration,
      sessionPrice,
      date,
      time,
      totalAmount,
      meetingLink
    })

    return NextResponse.json(meeting, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating meeting", error },
      { status: 500 }
    )
  }
}