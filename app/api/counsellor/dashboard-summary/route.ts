import { NextResponse } from "next/server"
import mongoose from "mongoose"
import Meeting from "@/models/Meeting"
import Review from "@/models/Review"
import User from "@/models/User"
import { connectDB } from "@/lib/mongodb";

export async function GET(req: Request) {
  try {
    await connectDB()
    console.log("Dashboard Summary");
    const { searchParams } = new URL(req.url)
    const counsellorId = searchParams.get("counsellorId")

    if (!counsellorId) {
      return NextResponse.json({ error: "Counsellor ID required" }, { status: 400 })
    }

    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    // Total sessions this month
    const totalSessions = await Meeting.countDocuments({
      counsellor: counsellorId,
      date: { $gte: startOfMonth },
      status: "completed",
    })

    // Active students (distinct)
    const activeStudents = await Meeting.distinct("student", {
      counsellor: counsellorId,
    })

    // Earnings this month
    const earningsData = await Meeting.aggregate([
      {
        $match: {
          counsellor: new mongoose.Types.ObjectId(counsellorId),
          date: { $gte: startOfMonth },
          paymentStatus: "paid",
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" },
        },
      },
    ])

    const totalEarnings = earningsData[0]?.total || 0

    // Average rating
    const ratingData = await Review.aggregate([
      {
        $match: {
          counsellor: new mongoose.Types.ObjectId(counsellorId),
        },
      },
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$rating" },
        },
      },
    ])

    const averageRating = ratingData[0]?.avgRating || 0

    return NextResponse.json({
      totalSessionsThisMonth: totalSessions,
      activeStudents: activeStudents.length,
      totalEarningsThisMonth: totalEarnings,
      averageRating: averageRating.toFixed(1),
    })
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 })
  }
}