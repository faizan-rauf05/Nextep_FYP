import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function PATCH(req: Request) {
  await connectDB();

  const { id, status } = await req.json();

  if (!id || !status) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  await User.findByIdAndUpdate(id, { status });

  return NextResponse.json({ message: "Status updated successfully" });
}
