// app/api/chat/route.ts
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { message, context } = await req.json(); // context is optional conversation history

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
    });

    const prompt = `
You are an expert tutor. Your goal is to answer the user questions clearly, concisely, and in simple language.
User Question: ${message}

Context: ${context || "No previous context."}

Rules:
- Provide explanations, examples, or exercises if relevant.
- Keep answers easy to understand.
- Respond only in plain text.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ answer: text });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}