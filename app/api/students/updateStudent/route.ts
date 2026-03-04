import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"

export async function PUT(req: Request) {
  console.log("update");
  await connectDB()

  const { id, firstName, lastName, interests } = await req.json()

  console.log( id, firstName, lastName, interests);

  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 })
  }

  await User.findByIdAndUpdate(id, {
    firstName,
    lastName,
    interests,
  })

  return NextResponse.json({ message: "Student updated successfully" })
}