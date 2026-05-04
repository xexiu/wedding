"use client";

import { Locale } from "@/config/locales";
import {
  PREFERENCE_COOKIE_MAX_AGE_SECONDS,
  PREFERENCE_KEYS,
  isTemplateIdPreference
} from "@/config/preferences";
import { LayoutSettings } from "@/config/layout-settings";
import { MotionSettings } from "@/config/motion-settings";
import { TemplateId, getTemplateThemeTokenValues } from "@/themes/templates";
import { subscribeToLiveConfigUpdates, subscribeToLiveDraftConfig } from "@/lib/live-config-sync";
import { ThemeTokens, resolveThemeTokenValues } from "@/themes/theme-tokens";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

const useBrowserLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Props = {
  locale: Locale;
  templateId: TemplateId;
  layoutSettings: LayoutSettings;
};

const THEME_ROOT_ID = "site-theme-root";

function applyThemeTemplateToRoot(root: HTMLElement, templateId: TemplateId) {
  const values = getTemplateThemeTokenValues(templateId);
  root.style.setProperty("--theme-primary", values.primary);
  root.style.setProperty("--theme-secondary", values.secondary);
  root.style.setProperty("--theme-accent", values.accent);
  root.style.setProperty("--theme-surface", values.surface);
  root.style.setProperty("--theme-text", values.text);
  root.style.setProperty("--theme-button-bg", values.buttonBg);
  root.style.setProperty("--theme-button-text", values.buttonText);
  root.style.setProperty("--theme-button-radius", `${values.buttonRadius}px`);
}

function applyLayoutToRoot(root: HTMLElement, layoutSettings: LayoutSettings) {
  root.style.setProperty("--layout-title-scale", String(layoutSettings.titleScale));
  root.style.setProperty("--layout-body-scale", String(layoutSettings.bodyScale));
  root.style.setProperty("--layout-script-scale", String(layoutSettings.scriptScale));
  root.style.setProperty("--layout-page-title-size-scale", String(layoutSettings.pageTitleSizeScale));
  root.style.setProperty("--layout-page-subtitle-size-scale", String(layoutSettings.pageSubtitleSizeScale));
  root.style.setProperty("--layout-page-body-size-scale", String(layoutSettings.pageBodySizeScale));
  root.style.setProperty("--layout-card-title-size-scale", String(layoutSettings.cardTitleSizeScale));
  root.style.setProperty("--layout-card-subtitle-size-scale", String(layoutSettings.cardSubtitleSizeScale));
  root.style.setProperty("--layout-card-body-size-scale", String(layoutSettings.cardBodySizeScale));
  root.style.setProperty("--layout-subcard-title-size-scale", String(layoutSettings.subCardTitleSizeScale));
  root.style.setProperty("--layout-subcard-body-size-scale", String(layoutSettings.subCardBodySizeScale));
  root.style.setProperty("--layout-card-max-width", `${layoutSettings.cardMaxWidthPx}px`);
  root.style.setProperty("--layout-card-radius", `${layoutSettings.cardRadiusPx}px`);
  root.style.setProperty("--layout-page-bg", layoutSettings.pageBackgroundColor);
  root.style.setProperty("--layout-card-bg", layoutSettings.cardBackgroundColor);
  root.style.setProperty("--layout-card-border-color", layoutSettings.cardBorderColor);
  root.style.setProperty("--layout-card-border-width", `${layoutSettings.cardBorderWidthPx}px`);
  root.style.setProperty("--layout-card-shadow", `0 6px 22px rgba(28, 52, 95, ${layoutSettings.cardShadowOpacity})`);
  root.style.setProperty("--layout-page-font-weight", String(layoutSettings.pageFontWeight));
  root.style.setProperty("--layout-page-title-font-weight", String(layoutSettings.pageTitleFontWeight));
  root.style.setProperty("--layout-card-title-font-weight", String(layoutSettings.cardTitleFontWeight));
  root.style.setProperty("--layout-page-subtitle-font-weight", String(layoutSettings.pageSubtitleFontWeight));
  root.style.setProperty("--layout-card-subtitle-font-weight", String(layoutSettings.cardSubtitleFontWeight));
  root.style.setProperty("--layout-page-body-font-weight", String(layoutSettings.pageBodyFontWeight));
  root.style.setProperty("--layout-card-body-font-weight", String(layoutSettings.cardBodyFontWeight));
  root.style.setProperty("--layout-subcard-bg", layoutSettings.subCardBackgroundColor);
  root.style.setProperty("--layout-subcard-border-color", layoutSettings.subCardBorderColor);
  root.style.setProperty("--layout-subcard-border-width", `${layoutSettings.subCardBorderWidthPx}px`);
  root.style.setProperty("--layout-subcard-radius", `${layoutSettings.subCardRadiusPx}px`);
  root.style.setProperty("--layout-subcard-shadow", `0 4px 14px rgba(28, 52, 95, ${layoutSettings.subCardShadowOpacity})`);
  root.style.setProperty("--layout-subcard-title-font-weight", String(layoutSettings.subCardTitleFontWeight));
  root.style.setProperty("--layout-subcard-body-font-weight", String(layoutSettings.subCardBodyFontWeight));
}

function toggleClass(root: HTMLElement, className: string, enabled: boolean) {
  if (enabled) root.classList.add(className);
  else root.classList.remove(className);
}

function applyPageBackgroundToBody(layoutSettings: LayoutSettings) {
  document.body.style.backgroundColor = layoutSettings.pageBackgroundColor;
}

export function LocalePreferenceSync({ locale, templateId, layoutSettings }: Props) {
  const router = useRouter();

  useEffect(() => {
    const cookie = `${PREFERENCE_KEYS.LOCALE_COOKIE}=${locale}; path=/; max-age=${PREFERENCE_COOKIE_MAX_AGE_SECONDS}; samesite=lax`;
    document.cookie = cookie;
    try {
      localStorage.setItem(PREFERENCE_KEYS.LOCALE_STORAGE, locale);
    } catch {
      // Ignore browser storage errors (private mode / blocked storage)
    }
  }, [locale]);

  useEffect(() => {
    let storedLocale: string | null = null;
    try {
      storedLocale = localStorage.getItem(PREFERENCE_KEYS.LOCALE_STORAGE);
    } catch {
      storedLocale = null;
    }

    if (storedLocale && storedLocale !== locale) {
      try {
        localStorage.setItem(PREFERENCE_KEYS.LOCALE_STORAGE, locale);
      } catch {
        // Ignore browser storage errors (private mode / blocked storage)
      }
    }
  }, [locale]);

  useEffect(() => {
    const root = document.getElementById(THEME_ROOT_ID);
    if (!root) return;

    let storedTemplate: string | null = null;
    try {
      storedTemplate = localStorage.getItem(PREFERENCE_KEYS.THEME_PREVIEW_STORAGE);
    } catch {
      storedTemplate = null;
    }
    if (storedTemplate && isTemplateIdPreference(storedTemplate)) {
      applyThemeTemplateToRoot(root, storedTemplate);
      return;
    }

    applyThemeTemplateToRoot(root, templateId);
  }, [templateId]);

  useBrowserLayoutEffect(() => {
    applyPageBackgroundToBody(layoutSettings);
  }, [layoutSettings]);

  useEffect(() => {
    return subscribeToLiveConfigUpdates(() => {
      router.refresh();
    });
  }, [router]);

  useEffect(() => {
    const root = document.getElementById(THEME_ROOT_ID);
    if (!root) return;
    return subscribeToLiveDraftConfig((draft) => {
      const resolved = resolveThemeTokenValues(draft.themeTokens as ThemeTokens, getTemplateThemeTokenValues(draft.templateId));
      root.style.setProperty("--theme-primary", resolved.primary);
      root.style.setProperty("--theme-secondary", resolved.secondary);
      root.style.setProperty("--theme-accent", resolved.accent);
      root.style.setProperty("--theme-surface", resolved.surface);
      root.style.setProperty("--theme-text", resolved.text);
      root.style.setProperty("--theme-button-bg", resolved.buttonBg);
      root.style.setProperty("--theme-button-text", resolved.buttonText);
      root.style.setProperty("--theme-button-radius", `${resolved.buttonRadius}px`);

      const draftLayout = draft.layoutSettings as LayoutSettings;
      applyLayoutToRoot(root, draftLayout);
      applyPageBackgroundToBody(draftLayout);

      root.classList.remove("layout-font-elegant", "layout-font-editorial", "layout-font-modern");
      root.classList.add(`layout-font-${draft.layoutSettings.fontStyle}`);
      toggleClass(root, "motion-cards-hover", (draft.motionSettings as MotionSettings).cardHoverEnabled);
      toggleClass(root, "motion-buttons-pulse", (draft.motionSettings as MotionSettings).buttonPulseEnabled);
    });
  }, []);

  return null;
}
