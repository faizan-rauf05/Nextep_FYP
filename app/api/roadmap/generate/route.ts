import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      education,
      career,
      skillLevel,
      skills,
      hoursPerDay,
      goal,
      preference,
      challenges,
    } = body;

    // 🔥 STRICT PROMPT (VERY IMPORTANT)
    const prompt = `
You are an expert AI Roadmap Generator.

Return ONLY valid JSON.

USER PROFILE:
Education: ${education}
Career: ${career}
Skill Level: ${skillLevel}
Skills: ${skills}
Hours/Day: ${hoursPerDay}
Goal: ${goal}
Learning Style: ${preference}
Challenges: ${challenges}

FORMAT:
{
  "title": string,
  "roadmap": [
    {
      "week": number,
      "focus": string,
      "topics": string[],
      "project": string
    }
  ]
}

Rules:
- Make 6 to 10 weeks roadmap
- Each week must build on previous
- Include practical projects
- No explanation, ONLY JSON
`;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
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
              content: "Return ONLY valid JSON. No extra text.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.7,
        }),
      }
    );

    const data = await response.json();

    const text = data?.choices?.[0]?.message?.content;

    if (!text) {
      return NextResponse.json(
        { error: "No response from AI" },
        { status: 500 }
      );
    }

    // safe JSON parse
    let parsed;

    try {
      parsed = JSON.parse(text);
    } catch (err) {
      console.log("RAW AI OUTPUT:", text);

      return NextResponse.json(
        { error: "Invalid JSON from AI", raw: text },
        { status: 500 }
      );
    }

    return NextResponse.json(parsed);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}