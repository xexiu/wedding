export const THEME_COLOR_KEYS = [
  "primary",
  "secondary",
  "accent",
  "surface",
  "text",
  "buttonBg",
  "buttonText"
] as const;

export type ThemeColorKey = (typeof THEME_COLOR_KEYS)[number];

export const THEME_TOKEN_KEYS = [...THEME_COLOR_KEYS, "buttonRadius"] as const;
export type ThemeTokenKey = (typeof THEME_TOKEN_KEYS)[number];

export type ThemeTokenValues = {
  primary: string;
  secondary: string;
  accent: string;
  surface: string;
  text: string;
  buttonBg: string;
  buttonText: string;
  buttonRadius: number;
};

export type ThemeTokenEntry = {
  inherit: boolean;
  value: string | number;
};

export type ThemeTokens = Record<ThemeTokenKey, ThemeTokenEntry>;

export const DEFAULT_THEME_TOKEN_VALUES: ThemeTokenValues = {
  primary: "#1f325e",
  secondary: "#adc2e8",
  accent: "#6f8fc8",
  surface: "#ffffff",
  text: "#2a3550",
  buttonBg: "#4e6fa9",
  buttonText: "#ffffff",
  buttonRadius: 18
};

export function createInheritedThemeTokens(values: ThemeTokenValues): ThemeTokens {
  return {
    primary: { inherit: true, value: values.primary },
    secondary: { inherit: true, value: values.secondary },
    accent: { inherit: true, value: values.accent },
    surface: { inherit: true, value: values.surface },
    text: { inherit: true, value: values.text },
    buttonBg: { inherit: true, value: values.buttonBg },
    buttonText: { inherit: true, value: values.buttonText },
    buttonRadius: { inherit: true, value: values.buttonRadius }
  };
}

const HEX_COLOR_REGEX = /^#[0-9a-fA-F]{6}$/;

export function isHexColor(value: unknown): value is string {
  return typeof value === "string" && HEX_COLOR_REGEX.test(value);
}

export function normalizeButtonRadius(value: unknown, fallback: number): number {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return fallback;
  }

  return Math.min(28, Math.max(0, Math.round(value)));
}

export function normalizeThemeTokens(input: unknown, fallbackValues: ThemeTokenValues): ThemeTokens {
  const record = typeof input === "object" && input !== null ? (input as Record<string, unknown>) : {};
  const normalized = {} as ThemeTokens;

  for (const key of THEME_TOKEN_KEYS) {
    const rawEntry = record[key];
    const entryRecord =
      typeof rawEntry === "object" && rawEntry !== null ? (rawEntry as Record<string, unknown>) : {};
    const inherit = typeof entryRecord.inherit === "boolean" ? entryRecord.inherit : true;
    const fallback = fallbackValues[key];

    if (key === "buttonRadius") {
      normalized[key] = {
        inherit,
        value: normalizeButtonRadius(entryRecord.value, fallback as number)
      };
      continue;
    }

    normalized[key] = {
      inherit,
      value: isHexColor(entryRecord.value) ? entryRecord.value : fallback
    };
  }

  return normalized;
}

export function resolveThemeTokenValues(tokens: ThemeTokens, templateValues: ThemeTokenValues): ThemeTokenValues {
  return {
    primary: tokens.primary.inherit ? templateValues.primary : (tokens.primary.value as string),
    secondary: tokens.secondary.inherit ? templateValues.secondary : (tokens.secondary.value as string),
    accent: tokens.accent.inherit ? templateValues.accent : (tokens.accent.value as string),
    surface: tokens.surface.inherit ? templateValues.surface : (tokens.surface.value as string),
    text: tokens.text.inherit ? templateValues.text : (tokens.text.value as string),
    buttonBg: tokens.buttonBg.inherit ? templateValues.buttonBg : (tokens.buttonBg.value as string),
    buttonText: tokens.buttonText.inherit ? templateValues.buttonText : (tokens.buttonText.value as string),
    buttonRadius: tokens.buttonRadius.inherit
      ? normalizeButtonRadius(templateValues.buttonRadius, DEFAULT_THEME_TOKEN_VALUES.buttonRadius)
      : normalizeButtonRadius(tokens.buttonRadius.value, DEFAULT_THEME_TOKEN_VALUES.buttonRadius)
  };
}

