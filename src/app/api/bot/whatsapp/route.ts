import { answerFromKnowledge } from "@/lib/knowledge";
import { NextRequest, NextResponse } from "next/server";

const META_API_VERSION = "v22.0";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge ?? "", { status: 200 });
  }

  return new NextResponse("verification_failed", { status: 403 });
}

export async function POST(req: NextRequest) {
  const payload = await req.json();
  const message =
    payload?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.text?.body ??
    payload?.messages?.[0]?.text?.body;
  const fromPhone =
    payload?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.from ??
    payload?.messages?.[0]?.from;

  if (!message) return NextResponse.json({ ok: true, skipped: true });

  const answer = await answerFromKnowledge(message);
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!accessToken || !phoneNumberId || !fromPhone) {
    return NextResponse.json({
      ok: false,
      error: "Missing WHATSAPP_ACCESS_TOKEN / WHATSAPP_PHONE_NUMBER_ID / sender number",
      answer
    });
  }

  const response = await fetch(
    `https://graph.facebook.com/${META_API_VERSION}/${phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: fromPhone,
        type: "text",
        text: { body: answer }
      })
    }
  );

  if (!response.ok) {
    const details = await response.text();
    return NextResponse.json({ ok: false, error: "Meta send failed", details }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
