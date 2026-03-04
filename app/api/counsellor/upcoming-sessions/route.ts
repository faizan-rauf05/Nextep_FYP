import { NextResponse } from "next/server";
import Meeting from "@/models/Meeting";
import { connectDB } from "@/lib/mongodb";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const counsellorId = searchParams.get("counsellorId");

    const today = new Date();

    const sessions = await Meeting.find({
      counsellor: counsellorId,
      date: { $gte: today },
      status: "scheduled",
    })
      .populate("student", "firstName lastName")
      .sort({ date: 1 })
      .limit(5);

    const formatted = sessions.map((s) => ({
      id: s._id,
      studentName: `${s.student.firstName} ${s.student.lastName}`,
      sessionType: s.sessionType,
      date: s.date.toDateString(),
      time: s.time,
      status: s.status,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
