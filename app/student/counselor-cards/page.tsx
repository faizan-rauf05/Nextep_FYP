"use client";

import {
  CareerCounselorBookingCard,
  CareerCounselorData,
} from "@/components/student/career-counselor-booking-card";

const sampleCounselors: CareerCounselorData[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    role: "Career Advisor",
    rating: 4.9,
    reviewCount: 127,
    description:
      "Specializing in tech careers and career transitions. Helping professionals find their dream roles for over 10 years.",
    tags: ["Web Development", "AI", "Career Guidance"],
    availableToday: true,
    nextSlot: "3:00 PM",
    isTopRated: true,
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Tech Career Specialist",
    rating: 4.8,
    reviewCount: 89,
    description:
      "Former FAANG recruiter with deep insights into landing top tech positions and navigating complex hiring processes.",
    tags: ["Software Engineering", "Interview Prep", "Resume Review"],
    availableToday: true,
    nextSlot: "4:30 PM",
    isRecommended: true,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Career Transition Coach",
    rating: 4.7,
    reviewCount: 64,
    description:
      "Expert in helping professionals pivot careers, identify transferable skills, and build new career paths.",
    tags: ["Career Change", "Personal Branding", "Networking"],
    availableToday: false,
    nextSlot: "Tomorrow, 10:00 AM",
  },
  {
    id: "4",
    name: "James Wilson",
    role: "Data Science Mentor",
    rating: 4.6,
    reviewCount: 52,
    description:
      "Data scientist with 8+ years of experience helping aspiring analysts and data scientists break into the field.",
    tags: ["Data Science", "Machine Learning", "Python", "SQL"],
    availableToday: true,
    nextSlot: "5:00 PM",
    isTopRated: true,
  },
];

export default function CounselorCardsPage() {
  const handleBookSession = (id: string) => {
    console.log("Booking session with counselor:", id);
    // Navigate to booking flow or open booking modal
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Find Your Career Counselor
        </h1>
        <p className="text-muted-foreground mt-1">
          Book a session with experienced career advisors to guide your
          professional journey
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sampleCounselors.map((counselor) => (
          <CareerCounselorBookingCard
            key={counselor.id}
            counselor={counselor}
            onBookSession={handleBookSession}
          />
        ))}
      </div>
    </div>
  );
}
