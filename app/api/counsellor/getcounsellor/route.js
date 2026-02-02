import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"

export async function GET() {
  try {
    await connectDB()

    const counsellors = await User.find({ role: "counsellor" })
      .select("-password")
      .sort({ createdAt: -1 })

    return NextResponse.json({ counsellors }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: "Failed to fetch counsellors" },
      { status: 500 }
    )
  }
}
