"use client";

import { useEffect, useState } from "react";
import { StudentStatCard } from "@/components/student/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle, Clock } from "lucide-react";
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

export default function StudentDashboard() {
  const [studentId, setStudentId] = useState<string | null>(null);

  const [meetings, setMeetings] = useState<MeetingType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("storedUser", storedUser);
    if (storedUser) {
      const userData = JSON.parse(storedUser); // parse string to object
      console.log(userData.id);
      setStudentId(userData.id); // use _id from backend
    }
  }, []);

  useEffect(() => {
    if (!studentId) return; // wait until studentId is set
    fetchMeetings();
  }, [studentId]);

  const fetchMeetings = async () => {
    try {
      const res = await fetch(
        `/api/meetings/getMeeting?studentId=${studentId}`,
      );
      const data = await res.json();
      setMeetings(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ===== Simple Stats =====

  const totalSessions = meetings.length;

  const completedSessions = meetings?.filter(
    (m) => m.status === "completed",
  ).length;

  const upcomingSessions = meetings?.filter(
    (m) => new Date(m.date) >= new Date() && m.status === "scheduled",
  );

  // ===== Chart Data =====

  const completedCount = meetings?.filter(
    (m) => m.status === "completed",
  ).length;

  const scheduledCount = meetings?.filter(
    (m) => m.status === "scheduled",
  ).length;

  const cancelledCount = meetings?.filter(
    (m) => m.status === "cancelled",
  ).length;

  const chartData = [
    { name: "Completed", value: completedCount },
    { name: "Scheduled", value: scheduledCount },
    { name: "Cancelled", value: cancelledCount },
  ];

  const nextSession = upcomingSessions[0];

  if (loading) {
    return <p className="text-center mt-10">Loading dashboard...</p>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Student Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Overview of your sessions
          </p>
        </div>

        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          Book Session
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StudentStatCard
          title="Total Sessions"
          value={totalSessions.toString()}
          subtitle="All time bookings"
          icon={CheckCircle}
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

      {/* Next Session */}
      <Card>
        <CardHeader>
          <CardTitle>Next Session</CardTitle>
        </CardHeader>
        <CardContent>
          {nextSession ? (
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <p className="font-medium text-sm">
                  {nextSession.counsellor.firstName}{" "}
                  {nextSession.counsellor.lastName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {nextSession.counsellor.specialization}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(nextSession.date).toLocaleDateString()} at{" "}
                  {nextSession.time}
                </p>
              </div>
              <Badge>{nextSession.status}</Badge>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No upcoming sessions.
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Meeting Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#171717"
                  strokeWidth={3}
                  dot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* All Upcoming Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingSessions.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No upcoming sessions.
            </p>
          ) : (
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <div
                  key={session._id}
                  className="flex justify-between border-b pb-3"
                >
                  <div>
                    <p className="font-medium text-sm">
                      {session.counsellor.firstName}{" "}
                      {session.counsellor.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {session.counsellor.specialization}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(session.date).toLocaleDateString()} at{" "}
                      {session.time}
                    </p>
                  </div>
                  <Badge>{session.status}</Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
