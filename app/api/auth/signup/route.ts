import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  console.log("route hit");
  try {
    const body = await req.json();
    const { role, education, password } = body;
    console.log("Signup body:", body);

    await connectDB();

    // Password boundary validation
    if (!password || password.length < 6 || password.length > 20) {
      return NextResponse.json(
        { message: "Password must be between 6 and 20 characters" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    // Check if email already exists
    const exists = await User.findOne({ email: body.email });
    if (exists) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 },
      );
    }

    if (role === "student") {
      if (!education) {
        return NextResponse.json(
          { message: "Education data is required" },
          { status: 400 },
        );
      }

      // Create student user
      await User.create({
        ...body,
        password: hashedPassword,
        education, // directly store the education object
      });
    }

    if (role === "counsellor") {
      const staticSlots = [
        "9:00 AM",
        "10:00 AM",
        "2:00 PM",
        "3:00 PM",
        "4:00 PM",
      ];
      await User.create({
        ...body,
        password: hashedPassword,
        availability: staticSlots,
      });
    }

    if (role === "admin") {
      await User.create({
        ...body,
        password: hashedPassword,
      });
    }

    return NextResponse.json({ message: "Account created successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ message: "Signup failed" }, { status: 500 });
  }
}
