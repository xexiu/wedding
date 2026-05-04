import { defaultLocale } from "@/config/locales";

export const APP_SHELL_TEXT = {
  METADATA_TITLE: "Wedding Modular Site",
  METADATA_DESCRIPTION: "Flag-based modular wedding one-pager with bot-ready architecture",
  HTML_DEFAULT_LANG: "en",
  HOME_ROUTE_PREFIX: "/",
  HERO_NAMES_SEPARATOR: " & ",
  HERO_META_SEPARATOR: " - ",
  LOCALE_REDIRECT_PATH: `/${defaultLocale}`
} as const;
