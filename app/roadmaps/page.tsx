"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import jsPDF from "jspdf";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

interface ProjectItem {
  title: string;
  description: string;
  deadline: string;
}

interface RoadmapPhase {
  title: string;
  duration: string;
  description: string;
  skills: string[];
  projects: ProjectItem[];
}

interface ResourceItem {
  title: string;
  url?: string;
}

interface RoadmapData {
  career: string;
  overview: string;
  estimatedDuration: string;
  roadmap: RoadmapPhase[];
  certifications: string[];
  tools: string[];
  universities: string[];
  youtubeResources: ResourceItem[];
  finalAdvice: string;
}

export default function RoadmapPage() {
  const searchParams = useSearchParams();

  const career = searchParams.get("career") || "";
  const education = searchParams.get("education") || "";
  const goal = searchParams.get("goal") || "";

  const [data, setData] = useState<RoadmapData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function generateRoadmap() {
      try {
        setLoading(true);

        const res = await fetch("/api/roadmaps/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            career,
            education,
            goal,
          }),
        });

        const result = await res.json();

        console.log("ROADMAP API RESPONSE:", result);

        if (result.error) {
          throw new Error(result.error);
        }

        setData(result);
      } catch (err: any) {
        setError(err.message || "Failed to generate roadmap");
      } finally {
        setLoading(false);
      }
    }

    generateRoadmap();
  }, [career, education, goal]);


  const downloadPDF = () => {
  if (!data) return;

  const doc = new jsPDF();

  let y = 20;

  const addLine = (text: string, spacing = 8) => {
    const splitText = doc.splitTextToSize(text, 180);

    doc.text(splitText, 15, y);

    y += splitText.length * 7 + spacing;

    // auto new page
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  };

  // Title
  doc.setFontSize(22);
  doc.text(`${data.career} Roadmap`, 15, y);

  y += 15;

  doc.setFontSize(12);

  addLine(`Overview: ${data.overview}`);

  addLine(`Estimated Duration: ${data.estimatedDuration}`);

  addLine(`Goal: ${goal}`);

  // Phases
  data.roadmap.forEach((phase, idx) => {
    doc.setFontSize(16);

    addLine(`${idx + 1}. ${phase.title}`);

    doc.setFontSize(12);

    addLine(`Duration: ${phase.duration}`);

    addLine(`Description: ${phase.description}`);

    addLine(`Skills:`);

    phase.skills.forEach((skill) => {
      addLine(`• ${skill}`, 2);
    });

    addLine(`Projects:`);

    phase.projects.forEach((project: any) => {
      if (typeof project === "string") {
        addLine(`• ${project}`, 2);
      } else {
        addLine(`• ${project.title}`, 2);

        if (project.description) {
          addLine(`  ${project.description}`, 2);
        }

        if (project.deadline) {
          addLine(`  Deadline: ${project.deadline}`, 2);
        }
      }
    });

    y += 5;
  });

  // Tools
  doc.setFontSize(16);

  addLine("Recommended Tools");

  doc.setFontSize(12);

  data.tools.forEach((tool) => {
    addLine(`• ${tool}`, 2);
  });

  // Certifications
  doc.setFontSize(16);

  addLine("Certifications");

  doc.setFontSize(12);

  data.certifications.forEach((cert) => {
    addLine(`• ${cert}`, 2);
  });

  // Universities
  doc.setFontSize(16);

  addLine("Universities");

  doc.setFontSize(12);

  data.universities.forEach((uni) => {
    addLine(`• ${uni}`, 2);
  });

  // Resources
  doc.setFontSize(16);

  addLine("Learning Resources");

  doc.setFontSize(12);

  data.youtubeResources.forEach((resource: any) => {
    if (typeof resource === "string") {
      addLine(`• ${resource}`, 2);
    } else {
      addLine(`• ${resource.title}`, 2);

      if (resource.url) {
        addLine(`  ${resource.url}`, 2);
      }
    }
  });

  // Final Advice
  doc.setFontSize(16);

  addLine("Final Advice");

  doc.setFontSize(12);

  addLine(data.finalAdvice);

  // Save PDF
  doc.save(`${data.career}-roadmap.pdf`);
};

  // ─────────────────────────────────────────────────────────────
  // Loading
  // ─────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div style={styles.center}>
        <div style={styles.loader}></div>

        <h2>Generating your roadmap...</h2>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // Error
  // ─────────────────────────────────────────────────────────────

  if (error) {
    return (
      <div style={styles.center}>
        <p>{error}</p>
      </div>
    );
  }

  if (!data) return null;

  // ─────────────────────────────────────────────────────────────
  // Page
  // ─────────────────────────────────────────────────────────────

  return (
    <>
    <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
  <button
    onClick={downloadPDF}
    style={{
      padding: "14px 20px",
      borderRadius: 12,
      border: "none",
      background: "#2563EB",
      color: "#FFF",
      fontWeight: 700,
      cursor: "pointer",
      fontSize: 15,
    }}
  >
    Download PDF
  </button>
</div>
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.hero}>
          <div style={styles.badge}>🚀 Career Roadmap</div>

          <h1 style={styles.title}>{data.career}</h1>

          <p style={styles.subtitle}>{data.overview}</p>

          <div style={styles.infoRow}>
            <div style={styles.infoCard}>⏳ {data.estimatedDuration}</div>

            <div style={styles.infoCard}>🎯 Goal: {goal}</div>
          </div>
        </div>

        {/* Timeline */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Your Learning Path</h2>

          <div style={styles.timeline}>
            {data.roadmap.map((phase, idx) => (
              <div key={idx} style={styles.phaseCard}>
                <div style={styles.phaseTop}>
                  <div style={styles.phaseNumber}>{idx + 1}</div>

                  <div>
                    <h3 style={styles.phaseTitle}>{phase.title}</h3>

                    <p style={styles.phaseDuration}>{phase.duration}</p>
                  </div>
                </div>

                <p style={styles.phaseDesc}>{phase.description}</p>

                {/* Skills */}
                <div style={styles.subSection}>
                  <h4>Skills to Learn</h4>

                  <div style={styles.chips}>
                    {phase.skills.map((skill, i) => (
                      <span key={i} style={styles.chip}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Projects */}
                <div style={styles.subSection}>
                  <h4>Projects</h4>

                  <div style={styles.projectGrid}>
                    {phase.projects.map((project: any, i) => (
                      <div key={i} style={styles.projectCard}>
                        {typeof project === "string" ? (
                          <>
                            <h4 style={styles.projectTitle}>{project}</h4>
                          </>
                        ) : (
                          <>
                            <h4 style={styles.projectTitle}>{project.title}</h4>

                            <p style={styles.projectDesc}>
                              {project.description}
                            </p>

                            <span style={styles.projectDeadline}>
                              ⏰ {project.deadline}
                            </span>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Recommended Tools</h2>

          <div style={styles.chips}>
            {data.tools.map((tool, i) => (
              <span key={i} style={styles.chip}>
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Top Certifications</h2>

          <div style={styles.chips}>
            {data.certifications.map((cert, i) => (
              <span key={i} style={styles.certChip}>
                {cert}
              </span>
            ))}
          </div>
        </div>

        {/* Universities */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Best Universities in Pakistan</h2>

          <div style={styles.chips}>
            {data.universities.map((uni, i) => (
              <span key={i} style={styles.uniChip}>
                {uni}
              </span>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Free Learning Resources</h2>

          <div style={styles.resources}>
            {data.youtubeResources.map((resource: any, i) => (
              <div key={i} style={styles.resourceCard}>
                {typeof resource === "string" ? (
                  <div style={styles.resourceTitle}>▶ {resource}</div>
                ) : (
                  <>
                    <div style={styles.resourceTitle}>▶ {resource.title}</div>

                    {resource.url && (
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.resourceLink}
                      >
                        Open Resource →
                      </a>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Final Advice */}
        <div style={styles.adviceBox}>
          <h3>💡 Final Advice</h3>

          <p>{data.finalAdvice}</p>
        </div>
      </div>
    </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#FAFAFA",
    padding: "40px 16px",
    display: "flex",
    justifyContent: "center",
    fontFamily: "Inter, sans-serif",
  },

  container: {
    width: "100%",
    maxWidth: 950,
    display: "flex",
    flexDirection: "column",
    gap: 28,
  },

  center: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    fontFamily: "Inter, sans-serif",
  },

  loader: {
    width: 50,
    height: 50,
    border: "4px solid #E5E5E5",
    borderTop: "4px solid #111",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },

  hero: {
    background: "#111",
    color: "#FFF",
    padding: 40,
    borderRadius: 30,
  },

  badge: {
    display: "inline-block",
    background: "#FFF",
    color: "#111",
    padding: "8px 16px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 20,
  },

  title: {
    fontSize: 48,
    fontWeight: 800,
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 17,
    lineHeight: 1.7,
    color: "#DDD",
  },

  infoRow: {
    display: "flex",
    gap: 12,
    marginTop: 24,
    flexWrap: "wrap",
  },

  infoCard: {
    background: "#1F1F1F",
    border: "1px solid #333",
    padding: "12px 18px",
    borderRadius: 14,
    fontSize: 14,
  },

  section: {
    background: "#FFF",
    borderRadius: 24,
    padding: 28,
    border: "1px solid #EAEAEA",
  },

  sectionTitle: {
    fontSize: 28,
    fontWeight: 800,
    marginBottom: 24,
  },

  timeline: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },

  phaseCard: {
    border: "1px solid #EAEAEA",
    borderRadius: 20,
    padding: 24,
  },

  phaseTop: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    marginBottom: 14,
  },

  phaseNumber: {
    width: 44,
    height: 44,
    borderRadius: "50%",
    background: "#111",
    color: "#FFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
  },

  phaseTitle: {
    fontSize: 22,
    fontWeight: 700,
    margin: 0,
  },

  phaseDuration: {
    color: "#666",
    marginTop: 4,
  },

  phaseDesc: {
    color: "#555",
    lineHeight: 1.7,
  },

  subSection: {
    marginTop: 24,
  },

  chips: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 12,
  },

  chip: {
    background: "#F3F4F6",
    padding: "8px 14px",
    borderRadius: 999,
    fontSize: 14,
  },

  certChip: {
    background: "#EEF2FF",
    color: "#4338CA",
    padding: "8px 14px",
    borderRadius: 999,
    fontSize: 14,
  },

  uniChip: {
    background: "#ECFDF5",
    color: "#065F46",
    padding: "8px 14px",
    borderRadius: 999,
    fontSize: 14,
  },

  projectGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 14,
    marginTop: 14,
  },

  projectCard: {
    border: "1px solid #E5E7EB",
    borderRadius: 16,
    padding: 18,
    background: "#F9FAFB",
  },

  projectTitle: {
    margin: 0,
    marginBottom: 8,
    fontSize: 18,
    fontWeight: 700,
    color: "#111827",
  },

  projectDesc: {
    margin: 0,
    color: "#6B7280",
    lineHeight: 1.7,
    marginBottom: 12,
  },

  projectDeadline: {
    fontSize: 13,
    fontWeight: 600,
    color: "#4338CA",
  },

  resources: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  resourceCard: {
    padding: 18,
    borderRadius: 16,
    background: "#F9FAFB",
    border: "1px solid #E5E7EB",
  },

  resourceTitle: {
    fontWeight: 600,
    marginBottom: 10,
  },

  resourceLink: {
    color: "#2563EB",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: 14,
  },

  adviceBox: {
    background: "#111",
    color: "#FFF",
    borderRadius: 24,
    padding: 30,
    lineHeight: 1.8,
  },
};
