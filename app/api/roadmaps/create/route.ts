import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { career, education, goal } = body;

    if (!career || !education || !goal) {
      return NextResponse.json(
        {
          error: "Missing required fields",
        },
        { status: 400 }
      );
    }

    const prompt = `
You are an expert career mentor for Pakistani students.

Create a complete step-by-step learning roadmap for this student.

STUDENT INFO:
- Career: ${career}
- Education Level: ${education}
- Goal: ${goal}

STRICT RULES:
- Return ONLY valid JSON
- Make roadmap practical for Pakistan
- Mention realistic tools and certifications
- Include beginner-to-advanced progression
- Include 4 roadmap phases
- Each phase should contain:
  - title
  - duration
  - description
  - 5 skills
  - 3 projects

FORMAT:
{
  "career": "",
  "overview": "",
  "estimatedDuration": "",
  "roadmap": [
    {
      "title": "",
      "duration": "",
      "description": "",
      "skills": [],
      "projects": []
    }
  ],
  "certifications": [],
  "tools": [],
  "universities": [],
  "youtubeResources": [],
  "finalAdvice": ""
}
`;

    const groqRes = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          temperature: 0.7,
          max_tokens: 1800,
          messages: [
            {
              role: "system",
              content:
                "You are a career roadmap generator. Return only valid JSON.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      }
    );

    if (!groqRes.ok) {
      return NextResponse.json(
        {
          error: "AI service unavailable",
        },
        { status: 500 }
      );
    }

    const data = await groqRes.json();

    const rawText =
      data?.choices?.[0]?.message?.content || "";

    const cleaned = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    try {
      const parsed = JSON.parse(cleaned);
      console.log("parsed", parsed);

      return NextResponse.json(parsed);
    } catch (err) {
      console.error(cleaned);

      return NextResponse.json(
        {
          error: "Invalid AI response",
        },
        { status: 500 }
      );
    }
  } catch (err: any) {
    return NextResponse.json(
      {
        error: err.message || "Something went wrong",
      },
      { status: 500 }
    );
  }
}