import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Review from "@/models/Review";

export async function POST(req: NextRequest) {
  try {
    console.log("run");
    await connectDB();

    const { studentId, counsellorId, rating, comment } = await req.json();

    console.log(studentId, counsellorId, rating, comment);

    if (!studentId || !counsellorId || !rating || !comment) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const review = await Review.create({
      student: studentId,
      counsellor: counsellorId,
      rating,
      comment,
    });

    return NextResponse.json({
      message: "Review submitted successfully",
      review,
    });

  } catch (error) {
    console.error("Review error:", error);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}