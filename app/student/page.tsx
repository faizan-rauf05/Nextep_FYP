"use client";

import { useEffect, useState } from "react";
import { StudentStatCard } from "@/components/student/stat-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Calendar, CheckCircle, Clock, TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type MeetingType = {
  _id: string;
  counsellor: {
    firstName: string;
    lastName: string;
    specialization: string;
  };
  date: string;
  time: string;
  status: "scheduled" | "completed" | "cancelled";
};

/* ─── Shared styles ──────────────────────────────────────────── */
const glassCard: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(0,99,196,0.25)",
  backdropFilter: "blur(8px)",
  borderRadius: "1rem",
};

const STATUS_COLORS: Record<string, React.CSSProperties> = {
  scheduled: {
    background: "rgba(0,99,196,0.2)",
    border: "1px solid rgba(0,99,196,0.5)",
    color: "#60a5fa",
  },
  completed: {
    background: "rgba(16,185,129,0.15)",
    border: "1px solid rgba(16,185,129,0.4)",
    color: "#34d399",
  },
  cancelled: {
    background: "rgba(239,68,68,0.15)",
    border: "1px solid rgba(239,68,68,0.4)",
    color: "#f87171",
  },
};

/* ─── Custom Tooltip for chart ───────────────────────────────── */
function CustomTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (active && payload && payload.length) {
    return (
      <div
        className="px-4 py-2 rounded-xl text-sm"
        style={{
          background: "#0d1f3c",
          border: "1px solid rgba(0,99,196,0.5)",
          color: "white",
        }}
      >
        <p style={{ color: "#60a5fa" }}>{label}</p>
        <p className="font-bold">{payload[0].value} sessions</p>
      </div>
    );
  }
  return null;
}

/* ─── Component ──────────────────────────────────────────────── */
export default function StudentDashboard() {
  const [studentId, setStudentId] = useState<string | null>(null);
  const [meetings, setMeetings] = useState<MeetingType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setStudentId(userData.id);
    }
  }, []);

  useEffect(() => {
    if (!studentId) return;
    fetchMeetings();
  }, [studentId]);

  const fetchMeetings = async () => {
    try {
      const res = await fetch(`/api/meetings/getMeeting?studentId=${studentId}`);
      const data = await res.json();
      setMeetings(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const totalSessions = meetings.length;
  const completedSessions = meetings.filter((m) => m.status === "completed").length;
  const upcomingSessions = meetings.filter(
    (m) => new Date(m.date) >= new Date() && m.status === "scheduled"
  );
  const nextSession = upcomingSessions[0];

  const chartData = [
    { name: "Completed", value: meetings.filter((m) => m.status === "completed").length },
    { name: "Scheduled", value: meetings.filter((m) => m.status === "scheduled").length },
    { name: "Cancelled", value: meetings.filter((m) => m.status === "cancelled").length },
  ];

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #0a1628 0%, #0d1f3c 50%, #0a1628 100%)" }}
      >
        <div className="text-center space-y-3">
          <div
            className="mx-auto h-10 w-10 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: "rgba(0,99,196,0.4)", borderTopColor: "#0063c4" }}
          />
          <p style={{ color: "#64748b" }}>Loading dashboard…</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-6 space-y-6"
      style={{ background: "linear-gradient(135deg, #0a1628 0%, #0d1f3c 50%, #0a1628 100%)" }}
    >
      {/* ── Decorative blobs ── */}
      <div className="pointer-events-none fixed -top-32 -left-32 h-96 w-96 rounded-full blur-3xl -z-10"
        style={{ background: "rgba(0,99,196,0.2)" }} />
      <div className="pointer-events-none fixed -bottom-32 -right-32 h-96 w-96 rounded-full blur-3xl -z-10"
        style={{ background: "rgba(0,99,196,0.15)" }} />

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Student Dashboard</h1>
          <p className="text-sm mt-0.5" style={{ color: "#64748b" }}>
            Overview of your sessions
          </p>
        </div>

        <Link href="/student/book-session">
  <Button
    className="text-white border-0 font-semibold"
    style={{
      background: "linear-gradient(135deg, #0063c4, #004a93)",
      boxShadow: "0 4px 20px rgba(0,99,196,0.4)",
    }}
  >
    <Calendar className="mr-2 h-4 w-4" />
    Book Session
  </Button>
</Link>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StudentStatCard
          title="Total Sessions"
          value={totalSessions.toString()}
          subtitle="All time bookings"
          icon={TrendingUp}
        />
        <StudentStatCard
          title="Completed"
          value={completedSessions.toString()}
          subtitle="Finished sessions"
          icon={CheckCircle}
        />
        <StudentStatCard
          title="Upcoming"
          value={upcomingSessions.length.toString()}
          subtitle="Scheduled sessions"
          icon={Clock}
        />
      </div>

      {/* ── Next Session ── */}
      <div style={glassCard} className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <div
            className="h-8 w-8 flex items-center justify-center rounded-lg"
            style={{ background: "linear-gradient(135deg, rgba(0,99,196,0.3), rgba(0,74,147,0.2))", border: "1px solid rgba(0,99,196,0.4)" }}
          >
            <Calendar className="h-4 w-4" style={{ color: "#60a5fa" }} />
          </div>
          <h2 className="font-semibold text-white">Next Session</h2>
        </div>

        {nextSession ? (
          <div
            className="flex justify-between items-center p-4 rounded-xl"
            style={{ background: "rgba(0,99,196,0.08)", border: "1px solid rgba(0,99,196,0.2)" }}
          >
            <div className="space-y-0.5">
              <p className="font-semibold text-sm text-white">
                {nextSession.counsellor.firstName} {nextSession.counsellor.lastName}
              </p>
              <p className="text-xs" style={{ color: "#60a5fa" }}>
                {nextSession.counsellor.specialization}
              </p>
              <p className="text-xs" style={{ color: "#64748b" }}>
                {new Date(nextSession.date).toLocaleDateString()} at {nextSession.time}
              </p>
            </div>
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold capitalize"
              style={STATUS_COLORS[nextSession.status]}
            >
              {nextSession.status}
            </span>
          </div>
        ) : (
          <p className="text-sm" style={{ color: "#64748b" }}>No upcoming sessions.</p>
        )}
      </div>

      {/* ── Chart ── */}
      <div style={glassCard} className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <div
            className="h-8 w-8 flex items-center justify-center rounded-lg"
            style={{ background: "linear-gradient(135deg, rgba(0,99,196,0.3), rgba(0,74,147,0.2))", border: "1px solid rgba(0,99,196,0.4)" }}
          >
            <TrendingUp className="h-4 w-4" style={{ color: "#60a5fa" }} />
          </div>
          <h2 className="font-semibold text-white">Meeting Status Overview</h2>
        </div>

        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,99,196,0.15)" />
              <XAxis
                dataKey="name"
                tick={{ fill: "#64748b", fontSize: 12 }}
                axisLine={{ stroke: "rgba(0,99,196,0.2)" }}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#0063c4"
                strokeWidth={3}
                dot={{ r: 6, fill: "#0063c4", stroke: "#60a5fa", strokeWidth: 2 }}
                activeDot={{ r: 8, fill: "#60a5fa" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Upcoming Sessions List ── */}
      <div style={glassCard} className="p-6">
        <div className="flex items-center gap-2 mb-5">
          <div
            className="h-8 w-8 flex items-center justify-center rounded-lg"
            style={{ background: "linear-gradient(135deg, rgba(0,99,196,0.3), rgba(0,74,147,0.2))", border: "1px solid rgba(0,99,196,0.4)" }}
          >
            <Clock className="h-4 w-4" style={{ color: "#60a5fa" }} />
          </div>
          <h2 className="font-semibold text-white">Upcoming Sessions</h2>
        </div>

        {upcomingSessions.length === 0 ? (
          <p className="text-sm" style={{ color: "#64748b" }}>No upcoming sessions.</p>
        ) : (
          <div className="space-y-3">
            {upcomingSessions.map((session, index) => (
              <div
                key={session._id}
                className="flex justify-between items-center p-4 rounded-xl transition-all duration-200"
                style={{
                  background: index % 2 === 0 ? "rgba(0,99,196,0.06)" : "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(0,99,196,0.15)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.border = "1px solid rgba(0,99,196,0.45)";
                  el.style.background = "rgba(0,99,196,0.1)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.border = "1px solid rgba(0,99,196,0.15)";
                  el.style.background = index % 2 === 0 ? "rgba(0,99,196,0.06)" : "rgba(255,255,255,0.02)";
                }}
              >
                <div className="space-y-0.5">
                  <p className="font-semibold text-sm text-white">
                    {session.counsellor.firstName} {session.counsellor.lastName}
                  </p>
                  <p className="text-xs" style={{ color: "#60a5fa" }}>
                    {session.counsellor.specialization}
                  </p>
                  <p className="text-xs" style={{ color: "#64748b" }}>
                    {new Date(session.date).toLocaleDateString()} at {session.time}
                  </p>
                </div>
                <span
                  className="px-3 py-1 rounded-full text-xs font-semibold capitalize"
                  style={STATUS_COLORS[session.status]}
                >
                  {session.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
