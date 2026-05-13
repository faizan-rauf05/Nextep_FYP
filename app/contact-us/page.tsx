"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
  Sparkles,
} from "lucide-react";
import { Footer } from "@/components/landing/footer";
import { Navigation } from "@/components/landing/navigation";

/* ─── Types ──────────────────────────────────────────────────── */
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
  {
    value: "course-inquiry",
    label: "Course / Resource Inquiry",
    icon: BookOpen,
  },
  {
    value: "partnership",
    label: "Partnership Opportunity",
    icon: MessageSquare,
  },
  { value: "other", label: "Other", icon: MessageSquare },
];

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email Us",
    value: "info@nexstep.pk",
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
    value: "Superior University, Lahore, Pakistan",
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
  if (!data.subject) errors.subject = "Please select a subject.";
  if (!data.message.trim() || data.message.trim().length < 20)
    errors.message = "Message must be at least 20 characters.";
  return errors;
}

/* ─── Shared style ───────────────────────────────────────────── */
const glassCard: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(0,99,196,0.25)",
  backdropFilter: "blur(8px)",
  borderRadius: "1rem",
};

const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(0,99,196,0.3)",
  color: "white",
};

const inputErrorStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(239,68,68,0.6)",
  color: "white",
};

/* ─── Page ───────────────────────────────────────────────────── */
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
      if (!res.ok || !data.success)
        throw new Error(data.error || "Something went wrong.");
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: unknown) {
      setStatus("error");
      setServerError(
        err instanceof Error ? err.message : "An unexpected error occurred.",
      );
    }
  };

  return (
    <>
      <Navigation />
      <main
        className="min-h-screen"
        style={{
          background:
            "linear-gradient(135deg, #0a1628 0%, #0d1f3c 50%, #0a1628 100%)",
        }}
      >
        {/* ── Hero ── */}
        <section className="relative overflow-hidden py-24">
          <div
            className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full blur-3xl"
            style={{ background: "rgba(0,99,196,0.25)" }}
          />
          <div
            className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full blur-3xl"
            style={{ background: "rgba(0,99,196,0.15)" }}
          />

          <div className="relative mx-auto max-w-3xl px-6 text-center">
            <span
              className="inline-block mb-5 px-4 py-1 rounded-full text-sm font-medium"
              style={{
                background: "rgba(0,99,196,0.15)",
                border: "1px solid rgba(0,99,196,0.5)",
                color: "#60a5fa",
              }}
            >
              <Sparkles className="inline-block mr-1.5 h-3 w-3" />
              Get In Touch
            </span>

            <h1 className="mb-5 text-5xl font-bold leading-tight tracking-tight md:text-6xl text-white">
              We&apos;re Here to{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(90deg, #60a5fa, #0063c4)",
                }}
              >
                Help You
              </span>
            </h1>
            <p className="text-lg" style={{ color: "#94a3b8" }}>
              Have a question, need guidance, or want to collaborate? Reach out
              and our team will get back to you promptly.
            </p>
          </div>
        </section>

        {/* ── Main Grid ── */}
        <section className="mx-auto max-w-6xl px-6 pb-20">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* ── Left: Contact Info ── */}
            <div className="space-y-4">
              <div className="mb-2">
                <h2 className="text-xl font-bold text-white">
                  Contact Information
                </h2>
                <p className="mt-1 text-sm" style={{ color: "#64748b" }}>
                  Multiple ways to reach the PathFinder team.
                </p>
              </div>

              {CONTACT_INFO.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 p-5 transition-all duration-300 cursor-default"
                  style={glassCard}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.border = "1px solid rgba(0,99,196,0.6)";
                    el.style.boxShadow = "0 8px 32px rgba(0,99,196,0.2)";
                    el.style.background = "rgba(0,99,196,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.border = "1px solid rgba(0,99,196,0.25)";
                    el.style.boxShadow = "none";
                    el.style.background = "rgba(255,255,255,0.04)";
                  }}
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(0,99,196,0.3), rgba(0,74,147,0.2))",
                      border: "1px solid rgba(0,99,196,0.4)",
                    }}
                  >
                    <item.icon
                      className="h-5 w-5"
                      style={{ color: "#60a5fa" }}
                    />
                  </div>
                  <div>
                    <p
                      className="text-xs font-medium uppercase tracking-wide"
                      style={{ color: "#60a5fa" }}
                    >
                      {item.label}
                    </p>
                    <p className="mt-0.5 font-semibold text-sm text-white">
                      {item.value}
                    </p>
                    <p className="text-xs" style={{ color: "#64748b" }}>
                      {item.sub}
                    </p>
                  </div>
                </div>
              ))}

              {/* FAQ nudge */}
              <div
                className="p-5"
                style={{
                  background: "rgba(0,99,196,0.12)",
                  border: "1px solid rgba(0,99,196,0.45)",
                  borderRadius: "1rem",
                }}
              >
                <p className="text-sm font-semibold text-white">
                  Check our FAQ first!
                </p>
                <p className="mt-1 text-xs" style={{ color: "#94a3b8" }}>
                  Many common questions are answered in our Help Centre — you
                  might get an instant answer without waiting.
                </p>
                <button
                  className="mt-3 text-xs font-medium"
                  style={{ color: "#60a5fa" }}
                >
                  Visit Help Centre →
                </button>
              </div>
            </div>

            {/* ── Right: Form ── */}
            <div className="lg:col-span-2">
              <div className="p-8" style={glassCard}>
                <h2 className="text-xl font-bold text-white mb-1">
                  Send Us a Message
                </h2>
                <p className="text-sm mb-6" style={{ color: "#64748b" }}>
                  Fill in the form below and we&apos;ll respond within one
                  business day.
                </p>

                {/* Success */}
                {status === "success" && (
                  <div
                    className="flex items-start gap-3 mb-6 p-4 rounded-xl"
                    style={{
                      background: "rgba(16,185,129,0.1)",
                      border: "1px solid rgba(16,185,129,0.35)",
                    }}
                  >
                    <CheckCircle2
                      className="h-5 w-5 mt-0.5 shrink-0"
                      style={{ color: "#34d399" }}
                    />
                    <p className="text-sm" style={{ color: "#6ee7b7" }}>
                      Your message has been sent! We&apos;ll get back to you
                      within 24 hours.
                    </p>
                  </div>
                )}

                {/* Error */}
                {status === "error" && (
                  <div
                    className="flex items-start gap-3 mb-6 p-4 rounded-xl"
                    style={{
                      background: "rgba(239,68,68,0.1)",
                      border: "1px solid rgba(239,68,68,0.35)",
                    }}
                  >
                    <AlertCircle
                      className="h-5 w-5 mt-0.5 shrink-0"
                      style={{ color: "#f87171" }}
                    />
                    <p className="text-sm" style={{ color: "#fca5a5" }}>
                      {serverError}
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Name + Email */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="name"
                        className="text-sm"
                        style={{ color: "#cbd5e1" }}
                      >
                        Full Name <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="Ali Raza"
                        value={formData.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        disabled={status === "loading"}
                        className="placeholder:text-slate-500"
                        style={errors.name ? inputErrorStyle : inputStyle}
                      />
                      {errors.name && (
                        <p className="text-xs text-red-400">{errors.name}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <Label
                        htmlFor="email"
                        className="text-sm"
                        style={{ color: "#cbd5e1" }}
                      >
                        Email Address <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="ali@example.com"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        disabled={status === "loading"}
                        className="placeholder:text-slate-500"
                        style={errors.email ? inputErrorStyle : inputStyle}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-400">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="subject"
                      className="text-sm"
                      style={{ color: "#cbd5e1" }}
                    >
                      Subject <span className="text-red-400">*</span>
                    </Label>
                    <Select
                      value={formData.subject}
                      onValueChange={(val) => updateField("subject", val)}
                      disabled={status === "loading"}
                    >
                      <SelectTrigger
                        id="subject"
                        className="placeholder:text-slate-500"
                        style={errors.subject ? inputErrorStyle : inputStyle}
                      >
                        <SelectValue placeholder="Select a topic…" />
                      </SelectTrigger>
                      <SelectContent
                        style={{
                          background: "#0d1f3c",
                          border: "1px solid rgba(0,99,196,0.4)",
                          color: "white",
                        }}
                      >
                        {SUBJECT_OPTIONS.map((opt) => (
                          <SelectItem
                            key={opt.value}
                            value={opt.value}
                            className="text-white focus:bg-blue-900/40 focus:text-white"
                          >
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.subject && (
                      <p className="text-xs text-red-400">{errors.subject}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="message"
                      className="text-sm"
                      style={{ color: "#cbd5e1" }}
                    >
                      Message <span className="text-red-400">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help you…"
                      rows={6}
                      value={formData.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      disabled={status === "loading"}
                      className="resize-none placeholder:text-slate-500"
                      style={errors.message ? inputErrorStyle : inputStyle}
                    />
                    <div className="flex justify-between">
                      {errors.message ? (
                        <p className="text-xs text-red-400">{errors.message}</p>
                      ) : (
                        <span />
                      )}
                      <p className="text-xs" style={{ color: "#64748b" }}>
                        {formData.message.length} / 1000
                      </p>
                    </div>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === "loading"}
                    className="w-full text-white border-0 font-semibold"
                    style={{
                      background: "linear-gradient(135deg, #0063c4, #004a93)",
                      boxShadow: "0 8px 32px rgba(0,99,196,0.4)",
                    }}
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
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
