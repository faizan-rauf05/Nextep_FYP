"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  GraduationCap,
  Briefcase,
  Check,
} from "lucide-react";

/////////////////////////
// Student Signup Form //
/////////////////////////
function StudentSignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    education: {
      degree: "",
      major: "",
      university: "",
      startYear: "",
      endYear: "",
    },
    interests: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Nested education fields
    if (name.startsWith("education.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        education: { ...prev.education, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Ensure years are numbers
      const educationData = {
        ...formData.education,
        startYear: Number(formData.education.startYear),
        endYear: Number(formData.education.endYear),
      };

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role: "student", education: educationData }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Signup failed");
        return;
      }

      alert("Student account created successfully 🎉");
      router.push("/login");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="student-firstname">First name</Label>
          <Input
            id="student-firstname"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="student-lastname">Last name</Label>
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
        <Label htmlFor="student-email">Email address</Label>
        <Input
          id="student-email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      {/* Education fields */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="education-degree">Degree</Label>
          <Input
            id="education-degree"
            name="education.degree"
            value={formData.education.degree}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="education-major">Field / Major</Label>
          <Input
            id="education-major"
            name="education.major"
            value={formData.education.major}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="education-university">College</Label>
          <Input
            id="education-university"
            name="education.university"
            value={formData.education.university}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-2">
            <Label htmlFor="education-startYear">Start Year</Label>
            <Input
              id="education-startYear"
              type="number"
              name="education.startYear"
              value={formData.education.startYear}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="education-endYear">End Year</Label>
            <Input
              id="education-endYear"
              type="number"
              name="education.endYear"
              value={formData.education.endYear}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="student-interests">Career interests</Label>
        <Input
          id="student-interests"
          name="interests"
          value={formData.interests}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="student-password">Password</Label>
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
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Create Student Account"}
      </Button>

      <div className="space-y-2 pt-2 text-xs text-muted-foreground text-center">
        <p>What you'll get:</p>
        <div className="flex flex-col gap-1.5">
          {["Browse expert counsellors", "Book personalized sessions", "Track your career progress"].map(
            (item) => (
              <div key={item} className="flex items-center gap-2">
                <Check className="h-3 w-3" /> {item}
              </div>
            )
          )}
        </div>
      </div>
    </form>
  );
}

///////////////////////////////
// Counsellor Signup Form //
///////////////////////////////
function CounsellorSignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();

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
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    setImageUrl(data.url);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    } catch {
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>First name</Label>
          <Input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label>Last name</Label>
          <Input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div>
        <Label>Email</Label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label>Specialization</Label>
        <Input name="specialization" value={formData.specialization} onChange={handleChange} required />
      </div>

      <div>
        <Label>Years of experience</Label>
        <Input
          type="number"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Input type="file" accept="image/*" onChange={(e) => e.target.files && handleImageUpload(e.target.files[0])} />
      </div>

      <div>
        <Label>Professional bio</Label>
        <Textarea name="bio" value={formData.bio} onChange={handleChange} />
      </div>

      <div>
        <Label>Password</Label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Create Counsellor Account"}
      </Button>

      <div className="space-y-2 pt-2 text-xs text-muted-foreground text-center">
        <p>What you'll get:</p>
        <div className="flex flex-col gap-1.5">
          {["Manage your availability", "Connect with students", "Set your own rates"].map(
            (item) => (
              <div key={item} className="flex items-center gap-2">
                <Check /> {item}
              </div>
            )
          )}
        </div>
      </div>
    </form>
  );
}

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            <img className="w-[210px]" src="/logo.png" alt="" />
          </Link>
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft /> Back to Home
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-5xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-semibold tracking-tight">Create your account</h1>
            <p className="mt-2 text-muted-foreground">Join PathFinder as a student or career counsellor</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-border/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-3">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <CardTitle>Sign up as Student</CardTitle>
                <CardDescription>Find your ideal career path with expert guidance</CardDescription>
              </CardHeader>
              <CardContent>
                <StudentSignupForm />
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-3">
                  <Briefcase className="h-6 w-6" />
                </div>
                <CardTitle>Sign up as Counsellor</CardTitle>
                <CardDescription>Share your expertise and help shape careers</CardDescription>
              </CardHeader>
              <CardContent>
                <CounsellorSignupForm />
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account? <Link href="/login" className="font-medium text-foreground hover:underline">Sign in</Link>
          </div>
        </div>
      </main>
    </div>
  );
}