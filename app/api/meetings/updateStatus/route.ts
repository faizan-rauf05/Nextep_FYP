import { NextResponse } from "next/server"
import mongoose from "mongoose"
import { connectDB } from "@/lib/mongodb"
import Meeting from "@/models/Meeting"

export async function PUT(req: Request) {
  try {
    await connectDB()

    const { meetingId, status } = await req.json()

    if (!meetingId || !status) {
      return NextResponse.json(
        { message: "Meeting ID and status required" },
        { status: 400 }
      )
    }

    if (!mongoose.Types.ObjectId.isValid(meetingId)) {
      return NextResponse.json(
        { message: "Invalid meeting ID" },
        { status: 400 }
      )
    }

    const meeting = await Meeting.findByIdAndUpdate(
      meetingId,
      { status },
      { new: true }
    )

    if (!meeting) {
      return NextResponse.json(
        { message: "Meeting not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(meeting)

  } catch (error) {
    return NextResponse.json(
      { message: "Error updating status", error },
      { status: 500 }
    )
  }
}