import { GUEST_GROUP_VALUES, RSVP_STATUS_VALUES } from "@/config/rsvp-enums";
import { ensureAdminApiGuard } from "@/lib/auth/guards";
import { getRsvpAdminPayload, saveRsvpAdminPayload } from "@/lib/rsvp-admin-store";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const guestSchema = z.object({
  id: z.number().int().positive().optional(),
  name: z.string().min(1),
  email: z.string(),
  phone: z.string(),
  group: z.enum(GUEST_GROUP_VALUES),
  rsvpStatus: z.enum(RSVP_STATUS_VALUES),
  dietaryRestrictions: z.string(),
  notes: z.string(),
  plusOneCount: z.number().int().min(0),
  plusOneNames: z.array(z.string()),
  requestedSongs: z.array(z.string()),
  createdAt: z.string().optional()
});

const payloadSchema = z.object({
  config: z.object({
    rsvpDeadline: z.string(),
    eventDetails: z.string()
  }),
  guests: z.array(guestSchema)
});

export async function GET(req: NextRequest) {
  const guardResponse = ensureAdminApiGuard(req);
  if (guardResponse) return guardResponse;

  const payload = await getRsvpAdminPayload();
  return NextResponse.json(payload);
}

export async function PUT(req: NextRequest) {
  const guardResponse = ensureAdminApiGuard(req);
  if (guardResponse) return guardResponse;

  const body = await req.json();
  const parsed = payloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  const saved = await saveRsvpAdminPayload(parsed.data);
  return NextResponse.json(saved);
}
