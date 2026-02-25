import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Meeting from "@/models/Meeting"
import User from "@/models/User";

export async function GET(req: Request) {
  console.log("ffffff");
  try {
    await connectDB()

    const meetings = await Meeting.find()
      .populate("student", "firstName lastName email")
      .populate("counsellor", "firstName lastName specialization image")
      .lean()

      console.log(meetings);

    return NextResponse.json(meetings)
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching meetings", error },
      { status: 500 }
    )
  }
}