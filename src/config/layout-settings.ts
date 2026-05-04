export const LAYOUT_FONT_STYLES = ["elegant", "editorial", "modern"] as const;

export type LayoutFontStyle = (typeof LAYOUT_FONT_STYLES)[number];

export type LayoutSettings = {
  fontStyle: LayoutFontStyle;
  titleScale: number;
  bodyScale: number;
  scriptScale: number;
  /** Multipliers applied after global scales, per typography role (1 = template baseline). */
  pageTitleSizeScale: number;
  pageSubtitleSizeScale: number;
  pageBodySizeScale: number;
  cardTitleSizeScale: number;
  cardSubtitleSizeScale: number;
  cardBodySizeScale: number;
  subCardTitleSizeScale: number;
  subCardBodySizeScale: number;
  cardMaxWidthPx: number;
  cardRadiusPx: number;
  pageBackgroundColor: string;
  cardBackgroundColor: string;
  cardBorderColor: string;
  cardBorderWidthPx: number;
  cardShadowOpacity: number;
  pageFontWeight: number;
  pageTitleFontWeight: number;
  cardTitleFontWeight: number;
  pageSubtitleFontWeight: number;
  cardSubtitleFontWeight: number;
  pageBodyFontWeight: number;
  cardBodyFontWeight: number;
  subCardBackgroundColor: string;
  subCardBorderColor: string;
  subCardBorderWidthPx: number;
  subCardRadiusPx: number;
  subCardShadowOpacity: number;
  subCardTitleFontWeight: number;
  subCardBodyFontWeight: number;
};

export const DEFAULT_LAYOUT_SETTINGS: LayoutSettings = {
  fontStyle: "elegant",
  titleScale: 1,
  bodyScale: 1,
  scriptScale: 1,
  pageTitleSizeScale: 1,
  pageSubtitleSizeScale: 1,
  pageBodySizeScale: 1,
  cardTitleSizeScale: 1,
  cardSubtitleSizeScale: 1,
  cardBodySizeScale: 1,
  subCardTitleSizeScale: 1,
  subCardBodySizeScale: 1,
  cardMaxWidthPx: 480,
  cardRadiusPx: 10,
  pageBackgroundColor: "#f8f6f2",
  cardBackgroundColor: "#ffffff",
  cardBorderColor: "#dce4f0",
  cardBorderWidthPx: 1,
  cardShadowOpacity: 0.08,
  pageFontWeight: 400,
  pageTitleFontWeight: 700,
  cardTitleFontWeight: 700,
  pageSubtitleFontWeight: 500,
  cardSubtitleFontWeight: 500,
  pageBodyFontWeight: 400,
  cardBodyFontWeight: 400,
  subCardBackgroundColor: "#ffffff",
  subCardBorderColor: "#dce4f0",
  subCardBorderWidthPx: 1,
  subCardRadiusPx: 8,
  subCardShadowOpacity: 0.05,
  subCardTitleFontWeight: 600,
  subCardBodyFontWeight: 400
};

function clamp(value: unknown, fallback: number, min: number, max: number): number {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return fallback;
  }
  return Math.min(max, Math.max(min, Number(value)));
}

export function isLayoutFontStyle(value: string): value is LayoutFontStyle {
  return LAYOUT_FONT_STYLES.includes(value as LayoutFontStyle);
}

function normalizeHexColor(value: unknown, fallback: string): string {
  if (typeof value !== "string") return fallback;
  return /^#[0-9a-fA-F]{6}$/.test(value) ? value : fallback;
}

export function normalizeLayoutSettings(input: unknown): LayoutSettings {
  const record = typeof input === "object" && input !== null ? (input as Record<string, unknown>) : {};
  return {
    fontStyle: isLayoutFontStyle(String(record.fontStyle))
      ? (record.fontStyle as LayoutFontStyle)
      : DEFAULT_LAYOUT_SETTINGS.fontStyle,
    titleScale: clamp(record.titleScale, DEFAULT_LAYOUT_SETTINGS.titleScale, 0.8, 1.4),
    bodyScale: clamp(record.bodyScale, DEFAULT_LAYOUT_SETTINGS.bodyScale, 0.85, 1.3),
    scriptScale: clamp(record.scriptScale, DEFAULT_LAYOUT_SETTINGS.scriptScale, 0.8, 1.5),
    pageTitleSizeScale: clamp(record.pageTitleSizeScale, DEFAULT_LAYOUT_SETTINGS.pageTitleSizeScale, 0.65, 1.8),
    pageSubtitleSizeScale: clamp(record.pageSubtitleSizeScale, DEFAULT_LAYOUT_SETTINGS.pageSubtitleSizeScale, 0.65, 1.8),
    pageBodySizeScale: clamp(record.pageBodySizeScale, DEFAULT_LAYOUT_SETTINGS.pageBodySizeScale, 0.65, 1.8),
    cardTitleSizeScale: clamp(record.cardTitleSizeScale, DEFAULT_LAYOUT_SETTINGS.cardTitleSizeScale, 0.65, 1.8),
    cardSubtitleSizeScale: clamp(record.cardSubtitleSizeScale, DEFAULT_LAYOUT_SETTINGS.cardSubtitleSizeScale, 0.65, 1.8),
    cardBodySizeScale: clamp(record.cardBodySizeScale, DEFAULT_LAYOUT_SETTINGS.cardBodySizeScale, 0.65, 1.8),
    subCardTitleSizeScale: clamp(record.subCardTitleSizeScale, DEFAULT_LAYOUT_SETTINGS.subCardTitleSizeScale, 0.65, 1.8),
    subCardBodySizeScale: clamp(record.subCardBodySizeScale, DEFAULT_LAYOUT_SETTINGS.subCardBodySizeScale, 0.65, 1.8),
    cardMaxWidthPx: Math.round(clamp(record.cardMaxWidthPx, DEFAULT_LAYOUT_SETTINGS.cardMaxWidthPx, 420, 860)),
    cardRadiusPx: Math.round(clamp(record.cardRadiusPx, DEFAULT_LAYOUT_SETTINGS.cardRadiusPx, 0, 28)),
    pageBackgroundColor: normalizeHexColor(record.pageBackgroundColor, DEFAULT_LAYOUT_SETTINGS.pageBackgroundColor),
    cardBackgroundColor: normalizeHexColor(record.cardBackgroundColor, DEFAULT_LAYOUT_SETTINGS.cardBackgroundColor),
    cardBorderColor: normalizeHexColor(record.cardBorderColor, DEFAULT_LAYOUT_SETTINGS.cardBorderColor),
    cardBorderWidthPx: Math.round(clamp(record.cardBorderWidthPx, DEFAULT_LAYOUT_SETTINGS.cardBorderWidthPx, 0, 8)),
    cardShadowOpacity: Number(clamp(record.cardShadowOpacity, DEFAULT_LAYOUT_SETTINGS.cardShadowOpacity, 0, 0.35).toFixed(2)),
    pageFontWeight: Math.round(clamp(record.pageFontWeight, DEFAULT_LAYOUT_SETTINGS.pageFontWeight, 300, 900)),
    pageTitleFontWeight: Math.round(clamp(record.pageTitleFontWeight, DEFAULT_LAYOUT_SETTINGS.pageTitleFontWeight, 300, 900)),
    cardTitleFontWeight: Math.round(clamp(record.cardTitleFontWeight, DEFAULT_LAYOUT_SETTINGS.cardTitleFontWeight, 300, 900)),
    pageSubtitleFontWeight: Math.round(
      clamp(record.pageSubtitleFontWeight, DEFAULT_LAYOUT_SETTINGS.pageSubtitleFontWeight, 300, 900)
    ),
    cardSubtitleFontWeight: Math.round(
      clamp(record.cardSubtitleFontWeight, DEFAULT_LAYOUT_SETTINGS.cardSubtitleFontWeight, 300, 900)
    ),
    pageBodyFontWeight: Math.round(clamp(record.pageBodyFontWeight, DEFAULT_LAYOUT_SETTINGS.pageBodyFontWeight, 300, 900)),
    cardBodyFontWeight: Math.round(clamp(record.cardBodyFontWeight, DEFAULT_LAYOUT_SETTINGS.cardBodyFontWeight, 300, 900)),
    subCardBackgroundColor: normalizeHexColor(record.subCardBackgroundColor, DEFAULT_LAYOUT_SETTINGS.subCardBackgroundColor),
    subCardBorderColor: normalizeHexColor(record.subCardBorderColor, DEFAULT_LAYOUT_SETTINGS.subCardBorderColor),
    subCardBorderWidthPx: Math.round(clamp(record.subCardBorderWidthPx, DEFAULT_LAYOUT_SETTINGS.subCardBorderWidthPx, 0, 8)),
    subCardRadiusPx: Math.round(clamp(record.subCardRadiusPx, DEFAULT_LAYOUT_SETTINGS.subCardRadiusPx, 0, 28)),
    subCardShadowOpacity: Number(
      clamp(record.subCardShadowOpacity, DEFAULT_LAYOUT_SETTINGS.subCardShadowOpacity, 0, 0.35).toFixed(2)
    ),
    subCardTitleFontWeight: Math.round(
      clamp(record.subCardTitleFontWeight, DEFAULT_LAYOUT_SETTINGS.subCardTitleFontWeight, 300, 900)
    ),
    subCardBodyFontWeight: Math.round(
      clamp(record.subCardBodyFontWeight, DEFAULT_LAYOUT_SETTINGS.subCardBodyFontWeight, 300, 900)
    )
  };
}
