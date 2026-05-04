import { answerFromKnowledge } from "@/lib/knowledge";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const payload = await req.json();
  const messageText = payload?.message?.text as string | undefined;

  if (!messageText) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const answer = await answerFromKnowledge(messageText);
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  if (!botToken) {
    return NextResponse.json({ ok: false, error: "TELEGRAM_BOT_TOKEN missing", answer });
  }

  const chatId = payload?.message?.chat?.id;
  if (!chatId) return NextResponse.json({ ok: true, skipped: true });

  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: answer })
  });

  return NextResponse.json({ ok: true });
}
