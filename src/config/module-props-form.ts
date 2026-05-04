import { ModuleId } from "@/config/modules";

export type PropField =
  | { key: string; label: string; kind: "number"; min?: number; max?: number; step?: number; hint?: string }
  | { key: string; label: string; kind: "boolean"; hint?: string }
  | { key: string; label: string; kind: "localizedText"; hint?: string }
  | { key: string; label: string; kind: "plainText"; hint?: string }
  | { key: string; label: string; kind: "multiline"; hint?: string }
  | { key: string; label: string; kind: "localizedMultiline"; hint?: string }
  | { key: string; label: string; kind: "carouselSlides"; hint?: string };

export const modulePropsFields: Record<ModuleId, PropField[]> = {
  envelope: [],
  heroCarousel: [
    {
      key: "carouselSlides",
      label: "Amorea stack carousel (slides)",
      kind: "carouselSlides",
      hint: "Image: URL, /path, or file in public/carousel/images/. Use the Idioma control to edit each language. Tokens: {bride}, {groom}, {date}."
    },
    { key: "stackAutoplayMs", label: "Image stack autoplay (ms)", kind: "number", min: 1500, max: 30000, step: 500 },
    { key: "autoplayMs", label: "Autoplay milliseconds (non-Amorea slides)", kind: "number", min: 1000, max: 20000, step: 500 },
    { key: "showDots", label: "Show dots navigation", kind: "boolean" }
  ],
  poem: [
    { key: "title", label: "Title", kind: "localizedText" },
    { key: "titleFontFamily", label: "Title font (CSS)", kind: "plainText", hint: 'e.g. "Great Vibes", cursive' },
    { key: "titleFontSizePx", label: "Title size (px)", kind: "number", min: 8, max: 120, step: 1 },
    { key: "subtitle", label: "Subtitle (optional)", kind: "localizedText" },
    { key: "subtitleFontFamily", label: "Subtitle font (CSS)", kind: "plainText" },
    { key: "subtitleFontSizePx", label: "Subtitle size (px)", kind: "number", min: 8, max: 96, step: 1 },
    { key: "body", label: "Poem / text", kind: "localizedMultiline" },
    { key: "bodyFontFamily", label: "Body font (CSS)", kind: "plainText" },
    { key: "bodyFontSizePx", label: "Body size (px)", kind: "number", min: 8, max: 96, step: 1 }
  ],
  ourSong: [
    { key: "title", label: "Section title", kind: "localizedText" },
    {
      key: "audioUrl",
      label: "Audio URL (MP3)",
      kind: "plainText",
      hint: "Empty = bundled gala_free_from_desiree.mp3 in /audio/"
    },
    {
      key: "songTitle",
      label: "Song title (shown in player)",
      kind: "localizedText",
      hint: "Empty uses Track + Artist below, else default Gala title"
    },
    { key: "trackName", label: "Track name (fallback)", kind: "localizedText" },
    { key: "artistName", label: "Artist (fallback)", kind: "localizedText" }
  ],
  countdown: [],
  dressCode: [
    { key: "title", label: "Section title", kind: "localizedText" },
    { key: "description", label: "Description", kind: "localizedText" }
  ],
  gifts: [
    { key: "title", label: "Section title (also first word on circular badge)", kind: "localizedText" },
    { key: "message", label: "Message (above badge)", kind: "localizedText" },
    { key: "modalOpenButtonLabel", label: "Button next to badge (opens info)", kind: "localizedText", hint: "e.g. Click, Ver más" },
    { key: "modalTitle", label: "Info modal: title", kind: "localizedText" },
    { key: "modalSubtitle", label: "Info modal: subtitle", kind: "localizedText" },
    { key: "modalBody", label: "Info modal: main text", kind: "localizedMultiline" }
  ],
  ourStory: [{ key: "title", label: "Section title", kind: "localizedText", hint: "Per-locale title" }],
  schedule: [
    { key: "showAperitivoRow", label: "Show aperitivo row (before dinner)", kind: "boolean" },
    { key: "showPartyRow", label: "Show party row", kind: "boolean" },
    { key: "ceremonyLabel", label: "Ceremony label", kind: "localizedText" },
    { key: "aperitivoLabel", label: "Aperitivo label", kind: "localizedText" },
    { key: "dinnerLabel", label: "Dinner label", kind: "localizedText" },
    { key: "partyLabel", label: "Party label", kind: "localizedText" }
  ],
  photoMosaic: [{ key: "columns", label: "Columns", kind: "number", min: 1, max: 6, step: 1 }],
  faq: [{ key: "title", label: "Section title", kind: "localizedText", hint: "Per-locale title" }],
  rsvp: [{ key: "title", label: "Section title", kind: "localizedText", hint: "Per-locale title" }]
};
