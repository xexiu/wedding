import { getLocaleConfigs, saveLocaleConfigs } from "@/lib/locales-store";
import { parseLocaleConfigsPutBody } from "@/lib/locale-config-payload";
import { ensureAdminApiGuard } from "@/lib/auth/guards";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const guardResponse = ensureAdminApiGuard(req);
  if (guardResponse) return guardResponse;

  const locales = await getLocaleConfigs();
  return NextResponse.json({ locales });
}

export async function PUT(req: NextRequest) {
  const guardResponse = ensureAdminApiGuard(req);
  if (guardResponse) return guardResponse;

  const payload = await req.json();
  const parsed = parseLocaleConfigsPutBody(payload);
  if (!parsed) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  try {
    const saved = await saveLocaleConfigs(parsed);
    return NextResponse.json({ locales: saved });
  } catch {
    return NextResponse.json({ error: "failed to save locales" }, { status: 400 });
  }
}
