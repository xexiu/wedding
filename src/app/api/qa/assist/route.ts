import { getFaqEntries, loadKnowledge } from "@/lib/knowledge";
import { NextRequest, NextResponse } from "next/server";

const OPENAI_URL = "https://api.openai.com/v1/responses";

async function matchByLlm(question: string): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const faq = getFaqEntries().map((x) => x.q);
  const prompt = [
    "Pick exactly one question from the allowed list that best matches the user input.",
    "If no good match exists, return ONLY NONE.",
    `Allowed questions: ${JSON.stringify(faq)}`,
    `User question: ${question}`
  ].join("\n");

  const response = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      input: prompt,
      max_output_tokens: 30
    })
  });

  if (!response.ok) return null;

  const payload = await response.json();
  const text = payload.output_text?.trim();
  if (!text || text === "NONE") return null;
  return text;
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { question?: string };
  const question = body.question?.trim();
  if (!question) return NextResponse.json({ error: "question is required" }, { status: 400 });

  const faq = getFaqEntries();
  const llmMatch = await matchByLlm(question);
  const hit = faq.find((entry) => entry.q === llmMatch);

  if (!hit) {
    return NextResponse.json({
      source: "faq.yml",
      answer: loadKnowledge().fallback.answer,
      mode: "strict-fallback"
    });
  }

  return NextResponse.json({
    source: "faq.yml",
    answer: hit.a,
    matchedQuestion: hit.q,
    mode: "llm-match-then-yaml-answer"
  });
}
