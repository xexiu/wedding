import { createLocalizedText, LocalizedText, normalizeLocalizedText } from "@/config/localized-text";
import {
  DEFAULT_HEADER_EFFECT,
  HeaderEffect,
  parseHeaderEffect
} from "@/config/header-effect";

export type { HeaderEffect };

export type WeddingDetails = {
  brideName: string;
  groomName: string;
  /** Optional full-width header background (URL or site path e.g. `/images/header.jpg`). Empty uses gradient. */
  headerImageUrl: string;
  /** Scroll / motion style for the site header (see `HEADER_EFFECT_ADMIN_OPTIONS`). */
  headerEffect: HeaderEffect;
  weddingDate: string;
  /** Legacy / default venue label; also used when a per-event venue is left blank. */
  venueName: LocalizedText;
  /** Shown on the ceremony schedule card (defaults match venueName until edited). */
  ceremonyVenue: LocalizedText;
  /** Shown on the reception / dinner schedule card. */
  dinnerVenue: LocalizedText;
  /** Shown on the party / fiesta schedule card. */
  partyVenue: LocalizedText;
  /** Optional cocktail / welcome drinks between ceremony and dinner; shown when schedule enables Aperitivo row. */
  aperitivoVenue: LocalizedText;
  eventSubtitle: LocalizedText;
  ceremonyTime: string;
  /** When schedule shows Aperitivo, displayed between ceremony and dinner. */
  aperitivoTime: string;
  dinnerTime: string;
  partyTime: string;
  rsvpDeadline: string;
  contactEmail: string;
  contactPhone: string;
  rsvpNameLabel: LocalizedText;
  rsvpEmailLabel: LocalizedText;
  rsvpPhoneLabel: LocalizedText;
  rsvpAttendingLabel: LocalizedText;
  rsvpDeclineLabel: LocalizedText;
  rsvpDietaryLabel: LocalizedText;
  rsvpPlusOneLabel: LocalizedText;
  rsvpRequestedSongsLabel: LocalizedText;
  rsvpNotesLabel: LocalizedText;
  rsvpConfirmButtonLabel: LocalizedText;
  rsvpDeclineButtonLabel: LocalizedText;
};

export const defaultWeddingDetails: WeddingDetails = {
  brideName: "Alexandra",
  groomName: "Matei",
  headerImageUrl: "",
  headerEffect: DEFAULT_HEADER_EFFECT,
  weddingDate: "2026-09-12",
  venueName: createLocalizedText({
    en: "The Garden Estate, Bucharest",
    es: "The Garden Estate, Bucarest",
    ro: "The Garden Estate, Bucuresti"
  }),
  ceremonyVenue: createLocalizedText({
    en: "The Garden Estate, Bucharest",
    es: "The Garden Estate, Bucarest",
    ro: "The Garden Estate, Bucuresti"
  }),
  dinnerVenue: createLocalizedText({
    en: "The Garden Estate, Bucharest",
    es: "The Garden Estate, Bucarest",
    ro: "The Garden Estate, Bucuresti"
  }),
  partyVenue: createLocalizedText({
    en: "The Garden Estate, Bucharest",
    es: "The Garden Estate, Bucarest",
    ro: "The Garden Estate, Bucuresti"
  }),
  aperitivoVenue: createLocalizedText({
    en: "The Garden Estate, Bucharest",
    es: "The Garden Estate, Bucarest",
    ro: "The Garden Estate, Bucuresti"
  }),
  eventSubtitle: createLocalizedText({
    en: "A modular wedding website",
    es: "Un sitio de boda modular",
    ro: "Un website de nunta modular"
  }),
  ceremonyTime: "16:00",
  aperitivoTime: "18:00",
  dinnerTime: "19:00",
  partyTime: "21:00",
  rsvpDeadline: "2026-08-20",
  contactEmail: "hello@example.com",
  contactPhone: "+40 700 000 000",
  rsvpNameLabel: createLocalizedText({ en: "Your full name", es: "Nombre completo", ro: "Numele complet" }),
  rsvpEmailLabel: createLocalizedText({ en: "Email", es: "Email", ro: "Email" }),
  rsvpPhoneLabel: createLocalizedText({ en: "Phone", es: "Telefono", ro: "Telefon" }),
  rsvpAttendingLabel: createLocalizedText({ en: "I will attend", es: "Asistire", ro: "Voi participa" }),
  rsvpDeclineLabel: createLocalizedText({ en: "I cannot attend", es: "No puedo asistir", ro: "Nu pot participa" }),
  rsvpDietaryLabel: createLocalizedText({
    en: "Dietary restrictions",
    es: "Restricciones alimentarias",
    ro: "Restrictii alimentare"
  }),
  rsvpPlusOneLabel: createLocalizedText({ en: "Companion name(s)", es: "Nombre acompanante(s)", ro: "Nume insotitor(i)" }),
  rsvpRequestedSongsLabel: createLocalizedText({
    en: "Requested song(s)",
    es: "Cancion(es) solicitada(s)",
    ro: "Melodie(i) dorita(e)"
  }),
  rsvpNotesLabel: createLocalizedText({ en: "Notes", es: "Notas", ro: "Note" }),
  rsvpConfirmButtonLabel: createLocalizedText({
    en: "Click here to confirm",
    es: "Click aqui para confirmar",
    ro: "Click aici pentru confirmare"
  }),
  rsvpDeclineButtonLabel: createLocalizedText({
    en: "I cannot attend",
    es: "No puedo asistir",
    ro: "Nu pot participa"
  })
};

export function normalizeWeddingDetails(input: unknown): WeddingDetails {
  const raw = (input ?? {}) as Record<string, unknown>;
  const venueName = normalizeLocalizedText(raw.venueName, defaultWeddingDetails.venueName);
  const dinnerVenue = normalizeLocalizedText(raw.dinnerVenue, venueName);
  return {
    brideName: typeof raw.brideName === "string" ? raw.brideName : defaultWeddingDetails.brideName,
    groomName: typeof raw.groomName === "string" ? raw.groomName : defaultWeddingDetails.groomName,
    headerImageUrl:
      typeof raw.headerImageUrl === "string" ? raw.headerImageUrl.trim() : defaultWeddingDetails.headerImageUrl,
    headerEffect: parseHeaderEffect(raw.headerEffect),
    weddingDate: typeof raw.weddingDate === "string" ? raw.weddingDate : defaultWeddingDetails.weddingDate,
    venueName,
    ceremonyVenue: normalizeLocalizedText(raw.ceremonyVenue, venueName),
    dinnerVenue,
    partyVenue: normalizeLocalizedText(raw.partyVenue, venueName),
    aperitivoVenue: normalizeLocalizedText(raw.aperitivoVenue, dinnerVenue),
    eventSubtitle: normalizeLocalizedText(raw.eventSubtitle, defaultWeddingDetails.eventSubtitle),
    ceremonyTime: typeof raw.ceremonyTime === "string" ? raw.ceremonyTime : defaultWeddingDetails.ceremonyTime,
    aperitivoTime: typeof raw.aperitivoTime === "string" ? raw.aperitivoTime : defaultWeddingDetails.aperitivoTime,
    dinnerTime: typeof raw.dinnerTime === "string" ? raw.dinnerTime : defaultWeddingDetails.dinnerTime,
    partyTime: typeof raw.partyTime === "string" ? raw.partyTime : defaultWeddingDetails.partyTime,
    rsvpDeadline: typeof raw.rsvpDeadline === "string" ? raw.rsvpDeadline : defaultWeddingDetails.rsvpDeadline,
    contactEmail: typeof raw.contactEmail === "string" ? raw.contactEmail : defaultWeddingDetails.contactEmail,
    contactPhone: typeof raw.contactPhone === "string" ? raw.contactPhone : defaultWeddingDetails.contactPhone,
    rsvpNameLabel: normalizeLocalizedText(raw.rsvpNameLabel, defaultWeddingDetails.rsvpNameLabel),
    rsvpEmailLabel: normalizeLocalizedText(raw.rsvpEmailLabel, defaultWeddingDetails.rsvpEmailLabel),
    rsvpPhoneLabel: normalizeLocalizedText(raw.rsvpPhoneLabel, defaultWeddingDetails.rsvpPhoneLabel),
    rsvpAttendingLabel: normalizeLocalizedText(raw.rsvpAttendingLabel, defaultWeddingDetails.rsvpAttendingLabel),
    rsvpDeclineLabel: normalizeLocalizedText(raw.rsvpDeclineLabel, defaultWeddingDetails.rsvpDeclineLabel),
    rsvpDietaryLabel: normalizeLocalizedText(raw.rsvpDietaryLabel, defaultWeddingDetails.rsvpDietaryLabel),
    rsvpPlusOneLabel: normalizeLocalizedText(raw.rsvpPlusOneLabel, defaultWeddingDetails.rsvpPlusOneLabel),
    rsvpRequestedSongsLabel: normalizeLocalizedText(raw.rsvpRequestedSongsLabel, defaultWeddingDetails.rsvpRequestedSongsLabel),
    rsvpNotesLabel: normalizeLocalizedText(raw.rsvpNotesLabel, defaultWeddingDetails.rsvpNotesLabel),
    rsvpConfirmButtonLabel: normalizeLocalizedText(raw.rsvpConfirmButtonLabel, defaultWeddingDetails.rsvpConfirmButtonLabel),
    rsvpDeclineButtonLabel: normalizeLocalizedText(raw.rsvpDeclineButtonLabel, defaultWeddingDetails.rsvpDeclineButtonLabel)
  };
}
