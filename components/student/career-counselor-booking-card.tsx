"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Clock, Sparkles, Tag, Award } from "lucide-react";
import Link from "next/link";

export interface CareerCounselorData {
  id: string;
  name: string;
  role: string;
  image?: string;
  rating: number;
  reviewCount: number;
  description: string;
  tags: string[];
  availableToday: boolean;
  nextSlot?: string;
  isTopRated?: boolean;
  isRecommended?: boolean;
}

interface CareerCounselorBookingCardProps {
  counselor: CareerCounselorData;
  onBookSession?: (id: string) => void;
}

export function CareerCounselorBookingCard({
  counselor,
  onBookSession,
}: CareerCounselorBookingCardProps) {
  const initials = counselor.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="group relative bg-card rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/20">
      {/* Top Badge */}
      {(counselor.isTopRated || counselor.isRecommended) && (
        <div className="absolute top-4 left-4 z-10">
          <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground border-0 rounded-full px-3 py-1.5 text-xs font-semibold shadow-lg shadow-primary/20 flex items-center gap-1.5">
            {counselor.isTopRated ? (
              <>
                <Award className="h-3.5 w-3.5" />
                Top Rated
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5" />
                Recommended
              </>
            )}
          </Badge>
        </div>
      )}

      {/* Profile Section */}
      <div className="relative bg-gradient-to-br from-secondary via-muted to-secondary p-8 pb-12">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
          <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-accent/5 rounded-full blur-xl" />
        </div>

        {/* Avatar */}
        <div className="relative flex justify-center">
          <div className="relative">
            <Avatar className="h-28 w-28 border-4 border-card shadow-xl transition-transform duration-300 group-hover:scale-105">
              {counselor.image ? (
                <AvatarImage
                  src={counselor.image}
                  alt={counselor.name}
                  className="object-cover"
                />
              ) : null}
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-2xl font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            {/* Online indicator */}
            {counselor.availableToday && (
              <div className="absolute bottom-1 right-1 h-5 w-5 rounded-full bg-card flex items-center justify-center">
                <div className="h-3.5 w-3.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 pt-5 -mt-4 relative bg-card rounded-t-3xl">
        {/* Name & Role */}
        <div className="text-center mb-3">
          <h3 className="font-semibold text-foreground text-lg leading-tight">
            {counselor.name}
          </h3>
          <p className="text-sm text-primary font-medium mt-0.5">
            {counselor.role}
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-center gap-1.5 mb-4">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(counselor.rating)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-muted text-muted"
                }`}
              />
            ))}
          </div>
          <span className="font-semibold text-sm text-foreground">
            {counselor.rating.toFixed(1)}
          </span>
          <span className="text-xs text-muted-foreground">
            ({counselor.reviewCount} reviews)
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground text-center leading-relaxed line-clamp-2 mb-4">
          {counselor.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
          {counselor.tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="rounded-full px-3 py-1 text-xs font-medium bg-secondary/80 hover:bg-secondary transition-colors flex items-center gap-1"
            >
              <Tag className="h-3 w-3" />
              {tag}
            </Badge>
          ))}
          {counselor.tags.length > 3 && (
            <Badge
              variant="outline"
              className="rounded-full px-3 py-1 text-xs font-medium"
            >
              +{counselor.tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Availability */}
        <div className="flex items-center justify-center gap-2 mb-6 px-4 py-2.5 bg-secondary/50 rounded-xl">
          <Clock className="h-4 w-4 text-primary" />
          {counselor.availableToday ? (
            <span className="text-sm font-medium text-foreground">
              Available Today
              {counselor.nextSlot && (
                <span className="text-muted-foreground">
                  {" "}
                  &middot; Next: {counselor.nextSlot}
                </span>
              )}
            </span>
          ) : (
            <span className="text-sm text-muted-foreground">
              {counselor.nextSlot
                ? `Next Available: ${counselor.nextSlot}`
                : "Check availability"}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 rounded-xl font-medium h-11 border-border hover:bg-secondary hover:border-primary/20 transition-all"
            asChild
          >
            <Link href={`/counsellors/${counselor.id}`}>View Profile</Link>
          </Button>
          <Button
            className="flex-1 rounded-xl font-medium h-11 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
            onClick={() => onBookSession?.(counselor.id)}
          >
            Book Session
          </Button>
        </div>
      </div>
    </div>
  );
}
