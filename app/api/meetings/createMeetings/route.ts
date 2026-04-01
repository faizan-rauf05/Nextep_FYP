import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Meeting from "@/models/Meeting";
import nodemailer from "nodemailer";
import User from "@/models/User";

// Helper: Generate unique Jitsi room
function generateJitsiRoom() {
  const randomString = Math.random().toString(36).substring(2, 8);
  return `session-${Date.now()}-${randomString}`;
}

// ===============================
// CREATE MEETING
// ===============================
export async function POST(req: Request) {
  console.log("meeting create !");
  try {
    await connectDB();

    const body = await req.json();

    console.log(body);

    const {
      student,
      counsellor,
      sessionType,
      sessionDuration,
      sessionPrice,
      date,
      time,
      totalAmount,
    } = body;

    // Prevent double booking (same counsellor + same date + time)
    const existing = await Meeting.findOne({
      counsellor,
      date,
      time,
      status: { $ne: "cancelled" },
    });

    if (existing) {
      return NextResponse.json(
        { message: "Time slot already booked" },
        { status: 400 },
      );
    }

    // ✅ Generate unique Jitsi room
    const roomName = generateJitsiRoom();
    const meetingLink = `https://meet.jit.si/${roomName}`;

    const meeting = await Meeting.create({
      student,
      counsellor,
      sessionType,
      sessionDuration,
      sessionPrice,
      date,
      time,
      totalAmount,
      meetingLink,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ⚠️ replace with actual emails
    const studentData = await User.findById(student);
    const counsellorData = await User.findById(counsellor);

    const studentEmail = studentData.email;
    const counsellorEmail = counsellorData.email;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: studentEmail,
      subject: "Appointment Confirmed 🎉",
      html: `
    <div style="font-family: Arial, sans-serif; padding: 10px;">
      <h2 style="color: #2c3e50;">Appointment Confirmed</h2>
      
      <p>Dear Student,</p>
      
      <p>Your session has been successfully booked. Below are your meeting details:</p>
      
      <ul>
        <li><b>Date:</b> ${date}</li>
        <li><b>Time:</b> ${time}</li>
        <li><b>Session Type:</b> ${sessionType}</li>
        <li><b>Duration:</b> ${sessionDuration} minutes</li>
      </ul>

      <p>
        <b>Meeting Link:</b><br/>
        <a href="${meetingLink}" target="_blank">${meetingLink}</a>
      </p>

      <p>Please join the meeting on time.</p>

      <br/>
      <p>Best regards,<br/>Career Counselling Team</p>
    </div>
  `,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: counsellorEmail,
      subject: "New Appointment Booked 📅",
      html: `
    <div style="font-family: Arial, sans-serif; padding: 10px;">
      <h2 style="color: #2c3e50;">New Appointment Scheduled</h2>
      
      <p>Dear Counsellor,</p>
      
      <p>You have received a new booking. Here are the details:</p>
      
      <ul>
        <li><b>Date:</b> ${date}</li>
        <li><b>Time:</b> ${time}</li>
        <li><b>Session Type:</b> ${sessionType}</li>
        <li><b>Duration:</b> ${sessionDuration} minutes</li>
      </ul>

      <p>
        <b>Meeting Link:</b><br/>
        <a href="${meetingLink}" target="_blank">${meetingLink}</a>
      </p>

      <p>Please be available on time for the session.</p>

      <br/>
      <p>Regards,<br/>Career Counselling System</p>
    </div>
  `,
    });

    return NextResponse.json(meeting, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating meeting", error },
      { status: 500 },
    );
  }
}
