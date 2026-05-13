"use client";

import { Footer } from "@/components/landing/footer";
import { Navigation } from "@/components/landing/navigation";
import {
  Target,
  Brain,
  Users,
  Sparkles,
  Rocket,
  ShieldCheck,
  MessageSquare,
  Mic,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

const glassCard: React.CSSProperties = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(96,165,250,0.18)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  borderRadius: "1.5rem",
  boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
};

export default function AboutPage() {
  return (
    <>
    <Navigation />
      <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(0,99,196,0.18), transparent 30%), radial-gradient(circle at bottom right, rgba(59,130,246,0.15), transparent 30%), linear-gradient(135deg, #081120 0%, #0d1b34 50%, #081120 100%)",
        padding: "2rem",
        fontFamily: "Inter, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Animated Background Blobs */}
      <div
        className="pointer-events-none fixed -top-40 -left-40 h-[28rem] w-[28rem] rounded-full blur-3xl -z-10 animate-pulse"
        style={{
          background: "rgba(59,130,246,0.20)",
        }}
      />

      <div
        className="pointer-events-none fixed -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full blur-3xl -z-10 animate-pulse"
        style={{
          background: "rgba(0,99,196,0.18)",
        }}
      />

      {/* ================= HERO SECTION ================= */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
          gap: "3rem",
          alignItems: "center",
          paddingTop: "3rem",
        }}
      >
        {/* Left */}
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 18px",
              borderRadius: 999,
              background: "rgba(96,165,250,0.12)",
              border: "1px solid rgba(96,165,250,0.25)",
              color: "#60a5fa",
              fontWeight: 700,
              fontSize: 13,
            }}
          >
            <Sparkles size={15} />
            ABOUT NEXSTEP
          </div>

          <h1
            style={{
              fontSize: "4rem",
              lineHeight: 1.1,
              fontWeight: 900,
              color: "#fff",
              marginTop: "1.5rem",
              letterSpacing: "-0.04em",
            }}
          >
            Empowering Students To Build Their{" "}
            <span
              style={{
                background: "linear-gradient(to right,#60a5fa,#3b82f6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Dream Career
            </span>
          </h1>

          <p
            style={{
              marginTop: "1.5rem",
              color: "#94a3b8",
              lineHeight: 1.9,
              fontSize: 16,
              maxWidth: 620,
            }}
          >
            NexStep is an AI-powered career counselling platform helping
            students discover the right career path through personalized
            guidance, AI-generated roadmaps, expert counselors, chatbots, and
            voice assistant technology.
          </p>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              marginTop: "2rem",
              flexWrap: "wrap",
            }}
          >
            

           
          </div>
        </div>

        {/* Right Hero Card */}
        <div
          style={{
            ...glassCard,
            padding: "2rem",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "1.5rem",
              background:
                "linear-gradient(135deg,rgba(59,130,246,0.15),transparent)",
            }}
          />

          <div style={{ position: "relative", zIndex: 2 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                gap: "1rem",
              }}
            >
              {[
                {
                  icon: <Brain color="#60a5fa" />,
                  title: "AI Roadmaps",
                },
                {
                  icon: <Users color="#60a5fa" />,
                  title: "Career Experts",
                },
                {
                  icon: <MessageSquare color="#60a5fa" />,
                  title: "AI Chatbot",
                },
                {
                  icon: <Mic color="#60a5fa" />,
                  title: "Voice Assistant",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    padding: "1.2rem",
                    borderRadius: 18,
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {item.icon}
                  <h4
                    style={{
                      color: "#fff",
                      marginTop: 12,
                      fontSize: 15,
                    }}
                  >
                    {item.title}
                  </h4>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: "1.5rem",
                padding: "1rem",
                borderRadius: 16,
                background: "rgba(96,165,250,0.08)",
                border: "1px solid rgba(96,165,250,0.15)",
              }}
            >
              <p
                style={{
                  color: "#cbd5e1",
                  lineHeight: 1.7,
                  fontSize: 14,
                }}
              >
                Helping students make smarter academic and career decisions with
                the power of AI and real mentorship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section
        style={{
          maxWidth: 1200,
          margin: "5rem auto 0",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2
            style={{
              color: "#fff",
              fontSize: "2.4rem",
              fontWeight: 800,
            }}
          >
            What Makes NexStep Special
          </h2>

          <p
            style={{
              color: "#94a3b8",
              marginTop: 12,
              fontSize: 15,
            }}
          >
            Smart technology combined with real career guidance.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
            gap: "1.2rem",
          }}
        >
          {[
            {
              icon: <Target color="#60a5fa" />,
              title: "Personalized Guidance",
              desc: "Career recommendations based on student interests and strengths.",
            },
            {
              icon: <Brain color="#60a5fa" />,
              title: "AI Powered Insights",
              desc: "Advanced AI analyzes goals and generates learning paths.",
            },
            {
              icon: <Users color="#60a5fa" />,
              title: "Expert Counselors",
              desc: "Book one-on-one sessions with professional counselors.",
            },
            {
              icon: <Rocket color="#60a5fa" />,
              title: "Career Growth",
              desc: "Build roadmaps from education to professional success.",
            },
          ].map((card, i) => (
            <div
              key={i}
              style={{
                ...glassCard,
                padding: "1.7rem",
                transition: "0.3s",
              }}
            >
              {card.icon}

              <h3
                style={{
                  color: "#fff",
                  marginTop: 16,
                  fontWeight: 700,
                }}
              >
                {card.title}
              </h3>

              <p
                style={{
                  color: "#94a3b8",
                  marginTop: 10,
                  lineHeight: 1.7,
                  fontSize: 14,
                }}
              >
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= WHY SECTION ================= */}
      <section
        style={{
          maxWidth: 1200,
          margin: "5rem auto 0",
        }}
      >
        <div
          style={{
            ...glassCard,
            padding: "3rem",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
              gap: "3rem",
              alignItems: "center",
            }}
          >
            {/* Left */}
            <div>
              <h2
                style={{
                  color: "#fff",
                  fontSize: "2.5rem",
                  fontWeight: 800,
                  lineHeight: 1.2,
                }}
              >
                Why NexStep Exists
              </h2>

              <p
                style={{
                  color: "#94a3b8",
                  marginTop: "1rem",
                  lineHeight: 1.9,
                }}
              >
                Many students struggle with confusion about choosing the right
                degree, career, or skills. NexStep solves this problem through
                AI-powered analysis, personalized mentorship, and future-focused
                guidance.
              </p>
            </div>

            {/* Right */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {[
                "AI generated learning & career roadmaps",
                "Book career counselling sessions online",
                "Interactive AI chatbot support",
                "Voice assistant for quick guidance",
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    background: "rgba(255,255,255,0.04)",
                    padding: "1rem",
                    borderRadius: 14,
                  }}
                >
                  <CheckCircle2 color="#60a5fa" size={20} />
                  <span style={{ color: "#e2e8f0" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section
        style={{
          maxWidth: 1200,
          margin: "5rem auto 0",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "1rem",
          }}
        >
          {[
            {
              number: "10K+",
              label: "Students Guided",
            },
            {
              number: "500+",
              label: "Career Roadmaps",
            },
            {
              number: "100+",
              label: "Expert Counselors",
            },
            {
              number: "24/7",
              label: "AI Assistance",
            },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                ...glassCard,
                padding: "2rem",
                textAlign: "center",
              }}
            >
              <h2
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 900,
                  color: "#60a5fa",
                }}
              >
                {stat.number}
              </h2>

              <p
                style={{
                  color: "#cbd5e1",
                  marginTop: 10,
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section
        style={{
          maxWidth: 1000,
          margin: "5rem auto 2rem",
        }}
      >
        <div
          style={{
            ...glassCard,
            padding: "3rem",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg,rgba(59,130,246,0.14),transparent)",
            }}
          />

          <div style={{ position: "relative", zIndex: 2 }}>
            <ShieldCheck color="#60a5fa" size={45} />

            <h2
              style={{
                color: "#fff",
                fontSize: "2.4rem",
                fontWeight: 800,
                marginTop: "1rem",
              }}
            >
              Your Future Starts With The Right Direction
            </h2>

            <p
              style={{
                color: "#94a3b8",
                marginTop: "1rem",
                lineHeight: 1.8,
                maxWidth: 700,
                marginInline: "auto",
              }}
            >
              NexStep empowers students with AI, mentorship, and career clarity
              to confidently achieve their goals and build a successful future.
            </p>

            <Link href="/login" >
            <button
              style={{
                marginTop: "2rem",
                background: "linear-gradient(135deg,#2563eb,#3b82f6)",
                color: "#fff",
                border: "none",
                padding: "14px 26px",
                borderRadius: 14,
                fontWeight: 700,
                cursor: "pointer",
                fontSize: 15,
              }}
            >
              Get Started Today
            </button></Link>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
}