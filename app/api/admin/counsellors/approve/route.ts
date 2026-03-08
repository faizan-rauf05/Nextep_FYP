import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"

export async function PATCH(req: NextRequest) {
  try {
    await connectDB()

    const { id } = await req.json()

    const user = await User.findByIdAndUpdate(
      id,
      { status: "verified" },
      { new: true }
    )

    return NextResponse.json({ user })
  } catch (error) {
    return NextResponse.json(
      { message: "Approve failed" },
      { status: 500 }
    )
  }
}