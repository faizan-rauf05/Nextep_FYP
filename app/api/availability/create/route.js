import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Availability from "@/models/Availability"

export async function POST(req) {
  try {
    await connectDB()

    const body = await req.json()

    const newAvailability = await Availability.create(body)

    return NextResponse.json(newAvailability)
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating availability" },
      { status: 500 }
    )
  }
}