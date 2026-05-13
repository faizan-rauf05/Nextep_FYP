"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CareerMatch {
  title: string;
  matchPercent: number;
  description: string;
  universities: string[];
  opportunities: string[];
  salaryRangePKR: string;
  nextStep: string;
}

interface CareerResult {
  topCareer: string;
  whyItFits: string;
  careers: CareerMatch[];
  generalAdvice: string;
}

// ─── Quiz Questions ───────────────────────────────────────────────────────────

const QUESTIONS = [
  {
    id: "activity",
    label: "Question 1 of 6",
    question: "Which activity do you enjoy most?",
    emoji: "🎯",
    options: [
      { value: "create", label: "Drawing, designing, or making things", icon: "🎨" },
      { value: "analyze", label: "Solving puzzles or crunching numbers", icon: "🧩" },
      { value: "help", label: "Helping or teaching other people", icon: "🤝" },
      { value: "lead", label: "Organizing events or leading groups", icon: "🚀" },
      { value: "explore", label: "Experimenting or exploring nature", icon: "🔬" },
    ],
  },
  {
    id: "subject",
    label: "Question 2 of 6",
    question: "Which school subjects did you find most interesting?",
    emoji: "📚",
    options: [
      { value: "math", label: "Math & Physics", icon: "📐" },
      { value: "bio", label: "Biology & Chemistry", icon: "🧬" },
      { value: "arts", label: "Arts & Literature", icon: "🎭" },
      { value: "cs", label: "Computer Science", icon: "💻" },
      { value: "biz", label: "Business & Economics", icon: "📊" },
      { value: "soc", label: "Social Sciences & History", icon: "🌍" },
    ],
  },
  {
    id: "workStyle",
    label: "Question 3 of 6",
    question: "How do you prefer to work?",
    emoji: "⚡",
    options: [
      { value: "alone", label: "Independently — I focus better alone", icon: "🧘" },
      { value: "team", label: "In a team — I thrive collaborating", icon: "👥" },
      { value: "mix", label: "A mix of both", icon: "⚖️" },
    ],
  },
  {
    id: "goal",
    label: "Question 4 of 6",
    question: "What matters most to you in a career?",
    emoji: "🌟",
    options: [
      { value: "impact", label: "Making a positive impact on society", icon: "💚" },
      { value: "money", label: "High earning potential", icon: "💰" },
      { value: "creative", label: "Creative freedom & expression", icon: "🎪" },
      { value: "stable", label: "Job security & stability", icon: "🛡️" },
      { value: "growth", label: "Continuous learning & growth", icon: "📈" },
    ],
  },
  {
    id: "environment",
    label: "Question 5 of 6",
    question: "What kind of work environment suits you?",
    emoji: "🏢",
    options: [
      { value: "office", label: "Office / corporate setting", icon: "🏢" },
      { value: "field", label: "Outdoors / field work", icon: "🌳" },
      { value: "remote", label: "Remote / work from home", icon: "🏠" },
      { value: "hospital", label: "Hospital / clinic / lab", icon: "🏥" },
      { value: "studio", label: "Studio / creative space", icon: "🎬" },
    ],
  },
  {
    id: "education",
    label: "Question 6 of 6",
    question: "What is your current education level?",
    emoji: "🎓",
    options: [
      { value: "matric", label: "Matric (Secondary School)", icon: "📓" },
      { value: "inter", label: "Intermediate / A-Levels", icon: "📗" },
      { value: "bach", label: "Bachelor's degree", icon: "📘" },
      { value: "grad", label: "Graduate / Post-grad", icon: "🎓" },
    ],
  },
];

// ─── Shared styles ────────────────────────────────────────────────────────────

const glassCard: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(0,99,196,0.25)",
  backdropFilter: "blur(8px)",
  borderRadius: "1rem",
};

const pageBg: React.CSSProperties = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #0a1628 0%, #0d1f3c 50%, #0a1628 100%)",
  display: "flex",
  justifyContent: "center",
  padding: "40px 16px 80px",
  fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
  position: "relative",
};

const pageCenterBg: React.CSSProperties = {
  ...pageBg,
  alignItems: "center",
};

// ─── Match bar ────────────────────────────────────────────────────────────────

function MatchBar({ percent }: { percent: number }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 99, height: 6, width: "100%", overflow: "hidden" }}>
      <div
        style={{
          height: "100%",
          width: `${percent}%`,
          background: "linear-gradient(90deg, #0063c4, #60a5fa)",
          borderRadius: 99,
          transition: "width 0.8s ease",
        }}
      />
    </div>
  );
}


// ─── Blobs ────────────────────────────────────────────────────────────────────

function Blobs() {
  return (
    <>
      <div style={{
        pointerEvents: "none", position: "fixed", top: -128, left: -128,
        height: 384, width: 384, borderRadius: "50%", filter: "blur(80px)",
        background: "rgba(0,99,196,0.2)", zIndex: 0,
      }} />
      <div style={{
        pointerEvents: "none", position: "fixed", bottom: -128, right: -128,
        height: 384, width: 384, borderRadius: "50%", filter: "blur(80px)",
        background: "rgba(0,99,196,0.15)", zIndex: 0,
      }} />
    </>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

type Stage = "quiz" | "loading" | "results";

export default function CareerDiscoveryPage() {
  const [stage, setStage] = useState<Stage>("quiz");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string>("");
  const [result, setResult] = useState<CareerResult | null>(null);
  const [error, setError] = useState("");
  const [expandedCard, setExpandedCard] = useState<number | null>(0);

  const q = QUESTIONS[currentQ];
  const progress = (currentQ / QUESTIONS.length) * 100;
  const isLast = currentQ === QUESTIONS.length - 1;

  const handleSelect = (value: string) => setSelected(value);

  const handleNext = async () => {
    const updatedAnswers = { ...answers, [q.id]: selected };
    setAnswers(updatedAnswers);
    setSelected("");
    if (isLast) {
      setStage("loading");
      try {
        const res = await fetch("/api/roadmap/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedAnswers),
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setResult(data);
        setStage("results");
      } catch (err: any) {
        setError(err.message || "Something went wrong. Please try again.");
        setStage("quiz");
        setCurrentQ(0);
        setAnswers({});
      }
    } else {
      setCurrentQ((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQ === 0) return;
    const prevQ = QUESTIONS[currentQ - 1];
    setSelected(answers[prevQ.id] || "");
    setCurrentQ((prev) => prev - 1);
  };

  const handleRestart = () => {
    setStage("quiz");
    setCurrentQ(0);
    setAnswers({});
    setSelected("");
    setResult(null);
    setError("");
    setExpandedCard(0);
  };

  const handleGenerateRoadmap = (career: CareerMatch) => {
    const params = new URLSearchParams({
      career: career.title,
      education: answers.education || "",
      goal: answers.goal === "money" ? "Job" : "Freelancing",
    });
    window.location.href = `/roadmaps?${params.toString()}`;
  };

  // ─── Loading ──────────────────────────────────────────────────────────────

  if (stage === "loading") {
    return (
      <div style={pageCenterBg}>
        <Blobs />
        <div style={{ ...glassCard, textAlign: "center", padding: "60px 40px", maxWidth: 420, width: "100%", zIndex: 1 }}>
          <div style={{
            width: 52, height: 52,
            border: "3px solid rgba(0,99,196,0.3)",
            borderTop: "3px solid #0063c4",
            borderRadius: "50%",
            margin: "0 auto 24px",
            animation: "spin 1s linear infinite",
          }} />
          <p style={{ fontSize: 20, fontWeight: 700, color: "#ffffff", marginBottom: 8 }}>
            Analyzing your profile
          </p>
          <p style={{ fontSize: 14, color: "#64748b", marginBottom: 28 }}>
            Matching you with the best careers…
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
            {["Checking interests", "Mapping fields", "Finding universities"].map((t, i) => (
              <span
                key={i}
                style={{
                  fontSize: 13, color: "#60a5fa",
                  padding: "6px 16px", borderRadius: 99,
                  background: "rgba(0,99,196,0.15)",
                  border: "1px solid rgba(0,99,196,0.3)",
                  animationDelay: `${i * 0.4}s`,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ─── Results ──────────────────────────────────────────────────────────────

  if (stage === "results" && result) {
    return (
      <div style={pageBg}>
        <Blobs />
        <div style={{ width: "100%", maxWidth: 720, display: "flex", flexDirection: "column", gap: 20, zIndex: 1 }}>

          {/* Header */}
          <div style={{ textAlign: "center", paddingBottom: 8 }}>
            <span style={{
              display: "inline-block",
              background: "rgba(0,99,196,0.2)",
              border: "1px solid rgba(0,99,196,0.4)",
              color: "#60a5fa",
              fontSize: 12, fontWeight: 700,
              padding: "6px 16px", borderRadius: 99,
              marginBottom: 16, letterSpacing: "0.05em",
            }}>
              🎯 Your Career Matches
            </span>
            <h1 style={{ fontSize: 38, fontWeight: 800, color: "#ffffff", margin: "0 0 12px", letterSpacing: "-0.03em" }}>
              We found your path!
            </h1>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.7, maxWidth: 600, margin: "0 auto" }}>
              {result.whyItFits}
            </p>
          </div>

          {/* Career Cards */}
          {result.careers.map((career, idx) => {
            const isOpen = expandedCard === idx;
            const isTop = idx === 0;

            const matchStyle =
              idx === 0
                ? { bg: "rgba(0,99,196,0.2)", text: "#60a5fa", border: "rgba(0,99,196,0.5)" }
                : idx === 1
                ? { bg: "rgba(16,185,129,0.15)", text: "#34d399", border: "rgba(16,185,129,0.4)" }
                : { bg: "rgba(251,191,36,0.15)", text: "#fbbf24", border: "rgba(251,191,36,0.4)" };

            return (
              <div
                key={idx}
                style={{
                  ...glassCard,
                  border: isTop ? "1px solid rgba(0,99,196,0.6)" : "1px solid rgba(0,99,196,0.2)",
                  overflow: "hidden",
                }}
              >
                {/* Card header */}
                <div
                  style={{
                    display: "flex", alignItems: "center",
                    justifyContent: "space-between",
                    padding: "20px 22px 16px", cursor: "pointer",
                  }}
                  onClick={() => setExpandedCard(isOpen ? null : idx)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setExpandedCard(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
                    {isTop && (
                      <span style={{
                        background: "linear-gradient(135deg, #0063c4, #004a93)",
                        color: "#fff",
                        fontSize: 11, fontWeight: 700,
                        padding: "3px 10px", borderRadius: 99,
                        letterSpacing: "0.05em", textTransform: "uppercase",
                      }}>
                        Best Match
                      </span>
                    )}
                    <span style={{
                      background: matchStyle.bg,
                      color: matchStyle.text,
                      border: `1px solid ${matchStyle.border}`,
                      padding: "5px 12px", borderRadius: 99,
                      fontSize: 12, fontWeight: 700,
                    }}>
                      {career.matchPercent}% fit
                    </span>
                  </div>
                  <span style={{ fontSize: 14, color: "#64748b", userSelect: "none" }}>
                    {isOpen ? "▲" : "▼"}
                  </span>
                </div>

                {/* Title & bar */}
                <div style={{ padding: "0 22px 16px" }}>
                  <h2 style={{ fontSize: 22, fontWeight: 800, color: "#ffffff", margin: "0 0 12px", letterSpacing: "-0.02em" }}>
                    {career.title}
                  </h2>
                  <MatchBar percent={career.matchPercent} />
                </div>

                {/* Expandable body */}
                {isOpen && (
                  <div style={{ padding: "0 22px 22px", borderTop: "1px solid rgba(0,99,196,0.15)" }}>
                    <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.8, margin: "16px 0 20px" }}>
                      {career.description}
                    </p>

                    {/* Salary */}
                    <div style={{
                      background: "rgba(0,99,196,0.08)",
                      border: "1px solid rgba(0,99,196,0.2)",
                      borderRadius: 12, padding: "14px 16px",
                      display: "flex", justifyContent: "space-between",
                      alignItems: "center", marginBottom: 18,
                    }}>
                      <span style={{ fontSize: 13, color: "#64748b" }}>💰 Salary Range (PKR)</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: "#60a5fa" }}>{career.salaryRangePKR}</span>
                    </div>

                    {/* Universities */}
                    <div style={{ marginBottom: 18 }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#ffffff", marginBottom: 10 }}>
                        🏛️ Top Universities in Pakistan
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {career.universities.map((u, i) => (
                          <span key={i} style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(0,99,196,0.25)",
                            color: "#94a3b8",
                            padding: "6px 14px", borderRadius: 99,
                            fontSize: 12, fontWeight: 500,
                          }}>
                            {u}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Opportunities */}
                    <div style={{ marginBottom: 18 }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#ffffff", marginBottom: 10 }}>
                        💼 Career Opportunities
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {career.opportunities.map((o, i) => (
                          <span key={i} style={{
                            background: "rgba(0,99,196,0.15)",
                            border: "1px solid rgba(0,99,196,0.35)",
                            color: "#60a5fa",
                            padding: "6px 14px", borderRadius: 99,
                            fontSize: 12, fontWeight: 500,
                          }}>
                            {o}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Next step */}
                    <div style={{
                      background: "rgba(16,185,129,0.08)",
                      border: "1px solid rgba(16,185,129,0.25)",
                      borderRadius: 12, padding: "14px 16px", marginBottom: 18,
                    }}>
                      <span style={{ fontSize: 13, color: "#34d399", fontWeight: 600 }}>✅ Next step: </span>
                      <span style={{ fontSize: 13, color: "#94a3b8" }}>{career.nextStep}</span>
                    </div>

                    {/* CTA */}
                    <button
                      onClick={() => handleGenerateRoadmap(career)}
                      style={{
                        width: "100%",
                        background: "linear-gradient(135deg, #0063c4, #004a93)",
                        color: "#fff", border: "none",
                        borderRadius: 14, padding: "15px 24px",
                        fontSize: 14, fontWeight: 700, cursor: "pointer",
                        boxShadow: "0 4px 20px rgba(0,99,196,0.4)",
                      }}
                    >
                      Generate Roadmap for {career.title} →
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {/* General Advice */}
          <div style={{
            ...glassCard,
            padding: 22,
            border: "1px solid rgba(251,191,36,0.25)",
            background: "rgba(251,191,36,0.04)",
          }}>
            <p style={{ margin: "0 0 8px", fontWeight: 700, fontSize: 14, color: "#fbbf24" }}>
              💡 Counselor's Advice
            </p>
            <p style={{ margin: 0, fontSize: 14, color: "#94a3b8", lineHeight: 1.7 }}>
              {result.generalAdvice}
            </p>
          </div>

          {/* Restart */}
          <button
            onClick={handleRestart}
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(0,99,196,0.25)",
              borderRadius: 14, padding: "15px 24px",
              fontSize: 14, fontWeight: 600, cursor: "pointer",
              color: "#64748b",
            }}
          >
            ↺ Retake the Quiz
          </button>
        </div>
      </div>
    );
  }

  // ─── Quiz ─────────────────────────────────────────────────────────────────

  return (
    <div style={pageBg}>
      <Blobs />
      <div style={{ width: "100%", maxWidth: 680, display: "flex", flexDirection: "column", gap: 24, zIndex: 1 }}>

        {/* Progress bar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 99, overflow: "hidden" }}>
            <div style={{
              height: "100%", width: `${progress}%`,
              background: "linear-gradient(90deg, #0063c4, #60a5fa)",
              borderRadius: 99, transition: "width 0.4s ease",
            }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontSize: 12, color: "#64748b", margin: 0 }}>{q.label}</p>
            <p style={{ fontSize: 12, color: "#60a5fa", margin: 0, fontWeight: 600 }}>
              {Math.round(progress)}% complete
            </p>
          </div>
        </div>

        {/* Question box */}
        <div style={{ ...glassCard, textAlign: "center", padding: "32px 24px" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>{q.emoji}</div>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: "#ffffff", margin: 0, letterSpacing: "-0.03em", lineHeight: 1.25 }}>
            {q.question}
          </h2>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.3)",
            color: "#f87171",
            borderRadius: 14, padding: "14px 18px", fontSize: 14,
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {q.options.map((opt) => {
            const isSelected = selected === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  width: "100%", padding: "18px 20px",
                  background: isSelected ? "rgba(0,99,196,0.15)" : "rgba(255,255,255,0.04)",
                  border: isSelected ? "1px solid rgba(0,99,196,0.6)" : "1px solid rgba(0,99,196,0.18)",
                  borderRadius: 16, cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.15s ease",
                  transform: isSelected ? "translateY(-1px)" : "none",
                }}
              >
                <span style={{ fontSize: 22, flexShrink: 0 }}>{opt.icon}</span>
                <span style={{ fontSize: 15, fontWeight: 500, color: isSelected ? "#ffffff" : "#94a3b8", flex: 1, lineHeight: 1.5 }}>
                  {opt.label}
                </span>
                {isSelected && (
                  <span style={{
                    fontSize: 12, fontWeight: 700, color: "#60a5fa",
                    background: "rgba(0,99,196,0.25)",
                    border: "1px solid rgba(0,99,196,0.5)",
                    borderRadius: 99, padding: "3px 10px",
                  }}>
                    ✓ Selected
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Nav */}
        <div style={{ display: "flex", gap: 12 }}>
          {currentQ > 0 && (
            <button
              onClick={handleBack}
              style={{
                padding: "14px 20px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(0,99,196,0.25)",
                borderRadius: 14, fontSize: 14, fontWeight: 600,
                cursor: "pointer", color: "#64748b",
              }}
            >
              ← Back
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!selected}
            style={{
              flex: 1, padding: "15px 24px",
              background: selected
                ? "linear-gradient(135deg, #0063c4, #004a93)"
                : "rgba(255,255,255,0.05)",
              color: selected ? "#ffffff" : "#4a5568",
              border: "none", borderRadius: 14,
              fontSize: 15, fontWeight: 700, cursor: selected ? "pointer" : "not-allowed",
              transition: "all 0.2s ease",
              boxShadow: selected ? "0 4px 20px rgba(0,99,196,0.4)" : "none",
              marginLeft: currentQ === 0 ? "auto" : undefined,
            }}
          >
            {isLast ? "Find My Careers 🎯" : "Continue →"}
          </button>
        </div>
      </div>
    </div>
  );
}