/** Pretty-print YYYY-MM-DD from admin for public display (locale-aware). */
export function formatWeddingDateLabel(isoDate: string, locale: string): string {
  const raw = isoDate.trim();
  if (!raw) return "";
  const t = new Date(`${raw}T12:00:00Z`);
  if (Number.isNaN(t.getTime())) return raw;
  const tag = locale === "ro" ? "ro-RO" : locale === "es" ? "es" : "en-US";
  try {
    return new Intl.DateTimeFormat(tag, { dateStyle: "long", timeZone: "UTC" }).format(t);
  } catch {
    return raw;
  }
}
