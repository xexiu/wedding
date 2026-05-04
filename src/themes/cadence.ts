export const CADENCE_PRESETS = ["mobile-tight", "mobile-balanced", "desktop-editorial"] as const;

export type CadencePreset = (typeof CADENCE_PRESETS)[number];

export const DEFAULT_CADENCE_PRESET: CadencePreset = "mobile-balanced";

export const CADENCE_PRESET_LABELS: Record<CadencePreset, string> = {
  "mobile-tight": "Mobile Tight",
  "mobile-balanced": "Mobile Balanced",
  "desktop-editorial": "Desktop Editorial"
};

export function isCadencePreset(value: string): value is CadencePreset {
  return CADENCE_PRESETS.includes(value as CadencePreset);
}

export function resolveCadencePreset(value: unknown): CadencePreset {
  return typeof value === "string" && isCadencePreset(value) ? value : DEFAULT_CADENCE_PRESET;
}
