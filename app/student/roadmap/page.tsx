"use client";

import { useState } from "react";
import jsPDF from "jspdf";

export default function RoadmapPage() {
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState<any>(null);

  const [form, setForm] = useState({
    education: "",
    career: "",
    skillLevel: "",
    skills: "",
    hoursPerDay: "",
    goal: "",
    preference: "",
    challenges: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateRoadmap = async () => {
    setLoading(true);
    setRoadmap(null);

    const res = await fetch("/api/roadmap/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setRoadmap(data);

    setLoading(false);
  };

  // 🚀 PDF DOWNLOAD FUNCTION
  const downloadPDF = () => {
    if (!roadmap) return;

    const doc = new jsPDF();
    let y = 10;

    doc.setFontSize(16);
    doc.text(roadmap.title || "AI Roadmap", 10, y);
    y += 10;

    roadmap.roadmap?.forEach((week: any) => {
      doc.setFontSize(14);
      doc.text(`Week ${week.week}`, 10, y);
      y += 8;

      doc.setFontSize(11);
      doc.text(`Focus: ${week.focus}`, 10, y);
      y += 6;

      doc.text(`Project: ${week.project}`, 10, y);
      y += 6;

      doc.text("Topics:", 10, y);
      y += 5;

      week.topics?.forEach((t: string) => {
        doc.text(`- ${t}`, 12, y);
        y += 5;
      });

      y += 5;

      if (y > 270) {
        doc.addPage();
        y = 10;
      }
    });

    doc.save("ai-roadmap.pdf");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">

      <h1 className="text-2xl font-bold">AI Roadmap Generator</h1>

      {/* FORM */}
      <div className="space-y-3">

        <select name="education" onChange={handleChange} className="border p-2 w-full">
          <option value="">Education Level</option>
          <option>Matric</option>
          <option>Intermediate</option>
          <option>Bachelor</option>
          <option>Graduate</option>
        </select>

        <select name="career" onChange={handleChange} className="border p-2 w-full">
          <option value="">Career Interest</option>
          <option>Web Development</option>
          <option>AI / ML</option>
          <option>UI/UX Design</option>
          <option>Cyber Security</option>
        </select>

        <select name="skillLevel" onChange={handleChange} className="border p-2 w-full">
          <option value="">Skill Level</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>

        <input
          name="skills"
          onChange={handleChange}
          placeholder="Skills (React, HTML...)"
          className="border p-2 w-full"
        />

        <select name="hoursPerDay" onChange={handleChange} className="border p-2 w-full">
          <option value="">Hours per day</option>
          <option>1-2 hours</option>
          <option>3-4 hours</option>
          <option>5+ hours</option>
        </select>

        <select name="goal" onChange={handleChange} className="border p-2 w-full">
          <option value="">Goal</option>
          <option>Job</option>
          <option>Freelancing</option>
          <option>Startup</option>
        </select>

        <select name="preference" onChange={handleChange} className="border p-2 w-full">
          <option value="">Learning Style</option>
          <option>Practical</option>
          <option>Theory</option>
          <option>Balanced</option>
        </select>

        <input
          name="challenges"
          onChange={handleChange}
          placeholder="Challenges (optional)"
          className="border p-2 w-full"
        />

        <button
          onClick={generateRoadmap}
          className="bg-black text-white px-4 py-2 w-full"
        >
          {loading ? "Generating..." : "Generate Roadmap"}
        </button>
      </div>

      {/* OUTPUT */}
      {roadmap && (
        <div className="space-y-4 mt-6">

          <h2 className="text-xl font-semibold">{roadmap.title}</h2>

          {roadmap.roadmap?.map((week: any) => (
            <div key={week.week} className="border p-4 rounded">
              <h3 className="font-bold">Week {week.week}</h3>
              <p className="text-sm text-gray-600">{week.focus}</p>

              <ul className="list-disc ml-5">
                {week.topics?.map((t: string, i: number) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>

              <p className="mt-2 text-sm">
                <b>Project:</b> {week.project}
              </p>
            </div>
          ))}

          {/* 🔥 PDF DOWNLOAD BUTTON */}
          <button
            onClick={downloadPDF}
            className="bg-green-600 text-white px-4 py-2 w-full"
          >
            Download PDF Roadmap
          </button>

        </div>
      )}
    </div>
  );
}