"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Briefcase, Users, Clock, CheckCircle2 } from "lucide-react";

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

export function CounsellorCard({
  counsellor,
  isSelected,
  onSelect,
}: CounsellorCardProps) {
  return (
    <Card
      className={`group relative mt-4 cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
        isSelected
          ? "ring-2 ring-primary border-primary shadow-lg"
          : "hover:border-primary/50"
      }`}
      onClick={() => onSelect(counsellor.id)}
    >
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-3 right-3 z-10">
          <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground">
            <CheckCircle2 className="h-4 w-4" />
          </div>
        </div>
      )}

      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          {/* Image Area */}
          <div className="relative w-full sm:w-44 h-48 sm:h-auto flex-shrink-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-primary/10 blur-2xl" />
            <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-accent/10 blur-2xl" />
            
            {/* Avatar */}
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <Avatar className="h-28 w-28 sm:h-32 sm:w-32 ring-4 ring-card shadow-xl transition-transform duration-300 group-hover:scale-105">
                {counsellor.photo ? (
                  <AvatarImage
                    src={counsellor.photo}
                    alt={counsellor.name}
                    className="object-cover"
                  />
                ) : null}
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-semibold">
                  {counsellor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Rating badge on image */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 sm:bottom-4">
              <Badge className="bg-card/95 text-foreground backdrop-blur-sm shadow-md border-0 px-3 py-1">
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="font-medium">{counsellor.rating?.toFixed(1) || "N/A"}</span>
                <span className="text-muted-foreground ml-1">({counsellor.totalReviews})</span>
              </Badge>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-5 sm:p-6">
            {/* Header */}
            <div className="mb-3">
              <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                {counsellor.name}
              </h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                <Briefcase className="h-3.5 w-3.5" />
                {counsellor.specialization}
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Users className="h-4 w-4 text-primary/70" />
                <span>{counsellor.experience}+ years exp</span>
              </div>
            </div>

            {/* Bio */}
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
              {counsellor.bio}
            </p>

            {/* Availability */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>Available slots</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {counsellor.availability?.slice(0, 3).map((slot) => (
                  <Badge
                    key={slot}
                    variant="secondary"
                    className="text-xs font-normal px-2 py-0.5"
                  >
                    {slot}
                  </Badge>
                ))}
                {counsellor.availability?.length > 3 && (
                  <Badge
                    variant="outline"
                    className="text-xs font-normal px-2 py-0.5"
                  >
                    +{counsellor.availability.length - 3} more
                  </Badge>
                )}
              </div>
            </div>

            {/* Selected state footer */}
            {isSelected && (
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-medium text-primary">
                  Selected Counsellor
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
