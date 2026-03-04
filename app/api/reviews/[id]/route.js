import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Review from "@/models/Review";
import User from "@/models/User";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { counsellorId } = params;
    if (!counsellorId) {
      return NextResponse.json({ message: "Counsellor ID is required" }, { status: 400 });
    }

    const reviews = await Review.find({ counsellor: counsellorId })
      .populate("student", "firstName lastName email")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(reviews);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching reviews" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { studentId, counsellorId, rating, comment } = body;

    if (!studentId || !counsellorId || !rating || !comment) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const review = await Review.create({
      student: studentId,
      counsellor: counsellorId,
      rating,
      comment,
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error creating review" }, { status: 500 });
  }
}