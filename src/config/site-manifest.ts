import { defaultModuleProps, ModuleDefinition, ModuleId, ModulePropsMap } from "@/config/modules";
import { localizedTextOptionalSchema, localizedTextSchema } from "@/config/localized-text";
import { CADENCE_PRESETS, CadencePreset, DEFAULT_CADENCE_PRESET } from "@/themes/cadence";
import { DEFAULT_MOTION_SETTINGS, MotionSettings, REVEAL_STYLES } from "@/config/motion-settings";
import { DEFAULT_LAYOUT_SETTINGS, LAYOUT_FONT_STYLES, LayoutSettings } from "@/config/layout-settings";
import { TemplateId } from "@/themes/templates";
import { defaultWeddingDetails, WeddingDetails } from "@/config/wedding-details";
import { createInheritedThemeTokens, DEFAULT_THEME_TOKEN_VALUES, ThemeTokens } from "@/themes/theme-tokens";
import { z } from "zod";

/** Carousel copy allows blanks per locale; display falls back across locales. */
const carouselSlideSchema = z.object({
  image: z.string(),
  title: localizedTextOptionalSchema,
  subtitle: localizedTextOptionalSchema
});

const moduleIdSchema = z.enum([
  "heroCarousel",
  "envelope",
  "poem",
  "ourSong",
  "countdown",
  "dressCode",
  "gifts",
  "ourStory",
  "schedule",
  "photoMosaic",
  "faq",
  "rsvp"
]);

export const siteManifestSchema = z.object({
  templateId: z.enum(["amorea-signature", "classic", "botanical-deluxe", "dark-luxury", "ivory-editorial"]),
  cadencePreset: z.enum(CADENCE_PRESETS),
  layoutSettings: z
    .object({
      fontStyle: z.enum(LAYOUT_FONT_STYLES),
      titleScale: z.number().min(0.8).max(1.4),
      bodyScale: z.number().min(0.85).max(1.3),
      scriptScale: z.number().min(0.8).max(1.5),
      pageTitleSizeScale: z.number().min(0.65).max(1.8),
      pageSubtitleSizeScale: z.number().min(0.65).max(1.8),
      pageBodySizeScale: z.number().min(0.65).max(1.8),
      cardTitleSizeScale: z.number().min(0.65).max(1.8),
      cardSubtitleSizeScale: z.number().min(0.65).max(1.8),
      cardBodySizeScale: z.number().min(0.65).max(1.8),
      subCardTitleSizeScale: z.number().min(0.65).max(1.8),
      subCardBodySizeScale: z.number().min(0.65).max(1.8),
      cardMaxWidthPx: z.number().int().min(420).max(860),
      cardRadiusPx: z.number().int().min(0).max(28),
      pageBackgroundColor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
      cardBackgroundColor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
      cardBorderColor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
      cardBorderWidthPx: z.number().int().min(0).max(8),
      cardShadowOpacity: z.number().min(0).max(0.35),
      pageFontWeight: z.number().int().min(300).max(900),
      pageTitleFontWeight: z.number().int().min(300).max(900),
      cardTitleFontWeight: z.number().int().min(300).max(900),
      pageSubtitleFontWeight: z.number().int().min(300).max(900),
      cardSubtitleFontWeight: z.number().int().min(300).max(900),
      pageBodyFontWeight: z.number().int().min(300).max(900),
      cardBodyFontWeight: z.number().int().min(300).max(900),
      subCardBackgroundColor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
      subCardBorderColor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
      subCardBorderWidthPx: z.number().int().min(0).max(8),
      subCardRadiusPx: z.number().int().min(0).max(28),
      subCardShadowOpacity: z.number().min(0).max(0.35),
      subCardTitleFontWeight: z.number().int().min(300).max(900),
      subCardBodyFontWeight: z.number().int().min(300).max(900)
    })
    .default(DEFAULT_LAYOUT_SETTINGS),
  motionSettings: z
    .object({
      scrollRevealEnabled: z.boolean(),
      revealStyle: z.enum(REVEAL_STYLES),
      staggerMs: z.number().int().min(0).max(400),
      cardHoverEnabled: z.boolean(),
      buttonPulseEnabled: z.boolean()
    })
    .default(DEFAULT_MOTION_SETTINGS),
  themeTokens: z.object({
    primary: z.object({ inherit: z.boolean(), value: z.string().regex(/^#[0-9a-fA-F]{6}$/) }),
    secondary: z.object({ inherit: z.boolean(), value: z.string().regex(/^#[0-9a-fA-F]{6}$/) }),
    accent: z.object({ inherit: z.boolean(), value: z.string().regex(/^#[0-9a-fA-F]{6}$/) }),
    surface: z.object({ inherit: z.boolean(), value: z.string().regex(/^#[0-9a-fA-F]{6}$/) }),
    text: z.object({ inherit: z.boolean(), value: z.string().regex(/^#[0-9a-fA-F]{6}$/) }),
    buttonBg: z.object({ inherit: z.boolean(), value: z.string().regex(/^#[0-9a-fA-F]{6}$/) }),
    buttonText: z.object({ inherit: z.boolean(), value: z.string().regex(/^#[0-9a-fA-F]{6}$/) }),
    buttonRadius: z.object({ inherit: z.boolean(), value: z.number().int().min(0).max(28) })
  }),
  moduleFlags: z.array(z.object({ id: moduleIdSchema, enabled: z.boolean() })),
  moduleOrder: z.array(moduleIdSchema),
  weddingDetails: z.object({
    brideName: z.string().min(1),
    groomName: z.string().min(1),
    headerImageUrl: z.string(),
    headerEffect: z.enum(["static", "sticky", "fixed", "parallax", "frosted", "kenBurns", "aurora"]),
    weddingDate: z.string().min(1),
    venueName: localizedTextSchema,
    ceremonyVenue: localizedTextSchema,
    aperitivoVenue: localizedTextSchema,
    dinnerVenue: localizedTextSchema,
    partyVenue: localizedTextSchema,
    eventSubtitle: localizedTextSchema,
    ceremonyTime: z.string().min(1),
    aperitivoTime: z.string().min(1),
    dinnerTime: z.string().min(1),
    partyTime: z.string().min(1),
    rsvpDeadline: z.string().min(1),
    contactEmail: z.string().min(1),
    contactPhone: z.string().min(1),
    rsvpNameLabel: localizedTextSchema,
    rsvpEmailLabel: localizedTextSchema,
    rsvpPhoneLabel: localizedTextSchema,
    rsvpAttendingLabel: localizedTextSchema,
    rsvpDeclineLabel: localizedTextSchema,
    rsvpDietaryLabel: localizedTextSchema,
    rsvpPlusOneLabel: localizedTextSchema,
    rsvpRequestedSongsLabel: localizedTextSchema,
    rsvpNotesLabel: localizedTextSchema,
    rsvpConfirmButtonLabel: localizedTextSchema,
    rsvpDeclineButtonLabel: localizedTextSchema
  }),
  moduleProps: z.object({
    heroCarousel: z.object({
      autoplayMs: z.number().int().positive(),
      showDots: z.boolean(),
      carouselSlides: z.array(carouselSlideSchema).min(1).max(24),
      stackAutoplayMs: z.number().int().positive(),
      slideOneTitle: localizedTextSchema,
      slideOneSubtitle: localizedTextSchema,
      slideTwoTitle: localizedTextSchema,
      slideTwoSubtitle: localizedTextSchema,
      slideThreeTitle: localizedTextSchema,
      slideThreeSubtitle: localizedTextSchema
    }),
    envelope: z.object({}),
    poem: z.object({
      title: localizedTextSchema,
      titleFontFamily: z.string().min(1),
      titleFontSizePx: z.number().positive(),
      subtitle: localizedTextOptionalSchema,
      subtitleFontFamily: z.string().min(1),
      subtitleFontSizePx: z.number().positive(),
      body: localizedTextSchema,
      bodyFontFamily: z.string().min(1),
      bodyFontSizePx: z.number().positive()
    }),
    ourSong: z.object({
      title: localizedTextSchema,
      audioUrl: z.string(),
      songTitle: localizedTextOptionalSchema,
      trackName: localizedTextSchema,
      artistName: localizedTextSchema
    }),
    countdown: z.object({}),
    dressCode: z.object({
      title: localizedTextSchema,
      description: localizedTextSchema
    }),
    gifts: z.object({
      title: localizedTextSchema,
      /** Empty per locale = no “above badge” line for that locale (no cross-locale fallback). */
      message: localizedTextOptionalSchema,
      modalOpenButtonLabel: localizedTextSchema,
      modalTitle: localizedTextSchema,
      modalSubtitle: localizedTextSchema,
      modalBody: localizedTextSchema
    }),
    ourStory: z.object({
      title: localizedTextSchema
    }),
    schedule: z.object({
      showAperitivoRow: z.boolean(),
      showPartyRow: z.boolean(),
      ceremonyLabel: localizedTextSchema,
      aperitivoLabel: localizedTextSchema,
      dinnerLabel: localizedTextSchema,
      partyLabel: localizedTextSchema
    }),
    photoMosaic: z.object({ columns: z.number().int().min(1).max(6) }),
    faq: z.object({
      title: localizedTextSchema
    }),
    rsvp: z.object({
      title: localizedTextSchema
    })
  })
});

export type SiteManifest = {
  templateId: TemplateId;
  cadencePreset: CadencePreset;
  layoutSettings: LayoutSettings;
  motionSettings: MotionSettings;
  themeTokens: ThemeTokens;
  moduleFlags: ModuleDefinition[];
  moduleOrder: ModuleId[];
  weddingDetails: WeddingDetails;
  moduleProps: ModulePropsMap;
};

const defaultThemeTokens: ThemeTokens = createInheritedThemeTokens(DEFAULT_THEME_TOKEN_VALUES);

export const defaultSiteManifest: SiteManifest = {
  templateId: "amorea-signature",
  cadencePreset: DEFAULT_CADENCE_PRESET,
  layoutSettings: DEFAULT_LAYOUT_SETTINGS,
  motionSettings: DEFAULT_MOTION_SETTINGS,
  themeTokens: defaultThemeTokens,
  moduleFlags: [
    { id: "heroCarousel", enabled: true },
    { id: "envelope", enabled: true },
    { id: "poem", enabled: true },
    { id: "ourSong", enabled: true },
    { id: "countdown", enabled: true },
    { id: "dressCode", enabled: true },
    { id: "gifts", enabled: true },
    { id: "ourStory", enabled: true },
    { id: "schedule", enabled: true },
    { id: "photoMosaic", enabled: true },
    { id: "faq", enabled: true },
    { id: "rsvp", enabled: true }
  ],
  moduleOrder: [
    "heroCarousel",
    "envelope",
    "poem",
    "ourSong",
    "schedule",
    "dressCode",
    "gifts",
    "countdown",
    "ourStory",
    "photoMosaic",
    "faq",
    "rsvp"
  ],
  weddingDetails: defaultWeddingDetails,
  moduleProps: defaultModuleProps
};

export function validateSiteManifest(payload: unknown): SiteManifest {
  return siteManifestSchema.parse(payload) as SiteManifest;
}
