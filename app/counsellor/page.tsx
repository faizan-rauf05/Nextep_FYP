"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, DollarSign, BookOpen, ArrowRight } from "lucide-react";
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

export default function CounsellorDashboard() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [trend, setTrend] = useState<Trend[]>([]);
  const [upcoming, setUpcoming] = useState<UpcomingSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (!userData) return;

    const parsedUser = JSON.parse(userData);
    console.log(parsedUser);
    const counsellorId = parsedUser?.id;

    console.log(counsellorId);

    if (!counsellorId) return;

    async function fetchData() {
      try {
        const summaryRes = await fetch(
          `/api/counsellor/dashboard-summary?counsellorId=${counsellorId}`,
        );
        const summaryData = await summaryRes.json();

        const trendRes = await fetch(
          `/api/counsellor/sessions-trend?counsellorId=${counsellorId}`,
        );
        const trendData = await trendRes.json();

        const upcomingRes = await fetch(
          `/api/counsellor/upcoming-sessions?counsellorId=${counsellorId}`,
        );
        const upcomingData = await upcomingRes.json();

        setSummary(summaryData);
        setTrend(trendData);
        setUpcoming(upcomingData);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Loading Dashboard...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Counsellor Dashboard</h1>
          <p className="text-muted-foreground text-sm">
            Track sessions, students & earnings
          </p>
        </div>
        <Button asChild>
          <Link href="/counsellor/availability">
            <Clock className="h-4 w-4 mr-2" />
            Manage Availability
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Sessions This Month
              </p>
              <p className="text-2xl font-bold">
                {summary?.totalSessionsThisMonth || 0}
              </p>
            </div>
            <BookOpen className="h-8 w-8 text-muted-foreground" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Active Students</p>
              <p className="text-2xl font-bold">
                {summary?.activeStudents || 0}
              </p>
            </div>
            <Users className="h-8 w-8 text-muted-foreground" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Earnings This Month
              </p>
              <p className="text-2xl font-bold">
                Rs. {summary?.totalEarningsThisMonth || 0}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-muted-foreground" />
          </CardContent>
        </Card>
      </div>

      {/* Sessions Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Sessions Trend (Last 6 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sessions" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Upcoming Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Upcoming Sessions
            <Badge variant="secondary">{upcoming.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {upcoming.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No upcoming sessions.
            </p>
          ) : (
            upcoming.map((session) => (
              <div
                key={session.id}
                className="flex justify-between items-center border-b pb-3 last:border-0"
              >
                <div>
                  <p className="font-medium text-sm">{session.studentName}</p>
                  <p className="text-xs text-muted-foreground">
                    {session.sessionType}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {session.date} at {session.time}
                  </p>
                </div>
                <Badge variant="outline">{session.status}</Badge>
              </div>
            ))
          )}

          <Button variant="outline" className="w-full mt-3" asChild>
            <Link href="/counsellor/my-sessions">
              View All Sessions
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
