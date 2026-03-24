import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { topic, level, duration } = await req.json();

    console.log(topic, level, duration);

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview", // <== stable, free
    });

    const prompt = `
You are an expert curriculum designer and learning strategist.

Create a **highly detailed learning roadmap** for the following:

Topic: ${topic}
Level: ${level}
Duration: ${duration}

Rules:
- Divide the roadmap into progressive weeks according to the duration
- For each week, include:
  - Topics to study
  - **Text-based resources only** (articles, blogs, documentation, guides, tutorials). Do NOT include videos.
  - Projects or practical exercises for applying knowledge
- Only return **valid JSON**, no extra text or markdown
- Follow this exact JSON format:

{
  "title": "string",
  "description": "brief description of the roadmap",
  "weeks": [
    {
      "week": 1,
      "topics": ["string"],
      "resources": [{"title":"string","url":"https://..."}],
      "project": "string"
    }
  ]
}

Notes:
- Make the roadmap progressive: skills should build each week.
- Include real-world applications in projects.
- Keep it concise, professional, and detailed.
- Use at least 2-3 text-based resources per week.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // ✅ Safe JSON parsing
    let parsed;
    try {
      const match = text.match(/\{[\s\S]*\}/); // extract JSON block
      parsed = match ? JSON.parse(match[0]) : null;
    } catch {
      parsed = null;
    }

    if (!parsed) {
      return NextResponse.json(
        { error: "Failed to parse AI output", raw: text },
        { status: 500 },
      );
    }

    console.log(parsed);

    return NextResponse.json(parsed);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
