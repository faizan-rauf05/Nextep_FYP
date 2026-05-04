import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Meeting from "@/models/Meeting";

export async function POST(req: NextRequest) {
  console.log("running");

  try {
    await connectDB();

    const { message, studentId } = await req.json();

    console.log("INPUT:", message, studentId);

    // 🔥 Call Groq
    const groqRes = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content: `
You are a booking extractor.

Return ONLY valid JSON in this format:

{
  "intent": "book_session",
  "counsellor": "Ali",
  "date": "2026-04-27",
  "time": "15:00"
}

If not booking:
{
  "intent": "other"
}
              `,
            },
            {
              role: "user",
              content: message,
            },
          ],
          temperature: 0,
        }),
      },
    );

    const data = await groqRes.json();
    console.log("GROQ RAW RESPONSE:", JSON.stringify(data, null, 2));

    // ❗ SAFE extraction (IMPORTANT FIX)
    const aiText = data?.choices?.[0]?.message?.content;

    if (!aiText) {
      return NextResponse.json(
        { message: "AI returned empty response", raw: data },
        { status: 500 },
      );
    }

    // 🔥 SAFE JSON parsing
    let parsed;

    try {
      const match = aiText.match(/\{[\s\S]*\}/);
      parsed = match ? JSON.parse(match[0]) : null;
    } catch (err) {
      return NextResponse.json(
        {
          message: "AI parsing failed",
          raw: aiText,
        },
        { status: 400 },
      );
    }

    console.log("PARSED:", parsed);

    if (!parsed || parsed.intent !== "book_session") {
      return NextResponse.json({ message: "Not a booking request" });
    }

    // 🔍 Find counsellor (FIXED - safer match)
    const counsellor = await User.findOne({
      role: "counsellor",
      $or: [
        { firstName: { $regex: parsed.counsellor, $options: "i" } },
        { lastName: { $regex: parsed.counsellor, $options: "i" } },
        {
          $expr: {
            $regexMatch: {
              input: { $concat: ["$firstName", " ", "$lastName"] },
              regex: parsed.counsellor,
              options: "i",
            },
          },
        },
      ],
    });

    if (!counsellor) {
      return NextResponse.json({ message: "Counsellor not found" });
    }

    // ❌ Check slot
    const exists = await Meeting.findOne({
      counsellor: counsellor._id,
      date: parsed.date,
      time: parsed.time,
    });

    if (exists) {
      return NextResponse.json({ message: "Slot already booked" });
    }

    // ✅ Create booking
    const meeting = await Meeting.create({
      student: studentId,
      counsellor: counsellor._id,
      sessionType: "Career Guidance",
      sessionDuration: "30 mins",
      sessionPrice: 300,
      date: parsed.date,
      time: parsed.time,
      totalAmount: 350,
    });

    return NextResponse.json({
      message: "Booking successful",
      meeting,
    });
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
