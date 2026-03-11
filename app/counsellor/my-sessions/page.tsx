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
import { Search, Calendar } from "lucide-react";

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
      <div className="text-center py-12">
        <p className="text-muted-foreground">Loading sessions...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">My Sessions</h1>
        <p className="text-muted-foreground">
          Manage and view your counselling sessions
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">
              Upcoming Sessions
            </p>
            <p className="text-2xl font-bold">{upcomingSessions}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">
              Completed Sessions
            </p>
            <p className="text-2xl font-bold">{completedSessions}</p>
          </CardContent>
        </Card>
      </div>

      {/* Sessions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Session List</CardTitle>

          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by student name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Tabs
            value={filterStatus}
            onValueChange={(v) => setFilterStatus(v as FilterStatus)}
          >
            <div className="border-b px-6 pt-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={filterStatus} className="mt-0">
              {sortedSessions.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Session</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {sortedSessions.map((session) => (
                        <TableRow key={session.id}>
                          <TableCell>{session.studentName}</TableCell>
                          <TableCell>{session.date.toDateString()}</TableCell>
                          <TableCell>{session.time}</TableCell>
                          <TableCell>{session.sessionType}</TableCell>
                          <TableCell>{session.status}</TableCell>

                          <TableCell className="text-right space-x-2">
                            {session.joinLink &&
                              session.status === "upcoming" && (
                                <Button
                                  size="sm"
                                  onClick={() =>
                                    window.open(session.joinLink, "_blank")
                                  }
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
                              >
                                Mark Completed
                              </Button>
                            )}

                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedSession(session);
                                setModalOpen(true);
                              }}
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p className="text-muted-foreground">No sessions found</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

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
