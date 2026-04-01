"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function SettingsPage() {

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const fetchProfile = async () => {

    const res = await fetch("/api/admin/profile")

    const data = await res.json()

     console.log("res" , data);

    setForm({
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      email: data.email || "",
      password: ""
    })

    setLoading(false)
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const updateProfile = async () => {

    setSaving(true)

    await fetch("/api/admin/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })

    setSaving(false)

    alert("Profile updated successfully")
  }

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>
  }

  return (
    <div className="max-w-2xl space-y-6">

      <div>
        <h1 className="text-2xl font-semibold">
          Settings
        </h1>

        <p className="text-sm text-muted-foreground">
          Manage your admin profile
        </p>
      </div>

      <Card>

        <CardHeader>
          <CardTitle>
            Profile Information
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">

          <div className="grid grid-cols-2 gap-4">

            <div>
              <Label>First Name</Label>
              <Input
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Last Name</Label>
              <Input
                value={form.lastName}
                onChange={(e) =>
                  setForm({ ...form, lastName: e.target.value })
                }
              />
            </div>

          </div>

          <div>
            <Label>Email</Label>
            <Input
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          <div>
            <Label>New Password</Label>
            <Input
              type="password"
              placeholder="Leave empty if not changing"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          <Button
            onClick={updateProfile}
            disabled={saving}
            className="w-full"
          >
            {saving ? "Saving..." : "Update Profile"}
          </Button>

        </CardContent>

      </Card>

    </div>
  )
}