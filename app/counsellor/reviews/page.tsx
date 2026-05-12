"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Star, CalendarDays } from "lucide-react";
import Link from "next/link";

interface Review {
  _id: string;
  student: {
    firstName: string;
    lastName: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

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

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [counsellorId, setCounsellorId] = useState<string | null>(null);

  // Get counsellor from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      const parsedUser = JSON.parse(userData);
      setCounsellorId(parsedUser?.id);
    }
  }, []);

  // Fetch reviews
  useEffect(() => {
    if (!counsellorId) return;

    const fetchReviews = async () => {
      try {
        const res = await fetch(`/api/reviews/getReviews?counsellorId=${counsellorId}`);
        const data = await res.json();

        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [counsellorId]);

  return (
    <div
      className="min-h-screen p-6 space-y-6"
      style={pageBackground}
    >
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
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/counsellor">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>

          <div>
            <h1 className="text-3xl font-bold text-white">
              Reviews & Feedback
            </h1>

            <p
              className="text-sm mt-1"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              View student feedback and ratings
            </p>
          </div>
        </div>

        <div
          className="h-10 w-10 flex items-center justify-center rounded-xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,99,196,0.3), rgba(0,74,147,0.2))",
            border: "1px solid rgba(0,99,196,0.4)",
          }}
        >
          <CalendarDays
            className="h-5 w-5"
            style={{ color: "#60a5fa" }}
          />
        </div>
      </div>

      {/* Main Card */}
      <div className="max-w-6xl mx-auto">
        <div style={glassCard}>
          {/* Card Header */}
          <div
            className="p-6 border-b"
            style={{
              borderColor: "rgba(0,99,196,0.15)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="h-10 w-10 flex items-center justify-center rounded-xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,99,196,0.3), rgba(0,74,147,0.2))",
                  border: "1px solid rgba(0,99,196,0.4)",
                }}
              >
                <Star
                  className="h-5 w-5"
                  style={{ color: "#60a5fa" }}
                />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white">
                  Feedback & Reviews
                </h2>

                <p
                  className="text-sm mt-1"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  Student experiences and ratings
                </p>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="p-6">
            {loading ? (
              <div
                className="flex items-center gap-3"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                <div
                  className="h-5 w-5 rounded-full border-2 border-t-transparent animate-spin"
                  style={{
                    borderColor: "rgba(0,99,196,0.4)",
                    borderTopColor: "#0063c4",
                  }}
                />

                <span className="text-sm">
                  Loading reviews...
                </span>
              </div>
            ) : reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div
                    key={review._id}
                    className="p-5 rounded-2xl space-y-4"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(0,99,196,0.2)",
                    }}
                  >
                    {/* Top */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      {/* Student */}
                      <div>
                        <p className="font-semibold text-white text-lg">
                          {review.student?.firstName}{" "}
                          {review.student?.lastName}
                        </p>

                        <p
                          className="text-xs mt-1"
                          style={{
                            color: "rgba(255,255,255,0.6)",
                          }}
                        >
                          Student
                        </p>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-2">
                        <div
                          className="flex items-center gap-1 text-lg"
                          style={{ color: "#facc15" }}
                        >
                          {"★".repeat(review.rating)}
                        </div>

                        <span
                          className="text-xs"
                          style={{
                            color: "rgba(255,255,255,0.65)",
                          }}
                        >
                          ({review.rating}/5)
                        </span>
                      </div>
                    </div>

                    {/* Comment */}
                    <p
                      className="leading-relaxed"
                      style={{
                        color: "rgba(255,255,255,0.8)",
                      }}
                    >
                      {review.comment}
                    </p>

                    {/* Date */}
                    <div
                      className="text-xs"
                      style={{
                        color: "rgba(255,255,255,0.5)",
                      }}
                    >
                      {new Date(review.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Star
                  className="h-14 w-14 mx-auto mb-4"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                />

                <p className="text-white font-medium">
                  No reviews yet
                </p>

                <p
                  className="text-sm mt-1"
                  style={{
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  Student feedback will appear here
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}