import { answerFromKnowledge } from "@/lib/knowledge";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { question?: string };
  const question = body.question?.trim();

  if (!question) {
    return NextResponse.json({ error: "question is required" }, { status: 400 });
  }

  return NextResponse.json({
    source: "site-config+faq.yml",
    answer: await answerFromKnowledge(question)
  });
}
