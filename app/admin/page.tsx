"use client";

import { useEffect, useState } from "react";
import {
  Users,
  UserCheck,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  PieChart as PieIcon,
  BarChart2,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/* ───────────── Types ───────────── */

interface Summary {
  totalStudents: number;
  totalCounsellors: number;
  totalMeetings: number;
  completedMeetings: number;
  cancelledMeetings: number;
}

/* ───────────── Component ───────────── */

export default function AdminDashboard() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/dashboard-summary");
        const data = await res.json();
        setSummary(data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Loading Dashboard...
      </div>
    );
  }

  const meetingStatusData = [
    { name: "Completed", value: summary?.completedMeetings || 0 },
    { name: "Cancelled", value: summary?.cancelledMeetings || 0 },
    {
      name: "Pending",
      value:
        (summary?.totalMeetings || 0) -
        (summary?.completedMeetings || 0) -
        (summary?.cancelledMeetings || 0),
    },
  ];

  const userData = [
    { name: "Students", value: summary?.totalStudents || 0 },
    { name: "Counsellors", value: summary?.totalCounsellors || 0 },
  ];

  const COLORS = ["#2563eb", "#22c55e", "#ef4444"];

  return (
    <div className="min-h-screen bg-white p-6 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 text-sm">
          System overview & analytics
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        <StatCard title="Students" value={summary?.totalStudents} icon={<Users />} />

        <StatCard title="Counsellors" value={summary?.totalCounsellors} icon={<UserCheck />} />

        <StatCard title="Total Meetings" value={summary?.totalMeetings} icon={<Calendar />} />

        <StatCard title="Completed" value={summary?.completedMeetings} icon={<CheckCircle2 />} />

        <StatCard title="Cancelled" value={summary?.cancelledMeetings} icon={<XCircle />} />

        <StatCard
          title="Pending"
          value={
            (summary?.totalMeetings || 0) -
            (summary?.completedMeetings || 0) -
            (summary?.cancelledMeetings || 0)
          }
          icon={<Clock />}
        />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Bar Chart */}
        <div className="border rounded-xl p-4 bg-white shadow-sm">
          <div className="flex items-center gap-2 mb-3 text-gray-800">
            <BarChart2 size={18} />
            <h2 className="text-sm font-semibold">User Distribution</h2>
          </div>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={userData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="border rounded-xl p-4 bg-white shadow-sm">
          <div className="flex items-center gap-2 mb-3 text-gray-800">
            <PieIcon size={18} />
            <h2 className="text-sm font-semibold">Meeting Status</h2>
          </div>

          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={meetingStatusData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {meetingStatusData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

/* ───────────── Stat Card ───────────── */

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value?: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="border rounded-xl p-4 flex justify-between items-center bg-white shadow-sm">

      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-2xl font-bold text-gray-900">
          {value || 0}
        </h2>
      </div>

      <div className="text-blue-600">
        {icon}
      </div>

    </div>
  );
}