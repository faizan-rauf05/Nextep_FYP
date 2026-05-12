"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Search, CalendarDays } from "lucide-react";
import { CounsellorCard } from "@/components/student/counsellor-select-card";
import { DateTimeSelection } from "@/components/student/date-time-selection";
import { SessionTypeSelection } from "@/components/student/session-type-selection";
import { BookingConfirmation } from "@/components/student/booking-confirmation";

type Counsellor = {
  id: string;
  name: string;
  email: string;
  headline: string;
  specializations: string[];
  availability: string[];
  pricePerSession: number;
  rating: number;
  photo: string;
  reviews: number;
  totalSessions: number;
  experience: number;
};

const SESSION_TYPES = {
  "career-guidance": {
    title: "Career Guidance",
    duration: "30 mins",
    price: 1000,
  },
  "resume-review": { title: "Resume Review", duration: "30 mins", price: 1000 },
  "interview-prep": {
    title: "Interview Preparation",
    duration: "45 mins",
    price: 1500,
  },
  "career-assessment": {
    title: "Career Assessment",
    duration: "60 mins",
    price: 2000,
  },
};

type Step =
  | "counsellor"
  | "datetime"
  | "sessiontype"
  | "confirmation"
  | "success";

/* ─── Shared styles ──────────────────────────────────────────── */
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

export default function BookSessionPage() {
  const [currentStep, setCurrentStep] = useState<Step>("counsellor");
  const [selectedCounsellorId, setSelectedCounsellorId] = useState<
    string | null
  >(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedSessionType, setSelectedSessionType] = useState<string | null>(
    null,
  );

  const [counsellors, setCounsellors] = useState<Counsellor[]>([]);
  const [studentId, setStudentId] = useState<string | null>(null);

  const [loadingCounsellors, setLoadingCounsellors] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setStudentId(userData.id || userData._id);
    }
  }, []);

  useEffect(() => {
    const fetchCounsellors = async () => {
      try {
        const res = await fetch("/api/counsellor/getcounsellor");
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        const formatted = data.formatted.map((c: any) => ({
          id: c.id,
          name: c.name,
          email: c.email,
          headline: c.headline || "",
          specializations: Array.isArray(c.specializations)
            ? c.specializations
            : [c.specializations],
          availability: Array.isArray(c.availability)
            ? c.availability
            : [c.availability || "Available"],
          pricePerSession: c.pricePerSession || 0,
          rating: c.rating || 0,
          photo: c.photo || "",
          reviews: c.reviews || 0,
          totalSessions: c.totalSessions || 0,
          experience: c.experience || 0,
        }));
        setCounsellors(formatted);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoadingCounsellors(false);
      }
    };
    fetchCounsellors();
  }, []);

  // const filteredCounsellors = counsellors.filter((c) =>
  //   c.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  const filteredCounsellors = counsellors.filter((c) => {
  const query = searchQuery.toLowerCase().trim();

  const keywordMap: Record<string, string[]> = {
    cs: ["cs", "computer science", "computer"],
    "computer science": ["cs", "computer science", "computer"],
    computer: ["cs", "computer science", "computer"],

    se: ["se", "software engineering", "software"],
    "software engineering": ["se", "software engineering", "software"],
    software: ["se", "software engineering", "software"],

    it: ["it", "information technology", "information"],
    "information technology": ["it", "information technology", "information"],
    information: ["it", "information technology", "information"],
  };

  const expandedQuery = keywordMap[query] || [query];

  return (
    c.name.toLowerCase().includes(query) ||
    c.specializations.some((specialization) => {
      const spec = specialization.toLowerCase();

      return expandedQuery.some(
        (term) => spec.includes(term) || term.includes(spec)
      );
    })
  );
});

  const selectedCounsellor = counsellors.find(
    (c) => c.id === selectedCounsellorId,
  );

  const handleStepOne = () =>
    selectedCounsellorId && setCurrentStep("datetime");
  const handleStepTwo = () =>
    selectedDate && selectedTime && setCurrentStep("sessiontype");
  const handleStepThree = () =>
    selectedSessionType && setCurrentStep("confirmation");

  const handleConfirmBooking = async () => {
    if (
      !studentId ||
      !selectedCounsellor ||
      !selectedDate ||
      !selectedTime ||
      !selectedSessionType
    ) {
      alert("Please complete all steps");
      return;
    }
    setIsLoading(true);
    try {
      const sessionData =
        SESSION_TYPES[selectedSessionType as keyof typeof SESSION_TYPES];
      const res = await fetch("/api/meetings/createMeetings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student: studentId,
          counsellor: selectedCounsellor.id,
          sessionType: sessionData.title,
          sessionDuration: sessionData.duration,
          sessionPrice: sessionData.price,
          date: selectedDate,
          time: selectedTime,
          totalAmount: sessionData.price + 50,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setCurrentStep("success");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartOver = () => {
    setCurrentStep("counsellor");
    setSelectedCounsellorId(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedSessionType(null);
  };

  /* ─── Success screen ─────────────────────────────────────── */
  if (currentStep === "success") {
    return (
      <div
        className="min-h-screen flex items-center justify-center text-center p-6"
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

        <div
          style={{ ...glassCard, padding: "3rem 2.5rem", maxWidth: 420 }}
          className="space-y-5"
        >
          <div
            className="mx-auto h-16 w-16 flex items-center justify-center rounded-full"
            style={{
              background: "rgba(16,185,129,0.15)",
              border: "1px solid rgba(16,185,129,0.4)",
            }}
          >
            <CheckCircle className="h-8 w-8" style={{ color: "#34d399" }} />
          </div>
          <h1 className="text-2xl font-bold text-white">Session Booked!</h1>
          <p style={{ color: "#64748b" }} className="text-sm">
            Your counseling session has been successfully booked.
          </p>
          <Button
            onClick={handleStartOver}
            className="w-full text-white border-0 font-semibold"
            style={{
              background: "linear-gradient(135deg, #0063c4, #004a93)",
              boxShadow: "0 4px 20px rgba(0,99,196,0.4)",
            }}
          >
            Book Another Session
          </Button>
        </div>
      </div>
    );
  }

  /* ─── Step labels ────────────────────────────────────────── */
  const STEPS: { key: Step; label: string }[] = [
    { key: "counsellor", label: "Counsellor" },
    { key: "datetime", label: "Date & Time" },
    { key: "sessiontype", label: "Session Type" },
    { key: "confirmation", label: "Confirm" },
  ];
  const stepIndex = STEPS.findIndex((s) => s.key === currentStep);

  return (
    <div className="min-h-screen p-6 space-y-6" style={pageBackground}>
      {/* blobs */}
      <div
        className="pointer-events-none fixed -top-32 -left-32 h-96 w-96 rounded-full blur-3xl -z-10"
        style={{ background: "rgba(0,99,196,0.2)" }}
      />
      <div
        className="pointer-events-none fixed -bottom-32 -right-32 h-96 w-96 rounded-full blur-3xl -z-10"
        style={{ background: "rgba(0,99,196,0.15)" }}
      />

      {/* ── Header ── */}
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Book a Session</h1>
          <p className="text-sm mt-0.5" style={{ color: "#64748b" }}>
            Find the right counsellor for you
          </p>
        </div>
        <div
          className="h-9 w-9 flex items-center justify-center rounded-lg"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,99,196,0.3), rgba(0,74,147,0.2))",
            border: "1px solid rgba(0,99,196,0.4)",
          }}
        >
          <CalendarDays className="h-4 w-4" style={{ color: "#60a5fa" }} />
        </div>
      </div>

      {/* ── Step Indicator ── */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          {STEPS.map((s, i) => (
            <div key={s.key} className="flex items-center gap-2 flex-1">
              <div className="flex items-center gap-2">
                <div
                  className="h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all"
                  style={
                    i < stepIndex
                      ? {
                          background: "rgba(16,185,129,0.2)",
                          border: "1px solid rgba(16,185,129,0.5)",
                          color: "#34d399",
                        }
                      : i === stepIndex
                        ? {
                            background: "rgba(0,99,196,0.3)",
                            border: "1px solid rgba(0,99,196,0.6)",
                            color: "#60a5fa",
                          }
                        : {
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "#64748b",
                          }
                  }
                >
                  {i < stepIndex ? "✓" : i + 1}
                </div>
                <span
                  className="text-xs font-medium hidden sm:block"
                  style={{
                    color:
                      i === stepIndex
                        ? "#60a5fa"
                        : i < stepIndex
                          ? "#34d399"
                          : "#64748b",
                  }}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className="flex-1 h-px"
                  style={{
                    background:
                      i < stepIndex
                        ? "rgba(16,185,129,0.4)"
                        : "rgba(0,99,196,0.2)",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6">
        {/* ── Main content ── */}
        <div className="lg:col-span-2 space-y-4">
          {/* Counsellor step */}
          {currentStep === "counsellor" && (
            <>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-2">
                  <div
                    className="h-8 w-8 flex items-center justify-center rounded-lg"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(0,99,196,0.3), rgba(0,74,147,0.2))",
                      border: "1px solid rgba(0,99,196,0.4)",
                    }}
                  >
                    <Search className="h-4 w-4" style={{ color: "#60a5fa" }} />
                  </div>
                  <h2 className="font-semibold text-white">
                    Select a Counsellor
                  </h2>
                </div>

                {/* Search input */}
                <div className="relative w-full sm:w-72">
                  <input
                    type="text"
                    placeholder="Search counsellor..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-10 pl-10 pr-4 rounded-xl text-sm text-white placeholder:text-slate-500 outline-none focus:ring-1"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(0,99,196,0.3)",
                      focusRingColor: "#0063c4",
                    }}
                  />
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                    style={{ color: "#64748b" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeWidth="2"
                      d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
                    />
                  </svg>
                </div>
              </div>

              {loadingCounsellors && (
                <div
                  className="flex items-center gap-3 py-8"
                  style={{ color: "#64748b" }}
                >
                  <div
                    className="h-5 w-5 rounded-full border-2 border-t-transparent animate-spin"
                    style={{
                      borderColor: "rgba(0,99,196,0.4)",
                      borderTopColor: "#0063c4",
                    }}
                  />
                  <span className="text-sm">Loading counsellors…</span>
                </div>
              )}
              {error && (
                <p
                  className="text-sm px-4 py-3 rounded-xl"
                  style={{
                    background: "rgba(239,68,68,0.1)",
                    border: "1px solid rgba(239,68,68,0.3)",
                    color: "#f87171",
                  }}
                >
                  {error}
                </p>
              )}
              {!loadingCounsellors && filteredCounsellors.length === 0 && (
                <p
                  className="text-sm py-6 text-center"
                  style={{ color: "#64748b" }}
                >
                  No counsellors found.
                </p>
              )}

              <div className="space-y-3">
                {filteredCounsellors.map((c) => (
                  <div
                    key={c.id}
                    style={
                      selectedCounsellorId === c.id
                        ? {
                            ...glassCard,
                            border: "1px solid rgba(0,99,196,0.6)",
                          }
                        : glassCard
                    }
                  >
                    <CounsellorCard
                      counsellor={{
                        id: c.id,
                        name: c.name,
                        photo: c.photo,
                        specialization: c.specializations.join(", "),
                        experience: c.experience,
                        rating: c.rating,
                        totalReviews: c.reviews,
                        availability: c.availability,
                        sessionPrice: c.pricePerSession,
                        bio: c.headline,
                      }}
                      isSelected={selectedCounsellorId === c.id}
                      onSelect={setSelectedCounsellorId}
                    />
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Date & Time step */}
          {currentStep === "datetime" && selectedCounsellor && (
            <div style={glassCard} className="p-6">
              <div className="flex items-center gap-2 mb-5">
                <div
                  className="h-8 w-8 flex items-center justify-center rounded-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(0,99,196,0.3), rgba(0,74,147,0.2))",
                    border: "1px solid rgba(0,99,196,0.4)",
                  }}
                >
                  <CalendarDays
                    className="h-4 w-4"
                    style={{ color: "#60a5fa" }}
                  />
                </div>
                <h2 className="font-semibold text-white">Select Date & Time</h2>
              </div>
              <DateTimeSelection
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onDateChange={setSelectedDate}
                onTimeChange={setSelectedTime}
                availableTimeSlots={selectedCounsellor.availability}
              />
            </div>
          )}

          {/* Session type step */}
          {currentStep === "sessiontype" && (
            <div style={glassCard} className="p-6">
              <div className="flex items-center gap-2 mb-5">
                <div
                  className="h-8 w-8 flex items-center justify-center rounded-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(0,99,196,0.3), rgba(0,74,147,0.2))",
                    border: "1px solid rgba(0,99,196,0.4)",
                  }}
                >
                  <CalendarDays
                    className="h-4 w-4"
                    style={{ color: "#60a5fa" }}
                  />
                </div>
                <h2 className="font-semibold text-white">
                  Choose Session Type
                </h2>
              </div>
              <SessionTypeSelection
                selectedType={selectedSessionType}
                onTypeChange={setSelectedSessionType}
              />
            </div>
          )}

          {/* Confirmation step */}
          {currentStep === "confirmation" &&
            selectedCounsellor &&
            selectedDate &&
            selectedTime &&
            selectedSessionType && (
              <div style={glassCard} className="p-6">
                <BookingConfirmation
                  counsellor={{
                    name: selectedCounsellor.name,
                    photo: selectedCounsellor.photo,
                    specialization: selectedCounsellor.specializations,
                    sessionPrice: selectedCounsellor.pricePerSession,
                  }}
                  date={selectedDate}
                  time={selectedTime}
                  sessionType={
                    SESSION_TYPES[
                      selectedSessionType as keyof typeof SESSION_TYPES
                    ]
                  }
                  onConfirm={handleConfirmBooking}
                  onCancel={() => setCurrentStep("counsellor")}
                  isLoading={isLoading}
                />
              </div>
            )}
        </div>

        {/* ── Sidebar ── */}
        <div>
          <div style={glassCard} className="p-6 space-y-4 sticky top-6">
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <div
                className="h-8 w-8 flex items-center justify-center rounded-lg"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,99,196,0.3), rgba(0,74,147,0.2))",
                  border: "1px solid rgba(0,99,196,0.4)",
                }}
              >
                <CalendarDays
                  className="h-4 w-4"
                  style={{ color: "#60a5fa" }}
                />
              </div>
              <h2 className="font-semibold text-white">Booking Summary</h2>
            </div>

            {/* Summary rows */}
            {[
              selectedCounsellor && {
                label: "Counsellor",
                value: selectedCounsellor.name,
              },
              selectedDate && {
                label: "Date",
                value: selectedDate.toLocaleDateString(),
              },
              selectedTime && { label: "Time", value: selectedTime },
              selectedSessionType && {
                label: "Session",
                value:
                  SESSION_TYPES[
                    selectedSessionType as keyof typeof SESSION_TYPES
                  ].title,
              },
            ]
              .filter(Boolean)
              .map((row: any, i, arr) => (
                <div
                  key={row.label}
                  className="flex justify-between items-center py-2"
                  style={{
                    borderBottom:
                      i < arr.length - 1
                        ? "1px solid rgba(0,99,196,0.15)"
                        : "none",
                  }}
                >
                  <span className="text-xs" style={{ color: "#64748b" }}>
                    {row.label}
                  </span>
                  <span className="text-xs font-semibold text-white">
                    {row.value}
                  </span>
                </div>
              ))}

            {selectedSessionType && (
              <div
                className="flex justify-between items-center py-2 mt-1"
                style={{ borderTop: "1px solid rgba(0,99,196,0.25)" }}
              >
                <span
                  className="text-xs font-semibold"
                  style={{ color: "#60a5fa" }}
                >
                  Total
                </span>
                <span className="text-sm font-bold text-white">
                  PKR{" "}
                  {SESSION_TYPES[
                    selectedSessionType as keyof typeof SESSION_TYPES
                  ].price + 50}
                </span>
              </div>
            )}

            {/* CTA */}
            <div className="pt-2">
              {currentStep === "counsellor" && (
                <Button
                  className="w-full text-white border-0 font-semibold"
                  disabled={!selectedCounsellorId}
                  onClick={handleStepOne}
                  style={{
                    background: selectedCounsellorId
                      ? "linear-gradient(135deg, #0063c4, #004a93)"
                      : "rgba(255,255,255,0.06)",
                    boxShadow: selectedCounsellorId
                      ? "0 4px 20px rgba(0,99,196,0.4)"
                      : "none",
                    color: selectedCounsellorId ? "white" : "#64748b",
                  }}
                >
                  Continue
                </Button>
              )}
              {currentStep === "datetime" && (
                <Button
                  className="w-full text-white border-0 font-semibold"
                  disabled={!selectedDate || !selectedTime}
                  onClick={handleStepTwo}
                  style={{
                    background:
                      selectedDate && selectedTime
                        ? "linear-gradient(135deg, #0063c4, #004a93)"
                        : "rgba(255,255,255,0.06)",
                    boxShadow:
                      selectedDate && selectedTime
                        ? "0 4px 20px rgba(0,99,196,0.4)"
                        : "none",
                    color: selectedDate && selectedTime ? "white" : "#64748b",
                  }}
                >
                  Continue
                </Button>
              )}
              {currentStep === "sessiontype" && (
                <Button
                  className="w-full text-white border-0 font-semibold"
                  disabled={!selectedSessionType}
                  onClick={handleStepThree}
                  style={{
                    background: selectedSessionType
                      ? "linear-gradient(135deg, #0063c4, #004a93)"
                      : "rgba(255,255,255,0.06)",
                    boxShadow: selectedSessionType
                      ? "0 4px 20px rgba(0,99,196,0.4)"
                      : "none",
                    color: selectedSessionType ? "white" : "#64748b",
                  }}
                >
                  Review Booking
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
