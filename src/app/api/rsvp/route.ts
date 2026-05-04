import { GUEST_GROUP_VALUES, RSVP_STATUS_VALUES } from "@/config/rsvp-enums";
import { createPublicRsvpSubmission } from "@/lib/rsvp-admin-store";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const publicRsvpSchema = z.object({
  name: z.string().min(1),
  email: z.string(),
  phone: z.string(),
  notes: z.string(),
  dietaryRestrictions: z.string(),
  plusOneNames: z.array(z.string()),
  requestedSongs: z.array(z.string()),
  rsvpStatus: z.enum(RSVP_STATUS_VALUES),
  group: z.enum(GUEST_GROUP_VALUES)
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = publicRsvpSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  await createPublicRsvpSubmission(parsed.data);
  return NextResponse.json({ ok: true });
}
