"use client";

import React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  GraduationCap,
  Briefcase,
  Check,
} from "lucide-react";
import { useRouter } from "next/navigation";

function StudentSignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // State for student
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    education: "",
    interests: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: "student",
          ...formData,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Signup failed");
        return;
      }

      alert("Student account created successfully 🎉");
      router.push("/login");
      // later → router.push("/login")
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="student-firstname" className="text-sm font-medium">
            First name
          </Label>
          <Input
            id="student-firstname"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="John"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="student-lastname" className="text-sm font-medium">
            Last name
          </Label>
          <Input
            id="student-lastname"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="student-email" className="text-sm font-medium">
          Email address
        </Label>
        <Input
          id="student-email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="student-education" className="text-sm font-medium">
          Current education level
        </Label>
        <Input
          id="student-education"
          name="education"
          value={formData.education}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="student-interests" className="text-sm font-medium">
          Career interests
        </Label>
        <Input
          id="student-interests"
          name="interests"
          value={formData.interests}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="student-password" className="text-sm font-medium">
          Password
        </Label>
        <div className="relative">
          <Input
            id="student-password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full h-10 rounded-lg font-medium"
        disabled={isLoading}
      >
        {isLoading ? "Creating account..." : "Create Student Account"}
      </Button>

      <div className="space-y-2 pt-2">
        <p className="text-xs text-muted-foreground text-center">
          What you'll get:
        </p>
        <div className="flex flex-col gap-1.5">
          {[
            "Browse expert counsellors",
            "Book personalized sessions",
            "Track your career progress",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 text-xs text-muted-foreground"
            >
              <Check className="h-3 w-3 text-foreground" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}

function CounsellorSignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const router = useRouter();
  // State for counseller
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    specialization: "",
    experience: "",
    bio: "",
    password: "",
  });

  const handleImageUpload = async (file: File) => {
    setImageUploading(true);

    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: fd,
    });

    console.log(res,"res");

    const data = await res.json();
    setImageUrl(data.url);
    console.log("image url", data.url);

    setImageUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: "counsellor",
          ...formData,
          experience: Number(formData.experience),
          image: imageUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Signup failed");
        return;
      }

      alert("Counsellor account created successfully 🎉");
      router.push("/login");
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="counsellor-firstname" className="text-sm font-medium">
            First name
          </Label>
          <Input
            id="counsellor-firstname"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="counsellor-lastname" className="text-sm font-medium">
            Last name
          </Label>
          <Input
            id="counsellor-lastname"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="counsellor-email" className="text-sm font-medium">
          Email address
        </Label>
        <Input
          id="counsellor-email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="counsellor-specialization"
          className="text-sm font-medium"
        >
          Specialization
        </Label>
        <Input
          id="counsellor-specialization"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="counsellor-experience" className="text-sm font-medium">
          Years of experience
        </Label>
        <Input
          id="counsellor-experience"
          name="experience"
          type="number"
          value={formData.experience}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Input
          type="file"
          accept="image/*"
          onChange={(e) =>{
            console.log("e",e);
            e.target.files && handleImageUpload(e.target.files[0])
          }
            
          }
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="counsellor-bio" className="text-sm font-medium">
          Professional bio
        </Label>
        <Textarea name="bio" value={formData.bio} onChange={handleChange} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="counsellor-password" className="text-sm font-medium">
          Password
        </Label>
        <div className="relative">
          <Input
            id="counsellor-password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full h-10 rounded-lg font-medium"
        disabled={isLoading}
      >
        {isLoading ? "Creating account..." : "Create Counsellor Account"}
      </Button>

      <div className="space-y-2 pt-2">
        <p className="text-xs text-muted-foreground text-center">
          What you'll get:
        </p>
        <div className="flex flex-col gap-1.5">
          {[
            "Manage your availability",
            "Connect with students",
            "Set your own rates",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 text-xs text-muted-foreground"
            >
              <Check className="h-3 w-3 text-foreground" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-semibold tracking-tight">
              PathFinder
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-5xl">
          {/* Page Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-semibold tracking-tight">
              Create your account
            </h1>
            <p className="mt-2 text-muted-foreground">
              Join PathFinder as a student or career counsellor
            </p>
          </div>

          {/* Two Column Forms */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Student Card */}
            <Card className="border-border/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-3">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl font-semibold">
                  Sign up as Student
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Find your ideal career path with expert guidance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <StudentSignupForm />
              </CardContent>
            </Card>

            {/* Counsellor Card */}
            <Card className="border-border/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-3">
                  <Briefcase className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl font-semibold">
                  Sign up as Counsellor
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Share your expertise and help shape careers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CounsellorSignupForm />
              </CardContent>
            </Card>
          </div>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-foreground hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
