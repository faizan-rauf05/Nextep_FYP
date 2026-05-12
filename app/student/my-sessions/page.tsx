"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SessionCard } from "@/components/student/session-card";
import { Calendar, Clock, ListFilter } from "lucide-react";
import Link from "next/link";

interface Session {
  id: string;
  counsellorId: string;
  counsellorName: string;
  counsellorPhoto: string;
  counsellorSpecialization: string;
  date: Date;
  time: string;
  sessionType: string;
  duration: string;
  status: "scheduled" | "completed" | "cancelled";
  joinLink?: string;
}

/* ─── Shared styles ──────────────────────────────────────────── */
const glassCard: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(0,99,196,0.25)",
  backdropFilter: "blur(8px)",
  borderRadius: "1rem",
};

export default function MySessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [studentId, setStudentId] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setStudentId(userData.id);
    }
  }, []);

  useEffect(() => {
    if (!studentId) return;
    const fetchMeetings = async () => {
      try {
        const res = await fetch(`/api/meetings/getMeeting?studentId=${studentId}`);
        if (!res.ok) throw new Error("Failed to fetch meetings");
        const data = await res.json();
        const formatted: Session[] = data.map((meeting: any) => ({
          id: meeting._id,
          counsellorId: meeting.counsellor?._id,
          counsellorName: meeting.counsellor?.firstName || "Unknown",
          counsellorPhoto: meeting.counsellor?.photo || "/api/placeholder/48/48",
          counsellorSpecialization: meeting.counsellor?.specialization || "",
          date: new Date(meeting.date),
          time: meeting.time,
          sessionType: meeting.sessionType,
          duration: meeting.sessionDuration,
          status: meeting.status,
          joinLink: meeting.meetingLink,
        }));
        setSessions(formatted);
      } catch (error) {
        console.error("Fetch meetings error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMeetings();
  }, [studentId]);

  const handleCancelMeeting = async (meetingId: string) => {
    try {
      const res = await fetch("/api/meetings/updateMeeting", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: meetingId, status: "cancelled" }),
      });
      if (!res.ok) throw new Error("Failed to cancel meeting");
      setSessions((prev) =>
        prev.map((session) =>
          session.id === meetingId ? { ...session, status: "cancelled" } : session
        )
      );
      alert("Meeting cancelled successfully");
    } catch (error) {
      console.error(error);
      alert("Error cancelling meeting");
    }
  };

  const upcomingSessions = sessions.filter((s) => s.status === "scheduled");
  const completedSessions = sessions.filter((s) => s.status === "completed");
  const cancelledSessions = sessions.filter((s) => s.status === "cancelled");
  const sortByDateDesc = (a: Session, b: Session) => b.date.getTime() - a.date.getTime();

  /* ─── Loading ────────────────────────────────────────────── */
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
          <p style={{ color: "#64748b" }}>Loading sessions…</p>
        </div>
      </div>
    );
  }

  /* ─── Empty state helper ─────────────────────────────────── */
  const EmptyState = ({ message }: { message: string }) => (
    <div className="flex flex-col items-center justify-center py-12 space-y-3">
      <div
        className="h-12 w-12 flex items-center justify-center rounded-full"
        style={{ background: "rgba(0,99,196,0.1)", border: "1px solid rgba(0,99,196,0.25)" }}
      >
        <Calendar className="h-5 w-5" style={{ color: "#60a5fa" }} />
      </div>
      <p className="text-sm" style={{ color: "#64748b" }}>{message}</p>
    </div>
  );

  return (
    <div
      className="min-h-screen p-6 space-y-6"
      style={{ background: "linear-gradient(135deg, #0a1628 0%, #0d1f3c 50%, #0a1628 100%)" }}
    >
      {/* ── Decorative blobs ── */}
      <div
        className="pointer-events-none fixed -top-32 -left-32 h-96 w-96 rounded-full blur-3xl -z-10"
        style={{ background: "rgba(0,99,196,0.2)" }}
      />
      <div
        className="pointer-events-none fixed -bottom-32 -right-32 h-96 w-96 rounded-full blur-3xl -z-10"
        style={{ background: "rgba(0,99,196,0.15)" }}
      />

      {/* ── Header ── */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">My Sessions</h1>
          <p className="text-sm mt-0.5" style={{ color: "#64748b" }}>
            Manage your past and upcoming counseling sessions
          </p>
        </div>
        <Button
          asChild
          className="text-white border-0 font-semibold"
          style={{
            background: "linear-gradient(135deg, #0063c4, #004a93)",
            boxShadow: "0 4px 20px rgba(0,99,196,0.4)",
          }}
        >
          <Link href="/student/book-session" className="gap-2 flex items-center">
            <Calendar className="h-4 w-4" />
            Book New Session
          </Link>
        </Button>
      </div>

      {/* ── Quick Stats ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Upcoming */}
        <div style={glassCard} className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium" style={{ color: "#64748b" }}>
                Upcoming Sessions
              </p>
              <p className="text-2xl font-bold text-white">{upcomingSessions.length}</p>
            </div>
            <div
              className="h-10 w-10 flex items-center justify-center rounded-lg"
              style={{
                background: "linear-gradient(135deg, rgba(0,99,196,0.3), rgba(0,74,147,0.2))",
                border: "1px solid rgba(0,99,196,0.4)",
              }}
            >
              <Calendar className="h-5 w-5" style={{ color: "#60a5fa" }} />
            </div>
          </div>
        </div>

        {/* Completed */}
        <div style={glassCard} className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium" style={{ color: "#64748b" }}>
                Completed Sessions
              </p>
              <p className="text-2xl font-bold text-white">{completedSessions.length}</p>
            </div>
            <div
              className="h-10 w-10 flex items-center justify-center rounded-lg"
              style={{
                background: "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.1))",
                border: "1px solid rgba(16,185,129,0.4)",
              }}
            >
              <Clock className="h-5 w-5" style={{ color: "#34d399" }} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Session History ── */}
      <div style={glassCard} className="p-6">
        {/* Section header */}
        <div className="flex items-center gap-2 mb-6">
          <div
            className="h-8 w-8 flex items-center justify-center rounded-lg"
            style={{
              background: "linear-gradient(135deg, rgba(0,99,196,0.3), rgba(0,74,147,0.2))",
              border: "1px solid rgba(0,99,196,0.4)",
            }}
          >
            <ListFilter className="h-4 w-4" style={{ color: "#60a5fa" }} />
          </div>
          <h2 className="font-semibold text-white">Session History</h2>
        </div>

        <Tabs defaultValue="all" className="w-full">
          {/* Tab triggers */}
          <TabsList
            className="grid w-full grid-cols-4 p-1 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(0,99,196,0.2)",
            }}
          >
            {[
              { value: "all", label: "All", count: sessions.length },
              { value: "upcoming", label: "Upcoming", count: upcomingSessions.length },
              { value: "completed", label: "Completed", count: completedSessions.length },
              { value: "cancelled", label: "Cancelled", count: cancelledSessions.length },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="rounded-lg text-xs font-medium transition-all data-[state=active]:text-white"
                style={
                  {
                    color: "#64748b",
                    "--tw-data-active-bg": "rgba(0,99,196,0.35)",
                  } as React.CSSProperties
                }
              >
                {tab.label}
                <span
                  className="ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold"
                  style={{
                    background: "rgba(0,99,196,0.2)",
                    color: "#60a5fa",
                  }}
                >
                  {tab.count}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tab content */}
          <TabsContent value="all" className="space-y-3 mt-6">
            {sessions.length > 0
              ? sessions.sort(sortByDateDesc).map((session) => (
                  <SessionCard key={session.id} session={session} onCancel={handleCancelMeeting} />
                ))
              : <EmptyState message="No sessions found" />}
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-3 mt-6">
            {upcomingSessions.length > 0
              ? upcomingSessions.sort(sortByDateDesc).map((session) => (
                  <SessionCard key={session.id} session={session} onCancel={handleCancelMeeting} />
                ))
              : <EmptyState message="No upcoming sessions" />}
          </TabsContent>

          <TabsContent value="completed" className="space-y-3 mt-6">
            {completedSessions.length > 0
              ? completedSessions.sort(sortByDateDesc).map((session) => (
                  <SessionCard key={session.id} session={session} />
                ))
              : <EmptyState message="No completed sessions" />}
          </TabsContent>

          <TabsContent value="cancelled" className="space-y-3 mt-6">
            {cancelledSessions.length > 0
              ? cancelledSessions.sort(sortByDateDesc).map((session) => (
                  <SessionCard key={session.id} session={session} />
                ))
              : <EmptyState message="No cancelled sessions" />}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}