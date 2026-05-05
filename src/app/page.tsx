import { redirect } from "next/navigation";
import { defaultLocale, isLocale } from "@/config/locales";
import { getEnabledLocaleCodes } from "@/lib/locales-store";

function resolveForcedPublicLocale(raw: string | undefined, allowedLocales: string[]): string | null {
  if (raw === undefined || raw === "") {
    return null;
  }
  const token = raw.trim().toLowerCase();
  if (!token || token === "false" || token === "off" || token === "0") {
    return null;
  }
  return isLocale(token, allowedLocales) ? token : null;
}

export const dynamic = "force-dynamic";

export default async function RootPage() {
  const enabledLocales = await getEnabledLocaleCodes();
  const forcedLocale = resolveForcedPublicLocale(process.env.FORCE_PUBLIC_LOCALE, enabledLocales);
  const locale = forcedLocale ?? defaultLocale;
  redirect(`/${locale}`);
}
