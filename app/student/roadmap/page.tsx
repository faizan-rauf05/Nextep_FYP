"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

const TOPICS = [
  "Web Development",
  "Data Science",
  "Machine Learning",
  "AI & Deep Learning",
  "Mobile App Development",
  "Cybersecurity",
  "Cloud Computing",
  "Blockchain",
  "UI/UX Design",
  "Game Development",
  "DevOps",
  "Embedded Systems",
  "Robotics",
  "Big Data",
  "Digital Marketing",
  "IoT",
];

const DURATIONS = ["4 Weeks", "6 Weeks", "8 Weeks", "10 Weeks", "12 Weeks"];

export default function RoadmapPage() {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [level, setLevel] = useState("beginner");
  const [duration, setDuration] = useState(DURATIONS[1]);
  const [roadmap, setRoadmap] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const generateRoadmap = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/roadmap/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, level, duration }),
      });
      const data = await res.json();
      setRoadmap(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    if (!roadmap) return;
    const doc = new jsPDF();
    let y = 10;

    doc.setFontSize(16);
    doc.text(`Learning Roadmap: ${roadmap.title}`, 10, y);
    y += 10;

    roadmap?.weeks?.forEach((week: any) => {
      doc.setFontSize(14);
      doc.text(`Week ${week.week}`, 10, y);
      y += 8;

      doc.setFontSize(12);
      if (week.topics?.length) {
        doc.text("Topics:", 12, y);
        y += 6;
        week.topics.forEach((t: string) => {
          doc.text(`- ${t}`, 16, y);
          y += 6;
        });
      }

      if (week.videos?.length) {
        doc.text("Videos:", 12, y);
        y += 6;
        week.videos.forEach((v: any) => {
          doc.text(`- ${v.title}: ${v.url}`, 16, y);
          y += 6;
        });
      }

      if (week.resources?.length) {
        doc.text("Resources:", 12, y);
        y += 6;
        week.resources.forEach((r: any) => {
          doc.text(`- ${r.title}: ${r.url}`, 16, y);
          y += 6;
        });
      }

      if (week.project) {
        doc.text(`Project: ${week.project}`, 12, y);
        y += 10;
      }

      if (y > 270) {
        doc.addPage();
        y = 10;
      }
    });

    doc.save(`${roadmap.title || "roadmap"}.pdf`);
  };

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Learning Roadmap Generator
          </h1>
          <p className="text-gray-500 text-sm">
            Generate a structured roadmap in seconds
          </p>
        </div>

        {/* FORM CARD */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-5 shadow-sm">
          {/* TOPIC */}
          <div>
            <label className="text-sm text-gray-500">Topic</label>
            <select
              className="w-full mt-2 bg-white border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black transition"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            >
              {TOPICS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* LEVEL */}
          <div>
            <label className="text-sm text-gray-500">Level</label>
            <select
              className="w-full mt-2 bg-white border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black transition"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
            </select>
          </div>

          {/* DURATION */}
          <div>
            <label className="text-sm text-gray-500">Duration</label>
            <select
              className="w-full mt-2 bg-white border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black transition"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              {DURATIONS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* BUTTON */}
          <button
            onClick={generateRoadmap}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Roadmap"}
          </button>
        </div>

        {/* RESULT */}
        {roadmap && (
          <div className="space-y-6">
            {/* TITLE */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h2 className="text-xl font-semibold">{roadmap.title}</h2>
            </div>

            {/* WEEKS */}
            <div className="space-y-4">
              {roadmap?.weeks?.map((week: any) => (
                <div
                  key={week.week}
                  className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition"
                >
                  <h3 className="text-lg font-semibold mb-3">
                    Week {week.week}
                  </h3>

                  {/* TOPICS */}
                  {week.topics?.length > 0 && (
                    <div className="mb-3">
                      <p className="text-gray-500 text-sm mb-1">Topics</p>
                      <ul className="list-disc ml-5 text-sm space-y-1">
                        {week.topics.map((t: string, i: number) => (
                          <li key={i}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* VIDEOS */}
                  {week.videos?.length > 0 && (
                    <div className="mb-3">
                      <p className="text-gray-500 text-sm mb-1">Videos</p>
                      <ul className="list-disc ml-5 text-sm space-y-1">
                        {week.videos.map((v: any, i: number) => (
                          <li key={i}>
                            <a
                              href={v.url}
                              target="_blank"
                              className="underline hover:text-gray-600"
                            >
                              {v.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* RESOURCES */}
                  {week.resources?.length > 0 && (
                    <div className="mb-3">
                      <p className="text-gray-500 text-sm mb-1">Resources</p>
                      <ul className="list-disc ml-5 text-sm space-y-1">
                        {week.resources.map((r: any, i: number) => (
                          <li key={i}>
                            <a
                              href={r.url}
                              target="_blank"
                              className="underline hover:text-gray-600"
                            >
                              {r.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* PROJECT */}
                  {week.project && (
                    <div className="mt-3 text-sm">
                      <span className="text-gray-500">Project:</span>{" "}
                      {week.project}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* DOWNLOAD */}
            <button
              onClick={downloadPDF}
              className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
            >
              Download PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
