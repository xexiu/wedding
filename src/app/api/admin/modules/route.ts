import { normalizeLayoutSettings } from "@/config/layout-settings";
import { normalizeModuleProps } from "@/config/modules";
import { normalizeMotionSettings } from "@/config/motion-settings";
import { SiteManifest, defaultSiteManifest, validateSiteManifest } from "@/config/site-manifest";
import { normalizeWeddingDetails } from "@/config/wedding-details";
import { ensureAdminApiGuard } from "@/lib/auth/guards";
import { parseLocaleConfigItems } from "@/lib/locale-config-payload";
import { getLocaleConfigs, saveLocaleConfigs } from "@/lib/locales-store";
import { getSiteConfig, saveSiteConfig } from "@/lib/site-config-store";
import { getTemplateThemeTokenValues } from "@/themes/templates";
import { normalizeThemeTokens } from "@/themes/theme-tokens";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import YAML from "yaml";
import { z } from "zod";

/** Full-site YAML v2: `{ exportVersion: 2, site: SiteManifest, locales: [...] }`. Flat document = site-only (v1). */
function parsePayload(payload: unknown): SiteManifest | null {
  try {
    return validateSiteManifest(payload);
  } catch {
    try {
      const record = typeof payload === "object" && payload !== null ? (payload as Record<string, unknown>) : {};
      const templateId =
        typeof record.templateId === "string" ? record.templateId : defaultSiteManifest.templateId;
      return validateSiteManifest({
        ...defaultSiteManifest,
        ...record,
        weddingDetails: normalizeWeddingDetails(record.weddingDetails),
        moduleProps: normalizeModuleProps(record.moduleProps),
        motionSettings: normalizeMotionSettings(record.motionSettings),
        layoutSettings: normalizeLayoutSettings(record.layoutSettings),
        themeTokens: normalizeThemeTokens(record.themeTokens, getTemplateThemeTokenValues(templateId as SiteManifest["templateId"]))
      });
    } catch {
      return null;
    }
  }
}

export async function GET(req: NextRequest) {
  const guardResponse = ensureAdminApiGuard(req);
  if (guardResponse) return guardResponse;

  const config = await getSiteConfig();
  return NextResponse.json(config);
}

export async function PUT(req: NextRequest) {
  const guardResponse = ensureAdminApiGuard(req);
  if (guardResponse) return guardResponse;

  const payload = await req.json();
  const parsed = parsePayload(payload);
  if (!parsed) {
    try {
      validateSiteManifest(payload);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json({ error: "invalid payload", issues: error.issues }, { status: 400 });
      }
    }
    return NextResponse.json({ error: "invalid payload", issues: [] }, { status: 400 });
  }

  const saved = await saveSiteConfig(parsed);
  revalidatePath("/", "layout");
  return NextResponse.json(saved);
}

export async function PATCH(req: NextRequest) {
  const guardResponse = ensureAdminApiGuard(req);
  if (guardResponse) return guardResponse;

  const body = (await req.json()) as { yaml?: string };
  if (!body.yaml) return NextResponse.json({ error: "yaml is required" }, { status: 400 });

  let parsedYaml: unknown;
  try {
    parsedYaml = YAML.parse(body.yaml);
  } catch {
    return NextResponse.json({ error: "invalid yaml syntax" }, { status: 400 });
  }

  const root = typeof parsedYaml === "object" && parsedYaml !== null ? (parsedYaml as Record<string, unknown>) : null;
  const siteCandidate =
    root && "site" in root && root.site !== undefined ? root.site : parsedYaml;
  const localesCandidate =
    root && "locales" in root && root.locales !== undefined ? root.locales : undefined;

  const parsed = parsePayload(siteCandidate);
  if (!parsed) return NextResponse.json({ error: "yaml does not match manifest schema" }, { status: 400 });

  let localesParsed = null as ReturnType<typeof parseLocaleConfigItems>;
  if (localesCandidate !== undefined) {
    localesParsed = parseLocaleConfigItems(localesCandidate);
    if (!localesParsed) {
      return NextResponse.json({ error: "invalid locales in yaml" }, { status: 400 });
    }
  }

  const saved = await saveSiteConfig(parsed);

  let savedLocales: Awaited<ReturnType<typeof saveLocaleConfigs>> | undefined;
  if (localesParsed) {
    try {
      savedLocales = await saveLocaleConfigs(localesParsed);
    } catch {
      return NextResponse.json({ error: "failed to save locales from yaml" }, { status: 400 });
    }
  }

  revalidatePath("/", "layout");
  if (savedLocales) {
    return NextResponse.json({ site: saved, locales: savedLocales });
  }
  return NextResponse.json({ site: saved });
}

export async function POST(req: NextRequest) {
  const guardResponse = ensureAdminApiGuard(req);
  if (guardResponse) return guardResponse;

  const site = await getSiteConfig();
  const locales = await getLocaleConfigs();
  const bundle = {
    exportVersion: 2,
    site,
    locales
  };
  return NextResponse.json({ yaml: YAML.stringify(bundle) });
}
