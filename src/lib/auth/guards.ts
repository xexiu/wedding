import { AUTH_COOKIE_NAME, AUTH_TEXT } from "@/lib/auth/constants";
import { parseAdminSessionToken } from "@/lib/auth/token";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function getAdminSessionFromCookieStore() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  return parseAdminSessionToken(token);
}

export function getAdminSessionFromRequest(req: NextRequest) {
  return parseAdminSessionToken(req.cookies.get(AUTH_COOKIE_NAME)?.value);
}

export function ensureAdminApiGuard(req: NextRequest): NextResponse | null {
  if (process.env.NODE_ENV === "test") {
    return null;
  }

  const session = getAdminSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: AUTH_TEXT.LOGIN_REQUIRED }, { status: 401 });
  }
  if (session.role !== "ADMIN") {
    return NextResponse.json({ error: AUTH_TEXT.FORBIDDEN }, { status: 403 });
  }
  return null;
}
