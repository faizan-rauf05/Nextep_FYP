import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Meeting from "@/models/Meeting"
import User from "@/models/User"

export async function GET(request: Request) {
  try {
    await connectDB()

    // Get student ID from query params or session
    const { searchParams } = new URL(request.url)
    const studentId = searchParams.get("studentId")

    if (!studentId) {
      return NextResponse.json(
        { message: "Student ID is required" },
        { status: 400 }
      )
    }

    // Fetch all meetings for the student
    const meetings = await Meeting.find({ student: studentId })
      .populate("counsellor", "firstName lastName specialization")
      .sort({ date: -1 })

    // Calculate sessions by month for the sessions progress chart
    const monthlyData: Record<string, number> = {}
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    
    // Initialize last 6 months
    const today = new Date()
    for (let i = 5; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1)
      const month = monthNames[date.getMonth()]
      monthlyData[month] = 0
    }

    // Count sessions per month
    meetings.forEach((meeting) => {
      const date = new Date(meeting.date)
      const month = monthNames[date.getMonth()]
      if (monthlyData.hasOwnProperty(month)) {
        monthlyData[month]++
      }
    })

    const sessionsData = Object.entries(monthlyData).map(([month, sessions]) => ({
      month,
      sessions,
    }))

    // Calculate career discovery progress (weeks)
    const progressData = [
      { week: "Week 1", progress: 20 },
      { week: "Week 2", progress: 35 },
      { week: "Week 3", progress: 50 },
      { week: "Week 4", progress: 65 },
    ]

    // Get upcoming sessions
    const upcomingSessions = meetings
      .filter((m) => new Date(m.date) > new Date() && m.status !== "cancelled")
      .slice(0, 3)
      .map((meeting) => ({
        id: meeting._id.toString(),
        counsellor: `${meeting.counsellor.firstName} ${meeting.counsellor.lastName}`,
        specialization: meeting.counsellor.specialization,
        date: new Date(meeting.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        time: meeting.time,
        status: meeting.status,
      }))

    // Get recent messages (placeholder - you can expand this with a Messages model)
    const recentMessages = [
      {
        id: 1,
        from: "Dr. Amanda Foster",
        message: "Great session today! Here's a follow-up resource...",
        time: "2h ago",
        unread: true,
      },
      {
        id: 2,
        from: "Lisa Thompson",
        message: "Looking forward to our next session next week.",
        time: "1d ago",
        unread: false,
      },
      {
        id: 3,
        from: "David Martinez",
        message: "Your portfolio is impressive. Let's discuss...",
        time: "3d ago",
        unread: false,
      },
    ]

    // Get student profile
    const student = await User.findById(studentId)

    // Calculate stats
    const totalSessions = meetings.length
    const completedSessions = meetings.filter((m) => m.status === "completed").length
    const nextSession = meetings.find((m) => new Date(m.date) > new Date() && m.status !== "cancelled")

    return NextResponse.json(
      {
        sessionsData,
        progressData,
        upcomingSessions,
        recentMessages,
        stats: {
          totalSessions,
          completedSessions,
          nextSession: nextSession
            ? {
                daysUntil: Math.ceil(
                  (new Date(nextSession.date).getTime() - new Date().getTime()) /
                    (1000 * 60 * 60 * 24)
                ),
                counsellor: `${nextSession.counsellor.firstName} ${nextSession.counsellor.lastName}`,
              }
            : null,
          profileStrength: 85,
          newMessages: 3,
        },
        careerRecommendations: [
          { id: 1, title: "Software Engineer", match: 92, reason: "Strong technical skills & problem-solving" },
          { id: 2, title: "Product Manager", match: 88, reason: "Good analytical & communication abilities" },
          { id: 3, title: "Data Analyst", match: 85, reason: "Excellent with data interpretation" },
        ],
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    return NextResponse.json(
      { message: "Failed to fetch dashboard data" },
      { status: 500 }
    )
  }
}
