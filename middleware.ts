import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale } from "@/config/locales";
import { AUTH_COOKIE_NAME } from "@/lib/auth/constants";
import {
  PREFERENCE_COOKIE_MAX_AGE_SECONDS,
  PREFERENCE_KEYS,
  resolveLocaleFromAcceptLanguage
} from "@/config/preferences";

type LocalesApiResponse = {
  locales?: string[];
  defaultLocale?: string;
};

/** When set to `es`, `en`, or `ro` (and that locale is enabled), all visits use that prefix. Empty / false / off = normal cookie + browser detection. */
function resolveForcedPublicLocale(raw: string | undefined, allowedLocales: string[]): string | null {
  if (raw === undefined || raw === "") {
    return null;
  }
  const t = raw.trim().toLowerCase();
  if (!t || t === "false" || t === "off" || t === "0") {
    return null;
  }
  return isLocale(t, allowedLocales) ? t : null;
}

async function getRuntimeLocales(req: NextRequest): Promise<{ locales: string[]; defaultLocale: string }> {
  try {
    const response = await fetch(`${req.nextUrl.origin}/api/locales`, {
      method: "GET",
      headers: { "x-middleware-locales-fetch": "1" }
    });
    if (!response.ok) {
      throw new Error("failed");
    }

    const payload = (await response.json()) as LocalesApiResponse;
    const locales = Array.isArray(payload.locales) ? payload.locales : [defaultLocale];
    const resolvedDefault = typeof payload.defaultLocale === "string" ? payload.defaultLocale : defaultLocale;
    return { locales, defaultLocale: resolvedDefault };
  } catch {
    return { locales: [defaultLocale], defaultLocale };
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) {
    return NextResponse.next();
  }

  const runtimeLocales = await getRuntimeLocales(req);
  const forcedLocale = resolveForcedPublicLocale(process.env.FORCE_PUBLIC_LOCALE, runtimeLocales.locales);

  const first = pathname.split("/").filter(Boolean)[0];
  if (first && isLocale(first, runtimeLocales.locales)) {
    if (forcedLocale && first !== forcedLocale) {
      const segments = pathname.split("/").filter(Boolean);
      segments[0] = forcedLocale;
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = `/${segments.join("/")}`;
      return NextResponse.redirect(redirectUrl);
    }

    const segments = pathname.split("/").filter(Boolean);
    const isAdminArea = segments[1] === "admin";
    const isAdminLogin = isAdminArea && segments[2] === "login";
    if (isAdminArea && !isAdminLogin) {
      const hasAdminSessionCookie = Boolean(req.cookies.get(AUTH_COOKIE_NAME)?.value);
      if (!hasAdminSessionCookie) {
        const url = req.nextUrl.clone();
        url.pathname = `/${first}/admin/login`;
        return NextResponse.redirect(url);
      }
    }

    const response = NextResponse.next();
    response.cookies.set(PREFERENCE_KEYS.LOCALE_COOKIE, first, {
      path: "/",
      maxAge: PREFERENCE_COOKIE_MAX_AGE_SECONDS,
      sameSite: "lax"
    });
    return response;
  }

  const localeFromCookie = req.cookies.get(PREFERENCE_KEYS.LOCALE_COOKIE)?.value;
  const preferredLocale = forcedLocale
    ? forcedLocale
    : localeFromCookie && isLocale(localeFromCookie, runtimeLocales.locales)
      ? localeFromCookie
      : resolveLocaleFromAcceptLanguage(req.headers.get("accept-language"), runtimeLocales.locales);

  const resolvedLocale = forcedLocale
    ? forcedLocale
    : isLocale(preferredLocale, runtimeLocales.locales)
      ? preferredLocale
      : runtimeLocales.defaultLocale;

  const url = req.nextUrl.clone();
  url.pathname = `/${resolvedLocale ?? defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/:path*"]
};
