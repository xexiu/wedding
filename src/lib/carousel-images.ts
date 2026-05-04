/** Parse newline- or comma-separated filenames for `public/carousel/images/`. */
export function parseCarouselImageFilenames(raw: string): string[] {
  return raw
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Resolve admin image field: full URL, site path (`/...`), or filename under `public/carousel/images/`.
 */
export function resolveCarouselImageSrc(raw: string): string {
  const t = raw.trim();
  if (!t) return "";
  if (t.startsWith("http://") || t.startsWith("https://")) return t;
  if (t.startsWith("/")) return t;
  return `/carousel/images/${encodeURIComponent(t)}`;
}
