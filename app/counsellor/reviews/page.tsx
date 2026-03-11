"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Star } from "lucide-react";
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
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/counsellor">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>

        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Reviews & Feedback
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            View student feedback and ratings
          </p>
        </div>
      </div>

      {/* Reviews Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Feedback & Reviews
          </CardTitle>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Loading reviews...</p>
          ) : reviews.length > 0 ? (
            <div className="space-y-4">

              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="p-4 border rounded-lg space-y-2"
                >

                  {/* Student + Rating */}
                  <div className="flex justify-between items-center">

                    <div>
                      <p className="font-semibold">
                        {review.student?.firstName} {review.student?.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Student
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-yellow-500">
                      {"★".repeat(review.rating)}
                      <span className="text-xs text-muted-foreground ml-1">
                        ({review.rating}/5)
                      </span>
                    </div>

                  </div>

                  {/* Comment */}
                  <p className="text-muted-foreground">
                    {review.comment}
                  </p>

                  {/* Date */}
                  <p className="text-xs text-muted-foreground">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>

                </div>
              ))}

            </div>
          ) : (
            <p className="text-muted-foreground">
              No reviews yet.
            </p>
          )}
        </CardContent>
      </Card>

    </div>
  );
}