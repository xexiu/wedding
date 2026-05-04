"use client";

import { Locale } from "@/config/locales";
import { ModuleDefinition, ModuleId, ModulePropsMap } from "@/config/modules";
import { WeddingDetails } from "@/config/wedding-details";
import { Messages } from "@/i18n/messages";
import { CadencePreset } from "@/themes/cadence";
import { MotionSettings } from "@/config/motion-settings";
import { LayoutSettings } from "@/config/layout-settings";
import { TemplateId } from "@/themes/templates";
import { ThemeTokens } from "@/themes/theme-tokens";
import type { GuestGroup, RsvpStatus } from "@/config/rsvp-enums";

export type Props = {
  locale: string;
  messages: Messages;
};

export type SiteConfigPayload = {
  templateId: TemplateId;
  cadencePreset: CadencePreset;
  layoutSettings: LayoutSettings;
  motionSettings: MotionSettings;
  moduleFlags: ModuleDefinition[];
  moduleOrder: ModuleId[];
  weddingDetails: WeddingDetails;
  moduleProps: ModulePropsMap;
  themeTokens: ThemeTokens;
};

export type LocaleConfigPayload = {
  code: string;
  name: string;
  enabled: boolean;
  isDefault: boolean;
  messages: Messages;
};

/** Response from PATCH /api/admin/modules (YAML import): site manifest plus optional locales when bundle includes them. */
export type SiteYamlImportResult = {
  site: SiteConfigPayload;
  locales?: LocaleConfigPayload[];
};

export type LocaleCode = Locale;

export type RsvpEventConfigPayload = {
  rsvpDeadline: string;
  eventDetails: string;
};

export type RsvpGuestPayload = {
  id?: number;
  name: string;
  email: string;
  phone: string;
  group: GuestGroup;
  rsvpStatus: RsvpStatus;
  dietaryRestrictions: string;
  notes: string;
  plusOneCount: number;
  plusOneNames: string[];
  requestedSongs: string[];
  /** ISO 8601 from API; absent until loaded/saved for new rows */
  createdAt?: string;
};

export type RsvpAdminPayload = {
  config: RsvpEventConfigPayload;
  guests: RsvpGuestPayload[];
};
