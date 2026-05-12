"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Briefcase, Users } from "lucide-react";

interface CounsellorCardProps {
  counsellor: {
    id: string;
    name: string;
    photo?: string;
    specialization: string;
    experience: number;
    rating: number;
    totalReviews: number;
    availability: string[];
    sessionPrice: number;
    bio: string;
  };
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export function CounsellorCard({ counsellor, isSelected, onSelect }: CounsellorCardProps) {
  console.log("counsellor", counsellor);

  return (
    <div
      className="mt-4 cursor-pointer transition-all duration-200"
      onClick={() => onSelect(counsellor.id)}
      style={{
        background: isSelected
          ? "rgba(0,99,196,0.12)"
          : "rgba(255,255,255,0.04)",
        border: isSelected
          ? "1px solid rgba(0,99,196,0.6)"
          : "1px solid rgba(0,99,196,0.2)",
        backdropFilter: "blur(8px)",
        borderRadius: "1rem",
        padding: "1.5rem",
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          const el = e.currentTarget as HTMLDivElement;
          el.style.background = "rgba(0,99,196,0.08)";
          el.style.border = "1px solid rgba(0,99,196,0.4)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          const el = e.currentTarget as HTMLDivElement;
          el.style.background = "rgba(255,255,255,0.04)";
          el.style.border = "1px solid rgba(0,99,196,0.2)";
        }
      }}
    >
      <div className="flex gap-4">
        {/* Avatar */}
        <Avatar className="h-16 w-16 flex-shrink-0" style={{ border: "2px solid rgba(0,99,196,0.35)" }}>
          {counsellor.photo ? (
            <AvatarImage src={counsellor.photo} alt={counsellor.name} className="object-cover" />
          ) : null}
          <AvatarFallback
            style={{
              background: "rgba(0,99,196,0.2)",
              border: "1px solid rgba(0,99,196,0.3)",
              color: "#60a5fa",
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            {counsellor.name.split(" ").map((n) => n[0]).join("")}
          </AvatarFallback>
        </Avatar>

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h3 style={{ fontWeight: 600, color: "#ffffff", fontSize: 15, margin: 0 }}>
                {counsellor.name}
              </h3>
              <p
                className="flex items-center gap-1 mt-0.5"
                style={{ fontSize: 13, color: "#60a5fa" }}
              >
                <Briefcase className="h-3.5 w-3.5" />
                {counsellor.specialization}
              </p>
            </div>
          </div>

          {/* Rating and Experience */}
          <div className="flex items-center gap-4 mb-3" style={{ fontSize: 13 }}>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span style={{ color: "#64748b" }}>({counsellor.totalReviews})</span>
            </div>
            <div className="flex items-center gap-1" style={{ color: "#64748b" }}>
              <Users className="h-4 w-4" />
              <span>{counsellor.experience}+ years</span>
            </div>
          </div>

          {/* Bio */}
          <p
            className="mb-3 line-clamp-2"
            style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6 }}
          >
            {counsellor.bio}
          </p>

          {/* Availability badges */}
          <div className="flex flex-wrap gap-2 mb-3">
            {counsellor.availability?.slice(0, 3).map((slot) => (
              <span
                key={slot}
                style={{
                  fontSize: 11, fontWeight: 500,
                  padding: "4px 10px", borderRadius: 99,
                  background: "rgba(0,99,196,0.15)",
                  border: "1px solid rgba(0,99,196,0.3)",
                  color: "#60a5fa",
                }}
              >
                {slot}
              </span>
            ))}
            {counsellor.availability.length > 3 && (
              <span
                style={{
                  fontSize: 11, fontWeight: 500,
                  padding: "4px 10px", borderRadius: 99,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(0,99,196,0.2)",
                  color: "#64748b",
                }}
              >
                +{counsellor.availability.length - 3} more
              </span>
            )}
          </div>

          {/* Selection indicator */}
          {isSelected && (
            <div
              className="flex items-center justify-between mt-3 pt-3"
              style={{ borderTop: "1px solid rgba(0,99,196,0.25)" }}
            >
              <span style={{ fontSize: 13, fontWeight: 600, color: "#60a5fa" }}>
                ✓ Selected
              </span>
              <div
                style={{
                  height: 8, width: 8, borderRadius: "50%",
                  background: "#0063c4",
                  boxShadow: "0 0 6px rgba(0,99,196,0.8)",
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}