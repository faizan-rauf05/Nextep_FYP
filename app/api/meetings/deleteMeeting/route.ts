import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"
import { connectDB } from "@/lib/mongodb"
import Meeting from "@/models/Meeting"


export async function DELETE(req: Request) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { message: "Meeting ID required" },
        { status: 400 }
      )
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 })
    }

    const deletedMeeting = await Meeting.findByIdAndDelete(id)

    if (!deletedMeeting) {
      return NextResponse.json(
        { message: "Meeting not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: "Meeting deleted successfully" })
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting meeting", error },
      { status: 500 }
    )
  }
}