"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Video, Eye, X } from "lucide-react";
import { SessionDetailModal } from "./session-detail-modal";

interface Session {
  id: string;
  counsellorName: string;
  counsellorPhoto: string;
  counsellorSpecialization: string;
  date: Date;
  time: string;
  sessionType: string;
  duration: string;
  status: "scheduled" | "completed" | "cancelled" | "upcoming";
  notes?: string;
  feedback?: { rating: number; comment: string };
  joinLink?: string;
}

interface SessionCardProps {
  session: Session;
  onCancel?: (id: string) => void;
}

const STATUS_STYLES: Record<string, React.CSSProperties> = {
  scheduled: {
    background: "rgba(0,99,196,0.2)",
    border: "1px solid rgba(0,99,196,0.5)",
    color: "#60a5fa",
  },
  upcoming: {
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

const getStatusLabel = (status: string) => {
  switch (status) {
    case "upcoming":    return "Upcoming";
    case "scheduled":   return "Scheduled";
    case "completed":   return "Completed";
    case "cancelled":   return "Cancelled";
    default:            return status;
  }
};

export function SessionCard({ session, onCancel }: SessionCardProps) {
  console.log("session", session);
  const [showDetail, setShowDetail] = useState(false);

  const formattedDate = session.date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const statusStyle = STATUS_STYLES[session.status] ?? STATUS_STYLES.scheduled;

  return (
    <>
      <div
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(0,99,196,0.2)",
          backdropFilter: "blur(8px)",
          borderRadius: "0.875rem",
          padding: "1.25rem",
          transition: "border 0.2s ease, background 0.2s ease",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.border = "1px solid rgba(0,99,196,0.45)";
          el.style.background = "rgba(0,99,196,0.06)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.border = "1px solid rgba(0,99,196,0.2)";
          el.style.background = "rgba(255,255,255,0.04)";
        }}
      >
        <div className="flex gap-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <Avatar
              className="h-12 w-12"
              style={{ border: "2px solid rgba(0,99,196,0.35)" }}
            >
              <AvatarImage src={session.counsellorPhoto} />
              <AvatarFallback
                style={{
                  background: "rgba(0,99,196,0.2)",
                  color: "#60a5fa",
                  fontWeight: 600,
                  fontSize: 13,
                }}
              >
                {session.counsellorName.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Session Info */}
          <div className="flex-1 min-w-0">

            {/* Name + status */}
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <p style={{ fontWeight: 600, color: "#ffffff", fontSize: 14, margin: 0 }}>
                  {session.counsellorName}
                </p>
                <p style={{ fontSize: 12, color: "#60a5fa", margin: "2px 0 0" }}>
                  {session.counsellorSpecialization}
                </p>
              </div>
              <span
                style={{
                  ...statusStyle,
                  fontSize: 11, fontWeight: 600,
                  padding: "4px 10px", borderRadius: 99,
                  whiteSpace: "nowrap", flexShrink: 0,
                  textTransform: "capitalize",
                }}
              >
                {getStatusLabel(session.status)}
              </span>
            </div>

            {/* Date + time */}
            <div style={{ marginBottom: "0.875rem" }} className="space-y-1">
              <div className="flex items-center gap-2" style={{ fontSize: 12, color: "#64748b" }}>
                <Calendar className="h-3.5 w-3.5" style={{ flexShrink: 0 }} />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2" style={{ fontSize: 12, color: "#64748b" }}>
                <Clock className="h-3.5 w-3.5" style={{ flexShrink: 0 }} />
                <span>{session.time} • {session.duration}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 flex-wrap">

              {/* Join Session */}
              {session.joinLink && (
                <button
                  disabled={session.status !== "scheduled"}
                  onClick={() => window.open(session.joinLink!, "_blank")}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "7px 14px", borderRadius: "0.5rem",
                    fontSize: 12, fontWeight: 600, cursor: session.status === "scheduled" ? "pointer" : "not-allowed",
                    border: "none",
                    background: session.status === "scheduled"
                      ? "linear-gradient(135deg, #0063c4, #004a93)"
                      : "rgba(255,255,255,0.05)",
                    color: session.status === "scheduled" ? "#ffffff" : "#4a5568",
                    boxShadow: session.status === "scheduled" ? "0 4px 14px rgba(0,99,196,0.35)" : "none",
                    transition: "all 0.2s ease",
                  }}
                >
                  <Video size={13} />
                  {session.status === "scheduled" ? "Join Session" : "Session Completed"}
                </button>
              )}

              {/* View Details */}
              <button
                onClick={() => setShowDetail(true)}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "7px 14px", borderRadius: "0.5rem",
                  fontSize: 12, fontWeight: 600, cursor: "pointer",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(0,99,196,0.3)",
                  color: "#60a5fa",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = "rgba(0,99,196,0.12)";
                  el.style.border = "1px solid rgba(0,99,196,0.5)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = "rgba(255,255,255,0.05)";
                  el.style.border = "1px solid rgba(0,99,196,0.3)";
                }}
              >
                <Eye size={13} />
                {session.status === "scheduled" ? "View Details" : "View Session"}
              </button>

              {/* Cancel */}
              {session.status === "scheduled" && (
                <button
                  onClick={() => {
                    const confirmed = window.confirm("Are you sure you want to cancel this meeting?");
                    if (confirmed) onCancel?.(session.id);
                  }}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "7px 14px", borderRadius: "0.5rem",
                    fontSize: 12, fontWeight: 600, cursor: "pointer",
                    background: "rgba(239,68,68,0.1)",
                    border: "1px solid rgba(239,68,68,0.3)",
                    color: "#f87171",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.background = "rgba(239,68,68,0.2)";
                    el.style.border = "1px solid rgba(239,68,68,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.background = "rgba(239,68,68,0.1)";
                    el.style.border = "1px solid rgba(239,68,68,0.3)";
                  }}
                >
                  <X size={13} />
                  Cancel Meeting
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <SessionDetailModal
        session={session}
        open={showDetail}
        onOpenChange={setShowDetail}
      />
    </>
  );
}