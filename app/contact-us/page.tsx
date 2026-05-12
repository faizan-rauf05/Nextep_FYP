"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MessageSquare,
  HelpCircle,
  Briefcase,
  BookOpen,
} from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────── */
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

/* ─── Constants ──────────────────────────────────────────────── */
const SUBJECT_OPTIONS = [
  { value: "career-guidance", label: "Career Guidance", icon: Briefcase },
  { value: "platform-support", label: "Platform Support", icon: HelpCircle },
  { value: "course-inquiry", label: "Course / Resource Inquiry", icon: BookOpen },
  { value: "partnership", label: "Partnership Opportunity", icon: MessageSquare },
  { value: "other", label: "Other", icon: MessageSquare },
];

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@pathfinder.pk",
    sub: "We reply within 24 hours",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+92 300 1234567",
    sub: "Mon – Fri, 9 AM – 6 PM",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "Gulberg III, Lahore, Pakistan",
    sub: "By appointment only",
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Mon – Fri: 9 AM – 6 PM",
    sub: "Sat: 10 AM – 2 PM",
  },
];

/* ─── Validation ─────────────────────────────────────────────── */
function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim() || data.name.trim().length < 2)
    errors.name = "Name must be at least 2 characters.";
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Please enter a valid email address.";
  if (!data.subject)
    errors.subject = "Please select a subject.";
  if (!data.message.trim() || data.message.trim().length < 20)
    errors.message = "Message must be at least 20 characters.";
  return errors;
}

/* ─── Page Component ─────────────────────────────────────────── */
export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [serverError, setServerError] = useState<string>("");

  /* helpers */
  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("loading");
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: unknown) {
      setStatus("error");
      setServerError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 text-white">
        <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-sky-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <Badge
            variant="outline"
            className="mb-6 border-violet-400/40 bg-violet-500/10 text-violet-300"
          >
            Get In Touch
          </Badge>
          <h1 className="mb-5 text-5xl font-bold leading-tight tracking-tight md:text-6xl">
            We&apos;re Here to{" "}
            <span className="bg-gradient-to-r from-violet-400 to-sky-400 bg-clip-text text-transparent">
              Help You
            </span>
          </h1>
          <p className="text-lg text-slate-300">
            Have a question, need guidance, or want to collaborate? Reach out
            and our team will get back to you promptly.
          </p>
        </div>
      </section>

      {/* ── Main Grid ── */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* ── Left: Contact Info ── */}
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold">Contact Information</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Multiple ways to reach the PathFinder team.
              </p>
            </div>

            {CONTACT_INFO.map((item) => (
              <Card
                key={item.label}
                className="border-0 bg-muted/40 shadow-sm"
              >
                <CardContent className="flex items-start gap-4 p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-900/30">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      {item.label}
                    </p>
                    <p className="mt-0.5 font-semibold text-sm">{item.value}</p>
                    <p className="text-xs text-muted-foreground">{item.sub}</p>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* FAQ nudge */}
            <Card className="border border-violet-200 bg-violet-50 dark:border-violet-800 dark:bg-violet-950/30">
              <CardContent className="p-5">
                <p className="text-sm font-semibold text-violet-700 dark:text-violet-300">
                  Check our FAQ first!
                </p>
                <p className="mt-1 text-xs text-violet-600 dark:text-violet-400">
                  Many common questions are answered in our Help Centre — you
                  might get an instant answer without waiting.
                </p>
                <Button
                  variant="link"
                  className="mt-2 h-auto p-0 text-xs text-violet-700 dark:text-violet-300"
                >
                  Visit Help Centre →
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* ── Right: Form ── */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Send Us a Message</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Fill in the form below and we&apos;ll respond within one
                  business day.
                </p>
              </CardHeader>

              <CardContent>
                {/* Success state */}
                {status === "success" && (
                  <Alert className="mb-6 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/30">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-700 dark:text-green-300">
                      Your message has been sent successfully! We&apos;ll get
                      back to you within 24 hours.
                    </AlertDescription>
                  </Alert>
                )}

                {/* Error state */}
                {status === "error" && (
                  <Alert className="mb-6 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-700 dark:text-red-300">
                      {serverError}
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Name + Email */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="name">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="Ali Raza"
                        value={formData.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        className={errors.name ? "border-red-400 focus-visible:ring-red-400" : ""}
                        disabled={status === "loading"}
                      />
                      {errors.name && (
                        <p className="text-xs text-red-500">{errors.name}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="email">
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="ali@example.com"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        className={errors.email ? "border-red-400 focus-visible:ring-red-400" : ""}
                        disabled={status === "loading"}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <Label htmlFor="subject">
                      Subject <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.subject}
                      onValueChange={(val) => updateField("subject", val)}
                      disabled={status === "loading"}
                    >
                      <SelectTrigger
                        id="subject"
                        className={errors.subject ? "border-red-400 focus:ring-red-400" : ""}
                      >
                        <SelectValue placeholder="Select a topic…" />
                      </SelectTrigger>
                      <SelectContent>
                        {SUBJECT_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.subject && (
                      <p className="text-xs text-red-500">{errors.subject}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <Label htmlFor="message">
                      Message <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help you…"
                      rows={6}
                      value={formData.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      className={
                        errors.message
                          ? "resize-none border-red-400 focus-visible:ring-red-400"
                          : "resize-none"
                      }
                      disabled={status === "loading"}
                    />
                    <div className="flex justify-between">
                      {errors.message ? (
                        <p className="text-xs text-red-500">{errors.message}</p>
                      ) : (
                        <span />
                      )}
                      <p className="text-xs text-muted-foreground">
                        {formData.message.length} / 1000
                      </p>
                    </div>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    className="w-full bg-violet-600 hover:bg-violet-700"
                    disabled={status === "loading"}
                    size="lg"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    By submitting this form you agree to our{" "}
                    <a href="/privacy" className="underline">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ── Map placeholder ── */}
      <section className="border-t bg-muted/30 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex h-56 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
            <div className="text-center">
              <MapPin className="mx-auto mb-2 h-8 w-8 opacity-40" />
              <p className="text-sm">
                Embed a Google Map here — Gulberg III, Lahore
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
