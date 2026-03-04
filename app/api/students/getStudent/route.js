import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"

export async function GET(req) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const studentId = searchParams.get("studentId")

    if (!studentId) {
      return NextResponse.json({ message: "Missing studentId" }, { status: 400 })
    }

    const student = await User.findOne({ _id: studentId, role: "student" }).select("-password")

    if (!student) {
      return NextResponse.json({ message: "Student not found" }, { status: 404 })
    }

    console.log(student);

    return NextResponse.json(student, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Failed to fetch student" }, { status: 500 })
  }
}