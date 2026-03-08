import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"

export async function GET(req: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = req.nextUrl

    const page = Number(searchParams.get("page")) || 1
    const limit = Number(searchParams.get("limit")) || 6
    const search = searchParams.get("search") || ""
    const status = searchParams.get("status")

    const skip = (page - 1) * limit

    const query: any = { role: "counsellor" }

    if (status && status !== "all") {
      query.status = status
    }

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ]
    }

    const counsellors = await User.find(query)
      .select("-password")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })

    const total = await User.countDocuments(query)

    const stats = {
      totalCounsellors: await User.countDocuments({ role: "counsellor" }),
      pending: await User.countDocuments({
        role: "counsellor",
        status: "pending",
      }),
      verified: await User.countDocuments({
        role: "counsellor",
        status: "verified",
      }),
    }

    return NextResponse.json({
      counsellors,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
      stats,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    )
  }
}