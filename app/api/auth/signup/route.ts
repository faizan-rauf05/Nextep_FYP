import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/User";

export async function POST(req: Request) {
  console.log("route hit");
  try {
    const body = await req.json()
    const { role } = body
    console.log(body);

    await connectDB()

    const hashedPassword = await bcrypt.hash(body.password, 10)

    if (role === "student") {
      const exists = await User.findOne({ email: body.email })
      if (exists) {
        return NextResponse.json({ message: "Email already exists" }, { status: 400 })
      }

      await User.create({
        ...body,
        image: body.image,
        password: hashedPassword,
      })
    }

     const staticSlots = ["9:00 AM", "10:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"];
     

    if (role === "counsellor") {
      const exists = await User.findOne({ email: body.email })
      if (exists) {
        return NextResponse.json({ message: "Email already exists" }, { status: 400 })
      }

      await User.create({
        ...body,
        image: body.image,
        password: hashedPassword,
        availability: staticSlots,
      })
    }

    return NextResponse.json({ message: "Account created successfully" })
  } catch (error) {
    return NextResponse.json({ message: "Signup failed" }, { status: 500 })
  }
}
