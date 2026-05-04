import type { GuestGroup, RsvpStatus } from "@/config/rsvp-enums";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "node:crypto";

export type GuestInput = {
  id?: number;
  name: string;
  email: string;
  phone: string;
  group: GuestGroup;
  rsvpStatus: RsvpStatus;
  dietaryRestrictions: string;
  notes: string;
  plusOneCount: number;
  plusOneNames: string[];
  requestedSongs: string[];
  /** ISO 8601 from server (optional on PUT body; ignored when saving) */
  createdAt?: string;
};

export type EventConfigInput = {
  rsvpDeadline: string;
  eventDetails: string;
};

export type RsvpAdminPayload = {
  config: EventConfigInput;
  guests: GuestInput[];
};

export type PublicRsvpSubmissionInput = {
  name: string;
  email: string;
  phone: string;
  notes: string;
  dietaryRestrictions: string;
  plusOneNames: string[];
  requestedSongs: string[];
  rsvpStatus: RsvpStatus;
  group: GuestGroup;
};

function normalizeString(value: string | null | undefined): string {
  return value?.trim() ?? "";
}

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string").map((item) => item.trim()).filter(Boolean);
}

function parseEventDetails(value: unknown): string {
  if (typeof value !== "string") return "";
  return value;
}

export async function getRsvpAdminPayload(): Promise<RsvpAdminPayload> {
  const [eventConfig, guests] = await Promise.all([
    prisma.eventConfig.upsert({
      where: { id: 1 },
      update: {},
      create: { id: 1, eventDetails: "" }
    }),
    prisma.guest.findMany({
      include: { invitation: true },
      orderBy: { createdAt: "desc" }
    })
  ]);

  return {
    config: {
      rsvpDeadline: eventConfig.rsvpDeadline ? eventConfig.rsvpDeadline.toISOString().slice(0, 16) : "",
      eventDetails: parseEventDetails(eventConfig.eventDetails)
    },
    guests: guests.map((guest) => ({
      id: guest.id,
      name: guest.name,
      email: normalizeString(guest.email),
      phone: normalizeString(guest.phone),
      group: guest.group,
      rsvpStatus: guest.rsvpStatus,
      dietaryRestrictions: normalizeString(guest.dietaryRestrictions),
      notes: normalizeString(guest.notes),
      plusOneCount: guest.plusOneCount,
      plusOneNames: normalizeStringArray(guest.plusOneNames),
      requestedSongs: normalizeStringArray(guest.requestedSongs),
      createdAt: guest.createdAt.toISOString()
    }))
  };
}

export async function saveRsvpAdminPayload(payload: RsvpAdminPayload): Promise<RsvpAdminPayload> {
  const deadline = payload.config.rsvpDeadline ? new Date(payload.config.rsvpDeadline) : null;
  const isValidDeadline = !deadline || !Number.isNaN(deadline.valueOf());

  await prisma.eventConfig.upsert({
    where: { id: 1 },
    update: {
      rsvpDeadline: isValidDeadline ? deadline : null,
      eventDetails: payload.config.eventDetails
    },
    create: {
      id: 1,
      rsvpDeadline: isValidDeadline ? deadline : null,
      eventDetails: payload.config.eventDetails
    }
  });

  const incomingIds = payload.guests.map((guest) => guest.id).filter((id): id is number => typeof id === "number");
  await prisma.guest.deleteMany({
    where: {
      id: {
        notIn: incomingIds.length > 0 ? incomingIds : [-1]
      }
    }
  });

  for (const guest of payload.guests) {
    const guestData = {
      name: guest.name.trim(),
      email: normalizeString(guest.email) || null,
      phone: normalizeString(guest.phone) || null,
      group: guest.group,
      rsvpStatus: guest.rsvpStatus,
      dietaryRestrictions: normalizeString(guest.dietaryRestrictions) || null,
      notes: normalizeString(guest.notes) || null,
      plusOneCount: guest.plusOneCount,
      plusOneNames: guest.plusOneNames,
      requestedSongs: guest.requestedSongs
    };

    if (guest.id) {
      await prisma.guest.update({
        where: { id: guest.id },
        data: guestData
      });
      continue;
    }

    await prisma.guest.create({
      data: {
        ...guestData,
        invitation: {
          create: {
            token: randomUUID()
          }
        }
      }
    });
  }

  return getRsvpAdminPayload();
}

export async function createPublicRsvpSubmission(input: PublicRsvpSubmissionInput): Promise<void> {
  const normalizedName = input.name.trim();
  if (!normalizedName) {
    throw new Error("name is required");
  }

  await prisma.guest.create({
    data: {
      name: normalizedName,
      email: normalizeString(input.email) || null,
      phone: normalizeString(input.phone) || null,
      group: input.group,
      rsvpStatus: input.rsvpStatus,
      dietaryRestrictions: normalizeString(input.dietaryRestrictions) || null,
      notes: normalizeString(input.notes) || null,
      plusOneCount: input.plusOneNames.length,
      plusOneNames: input.plusOneNames,
      requestedSongs: input.requestedSongs,
      invitation: {
        create: {
          token: randomUUID()
        }
      }
    }
  });
}
