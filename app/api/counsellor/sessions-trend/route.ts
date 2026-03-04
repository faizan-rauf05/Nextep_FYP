import { NextResponse } from "next/server"
import mongoose from "mongoose"
import Meeting from "@/models/Meeting"
import { connectDB } from "@/lib/mongodb";

export async function GET(req: Request) {
  try {
    console.log("session trend");
    await connectDB()

    const { searchParams } = new URL(req.url)
    const counsellorId = searchParams.get("counsellorId")

    if (!counsellorId) {
      return NextResponse.json({ error: "Counsellor ID required" }, { status: 400 })
    }

    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5)

    const data = await Meeting.aggregate([
      {
        $match: {
          counsellor: new mongoose.Types.ObjectId(counsellorId),
          date: { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: { $month: "$date" },
          sessions: { $sum: 1 },
        },
      },
      {
        $sort: { "_id": 1 },
      },
    ])

    const formatted = data.map((item) => ({
      month: item._id,
      sessions: item.sessions,
    }))

    return NextResponse.json(formatted)
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 })
  }
}