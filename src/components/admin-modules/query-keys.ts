"use client";

export const adminModulesQueryKeys = {
  all: ["admin-modules"] as const,
  config: () => [...adminModulesQueryKeys.all, "config"] as const,
  locales: () => [...adminModulesQueryKeys.all, "locales"] as const,
  rsvp: () => [...adminModulesQueryKeys.all, "rsvp"] as const
};
