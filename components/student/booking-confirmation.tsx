"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Briefcase } from "lucide-react";
import { format } from "date-fns";

interface BookingConfirmationProps {
  counsellor: {
    name: string;
    photo?: string;
    specialization: string;
    sessionPrice: number;
  };
  date: Date | null;
  time: string | null;
  sessionType: {
    title: string;
    duration: string;
    price: number;
  };
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

/* 🔥 DARK GLASS STYLE */
const glassCard = {
  background: "rgba(15, 23, 42, 0.75)",
  border: "1px solid rgba(96,165,250,0.18)",
  backdropFilter: "blur(14px)",
  borderRadius: "1rem",
};

export function BookingConfirmation({
  counsellor,
  date,
  time,
  sessionType,
  onConfirm,
  onCancel,
  isLoading,
}: BookingConfirmationProps) {
  return (
    <div className="space-y-4 text-white">

      {/* BOOKING CARD */}
      <div style={glassCard} className="p-5 space-y-5">

        {/* Title */}
        <h2 className="text-lg font-semibold text-slate-100">
          Booking Summary
        </h2>

        {/* Counsellor */}
        <div className="flex gap-4 items-center pb-4 border-b border-slate-700/40">
          <Avatar className="h-12 w-12">
            <AvatarImage src={counsellor.photo} />
            <AvatarFallback className="bg-slate-800 text-slate-200">
              {counsellor.name?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div>
            <h4 className="font-semibold text-slate-100">
              {counsellor.name}
            </h4>
            <p className="text-sm text-slate-400">
              {counsellor.specialization}
            </p>
          </div>
        </div>

        {/* DETAILS */}
        <div className="space-y-3 text-sm">

          <div className="flex items-center gap-3 text-slate-300">
            <Calendar className="h-4 w-4 text-blue-400" />
            <span>
              {date
                ? format(date, "EEEE, MMMM dd, yyyy")
                : "Not selected"}
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-300">
            <Clock className="h-4 w-4 text-blue-400" />
            <span>{time || "Not selected"}</span>
          </div>

          <div className="flex items-center gap-3 text-slate-300">
            <Briefcase className="h-4 w-4 text-blue-400" />
            <div>
              <span className="font-medium text-slate-100">
                {sessionType.title}
              </span>
              <span className="text-slate-400 ml-2">
                ({sessionType.duration})
              </span>
            </div>
          </div>
        </div>

        {/* PRICE */}
        <div className="pt-4 border-t border-slate-700/40 space-y-2 text-sm">

          <div className="flex justify-between text-slate-400">
            <span>Session Price</span>
            <span className="text-slate-200">Rs. {sessionType.price}</span>
          </div>

          <div className="flex justify-between text-slate-400">
            <span>Platform Fee</span>
            <span className="text-slate-200">Rs. 50</span>
          </div>

          <div className="flex justify-between pt-2 border-t border-slate-700/40 font-semibold">
            <span className="text-blue-400">Total</span>
            <span className="text-white">
              Rs. {sessionType.price + 50}
            </span>
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-3 pt-2">
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1 bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800"
        >
          Cancel
        </Button>

        <Button
          onClick={onConfirm}
          disabled={isLoading}
          className="flex-1 text-white bg-gradient-to-r from-blue-600 to-blue-800"
        >
          {isLoading ? "Confirming..." : "Confirm Booking"}
        </Button>
      </div>
    </div>
  );
}