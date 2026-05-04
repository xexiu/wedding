"use client";

import { Locale } from "@/config/locales";
import { getLocalizedValue, LocalizedText } from "@/config/localized-text";
import { WeddingDetails } from "@/config/wedding-details";

export function translate(value: LocalizedText, locale: Locale): string {
  return getLocalizedValue(value, locale);
}

export function applySlideTokens(
  value: string,
  details: Pick<WeddingDetails, "brideName" | "groomName" | "weddingDate">
): string {
  return value
    .replaceAll("{bride}", details.brideName)
    .replaceAll("{groom}", details.groomName)
    .replaceAll("{date}", details.weddingDate);
}

export type CountdownParts = {
  days: string;
  hours: string;
  minutes: string;
};

/** Stable placeholder until client mounts (avoids SSR/client `Date.now()` mismatch). */
export const DEFAULT_COUNTDOWN: CountdownParts = {
  days: "000",
  hours: "00",
  minutes: "00"
};

function pad(value: number, length: number): string {
  return String(value).padStart(length, "0");
}

export function getCountdownParts(weddingDate: string, nowMs: number): CountdownParts {
  // UTC midnight so server (often UTC) and browser agree on the same instant (fixes hydration).
  const targetMs = new Date(`${weddingDate}T00:00:00Z`).getTime();
  if (Number.isNaN(targetMs)) {
    return DEFAULT_COUNTDOWN;
  }

  const diffMs = Math.max(targetMs - nowMs, 0);
  const totalMinutes = Math.floor(diffMs / 60000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;

  return {
    days: pad(days, 3),
    hours: pad(hours, 2),
    minutes: pad(minutes, 2)
  };
}

export { formatWeddingDateLabel } from "@/lib/format-wedding-date";
