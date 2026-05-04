"use client";

import {
  fetchAdminLocalesConfig,
  fetchAdminModulesConfig,
  fetchAdminRsvpConfig,
  patchAdminModulesYaml,
  postAdminModulesYamlExport,
  putAdminLocalesConfig,
  putAdminRsvpConfig,
  putAdminModulesConfig
} from "@/components/admin-modules/query-fetchers";
import { adminModulesQueryKeys } from "@/components/admin-modules/query-keys";
import { LocaleConfigPayload, RsvpAdminPayload, SiteConfigPayload } from "@/components/admin-modules/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useAdminModulesConfigQuery() {
  return useQuery({
    queryKey: adminModulesQueryKeys.config(),
    queryFn: fetchAdminModulesConfig
  });
}

export function useAdminLocalesQuery() {
  return useQuery({
    queryKey: adminModulesQueryKeys.locales(),
    queryFn: fetchAdminLocalesConfig
  });
}

export function useSaveAdminModulesMutation() {
  return useMutation({
    mutationFn: (payload: SiteConfigPayload) => putAdminModulesConfig(payload)
  });
}

export function useSaveAdminLocalesMutation() {
  return useMutation({
    mutationFn: (payload: LocaleConfigPayload[]) => putAdminLocalesConfig(payload)
  });
}

export function useAdminRsvpQuery() {
  return useQuery({
    queryKey: adminModulesQueryKeys.rsvp(),
    queryFn: fetchAdminRsvpConfig
  });
}

export function useSaveAdminRsvpMutation() {
  return useMutation({
    mutationFn: (payload: RsvpAdminPayload) => putAdminRsvpConfig(payload)
  });
}

export function useImportYamlMutation() {
  return useMutation({
    mutationFn: (yaml: string) => patchAdminModulesYaml(yaml)
  });
}

export function useExportYamlMutation() {
  return useMutation({
    mutationFn: postAdminModulesYamlExport
  });
}
