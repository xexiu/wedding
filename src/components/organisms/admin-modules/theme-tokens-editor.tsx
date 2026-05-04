"use client";

import { AdminInput } from "@/components/atoms/admin-modules/admin-input";
import { THEME_COLOR_LABELS } from "@/components/admin-modules/theme-tokens.constants";
import { ThemeTokensEditorProps } from "@/components/admin-modules/theme-tokens.types";
import { useAdminUiText } from "@/components/admin-modules/ui-text";
import { ToggleRow } from "@/components/molecules/admin-modules/toggle-row";
import { THEME_COLOR_KEYS } from "@/themes/theme-tokens";

export function ThemeTokensEditor({ themeTokens, setThemeTokens }: ThemeTokensEditorProps) {
  const ADMIN_UI_TEXT = useAdminUiText();
  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold text-rose-900 sm:text-xl">{ADMIN_UI_TEXT.THEME_TOKENS.TITLE}</h2>
      <p className="mt-1 text-xs text-rose-700">
        {ADMIN_UI_TEXT.THEME_TOKENS.DESCRIPTION}
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {THEME_COLOR_KEYS.map((key) => (
          <label key={key} className="rounded-md border border-rose-200 p-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium text-rose-900">{THEME_COLOR_LABELS[key]}</span>
              <ToggleRow
                label={ADMIN_UI_TEXT.THEME_TOKENS.INHERIT_LABEL}
                tone="muted"
                className="flex items-center gap-2 border-0 px-0 py-0"
                checked={themeTokens[key].inherit}
                onChange={(checked) =>
                  setThemeTokens((prev) => ({
                    ...prev,
                    [key]: { ...prev[key], inherit: checked }
                  }))
                }
              />
            </div>
            <div className="mt-2 flex items-center gap-2">
              <input
                type="color"
                value={themeTokens[key].value as string}
                disabled={themeTokens[key].inherit}
                onChange={(e) =>
                  setThemeTokens((prev) => ({
                    ...prev,
                    [key]: { ...prev[key], value: e.target.value }
                  }))
                }
                className="h-10 w-14 rounded border border-rose-200 bg-transparent disabled:opacity-40"
              />
              <AdminInput
                type="text"
                value={themeTokens[key].value as string}
                disabled={themeTokens[key].inherit}
                onChange={(e) =>
                  setThemeTokens((prev) => ({
                    ...prev,
                    [key]: { ...prev[key], value: e.target.value }
                  }))
                }
                className="min-h-10 flex-1 rounded border border-rose-200 px-3 py-2 text-sm disabled:opacity-50"
              />
            </div>
          </label>
        ))}
        <label className="rounded-md border border-rose-200 p-3 sm:col-span-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-medium text-rose-900">{ADMIN_UI_TEXT.THEME_TOKENS.BUTTON_RADIUS_LABEL}</span>
            <ToggleRow
              label={ADMIN_UI_TEXT.THEME_TOKENS.INHERIT_LABEL}
              tone="muted"
              className="flex items-center gap-2 border-0 px-0 py-0"
              checked={themeTokens.buttonRadius.inherit}
              onChange={(checked) =>
                setThemeTokens((prev) => ({
                  ...prev,
                  buttonRadius: { ...prev.buttonRadius, inherit: checked }
                }))
              }
            />
          </div>
          <div className="mt-2 flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={28}
              step={1}
              disabled={themeTokens.buttonRadius.inherit}
              value={Number(themeTokens.buttonRadius.value)}
              onChange={(e) =>
                setThemeTokens((prev) => ({
                  ...prev,
                  buttonRadius: { ...prev.buttonRadius, value: Number(e.target.value) }
                }))
              }
              className="w-full"
            />
            <AdminInput
              type="number"
              min={0}
              max={28}
              step={1}
              disabled={themeTokens.buttonRadius.inherit}
              value={Number(themeTokens.buttonRadius.value)}
              onChange={(e) =>
                setThemeTokens((prev) => ({
                  ...prev,
                  buttonRadius: { ...prev.buttonRadius, value: Number(e.target.value) }
                }))
              }
              className="min-h-10 w-20 rounded border border-rose-200 px-2 py-1 text-sm disabled:opacity-50"
            />
          </div>
        </label>
      </div>
    </div>
  );
}
