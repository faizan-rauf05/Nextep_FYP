import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

import User from "@/models/User";
import Meeting from "@/models/Meeting";

export async function GET() {
  try {
    await connectDB();

    console.log("Admin Dashboard Summary API running");

    // ─────────────────────────────────────────
    // 1. Users
    // ─────────────────────────────────────────
    const totalStudents = await User.countDocuments({
      role: "student",
    });

    const totalCounsellors = await User.countDocuments({
      role: "counsellor",
    });

    // ─────────────────────────────────────────
    // 2. Meetings
    // ─────────────────────────────────────────
    const totalMeetings = await Meeting.countDocuments();

    const completedMeetings = await Meeting.countDocuments({
      status: "completed",
    });

    const cancelledMeetings = await Meeting.countDocuments({
      status: "cancelled",
    });

    const pendingMeetings = await Meeting.countDocuments({
      status: "scheduled",
    });

    // ─────────────────────────────────────────
    // 3. Revenue (only paid meetings)
    // ─────────────────────────────────────────
    const revenueResult = await Meeting.aggregate([
      {
        $match: {
          paymentStatus: "paid",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

    const totalRevenue = revenueResult[0]?.totalRevenue || 0;

    // ─────────────────────────────────────────
    // RESPONSE
    // ─────────────────────────────────────────
    return NextResponse.json({
      totalStudents,
      totalCounsellors,
      totalMeetings,
      completedMeetings,
      cancelledMeetings,
      pendingMeetings,
      totalRevenue,
    });
  } catch (error) {
    console.error("Admin Summary Error:", error);

    return NextResponse.json(
      { message: "Failed to load admin dashboard summary" },
      { status: 500 }
    );
  }
}