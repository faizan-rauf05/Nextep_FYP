import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { studentEmail, counsellorEmail, date, time } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email to student
    await transporter.sendMail({
      from: `"Career System" <${process.env.EMAIL_USER}>`,
      to: studentEmail,
      subject: "Appointment Confirmed",
      html: `
        <h2>Appointment Confirmed</h2>
        <p>Your session is booked successfully.</p>
        <p><b>Date:</b> ${date}</p>
        <p><b>Time:</b> ${time}</p>
      `,
    });

    // Email to counsellor
    await transporter.sendMail({
      from: `"Career System" <${process.env.EMAIL_USER}>`,
      to: counsellorEmail,
      subject: "New Appointment Booked",
      html: `
        <h2>New Appointment</h2>
        <p>You have a new student booking.</p>
        <p><b>Date:</b> ${date}</p>
        <p><b>Time:</b> ${time}</p>
      `,
    });

    return Response.json({ message: "Emails sent" });

  } catch (error) {
    console.error(error);
    return Response.json({ error: "Email failed" }, { status: 500 });
  }
}