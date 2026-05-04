export const REVEAL_STYLES = ["fade", "slide-up", "zoom-in"] as const;

export type RevealStyle = (typeof REVEAL_STYLES)[number];

export type MotionSettings = {
  scrollRevealEnabled: boolean;
  revealStyle: RevealStyle;
  staggerMs: number;
  cardHoverEnabled: boolean;
  buttonPulseEnabled: boolean;
};

export const DEFAULT_MOTION_SETTINGS: MotionSettings = {
  scrollRevealEnabled: false,
  revealStyle: "fade",
  staggerMs: 80,
  cardHoverEnabled: true,
  buttonPulseEnabled: false
};

export function isRevealStyle(value: string): value is RevealStyle {
  return REVEAL_STYLES.includes(value as RevealStyle);
}

export function normalizeMotionSettings(input: unknown): MotionSettings {
  const raw = (input ?? {}) as Record<string, unknown>;
  return {
    scrollRevealEnabled:
      typeof raw.scrollRevealEnabled === "boolean" ? raw.scrollRevealEnabled : DEFAULT_MOTION_SETTINGS.scrollRevealEnabled,
    revealStyle: isRevealStyle(String(raw.revealStyle)) ? (raw.revealStyle as RevealStyle) : DEFAULT_MOTION_SETTINGS.revealStyle,
    staggerMs:
      typeof raw.staggerMs === "number" && Number.isFinite(raw.staggerMs)
        ? Math.max(0, Math.min(400, Math.floor(raw.staggerMs)))
        : DEFAULT_MOTION_SETTINGS.staggerMs,
    cardHoverEnabled:
      typeof raw.cardHoverEnabled === "boolean" ? raw.cardHoverEnabled : DEFAULT_MOTION_SETTINGS.cardHoverEnabled,
    buttonPulseEnabled:
      typeof raw.buttonPulseEnabled === "boolean" ? raw.buttonPulseEnabled : DEFAULT_MOTION_SETTINGS.buttonPulseEnabled
  };
}
