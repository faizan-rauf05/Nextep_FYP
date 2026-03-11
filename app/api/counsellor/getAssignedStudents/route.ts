import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const counsellorId = searchParams.get("counsellorId")

    if (!counsellorId) {
      return NextResponse.json(
        { message: "Counsellor ID required" },
        { status: 400 }
      )
    }

    // find students assigned to counsellor
    const students = await User.find({
      role: "student",
      assignedCounsellor: counsellorId,
    })

    const formattedStudents = students.map((student: any) => ({
      id: student._id,
      name: `${student.firstName} ${student.lastName}`,
      email: student.email,
      educationLevel: student.education?.degree || "Not provided",
      institution: student.education?.university || "",
      careerInterests: student.interests ? [student.interests] : [],
      careerGoals: "",
      sessionsTaken: 0,
      counsellingHistory: [],
      notes: "",
    }))

    return NextResponse.json(formattedStudents)

  } catch (error) {
    console.error("Error fetching students:", error)

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    )
  }
}