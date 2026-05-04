"use client";

import { ADMIN_API_ROUTES } from "@/components/admin-modules/constants";
import { LocaleConfigPayload, RsvpAdminPayload, SiteConfigPayload } from "@/components/admin-modules/types";

async function parseJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function fetchAdminModulesConfig(): Promise<SiteConfigPayload> {
  const response = await fetch(ADMIN_API_ROUTES.MODULES, { method: "GET" });
  return parseJson<SiteConfigPayload>(response);
}

export async function putAdminModulesConfig(payload: SiteConfigPayload): Promise<SiteConfigPayload> {
  const response = await fetch(ADMIN_API_ROUTES.MODULES, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload)
  });
  return parseJson<SiteConfigPayload>(response);
}

export async function patchAdminModulesYaml(yaml: string): Promise<SiteConfigPayload> {
  const response = await fetch(ADMIN_API_ROUTES.MODULES, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ yaml })
  });
  return parseJson<SiteConfigPayload>(response);
}

export async function postAdminModulesYamlExport(): Promise<string> {
  const response = await fetch(ADMIN_API_ROUTES.MODULES, { method: "POST" });
  const data = await parseJson<{ yaml?: string }>(response);
  return data.yaml ?? "";
}

export async function fetchAdminLocalesConfig(): Promise<LocaleConfigPayload[]> {
  const response = await fetch(ADMIN_API_ROUTES.LOCALES, { method: "GET" });
  const data = await parseJson<{ locales?: LocaleConfigPayload[] }>(response);
  return data.locales ?? [];
}

export async function putAdminLocalesConfig(payload: LocaleConfigPayload[]): Promise<LocaleConfigPayload[]> {
  const response = await fetch(ADMIN_API_ROUTES.LOCALES, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ locales: payload })
  });
  const data = await parseJson<{ locales?: LocaleConfigPayload[] }>(response);
  return data.locales ?? [];
}

export async function fetchAdminRsvpConfig(): Promise<RsvpAdminPayload> {
  const response = await fetch(ADMIN_API_ROUTES.RSVP, { method: "GET" });
  return parseJson<RsvpAdminPayload>(response);
}

export async function putAdminRsvpConfig(payload: RsvpAdminPayload): Promise<RsvpAdminPayload> {
  const response = await fetch(ADMIN_API_ROUTES.RSVP, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload)
  });
  return parseJson<RsvpAdminPayload>(response);
}
