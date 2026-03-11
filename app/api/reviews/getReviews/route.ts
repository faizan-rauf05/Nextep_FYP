import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Review from "@/models/Review";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const counsellorId = searchParams.get("counsellorId");

    if (!counsellorId) {
      return NextResponse.json(
        { message: "Counsellor ID required" },
        { status: 400 }
      );
    }

    const reviews = await Review.find({
      counsellor: counsellorId,
    })
      .populate("student", "firstName lastName")
      .sort({ createdAt: -1 });

    return NextResponse.json(reviews);

  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching reviews" },
      { status: 500 }
    );
  }
}