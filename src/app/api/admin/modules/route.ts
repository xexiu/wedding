import { normalizeLayoutSettings } from "@/config/layout-settings";
import { normalizeModuleProps } from "@/config/modules";
import { normalizeMotionSettings } from "@/config/motion-settings";
import { SiteManifest, defaultSiteManifest, validateSiteManifest } from "@/config/site-manifest";
import { normalizeWeddingDetails } from "@/config/wedding-details";
import { ensureAdminApiGuard } from "@/lib/auth/guards";
import { getSiteConfig, saveSiteConfig } from "@/lib/site-config-store";
import { getTemplateThemeTokenValues } from "@/themes/templates";
import { normalizeThemeTokens } from "@/themes/theme-tokens";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import YAML from "yaml";
import { z } from "zod";

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

  const parsed = parsePayload(parsedYaml);
  if (!parsed) return NextResponse.json({ error: "yaml does not match manifest schema" }, { status: 400 });

  const saved = await saveSiteConfig(parsed);
  revalidatePath("/", "layout");
  return NextResponse.json(saved);
}

export async function POST(req: NextRequest) {
  const guardResponse = ensureAdminApiGuard(req);
  if (guardResponse) return guardResponse;

  const config = await getSiteConfig();
  return NextResponse.json({ yaml: YAML.stringify(config) });
}
