import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"

export async function GET() {
  await connectDB()

  const admin = await User.findOne({ role: "admin" })

  console.log(admin);
  return NextResponse.json(admin)
}

export async function PATCH(req: Request) {

  await connectDB()

  const body = await req.json()

  const admin = await User.findOne({ role: "admin" })

  admin.firstName = body.firstName
  admin.lastName = body.lastName
  admin.email = body.email

  if (body.password) {
    admin.password = body.password
  }

  await admin.save()

  return NextResponse.json({ success: true })
}