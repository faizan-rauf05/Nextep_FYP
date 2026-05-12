"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { SessionDetailModal } from "@/components/counsellor/session-detail-modal";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Search, Calendar, CalendarDays } from "lucide-react";

interface Session {
  id: string;
  studentName: string;
  studentEmail: string;
  date: Date;
  time: string;
  sessionType: string;
  duration: string;
  status: "upcoming" | "completed" | "cancelled";
  notes?: string;
  joinLink?: string;
}

type FilterStatus = "all" | "upcoming" | "completed" | "cancelled";

/* ─── Shared Styles ───────────────────────── */
const glassCard: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(0,99,196,0.25)",
  backdropFilter: "blur(8px)",
  borderRadius: "1rem",
};

const pageBackground: React.CSSProperties = {
  background: "linear-gradient(135deg, #0a1628 0%, #0d1f3c 50%, #0a1628 100%)",
  minHeight: "100vh",
};

export default function CounsellorMySessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch sessions
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) return;

        const userData = JSON.parse(storedUser);
        const counsellorId = userData.id || userData._id;

        const res = await fetch(
          `/api/meetings/getCounsellorMeetings?counsellorId=${counsellorId}`,
        );

        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        const formatted: Session[] = data.map((meeting: any) => ({
          id: meeting._id,
          studentName: `${meeting.student?.firstName || ""} ${meeting.student?.lastName || ""}`,
          studentEmail: meeting.student?.email || "",
          date: new Date(meeting.date),
          time: meeting.time,
          sessionType: meeting.sessionType,
          duration: meeting.sessionDuration,
          status: meeting.status === "scheduled" ? "upcoming" : meeting.status,
          notes: meeting.notes || "",
          joinLink: meeting.meetingLink || "",
        }));

        setSessions(formatted);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  // Update session status
  const updateSessionStatus = async (sessionId: string, status: string) => {
    try {
      const res = await fetch("/api/meetings/updateStatus", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          meetingId: sessionId,
          status,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setSessions((prev) =>
        prev.map((s) =>
          s.id === sessionId ? { ...s, status: status as any } : s,
        ),
      );
    } catch (error) {
      console.error("Error updating session:", error);
    }
  };

  // Stats
  const upcomingSessions = sessions.filter(
    (s) => s.status === "upcoming",
  ).length;

  const completedSessions = sessions.filter(
    (s) => s.status === "completed",
  ).length;

  // Filtering
  const filteredSessions = useMemo(() => {
    let filtered = sessions;

    if (filterStatus !== "all") {
      filtered = filtered.filter((s) => s.status === filterStatus);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (s) =>
          s.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.studentEmail.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    return filtered;
  }, [sessions, filterStatus, searchQuery]);

  // Sort upcoming first
  const sortedSessions = [...filteredSessions].sort((a, b) => {
    if (a.status === "upcoming" && b.status !== "upcoming") return -1;
    if (a.status !== "upcoming" && b.status === "upcoming") return 1;

    return b.date.getTime() - a.date.getTime();
  });

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={pageBackground}
      >
        <div className="flex items-center gap-3" style={{ color: "#64748b" }}>
          <div
            className="h-5 w-5 rounded-full border-2 border-t-transparent animate-spin"
            style={{
              borderColor: "rgba(0,99,196,0.4)",
              borderTopColor: "#0063c4",
            }}
          />
          <span className="text-sm">Loading sessions...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 space-y-6" style={pageBackground}>
      {/* blobs */}
      <div
        className="pointer-events-none fixed -top-32 -left-32 h-96 w-96 rounded-full blur-3xl -z-10"
        style={{ background: "rgba(0,99,196,0.2)" }}
      />

      <div
        className="pointer-events-none fixed -bottom-32 -right-32 h-96 w-96 rounded-full blur-3xl -z-10"
        style={{ background: "rgba(0,99,196,0.15)" }}
      />

      {/* Header */}
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">My Sessions</h1>

          <p className="text-sm mt-1" style={{ color: "#64748b" }}>
            Manage and view your counselling sessions
          </p>
        </div>

        <div
          className="h-10 w-10 flex items-center justify-center rounded-xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,99,196,0.3), rgba(0,74,147,0.2))",
            border: "1px solid rgba(0,99,196,0.4)",
          }}
        >
          <CalendarDays className="h-5 w-5" style={{ color: "#60a5fa" }} />
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        <div style={glassCard} className="p-6">
          <p className="text-sm mb-2" style={{ color: "#64748b" }}>
            Upcoming Sessions
          </p>

          <h2 className="text-3xl font-bold text-white">{upcomingSessions}</h2>
        </div>

        <div style={glassCard} className="p-6">
          <p className="text-sm mb-2" style={{ color: "#64748b" }}>
            Completed Sessions
          </p>

          <h2 className="text-3xl font-bold text-white">{completedSessions}</h2>
        </div>
      </div>

      {/* Main Card */}
      <div className="max-w-7xl mx-auto">
        <div style={glassCard}>
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex flex-col lg:flex-row gap-4 justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Session List
                </h2>

                <p className="text-sm mt-1" style={{ color: "#64748b" }}>
                  Track all your counselling meetings
                </p>
              </div>

              {/* Search */}
              <div className="relative w-full lg:w-80">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                  style={{ color: "#64748b" }}
                />

                <Input
                  placeholder="Search by student name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11 text-white border-0"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(0,99,196,0.3)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs
            value={filterStatus}
            onValueChange={(v) => setFilterStatus(v as FilterStatus)}
          >
            <div className="px-6 pt-6">
              <TabsList
                className="grid w-full grid-cols-4 p-1"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(0,99,196,0.2)",
                }}
              >
                <TabsTrigger
                  className="
    text-white
    data-[state=active]:text-white
    data-[state=active]:bg-[#0063c4]
    data-[state=active]:shadow-none
    rounded-lg
    transition-all
  "
                  value="all"
                >
                  All
                </TabsTrigger>
                <TabsTrigger className="
    text-white
    data-[state=active]:text-white
    data-[state=active]:bg-[#0063c4]
    data-[state=active]:shadow-none
    rounded-lg
    transition-all
  " value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger className="
    text-white
    data-[state=active]:text-white
    data-[state=active]:bg-[#0063c4]
    data-[state=active]:shadow-none
    rounded-lg
    transition-all
  " value="completed">Completed</TabsTrigger>
                <TabsTrigger className="
    text-white
    data-[state=active]:text-white
    data-[state=active]:bg-[#0063c4]
    data-[state=active]:shadow-none
    rounded-lg
    transition-all
  " value="cancelled">Cancelled</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={filterStatus} className="mt-0">
              {sortedSessions.length > 0 ? (
                <div className="overflow-x-auto p-6">
                  <div
                    className="rounded-2xl overflow-hidden"
                    style={{
                      border: "1px solid rgba(0,99,196,0.2)",
                      background: "rgba(255,255,255,0.02)",
                    }}
                  >
                    <Table>
                      <TableHeader>
                        <TableRow
                          style={{
                            borderBottom: "1px solid rgba(0,99,196,0.15)",
                          }}
                        >
                          <TableHead className="text-white">Student</TableHead>

                          <TableHead className="text-white">Date</TableHead>

                          <TableHead className="text-white">Time</TableHead>

                          <TableHead className="text-white">Session</TableHead>

                          <TableHead className="text-white">Status</TableHead>

                          <TableHead className="text-right text-slate-400">
                            Actions
                          </TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        {sortedSessions.map((session) => (
                          <TableRow
                            key={session.id}
                            className="border-white/5 hover:bg-white/[0.03]"
                          >
                            <TableCell className="text-white font-medium">
                              <div>
                                <p>{session.studentName}</p>

                                <p
                                  className="text-xs mt-1"
                                  style={{ color: "#64748b" }}
                                >
                                  {session.studentEmail}
                                </p>
                              </div>
                            </TableCell>

                            <TableCell className="text-white">
                              {session.date.toDateString()}
                            </TableCell>

                            <TableCell className="text-white">
                              {session.time}
                            </TableCell>

                            <TableCell className="text-white">
                              {session.sessionType}
                            </TableCell>

                            <TableCell>
                              <span
                                className="px-3 py-1 rounded-full text-xs font-medium capitalize"
                                style={
                                  session.status === "upcoming"
                                    ? {
                                        background: "rgba(59,130,246,0.15)",
                                        border:
                                          "1px solid rgba(59,130,246,0.3)",
                                        color: "#60a5fa",
                                      }
                                    : session.status === "completed"
                                      ? {
                                          background: "rgba(16,185,129,0.15)",
                                          border:
                                            "1px solid rgba(16,185,129,0.3)",
                                          color: "#34d399",
                                        }
                                      : {
                                          background: "rgba(239,68,68,0.15)",
                                          border:
                                            "1px solid rgba(239,68,68,0.3)",
                                          color: "#f87171",
                                        }
                                }
                              >
                                {session.status}
                              </span>
                            </TableCell>

                            <TableCell className="text-right space-x-2">
                              {session.joinLink &&
                                session.status === "upcoming" && (
                                  <Button
                                    size="sm"
                                    onClick={() =>
                                      window.open(session.joinLink, "_blank")
                                    }
                                    className="text-white border-0"
                                    style={{
                                      background:
                                        "linear-gradient(135deg, #0063c4, #004a93)",
                                      boxShadow:
                                        "0 4px 20px rgba(0,99,196,0.4)",
                                    }}
                                  >
                                    Join
                                  </Button>
                                )}

                              {session.status === "upcoming" && (
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  onClick={() =>
                                    updateSessionStatus(session.id, "completed")
                                  }
                                  className="bg-white/10 text-white hover:bg-white/20"
                                >
                                  Complete
                                </Button>
                              )}

                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedSession(session);
                                  setModalOpen(true);
                                }}
                                className="border-white/10 bg-transparent text-white hover:bg-white/10"
                              >
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              ) : (
                <div className="text-center py-20">
                  <Calendar
                    className="h-14 w-14 mx-auto mb-4"
                    style={{ color: "#64748b" }}
                  />

                  <p className="text-white font-medium">No sessions found</p>

                  <p className="text-sm mt-1" style={{ color: "#64748b" }}>
                    Try adjusting your filters or search
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Modal */}
      {selectedSession && (
        <SessionDetailModal
          session={selectedSession}
          open={modalOpen}
          onOpenChange={setModalOpen}
        />
      )}
    </div>
  );
}
