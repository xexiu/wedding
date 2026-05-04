import { HEADER_EFFECT_ADMIN_OPTIONS } from "@/config/header-effect";
import { WeddingDetails } from "@/config/wedding-details";

export type WeddingField =
  | { key: keyof WeddingDetails; label: string; kind: "text" | "date" | "time" | "email"; hint?: string }
  | { key: keyof WeddingDetails; label: string; kind: "localizedText"; hint?: string }
  | {
      key: keyof WeddingDetails;
      label: string;
      kind: "select";
      options: { value: string; label: string }[];
      hint?: string;
    };

export const weddingDetailsFields: WeddingField[] = [
  { key: "brideName", label: "Bride name", kind: "text" },
  { key: "groomName", label: "Groom name", kind: "text" },
  {
    key: "headerImageUrl",
    label: "Site header background image (optional)",
    kind: "text",
    hint: "Full URL or path under public (e.g. /header.jpg). Leave empty for gradient matching site footer."
  },
  {
    key: "headerEffect",
    label: "Site header effect",
    kind: "select",
    options: HEADER_EFFECT_ADMIN_OPTIONS.map(({ value, label }) => ({ value, label })),
    hint: "Parallax / Ken Burns use the photo; Aurora shines when no photo is set."
  },
  { key: "weddingDate", label: "Wedding date", kind: "date" },
  { key: "venueName", label: "Venue name (default)", kind: "localizedText", hint: "Fallback when a per-event venue is empty" },
  { key: "ceremonyVenue", label: "Schedule: ceremony location", kind: "localizedText", hint: "Shown on the ceremony card" },
  {
    key: "aperitivoVenue",
    label: "Schedule: aperitivo location",
    kind: "localizedText",
    hint: "Cocktail hour before dinner; empty falls back to dinner location"
  },
  { key: "dinnerVenue", label: "Schedule: dinner / reception location", kind: "localizedText", hint: "Shown on the dinner card" },
  { key: "partyVenue", label: "Schedule: party / fiesta location", kind: "localizedText", hint: "Shown on the fiesta card" },
  { key: "eventSubtitle", label: "Event subtitle", kind: "localizedText", hint: "Per-locale subtitle" },
  { key: "ceremonyTime", label: "Ceremony time", kind: "time" },
  {
    key: "aperitivoTime",
    label: "Aperitivo time",
    kind: "time",
    hint: 'Shown only when Schedule module has "Show aperitivo row" enabled'
  },
  { key: "dinnerTime", label: "Dinner time", kind: "time" },
  { key: "partyTime", label: "Party / fiesta time", kind: "time" },
  { key: "rsvpDeadline", label: "RSVP deadline", kind: "date" },
  { key: "contactEmail", label: "Contact email", kind: "email" },
  { key: "contactPhone", label: "Contact phone", kind: "text" },
  { key: "rsvpNameLabel", label: "RSVP input: name label", kind: "localizedText" },
  { key: "rsvpEmailLabel", label: "RSVP input: email label", kind: "localizedText" },
  { key: "rsvpPhoneLabel", label: "RSVP input: phone label", kind: "localizedText" },
  { key: "rsvpAttendingLabel", label: "RSVP input: attending label", kind: "localizedText" },
  { key: "rsvpDeclineLabel", label: "RSVP input: decline label", kind: "localizedText" },
  { key: "rsvpDietaryLabel", label: "RSVP input: dietary label", kind: "localizedText" },
  { key: "rsvpPlusOneLabel", label: "RSVP input: companion names label", kind: "localizedText" },
  { key: "rsvpRequestedSongsLabel", label: "RSVP input: requested songs label", kind: "localizedText" },
  { key: "rsvpNotesLabel", label: "RSVP input: notes label", kind: "localizedText" },
  { key: "rsvpConfirmButtonLabel", label: "RSVP button: confirm label", kind: "localizedText" },
  { key: "rsvpDeclineButtonLabel", label: "RSVP button: decline label", kind: "localizedText" }
];
