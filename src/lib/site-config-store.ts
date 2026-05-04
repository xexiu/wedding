import { ModuleDefinition, ModuleId, ModulePropsMap, normalizeModuleProps } from "@/config/modules";
import { SiteManifest, defaultSiteManifest, validateSiteManifest } from "@/config/site-manifest";
import { CadencePreset, resolveCadencePreset } from "@/themes/cadence";
import { TemplateId, getTemplateThemeTokenValues } from "@/themes/templates";
import { WeddingDetails, normalizeWeddingDetails } from "@/config/wedding-details";
import { prisma } from "@/lib/prisma";
import { ThemeTokens, normalizeThemeTokens } from "@/themes/theme-tokens";
import { MotionSettings, normalizeMotionSettings } from "@/config/motion-settings";
import { LayoutSettings, normalizeLayoutSettings } from "@/config/layout-settings";

export type SiteConfigPayload = {
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

const DEFAULT_CONFIG: SiteConfigPayload = defaultSiteManifest;

function normalizeModuleFlagsWithDefaults(input: unknown): ModuleDefinition[] {
  const current = Array.isArray(input) ? (input as ModuleDefinition[]) : [];
  const byId = new Map(current.map((item) => [item.id, item.enabled]));
  return DEFAULT_CONFIG.moduleFlags.map((defaultItem) => ({
    id: defaultItem.id,
    enabled: typeof byId.get(defaultItem.id) === "boolean" ? Boolean(byId.get(defaultItem.id)) : defaultItem.enabled
  }));
}

function normalizeModuleOrderWithDefaults(input: unknown): ModuleId[] {
  const raw = Array.isArray(input) ? (input as ModuleId[]) : [];
  const known = new Set(DEFAULT_CONFIG.moduleOrder);
  const uniqueCurrent: ModuleId[] = [];
  for (const id of raw) {
    if (!known.has(id) || uniqueCurrent.includes(id)) continue;
    uniqueCurrent.push(id);
  }
  for (const fallbackId of DEFAULT_CONFIG.moduleOrder) {
    if (!uniqueCurrent.includes(fallbackId)) {
      uniqueCurrent.push(fallbackId);
    }
  }
  return uniqueCurrent;
}

export async function getSiteConfig(): Promise<SiteConfigPayload> {
  const row = await prisma.siteConfig.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      templateId: DEFAULT_CONFIG.templateId,
      cadencePreset: DEFAULT_CONFIG.cadencePreset,
      layoutSettings: DEFAULT_CONFIG.layoutSettings,
      motionSettings: DEFAULT_CONFIG.motionSettings,
      themeTokens: DEFAULT_CONFIG.themeTokens,
      moduleFlags: DEFAULT_CONFIG.moduleFlags,
      moduleOrder: DEFAULT_CONFIG.moduleOrder,
      weddingDetails: DEFAULT_CONFIG.weddingDetails,
      moduleProps: DEFAULT_CONFIG.moduleProps
    },
    update: {}
  });

  const templateId = row.templateId as TemplateId;
  const cadencePreset = resolveCadencePreset(row.cadencePreset);
  const raw: Partial<SiteManifest> = {
    templateId,
    cadencePreset,
    layoutSettings: normalizeLayoutSettings(row.layoutSettings),
    motionSettings: normalizeMotionSettings(row.motionSettings),
    themeTokens: normalizeThemeTokens(row.themeTokens, getTemplateThemeTokenValues(templateId)),
    moduleFlags: normalizeModuleFlagsWithDefaults(row.moduleFlags),
    moduleOrder: normalizeModuleOrderWithDefaults(row.moduleOrder),
    weddingDetails: normalizeWeddingDetails(row.weddingDetails),
    moduleProps: normalizeModuleProps(row.moduleProps)
  };

  return validateSiteManifest({
    ...DEFAULT_CONFIG,
    ...raw
  });
}

export async function saveSiteConfig(config: SiteConfigPayload): Promise<SiteConfigPayload> {
  const moduleProps = normalizeModuleProps(config.moduleProps);

  const saved = await prisma.siteConfig.upsert({
    where: { id: 1 },
    update: {
      moduleFlags: config.moduleFlags,
      templateId: config.templateId,
      cadencePreset: config.cadencePreset,
      layoutSettings: config.layoutSettings,
      motionSettings: config.motionSettings,
      themeTokens: config.themeTokens,
      moduleOrder: config.moduleOrder,
      weddingDetails: config.weddingDetails,
      moduleProps
    },
    create: {
      id: 1,
      templateId: config.templateId,
      cadencePreset: config.cadencePreset,
      layoutSettings: config.layoutSettings,
      motionSettings: config.motionSettings,
      themeTokens: config.themeTokens,
      moduleFlags: config.moduleFlags,
      moduleOrder: config.moduleOrder,
      weddingDetails: config.weddingDetails,
      moduleProps
    }
  });

  return validateSiteManifest({
    templateId: saved.templateId,
    cadencePreset: resolveCadencePreset(saved.cadencePreset),
    layoutSettings: normalizeLayoutSettings(saved.layoutSettings),
    motionSettings: normalizeMotionSettings(saved.motionSettings),
    themeTokens: normalizeThemeTokens(
      saved.themeTokens,
      getTemplateThemeTokenValues(saved.templateId as TemplateId)
    ),
    moduleFlags: normalizeModuleFlagsWithDefaults(saved.moduleFlags),
    moduleOrder: normalizeModuleOrderWithDefaults(saved.moduleOrder),
    weddingDetails: saved.weddingDetails,
    moduleProps: normalizeModuleProps(saved.moduleProps)
  });
}
