/** Visual / scroll behaviors for the public site header (wedding details → SiteHeader). */
export const HEADER_EFFECT_IDS = [
  "static",
  "sticky",
  "fixed",
  "parallax",
  "frosted",
  "kenBurns",
  "aurora"
] as const;

export type HeaderEffect = (typeof HEADER_EFFECT_IDS)[number];

export const DEFAULT_HEADER_EFFECT: HeaderEffect = "static";

export function parseHeaderEffect(raw: unknown): HeaderEffect {
  if (typeof raw === "string" && (HEADER_EFFECT_IDS as readonly string[]).includes(raw)) {
    return raw as HeaderEffect;
  }
  return DEFAULT_HEADER_EFFECT;
}

/** Admin dropdown labels (value matches persisted `headerEffect`). */
export const HEADER_EFFECT_ADMIN_OPTIONS: { value: HeaderEffect; label: string }[] = [
  { value: "static", label: "Standard — scrolls with the page" },
  { value: "sticky", label: "Sticky — stays under the top while you scroll" },
  { value: "fixed", label: "Fixed — bar always visible; content scrolls underneath" },
  { value: "parallax", label: "Parallax — depth effect on photo (gradient stays standard)" },
  { value: "frosted", label: "Frosted glass — blur and soft translucency" },
  { value: "kenBurns", label: "Cinematic — slow zoom on photo (subtle lift on gradient)" },
  { value: "aurora", label: "Aurora — slow shifting gradient when no photo is set" }
];
