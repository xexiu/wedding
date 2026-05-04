import { defaultLocale, supportedLocales } from "@/config/locales";
import { defaultMessagesByLocale, mergeAdminUiTextWithDefaults } from "@/config/admin-ui-text-bundles";
import type { Messages } from "@/i18n/messages";
import { prisma } from "@/lib/prisma";

export type LocaleConfigItem = {
  code: string;
  name: string;
  enabled: boolean;
  isDefault: boolean;
  messages: Messages;
};

type LocaleConfigRow = Awaited<ReturnType<typeof prisma.localeConfig.findMany>>[number];

type LocaleConfigDelegate = typeof prisma.localeConfig;

function getLocaleConfigDelegate(): LocaleConfigDelegate | null {
  const candidate = (prisma as unknown as { localeConfig?: LocaleConfigDelegate }).localeConfig;
  if (!candidate || typeof candidate.upsert !== "function") {
    return null;
  }

  return candidate;
}

function fallbackLocaleConfigs(): LocaleConfigItem[] {
  return supportedLocales.map((code) => ({
    code,
    name: toLabel(code),
    enabled: true,
    isDefault: code === defaultLocale,
    messages: defaultMessagesForLocale(code)
  }));
}

function defaultMessagesForLocale(code: string): Messages {
  return defaultMessagesByLocale(code);
}

function toLabel(code: string): string {
  return code.toUpperCase();
}

function isMessages(value: unknown): value is Messages {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.title === "string" &&
    typeof record.subtitle === "string" &&
    typeof record.adminTitle === "string" &&
    typeof record.adminDescription === "string" &&
    typeof record.save === "string" &&
    typeof record.enabled === "string" &&
    typeof record.disabled === "string"
  );
}

function normalizeMessages(value: unknown, code: string): Messages {
  const fallback = defaultMessagesForLocale(code);
  if (isMessages(value)) {
    return {
      ...fallback,
      ...value,
      adminUi: mergeAdminUiTextWithDefaults(value.adminUi, code)
    };
  }

  return fallback;
}

export async function ensureLocalesSeeded() {
  const localeConfig = getLocaleConfigDelegate();
  if (!localeConfig) {
    return;
  }

  for (const code of supportedLocales) {
    await localeConfig.upsert({
      where: { code },
      update: {},
      create: {
        code,
        name: toLabel(code),
        enabled: true,
        isDefault: code === defaultLocale,
        messages: defaultMessagesForLocale(code)
      }
    });
  }

  const currentDefault = await localeConfig.findFirst({ where: { isDefault: true } });
  if (!currentDefault) {
    await localeConfig.update({
      where: { code: defaultLocale },
      data: { isDefault: true, enabled: true }
    });
  }
}

export async function getLocaleConfigs(): Promise<LocaleConfigItem[]> {
  const localeConfig = getLocaleConfigDelegate();
  if (!localeConfig) {
    return fallbackLocaleConfigs();
  }

  await ensureLocalesSeeded();
  const rows = await localeConfig.findMany({ orderBy: { code: "asc" } });

  return rows.map((row: LocaleConfigRow) => ({
    code: row.code,
    name: row.name,
    enabled: row.enabled,
    isDefault: row.isDefault,
    messages: normalizeMessages(row.messages, row.code)
  }));
}

export async function getEnabledLocaleCodes(): Promise<string[]> {
  const locales = await getLocaleConfigs();
  const enabled = locales.filter((locale) => locale.enabled).map((locale) => locale.code);
  return enabled.length > 0 ? enabled : [defaultLocale];
}

export async function getDefaultLocaleCode(): Promise<string> {
  const locales = await getLocaleConfigs();
  const found = locales.find((locale) => locale.isDefault);
  return found?.code ?? defaultLocale;
}

export async function saveLocaleConfigs(locales: LocaleConfigItem[]): Promise<LocaleConfigItem[]> {
  if (locales.length === 0) {
    throw new Error("at least one locale is required");
  }

  const normalized = locales.map((locale) => ({
    code: locale.code.trim().toLowerCase(),
    name: locale.name.trim(),
    enabled: locale.enabled,
    isDefault: locale.isDefault,
    messages: normalizeMessages(locale.messages, locale.code)
  }));

  const hasDefault = normalized.some((locale) => locale.isDefault);
  if (!hasDefault) {
    throw new Error("one default locale is required");
  }

  const localeConfig = getLocaleConfigDelegate();
  if (!localeConfig) {
    return normalized.map((locale) => ({
      code: locale.code,
      name: locale.name || toLabel(locale.code),
      enabled: locale.enabled || locale.isDefault,
      isDefault: locale.isDefault,
      messages: locale.messages
    }));
  }

  await prisma.$transaction([
    localeConfig.deleteMany(),
    ...normalized.map((locale) =>
      localeConfig.create({
        data: {
          code: locale.code,
          name: locale.name || toLabel(locale.code),
          enabled: locale.enabled || locale.isDefault,
          isDefault: locale.isDefault,
          messages: locale.messages
        }
      })
    )
  ]);

  return getLocaleConfigs();
}
