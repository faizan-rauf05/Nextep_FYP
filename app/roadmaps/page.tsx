"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface RoadmapPhase {
  title: string;
  duration: string;
  description: string;
  skills: string[];
  projects: string[];
}

interface RoadmapData {
  career: string;
  overview: string;
  estimatedDuration: string;
  roadmap: RoadmapPhase[];
  certifications: string[];
  tools: string[];
  universities: string[];
  youtubeResources: string[];
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

  if (loading) {
    return (
      <div style={styles.center}>
        <div style={styles.loader}></div>
        <h2>Generating your roadmap...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.center}>
        <p>{error}</p>
      </div>
    );
  }

  if (!data) return null;

  return (
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

                <div style={styles.subSection}>
                  <h4>Projects</h4>

                  <div style={styles.chips}>
                    {phase.projects.map((project, i) => (
                      <span key={i} style={styles.projectChip}>
                        {project}
                      </span>
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
              <span key={i} style={styles.projectChip}>
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

        {/* Youtube */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Free Learning Resources</h2>

          <div style={styles.resources}>
            {data.youtubeResources.map((resource, i) => (
              <div key={i} style={styles.resourceCard}>
                ▶ {resource}
              </div>
            ))}
          </div>
        </div>

        {/* Advice */}
        <div style={styles.adviceBox}>
          <h3>💡 Final Advice</h3>

          <p>{data.finalAdvice}</p>
        </div>
      </div>
    </div>
  );
}

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
    marginTop: 18,
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

  projectChip: {
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

  resources: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  resourceCard: {
    padding: 16,
    borderRadius: 14,
    background: "#F9FAFB",
    border: "1px solid #E5E7EB",
  },

  adviceBox: {
    background: "#111",
    color: "#FFF",
    borderRadius: 24,
    padding: 30,
    lineHeight: 1.8,
  },
};
