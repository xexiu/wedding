"use client";

import { AdminButton } from "@/components/atoms/admin-modules/admin-button";
import { YamlConfigPanelProps } from "@/components/admin-modules/organisms.types";
import { useAdminUiText } from "@/components/admin-modules/ui-text";

export function YamlConfigPanel({
  yamlText,
  setYamlText,
  exportYaml,
  importYaml,
  saving
}: YamlConfigPanelProps) {
  const ADMIN_UI_TEXT = useAdminUiText();
  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold text-rose-900 sm:text-xl">{ADMIN_UI_TEXT.YAML_PANEL.TITLE}</h2>
      <textarea
        value={yamlText}
        onChange={(e) => setYamlText(e.target.value)}
        rows={12}
        className="mt-3 w-full rounded-md border border-rose-200 p-3 font-mono text-xs sm:text-sm"
        placeholder={ADMIN_UI_TEXT.YAML_PANEL.PLACEHOLDER}
      />
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <AdminButton onClick={exportYaml}>
          {ADMIN_UI_TEXT.YAML_PANEL.EXPORT_BUTTON}
        </AdminButton>
        <AdminButton
          onClick={importYaml}
          disabled={saving}
          className="min-h-10 rounded-md bg-rose-100 px-3 py-2 text-sm text-rose-900 disabled:opacity-60"
        >
          {ADMIN_UI_TEXT.YAML_PANEL.IMPORT_BUTTON}
        </AdminButton>
      </div>
    </div>
  );
}
