"use client";

export const ADMIN_API_ROUTES = {
  MODULES: "/api/admin/modules",
  LOCALES: "/api/admin/locales",
  RSVP: "/api/admin/rsvp"
} as const;

export const STATUS_TEXT = {
  SAVED: "Saved",
  FAILED: "Failed",
  YAML_EXPORTED: "YAML exported",
  YAML_EXPORT_FAILED: "YAML export failed",
  YAML_IMPORT_FAILED: "YAML import failed",
  YAML_IMPORTED: "YAML imported",
  TEMPLATE_APPLIED_PREFIX: "Applied",
  TEMPLATE_APPLIED_SUFFIX: "defaults"
} as const;
