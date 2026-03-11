import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  console.log("All students run");
  await connectDB();

  // ✅ Get ALL students (active + inactive)
  const students = await User.find({ role: "student" })
    .sort({ createdAt: -1 });

  const totalStudents = students.length;

  console.log(totalStudents);

  const activeStudentsCount = students.filter(
    (student) => student.status === "active"
  ).length;

  return NextResponse.json({
    totalStudents,
    activeStudents: activeStudentsCount,
    students: students.map((student) => ({
      _id: student._id.toString(),
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      education: student.education?.degree || "N/A",
      interests: student.interests || "N/A",
      status: student.status || "active",
      joinedDate: student.createdAt,
    })),
  });
}