import { defaultLocale, Locale } from "@/config/locales";
import { AdminUiText, defaultAdminUiText, defaultMessagesByLocale } from "@/config/admin-ui-text-bundles";
import { getLocaleConfigs } from "@/lib/locales-store";

export type Messages = {
  title: string;
  subtitle: string;
  adminTitle: string;
  adminDescription: string;
  save: string;
  enabled: string;
  disabled: string;
  adminUi: AdminUiText;
};

export async function getMessages(locale: Locale): Promise<Messages> {
  const dbLocales = await getLocaleConfigs();
  const dbMatch = dbLocales.find((item) => item.code === locale);
  if (dbMatch) {
    return dbMatch.messages;
  }

  try {
    const module = await import(`@/i18n/messages/${locale}`);
    return module.default as Messages;
  } catch {
    const module = await import(`@/i18n/messages/${defaultLocale}`);
    const base = module.default as Messages;
    const firstExistingLocale = dbLocales.find((item) => item.code === defaultLocale)?.messages;
    if (firstExistingLocale) {
      return firstExistingLocale;
    }
    return {
      ...defaultMessagesByLocale(defaultLocale),
      ...base,
      adminUi: base.adminUi ?? defaultAdminUiText(defaultLocale)
    };
  }
}
