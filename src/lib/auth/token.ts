import { createHmac } from "node:crypto";
import { AUTH_COOKIE_MAX_AGE_SECONDS } from "@/lib/auth/constants";

export type AdminSession = {
  userId: number;
  email: string;
  role: "ADMIN";
  exp: number;
};

function getAuthSecret(): string {
  return process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "wedding-dev-auth-secret";
}

function toBase64Url(value: string): string {
  return Buffer.from(value, "utf8").toString("base64url");
}

function sign(value: string): string {
  return createHmac("sha256", getAuthSecret()).update(value).digest("base64url");
}

export function createAdminSessionToken(payload: Omit<AdminSession, "exp">): string {
  const exp = Math.floor(Date.now() / 1000) + AUTH_COOKIE_MAX_AGE_SECONDS;
  const body = JSON.stringify({ ...payload, exp });
  const encoded = toBase64Url(body);
  return `${encoded}.${sign(encoded)}`;
}

export function parseAdminSessionToken(token: string | undefined): AdminSession | null {
  if (!token) return null;
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return null;
  if (sign(encoded) !== signature) return null;

  try {
    const parsed = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as Partial<AdminSession>;
    if (
      typeof parsed.userId !== "number" ||
      typeof parsed.email !== "string" ||
      parsed.role !== "ADMIN" ||
      typeof parsed.exp !== "number"
    ) {
      return null;
    }

    if (parsed.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return parsed as AdminSession;
  } catch {
    return null;
  }
}
