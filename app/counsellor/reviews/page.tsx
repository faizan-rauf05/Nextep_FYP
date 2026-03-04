"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Star } from "lucide-react";
import Link from "next/link";

interface Review {
  _id: string;
  student: { firstName: string; lastName: string };
  rating: number;
  comment: string;
  createdAt: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const userData = localStorage.getItem("user");

  if (!userData) return;

  const parsedUser = JSON.parse(userData);
  console.log(parsedUser);
  const counsellorId = parsedUser?.id;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`/api/reviews/${counsellorId}`);
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
              {reviews.map((r) => (
                <div key={r._id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">
                      {r.student.firstName} {r.student.lastName}
                    </p>
                    <p className="text-yellow-500">{"★".repeat(r.rating)}</p>
                  </div>
                  <p className="text-muted-foreground mt-1">{r.comment}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No reviews yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
