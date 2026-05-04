export const AUTH_COOKIE_NAME = "wedding_admin_session";
export const AUTH_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export const DEFAULT_SEED_ADMIN_EMAIL = "admin@wedding.local";
export const DEFAULT_SEED_ADMIN_PASSWORD = "admin1234";

export const AUTH_TEXT = {
  LOGIN_REQUIRED: "admin authentication required",
  FORBIDDEN: "admin role required",
  INVALID_CREDENTIALS: "invalid credentials"
} as const;
