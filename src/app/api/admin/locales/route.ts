import { LocaleConfigItem, getLocaleConfigs, saveLocaleConfigs } from "@/lib/locales-store";
import { ensureAdminApiGuard } from "@/lib/auth/guards";
import { NextRequest, NextResponse } from "next/server";

type SaveLocalesPayload = {
  locales?: LocaleConfigItem[];
};

function isValidLocaleCode(value: string): boolean {
  return /^[a-z]{2}(-[a-z0-9]+)?$/i.test(value);
}

function parsePayload(payload: unknown): LocaleConfigItem[] | null {
  if (typeof payload !== "object" || payload === null) {
    return null;
  }

  const body = payload as SaveLocalesPayload;
  if (!Array.isArray(body.locales)) {
    return null;
  }

  for (const locale of body.locales) {
    if (
      !locale ||
      typeof locale.code !== "string" ||
      !isValidLocaleCode(locale.code) ||
      typeof locale.name !== "string" ||
      typeof locale.enabled !== "boolean" ||
      typeof locale.isDefault !== "boolean" ||
      typeof locale.messages !== "object" ||
      locale.messages === null
    ) {
      return null;
    }
  }

  return body.locales;
}

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
  const parsed = parsePayload(payload);
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
