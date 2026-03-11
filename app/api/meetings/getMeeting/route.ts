import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Meeting from "@/models/Meeting"

export async function GET(req: Request) {
  console.log("first");
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const studentId = searchParams.get("studentId")

    console.log(studentId);

    if (!studentId) {
      return NextResponse.json(
        { message: "Student ID is required" },
        { status: 400 }
      )
    }

    const meetings = await Meeting.find({
      student: studentId,
    })
      .populate("counsellor", "_id firstName lastName specialization image")
      .sort({ date: 1 })
      .lean()

      console.log(meetings);

    return NextResponse.json(meetings)
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching meetings" },
      { status: 500 }
    )
  }
}