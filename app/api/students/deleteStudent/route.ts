import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"

export async function DELETE(req: Request) {
  await connectDB()

  const { id } = await req.json()

  if (!id) {
    return NextResponse.json({ error: "Student ID required" }, { status: 400 })
  }

  await User.findByIdAndDelete(id)

  return NextResponse.json({ message: "Student deleted successfully" })
}