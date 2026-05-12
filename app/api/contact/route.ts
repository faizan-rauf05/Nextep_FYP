import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const { name, email, subject, message } = body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "All fields are required",
        },
        { status: 400 }
      );
    }

    // Save in MongoDB
    const newContact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Message submitted successfully",
        data: newContact,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CONTACT_API_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong",
      },
      { status: 500 }
    );
  }
}