"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SaveNotification } from "./save-notification";
import { User } from "lucide-react";

// Flattened interface for form display
interface PersonalInfoForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  education: string; // string for form display
  interests: string;
}

export function ProfileFormSection() {
  const [studentId, setStudentId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState<PersonalInfoForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    education: "",
    interests: "",
  });

  const [editData, setEditData] = useState(formData);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed.id) setStudentId(parsed.id);
      } catch (err) {
        console.error("Failed to parse user from localStorage", err);
      }
    }
  }, []);

  useEffect(() => {
    if (!studentId) return;

    // Try to get full student object from localStorage
    const storedData = localStorage.getItem("studentData");
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);

        // Prepare flattened education string for form
        let flatEducation = "";
        if (parsed.education && typeof parsed.education === "object") {
          flatEducation = `${parsed.education.degree}, ${parsed.education.major}, ${parsed.education.university} (${parsed.education.startYear} - ${parsed.education.endYear})`;
        }

        setFormData({
          firstName: parsed.firstName || "",
          lastName: parsed.lastName || "",
          email: parsed.email || "",
          phone: parsed.phone || "",
          dateOfBirth: parsed.dateOfBirth ? parsed.dateOfBirth.split("T")[0] : "",
          education: flatEducation,
          interests: parsed.interests || "",
        });

        setEditData({
          firstName: parsed.firstName || "",
          lastName: parsed.lastName || "",
          email: parsed.email || "",
          phone: parsed.phone || "",
          dateOfBirth: parsed.dateOfBirth ? parsed.dateOfBirth.split("T")[0] : "",
          education: flatEducation,
          interests: parsed.interests || "",
        });

        setLoading(false);
        return;
      } catch (err) {
        console.error(err);
      }
    }

    // If not in localStorage, fetch from API
    async function fetchStudent() {
      try {
        const res = await fetch(`/api/students/getStudent?studentId=${studentId}`);
        if (!res.ok) throw new Error("Failed to fetch student");
        const data = await res.json();

        // Store full student object in localStorage as-is
        localStorage.setItem("studentData", JSON.stringify(data));

        // Flatten education for form display
        let flatEducation = "";
        if (data.education && typeof data.education === "object") {
          flatEducation = `${data.education.degree}, ${data.education.major}, ${data.education.university} (${data.education.startYear} - ${data.education.endYear})`;
        }

        setFormData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phone: data.phone || "",
          dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split("T")[0] : "",
          education: flatEducation,
          interests: data.interests || "",
        });

        setEditData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phone: data.phone || "",
          dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split("T")[0] : "",
          education: flatEducation,
          interests: data.interests || "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchStudent();
  }, [studentId]);

  const handleEdit = () => {
    setEditData(formData);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Update localStorage full object while keeping flattened form for UI
    const storedData = localStorage.getItem("studentData");
    if (storedData) {
      const parsed = JSON.parse(storedData);
      const updated = { ...parsed };

      // Update only the editable fields
      updated.firstName = editData.firstName;
      updated.lastName = editData.lastName;
      updated.email = editData.email;
      updated.phone = editData.phone;
      updated.dateOfBirth = editData.dateOfBirth;
      updated.interests = editData.interests;

      // Save back full object
      localStorage.setItem("studentData", JSON.stringify(updated));
    }

    setFormData(editData);
    setIsEditing(false);
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 3000);
  };

  if (loading) return <p className="text-center py-8">Loading student data...</p>;

  return (
    <>
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isEditing ? (
            <DisplayView data={formData} onEdit={handleEdit} />
          ) : (
            <EditView data={editData} onChange={handleChange} onSave={handleSave} onCancel={handleCancel} />
          )}
        </CardContent>
      </Card>

      {showSaved && <SaveNotification message="Personal information updated!" />}
    </>
  );
}

// Reusable display view
function DisplayView({ data, onEdit }: { data: PersonalInfoForm; onEdit: () => void }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="First Name" value={data.firstName} />
        <Field label="Last Name" value={data.lastName} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Email" value={data.email} />
        {/* <Field label="Phone" value={data.phone} /> */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* <Field label="Education" value={data.education} /> */}
        <Field label="Interests" value={data.interests} />
      </div>
      {/* <Field label="Date of Birth" value={data.dateOfBirth} /> */}
      <Button onClick={onEdit} className="mt-4">Edit Information</Button>
    </div>
  );
}

// Reusable edit view
function EditView({ data, onChange, onSave, onCancel }: { data: PersonalInfoForm; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; onSave: () => void; onCancel: () => void; }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField id="firstName" label="First Name" name="firstName" value={data.firstName} onChange={onChange} />
        <InputField id="lastName" label="Last Name" name="lastName" value={data.lastName} onChange={onChange} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField id="email" label="Email" name="email" type="email" value={data.email} onChange={onChange} />
        <InputField id="phone" label="Phone" name="phone" value={data.phone} onChange={onChange} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField id="education" label="Education" name="education" value={data.education} onChange={onChange} />
        <InputField id="interests" label="Interests" name="interests" value={data.interests} onChange={onChange} />
      </div>
      <InputField id="dateOfBirth" label="Date of Birth" name="dateOfBirth" type="date" value={data.dateOfBirth} onChange={onChange} />
      <div className="flex gap-3 pt-4">
        <Button onClick={onSave} className="flex-1">Save Changes</Button>
        <Button variant="outline" onClick={onCancel} className="flex-1">Cancel</Button>
      </div>
    </div>
  );
}

// Simple Field component
function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <Label className="text-xs font-semibold text-muted-foreground mb-2 block">{label}</Label>
      <p className="text-foreground">{value}</p>
    </div>
  );
}

// Reusable InputField component
interface InputFieldProps {
  id: string;
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputField({ id, label, name, type = "text", value, onChange }: InputFieldProps) {
  return (
    <div>
      <Label htmlFor={id} className="text-xs font-semibold mb-2 block">{label}</Label>
      <Input id={id} name={name} type={type} value={value} onChange={onChange} />
    </div>
  );
}