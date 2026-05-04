import {
  CountdownSection,
  DressCodeSection,
  EnvelopeSection,
  FaqSection,
  GiftsSection,
  HeroCarouselSection,
  OurSongSection,
  PhotoMosaicSection,
  PoemSection,
  RsvpSection,
  ScheduleSection,
  StorySection
} from "@/components/sections";
import { Locale } from "@/config/locales";
import { LayoutSettings } from "@/config/layout-settings";
import { ModuleDefinition, ModuleId, ModulePropsMap } from "@/config/modules";
import { WeddingDetails } from "@/config/wedding-details";
import { CadencePreset } from "@/themes/cadence";
import { TemplateStyles } from "@/themes/templates";
import { ThemeTokenValues } from "@/themes/theme-tokens";
import { CSSProperties } from "react";

export function getVisibleModuleOrder(moduleFlags: ModuleDefinition[], moduleOrder: ModuleId[]): ModuleId[] {
  const enabled = new Set(moduleFlags.filter((moduleItem) => moduleItem.enabled).map((moduleItem) => moduleItem.id));
  return moduleOrder.filter((id) => enabled.has(id));
}

export function isModuleEnabled(moduleFlags: ModuleDefinition[], moduleId: ModuleId): boolean {
  return moduleFlags.some((moduleItem) => moduleItem.id === moduleId && moduleItem.enabled);
}

export function buildThemeCssVars(themeValues: ThemeTokenValues, layoutSettings?: LayoutSettings): CSSProperties {
  return {
    "--theme-primary": themeValues.primary,
    "--theme-secondary": themeValues.secondary,
    "--theme-accent": themeValues.accent,
    "--theme-surface": themeValues.surface,
    "--theme-text": themeValues.text,
    "--theme-button-bg": themeValues.buttonBg,
    "--theme-button-text": themeValues.buttonText,
    "--theme-button-radius": `${themeValues.buttonRadius}px`,
    "--layout-title-scale": layoutSettings?.titleScale ?? 1,
    "--layout-body-scale": layoutSettings?.bodyScale ?? 1,
    "--layout-script-scale": layoutSettings?.scriptScale ?? 1,
    "--layout-page-title-size-scale": layoutSettings?.pageTitleSizeScale ?? 1,
    "--layout-page-subtitle-size-scale": layoutSettings?.pageSubtitleSizeScale ?? 1,
    "--layout-page-body-size-scale": layoutSettings?.pageBodySizeScale ?? 1,
    "--layout-card-title-size-scale": layoutSettings?.cardTitleSizeScale ?? 1,
    "--layout-card-subtitle-size-scale": layoutSettings?.cardSubtitleSizeScale ?? 1,
    "--layout-card-body-size-scale": layoutSettings?.cardBodySizeScale ?? 1,
    "--layout-subcard-title-size-scale": layoutSettings?.subCardTitleSizeScale ?? 1,
    "--layout-subcard-body-size-scale": layoutSettings?.subCardBodySizeScale ?? 1,
    "--layout-card-max-width": `${layoutSettings?.cardMaxWidthPx ?? 600}px`,
    "--layout-card-radius": `${layoutSettings?.cardRadiusPx ?? 10}px`,
    "--layout-page-bg": layoutSettings?.pageBackgroundColor ?? "#f8f6f2",
    "--layout-card-bg": layoutSettings?.cardBackgroundColor ?? "#ffffff",
    "--layout-card-border-color": layoutSettings?.cardBorderColor ?? "#dce4f0",
    "--layout-card-border-width": `${layoutSettings?.cardBorderWidthPx ?? 1}px`,
    "--layout-card-shadow":
      `0 6px 22px rgba(28, 52, 95, ${layoutSettings?.cardShadowOpacity ?? 0.08})`,
    "--layout-page-font-weight": layoutSettings?.pageFontWeight ?? 400,
    "--layout-page-title-font-weight": layoutSettings?.pageTitleFontWeight ?? 700,
    "--layout-card-title-font-weight": layoutSettings?.cardTitleFontWeight ?? 700,
    "--layout-page-subtitle-font-weight": layoutSettings?.pageSubtitleFontWeight ?? 500,
    "--layout-card-subtitle-font-weight": layoutSettings?.cardSubtitleFontWeight ?? 500,
    "--layout-page-body-font-weight": layoutSettings?.pageBodyFontWeight ?? 400,
    "--layout-card-body-font-weight": layoutSettings?.cardBodyFontWeight ?? 400,
    "--layout-subcard-bg": layoutSettings?.subCardBackgroundColor ?? "#ffffff",
    "--layout-subcard-border-color": layoutSettings?.subCardBorderColor ?? "#dce4f0",
    "--layout-subcard-border-width": `${layoutSettings?.subCardBorderWidthPx ?? 1}px`,
    "--layout-subcard-radius": `${layoutSettings?.subCardRadiusPx ?? 8}px`,
    "--layout-subcard-shadow": `0 4px 14px rgba(28, 52, 95, ${layoutSettings?.subCardShadowOpacity ?? 0.05})`,
    "--layout-subcard-title-font-weight": layoutSettings?.subCardTitleFontWeight ?? 600,
    "--layout-subcard-body-font-weight": layoutSettings?.subCardBodyFontWeight ?? 400
  } as CSSProperties;
}

type RenderModuleArgs = {
  id: ModuleId;
  details: WeddingDetails;
  moduleProps: ModulePropsMap;
  locale: Locale;
  cadencePreset: CadencePreset;
  theme: TemplateStyles;
};

export function renderModuleById({
  id,
  details,
  moduleProps,
  locale,
  cadencePreset,
  theme
}: RenderModuleArgs) {
  switch (id) {
    case "heroCarousel":
      return (
        <HeroCarouselSection
          details={details}
          props={moduleProps.heroCarousel}
          locale={locale}
          cadencePreset={cadencePreset}
          theme={theme}
        />
      );
    case "countdown":
      return (
        <CountdownSection
          details={details}
          props={moduleProps.countdown}
          locale={locale}
          cadencePreset={cadencePreset}
          theme={theme}
        />
      );
    case "envelope":
      return (
        <EnvelopeSection
          details={details}
          props={moduleProps.envelope}
          locale={locale}
          theme={theme}
        />
      );
    case "poem":
      return <PoemSection props={moduleProps.poem} locale={locale} theme={theme} />;
    case "ourSong":
      return <OurSongSection props={moduleProps.ourSong} locale={locale} theme={theme} />;
    case "dressCode":
      return <DressCodeSection props={moduleProps.dressCode} locale={locale} theme={theme} />;
    case "gifts":
      return <GiftsSection props={moduleProps.gifts} locale={locale} theme={theme} />;
    case "ourStory":
      return <StorySection props={moduleProps.ourStory} locale={locale} theme={theme} />;
    case "schedule":
      return (
        <ScheduleSection
          details={details}
          props={moduleProps.schedule}
          locale={locale}
          cadencePreset={cadencePreset}
          theme={theme}
        />
      );
    case "photoMosaic":
      return <PhotoMosaicSection props={moduleProps.photoMosaic} locale={locale} theme={theme} />;
    case "faq":
      return <FaqSection props={moduleProps.faq} locale={locale} theme={theme} />;
    case "rsvp":
      return (
        <RsvpSection
          details={details}
          props={moduleProps.rsvp}
          locale={locale}
          cadencePreset={cadencePreset}
          theme={theme}
        />
      );
    default:
      return null;
  }
}
