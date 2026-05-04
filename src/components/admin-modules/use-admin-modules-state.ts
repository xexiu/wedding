"use client";

import { resolveInitialLocale } from "@/components/admin-modules/helpers";
import {
  getMutationErrorStatus,
  getMutationSuccessStatus,
  getTemplateAppliedStatus
} from "@/components/admin-modules/query-errors";
import {
  useAdminLocalesQuery,
  useAdminModulesConfigQuery,
  useExportYamlMutation,
  useImportYamlMutation,
  useSaveAdminLocalesMutation,
  useSaveAdminModulesMutation
} from "@/components/admin-modules/query-hooks";
import { adminModulesQueryKeys } from "@/components/admin-modules/query-keys";
import { LocaleCode, LocaleConfigPayload, Props } from "@/components/admin-modules/types";
import { ModuleDefinition, ModuleId, ModulePropsMap } from "@/config/modules";
import { DEFAULT_MOTION_SETTINGS, MotionSettings } from "@/config/motion-settings";
import { DEFAULT_LAYOUT_SETTINGS, LayoutSettings } from "@/config/layout-settings";
import { PREFERENCE_KEYS } from "@/config/preferences";
import { WeddingDetails } from "@/config/wedding-details";
import { emitLiveConfigUpdatedSignal, emitLiveDraftConfig } from "@/lib/live-config-sync";
import { CadencePreset, DEFAULT_CADENCE_PRESET } from "@/themes/cadence";
import { TemplateId, getTemplateDefaults } from "@/themes/templates";
import { ThemeTokens, createInheritedThemeTokens } from "@/themes/theme-tokens";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useAdminModulesState(props: Props) {
  const queryClient = useQueryClient();
  const configQuery = useAdminModulesConfigQuery();
  const localesQuery = useAdminLocalesQuery();
  const saveMutation = useSaveAdminModulesMutation();
  const saveLocalesMutation = useSaveAdminLocalesMutation();
  const importYamlMutation = useImportYamlMutation();
  const exportYamlMutation = useExportYamlMutation();

  const [templateId, setTemplateId] = useState<TemplateId>("amorea-signature");
  const [cadencePreset, setCadencePreset] = useState<CadencePreset>(DEFAULT_CADENCE_PRESET);
  const [layoutSettings, setLayoutSettings] = useState<LayoutSettings>(DEFAULT_LAYOUT_SETTINGS);
  const [motionSettings, setMotionSettings] = useState<MotionSettings>(DEFAULT_MOTION_SETTINGS);
  const [flags, setFlags] = useState<ModuleDefinition[]>([]);
  const [order, setOrder] = useState<ModuleId[]>([]);
  const [weddingDetails, setWeddingDetails] = useState<WeddingDetails>(
    getTemplateDefaults("amorea-signature").weddingDetails
  );
  const [moduleProps, setModuleProps] = useState<ModulePropsMap>(getTemplateDefaults("amorea-signature").moduleProps);
  const [themeTokens, setThemeTokens] = useState<ThemeTokens>(
    createInheritedThemeTokens(getTemplateDefaults("amorea-signature").themeTokenValues)
  );
  const [yamlText, setYamlText] = useState("");
  const [status, setStatus] = useState("");
  const [availableLocales, setAvailableLocales] = useState<LocaleConfigPayload[]>([]);
  const [localeForProps, setLocaleForProps] = useState<LocaleCode>(resolveInitialLocale(props.locale));

  useEffect(() => {
    if (!configQuery.data) {
      return;
    }

    setTemplateId(configQuery.data.templateId);
    setCadencePreset(configQuery.data.cadencePreset);
    setLayoutSettings(configQuery.data.layoutSettings);
    setMotionSettings(configQuery.data.motionSettings);
    setFlags(configQuery.data.moduleFlags);
    setOrder(configQuery.data.moduleOrder);
    setWeddingDetails(configQuery.data.weddingDetails);
    setModuleProps(configQuery.data.moduleProps);
    setThemeTokens(configQuery.data.themeTokens);
  }, [configQuery.data]);

  useEffect(() => {
    if (!localesQuery.data) {
      return;
    }

    setAvailableLocales(localesQuery.data);
    const enabledCodes = localesQuery.data.filter((locale) => locale.enabled).map((locale) => locale.code);
    setLocaleForProps((prev) => resolveInitialLocale(prev, enabledCodes));
  }, [localesQuery.data]);

  useEffect(() => {
    try {
      localStorage.setItem(PREFERENCE_KEYS.THEME_PREVIEW_STORAGE, templateId);
    } catch {
      // Ignore browser storage errors (private mode / blocked storage)
    }
  }, [templateId]);

  useEffect(() => {
    emitLiveDraftConfig({
      templateId,
      layoutSettings,
      motionSettings,
      themeTokens
    });
  }, [templateId, layoutSettings, motionSettings, themeTokens]);

  async function save() {
    setStatus("");
    try {
      const [saved, savedLocales] = await Promise.all([
        saveMutation.mutateAsync({
          moduleFlags: flags,
          moduleOrder: order,
          templateId,
          cadencePreset,
          layoutSettings,
          motionSettings,
          themeTokens,
          weddingDetails,
          moduleProps
        }),
        saveLocalesMutation.mutateAsync(availableLocales)
      ]);
      queryClient.setQueryData(adminModulesQueryKeys.config(), saved);
      queryClient.setQueryData(adminModulesQueryKeys.locales(), savedLocales);
      await queryClient.invalidateQueries({ queryKey: adminModulesQueryKeys.config() });
      await queryClient.invalidateQueries({ queryKey: adminModulesQueryKeys.locales() });
      emitLiveConfigUpdatedSignal();
      setStatus(getMutationSuccessStatus("save"));
    } catch {
      setStatus(getMutationErrorStatus("save"));
    }
  }

  async function exportYaml() {
    try {
      const yaml = await exportYamlMutation.mutateAsync();
      setYamlText(yaml);
      setStatus(getMutationSuccessStatus("exportYaml"));
    } catch {
      setStatus(getMutationErrorStatus("exportYaml"));
    }
  }

  async function importYaml() {
    try {
      const result = await importYamlMutation.mutateAsync(yamlText);
      const imported = result.site;
      setTemplateId(imported.templateId);
      setCadencePreset(imported.cadencePreset);
      setLayoutSettings(imported.layoutSettings);
      setMotionSettings(imported.motionSettings);
      setFlags(imported.moduleFlags);
      setOrder(imported.moduleOrder);
      setWeddingDetails(imported.weddingDetails);
      setModuleProps(imported.moduleProps);
      setThemeTokens(imported.themeTokens);
      queryClient.setQueryData(adminModulesQueryKeys.config(), imported);
      if (result.locales) {
        setAvailableLocales(result.locales);
        queryClient.setQueryData(adminModulesQueryKeys.locales(), result.locales);
      }
      await queryClient.invalidateQueries({ queryKey: adminModulesQueryKeys.config() });
      await queryClient.invalidateQueries({ queryKey: adminModulesQueryKeys.locales() });
      emitLiveConfigUpdatedSignal();
      setStatus(getMutationSuccessStatus("importYaml"));
    } catch {
      setStatus(getMutationErrorStatus("importYaml"));
    }
  }

  function applyTemplateDefaults(id: TemplateId) {
    const defaults = getTemplateDefaults(id);
    setTemplateId(id);
    setLayoutSettings(DEFAULT_LAYOUT_SETTINGS);
    setMotionSettings(DEFAULT_MOTION_SETTINGS);
    setWeddingDetails(defaults.weddingDetails);
    setModuleProps(defaults.moduleProps);
    setThemeTokens(createInheritedThemeTokens(defaults.themeTokenValues));
    setStatus(getTemplateAppliedStatus(id));
  }

  return {
    isLoadingConfig: configQuery.isLoading,
    configError: configQuery.isError,
    templateId,
    setTemplateId,
    cadencePreset,
    setCadencePreset,
    layoutSettings,
    setLayoutSettings,
    motionSettings,
    setMotionSettings,
    flags,
    setFlags,
    order,
    setOrder,
    weddingDetails,
    setWeddingDetails,
    moduleProps,
    setModuleProps,
    themeTokens,
    setThemeTokens,
    yamlText,
    setYamlText,
    saving:
      saveMutation.isPending ||
      saveLocalesMutation.isPending ||
      importYamlMutation.isPending ||
      exportYamlMutation.isPending,
    status,
    localeForProps,
    setLocaleForProps,
    availableLocales,
    setAvailableLocales,
    save,
    exportYaml,
    importYaml,
    applyTemplateDefaults
  };
}
