import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Meeting from "@/models/Meeting"

export async function GET(req) {
  console.log("first")

  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const counsellorId = searchParams.get("counsellorId")

    if (!counsellorId) {
      return NextResponse.json(
        { message: "Counsellor ID is required" },
        { status: 400 }
      )
    }

    const meetings = await Meeting.find({
      counsellor: counsellorId,
    })
      .populate("student", "firstName lastName email")
      .sort({ date: -1 })
      .lean()

    return NextResponse.json(meetings)

  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: "Error fetching meetings" },
      { status: 500 }
    )
  }
}