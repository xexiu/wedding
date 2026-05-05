import {
  buildThemeCssVars,
  getVisibleModuleOrder,
  isModuleEnabled,
  renderModuleById
} from "@/app/[locale]/page.helpers";
import { HomeHeroSummary } from "@/app/[locale]/home-hero-summary";
import { LocalePreferenceSync } from "@/components/locale-preference-sync";
import { ModuleReveal } from "@/components/module-reveal";
import { getAmoreaClosingCopy } from "@/config/amorea-closing";
import { SiteHeader } from "@/components/site-header";
import { getSectionUiText } from "@/components/organisms/sections/ui-text";
import { formatWeddingDateLabel } from "@/lib/format-wedding-date";
import { isLocale } from "@/config/locales";
import { getEnabledLocaleCodes } from "@/lib/locales-store";
import { getSiteConfig } from "@/lib/site-config-store";
import { getTemplateStyles, getTemplateThemeTokenValues } from "@/themes/templates";
import { resolveThemeTokenValues } from "@/themes/theme-tokens";
import { notFound, redirect } from "next/navigation";

/** Public home reads live DB config; do not static-cache so admin edits show up after save. */
export const dynamic = "force-dynamic";

function resolveForcedPublicLocale(raw: string | undefined, allowedLocales: string[]): string | null {
  if (raw === undefined || raw === "") {
    return null;
  }
  const token = raw.trim().toLowerCase();
  if (!token || token === "false" || token === "off" || token === "0") {
    return null;
  }
  return isLocale(token, allowedLocales) ? token : null;
}

export default async function LocalizedHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const enabledLocales = await getEnabledLocaleCodes();
  const forcedLocale = resolveForcedPublicLocale(process.env.FORCE_PUBLIC_LOCALE, enabledLocales);
  if (forcedLocale && locale !== forcedLocale) {
    redirect(`/${forcedLocale}`);
  }
  if (!isLocale(locale, enabledLocales)) return notFound();

  const config = await getSiteConfig();
  const theme = getTemplateStyles(config.templateId);
  const themeValues = resolveThemeTokenValues(
    config.themeTokens,
    getTemplateThemeTokenValues(config.templateId)
  );
  const isHeroEnabled = isModuleEnabled(config.moduleFlags, "heroCarousel");
  const visibleOrder = getVisibleModuleOrder(config.moduleFlags, config.moduleOrder);
  const isAmoreaTemplate = config.templateId === "amorea-signature";
  const mainPaddingClass = isAmoreaTemplate ? "px-0 py-0" : "px-3 py-5 sm:px-4 sm:py-8";
  const amoreaClosing = isAmoreaTemplate ? getAmoreaClosingCopy(locale) : null;
  const sectionUi = getSectionUiText(locale);
  const closingRsvpLabel =
    config.weddingDetails.rsvpDeadline.trim().length > 0
      ? formatWeddingDateLabel(config.weddingDetails.rsvpDeadline, locale)
      : "";

  return (
    <>
      {/*
        Outside #site-theme-root so Amorea's max-width:480px on main does not constrain the banner,
        and classic templates' overflow does not clip the edges.
      */}
      <SiteHeader
        brideName={config.weddingDetails.brideName}
        groomName={config.weddingDetails.groomName}
        headerImageUrl={config.weddingDetails.headerImageUrl}
        effect={config.weddingDetails.headerEffect}
      />
      {config.weddingDetails.headerEffect === "fixed" ? (
        <div className="site-header-spacer" aria-hidden />
      ) : null}
      <main
        id="site-theme-root"
        className={`min-h-screen ${mainPaddingClass} ${theme.pageBg} ${
          config.motionSettings.cardHoverEnabled ? "motion-cards-hover" : ""
        } ${config.motionSettings.buttonPulseEnabled ? "motion-buttons-pulse" : ""} layout-font-${config.layoutSettings.fontStyle}`}
        style={buildThemeCssVars(themeValues, config.layoutSettings)}
      >
        <LocalePreferenceSync locale={locale} templateId={config.templateId} layoutSettings={config.layoutSettings} />
        {isHeroEnabled && config.templateId !== "amorea-signature" ? (
          <HomeHeroSummary details={config.weddingDetails} locale={locale} heroCardClassName={theme.heroCard} />
        ) : null}

        {visibleOrder.flatMap((id, index) => {
          const moduleEl = (
            <ModuleReveal key={id} motion={config.motionSettings} index={index}>
              {renderModuleById({
                id,
                details: config.weddingDetails,
                moduleProps: config.moduleProps,
                locale,
                cadencePreset: config.cadencePreset,
                theme
              })}
            </ModuleReveal>
          );
          if (!isAmoreaTemplate || index === 0) {
            return [moduleEl];
          }
          return [
            <div key={`amorea-shimmer-${id}`} className="amorea-shimmer" aria-hidden />,
            moduleEl
          ];
        })}
        {isAmoreaTemplate && amoreaClosing ? (
          <div className="amorea-closing">
            <p className="amorea-closing-text">
              {amoreaClosing.bodyLines[0]}
              <br />
              {amoreaClosing.bodyLines[1]}
            </p>
            <div className="amorea-closing-names">
              {config.weddingDetails.brideName} &amp; {config.weddingDetails.groomName}
            </div>
            {closingRsvpLabel ? (
              <p className="amorea-closing-deadline">
                {sectionUi.closingRsvpDeadlinePrefix}
                <time dateTime={config.weddingDetails.rsvpDeadline.trim()}>{closingRsvpLabel}</time>
              </p>
            ) : null}
          </div>
        ) : null}
      </main>
    </>
  );
}
