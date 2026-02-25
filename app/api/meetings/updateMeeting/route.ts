import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"
import { connectDB } from "@/lib/mongodb"
import Meeting from "@/models/Meeting"

export async function PUT(req: Request) {
  try {
    await connectDB()

    const body = await req.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json(
        { message: "Meeting ID required" },
        { status: 400 }
      )
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 })
    }

    const updatedMeeting = await Meeting.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    )

    if (!updatedMeeting) {
      return NextResponse.json(
        { message: "Meeting not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedMeeting)
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating meeting", error },
      { status: 500 }
    )
  }
}