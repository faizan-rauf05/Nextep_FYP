import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Availability from "@/models/Availability"

export async function DELETE(req) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    await Availability.findByIdAndDelete(id)

    return NextResponse.json({ message: "Deleted" })
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting availability" },
      { status: 500 }
    )
  }
}