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

// ─── Helpers ──────────────────────────────────────────────────────────────────

const MATCH_COLORS = [
  { bg: "#E8F5E9", text: "#1B5E20", border: "#66BB6A" }, // green
  { bg: "#E3F2FD", text: "#0D47A1", border: "#42A5F5" }, // blue
  { bg: "#FFF8E1", text: "#E65100", border: "#FFA726" }, // amber
];

function MatchBar({ percent }: { percent: number }) {
  return (
    <div style={{ background: "#F0F0F0", borderRadius: 99, height: 6, width: "100%", overflow: "hidden" }}>
      <div
        style={{
          height: "100%",
          width: `${percent}%`,
          background: "linear-gradient(90deg, #6C63FF, #A78BFA)",
          borderRadius: 99,
          transition: "width 0.8s ease",
        }}
      />
    </div>
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
  const progress = ((currentQ) / QUESTIONS.length) * 100;
  const isLast = currentQ === QUESTIONS.length - 1;

  // ── Navigation ──

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

  // ─── Render: Loading ────────────────────────────────────────────────────────

  if (stage === "loading") {
    return (
      <div style={styles.pageCenter}>
        <div style={styles.loadingBox}>
          <div style={styles.spinner} />
          <p style={styles.loadingTitle}>Analyzing your profile</p>
          <p style={styles.loadingSubtitle}>Matching you with the best careers…</p>
          <div style={styles.loadingDots}>
            {["Checking interests", "Mapping fields", "Finding universities"].map((t, i) => (
              <span key={i} style={{ ...styles.loadingDot, animationDelay: `${i * 0.4}s` }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ─── Render: Results ────────────────────────────────────────────────────────

  if (stage === "results" && result) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>

          {/* Header */}
          <div style={styles.resultsHeader}>
            <div style={styles.resultsHeaderBadge}>🎯 Your Career Matches</div>
            <h1 style={styles.resultsTitle}>We found your path!</h1>
            <p style={styles.resultsSubtitle}>{result.whyItFits}</p>
          </div>

          {/* Career Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {result.careers.map((career, idx) => {
              const color = MATCH_COLORS[idx] || MATCH_COLORS[2];
              const isOpen = expandedCard === idx;
              const isTop = idx === 0;

              return (
                <div
                  key={idx}
                  style={{
                    ...styles.careerCard,
                    border: isTop ? "2px solid #6C63FF" : "1px solid #E8E8E8",
                  }}
                >
                  {/* Card Header */}
                  <div
                    style={styles.careerCardHeader}
                    onClick={() => setExpandedCard(isOpen ? null : idx)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && setExpandedCard(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
                      {isTop && (
                        <span
                          style={{
                            background: "#6C63FF",
                            color: "#fff",
                            fontSize: 11,
                            fontWeight: 700,
                            padding: "3px 10px",
                            borderRadius: 99,
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                          }}
                        >
                          Best Match
                        </span>
                      )}
                      <span
                        style={{
                          ...styles.matchBadge,
                          background: color.bg,
                          color: color.text,
                          border: `1px solid ${color.border}`,
                        }}
                      >
                        {career.matchPercent}% fit
                      </span>
                    </div>
                    <span style={{ fontSize: 18, color: "#999", userSelect: "none" }}>
                      {isOpen ? "▲" : "▼"}
                    </span>
                  </div>

                  {/* Title & Bar */}
                  <div style={{ padding: "0 20px 16px" }}>
                    <h2 style={styles.careerTitle}>{career.title}</h2>
                    <MatchBar percent={career.matchPercent} />
                  </div>

                  {/* Expandable Body */}
                  {isOpen && (
                    <div style={{ padding: "0 20px 20px", borderTop: "1px solid #F0F0F0" }}>
                      <p style={styles.careerDesc}>{career.description}</p>

                      {/* Salary */}
                      <div style={styles.salaryBox}>
                        <span style={styles.salaryLabel}>💰 Salary Range (PKR)</span>
                        <span style={styles.salaryValue}>{career.salaryRangePKR}</span>
                      </div>

                      {/* Universities */}
                      <div style={styles.section}>
                        <p style={styles.sectionLabel}>🏛️ Top Universities in Pakistan</p>
                        <div style={styles.chipRow}>
                          {career.universities.map((u, i) => (
                            <span key={i} style={styles.chip}>{u}</span>
                          ))}
                        </div>
                      </div>

                      {/* Opportunities */}
                      <div style={styles.section}>
                        <p style={styles.sectionLabel}>💼 Career Opportunities</p>
                        <div style={styles.chipRow}>
                          {career.opportunities.map((o, i) => (
                            <span key={i} style={{ ...styles.chip, background: "#F3F0FF", color: "#4C1D95" }}>
                              {o}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Next Step */}
                      <div style={styles.nextStepBox}>
                        <span style={{ fontSize: 13, color: "#065F46", fontWeight: 600 }}>✅ Next step: </span>
                        <span style={{ fontSize: 13, color: "#065F46" }}>{career.nextStep}</span>
                      </div>

                      {/* CTA */}
                      <button
                        onClick={() => handleGenerateRoadmap(career)}
                        style={styles.ctaButton}
                      >
                        Generate Roadmap for {career.title} →
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* General Advice */}
          <div style={styles.adviceBox}>
            <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: "#1E3A5F", marginBottom: 6 }}>
              💡 Counselor's Advice
            </p>
            <p style={{ margin: 0, fontSize: 14, color: "#1E3A5F", lineHeight: 1.6 }}>
              {result.generalAdvice}
            </p>
          </div>

          {/* Restart */}
          <button onClick={handleRestart} style={styles.restartButton}>
            ↺ Retake the Quiz
          </button>

        </div>
      </div>
    );
  }

  // ─── Render: Quiz ───────────────────────────────────────────────────────────

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Top bar */}
        <div style={styles.topBar}>
          <div style={styles.progressTrack}>
            <div style={{ ...styles.progressFill, width: `${progress}%` }} />
          </div>
          <p style={styles.progressLabel}>{q.label}</p>
        </div>

        {/* Question */}
        <div style={styles.questionBox}>
          <div style={styles.questionEmoji}>{q.emoji}</div>
          <h2 style={styles.questionText}>{q.question}</h2>
        </div>

        {/* Error */}
        {error && (
          <div style={styles.errorBox}>
            ⚠️ {error}
          </div>
        )}

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {q.options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              style={{
                ...styles.optionBtn,
                ...(selected === opt.value ? styles.optionBtnSelected : {}),
              }}
            >
              <span style={styles.optionIcon}>{opt.icon}</span>
              <span style={styles.optionLabel}>{opt.label}</span>
              {selected === opt.value && (
                <span style={styles.optionCheck}>✓</span>
              )}
            </button>
          ))}
        </div>

        {/* Nav buttons */}
        <div style={styles.navRow}>
          {currentQ > 0 && (
            <button onClick={handleBack} style={styles.backButton}>
              ← Back
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!selected}
            style={{
              ...styles.nextButton,
              ...(selected ? {} : styles.nextButtonDisabled),
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

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  // Layout
  page: {
    minHeight: "100vh",
    background: "#FAFAFA",
    display: "flex",
    justifyContent: "center",
    padding: "40px 16px 80px",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  },

  pageCenter: {
    minHeight: "100vh",
    background: "#FAFAFA",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  },

  container: {
    width: "100%",
    maxWidth: 720,
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },

  // Progress
  topBar: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  progressTrack: {
    height: 8,
    background: "#E5E5E5",
    borderRadius: 999,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    background: "#111111",
    borderRadius: 999,
    transition: "width 0.4s ease",
  },

  progressLabel: {
    fontSize: 13,
    color: "#666",
    margin: 0,
    textAlign: "right",
    fontWeight: 500,
  },

  // Question
  questionBox: {
    textAlign: "center",
    padding: "20px 10px",
  },

  questionEmoji: {
    fontSize: 52,
    marginBottom: 18,
  },

  questionText: {
    fontSize: 34,
    lineHeight: 1.2,
    fontWeight: 800,
    color: "#111",
    margin: 0,
    letterSpacing: "-0.03em",
  },

  // Options
  optionBtn: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    width: "100%",
    padding: "20px",
    background: "#FFFFFF",
    border: "1px solid #E5E5E5",
    borderRadius: 18,
    cursor: "pointer",
    transition: "all 0.2s ease",
    textAlign: "left",
  },

  optionBtnSelected: {
    border: "1.5px solid #111",
    background: "#F5F5F5",
    transform: "translateY(-1px)",
    boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
  },

  optionIcon: {
    fontSize: 24,
    flexShrink: 0,
  },

  optionLabel: {
    fontSize: 16,
    fontWeight: 500,
    color: "#111",
    flex: 1,
    lineHeight: 1.5,
  },

  optionCheck: {
    fontSize: 16,
    fontWeight: 700,
    color: "#111",
  },

  // Buttons
  navRow: {
    display: "flex",
    gap: 12,
    marginTop: 12,
  },

  backButton: {
    padding: "14px 20px",
    background: "#FFFFFF",
    border: "1px solid #E5E5E5",
    borderRadius: 14,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    color: "#111",
  },

  nextButton: {
    flex: 1,
    padding: "15px 24px",
    background: "#111111",
    color: "#FFFFFF",
    border: "none",
    borderRadius: 14,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },

  nextButtonDisabled: {
    background: "#D4D4D4",
    color: "#777",
    cursor: "not-allowed",
  },

  // Error
  errorBox: {
    background: "#FFFFFF",
    border: "1px solid #E5E5E5",
    color: "#111",
    borderRadius: 14,
    padding: "14px 18px",
    fontSize: 14,
  },

  // Loading
  loadingBox: {
    textAlign: "center",
    padding: "60px 30px",
  },

  spinner: {
    width: 52,
    height: 52,
    border: "4px solid #E5E5E5",
    borderTop: "4px solid #111",
    borderRadius: "50%",
    margin: "0 auto 24px",
    animation: "spin 1s linear infinite",
  },

  loadingTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: "#111",
    marginBottom: 10,
  },

  loadingSubtitle: {
    fontSize: 15,
    color: "#666",
    marginBottom: 28,
  },

  loadingDots: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    alignItems: "center",
  },

  loadingDot: {
    fontSize: 14,
    color: "#888",
  },

  // Results Header
  resultsHeader: {
    textAlign: "center",
    paddingBottom: 8,
  },

  resultsHeaderBadge: {
    display: "inline-block",
    background: "#111",
    color: "#FFF",
    fontSize: 12,
    fontWeight: 700,
    padding: "7px 16px",
    borderRadius: 999,
    marginBottom: 18,
    letterSpacing: "0.03em",
  },

  resultsTitle: {
    fontSize: 42,
    fontWeight: 800,
    color: "#111",
    margin: "0 0 14px",
    letterSpacing: "-0.04em",
  },

  resultsSubtitle: {
    fontSize: 16,
    color: "#666",
    lineHeight: 1.7,
    maxWidth: 650,
    margin: "0 auto",
  },

  // Cards
  careerCard: {
    background: "#FFFFFF",
    border: "1px solid #E5E5E5",
    borderRadius: 22,
    overflow: "hidden",
    transition: "all 0.2s ease",
  },

  careerCardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 22px 16px",
    cursor: "pointer",
  },

  matchBadge: {
    background: "#F5F5F5",
    color: "#111",
    border: "1px solid #E5E5E5",
    padding: "6px 12px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
  },

  careerTitle: {
    fontSize: 24,
    fontWeight: 800,
    color: "#111",
    margin: "0 0 14px",
    letterSpacing: "-0.03em",
  },

  careerDesc: {
    fontSize: 15,
    color: "#555",
    lineHeight: 1.8,
    marginBottom: 22,
  },

  salaryBox: {
    background: "#FAFAFA",
    border: "1px solid #EAEAEA",
    borderRadius: 16,
    padding: "16px 18px",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  salaryLabel: {
    fontSize: 13,
    color: "#777",
  },

  salaryValue: {
    fontSize: 15,
    fontWeight: 700,
    color: "#111",
  },

  section: {
    marginBottom: 20,
  },

  sectionLabel: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 10,
    color: "#111",
  },

  chipRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },

  chip: {
    background: "#F5F5F5",
    border: "1px solid #E5E5E5",
    color: "#111",
    padding: "7px 14px",
    borderRadius: 999,
    fontSize: 13,
    fontWeight: 500,
  },

  nextStepBox: {
    background: "#FAFAFA",
    border: "1px solid #E5E5E5",
    borderRadius: 16,
    padding: "16px 18px",
    marginBottom: 18,
  },

  ctaButton: {
    width: "100%",
    background: "#111",
    color: "#FFF",
    border: "none",
    borderRadius: 16,
    padding: "16px 24px",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
  },

  // Advice
  adviceBox: {
    background: "#FFFFFF",
    border: "1px solid #E5E5E5",
    borderRadius: 20,
    padding: "22px",
  },

  restartButton: {
    width: "100%",
    background: "#FFFFFF",
    border: "1px solid #E5E5E5",
    borderRadius: 16,
    padding: "15px 24px",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    color: "#111",
  },
};
