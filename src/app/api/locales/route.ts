import { defaultLocale } from "@/config/locales";
import { getDefaultLocaleCode, getEnabledLocaleCodes } from "@/lib/locales-store";
import { NextResponse } from "next/server";

export async function GET() {
  const enabledLocales = await getEnabledLocaleCodes();
  const resolvedDefaultLocale = await getDefaultLocaleCode();

  return NextResponse.json({
    locales: enabledLocales,
    defaultLocale: resolvedDefaultLocale || defaultLocale
  });
}
