"use client";

import { AdminButton } from "@/components/atoms/admin-modules/admin-button";
import { AdminInput } from "@/components/atoms/admin-modules/admin-input";
import { defaultMessagesByLocale } from "@/config/admin-ui-text-bundles";
import { useAdminUiText } from "@/components/admin-modules/ui-text";
import {
  AdminUiPath,
  LocaleMessageFieldKey,
  LOCALE_ADMIN_UI_PATHS,
  LOCALE_MESSAGE_FIELD_ORDER
} from "@/components/organisms/admin-modules/locale-manager.constants";
import {
  formatLocaleWarning,
  getAdminUiPathValue,
  getLocaleMessageFieldLabel,
  setAdminUiPathValue
} from "@/components/organisms/admin-modules/locale-manager.helpers";
import { getLocaleValidationWarnings } from "@/components/organisms/admin-modules/locale-manager.validation";
import { LocaleConfigPayload } from "@/components/admin-modules/types";
import { ChangeEvent, Dispatch, SetStateAction, useMemo, useState } from "react";

type LocaleManagerProps = {
  locales: LocaleConfigPayload[];
  setLocales: Dispatch<SetStateAction<LocaleConfigPayload[]>>;
};

export function LocaleManager({ locales, setLocales }: LocaleManagerProps) {
  const ADMIN_UI_TEXT = useAdminUiText();
  const [newCode, setNewCode] = useState("");
  const [newName, setNewName] = useState("");

  const normalizedCodes = useMemo(() => new Set(locales.map((locale) => locale.code)), [locales]);

  function updateLocale(code: string, patch: Partial<LocaleConfigPayload>) {
    setLocales((prev) => prev.map((locale) => (locale.code === code ? { ...locale, ...patch } : locale)));
  }

  function updateLocaleMessage(code: string, key: LocaleMessageFieldKey, value: string) {
    setLocales((prev) =>
      prev.map((locale) => {
        if (locale.code !== code) {
          return locale;
        }

        return {
          ...locale,
          messages: { ...locale.messages, [key]: value }
        };
      })
    );
  }

  function updateLocaleAdminUiMessage(code: string, path: AdminUiPath, value: string) {
    setLocales((prev) =>
      prev.map((locale) => {
        if (locale.code !== code) {
          return locale;
        }

        return {
          ...locale,
          messages: setAdminUiPathValue(locale.messages, path, value)
        };
      })
    );
  }

  function handleEnableChange(code: string, event: ChangeEvent<HTMLInputElement>) {
    const checked = event.target.checked;
    setLocales((prev) =>
      prev.map((locale) => {
        if (locale.code !== code) return locale;
        if (locale.isDefault && !checked) {
          return locale;
        }
        return { ...locale, enabled: checked };
      })
    );
  }

  function setDefaultLocale(code: string) {
    setLocales((prev) =>
      prev.map((locale) => ({
        ...locale,
        isDefault: locale.code === code,
        enabled: locale.code === code ? true : locale.enabled
      }))
    );
  }

  function addLocale() {
    const code = newCode.trim().toLowerCase();
    const name = newName.trim();
    if (!/^[a-z]{2}(-[a-z0-9]+)?$/.test(code)) {
      return;
    }
    if (!name || normalizedCodes.has(code)) {
      return;
    }
    setLocales((prev) => [
      ...prev,
      {
        code,
        name,
        enabled: true,
        isDefault: false,
        messages: defaultMessagesByLocale(code)
      }
    ]);
    setNewCode("");
    setNewName("");
  }

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold text-rose-900 sm:text-xl">{ADMIN_UI_TEXT.LOCALES.TITLE}</h2>
      <p className="mt-1 text-xs text-rose-700">{ADMIN_UI_TEXT.LOCALES.DESCRIPTION}</p>

      <div className="mt-4 space-y-2">
        {locales.map((locale) => {
          const localeWarnings = getLocaleValidationWarnings(locale);
          return (
          <div key={locale.code} className="rounded-md border border-rose-200 p-3">
            {localeWarnings.length > 0 ? (
              <div className="mb-2 rounded-md border border-amber-300 bg-amber-50 p-2">
                <p className="text-xs font-semibold text-amber-900">{ADMIN_UI_TEXT.LOCALES.VALIDATION_TITLE}</p>
                <ul className="mt-1 space-y-0.5 text-xs text-amber-800">
                  {localeWarnings.map((warning, index) => (
                    <li key={`${locale.code}-warning-${index}`}>- {formatLocaleWarning(warning, ADMIN_UI_TEXT)}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            <div className="grid gap-2 sm:grid-cols-4">
              <AdminInput
                type="text"
                value={locale.code}
                readOnly
                aria-label={ADMIN_UI_TEXT.LOCALES.CODE_LABEL}
                className="min-h-10 rounded-md border border-rose-200 px-3 py-2 text-sm"
              />
              <AdminInput
                type="text"
                value={locale.name}
                aria-label={ADMIN_UI_TEXT.LOCALES.NAME_LABEL}
                onChange={(event) => updateLocale(locale.code, { name: event.target.value })}
                className="min-h-10 rounded-md border border-rose-200 px-3 py-2 text-sm"
              />
              <label className="flex min-h-10 items-center gap-2 rounded-md border border-rose-200 px-3 py-2 text-sm text-rose-900">
                <input type="checkbox" checked={locale.enabled} onChange={(event) => handleEnableChange(locale.code, event)} />
                {ADMIN_UI_TEXT.LOCALES.ENABLED_LABEL}
              </label>
              <label className="flex min-h-10 items-center gap-2 rounded-md border border-rose-200 px-3 py-2 text-sm text-rose-900">
                <input type="radio" name="default-locale" checked={locale.isDefault} onChange={() => setDefaultLocale(locale.code)} />
                {ADMIN_UI_TEXT.LOCALES.DEFAULT_LABEL}
              </label>
            </div>

            <div className="mt-3 rounded-md border border-rose-200/70 bg-rose-50/50 p-3">
              <p className="text-sm font-medium text-rose-900">{ADMIN_UI_TEXT.LOCALES.MESSAGES_TITLE}</p>
              <p className="mt-1 text-xs text-rose-700">{ADMIN_UI_TEXT.LOCALES.MESSAGES_DESCRIPTION}</p>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {LOCALE_MESSAGE_FIELD_ORDER.map((fieldKey) => (
                  <label key={fieldKey} className="flex min-w-0 flex-col gap-1">
                    <span className="text-xs font-medium text-rose-800">{getLocaleMessageFieldLabel(ADMIN_UI_TEXT, fieldKey)}</span>
                    <AdminInput
                      type="text"
                      value={locale.messages[fieldKey]}
                      onChange={(event) => updateLocaleMessage(locale.code, fieldKey, event.target.value)}
                      className="min-h-10 rounded-md border border-rose-200 px-3 py-2 text-sm"
                    />
                  </label>
                ))}
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {LOCALE_ADMIN_UI_PATHS.map((path) => (
                  <label key={path} className="flex min-w-0 flex-col gap-1">
                    <span className="text-xs font-medium text-rose-800">{path}</span>
                    <AdminInput
                      type="text"
                      value={getAdminUiPathValue(locale.messages, path)}
                      onChange={(event) => updateLocaleAdminUiMessage(locale.code, path, event.target.value)}
                      className="min-h-10 rounded-md border border-rose-200 px-3 py-2 text-sm"
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>
          );
        })}
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-[140px_1fr_auto]">
        <AdminInput
          type="text"
          value={newCode}
          placeholder={ADMIN_UI_TEXT.LOCALES.ADD_CODE_PLACEHOLDER}
          onChange={(event) => setNewCode(event.target.value)}
          className="min-h-10 rounded-md border border-rose-200 px-3 py-2 text-sm"
        />
        <AdminInput
          type="text"
          value={newName}
          placeholder={ADMIN_UI_TEXT.LOCALES.ADD_NAME_PLACEHOLDER}
          onChange={(event) => setNewName(event.target.value)}
          className="min-h-10 rounded-md border border-rose-200 px-3 py-2 text-sm"
        />
        <AdminButton type="button" onClick={addLocale} className="min-h-10 rounded-md bg-rose-100 px-3 py-2 text-sm text-rose-900">
          {ADMIN_UI_TEXT.LOCALES.ADD_BUTTON}
        </AdminButton>
      </div>
    </div>
  );
}
