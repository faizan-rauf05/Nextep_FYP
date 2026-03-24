"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
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
  "resume-review": {
    title: "Resume Review",
    duration: "30 mins",
    price: 1000,
  },
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

  // Get Student ID from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setStudentId(userData.id || userData._id);
    }
  }, []);

  // Fetch counsellors
  useEffect(() => {
    const fetchCounsellors = async () => {
      try {
        const res = await fetch("/api/counsellor/getcounsellor");
        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        console.log("data", data);

        // Normalize data
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
          experience: c.experience || 0, // ✅ add this line
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

  const selectedCounsellor = counsellors.find(
    (c) => c.id === selectedCounsellorId,
  );

  const handleStepOne = () => {
    if (selectedCounsellorId) setCurrentStep("datetime");
  };

  const handleStepTwo = () => {
    if (selectedDate && selectedTime) setCurrentStep("sessiontype");
  };

  const handleStepThree = () => {
    if (selectedSessionType) setCurrentStep("confirmation");
  };

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

  if (currentStep === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <CheckCircle className="h-16 w-16 mx-auto text-green-500" />
          <h1 className="text-3xl font-bold">Session Booked!</h1>
          <p>Your counseling session has been successfully booked.</p>
          <Button onClick={handleStartOver}>Book Another Session</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* MAIN */}
        <div className="lg:col-span-2">
          {currentStep === "counsellor" && (
            <>
              <h2 className="text-xl font-semibold mb-6">Select a Counselor</h2>
              {loadingCounsellors && <p>Loading...</p>}
              {error && <p className="text-red-500">{error}</p>}
              {counsellors.map((c) => (
                <CounsellorCard
                  counsellor={{
                    id: c.id,
                    name: c.name,
                    photo: c.photo,
                    specialization: Array.isArray(c.specializations)
                      ? c.specializations.join(", ")
                      : c.specializations,
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
              ))}
            </>
          )}

          {currentStep === "datetime" && selectedCounsellor && (
            <Card>
              <CardContent className="p-6">
                <DateTimeSelection
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  onDateChange={setSelectedDate}
                  onTimeChange={setSelectedTime}
                  availableTimeSlots={selectedCounsellor.availability}
                />
              </CardContent>
            </Card>
          )}

          {currentStep === "sessiontype" && (
            <Card>
              <CardContent className="p-6">
                <SessionTypeSelection
                  selectedType={selectedSessionType}
                  onTypeChange={setSelectedSessionType}
                />
              </CardContent>
            </Card>
          )}

          {currentStep === "confirmation" &&
            selectedCounsellor &&
            selectedDate &&
            selectedTime &&
            selectedSessionType && (
              <BookingConfirmation
                counsellor={{
                  name: selectedCounsellor.name,
                  photo: selectedCounsellor.photo, // ✅ show photo here
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
            )}
        </div>

        {/* SIDEBAR */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedCounsellor && (
                <div>
                  <p className="text-sm text-muted-foreground">Counsellor</p>
                  <p className="font-semibold">{selectedCounsellor.name}</p>
                </div>
              )}
              {selectedDate && (
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p>{selectedDate.toLocaleDateString()}</p>
                </div>
              )}
              {selectedTime && (
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p>{selectedTime}</p>
                </div>
              )}
              {selectedSessionType && (
                <div>
                  <p className="text-sm text-muted-foreground">Session</p>
                  <p>
                    {
                      SESSION_TYPES[
                        selectedSessionType as keyof typeof SESSION_TYPES
                      ].title
                    }
                  </p>
                </div>
              )}

              <div className="pt-4 border-t space-y-2">
                {currentStep === "counsellor" && (
                  <Button
                    className="w-full"
                    disabled={!selectedCounsellorId}
                    onClick={handleStepOne}
                  >
                    Continue
                  </Button>
                )}
                {currentStep === "datetime" && (
                  <Button
                    className="w-full"
                    disabled={!selectedDate || !selectedTime}
                    onClick={handleStepTwo}
                  >
                    Continue
                  </Button>
                )}
                {currentStep === "sessiontype" && (
                  <Button
                    className="w-full"
                    disabled={!selectedSessionType}
                    onClick={handleStepThree}
                  >
                    Review Booking
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
