"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SessionCard } from "@/components/student/session-card";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Session {
  id: string;
  counsellorName: string;
  counsellorPhoto: string;
  counsellorSpecialization: string;
  date: Date;
  time: string;
  sessionType: string;
  duration: string;
  status: "upcoming" | "completed" | "cancelled";
  notes?: string;
  feedback?: {
    rating: number;
    comment: string;
  };
  joinLink?: string;
}

export default function MySessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const res = await fetch("/api/meetings/getMeeting");

        if (!res.ok) {
          throw new Error("Failed to fetch meetings");
        }

        const data = await res.json();

        const formatted: Session[] = data.map((meeting: any) => ({
          id: meeting._id,
          counsellorName: meeting.counsellor?.firstName || "Unknown",
          counsellorPhoto:
            meeting.counsellor?.photo || "/api/placeholder/48/48",
          counsellorSpecialization:
            meeting.counsellor?.specialization || "",
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
  }, []);

  // Divide sessions by status
  const upcomingSessions = sessions.filter(
    (s) => s.status === "upcoming"
  );

  const completedSessions = sessions.filter(
    (s) => s.status === "completed"
  );

  const cancelledSessions = sessions.filter(
    (s) => s.status === "cancelled"
  );

  const sortByDateDesc = (a: Session, b: Session) =>
    new Date(b.date).getTime() - new Date(a.date).getTime();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            My Sessions
          </h1>
          <p className="text-muted-foreground">
            Manage your past and upcoming counseling sessions
          </p>
        </div>
        <Button asChild>
          <Link href="/student/book-session" className="gap-2">
            <Calendar className="h-4 w-4" />
            Book New Session
          </Link>
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-muted/50 border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Upcoming Sessions
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {upcomingSessions.length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-muted-foreground opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/50 border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Completed Sessions
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {completedSessions.length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-muted-foreground opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Card className="border-border">
        <CardHeader className="border-b border-border">
          <CardTitle className="text-lg">Session History</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>

            {/* All */}
            <TabsContent value="all" className="space-y-4 mt-6">
              {sessions.length > 0 ? (
                sessions
                  .sort(sortByDateDesc)
                  .map((session) => (
                    <SessionCard key={session.id} session={session} />
                  ))
              ) : (
                <p className="text-center text-muted-foreground">
                  No sessions found
                </p>
              )}
            </TabsContent>

            {/* Upcoming */}
            <TabsContent value="upcoming" className="space-y-4 mt-6">
              {upcomingSessions.length > 0 ? (
                upcomingSessions
                  .sort(sortByDateDesc)
                  .map((session) => (
                    <SessionCard key={session.id} session={session} />
                  ))
              ) : (
                <p className="text-center text-muted-foreground">
                  No upcoming sessions
                </p>
              )}
            </TabsContent>

            {/* Completed */}
            <TabsContent value="completed" className="space-y-4 mt-6">
              {completedSessions.length > 0 ? (
                completedSessions
                  .sort(sortByDateDesc)
                  .map((session) => (
                    <SessionCard key={session.id} session={session} />
                  ))
              ) : (
                <p className="text-center text-muted-foreground">
                  No completed sessions
                </p>
              )}
            </TabsContent>

            {/* Cancelled */}
            <TabsContent value="cancelled" className="space-y-4 mt-6">
              {cancelledSessions.length > 0 ? (
                cancelledSessions
                  .sort(sortByDateDesc)
                  .map((session) => (
                    <SessionCard key={session.id} session={session} />
                  ))
              ) : (
                <p className="text-center text-muted-foreground">
                  No cancelled sessions
                </p>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}