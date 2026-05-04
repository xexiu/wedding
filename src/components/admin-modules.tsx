"use client";

import { ModuleOrderManager } from "@/components/organisms/admin-modules/module-order-manager";
import { ModulePropsEditor } from "@/components/organisms/admin-modules/module-props-editor";
import { LocaleManager } from "@/components/organisms/admin-modules/locale-manager";
import { SaveActionBar } from "@/components/organisms/admin-modules/save-action-bar";
import { TemplateControls } from "@/components/organisms/admin-modules/template-controls";
import { ThemeTokensEditor } from "@/components/organisms/admin-modules/theme-tokens-editor";
import { RsvpAdminManager } from "@/components/organisms/admin-modules/rsvp-admin-manager";
import { AdminUiTextProvider, useAdminUiText } from "@/components/admin-modules/ui-text";
import { AdminNavigation, AdminSectionId, resolveAdminSection } from "@/components/admin-modules/navigation";
import { Props } from "@/components/admin-modules/types";
import { useAdminModulesState } from "@/components/admin-modules/use-admin-modules-state";
import { WeddingDetailsEditor } from "@/components/organisms/admin-modules/wedding-details-editor";
import { YamlConfigPanel } from "@/components/organisms/admin-modules/yaml-config-panel";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function AdminModules({
  locale,
  messages
}: Props) {
  return (
    <AdminUiTextProvider locale={locale} messages={messages}>
      <AdminModulesContent locale={locale} messages={messages} />
    </AdminUiTextProvider>
  );
}

function AdminModulesContent({ locale, messages }: Props) {
  const ADMIN_UI_TEXT = useAdminUiText();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sectionFromUrl = useMemo(
    () => resolveAdminSection(searchParams.get("section")),
    [searchParams]
  );
  const [activeSection, setActiveSection] = useState<AdminSectionId>(sectionFromUrl);
  const {
    isLoadingConfig,
    configError,
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
    saving,
    status,
    localeForProps,
    setLocaleForProps,
    availableLocales,
    setAvailableLocales,
    save,
    exportYaml,
    importYaml,
    applyTemplateDefaults
  } = useAdminModulesState({
    locale,
    messages
  });
  const enabledLocaleOptions = availableLocales
    .filter((localeItem) => localeItem.enabled)
    .map((localeItem) => localeItem.code);
  const localeOptions = enabledLocaleOptions.length > 0 ? enabledLocaleOptions : [localeForProps];

  useEffect(() => {
    setActiveSection(sectionFromUrl);
  }, [sectionFromUrl]);

  function updateSection(nextSection: AdminSectionId) {
    setActiveSection(nextSection);
    const params = new URLSearchParams(searchParams.toString());
    params.set("section", nextSection);
    window.history.replaceState(null, "", `${pathname}?${params.toString()}`);
  }

  if (isLoadingConfig) {
    return (
      <section className="mx-auto mt-5 w-full max-w-4xl rounded-2xl border border-rose-200 bg-white p-4 shadow-sm sm:mt-8 sm:p-6">
        <p className="text-sm text-rose-800">{ADMIN_UI_TEXT.ADMIN_CONTAINER.LOADING}</p>
      </section>
    );
  }

  if (configError) {
    return (
      <section className="mx-auto mt-5 w-full max-w-4xl rounded-2xl border border-rose-200 bg-white p-4 shadow-sm sm:mt-8 sm:p-6">
        <p className="text-sm text-rose-800">{ADMIN_UI_TEXT.ADMIN_CONTAINER.LOAD_FAILED}</p>
      </section>
    );
  }

  return (
    <section className="mx-auto mt-5 w-full max-w-4xl rounded-2xl border border-rose-200 bg-white p-4 shadow-sm sm:mt-8 sm:p-6">
      <h1 className="text-xl font-semibold text-rose-900 sm:text-2xl">{messages.adminTitle}</h1>
      <p className="mt-1 text-sm text-rose-800">{messages.adminDescription}</p>
      <div className="mt-4 flex flex-col gap-4 lg:flex-row">
        <div className="min-w-0 flex-1">
          {activeSection === "configuration" ? (
            <>
              <TemplateControls
                templateId={templateId}
                cadencePreset={cadencePreset}
                layoutSettings={layoutSettings}
                motionSettings={motionSettings}
                setTemplateId={setTemplateId}
                setCadencePreset={setCadencePreset}
                setLayoutSettings={setLayoutSettings}
                setMotionSettings={setMotionSettings}
                onApplyTemplateDefaults={() => applyTemplateDefaults(templateId)}
              />
              <ModuleOrderManager
                locale={locale}
                order={order}
                flags={flags}
                setOrder={setOrder}
                setFlags={setFlags}
                enabledLabel={messages.enabled}
                disabledLabel={messages.disabled}
              />
              <WeddingDetailsEditor
                localeForProps={localeForProps}
                weddingDetails={weddingDetails}
                setWeddingDetails={setWeddingDetails}
              />
              <ModulePropsEditor
                order={order}
                localeForProps={localeForProps}
                localeOptions={localeOptions}
                setLocaleForProps={setLocaleForProps}
                moduleProps={moduleProps}
                setModuleProps={setModuleProps}
              />
              <ThemeTokensEditor themeTokens={themeTokens} setThemeTokens={setThemeTokens} />
              <YamlConfigPanel
                yamlText={yamlText}
                setYamlText={setYamlText}
                exportYaml={exportYaml}
                importYaml={importYaml}
                saving={saving}
              />
              <SaveActionBar saving={saving} saveLabel={messages.save} onSave={save} status={status} />
            </>
          ) : null}

          {activeSection === "guests" ? <RsvpAdminManager /> : null}

          {activeSection === "localization" ? (
            <>
              <LocaleManager locales={availableLocales} setLocales={setAvailableLocales} />
              <SaveActionBar saving={saving} saveLabel={messages.save} onSave={save} status={status} />
            </>
          ) : null}
        </div>

        <AdminNavigation activeSection={activeSection} onChangeSection={updateSection} />
      </div>
    </section>
  );
}
