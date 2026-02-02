"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Star, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

type Counsellor = {
  _id: string;
  firstName: string;
  lastName: string;
  specialization: string;
  experience: number;
  rating?: number;
  image?: string;
};

export function Counsellors() {
  const [careerCounsellors, setcareerCounsellors] = useState<Counsellor[]>([]);

  useEffect(() => {
    getCareerCounsellors();
  }, []);

  const getCareerCounsellors = async () => {
    try {
      const res = await fetch("/api/counsellor/getcounsellor");
      const data = await res.json();
      setcareerCounsellors(data?.counsellors);
    } catch (error) {
      alert(
        "There is error occur while fetching career cousellors home",    
      );
    }
  };

  return (
    <section id="counsellors" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 md:mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Featured Counsellors
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl">
              Connect with industry experts who have helped thousands achieve
              their career goals.
            </p>
          </div>
          <Button
            variant="outline"
            className="rounded-full self-start md:self-auto bg-transparent"
            asChild
          >
            <Link href="/counsellors">
              View All Counsellors
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Counsellors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {careerCounsellors.map((counsellor) => (
            <div
              key={counsellor?._id}
              className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-foreground/20 transition-all duration-300 hover:shadow-xl"
            >
              {/* Image */}
              <div className="aspect-[4/3] bg-muted overflow-hidden">
                {counsellor.image ? (
                  <img
                    src={counsellor.image}
                    alt={counsellor.firstName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No Image
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-semibold text-foreground text-lg">
                  {counsellor?.firstName} {counsellor?.lastName}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {counsellor.specialization}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 mt-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-foreground text-foreground" />
                    <span className="font-medium">
                      {counsellor.rating ?? "New"}
                    </span>
                  </div>
                  <span className="text-muted-foreground">
                    {counsellor.experience}
                  </span>
                </div>

                {/* Button */}
                {/* <Button
                  variant="outline"
                  className="w-full mt-4 rounded-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300 bg-transparent"
                >
                  View Profile
                </Button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
