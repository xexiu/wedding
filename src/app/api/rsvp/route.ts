import { GUEST_GROUP_VALUES, RSVP_STATUS_VALUES } from "@/config/rsvp-enums";
import { createPublicRsvpSubmission } from "@/lib/rsvp-admin-store";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const publicRsvpSchema = z.object({
  name: z.preprocess(
    (v) => (typeof v === "string" ? v.trim() : ""),
    z.string().min(1, "Name is required")
  ),
  email: z.preprocess(
    (v) => (typeof v === "string" ? v.trim() : ""),
    z.union([z.literal(""), z.string().email("Enter a valid email address")])
  ),
  phone: z.preprocess((v) => (typeof v === "string" ? v : ""), z.string()),
  notes: z.preprocess((v) => (typeof v === "string" ? v : ""), z.string()),
  dietaryRestrictions: z.preprocess((v) => (typeof v === "string" ? v : ""), z.string()),
  plusOneNames: z.array(z.string()),
  requestedSongs: z.array(z.string()),
  rsvpStatus: z.enum(RSVP_STATUS_VALUES, {
    message: "Attendance choice is invalid or missing"
  }),
  group: z.enum(GUEST_GROUP_VALUES, { message: "Guest group is invalid or missing" })
});

function flattenZodFieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const pathKey = issue.path.length ? issue.path.map(String).join(".") : "_form";
    if (!out[pathKey]) {
      out[pathKey] = issue.message;
    }
  }
  return out;
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      {
        ok: false as const,
        error: "invalid_json",
        message: "Request body must be valid JSON."
      },
      { status: 400 }
    );
  }

  const parsed = publicRsvpSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = flattenZodFieldErrors(parsed.error);
    return NextResponse.json(
      {
        ok: false as const,
        error: "validation_failed",
        fieldErrors,
        message: "Some fields need your attention."
      },
      { status: 400 }
    );
  }

  try {
    await createPublicRsvpSubmission(parsed.data);
    return NextResponse.json({ ok: true as const });
  } catch (cause) {
    console.error("createPublicRsvpSubmission failed", cause);
    return NextResponse.json(
      {
        ok: false as const,
        error: "server_error",
        message: "We could not save your RSVP. Please try again in a moment."
      },
      { status: 500 }
    );
  }
}
