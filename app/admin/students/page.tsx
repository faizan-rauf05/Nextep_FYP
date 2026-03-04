"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, UserCheck } from "lucide-react";

export default function StudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [activeStudents, setActiveStudents] = useState(0);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/students/getAllStudents");
      const data = await res.json();

      setStudents(data.students);
      setTotalStudents(data.totalStudents);
      setActiveStudents(data.activeStudents);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete Student
  const deleteStudent = async (_id: string) => {
    if (!confirm("Are you sure you want to delete this student?")) return;

    await fetch("/api/students/deleteStudent", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: _id }),
    });

    fetchStudents();
  };

  // ✅ Toggle Student Status (PATCH API)
  const toggleStatus = async (student: any) => {
    try {
      const newStatus = student.status === "active" ? "inactive" : "active";

      const res = await fetch("/api/students/updateStatus", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: student._id,
          status: newStatus,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to update status");
        return;
      }

      fetchStudents(); // refresh list
    } catch (error) {
      console.error("Status update error:", error);
    }
  };

  // ✅ Open Modal
  const openEditModal = (student: any) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  // ✅ Handle Input Change
  const handleChange = (e: any) => {
    setSelectedStudent({
      ...selectedStudent,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Save Updated Student
  const saveStudent = async () => {
    await fetch("/api/students/updateStudent", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: selectedStudent._id,
        firstName: selectedStudent.firstName,
        lastName: selectedStudent.lastName,
        email: selectedStudent.email,
        interests: selectedStudent.interests,
        education: selectedStudent.education,
        status: selectedStudent.status,
      }),
    });

    setIsModalOpen(false);
    fetchStudents();
  };

  return (
    <div className="space-y-6">
      {/* ✅ Stats Section */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="pt-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Students</p>
              <p className="text-2xl font-semibold mt-1">{totalStudents}</p>
            </div>
            <Users className="h-6 w-6 text-muted-foreground" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Students</p>
              <p className="text-2xl font-semibold mt-1">{activeStudents}</p>
            </div>
            <UserCheck className="h-6 w-6 text-muted-foreground" />
          </CardContent>
        </Card>
      </div>

      {/* ✅ Students Table */}
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-lg font-semibold mb-4">Students List</h2>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3">Name</th>
                    <th className="text-left py-3">Email</th>
                    <th className="text-left py-3">Education</th>
                    <th className="text-left py-3">Interest</th>
                    <th className="text-left py-3">Joined</th>
                    <th className="text-left py-3">Status</th>
                    <th className="text-left py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student._id} className="border-b">
                      <td className="py-3">
                        {student.firstName} {student.lastName}
                      </td>
                      <td className="py-3">{student.email}</td>
                      <td className="py-3">{student.education}</td>
                      <td className="py-3">{student.interests}</td>
                      <td className="py-3">
                        {new Date(student.joinedDate).toLocaleDateString()}
                      </td>
                      <td className="py-3">
                        <Button
                          size="sm"
                          variant={
                            student.status === "active"
                              ? "default"
                              : "secondary"
                          }
                          onClick={() => toggleStatus(student)}
                        >
                          {student.status === "active" ? "Active" : "Inactive"}
                        </Button>
                      </td>
                      <td className="py-3 space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditModal(student)}
                        >
                          Edit
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteStudent(student._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ✅ Edit Modal */}
      {isModalOpen && selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[500px] p-6 space-y-4">
            <h2 className="text-xl font-semibold">Edit Student</h2>

            <div className="space-y-3">
              <div>
                <Label>First Name</Label>
                <Input
                  name="firstName"
                  value={selectedStudent.firstName || ""}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label>Last Name</Label>
                <Input
                  name="lastName"
                  value={selectedStudent.lastName || ""}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label>Email</Label>
                <Input
                  name="email"
                  value={selectedStudent.email || ""}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label>Education</Label>
                <Input
                  name="education"
                  value={selectedStudent.education || ""}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label>Interests</Label>
                <Input
                  name="interests"
                  value={selectedStudent.interests || ""}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label>Status</Label>
                <select
                  name="status"
                  value={selectedStudent.status}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={saveStudent}>Save Changes</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
