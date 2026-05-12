"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, User, Settings } from "lucide-react";
import Link from "next/link";
import { Label } from "@/components/ui/label";

/* ─── Shared Styles ───────────────────────── */
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

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (!localUser) return;

    const parsedUser = JSON.parse(localUser);
    const id = parsedUser.id;

    async function fetchProfile() {
      try {
        const res = await fetch(`/api/counsellor/getcounsellor?id=${id}`);
        const data = await res.json();
        setUser(data.counsellor);
      } catch (error) {
        console.error("Fetch profile error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const res = await fetch("/api/counsellor/getcounsellor", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await res.json();
      setUser(data.user);

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="p-6 text-white" style={pageBackground}>
        Loading...
      </div>
    );

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

      {/* Header */}
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/counsellor">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>

          <div>
            <h1 className="text-3xl font-bold text-white">
              Profile Settings
            </h1>
            <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.7)" }}>
              Manage your profile information
            </p>
          </div>
        </div>

        <div
          className="h-10 w-10 flex items-center justify-center rounded-xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,99,196,0.3), rgba(0,74,147,0.2))",
            border: "1px solid rgba(0,99,196,0.4)",
          }}
        >
          <Settings className="h-5 w-5 text-blue-300" />
        </div>
      </div>

      {/* Form Card */}
      <div className="max-w-5xl mx-auto" style={glassCard}>
        <CardContent className="space-y-6 p-6">
          {/* First Name */}
          <div className="space-y-2">
            <Label className="text-white">First Name</Label>
            <Input
              name="firstName"
              value={user?.firstName || ""}
              onChange={handleChange}
              className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
            />
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <Label className="text-white">Last Name</Label>
            <Input
              name="lastName"
              value={user?.lastName || ""}
              onChange={handleChange}
              className="bg-white/5 border-white/10 text-white"
            />
          </div>

          {/* Specialization */}
          <div className="space-y-2">
            <Label className="text-white">Specialization</Label>
            <Input
              name="specialization"
              value={user?.specialization || ""}
              onChange={handleChange}
              className="bg-white/5 border-white/10 text-white"
            />
          </div>

          {/* Experience */}
          <div className="space-y-2">
            <Label className="text-white">Experience (Years)</Label>
            <Input
              name="experience"
              type="number"
              value={user?.experience || ""}
              onChange={handleChange}
              className="bg-white/5 border-white/10 text-white"
            />
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label className="text-white">Professional Bio</Label>
            <Textarea
              name="bio"
              rows={4}
              value={user?.bio || ""}
              onChange={handleChange}
              className="bg-white/5 border-white/10 text-white"
            />
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            disabled={saving}
            className="w-full text-white font-semibold"
            style={{
              background: saving
                ? "rgba(255,255,255,0.1)"
                : "linear-gradient(135deg, #0063c4, #004a93)",
              boxShadow: saving ? "none" : "0 4px 20px rgba(0,99,196,0.4)",
            }}
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </CardContent>
      </div>
    </div>
  );
}