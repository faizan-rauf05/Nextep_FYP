import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Availability from "@/models/Availability"

export async function GET(req) {
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

    const availability = await Availability.find({
      counsellor: counsellorId,
    }).sort({ date: 1 })

    return NextResponse.json(availability)
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching availability" },
      { status: 500 }
    )
  }
}