import { RsvpGuestPayload } from "@/components/admin-modules/types";
import type { GuestGroup, RsvpStatus } from "@/config/rsvp-enums";

export const GUEST_GROUP_OPTIONS: Array<{ value: GuestGroup; label: string }> = [
  { value: "FAMILY", label: "Family" },
  { value: "FRIENDS", label: "Friends" },
  { value: "WORK", label: "Work" },
  { value: "OTHER", label: "Other" }
];

export const RSVP_STATUS_OPTIONS: Array<{ value: RsvpStatus; label: string }> = [
  { value: "PENDING", label: "Pending" },
  { value: "ATTENDING", label: "Attending" },
  { value: "DECLINED", label: "Declined" }
];

export const RSVP_ADMIN_TEXT = {
  TITLE: "Guest RSVP and Invitations",
  DESCRIPTION:
    "Manage guests, acompanhantes, dietary restrictions, requested songs, and invitation tracking data.",
  DEADLINE_LABEL: "RSVP Deadline",
  EVENT_DETAILS_LABEL: "Event Details",
  GUESTS_LABEL: "Guests",
  ADD_GUEST: "Add Guest",
  SAVE: "Save Guest Data",
  SAVING: "Saving...",
  SAVE_OK: "Guest data saved",
  SAVE_FAILED: "Guest data failed to save",
  NOTES_PLACEHOLDER: "Custom notes (meal, speech, ceremony notes, etc.)",
  SONGS_PLACEHOLDER: "Requested songs, comma separated",
  PLUS_ONE_NAMES_PLACEHOLDER: "Acompanhantes names, comma separated",
  FILTER_RSVP_ALL: "All RSVP statuses",
  FILTER_RSVP_STATUS_LABEL: "RSVP status",
  FILTER_GROUP_ALL: "All groups",
  FILTER_GROUP_LABEL: "Group",
  SEARCH_PLACEHOLDER: "Search name, email, phone…",
  SORT_LABEL: "Sort by",
  SORT_REGISTERED_DESC: "Registered (newest)",
  SORT_REGISTERED_ASC: "Registered (oldest)",
  SORT_NAME_ASC: "Name (A–Z)",
  SORT_NAME_DESC: "Name (Z–A)",
  SUMMARY_TOTAL: (n: number) => `${n} guest${n === 1 ? "" : "s"} total`,
  SUMMARY_ATTENDING: (n: number) => `${n} attending`,
  SUMMARY_DECLINED: (n: number) => `${n} declined`,
  SUMMARY_PENDING: (n: number) => `${n} pending`,
  TABLE_SHOWING: (shown: number, total: number) => `Showing ${shown} of ${total}`,
  TABLE_COL_NAME: "Name",
  TABLE_COL_EMAIL: "Email",
  TABLE_COL_PHONE: "Phone",
  TABLE_COL_GROUP: "Group",
  TABLE_COL_RSVP: "RSVP",
  TABLE_COL_PLUS_COUNT: "+1 #",
  TABLE_COL_PLUS_NAMES: "Acompañantes",
  TABLE_COL_SONGS: "Songs",
  TABLE_COL_DIETARY: "Dietary",
  TABLE_COL_NOTES: "Notes",
  TABLE_COL_REGISTERED: "Registered",
  TABLE_COL_ACTIONS: "Details",
  TABLE_EXPAND: "Expand",
  TABLE_COLLAPSE: "Collapse",
  TABLE_EMPTY_FILTER: "No guests match the current filters.",
  DETAILS_HEADING: "Edit guest"
} as const;

export function createEmptyGuest(): RsvpGuestPayload {
  return {
    name: "",
    email: "",
    phone: "",
    group: "FRIENDS",
    rsvpStatus: "PENDING",
    dietaryRestrictions: "",
    notes: "",
    plusOneCount: 0,
    plusOneNames: [],
    requestedSongs: []
  };
}
