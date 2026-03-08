import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"

export async function PATCH(req: NextRequest) {
  try {
    await connectDB()

    const { id } = await req.json()

    await User.findByIdAndUpdate(id, {
      status: "rejected",
    })

    return NextResponse.json({ message: "Rejected" })
  } catch (error) {
    return NextResponse.json(
      { message: "Reject failed" },
      { status: 500 }
    )
  }
}