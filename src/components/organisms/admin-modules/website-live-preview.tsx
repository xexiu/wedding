"use client";

import { buildThemeCssVars, getVisibleModuleOrder, isModuleEnabled, renderModuleById } from "@/app/[locale]/page.helpers";
import { HomeHeroSummary } from "@/app/[locale]/home-hero-summary";
import { ModuleReveal } from "@/components/module-reveal";
import { SiteHeader } from "@/components/site-header";
import { SiteConfigPayload } from "@/components/admin-modules/types";
import { LayoutSettings } from "@/config/layout-settings";
import { getTemplateStyles, getTemplateThemeTokenValues, TemplateId } from "@/themes/templates";
import { resolveThemeTokenValues, ThemeTokens } from "@/themes/theme-tokens";

type WebsiteLivePreviewProps = {
  locale: string;
  templateId: TemplateId;
  cadencePreset: SiteConfigPayload["cadencePreset"];
  layoutSettings: LayoutSettings;
  motionSettings: SiteConfigPayload["motionSettings"];
  moduleFlags: SiteConfigPayload["moduleFlags"];
  moduleOrder: SiteConfigPayload["moduleOrder"];
  weddingDetails: SiteConfigPayload["weddingDetails"];
  moduleProps: SiteConfigPayload["moduleProps"];
  themeTokens: ThemeTokens;
};

export function WebsiteLivePreview({
  locale,
  templateId,
  cadencePreset,
  layoutSettings,
  motionSettings,
  moduleFlags,
  moduleOrder,
  weddingDetails,
  moduleProps,
  themeTokens
}: WebsiteLivePreviewProps) {
  const theme = getTemplateStyles(templateId);
  const themeValues = resolveThemeTokenValues(themeTokens, getTemplateThemeTokenValues(templateId));
  const visibleOrder = getVisibleModuleOrder(moduleFlags, moduleOrder);
  const showHeroSummary = isModuleEnabled(moduleFlags, "heroCarousel") && templateId !== "amorea-signature";

  return (
    <section className="mt-6 rounded-xl border border-rose-200 bg-white p-3">
      <h3 className="text-base font-semibold text-rose-900">Website Live Preview (Unsaved)</h3>
      <p className="mt-1 text-xs text-rose-700">Updates instantly from current Admin edits. Save at bottom when ready.</p>
      <div className="mt-3 max-h-[70vh] overflow-auto rounded-lg border border-rose-100 bg-rose-50/30 p-2">
        <div
          className={`min-h-screen px-3 py-5 sm:px-4 sm:py-8 ${theme.pageBg} ${
            motionSettings.cardHoverEnabled ? "motion-cards-hover" : ""
          } ${motionSettings.buttonPulseEnabled ? "motion-buttons-pulse" : ""} layout-font-${layoutSettings.fontStyle}`}
          style={buildThemeCssVars(themeValues, layoutSettings)}
        >
          <SiteHeader
            brideName={weddingDetails.brideName}
            groomName={weddingDetails.groomName}
            headerImageUrl={weddingDetails.headerImageUrl}
            effect={weddingDetails.headerEffect}
          />
          {weddingDetails.headerEffect === "fixed" ? (
            <div className="site-header-spacer" aria-hidden />
          ) : null}
          {showHeroSummary ? (
            <HomeHeroSummary details={weddingDetails} locale={locale} heroCardClassName={theme.heroCard} />
          ) : null}
          {visibleOrder.map((id, index) => (
            <ModuleReveal key={`preview-${id}-${index}`} motion={motionSettings} index={index}>
              {renderModuleById({
                id,
                details: weddingDetails,
                moduleProps,
                locale,
                cadencePreset,
                theme
              })}
            </ModuleReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
