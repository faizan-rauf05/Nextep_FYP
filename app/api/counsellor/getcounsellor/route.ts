import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

// GET - Fetch single OR all counsellors
export async function GET(req: NextRequest) {
  try {
    console.log("works");
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    // ✅ If ID exists → return single counsellor
    if (id) {
      const counsellor = await User.findById(id).select("-password");

      if (!counsellor) {
        return NextResponse.json(
          { message: "Counsellor not found" },
          { status: 404 },
        );
      }

      return NextResponse.json({ counsellor }, { status: 200 });
    }

    // ✅ If no ID → return all counsellors
    const counsellors = await User.find({ role: "counsellor" })
      .select("-password")
      .sort({ createdAt: -1 });

    const formatted = counsellors.map((c) => ({
      id: c._id,
      name: `${c.firstName} ${c.lastName}`,
      email: c.email,
      headline: c.bio || "",
      specializations: c.specialization || [],
      rating: c.rating || 0,
      reviews: c.reviews || 0,
      totalSessions: c.totalSessions || 0,
      completionRate: c.completionRate || 0,
      pricePerSession: c.pricePerSession || 0,
      status: c.status || "pending",
      availability: c.availability || "Available",
      joinedDate: c.createdAt,
    }));

    console.log(formatted);

    return NextResponse.json({ formatted }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// PUT - Update counsellor
export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { _id, firstName, lastName, specialization, experience, bio } = body;

    if (!_id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        firstName,
        lastName,
        specialization,
        experience,
        bio,
      },
      { new: true },
    ).select("-password");

    if (!updatedUser) {
      return NextResponse.json(
        { message: "Counsellor not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}
