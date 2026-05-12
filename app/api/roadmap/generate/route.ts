import { NextResponse } from "next/server";

// ─── Types ────────────────────────────────────────────────────────────────────

interface RequestBody {
  activity: string;    // create | analyze | help | lead | explore
  subject: string;     // math | bio | arts | cs | biz | soc
  workStyle: string;   // alone | team | mix
  goal: string;        // impact | money | creative | stable | growth
  environment: string; // office | field | remote | hospital | studio
  education: string;   // matric | inter | bach | grad
}

// ─── Label Maps (for readable prompt) ────────────────────────────────────────

const ACTIVITY_LABELS: Record<string, string> = {
  create: "Drawing, designing, or making things",
  analyze: "Solving puzzles or crunching numbers",
  help: "Helping or teaching other people",
  lead: "Organizing events or leading groups",
  explore: "Experimenting or exploring nature",
};

const SUBJECT_LABELS: Record<string, string> = {
  math: "Math & Physics",
  bio: "Biology & Chemistry",
  arts: "Arts & Literature",
  cs: "Computer Science",
  biz: "Business & Economics",
  soc: "Social Sciences & History",
};

const WORK_LABELS: Record<string, string> = {
  alone: "Works independently",
  team: "Works in teams",
  mix: "Mix of both",
};

const GOAL_LABELS: Record<string, string> = {
  impact: "Making a positive impact on society",
  money: "High earning potential",
  creative: "Creative freedom & expression",
  stable: "Job security & stability",
  growth: "Continuous learning & growth",
};

const ENV_LABELS: Record<string, string> = {
  office: "Office / corporate setting",
  field: "Outdoors / field work",
  remote: "Remote / work from home",
  hospital: "Hospital / clinic / lab",
  studio: "Studio / creative space",
};

const EDU_LABELS: Record<string, string> = {
  matric: "Matric (Secondary School)",
  inter: "Intermediate / A-Levels",
  bach: "Bachelor's degree",
  grad: "Graduate / Post-grad",
};

// ─── Validation ───────────────────────────────────────────────────────────────

function validateBody(body: Partial<RequestBody>): string | null {
  const required: (keyof RequestBody)[] = [
    "activity", "subject", "workStyle", "goal", "environment", "education",
  ];
  for (const field of required) {
    if (!body[field]) return `Missing field: ${field}`;
  }
  return null;
}

// ─── Route Handler ────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  try {
    const body: Partial<RequestBody> = await req.json();

    // Validate
    const validationError = validateBody(body);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const {
      activity,
      subject,
      workStyle,
      goal,
      environment,
      education,
    } = body as RequestBody;

    // Build a human-readable profile for the AI
    const profileText = `
- Activity preference: ${ACTIVITY_LABELS[activity] || activity}
- Favorite subject: ${SUBJECT_LABELS[subject] || subject}
- Work style: ${WORK_LABELS[workStyle] || workStyle}
- Career priority: ${GOAL_LABELS[goal] || goal}
- Work environment: ${ENV_LABELS[environment] || environment}
- Education level: ${EDU_LABELS[education] || education}
    `.trim();

    const prompt = `
You are an expert career counselor specializing in Pakistani students.

A student has completed an interest assessment. Based on their profile below, identify the top 3 most suitable career paths for them.

STUDENT PROFILE:
${profileText}

STRICT INSTRUCTIONS:
- Recommend exactly 3 career paths ranked from best fit to third best fit.
- Universities must be real, well-known Pakistani universities relevant to each career.
- Salary ranges must be realistic for Pakistan in Pakistani Rupees per month.
- matchPercent must be a whole number between 60 and 97. The top match should be highest.
- nextStep should be a single actionable sentence the student can do this week.
- generalAdvice should be 2-3 sentences of warm, encouraging, personalized guidance.
- Return ONLY valid JSON — no markdown, no code fences, no explanation text.

RESPONSE FORMAT (return exactly this JSON structure):
{
  "topCareer": "<title of best matching career>",
  "whyItFits": "<1-2 sentences explaining why these careers fit this student's profile>",
  "careers": [
    {
      "title": "<career title>",
      "matchPercent": <number 60-97>,
      "description": "<2 sentences describing this career path>",
      "universities": ["<uni1>", "<uni2>", "<uni3>", "<uni4>", "<uni5>"],
      "opportunities": ["<role1>", "<role2>", "<role3>", "<role4>", "<role5>"],
      "salaryRangePKR": "<e.g. PKR 80,000 – 300,000 / month>",
      "nextStep": "<one specific actionable sentence>"
    }
  ],
  "generalAdvice": "<2-3 sentences of warm encouraging advice>"
}
`;

    // Call Groq API
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content:
              "You are a career counselor for Pakistani students. Return ONLY valid JSON. No markdown. No extra text. No code fences.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.6,
        max_tokens: 1200,
      }),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.error("Groq API error:", errText);
      return NextResponse.json(
        { error: "AI service unavailable. Please try again." },
        { status: 502 }
      );
    }

    const groqData = await groqRes.json();
    const rawText: string = groqData?.choices?.[0]?.message?.content || "";

    if (!rawText) {
      return NextResponse.json(
        { error: "No response from AI. Please try again." },
        { status: 500 }
      );
    }

    // Clean up any accidental markdown fences
    const cleaned = rawText
      .replace(/```json\s*/gi, "")
      .replace(/```\s*/gi, "")
      .trim();

    // Parse JSON
    let parsed: object;
    try {
      parsed = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error("JSON parse error. Raw AI output:", rawText);
      return NextResponse.json(
        { error: "AI returned an invalid response. Please try again.", raw: rawText },
        { status: 500 }
      );
    }

    return NextResponse.json(parsed);

  } catch (err: any) {
    console.error("Unexpected error in /api/career/suggest:", err);
    return NextResponse.json(
      { error: err.message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
