"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, Users, BookOpen, ArrowRight, BarChart2, Calendar, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Summary {
  totalSessionsThisMonth: number;
  activeStudents: number;
  totalEarningsThisMonth: number;
  averageRating: string;
}

interface Trend {
  month: number;
  sessions: number;
}

interface UpcomingSession {
  id: string;
  studentName: string;
  sessionType: string;
  date: string;
  time: string;
  status: string;
}

/* ─── Shared styles ──────────────────────────────────────────── */
const pageBackground: React.CSSProperties = {
  background: "linear-gradient(135deg, #0a1628 0%, #0d1f3c 50%, #0a1628 100%)",
  minHeight: "100vh",
};

const glassCard: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(0,99,196,0.25)",
  backdropFilter: "blur(8px)",
  borderRadius: "1rem",
};

const iconBadge: React.CSSProperties = {
  width: 32,
  height: 32,
  borderRadius: 8,
  flexShrink: 0,
  background: "linear-gradient(135deg, rgba(0,99,196,0.3), rgba(0,74,147,0.2))",
  border: "1px solid rgba(0,99,196,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const MONTH_NAMES: Record<number, string> = {
  1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr",
  5: "May", 6: "Jun", 7: "Jul", 8: "Aug",
  9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec",
};

/* ─── Custom Tooltip ─────────────────────────────────────────── */
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "rgba(13,31,60,0.95)",
          border: "1px solid rgba(0,99,196,0.4)",
          borderRadius: 8,
          padding: "8px 14px",
        }}
      >
        <p style={{ color: "#60a5fa", fontSize: 12, fontWeight: 600 }}>
          {MONTH_NAMES[label] ?? label}
        </p>
        <p style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>
          {payload[0].value} sessions
        </p>
      </div>
    );
  }
  return null;
};

export default function CounsellorDashboard() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [trend, setTrend] = useState<Trend[]>([]);
  const [upcoming, setUpcoming] = useState<UpcomingSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) return;

    const parsedUser = JSON.parse(userData);
    const counsellorId = parsedUser?.id;
    if (!counsellorId) return;

    async function fetchData() {
      try {
        const [summaryRes, trendRes, upcomingRes] = await Promise.all([
          fetch(`/api/counsellor/dashboard-summary?counsellorId=${counsellorId}`),
          fetch(`/api/counsellor/sessions-trend?counsellorId=${counsellorId}`),
          fetch(`/api/counsellor/upcoming-sessions?counsellorId=${counsellorId}`),
        ]);

        setSummary(await summaryRes.json());
        setTrend(await trendRes.json());
        setUpcoming(await upcomingRes.json());
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  /* ─── Loading ────────────────────────────────────────────── */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={pageBackground}>
        <div className="flex items-center gap-3" style={{ color: "#64748b" }}>
          <div
            className="h-5 w-5 rounded-full border-2 animate-spin"
            style={{ borderColor: "rgba(0,99,196,0.4)", borderTopColor: "#0063c4" }}
          />
          <span className="text-sm">Loading Dashboard…</span>
        </div>
      </div>
    );
  }

  const trendWithNames = trend.map((t) => ({
    ...t,
    monthName: MONTH_NAMES[t.month] ?? t.month,
  }));

  const isConfirmed = (status: string) =>
    status.toLowerCase() === "confirmed";

  return (
    <div className="min-h-screen p-6 space-y-6" style={pageBackground}>
      {/* ── Ambient blobs ── */}
      <div
        className="pointer-events-none fixed -top-32 -left-32 h-96 w-96 rounded-full blur-3xl -z-10"
        style={{ background: "rgba(0,99,196,0.2)" }}
      />
      <div
        className="pointer-events-none fixed -bottom-32 -right-32 h-96 w-96 rounded-full blur-3xl -z-10"
        style={{ background: "rgba(0,99,196,0.15)" }}
      />

      {/* ── Header ── */}
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Counsellor Dashboard</h1>
          <p className="text-sm mt-0.5" style={{ color: "#64748b" }}>
            Track sessions, students &amp; earnings
          </p>
        </div>
        <Link
          href="/counsellor/availability"
          className="flex items-center gap-2 px-4 h-9 rounded-xl text-sm font-semibold text-white no-underline"
          style={{
            background: "linear-gradient(135deg, #0063c4, #004a93)",
            boxShadow: "0 4px 20px rgba(0,99,196,0.4)",
          }}
        >
          <Clock className="h-4 w-4" />
          Manage Availability
        </Link>
      </div>

      {/* ── Stat Cards ── */}
      <div className="max-w-6xl mx-auto grid gap-4 sm:grid-cols-3">
        {/* Sessions */}
        <div style={glassCard} className="flex items-center justify-between p-6">
          <div>
            <p className="text-xs" style={{ color: "#64748b" }}>Sessions This Month</p>
            <p className="text-3xl font-bold text-white mt-1">
              {summary?.totalSessionsThisMonth ?? 0}
            </p>
          </div>
          <div
            style={{
              ...iconBadge,
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "rgba(0,99,196,0.15)",
              border: "1px solid rgba(0,99,196,0.3)",
            }}
          >
            <BookOpen className="h-5 w-5" style={{ color: "#60a5fa" }} />
          </div>
        </div>

        {/* Students */}
        <div style={glassCard} className="flex items-center justify-between p-6">
          <div>
            <p className="text-xs" style={{ color: "#64748b" }}>Active Students</p>
            <p className="text-3xl font-bold text-white mt-1">
              {summary?.activeStudents ?? 0}
            </p>
          </div>
          <div
            style={{
              ...iconBadge,
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "rgba(0,99,196,0.15)",
              border: "1px solid rgba(0,99,196,0.3)",
            }}
          >
            <Users className="h-5 w-5" style={{ color: "#60a5fa" }} />
          </div>
        </div>

        {/* Earnings */}
        <div style={glassCard} className="flex items-center justify-between p-6">
          <div>
            <p className="text-xs" style={{ color: "#64748b" }}>Earnings This Month</p>
            <p className="text-2xl font-bold text-white mt-1">
              Rs. {summary?.totalEarningsThisMonth ?? 0}
            </p>
          </div>
          <div
            style={{
              ...iconBadge,
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "rgba(0,99,196,0.15)",
              border: "1px solid rgba(0,99,196,0.3)",
            }}
          >
            <TrendingUp className="h-5 w-5" style={{ color: "#60a5fa" }} />
          </div>
        </div>
      </div>

      {/* ── Sessions Trend Chart ── */}
      <div className="max-w-6xl mx-auto" style={glassCard}>
        {/* Section header */}
        <div
          className="flex items-center gap-2 px-6 py-4"
          style={{ borderBottom: "1px solid rgba(0,99,196,0.15)" }}
        >
          <div style={iconBadge}>
            <BarChart2 className="h-4 w-4" style={{ color: "#60a5fa" }} />
          </div>
          <span className="text-sm font-semibold text-white">
            Sessions Trend (Last 6 Months)
          </span>
        </div>

        <div className="p-6">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={trendWithNames} barCategoryGap="35%">
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="rgba(0,99,196,0.15)"
              />
              <XAxis
                dataKey="monthName"
                tick={{ fill: "#64748b", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#64748b", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,99,196,0.08)" }} />
              <Bar
                dataKey="sessions"
                radius={[6, 6, 0, 0]}
                fill="#0063c4"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Upcoming Sessions ── */}
      <div className="max-w-6xl mx-auto" style={glassCard}>
        {/* Section header */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: "1px solid rgba(0,99,196,0.15)" }}
        >
          <div className="flex items-center gap-2">
            <div style={iconBadge}>
              <Calendar className="h-4 w-4" style={{ color: "#60a5fa" }} />
            </div>
            <span className="text-sm font-semibold text-white">Upcoming Sessions</span>
          </div>
          {/* Badge count */}
          <span
            className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
            style={{
              background: "rgba(0,99,196,0.25)",
              border: "1px solid rgba(0,99,196,0.4)",
              color: "#60a5fa",
            }}
          >
            {upcoming.length}
          </span>
        </div>

        {/* Rows */}
        <div className="divide-y" style={{ borderColor: "rgba(0,99,196,0.1)" }}>
          {upcoming.length === 0 ? (
            <p className="px-6 py-5 text-sm" style={{ color: "#64748b" }}>
              No upcoming sessions.
            </p>
          ) : (
            upcoming.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between px-6 py-4"
              >
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold text-white">{session.studentName}</p>
                  <p className="text-xs" style={{ color: "#64748b" }}>{session.sessionType}</p>
                  <p className="text-xs" style={{ color: "#64748b" }}>
                    {session.date} at {session.time}
                  </p>
                </div>
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={
                    isConfirmed(session.status)
                      ? {
                          background: "rgba(16,185,129,0.12)",
                          border: "1px solid rgba(16,185,129,0.4)",
                          color: "#34d399",
                        }
                      : {
                          background: "rgba(0,99,196,0.15)",
                          border: "1px solid rgba(0,99,196,0.4)",
                          color: "#60a5fa",
                        }
                  }
                >
                  {session.status}
                </span>
              </div>
            ))
          )}
        </div>

        {/* View all button */}
        <div className="px-6 py-4" style={{ borderTop: "1px solid rgba(0,99,196,0.15)" }}>
          <Link
            href="/counsellor/my-sessions"
            className="flex items-center justify-center gap-2 w-full h-9 rounded-xl text-sm font-semibold no-underline"
            style={{
              border: "1px solid rgba(0,99,196,0.35)",
              background: "rgba(0,99,196,0.08)",
              color: "#60a5fa",
            }}
          >
            View All Sessions
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
