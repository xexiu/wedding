"use client";

import { THEME_COLOR_KEYS } from "@/themes/theme-tokens";

export const THEME_COLOR_LABELS: Record<(typeof THEME_COLOR_KEYS)[number], string> = {
  primary: "Primary",
  secondary: "Secondary",
  accent: "Accent",
  surface: "Surface",
  text: "Text",
  buttonBg: "Button Background",
  buttonText: "Button Text"
};
