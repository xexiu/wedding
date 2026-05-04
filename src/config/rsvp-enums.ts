/**
 * Same values as `GuestGroup` / `RsvpStatus` in prisma/schema.prisma.
 * Use this module for types and Zod — avoids relying on `@prisma/client` enum exports in UI / tooling.
 */
export const GUEST_GROUP_VALUES = ["FAMILY", "FRIENDS", "WORK", "OTHER"] as const;
export type GuestGroup = (typeof GUEST_GROUP_VALUES)[number];

export const RSVP_STATUS_VALUES = ["PENDING", "ATTENDING", "DECLINED"] as const;
export type RsvpStatus = (typeof RSVP_STATUS_VALUES)[number];
