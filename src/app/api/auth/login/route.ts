import { AUTH_COOKIE_MAX_AGE_SECONDS, AUTH_COOKIE_NAME, AUTH_TEXT } from "@/lib/auth/constants";
import { createAdminSessionToken } from "@/lib/auth/token";
import { getAdminUserByEmail } from "@/lib/admin-user-store";
import { verifyPassword } from "@/lib/auth/password";
import { NextRequest, NextResponse } from "next/server";

type LoginPayload = {
  email?: string;
  password?: string;
};

export async function POST(req: NextRequest) {
  const body = (await req.json()) as LoginPayload;
  const email = body.email?.trim().toLowerCase();
  const password = body.password ?? "";

  if (!email || !password) {
    return NextResponse.json({ error: AUTH_TEXT.INVALID_CREDENTIALS }, { status: 401 });
  }

  const user = await getAdminUserByEmail(email);
  if (!user) {
    return NextResponse.json({ error: AUTH_TEXT.INVALID_CREDENTIALS }, { status: 401 });
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    return NextResponse.json({ error: AUTH_TEXT.INVALID_CREDENTIALS }, { status: 401 });
  }

  const token = createAdminSessionToken({
    userId: user.id,
    email: user.email,
    role: "ADMIN"
  });

  const response = NextResponse.json({ ok: true });
  response.cookies.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: AUTH_COOKIE_MAX_AGE_SECONDS,
    path: "/"
  });
  return response;
}
